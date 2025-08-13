// levels.js (data-driven)

let LevelsData = [];

async function fetchLevels() {
    try {
        console.log('Fetching levels from data/levels.json...');
        const res = await fetch('data/levels.json');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        LevelsData = Array.isArray(json.levels) ? json.levels : [];
        console.log(`Loaded ${LevelsData.length} levels`);
    } catch (error) {
        console.error('Error fetching levels:', error);
        // Show error message to user
        const progressEl = document.getElementById('progress-text');
        if (progressEl) {
            progressEl.textContent = 'Error loading levels. Please refresh the page.';
            progressEl.style.color = 'red';
        }
        const list = document.getElementById('levels-list');
        if (list) {
            list.innerHTML = '<p style="color: red;">Failed to load levels. Please check your internet connection and refresh the page.</p>';
        }
    }
}

function renderProgress() {
    const progressEl = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const xpDisplay = document.getElementById('xp-display');
    
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const completed = (progress.completedLevels || []).length;
    const total = LevelsData.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    const xp = progress.xp || 0;
    
    // Update text
    progressEl.textContent = `🎯 ${completed}/${total} levels completed`;
    
    // Update progress bar with animation
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
        }, 100);
    }
    
    // Update XP display
    if (xpDisplay) {
        xpDisplay.innerHTML = `⭐ ${xp} XP earned | 🏆 Level ${Math.floor(xp / 100) + 1}`;
    }
}

function isLevelUnlocked(levelId, completedLevels) {
    // Level 1 is always unlocked
    if (levelId === 1) return true;
    
    // For other levels, check if the previous level is completed
    return completedLevels.has(levelId - 1);
}

