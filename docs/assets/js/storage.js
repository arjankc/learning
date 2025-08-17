// This file manages local storage for saving user progress and scores.

const STORAGE_KEY = 'csharpGamifiedLearning';

// Save user progress
function saveProgress(userId, progress) {
    const root = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const current = root[userId] || {};
    root[userId] = { ...current, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
}

// Get user progress
function getUserProgress(userId) {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    try {
        const root = JSON.parse(data);
        return root[userId] || {};
    } catch {
        return {};
    }
}

// Clear user progress
function clearProgress(userId) {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    const root = JSON.parse(data);
    delete root[userId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
}

function addXp(userId, amount) {
    const progress = getUserProgress(userId);
    const xp = (progress.xp || 0) + amount;
    saveProgress(userId, { xp });
    return xp;
}

function deductXp(userId, amount) {
    const progress = getUserProgress(userId);
    const xp = (progress.xp || 0) - amount;
    saveProgress(userId, { xp: Math.max(0, xp) });
    return xp;
}

function completeLevel(userId, levelId) {
    const progress = getUserProgress(userId);
    const completedLevels = new Set(progress.completedLevels || []);
    completedLevels.add(levelId);
    saveProgress(userId, { completedLevels: Array.from(completedLevels) });
}

// Streak Functions
function getStreak(userId) {
    const progress = getUserProgress(userId);
    return progress.streak || {
        currentStreak: 0,
        maxStreak: 0,
        lastCompletionDate: null
    };
}

function updateStreak(userId) {
    const progress = getUserProgress(userId);
    const streak = getStreak(userId);
    const today = new Date().toISOString().split('T')[0];

    if (streak.lastCompletionDate) {
        const lastDate = new Date(streak.lastCompletionDate);
        const todayDate = new Date(today);
        const diffTime = todayDate - lastDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            streak.currentStreak++;
        } else if (diffDays > 1) {
            streak.currentStreak = 1;
        }
    } else {
        streak.currentStreak = 1;
    }

    streak.lastCompletionDate = today;
    if (streak.currentStreak > streak.maxStreak) {
        streak.maxStreak = streak.currentStreak;
    }

    saveProgress(userId, { ...progress, streak });
    return streak;
}


// Weakness Detection Functions
function recordQuizAttempt(userId, levelId, questionIndex, isCorrect, concept, difficulty) {
    const progress = getUserProgress(userId);
    const attempts = progress.quizAttempts || [];
    
    const attempt = {
        levelId,
        questionIndex,
        isCorrect,
        concept,
        difficulty,
        timestamp: Date.now()
    };
    
    attempts.push(attempt);
    
    // Keep only last 1000 attempts to prevent storage bloat
    if (attempts.length > 1000) {
        attempts.splice(0, attempts.length - 1000);
    }
    
    saveProgress(userId, { quizAttempts: attempts });
}

function recordMissedQuestion(userId, levelId, questionIndex, question, userAnswer, correctAnswer) {
    const progress = getUserProgress(userId);
    const missedQuestions = progress.missedQuestions || [];
    
    const missedQuestion = {
        levelId,
        questionIndex,
        question: question.q,
        options: question.options,
        userAnswer,
        correctAnswer,
        timestamp: Date.now(),
        practiced: false,
        practicedCorrectly: false
    };
    
    // Check if this question is already in missed questions
    const existingIndex = missedQuestions.findIndex(mq => 
        mq.levelId === levelId && mq.questionIndex === questionIndex
    );
    
    if (existingIndex >= 0) {
        // Update existing entry
        missedQuestions[existingIndex] = { ...missedQuestions[existingIndex], ...missedQuestion };
    } else {
        // Add new missed question
        missedQuestions.push(missedQuestion);
    }
    
    // Keep only last 200 missed questions to prevent storage bloat
    if (missedQuestions.length > 200) {
        missedQuestions.splice(0, missedQuestions.length - 200);
    }
    
    saveProgress(userId, { missedQuestions });
}

function getMissedQuestions(userId, limit = 20) {
    const progress = getUserProgress(userId);
    const missedQuestions = progress.missedQuestions || [];
    
    // Return unpracticed or incorrectly practiced questions, most recent first
    return missedQuestions
        .filter(mq => !mq.practiced || !mq.practicedCorrectly)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
}

function markQuestionPracticed(userId, levelId, questionIndex, practicedCorrectly) {
    const progress = getUserProgress(userId);
    const missedQuestions = progress.missedQuestions || [];
    
    const questionIndex_found = missedQuestions.findIndex(mq => 
        mq.levelId === levelId && mq.questionIndex === questionIndex
    );
    
    if (questionIndex_found >= 0) {
        missedQuestions[questionIndex_found].practiced = true;
        missedQuestions[questionIndex_found].practicedCorrectly = practicedCorrectly;
        missedQuestions[questionIndex_found].lastPracticed = Date.now();
        
        saveProgress(userId, { missedQuestions });
    }
}

function getWeaknesses(userId) {
    const progress = getUserProgress(userId);
    const attempts = progress.quizAttempts || [];
    
    if (attempts.length < 5) {
        return { weaknesses: [], needsMoreData: true };
    }
    
    // Group attempts by concept
    const conceptStats = {};
    
    attempts.forEach(attempt => {
        if (!conceptStats[attempt.concept]) {
            conceptStats[attempt.concept] = {
                concept: attempt.concept,
                total: 0,
                correct: 0,
                difficulty: attempt.difficulty,
                recentAttempts: []
            };
        }
        
        const stats = conceptStats[attempt.concept];
        stats.total++;
        if (attempt.isCorrect) stats.correct++;
        
        // Track recent attempts (last 10)
        stats.recentAttempts.push({
            isCorrect: attempt.isCorrect,
            timestamp: attempt.timestamp
        });
        
        if (stats.recentAttempts.length > 10) {
            stats.recentAttempts.shift();
        }
    });
    
    // Calculate weakness scores
    const weaknesses = Object.values(conceptStats)
        .map(stats => {
            const accuracy = stats.correct / stats.total;
            const recentAccuracy = stats.recentAttempts.length > 0 
                ? stats.recentAttempts.filter(a => a.isCorrect).length / stats.recentAttempts.length
                : accuracy;
            
            // Weight recent performance more heavily
            const weightedAccuracy = (accuracy * 0.3) + (recentAccuracy * 0.7);
            
            return {
                concept: stats.concept,
                accuracy: Math.round(accuracy * 100),
                recentAccuracy: Math.round(recentAccuracy * 100),
                weightedAccuracy: Math.round(weightedAccuracy * 100),
                totalAttempts: stats.total,
                difficulty: stats.difficulty,
                weaknessScore: Math.round((1 - weightedAccuracy) * 100),
                needsReview: weightedAccuracy < 0.7 && stats.total >= 3
            };
        })
        .filter(w => w.needsReview)
        .sort((a, b) => b.weaknessScore - a.weaknessScore);
    
    return { 
        weaknesses: weaknesses.slice(0, 5), // Top 5 weaknesses
        needsMoreData: false 
    };
}

function getConceptProgress(userId, concept) {
    const progress = getUserProgress(userId);
    const attempts = (progress.quizAttempts || []).filter(a => a.concept === concept);
    
    if (attempts.length === 0) return null;
    
    const correct = attempts.filter(a => a.isCorrect).length;
    const accuracy = correct / attempts.length;
    
    return {
        concept,
        attempts: attempts.length,
        correct,
        accuracy: Math.round(accuracy * 100),
        improving: attempts.length >= 5 ? isImproving(attempts) : null
    };
}

function isImproving(attempts) {
    if (attempts.length < 5) return null;
    
    const recent = attempts.slice(-5);
    const older = attempts.slice(-10, -5);
    
    if (older.length === 0) return null;
    
    const recentAccuracy = recent.filter(a => a.isCorrect).length / recent.length;
    const olderAccuracy = older.filter(a => a.isCorrect).length / older.length;
    
    return recentAccuracy > olderAccuracy;
}

// Expose as global for simple usage
window.LearningStorage = {
    saveProgress,
    getUserProgress,
    clearProgress,
    addXp,
    deductXp,
    completeLevel,
    getStreak,
    updateStreak,
    recordQuizAttempt,
    getWeaknesses,
    getConceptProgress,
    unlockAchievement: function(userId, achievementId){
        const progress = getUserProgress(userId);
        const unlocked = new Set(progress.unlockedAchievements || []);
        unlocked.add(achievementId);
        saveProgress(userId, { unlockedAchievements: Array.from(unlocked) });
    },
    getUnlockedAchievements: function(userId){
        const progress = getUserProgress(userId);
        return new Set(progress.unlockedAchievements || []);
    },
    recordMissedQuestion,
    getMissedQuestions,
    markQuestionPracticed
};

// Example usage
// saveProgress('user123', { level: 1, score: 100 });
// console.log(getUserProgress('user123'));
// clearProgress('user123');
