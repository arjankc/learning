// achievements.js

let achievements = [];

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
    const achievementsContainer = document.getElementById('achievements');
    if (!achievementsContainer) return; // not on achievements page
    
    achievementsContainer.innerHTML = '';
    const unlocked = window.LearningStorage?.getUnlockedAchievements(window.USER_ID) || new Set();
    
    // Update statistics
    const unlockedCount = achievements.filter(a => unlocked.has ? unlocked.has(a.id) : false).length;
    const totalCount = achievements.length;
    const completionRate = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
    
    // Get total XP from unlocked achievements
    const totalXP = achievements
        .filter(a => unlocked.has ? unlocked.has(a.id) : false)
        .reduce((sum, a) => sum + (a.points || 0), 0);
    
    // Update stats display
    const unlockedCountEl = document.getElementById('unlocked-count');
    const totalCountEl = document.getElementById('total-count');
    const completionRateEl = document.getElementById('completion-rate');
    const totalXpEl = document.getElementById('total-xp');
    
    if (unlockedCountEl) unlockedCountEl.textContent = unlockedCount;
    if (totalCountEl) totalCountEl.textContent = totalCount;
    if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;
    if (totalXpEl) totalXpEl.textContent = totalXP;
    
    // Create achievement cards
    achievements.forEach(achievement => {
        const isUnlocked = unlocked.has ? unlocked.has(achievement.id) : false;
        
        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        // Get appropriate icon based on achievement type or use default
        let icon = '🏆';
        if (achievement.type === 'levelComplete') icon = '📚';
        else if (achievement.type === 'tierComplete') icon = '🎯';
        else if (achievement.type === 'quizScore') icon = '🧠';
        else if (achievement.type === 'streak') icon = '🔥';
        else if (achievement.type === 'xp') icon = '⭐';
        
        card.innerHTML = `
            <div class="achievement-icon">${isUnlocked ? icon : '🔒'}</div>
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-description">${achievement.description}</div>
            <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold; color: ${isUnlocked ? '#4CAF50' : '#999'};">
                    ${isUnlocked ? '✅ Unlocked' : '🔒 Locked'}
                </span>
                <span style="color: #007acc; font-weight: bold;">
                    +${achievement.points || 0} XP
                </span>
            </div>
        `;
        
        achievementsContainer.appendChild(card);
    });
    
    // If no achievements, show a placeholder
    if (achievements.length === 0) {
        achievementsContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                <h3>No achievements yet!</h3>
                <p>Start learning C# to unlock your first achievements.</p>
                <a href="levels.html" style="color: #007acc; text-decoration: none; font-weight: bold;">
                    Begin Learning →
                </a>
            </div>
        `;
    }
}

// Initialize achievements
async function initAchievements() {
    await loadAchievements();
    displayAchievements();
}

// Call the initialization function when the document is ready
document.addEventListener('DOMContentLoaded', initAchievements);