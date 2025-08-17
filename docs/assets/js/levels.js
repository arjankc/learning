// levels.js
// This file is responsible for fetching level data, rendering the level list,
// and handling the main level display logic.

let LevelsData = [];

/**
 * Fetches the level data from the server.
 * @returns {Promise<object>} A promise that resolves with the level data.
 */
async function fetchLevels() {
    try {
        updateLoadingProgress(10, 'Connecting to server...');
        
        const response = await fetch('data/levels.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        updateLoadingProgress(30, 'Receiving data...');
        
        const contentLength = response.headers.get('content-length');
        
        if (contentLength) {
            const total = parseInt(contentLength, 10);
            let loaded = 0;
            
            const reader = response.body.getReader();
            const chunks = [];
            
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                chunks.push(value);
                loaded += value.length;
                
                const progress = Math.min(30 + (loaded / total) * 40, 70);
                updateLoadingProgress(progress, 'Loading curriculum data...');
            }
            
            const allChunks = new Uint8Array(loaded);
            let position = 0;
            for (const chunk of chunks) {
                allChunks.set(chunk, position);
                position += chunk.length;
            }
            
            const text = new TextDecoder().decode(allChunks);
            updateLoadingProgress(80, 'Processing curriculum...');
            
            const data = JSON.parse(text);
            
            LevelsData = data.levels || [];
            
            updateLoadingProgress(90, 'Initializing interface...');
            
            return data;
        } else {
            updateLoadingProgress(50, 'Loading curriculum data...');
            const data = await response.json();
            
            LevelsData = data.levels || [];
            
            updateLoadingProgress(80, 'Processing curriculum...');
            return data;
        }
    } catch (error) {
        console.error('Error fetching levels:', error);
        updateLoadingProgress(0, 'Error loading curriculum. Please refresh the page.');
        throw error;
    }
}

/**
 * Renders the user's progress, including XP, level, and streak.
 */
function renderProgress() {
    const progressEl = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const xpDisplay = document.getElementById('xp-display');
    const streakDisplay = document.getElementById('streak-display');
    
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const completed = (progress.completedLevels || []).length;
    const total = LevelsData.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    const xp = progress.xp || 0;
    
    const done = new Set(progress.completedLevels || []);
    const unlocked = LevelsData.filter(l => isLevelUnlocked(l.id, done)).length;
    
    progressEl.textContent = `🎯 ${completed}/${total} levels completed | 🔓 ${unlocked} available`;
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
    
    if (xpDisplay) {
        const xpLevel = Math.floor(xp / 100) + 1;
        xpDisplay.innerHTML = `⭐ ${xp} XP earned | 🏆 Level ${xpLevel}`;
    }

    if (streakDisplay) {
        const streak = window.LearningStorage?.getStreak(window.USER_ID);
        streakDisplay.innerHTML = `🔥 ${streak.currentStreak} Day Streak`;
    }
    
    renderWeaknessDetection();
}

/**
 * Renders the weakness detection section based on the user's quiz performance.
 */
function renderWeaknessDetection() {
    const weaknessSection = document.getElementById('weakness-section');
    const weaknessList = document.getElementById('weaknesses-list');
    
    if (!weaknessSection || !weaknessList) return;
    
    const analysis = window.LearningStorage?.getWeaknesses(window.USER_ID);
    
    if (!analysis || analysis.needsMoreData) {
        weaknessSection.style.display = 'none';
        return;
    }
    
    const { weaknesses } = analysis;
    
    if (weaknesses.length === 0) {
        weaknessList.innerHTML = `<div style="text-align: center; padding: 2rem; color: #4CAF50;"><h3>Excellent Performance!</h3><p>No significant weaknesses detected.</p></div>`;
        weaknessSection.style.display = 'block';
        return;
    }
    
    let html = '<div class="weaknesses-grid">';
    weaknesses.forEach(weakness => {
        const severityColor = weakness.weaknessScore > 70 ? '#f44336' : weakness.weaknessScore > 50 ? '#ff9800' : '#ffc107';
        html += `<div class="weakness-card" style="border-color: ${severityColor};"><h4>${weakness.concept}</h4><p>Accuracy: ${weakness.accuracy}%</p></div>`;
    });
    html += '</div>';
    weaknessList.innerHTML = html;
    weaknessSection.style.display = 'block';
}

