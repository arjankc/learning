// levels.js - Handles loading and displaying learning levels.

let LevelsData = []; // To store all the levels data globally

document.addEventListener('DOMContentLoaded', async () => {
    showPreloader();
    updateLoadingProgress(20, 'Loading levels...');
    
    await loadLevelsData();
    
    updateLoadingProgress(60, 'Rendering UI...');
    displayLevels(LevelsData);
    renderProgress(); // Initial render of user progress
    
    updateLoadingProgress(100, 'Ready to learn!');
    hidePreloader();
    
    setupLevelEventListeners();
    addResponsiveEnhancements();
});

async function loadLevelsData() {
    try {
        const response = await fetch('data/levels.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        LevelsData = data.levels;
    } catch (error) {
        console.error('Could not load levels data:', error);
        showErrorMessage('Failed to load the learning curriculum. Please check your connection and try again.');
    }
}

function displayLevels(levels) {
    const listContainer = document.getElementById('levels-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const progress = window.LearningStorage.getUserProgress(window.USER_ID);
    const completedLevels = new Set(progress.completedLevels || []);

    const tiers = [...new Set(levels.map(level => level.tier))].sort((a, b) => a - b);

    tiers.forEach(tier => {
        const tierContainer = document.createElement('div');
        tierContainer.className = 'tier-container';
        tierContainer.innerHTML = `<h2 class="tier-title">Tier ${tier}</h2>`;

        const levelsGrid = document.createElement('div');
        levelsGrid.className = 'levels-grid';

        levels.filter(level => level.tier === tier).forEach(level => {
            const isCompleted = completedLevels.has(level.id);
            const card = document.createElement('div');
            card.className = `level-card ${isCompleted ? 'completed' : ''}`;
            card.dataset.levelId = level.id;

            card.innerHTML = `
                <div class="level-card-header">
                    <span class="level-id">Level ${level.id}</span>
                    <h3 class="level-title">${level.title}</h3>
                </div>
                <p class="level-description">${level.description}</p>
                <div class="level-card-footer">
                    <span class="level-status">${isCompleted ? '✅ Completed' : '⏳ Not Started'}</span>
                    <button class="button start-level-button" data-level-id="${level.id}">
                        ${isCompleted ? 'Revisit' : 'Start'}
                    </button>
                </div>
            `;
            levelsGrid.appendChild(card);
        });

        tierContainer.appendChild(levelsGrid);
        listContainer.appendChild(tierContainer);
    });
}

function setupLevelEventListeners() {
    const listContainer = document.getElementById('levels-list');
    listContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('start-level-button')) {
            const levelId = parseInt(event.target.dataset.levelId);
            showLevelDetail(levelId);
        }
    });

    document.getElementById('close-level').addEventListener('click', () => {
        document.getElementById('level-detail').style.display = 'none';
        document.getElementById('levels-list').parentElement.style.display = 'block';
    });
    
    document.getElementById('complete-level').addEventListener('click', () => {
        const levelId = parseInt(document.getElementById('complete-level').dataset.levelId);
        const level = LevelsData.find(l => l.id === levelId);
        if(level) completeCurrentLevel(level);
    });

    document.getElementById('next-level').addEventListener('click', () => {
        const currentId = parseInt(document.getElementById('next-level').dataset.levelId);
        const nextLevel = LevelsData.find(l => l.id > currentId);
        if (nextLevel) showLevelDetail(nextLevel.id);
    });

    document.getElementById('prev-level').addEventListener('click', () => {
        const currentId = parseInt(document.getElementById('prev-level').dataset.levelId);
        const prevLevel = LevelsData.slice().reverse().find(l => l.id < currentId);
        if (prevLevel) showLevelDetail(prevLevel.id);
    });
}

