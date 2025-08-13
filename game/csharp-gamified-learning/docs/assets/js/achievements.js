// achievements.js

const achievements = [];

// Load achievements from JSON file
async function loadAchievements() {
    const response = await fetch('data/achievements.json');
    const data = await response.json();
    achievements.push(...data);
}

// Display achievements on the achievements page
function displayAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    achievements.forEach(achievement => {
        const listItem = document.createElement('li');
        listItem.textContent = `${achievement.name}: ${achievement.description}`;
        achievementsList.appendChild(listItem);
    });
}

// Initialize achievements
async function initAchievements() {
    await loadAchievements();
    displayAchievements();
}

// Call the initialization function when the document is ready
document.addEventListener('DOMContentLoaded', initAchievements);