/**
 * Gets an improvement tip for a given concept.
 * @param {string} concept The concept to get a tip for.
 * @returns {string} The improvement tip.
 */
function getImprovementTip(concept) {
    const tips = {
        'Basic Syntax': 'Review C# syntax fundamentals.',
        'Data Types': 'Focus on understanding value vs reference types.',
        'Type Conversion': 'Practice explicit and implicit conversions.',
        'Namespaces': 'Learn about organizing code with namespaces.',
        'Conditional Logic': 'Practice if-else statements and boolean logic.',
        'Advanced OOP': 'Study interfaces, abstract classes, and design patterns.',
    };
    return tips[concept] || 'Review the theory and practice more exercises in this area.';
}

/**
 * Replaces concept keywords in the theory text with links to the corresponding levels.
 * @param {string} theoryHtml The HTML of the theory section.
 * @returns {string} The theory HTML with concept links.
 */
function linkConcepts(theoryHtml) {
    const conceptMap = {
        'Basic Syntax': 1, 'Data Types': 2, 'Type Conversion': 3, 'Namespaces': 4,
        'Conditional Logic': 5, 'Switch Statements': 6, 'For Loops': 7, 'While Loops': 8,
        'Foreach Loops': 9, 'Iterators': 10, 'CLR Fundamentals': 11, 'Framework Class Library': 12,
        'IDE Usage': 13, 'Classes and Objects': 14, 'OOP Principles': 15, 'Advanced OOP': 16,
        'Built-in Collections': 17, 'Custom Collections': 18, 'Exception Handling': 19,
        'Custom Exceptions': 20, 'Debugging': 21, 'Delegates and Events': 22, 'LINQ': 23,
        'Async Programming': 24, 'ADO.NET': 25, 'Entity Framework': 26, 'File I/O': 27,
        'XAML Basics': 28, 'Advanced WPF': 29, 'ASP.NET Core': 30, 'Blazor': 31, 'Security': 32,
        'Cross-Platform Development': 34
    };

    let linkedHtml = theoryHtml;
    for (const concept in conceptMap) {
        const levelId = conceptMap[concept];
        const regex = new RegExp(`\b(${concept})\b`, 'gi');
        linkedHtml = linkedHtml.replace(regex, `<a href="#" onclick="showLevelDetail(${levelId}); return false;">$1</a>`);
    }
    return linkedHtml;
}

/**
 * Checks if a level is unlocked.
 * @param {number} levelId The ID of the level.
 * @param {Set<number>} completedLevels A set of completed level IDs.
 * @returns {boolean} Whether the level is unlocked.
 */
function isLevelUnlocked(levelId, completedLevels) {
    if (levelId === 1) return true;
    return completedLevels.has(levelId - 1);
}

/**
 * Renders the list of levels.
 * @param {string} searchTerm The term to filter the levels by.
 */