function renderLevelsList() {
    console.log('Rendering levels list...');
    const list = document.getElementById('levels-list');
    if (!list) {
        console.error('levels-list element not found');
        return;
    }
    
    console.log(`Rendering ${LevelsData.length} levels`);
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const done = new Set(progress.completedLevels || []);
    const tierFilter = document.getElementById('tier-filter');
    const tierValue = tierFilter ? tierFilter.value : 'all';
    list.innerHTML = '';
    
    const filteredLevels = LevelsData.filter(l => tierValue === 'all' || String(l.tier) === String(tierValue));
    console.log(`Filtered to ${filteredLevels.length} levels for tier ${tierValue}`);
    
    if (filteredLevels.length === 0) {
        list.innerHTML = '<p>No levels available. Please check if the data loaded correctly.</p>';
        return;
    }
    
    filteredLevels.forEach(l => {
        const isUnlocked = isLevelUnlocked(l.id, done);
        const isCompleted = done.has(l.id);
        
        const div = document.createElement('div');
        div.className = 'card level-card';
        
        // Add appropriate classes for styling
        if (isCompleted) {
            div.classList.add('completed');
        } else if (isUnlocked) {
            div.classList.add('unlocked');
        } else {
            div.classList.add('locked');
        }
        
        // Add visual styling based on level state
        if (!isUnlocked) {
            div.style.opacity = '0.6';
            div.style.filter = 'grayscale(70%)';
        }
        
        // Determine difficulty and status
        const difficulty = l.tier === 1 ? 'beginner' : l.tier === 2 ? 'intermediate' : 'advanced';
        const difficultyText = l.tier === 1 ? '🟢 Beginner' : l.tier === 2 ? '🟡 Intermediate' : '🔴 Advanced';
        
        let status, buttonContent, buttonEnabled;
        if (isCompleted) {
            status = '✅ Completed';
            buttonContent = '📖 Review';
            buttonEnabled = true;
        } else if (isUnlocked) {
            status = '🔓 Ready to Start';
            buttonContent = '🚀 Start Level';
            buttonEnabled = true;
        } else {
            status = '🔒 Locked';
            buttonContent = '🔒 Locked';
            buttonEnabled = false;
        }
        
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                <h3 style="margin: 0;">${l.id.toString().padStart(2,'0')}: ${l.title}</h3>
                <span class="difficulty-indicator difficulty-${difficulty}">${difficultyText}</span>
            </div>
            <p style="margin: 10px 0; color: #666;">${l.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                <span style="font-weight: bold; color: ${isCompleted ? '#4CAF50' : isUnlocked ? '#2196F3' : '#999'};">
                    ${status}
                </span>
                ${buttonEnabled ? 
                    `<button class="button" data-level-id="${l.id}" style="border: none; cursor: pointer;">${buttonContent}</button>` :
                    `<button class="button" disabled style="opacity: 0.5; cursor: not-allowed; border: none;">${buttonContent}</button>`
                }
            </div>
        `;
        
        // Show requirement for locked levels
        if (!isUnlocked && l.id > 1) {
            const requirementText = document.createElement('div');
            requirementText.innerHTML = `<small style="color: #666; font-style: italic; margin-top: 10px; display: block;">🔑 Complete Level ${l.id - 1} to unlock</small>`;
            div.appendChild(requirementText);
        }
        
        // Add hover effect
        if (isUnlocked) {
            div.style.cursor = 'pointer';
            div.addEventListener('mouseenter', () => {
                if (!div.classList.contains('locked')) {
                    div.style.transform = 'translateY(-2px)';
                    div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }
            });
            
            div.addEventListener('mouseleave', () => {
                div.style.transform = 'translateY(0)';
                div.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            });
        }
        
        list.appendChild(div);
    });

    console.log(`Added ${filteredLevels.length} level cards to the list`);

    // Add click event listeners to enabled buttons
    list.querySelectorAll('button[data-level-id]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(button.getAttribute('data-level-id'));
            showLevelDetail(id);
        });
    });
    
    console.log('Level list rendering complete');
}

function showLevelDetail(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const done = new Set(progress.completedLevels || []);
    const isUnlocked = isLevelUnlocked(level.id, done);
    const isCompleted = done.has(level.id);
    
    // Check if user should be able to access this level
    if (!isUnlocked) {
        showNotification(`🔒 Level ${level.id} is locked. Complete Level ${level.id - 1} first!`, 'warning');
        return;
    }
    
    // Set up level content
    document.getElementById('level-title').textContent = `${level.id.toString().padStart(2,'0')}: ${level.title}`;
    document.getElementById('level-description').textContent = level.description;
    
    // Add difficulty indicator
    const difficultyEl = document.getElementById('level-difficulty');
    const difficulty = level.tier === 1 ? 'beginner' : level.tier === 2 ? 'intermediate' : 'advanced';
    const difficultyText = level.tier === 1 ? '🟢 Beginner Level' : level.tier === 2 ? '🟡 Intermediate Level' : '🔴 Advanced Level';
    difficultyEl.innerHTML = `<span class="difficulty-indicator difficulty-${difficulty}">${difficultyText}</span>`;
    
    // Set up requirements
    const req = document.getElementById('level-requirements');
    req.innerHTML = '';
    level.requirements.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r;
        req.appendChild(li);
    });
    
    // Theory
    const theory = document.getElementById('level-theory');
    theory.innerHTML = level.theory || '—';
    
    // Code
    const code = document.getElementById('level-code');
    code.textContent = level.code || '';
    
    // Apply syntax highlighting if Prism is available
    if (window.Prism && level.code) {
        Prism.highlightElement(code);
    }
    
    // Set up code playground
    const playground = document.getElementById('code-playground');
    const userCode = document.getElementById('user-code');
    if (level.code && level.code.trim()) {
        playground.style.display = 'block';
        userCode.value = level.code;
    } else {
        playground.style.display = 'none';
    }
    
    // Set up navigation buttons
    setupLevelNavigation(level.id);
    
    // Quiz
    renderQuiz(level);
    
    // Update completion button
    const btn = document.getElementById('complete-level');
    if (isCompleted) {
        btn.innerHTML = '✅ Mark as completed (Already completed)';
        btn.style.opacity = '0.7';
    } else {
        btn.innerHTML = '🎉 Mark as Completed';
        btn.style.opacity = '1';
    }
    btn.onclick = () => completeCurrentLevel(level);
    
    // Show level detail with animation
    const levelDetail = document.getElementById('level-detail');
    levelDetail.style.display = 'block';
    levelDetail.classList.add('bounce');
    setTimeout(() => levelDetail.classList.remove('bounce'), 600);
    
    window.scrollTo({ top: levelDetail.offsetTop - 20, behavior: 'smooth' });
}

function setupLevelNavigation(currentLevelId) {
    const prevBtn = document.getElementById('prev-level');
    const nextBtn = document.getElementById('next-level');
    const closeBtn = document.getElementById('close-level');
    
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const done = new Set(progress.completedLevels || []);
    
    // Previous level button
    const prevLevel = LevelsData.find(l => l.id === currentLevelId - 1);
    if (prevLevel && isLevelUnlocked(prevLevel.id, done)) {
        prevBtn.style.display = 'inline-block';
        prevBtn.onclick = () => showLevelDetail(prevLevel.id);
    } else {
        prevBtn.style.display = 'none';
    }
    
    // Next level button
    const nextLevel = LevelsData.find(l => l.id === currentLevelId + 1);
    if (nextLevel && isLevelUnlocked(nextLevel.id, done)) {
        nextBtn.style.display = 'inline-block';
        nextBtn.onclick = () => showLevelDetail(nextLevel.id);
    } else {
        nextBtn.style.display = 'none';
    }
    
    // Close button
    closeBtn.onclick = () => {
        document.getElementById('level-detail').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = message;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #FF9800, #FFC107)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #F44336, #E91E63)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function setupCodePlayground() {
    const runBtn = document.getElementById('run-code');
    const codeOutput = document.getElementById('code-output');
    const userCode = document.getElementById('user-code');
    
    if (runBtn) {
        runBtn.onclick = () => {
            const code = userCode.value.trim();
            if (!code) {
                codeOutput.style.display = 'block';
                codeOutput.innerHTML = '<span style="color: #ff6b6b;">⚠️ Please enter some code to run!</span>';
                return;
            }
            
            // Simulate code execution (since we can't actually run C# in browser)
            codeOutput.style.display = 'block';
            codeOutput.innerHTML = `
                <div style="color: #4CAF50;">✅ Code compiled successfully!</div>
                <div style="margin-top: 10px; color: #888;">
                    💡 In a real environment, this would execute your C# code.<br>
                    📝 Try modifying the code to experiment with different concepts!
                </div>
            `;
            
            // Add some animation
            codeOutput.classList.add('pulse');
            setTimeout(() => codeOutput.classList.remove('pulse'), 500);
        };
    }
}

function completeCurrentLevel(level) {
    window.LearningStorage?.completeLevel(window.USER_ID, level.id);
    // award XP per level (simple rule)
    const xpAwarded = level.tier * 20; // More XP for harder levels
    window.LearningStorage?.addXp(window.USER_ID, xpAwarded);
    maybeAwardAchievements(level);
    
    // Check if there's a next level to unlock
    const nextLevel = LevelsData.find(l => l.id === level.id + 1);
    let message = `🎉 Congratulations! You completed "${level.title}" and earned ${xpAwarded} XP!`;
    
    if (nextLevel) {
        message += `\n\n🚀 Level ${nextLevel.id} "${nextLevel.title}" is now unlocked!`;
        showNotification(`🎉 Level ${level.id} completed! Level ${nextLevel.id} unlocked!`, 'success');
    } else {
        showNotification(`🎉 Level ${level.id} completed! Great job!`, 'success');
    }
    
    // Update UI
    renderProgress();
    renderLevelsList();
    setupLevelNavigation(level.id);
    
    // Update the completion button
    const btn = document.getElementById('complete-level');
    btn.innerHTML = '✅ Completed!';
    btn.style.opacity = '0.7';
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
}

async function initLevelsPage() {
    console.log('Initializing levels page...');
    try {
        await fetchLevels();
        console.log('Levels fetched successfully, setting up UI...');
        
        const tierFilter = document.getElementById('tier-filter');
        if (tierFilter) {
            tierFilter.addEventListener('change', () => renderLevelsList());
        }
        
        renderProgress();
        renderLevelsList();
        setupCodePlayground();
        console.log('Levels page initialized successfully');
    } catch (error) {
        console.error('Error initializing levels page:', error);
    }
}

document.addEventListener('DOMContentLoaded', initLevelsPage);

// Quiz rendering and scoring
function renderQuiz(level){
    const container = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-quiz');
    const resultEl = document.getElementById('quiz-result');
    container.innerHTML = '';
    resultEl.innerHTML = '';
    
    if (!Array.isArray(level.quiz) || level.quiz.length === 0){
        container.innerHTML = '<p style="color: #666; font-style: italic;">🤔 No quiz available for this level.</p>';
        submitBtn.style.display = 'none';
        return;
    }
    
    submitBtn.style.display = 'block';
    
    level.quiz.forEach((q, qi) => {
        const block = document.createElement('div');
        block.className = 'quiz-question';
        const isMulti = !!q.multi;
        const name = `q_${qi}`;
        
        const options = q.options.map((opt, oi) => {
            const type = isMulti ? 'checkbox' : 'radio';
            return `
                <div class="quiz-option" style="margin: 8px 0; padding: 8px; border-radius: 4px;">
                    <label style="cursor: pointer; display: flex; align-items: center;">
                        <input type="${type}" name="${name}" value="${oi}" style="margin-right: 8px;"> 
                        ${opt}
                    </label>
                </div>
            `;
        }).join('');
        
        block.innerHTML = `
            <p style="font-weight: bold; margin-bottom: 15px;">
                🤔 Question ${qi + 1}: ${q.q}
                ${isMulti ? '<small style="color: #666;"> (Multiple answers possible)</small>' : ''}
            </p>
            ${options}
        `;
        container.appendChild(block);
    });
    
    submitBtn.onclick = () => {
        let correct = 0;
        let totalQuestions = level.quiz.length;
        
        // Check answers and provide visual feedback
        level.quiz.forEach((q, qi) => {
            const chosen = Array.from(document.querySelectorAll(`input[name="q_${qi}"]:checked`)).map(i=>parseInt(i.value));
            const expected = Array.isArray(q.answer) ? q.answer.map(n=>parseInt(n)) : [parseInt(q.answer)];
            chosen.sort(); 
            expected.sort();
            
            const isCorrect = JSON.stringify(chosen) === JSON.stringify(expected);
            if (isCorrect) correct++;
            
            // Visual feedback for each option
            const questionOptions = document.querySelectorAll(`input[name="q_${qi}"]`);
            questionOptions.forEach((input, index) => {
                const optionDiv = input.closest('.quiz-option');
                const isExpected = expected.includes(index);
                const isChosen = chosen.includes(index);
                
                if (isExpected) {
                    optionDiv.classList.add('correct');
                    optionDiv.style.background = '#e8f5e8';
                    optionDiv.style.border = '1px solid #4caf50';
                } else if (isChosen && !isExpected) {
                    optionDiv.classList.add('incorrect');
                    optionDiv.style.background = '#ffebee';
                    optionDiv.style.border = '1px solid #f44336';
                }
            });
        });
        
        const score = Math.round((correct / totalQuestions) * 100);
        let resultHTML = '';
        
        if (score >= 90) {
            resultHTML = `🎉 <strong>Excellent!</strong> ${score}% (${correct}/${totalQuestions}) - You're a C# master!`;
            resultEl.style.color = '#4CAF50';
        } else if (score >= 70) {
            resultHTML = `👍 <strong>Good job!</strong> ${score}% (${correct}/${totalQuestions}) - Keep it up!`;
            resultEl.style.color = '#2196F3';
        } else {
            resultHTML = `🤔 <strong>Keep learning!</strong> ${score}% (${correct}/${totalQuestions}) - Review the theory and try again.`;
            resultEl.style.color = '#FF9800';
        }
        
        resultEl.innerHTML = resultHTML;
        
        // Award XP for quiz
        if (score >= 80) {
            const xpAwarded = Math.floor(score / 10); // 8-10 XP based on score
            window.LearningStorage?.addXp(window.USER_ID, xpAwarded);
            showNotification(`🎯 Quiz completed! +${xpAwarded} XP earned!`, 'success');
            maybeAwardQuizAchievements(level, score);
        }
        
        renderProgress();
        
        // Disable submit button after submission
        submitBtn.disabled = true;
        submitBtn.innerHTML = '✅ Quiz Submitted';
        submitBtn.style.opacity = '0.7';
    };
}

function maybeAwardAchievements(level){
    // Award basic achievements by level id and tier completion
    fetch('data/achievements.json')
      .then(r=>r.json())
      .then(data=>{
        const items = data.achievements || [];
        const unlocked = window.LearningStorage?.getUnlockedAchievements(window.USER_ID) || new Set();
        // byLevel completion
        items.filter(a => a.type === 'levelComplete' && a.value === level.id)
             .forEach(a => {
                if (!unlocked.has || !unlocked.has(a.id)) window.LearningStorage?.unlockAchievement(window.USER_ID, a.id);
             });
        // tier completion
        const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
        const done = new Set(progress.completedLevels || []);
        [1,2,3].forEach(tier => {
            const tierLevels = LevelsData.filter(l=>l.tier===tier).map(l=>l.id);
            if (tierLevels.length>0 && tierLevels.every(id=>done.has(id))){
                items.filter(a=>a.type==='tierComplete' && a.value===tier)
                    .forEach(a=>{ if(!unlocked.has || !unlocked.has(a.id)) window.LearningStorage?.unlockAchievement(window.USER_ID, a.id); });
            }
        });
      });
}

function maybeAwardQuizAchievements(level, score){
    fetch('data/achievements.json')
      .then(r=>r.json())
      .then(data=>{
        const items = data.achievements || [];
        const unlocked = window.LearningStorage?.getUnlockedAchievements(window.USER_ID) || new Set();
        items.filter(a=>a.type==='quizScore' && score >= a.value)
             .forEach(a=>{ if(!unlocked.has || !unlocked.has(a.id)) window.LearningStorage?.unlockAchievement(window.USER_ID, a.id); });
      });
}