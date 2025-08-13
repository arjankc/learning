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

function completeLevel(userId, levelId) {
    const progress = getUserProgress(userId);
    const completedLevels = new Set(progress.completedLevels || []);
    completedLevels.add(levelId);
    saveProgress(userId, { completedLevels: Array.from(completedLevels) });
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
    completeLevel,
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
    }
};

// Example usage
// saveProgress('user123', { level: 1, score: 100 });
// console.log(getUserProgress('user123'));
// clearProgress('user123');