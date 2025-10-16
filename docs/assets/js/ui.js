// ui.js
// This file contains all the UI-related functions for the application.

/**
 * Shows the preloader overlay.
 */
function showPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'flex';
    }
}

/**
 * Hides the preloader overlay.
 */
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Small delay for better UX
    }
}

/**
 * Updates the loading progress bar and status message.
 * @param {number} percent The percentage to set the progress bar to.
 * @param {string} status The status message to display.
 */
function updateLoadingProgress(percent, status) {
    const progressBar = document.getElementById('loading-progress-bar');
    const statusElement = document.getElementById('loading-status');
    
    if (progressBar) {
        progressBar.style.width = percent + '%';
    }
    
    if (statusElement) {
        statusElement.textContent = status;
    }
}

/**
 * Shows a notification message to the user.
 * @param {string} message The message to display.
 * @param {string} type The type of notification (info, success, warning, error).
 * @param {boolean} isAchievement Whether the notification is for an achievement.
 */
function showNotification(message, type = 'info', isAchievement = false) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = message;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #FF9800, #FFC107)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #F44336, #E91E63)';
    }

    if (isAchievement) {
        notification.classList.add('pulse');
        notification.style.border = '2px solid gold';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Shows the "Proceed to Next Level" section after a level is completed.
 * @param {object} currentLevel The level that was just completed.
 * @param {object} nextLevel The next level to proceed to.
 */
function showProceedToNextLevel(currentLevel, nextLevel) {
    let proceedSection = document.getElementById('proceed-section');
    if (!proceedSection) {
        proceedSection = document.createElement('div');
        proceedSection.id = 'proceed-section';
        proceedSection.style.cssText = `
            margin-top: 2rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
            border: 2px solid #4CAF50;
            border-radius: 15px;
            text-align: center;
            animation: slideInUp 0.5s ease-out;
        `;
        
        const completeBtn = document.getElementById('complete-level');
        completeBtn.parentNode.insertBefore(proceedSection, completeBtn.nextSibling);
    }
    
    let content = `
        <h3 style="color: #4CAF50; margin-top: 0;">🎉 Level ${currentLevel.id} Complete!</h3>
        <p>Great job mastering "${currentLevel.title}"!</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
    `;
    
    if (nextLevel) {
        content += `<button onclick="proceedToLevel(${nextLevel.id})" class="proceed-button primary">🚀 Continue to Level ${nextLevel.id}</button>`;
    }
    
    content += `
        <button onclick="proceedToBrowse()" class="proceed-button">📚 Browse All Levels</button>
        <button onclick="proceedToAchievements()" class="proceed-button">🏆 View Achievements</button>
    `;
    
    if (!nextLevel) {
        content += `<p><strong>🎓 Congratulations!</strong> You've completed all available levels!</p>`;
    }
    
    content += '</div>';
    proceedSection.innerHTML = content;
    
    setTimeout(() => {
        proceedSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

/**
 * Navigates to a specific level.
 * @param {number} levelId The ID of the level to navigate to.
 */
function proceedToLevel(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (level) {
        const proceedSection = document.getElementById('proceed-section');
        if (proceedSection) {
            proceedSection.style.display = 'none';
        }
        
        showLevelDetail(levelId);
        showNotification(`🚀 Starting Level ${levelId}: ${level.title}`, 'info');
    }
}

/**
 * Closes the level detail view and scrolls to the levels list.
 */
function proceedToBrowse() {
    const levelDetail = document.getElementById('level-detail');
    if (levelDetail) {
        levelDetail.style.display = 'none';
    }
    
    const levelsSection = document.getElementById('levels-list');
    if (levelsSection) {
        levelsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    showNotification('📚 Browse and select your next challenge!', 'info');
}

/**
 * Navigates to the achievements page.
 */
function proceedToAchievements() {
    window.location.href = 'achievements.html';
}

/**
 * Shows the proceed section for a completed level.
 * @param {object} level The completed level object.
 */
function maybeShowProceedSection(level) {
    const nextLevel = LevelsData.find(l => l.id === level.id + 1);
    showProceedToNextLevel(level, nextLevel);
}

/**
 * Displays an error message to the user.
 * @param {string} message The error message to display.
 */
function showErrorMessage(message) {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #e74c3c;">
                <h2>⚠️ Loading Error</h2>
                <p>${message}</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">
                    Refresh Page
                </button>
            </div>
        `;
    }
}

/**
 * Renders the user progress display with current level, XP, streak, and completion.
 */
function renderProgress() {
    const userId = window.USER_ID;
    if (!userId || !window.LearningStorage) return;
    
    const progress = window.LearningStorage.getUserProgress(userId);
    const xp = progress.xp || 0;
    const streak = progress.streak || { currentStreak: 0 };
    const completedLevels = progress.completedLevels || [];
    
    // Determine user level based on XP
    const levelTiers = [
        { minXp: 0, level: 1, title: 'C# Novice' },
        { minXp: 100, level: 2, title: 'C# Beginner' },
        { minXp: 250, level: 3, title: 'C# Apprentice' },
        { minXp: 500, level: 4, title: 'C# Practitioner' },
        { minXp: 1000, level: 5, title: 'C# Developer' },
        { minXp: 2000, level: 6, title: 'C# Expert' },
        { minXp: 3500, level: 7, title: 'C# Master' },
        { minXp: 5000, level: 8, title: 'C# Grandmaster' }
    ];
    
    let currentTier = levelTiers[0];
    let nextTier = levelTiers[1];
    
    for (let i = 0; i < levelTiers.length; i++) {
        if (xp >= levelTiers[i].minXp) {
            currentTier = levelTiers[i];
            nextTier = levelTiers[i + 1] || null;
        }
    }
    
    // Update user level display
    const levelDisplay = document.getElementById('user-level-display');
    if (levelDisplay) {
        levelDisplay.textContent = `🏆 Level ${currentTier.level} ${currentTier.title}`;
    }
    
    // Update XP display
    const xpDisplay = document.getElementById('xp-display');
    if (xpDisplay) {
        xpDisplay.textContent = `⭐ ${xp} XP earned`;
    }
    
    // Update streak display
    const streakDisplay = document.getElementById('streak-display');
    if (streakDisplay) {
        streakDisplay.textContent = `🔥 ${streak.currentStreak} Day Streak`;
    }
    
    // Calculate progress percentage for next level
    let progressPercent = 100;
    if (nextTier) {
        const xpIntoCurrentLevel = xp - currentTier.minXp;
        const xpNeededForNextLevel = nextTier.minXp - currentTier.minXp;
        progressPercent = Math.min(100, Math.round((xpIntoCurrentLevel / xpNeededForNextLevel) * 100));
    }
    
    // Update circular progress
    const circularProgress = document.getElementById('xp-circular-progress');
    if (circularProgress) {
        circularProgress.style.background = `conic-gradient(#4CAF50 ${progressPercent * 3.6}deg, #e0e0e0 0deg)`;
    }
    
    const circularValue = document.getElementById('xp-circular-value');
    if (circularValue) {
        circularValue.textContent = `${progressPercent}%`;
    }
    
    // Calculate overall course completion
    const totalLevels = window.LevelsData ? window.LevelsData.length : 34;
    const completionPercent = totalLevels > 0 ? Math.round((completedLevels.length / totalLevels) * 100) : 0;
    
    // Update progress text
    const progressText = document.getElementById('progress-text');
    if (progressText) {
        progressText.textContent = `${completedLevels.length} of ${totalLevels} levels completed (${completionPercent}%)`;
    }
    
    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${completionPercent}%`;
    }
}

/**
 * Adds responsive and touch enhancements to the UI.
 */
function addResponsiveEnhancements() {
    const cards = document.querySelectorAll('.level-card, .card, .button');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.style.minHeight = '44px';
        option.style.display = 'flex';
        option.style.alignItems = 'center';
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, window.scrollY + 1);
            window.scrollTo(0, window.scrollY - 1);
        }, 100);
    });
    
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}