function showLevelDetail(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;

    document.getElementById('levels-list').parentElement.style.display = 'none';
    const detailContainer = document.getElementById('level-detail');
    detailContainer.style.display = 'block';

    document.getElementById('level-title').textContent = `Level ${level.id}: ${level.title}`;
    document.getElementById('level-description').textContent = level.description;
    
    const requirementsList = document.getElementById('level-requirements');
    requirementsList.innerHTML = level.requirements.map(r => `<li>${r}</li>`).join('');

    const theoryContainer = document.getElementById('level-theory');
    theoryContainer.innerHTML = level.theory;

    const codeBlock = document.getElementById('level-code');
    codeBlock.textContent = level.code;
    if (window.Prism) {
        window.Prism.highlightElement(codeBlock);
    }

    // Setup navigation
    document.getElementById('next-level').dataset.levelId = level.id;
    document.getElementById('prev-level').dataset.levelId = level.id;

    // Render the quiz for this level
    renderQuiz(level);

    // Update completion button state
    const completeBtn = document.getElementById('complete-level');
    completeBtn.dataset.levelId = level.id;
    const progress = window.LearningStorage.getUserProgress(window.USER_ID);
    const isCompleted = (progress.completedLevels || []).includes(level.id);

    if (isCompleted) {
        completeBtn.textContent = '✅ Already Completed';
        completeBtn.disabled = true;
    } else {
        completeBtn.textContent = '🎉 Mark as Completed';
        completeBtn.disabled = false; // Re-enable for levels without quizzes
    }
    
    // For levels with quizzes, the button might be disabled until the quiz is passed.
    // This logic is handled within quiz.js
    if (level.quiz && level.quiz.length > 0 && !isCompleted) {
        completeBtn.disabled = true;
        completeBtn.innerHTML = '🔒 Complete quiz perfectly to unlock';
    }


    detailContainer.scrollIntoView({ behavior: 'smooth' });
}

function completeCurrentLevel(level) {
    const userId = window.USER_ID;
    window.LearningStorage.completeLevel(userId, level.id);
    window.LearningStorage.addXp(userId, 25); // Award XP for level completion
    const streak = window.LearningStorage.updateStreak(userId);

    showNotification(`🎉 Level ${level.id} completed! +25 XP`, 'success');
    if(streak.currentStreak > 1) {
        showNotification(`🔥 You're on a ${streak.currentStreak}-day streak!`, 'success');
    }

    // Update the UI
    const completeBtn = document.getElementById('complete-level');
    completeBtn.textContent = '✅ Completed!';
    completeBtn.disabled = true;
    
    // Update the card in the main list
    const levelCard = document.querySelector(`.level-card[data-level-id='${level.id}']`);
    if (levelCard) {
        levelCard.classList.add('completed');
        levelCard.querySelector('.level-status').textContent = '✅ Completed';
        levelCard.querySelector('.start-level-button').textContent = 'Revisit';
    }

    renderProgress();
    maybeAwardAchievements(level);
    maybeShowProceedSection(level);
    
    // Confetti effect for fun
    if (window.confetti) {
        window.confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 }
        });
    }
}

function maybeAwardAchievements(level) {
    const userId = window.USER_ID;
    const progress = window.LearningStorage.getUserProgress(userId);
    const unlocked = window.LearningStorage.getUnlockedAchievements(userId);

    achievements.forEach(ach => {
        if (unlocked.has(ach.id)) return;

        let shouldUnlock = false;
        if (ach.type === 'levelComplete' && ach.value === level.id) {
            shouldUnlock = true;
        } else if (ach.type === 'tierComplete') {
            const tierLevels = LevelsData.filter(l => l.tier === ach.value);
            const completedTierLevels = tierLevels.filter(l => progress.completedLevels.includes(l.id));
            if (tierLevels.length === completedTierLevels.length) {
                shouldUnlock = true;
            }
        }

        if (shouldUnlock) {
            window.LearningStorage.unlockAchievement(userId, ach.id);
            showNotification(`🏆 Achievement Unlocked: ${ach.title}! (+${ach.points} XP)`, 'success', true);
            window.LearningStorage.addXp(userId, ach.points);
            renderProgress();
        }
    });
}

function maybeAwardQuizAchievements(level, score) {
    const userId = window.USER_ID;
    const unlocked = window.LearningStorage.getUnlockedAchievements(userId);

    achievements.forEach(ach => {
        if (unlocked.has(ach.id)) return;

        let shouldUnlock = false;
        if (ach.type === 'quizScore' && score >= ach.value) {
            shouldUnlock = true;
        }

        if (shouldUnlock) {
            window.LearningStorage.unlockAchievement(userId, ach.id);
            showNotification(`🏆 Achievement Unlocked: ${ach.title}! (+${ach.points} XP)`, 'success', true);
            window.LearningStorage.addXp(userId, ach.points);
            renderProgress();
        }
    });
}