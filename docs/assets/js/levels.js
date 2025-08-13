// levels.js (data-driven)

let LevelsData = [];

// Preloader functions
function showPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.remove('hidden');
    }
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500); // Small delay for better UX
    }
}

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

// Fetch levels data with progress tracking
async function fetchLevels() {
    try {
        updateLoadingProgress(10, 'Connecting to server...');
        
        const response = await fetch('data/levels.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        updateLoadingProgress(30, 'Receiving data...');
        
        // Get the content length for progress tracking
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
            
            // Combine chunks into final response
            const allChunks = new Uint8Array(loaded);
            let position = 0;
            for (const chunk of chunks) {
                allChunks.set(chunk, position);
                position += chunk.length;
            }
            
            const text = new TextDecoder().decode(allChunks);
            updateLoadingProgress(80, 'Processing curriculum...');
            
            const data = JSON.parse(text);
            
            // Assign to global variable - extract levels array from JSON
            LevelsData = data.levels || [];
            
            updateLoadingProgress(90, 'Initializing interface...');
            
            return data;
        } else {
            // Fallback for servers that don't provide content-length
            updateLoadingProgress(50, 'Loading curriculum data...');
            const data = await response.json();
            
            // Assign to global variable - extract levels array from JSON
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

function renderProgress() {
    const progressEl = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const xpDisplay = document.getElementById('xp-display');
    
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const completed = (progress.completedLevels || []).length;
    const total = LevelsData.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    const xp = progress.xp || 0;
    
    // Calculate unlocked levels
    const done = new Set(progress.completedLevels || []);
    const unlocked = LevelsData.filter(l => isLevelUnlocked(l.id, done)).length;
    const nextLevelToUnlock = LevelsData.find(l => !isLevelUnlocked(l.id, done));
    
    // Update text with cleaner information
    let progressText = `🎯 ${completed}/${total} levels completed`;
    if (unlocked < total) {
        progressText += ` | 🔓 ${unlocked} available`;
        if (nextLevelToUnlock) {
            progressText += ` | 🎯 Complete Level ${nextLevelToUnlock.id - 1} to unlock "${nextLevelToUnlock.title}"`;
        }
    }
    
    progressEl.textContent = progressText;
    
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
    
    // Update weakness detection
    renderWeaknessDetection();
}

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
        weaknessList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #4CAF50;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h3>Excellent Performance!</h3>
                <p>No significant weaknesses detected. Keep up the great work!</p>
            </div>
        `;
        weaknessSection.style.display = 'block';
        return;
    }
    
    let html = '<div class="weaknesses-grid">';
    
    weaknesses.forEach(weakness => {
        const severityColor = weakness.weaknessScore > 70 ? '#f44336' : 
                             weakness.weaknessScore > 50 ? '#ff9800' : '#ffc107';
        
        const improvementTip = getImprovementTip(weakness.concept);
        
        html += `
            <div class="weakness-card" style="
                border: 2px solid ${severityColor};
                border-radius: 10px;
                padding: 1rem;
                margin: 0.5rem 0;
                background: linear-gradient(135deg, ${severityColor}15, ${severityColor}05);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; color: ${severityColor};">📚 ${weakness.concept}</h4>
                    <span style="
                        background: ${severityColor};
                        color: white;
                        padding: 0.3rem 0.6rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: bold;
                    ">${weakness.weaknessScore}% needs work</span>
                </div>
                <div style="margin: 0.5rem 0;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                        <span>Accuracy: ${weakness.accuracy}%</span>
                        <span>Recent: ${weakness.recentAccuracy}%</span>
                        <span>Attempts: ${weakness.totalAttempts}</span>
                    </div>
                    <div style="background: #e0e0e0; border-radius: 10px; height: 6px; margin: 0.5rem 0;">
                        <div style="
                            background: ${severityColor};
                            height: 100%;
                            width: ${weakness.accuracy}%;
                            border-radius: 10px;
                            transition: width 0.5s ease;
                        "></div>
                    </div>
                </div>
                <div style="font-size: 0.9rem; color: #666;">
                    💡 <strong>Tip:</strong> ${improvementTip}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    weaknessList.innerHTML = html;
    weaknessSection.style.display = 'block';
}

function getImprovementTip(concept) {
    const tips = {
        'Basic Syntax': 'Review C# syntax fundamentals and practice writing simple programs.',
        'Data Types': 'Focus on understanding value vs reference types and their memory behavior.',
        'Type Conversion': 'Practice explicit and implicit conversions between different data types.',
        'Namespaces': 'Learn about organizing code with namespaces and using directives.',
        'Conditional Logic': 'Practice if-else statements and boolean logic expressions.',
        'Switch Statements': 'Master switch statements and pattern matching syntax.',
        'For Loops': 'Practice loop control, initialization, conditions, and incrementors.',
        'While Loops': 'Focus on loop conditions and preventing infinite loops.',
        'Foreach Loops': 'Practice iterating over collections and arrays.',
        'Iterators': 'Learn about IEnumerable and yield return statements.',
        'CLR Fundamentals': 'Study the Common Language Runtime and compilation process.',
        'Framework Class Library': 'Explore built-in .NET classes and their usage.',
        'IDE Usage': 'Practice using Visual Studio or VS Code efficiently.',
        'Classes and Objects': 'Master object-oriented programming fundamentals.',
        'OOP Principles': 'Focus on inheritance, polymorphism, encapsulation, and abstraction.',
        'Advanced OOP': 'Study interfaces, abstract classes, and design patterns.',
        'Built-in Collections': 'Practice with List, Dictionary, Array, and other collections.',
        'Custom Collections': 'Learn to implement IEnumerable and custom collection types.',
        'Exception Handling': 'Master try-catch-finally blocks and exception types.',
        'Custom Exceptions': 'Practice creating and throwing custom exception classes.',
        'Debugging': 'Learn debugging techniques and tools in your IDE.',
        'Delegates and Events': 'Study functional programming concepts and event handling.',
        'LINQ': 'Practice querying data with Language Integrated Query.',
        'Async Programming': 'Master async/await patterns and Task-based programming.',
        'ADO.NET': 'Learn database connectivity and data access patterns.',
        'Entity Framework': 'Practice ORM concepts and database-first/code-first approaches.',
        'File I/O': 'Study file operations, streams, and serialization.',
        'XAML Basics': 'Learn markup syntax for WPF and UWP applications.',
        'Advanced WPF': 'Master data binding, MVVM pattern, and custom controls.',
        'ASP.NET Core': 'Practice web development with controllers and middleware.',
        'Blazor': 'Learn component-based web development with C#.',
        'Security': 'Study authentication, authorization, and security best practices.',
        'Razor Pages vs MVC': 'Compare different web development patterns in ASP.NET.',
        'Cross-Platform Development': 'Learn about .NET Core and deployment strategies.'
    };
    
    return tips[concept] || 'Review the theory and practice more exercises in this area.';
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
    
    if (!LevelsData || !Array.isArray(LevelsData)) {
        console.error('LevelsData is not a valid array:', LevelsData);
        list.innerHTML = '<p>Error: Level data is not properly loaded. Please refresh the page.</p>';
        return;
    }
    
    console.log(`Rendering ${LevelsData.length} levels`);
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const done = new Set(progress.completedLevels || []);
    list.innerHTML = '';
    
    const filteredLevels = LevelsData.filter(l => {
        // Filter by unlock status - only show unlocked levels
        const isUnlocked = isLevelUnlocked(l.id, done);
        
        return isUnlocked;
    });
    console.log(`Showing ${filteredLevels.length} unlocked levels`);
    
    if (filteredLevels.length === 0) {
        list.innerHTML = '<p>No levels available. Please check if the data loaded correctly.</p>';
        return;
    }
    
    filteredLevels.forEach(l => {
        const isCompleted = done.has(l.id);
        
        const div = document.createElement('div');
        div.className = 'card level-card';
        
        // Add appropriate classes for styling
        if (isCompleted) {
            div.classList.add('completed');
        } else {
            div.classList.add('unlocked');
        }
        
        // Determine difficulty and status
        const difficulty = l.tier === 1 ? 'beginner' : l.tier === 2 ? 'intermediate' : 'advanced';
        const difficultyText = l.tier === 1 ? '🟢 Beginner' : l.tier === 2 ? '🟡 Intermediate' : '🔴 Advanced';
        
        let status, buttonContent;
        if (isCompleted) {
            status = '✅ Completed';
            buttonContent = '📖 Review';
        } else {
            status = '🔓 Ready to Start';
            buttonContent = '🚀 Start Level';
        }
        
        div.innerHTML = `
            <div class="level-card-header" style="margin-bottom: 1rem;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: clamp(1.1rem, 2.5vw, 1.3rem);">${l.id.toString().padStart(2,'0')}: ${l.title}</h3>
                <span class="difficulty-indicator difficulty-${difficulty}" style="font-size: 0.8rem; padding: 0.2rem 0.5rem; border-radius: 12px; font-weight: bold;">${difficultyText}</span>
            </div>
            <p style="margin: 0.5rem 0 1rem 0; color: #666; line-height: 1.5; font-size: 0.9rem;">${l.description}</p>
            <div class="level-card-footer" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <span style="font-weight: bold; color: ${isCompleted ? '#4CAF50' : '#2196F3'}; font-size: 0.9rem;">
                    ${status}
                </span>
                <button class="button" data-level-id="${l.id}" style="border: none; cursor: pointer; padding: 0.6rem 1rem; font-size: 0.9rem; min-width: 100px;">${buttonContent}</button>
            </div>
        `;
        
        // Add hover effect for all visible levels (they're all unlocked)
        div.style.cursor = 'pointer';
        div.addEventListener('mouseenter', () => {
            div.style.transform = 'translateY(-2px)';
            div.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        div.addEventListener('mouseleave', () => {
            div.style.transform = 'translateY(0)';
            div.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
        
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
    
    // Clear any existing proceed section from previous level completion
    const existingProceedSection = document.getElementById('proceed-section');
    if (existingProceedSection) {
        existingProceedSection.remove();
    }
    
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
    if (level.code) {
        // Replace \n with actual line breaks for proper display
        const formattedCode = level.code.replace(/\\n/g, '\n');
        code.textContent = formattedCode;
    } else {
        code.textContent = '';
    }
    
    // Apply syntax highlighting if Prism is available
    if (window.Prism && level.code) {
        Prism.highlightElement(code);
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
        btn.disabled = false;
        btn.style.cursor = 'pointer';
    } else {
        // Start disabled - user must complete quiz perfectly
        btn.innerHTML = '🔒 Complete quiz perfectly to unlock';
        btn.style.opacity = '0.5';
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    }
    btn.onclick = () => {
        if (!btn.disabled) {
            completeCurrentLevel(level);
        }
    };
    
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

function completeCurrentLevel(level) {
    // Prevent completion if button is disabled
    const btn = document.getElementById('complete-level');
    if (btn.disabled) {
        showNotification('Complete the quiz perfectly first!', 'warning');
        return;
    }
    
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
    btn.innerHTML = '✅ Completed!';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
    
    // Add "Proceed to Next Level" functionality
    showProceedToNextLevel(level, nextLevel);
}

// Show proceed to next level options after completion
function showProceedToNextLevel(currentLevel, nextLevel) {
    // Create or update the proceed section
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
        
        // Insert after the completion button
        const completeBtn = document.getElementById('complete-level');
        completeBtn.parentNode.insertBefore(proceedSection, completeBtn.nextSibling);
    }
    
    let content = `
        <h3 style="color: #4CAF50; margin-top: 0; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            🎉 Level ${currentLevel.id} Complete!
        </h3>
        <p style="margin: 1rem 0; color: #333; font-size: 1.1rem;">
            Great job mastering "${currentLevel.title}"! 
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.5rem;">
    `;
    
    if (nextLevel) {
        // Show next level option
        content += `
            <button onclick="proceedToLevel(${nextLevel.id})" class="proceed-button primary">
                🚀 Continue to Level ${nextLevel.id}
                <small style="display: block; font-size: 0.9em; margin-top: 0.2rem;">
                    "${nextLevel.title}"
                </small>
            </button>
        `;
    }
    
    // Always show option to browse all levels
    content += `
        <button onclick="proceedToBrowse()" class="proceed-button">
            📚 Browse All Levels
        </button>
        <button onclick="proceedToAchievements()" class="proceed-button">
            🏆 View Achievements
        </button>
    `;
    
    // If this is the last level, show special completion message
    if (!nextLevel) {
        content += `
            <div style="margin-top: 1rem; padding: 1rem; background: #fff3cd; border-radius: 8px; border: 1px solid #ffeaa7;">
                <strong style="color: #b8860b;">🎓 Congratulations!</strong>
                <p style="margin: 0.5rem 0 0 0; color: #856404;">
                    You've completed all available levels! You're now a C# master! 🎉
                </p>
            </div>
        `;
    }
    
    content += '</div>';
    proceedSection.innerHTML = content;
    
    // Add smooth scroll to the new section
    setTimeout(() => {
        proceedSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// Proceed to specific level
function proceedToLevel(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (level) {
        // Hide the proceed section first
        const proceedSection = document.getElementById('proceed-section');
        if (proceedSection) {
            proceedSection.style.display = 'none';
        }
        
        // Show the next level
        showLevelDetail(levelId);
        showNotification(`🚀 Starting Level ${levelId}: ${level.title}`, 'info');
    }
}

// Proceed to browse all levels
function proceedToBrowse() {
    // Close level detail view
    const levelDetail = document.getElementById('level-detail');
    if (levelDetail) {
        levelDetail.style.display = 'none';
    }
    
    // Scroll to levels list
    const levelsSection = document.getElementById('levels-list');
    if (levelsSection) {
        levelsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    showNotification('📚 Browse and select your next challenge!', 'info');
}

// Proceed to achievements page
function proceedToAchievements() {
    window.location.href = 'achievements.html';
}

// Show proceed section for completed levels (used after good score completion)
function maybeShowProceedSection(level) {
    const nextLevel = LevelsData.find(l => l.id === level.id + 1);
    
    // Always show the proceed section for completed levels
    showProceedToNextLevel(level, nextLevel);
}

async function initLevelsPage() {
    console.log('Initializing levels page...');
    showPreloader();
    
    try {
        updateLoadingProgress(5, 'Starting application...');
        
        await fetchLevels();
        console.log('Levels fetched successfully, setting up UI...');
        console.log('LevelsData:', LevelsData);
        
        updateLoadingProgress(95, 'Finalizing setup...');
        
        renderProgress();
        renderLevelsList();
        
        // Add responsive enhancements
        addResponsiveEnhancements();
        
        // Initialize practice section
        initializePracticeSection();
        
        // Set up weakness detection toggle
        const toggleWeaknessBtn = document.getElementById('toggle-weaknesses');
        if (toggleWeaknessBtn) {
            toggleWeaknessBtn.addEventListener('click', () => {
                const weaknessSection = document.getElementById('weakness-section');
                const weaknessList = document.getElementById('weaknesses-list');
                
                if (weaknessList.style.display === 'none') {
                    weaknessList.style.display = 'block';
                    toggleWeaknessBtn.textContent = '📊 Hide Analysis';
                } else {
                    weaknessList.style.display = 'none';
                    toggleWeaknessBtn.textContent = '📊 Show Analysis';
                }
            });
        }
        
        updateLoadingProgress(100, 'Ready to learn!');
        console.log('Levels page initialized successfully');
        
        // Hide preloader after a short delay
        setTimeout(() => {
            hidePreloader();
        }, 500);
    } catch (error) {
        console.error('Error initializing levels page:', error);
        updateLoadingProgress(0, 'Failed to load. Please refresh the page.');
        
        // Show error message and hide preloader after delay
        setTimeout(() => {
            hidePreloader();
            showErrorMessage('Failed to load the curriculum. Please check your internet connection and refresh the page.');
        }, 2000);
    }
}

function showErrorMessage(message) {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #e74c3c;">
                <h2>⚠️ Loading Error</h2>
                <p>${message}</p>
                <button onclick="location.reload()" style="
                    padding: 10px 20px; 
                    background: #3498db; 
                    color: white; 
                    border: none; 
                    border-radius: 5px; 
                    cursor: pointer; 
                    margin-top: 20px;
                ">
                    Refresh Page
                </button>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', initLevelsPage);

// Add responsive and touch enhancements
function addResponsiveEnhancements() {
    // Add touch-friendly interactions
    const cards = document.querySelectorAll('.level-card, .card, .button');
    cards.forEach(card => {
        // Add touch feedback
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Improve quiz option touch targets on mobile
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.style.minHeight = '44px'; // iOS recommended touch target
        option.style.display = 'flex';
        option.style.alignItems = 'center';
    });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.scrollTo(0, window.scrollY + 1);
            window.scrollTo(0, window.scrollY - 1);
        }, 100);
    });
    
    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}

// Concept mapping for weakness detection
function getConceptForLevel(levelId, questionIndex) {
    const conceptMap = {
        1: 'Basic Syntax',
        2: 'Data Types',
        3: 'Type Conversion',
        4: 'Namespaces',
        5: 'Conditional Logic',
        6: 'Switch Statements',
        7: 'For Loops',
        8: 'While Loops',
        9: 'Foreach Loops',
        10: 'Iterators',
        11: 'CLR Fundamentals',
        12: 'Framework Class Library',
        13: 'IDE Usage',
        14: 'Classes and Objects',
        15: 'OOP Principles',
        16: 'Advanced OOP',
        17: 'Built-in Collections',
        18: 'Custom Collections',
        19: 'Exception Handling',
        20: 'Custom Exceptions',
        21: 'Debugging',
        22: 'Delegates and Events',
        23: 'LINQ',
        24: 'Async Programming',
        25: 'ADO.NET',
        26: 'Entity Framework',
        27: 'File I/O',
        28: 'XAML Basics',
        29: 'Advanced WPF',
        30: 'ASP.NET Core',
        31: 'Blazor',
        32: 'Security',
        33: 'Razor Pages vs MVC',
        34: 'Cross-Platform Development'
    };
    
    return conceptMap[levelId] || `Level ${levelId}`;
}

function getDifficultyForLevel(levelId) {
    if (levelId <= 10) return 'Beginner';
    if (levelId <= 25) return 'Intermediate';
    return 'Advanced';
}

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
        const concept = getConceptForLevel(level.id);
        const difficulty = getDifficultyForLevel(level.id);
        
        // Check answers and provide visual feedback
        level.quiz.forEach((q, qi) => {
            const chosen = Array.from(document.querySelectorAll(`input[name="q_${qi}"]:checked`)).map(i=>parseInt(i.value));
            const expected = Array.isArray(q.answer) ? q.answer.map(n=>parseInt(n)) : [parseInt(q.answer)];
            chosen.sort(); 
            expected.sort();
            
            const isCorrect = JSON.stringify(chosen) === JSON.stringify(expected);
            if (isCorrect) correct++;
            
            // Record this question attempt for weakness detection
            window.LearningStorage?.recordQuizAttempt(
                window.USER_ID, 
                level.id, 
                qi, 
                isCorrect, 
                concept, 
                difficulty
            );
            
            // Record missed questions for practice mode
            if (!isCorrect) {
                window.LearningStorage?.recordMissedQuestion(
                    window.USER_ID,
                    level.id,
                    qi,
                    q,
                    chosen,
                    expected
                );
            }
            
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
        const isPerfectScore = correct === totalQuestions;
        const isGoodScore = score >= 70;
        let resultHTML = '';
        
        if (score >= 90) {
            resultHTML = `🎉 <strong>Excellent!</strong> ${score}% (${correct}/${totalQuestions}) - You're a C# master!`;
            resultEl.style.color = '#4CAF50';
        } else if (score >= 70) {
            resultHTML = `👍 <strong>Good job!</strong> ${score}% (${correct}/${totalQuestions}) - Keep it up!<br>
                <div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                    <button onclick="proceedWithGoodScore(${level.id})" class="btn btn-success" style="background: #4CAF50; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        ✅ Proceed to Next Level
                    </button>
                    <button onclick="retryIncorrectQuestions(${level.id})" class="btn btn-warning" style="background: #FF9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        🔄 Retry Wrong Answers Only
                    </button>
                </div>`;
            resultEl.style.color = '#2196F3';
        } else {
            resultHTML = `🤔 <strong>Keep learning!</strong> ${score}% (${correct}/${totalQuestions})<br>
                <div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                    <button onclick="retryIncorrectQuestions(${level.id})" class="btn btn-warning" style="background: #FF9800; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        🔄 Retry Wrong Answers Only
                    </button>
                    <button onclick="resetQuiz(${level.id})" class="btn btn-secondary" style="background: #6c757d; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        🔄 Start Over
                    </button>
                </div>`;
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
        
        // Update completion button based on quiz performance
        const completeBtn = document.getElementById('complete-level');
        if (isPerfectScore) {
            // Enable completion button for perfect score
            completeBtn.disabled = false;
            completeBtn.style.opacity = '1';
            completeBtn.style.cursor = 'pointer';
            if (!completeBtn.innerHTML.includes('Already completed')) {
                completeBtn.innerHTML = '🎉 Mark as Completed';
            }
        } else if (isGoodScore) {
            // For good scores (70%+), completion is handled by the "Proceed" button
            // Keep the regular completion button disabled for now
            completeBtn.disabled = true;
            completeBtn.style.opacity = '0.5';
            completeBtn.style.cursor = 'not-allowed';
            if (!completeBtn.innerHTML.includes('Already completed')) {
                completeBtn.innerHTML = '🎯 Use "Proceed" button above or retry for perfect score';
            }
        } else {
            // Disable completion button for low scores
            completeBtn.disabled = true;
            completeBtn.style.opacity = '0.5';
            completeBtn.style.cursor = 'not-allowed';
            if (!completeBtn.innerHTML.includes('Already completed')) {
                completeBtn.innerHTML = '🔒 Complete quiz perfectly to unlock';
            }
        }
        
        // Disable submit button after submission
        submitBtn.disabled = true;
        submitBtn.innerHTML = '✅ Quiz Submitted';
        submitBtn.style.opacity = '0.7';
    };
}

// Reset quiz function for trying again
function resetQuiz(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    // Clear all visual feedback and reset styles
    const container = document.getElementById('quiz-container');
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
        option.style.background = '';
        option.style.border = '';
    });
    
    // Uncheck all inputs
    const inputs = container.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => {
        input.checked = false;
    });
    
    // Clear result display
    const resultEl = document.getElementById('quiz-result');
    resultEl.innerHTML = '';
    
    // Re-enable submit button
    const submitBtn = document.getElementById('submit-quiz');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Submit Quiz';
    submitBtn.style.opacity = '1';
    
    // Reset completion button to disabled state
    const completeBtn = document.getElementById('complete-level');
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const isCompleted = (progress.completedLevels || []).includes(levelId);
    
    if (!isCompleted) {
        completeBtn.disabled = true;
        completeBtn.style.opacity = '0.5';
        completeBtn.style.cursor = 'not-allowed';
        completeBtn.innerHTML = '🔒 Complete quiz perfectly to unlock';
    }
    
    // Scroll to quiz for better UX
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Allow users to proceed with good scores (70%+)
function proceedWithGoodScore(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    // Mark level as completed even with good (not perfect) score
    window.LearningStorage?.completeLevel(window.USER_ID, levelId);
    
    // Update the completion button
    const completeBtn = document.getElementById('complete-level');
    completeBtn.disabled = false;
    completeBtn.style.opacity = '1';
    completeBtn.style.cursor = 'pointer';
    completeBtn.innerHTML = '🎉 Level Completed!';
    
    // Award some XP for good completion
    const xpAwarded = 5; // Reduced XP for non-perfect score
    window.LearningStorage?.addXp(window.USER_ID, xpAwarded);
    showNotification(`🎯 Level completed with good score! +${xpAwarded} XP earned!`, 'success');
    
    // Update progress display
    renderProgress();
    
    // Show proceed section
    maybeShowProceedSection(level);
    
    // Maybe award achievements
    maybeAwardAchievements(level);
}

// Smart retry that only resets incorrectly answered questions
function retryIncorrectQuestions(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    const container = document.getElementById('quiz-container');
    
    // Find all questions that were answered incorrectly
    const incorrectQuestions = [];
    
    level.quiz.forEach((question, questionIndex) => {
        const expectedAnswers = question.correct;
        const inputs = container.querySelectorAll(`input[name="q_${questionIndex}"]`);
        const chosenAnswers = [];
        
        inputs.forEach((input, index) => {
            if (input.checked) {
                chosenAnswers.push(index);
            }
        });
        
        // Check if this question was answered incorrectly
        const isCorrect = expectedAnswers.length === chosenAnswers.length &&
                         expectedAnswers.every(ans => chosenAnswers.includes(ans));
        
        if (!isCorrect) {
            incorrectQuestions.push(questionIndex);
        }
    });
    
    // Reset only the incorrect questions
    incorrectQuestions.forEach(questionIndex => {
        // Clear visual feedback for this question
        const questionOptions = container.querySelectorAll(`input[name="q_${questionIndex}"]`);
        questionOptions.forEach(input => {
            const optionDiv = input.closest('.quiz-option');
            optionDiv.classList.remove('correct', 'incorrect');
            optionDiv.style.background = '';
            optionDiv.style.border = '';
            
            // Only uncheck if this was an incorrect question
            input.checked = false;
        });
    });
    
    // Clear result display
    const resultEl = document.getElementById('quiz-result');
    resultEl.innerHTML = `<div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #2196F3;">
        <strong>🔄 Smart Retry Mode</strong><br>
        Only questions you got wrong have been reset. Your correct answers are preserved!<br>
        <small style="opacity: 0.8;">Questions to retry: ${incorrectQuestions.length} out of ${level.quiz.length}</small>
    </div>`;
    
    // Re-enable submit button
    const submitBtn = document.getElementById('submit-quiz');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Submit Quiz';
    submitBtn.style.opacity = '1';
    
    // Scroll to the first incorrect question for better UX
    if (incorrectQuestions.length > 0) {
        const firstIncorrectInput = container.querySelector(`input[name="q_${incorrectQuestions[0]}"]`);
        if (firstIncorrectInput) {
            firstIncorrectInput.closest('.quiz-question').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
    
    showNotification(`🔄 Smart retry activated! ${incorrectQuestions.length} questions reset`, 'info');
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

// Practice Again Functionality
let currentPracticeQuestions = [];
let currentPracticeIndex = 0;
let practiceStats = { total: 0, correct: 0 };

function initializePracticeSection() {
    const practiceSection = document.getElementById('practice-section');
    const startButton = document.getElementById('start-practice');
    const toggleButton = document.getElementById('toggle-practice');
    
    // Load practice stats
    updatePracticeStats();
    
    // Event listeners
    startButton?.addEventListener('click', startPracticeSession);
    toggleButton?.addEventListener('click', togglePracticeSection);
    
    document.getElementById('submit-practice')?.addEventListener('click', submitPracticeAnswer);
    document.getElementById('next-practice')?.addEventListener('click', nextPracticeQuestion);
    document.getElementById('finish-practice')?.addEventListener('click', finishPracticeSession);
}

function updatePracticeStats() {
    const missedQuestions = window.LearningStorage?.getMissedQuestions(window.USER_ID) || [];
    const practiceStatsEl = document.getElementById('practice-stats');
    const startButton = document.getElementById('start-practice');
    
    if (missedQuestions.length === 0) {
        practiceStatsEl.innerHTML = `
            <div style="background: #e8f5e8; padding: 1rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
                <strong>🎉 Great job!</strong> You have no questions to practice. Keep up the excellent work!
            </div>
        `;
        startButton.disabled = true;
        startButton.textContent = '✅ No Questions to Practice';
        startButton.style.opacity = '0.6';
    } else {
        practiceStatsEl.innerHTML = `
            <div style="background: #fff3e0; padding: 1rem; border-radius: 8px; border-left: 4px solid #FF9800;">
                <strong>📚 Practice Available:</strong> ${missedQuestions.length} questions from previous quizzes<br>
                <small style="opacity: 0.8;">These are questions you've answered incorrectly or need more practice with.</small>
            </div>
        `;
        startButton.disabled = false;
        startButton.textContent = '🎯 Start Practice Session';
        startButton.style.opacity = '1';
    }
}

function togglePracticeSection() {
    const practiceSection = document.getElementById('practice-section');
    if (practiceSection.style.display === 'none') {
        practiceSection.style.display = 'block';
        updatePracticeStats();
    } else {
        practiceSection.style.display = 'none';
    }
}

function startPracticeSession() {
    currentPracticeQuestions = window.LearningStorage?.getMissedQuestions(window.USER_ID, 10) || [];
    
    if (currentPracticeQuestions.length === 0) {
        showNotification('No questions available for practice!', 'info');
        return;
    }
    
    currentPracticeIndex = 0;
    practiceStats = { total: 0, correct: 0 };
    
    // Show practice container and hide start button
    document.getElementById('practice-questions-container').style.display = 'block';
    document.getElementById('practice-buttons').style.display = 'none';
    
    showPracticeQuestion();
    showNotification(`🎯 Practice session started! ${currentPracticeQuestions.length} questions to review`, 'success');
}

function showPracticeQuestion() {
    if (currentPracticeIndex >= currentPracticeQuestions.length) {
        finishPracticeSession();
        return;
    }
    
    const question = currentPracticeQuestions[currentPracticeIndex];
    const questionEl = document.getElementById('practice-question');
    const optionsEl = document.getElementById('practice-options');
    const resultEl = document.getElementById('practice-result');
    
    // Clear previous results
    resultEl.innerHTML = '';
    
    // Find the original level to get full question context
    const level = LevelsData.find(l => l.id === question.levelId);
    const levelTitle = level ? level.title : `Level ${question.levelId}`;
    
    // Display question
    questionEl.innerHTML = `
        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">
                📚 From ${levelTitle} • Question ${currentPracticeIndex + 1} of ${currentPracticeQuestions.length}
            </div>
            <h4 style="margin: 0; color: #333;">${question.question}</h4>
        </div>
    `;
    
    // Display options
    const isMultiChoice = Array.isArray(question.correctAnswer) && question.correctAnswer.length > 1;
    const inputType = isMultiChoice ? 'checkbox' : 'radio';
    
    let optionsHTML = '<div class="quiz-options">';
    question.options.forEach((option, index) => {
        optionsHTML += `
            <div class="quiz-option practice-option" style="margin: 0.5rem 0; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; cursor: pointer;">
                <label style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                    <input type="${inputType}" name="practice_q" value="${index}" style="margin-right: 0.5rem;">
                    ${option}
                </label>
            </div>
        `;
    });
    optionsHTML += '</div>';
    
    optionsEl.innerHTML = optionsHTML;
    
    // Show submit button, hide others
    document.getElementById('submit-practice').style.display = 'inline-block';
    document.getElementById('next-practice').style.display = 'none';
    document.getElementById('finish-practice').style.display = 'none';
    
    // Add click handlers for options
    document.querySelectorAll('.practice-option').forEach(option => {
        option.addEventListener('click', () => {
            const input = option.querySelector('input');
            if (inputType === 'radio') {
                document.querySelectorAll('input[name="practice_q"]').forEach(i => i.checked = false);
            }
            input.checked = !input.checked;
        });
    });
}

function submitPracticeAnswer() {
    const question = currentPracticeQuestions[currentPracticeIndex];
    const selectedOptions = Array.from(document.querySelectorAll('input[name="practice_q"]:checked')).map(i => parseInt(i.value));
    const correctAnswer = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
    
    selectedOptions.sort();
    const sortedCorrect = [...correctAnswer].sort();
    
    const isCorrect = JSON.stringify(selectedOptions) === JSON.stringify(sortedCorrect);
    practiceStats.total++;
    if (isCorrect) practiceStats.correct++;
    
    // Mark as practiced
    window.LearningStorage?.markQuestionPracticed(
        window.USER_ID,
        question.levelId,
        question.questionIndex,
        isCorrect
    );
    
    // Show visual feedback
    document.querySelectorAll('.practice-option').forEach((option, index) => {
        const isSelected = selectedOptions.includes(index);
        const isExpected = correctAnswer.includes(index);
        
        if (isExpected) {
            option.style.background = '#e8f5e8';
            option.style.borderColor = '#4caf50';
        } else if (isSelected && !isExpected) {
            option.style.background = '#ffebee';
            option.style.borderColor = '#f44336';
        }
    });
    
    // Show result
    const resultEl = document.getElementById('practice-result');
    if (isCorrect) {
        resultEl.innerHTML = `
            <div style="background: #e8f5e8; padding: 1rem; border-radius: 8px; border-left: 4px solid #4CAF50;">
                <strong>✅ Correct!</strong> Great job! You've mastered this question.
            </div>
        `;
    } else {
        const correctOptionsText = correctAnswer.map(i => question.options[i]).join(', ');
        resultEl.innerHTML = `
            <div style="background: #ffebee; padding: 1rem; border-radius: 8px; border-left: 4px solid #f44336;">
                <strong>❌ Incorrect.</strong> The correct answer${correctAnswer.length > 1 ? 's are' : ' is'}: <strong>${correctOptionsText}</strong><br>
                <small style="opacity: 0.8;">Don't worry! Keep practicing and you'll get it next time.</small>
            </div>
        `;
    }
    
    // Update button visibility
    document.getElementById('submit-practice').style.display = 'none';
    if (currentPracticeIndex < currentPracticeQuestions.length - 1) {
        document.getElementById('next-practice').style.display = 'inline-block';
    } else {
        document.getElementById('finish-practice').style.display = 'inline-block';
    }
}

function nextPracticeQuestion() {
    currentPracticeIndex++;
    showPracticeQuestion();
}

function finishPracticeSession() {
    const accuracy = practiceStats.total > 0 ? Math.round((practiceStats.correct / practiceStats.total) * 100) : 0;
    
    document.getElementById('practice-questions-container').style.display = 'none';
    document.getElementById('practice-buttons').style.display = 'block';
    
    // Show completion message
    let message = '';
    if (accuracy >= 80) {
        message = `🎉 Excellent! ${accuracy}% (${practiceStats.correct}/${practiceStats.total})`;
    } else if (accuracy >= 60) {
        message = `👍 Good progress! ${accuracy}% (${practiceStats.correct}/${practiceStats.total})`;
    } else {
        message = `📚 Keep practicing! ${accuracy}% (${practiceStats.correct}/${practiceStats.total})`;
    }
    
    showNotification(`Practice session complete! ${message}`, 'success');
    
    // Update stats
    updatePracticeStats();
    
    // Award some XP for practice
    if (practiceStats.total > 0) {
        const xpAwarded = Math.max(1, Math.floor(practiceStats.total * 0.5)); // 0.5 XP per question
        window.LearningStorage?.addXp(window.USER_ID, xpAwarded);
        showNotification(`+${xpAwarded} XP earned for practice!`, 'info');
    }
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