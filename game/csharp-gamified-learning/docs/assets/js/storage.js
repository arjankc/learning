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

// Expose as global for simple usage
window.LearningStorage = {
    saveProgress,
    getUserProgress,
    clearProgress,
    addXp,
    completeLevel
};

// Example usage
// saveProgress('user123', { level: 1, score: 100 });
// console.log(getUserProgress('user123'));
// clearProgress('user123');