function renderLevelsList(searchTerm = '') {
    const list = document.getElementById('levels-list');
    if (!list) return;
    
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const done = new Set(progress.completedLevels || []);
    list.innerHTML = '';
    
    const filteredLevels = LevelsData.filter(l => {
        const isUnlocked = isLevelUnlocked(l.id, done);
        if (!isUnlocked) return false;

        if (searchTerm) {
            return l.title.toLowerCase().includes(searchTerm) ||
                   l.description.toLowerCase().includes(searchTerm) ||
                   l.theory.toLowerCase().includes(searchTerm);
        }
        return true;
    });
    
    if (filteredLevels.length === 0) {
        list.innerHTML = '<p>No levels found.</p>';
        return;
    }
    
    filteredLevels.forEach(l => {
        const isCompleted = done.has(l.id);
        const div = document.createElement('div');
        div.className = `card level-card ${isCompleted ? 'completed' : 'unlocked'}`;
        
        const difficulty = l.tier === 1 ? 'beginner' : l.tier === 2 ? 'intermediate' : 'advanced';
        
        div.innerHTML = `
            <div class="level-card-header">
                <h3>${l.id.toString().padStart(2,'0')}: ${l.title}</h3>
                <span class="difficulty-indicator difficulty-${difficulty}">${difficulty}</span>
            </div>
            <p>${l.description}</p>
            <div class="level-card-footer">
                <button class="button" data-level-id="${l.id}">${isCompleted ? 'Review' : 'Start Level'}</button>
                ${isCompleted ? `<button class="button" onclick="startTimedChallenge(${l.id})">Timed Challenge</button>` : ''}
            </div>
        `;
        
        list.appendChild(div);
    });

    list.querySelectorAll('button[data-level-id]').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.getAttribute('data-level-id'));
            showLevelDetail(id);
        });
    });
}

/**
 * Shows the detail view for a specific level.
 * @param {number} levelId The ID of the level to show.
 */
function showLevelDetail(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const done = new Set(progress.completedLevels || []);
    const isCompleted = done.has(level.id);
    
    document.getElementById('level-title').textContent = `${level.id.toString().padStart(2,'0')}: ${level.title}`;
    document.getElementById('level-description').textContent = level.description;
    
    const theory = document.getElementById('level-theory');
    theory.innerHTML = linkConcepts(level.theory || '—');
    
    const code = document.getElementById('level-code');
    if (level.code) {
        code.innerHTML = level.code.replace(/\\n/g, '\n');
        if (window.Prism) {
            Prism.highlightElement(code);
        }
    } else {
        code.textContent = 'No example code available for this level.';
    }
    
    const quizContainer = document.getElementById('quiz-container');
    const completeBtn = document.getElementById('complete-level');
    if (isCompleted) {
        quizContainer.style.display = 'none';
        completeBtn.style.display = 'none';
    } else {
        quizContainer.style.display = 'block';
        completeBtn.style.display = 'block';
        renderQuiz(level);
    }
    
    const levelDetail = document.getElementById('level-detail');
    levelDetail.style.display = 'block';
    window.scrollTo({ top: levelDetail.offsetTop - 20, behavior: 'smooth' });
}

/**
 * Completes the current level, awards XP, and updates the UI.
 * @param {object} level The level object to complete.
 */
function completeCurrentLevel(level) {
    const btn = document.getElementById('complete-level');
    if (btn.disabled) {
        showNotification('Complete the quiz perfectly first!', 'warning');
        return;
    }

    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
    
    window.LearningStorage?.completeLevel(window.USER_ID, level.id);
    window.LearningStorage?.updateStreak(window.USER_ID);
    const xpAwarded = level.tier * 20;
    window.LearningStorage?.addXp(window.USER_ID, xpAwarded);
    maybeAwardAchievements(level);
    
    const nextLevel = LevelsData.find(l => l.id === level.id + 1);
    if (nextLevel) {
        showNotification(`🎉 Level ${level.id} completed! Level ${nextLevel.id} unlocked!`, 'success');
    } else {
        showNotification(`🎉 Level ${level.id} completed! Great job!`, 'success');
    }
    
    renderProgress();
    renderLevelsList();
    
    btn.innerHTML = '✅ Completed!';
    btn.disabled = true;
    
    showProceedToNextLevel(level, nextLevel);
}

/**
 * Initializes the levels page.
 */
async function initLevelsPage() {
    console.log('Initializing levels page...');
    showPreloader();
    
    try {
        await fetchLevels();
        
        renderProgress();
        renderLevelsList();

        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('keyup', () => {
            renderLevelsList(searchBar.value.toLowerCase());
        });
        
        addResponsiveEnhancements();
        
        hidePreloader();
    } catch (error) {
        console.error('Error initializing levels page:', error);
        showErrorMessage('Failed to load the curriculum. Please check your internet connection and refresh the page.');
    }
}

document.addEventListener('DOMContentLoaded', initLevelsPage);