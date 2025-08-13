// This file manages local storage for saving user progress and scores.

const STORAGE_KEY = 'csharpGamifiedLearning';

// Save user progress
function saveProgress(userId, progress) {
    let userProgress = getUserProgress(userId);
    userProgress = { ...userProgress, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
}

// Get user progress
function getUserProgress(userId) {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        const userProgress = JSON.parse(data);
        return userProgress[userId] || {};
    }
    return {};
}

// Clear user progress
function clearProgress(userId) {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        const userProgress = JSON.parse(data);
        delete userProgress[userId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    }
}

// Example usage
// saveProgress('user123', { level: 1, score: 100 });
// console.log(getUserProgress('user123'));
// clearProgress('user123');