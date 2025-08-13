// mirrored from game/csharp-gamified-learning/docs
// achievements.js

const achievements = [];

// Load achievements from JSON file
async function loadAchievements() {
    const response = await fetch('data/achievements.json');
    const data = await response.json();
    if (data && Array.isArray(data.achievements)) {
        achievements.push(...data.achievements);
    }
}

// Display achievements on the achievements page
function displayAchievements() {
    const achievementsList = document.getElementById('achievements');
    achievementsList.innerHTML = '';
    achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = `${achievement.title}: ${achievement.description} (+${achievement.points} XP)`;
        achievementsList.appendChild(li);
    });
}

// Initialize achievements
async function initAchievements() {
    await loadAchievements();
    displayAchievements();
}

// Call the initialization function when the document is ready
document.addEventListener('DOMContentLoaded', initAchievements);
