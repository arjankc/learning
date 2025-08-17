// quiz.js
// This file contains all the logic for rendering and managing quizzes.

/**
 * Maps a level ID to a programming concept for weakness detection.
 * @param {number} levelId The ID of the level.
 * @param {number} questionIndex The index of the question within the level.
 * @returns {string} The concept associated with the level.
 */
function getConceptForLevel(levelId, questionIndex) {
    const conceptMap = {
        1: 'Basic Syntax', 2: 'Data Types', 3: 'Type Conversion', 4: 'Namespaces',
        5: 'Conditional Logic', 6: 'Switch Statements', 7: 'For Loops', 8: 'While Loops',
        9: 'Foreach Loops', 10: 'Iterators', 11: 'CLR Fundamentals', 12: 'Framework Class Library',
        13: 'IDE Usage', 14: 'Classes and Objects', 15: 'OOP Principles', 16: 'Advanced OOP',
        17: 'Built-in Collections', 18: 'Custom Collections', 19: 'Exception Handling',
        20: 'Custom Exceptions', 21: 'Debugging', 22: 'Delegates and Events', 23: 'LINQ',
        24: 'Async Programming', 25: 'ADO.NET', 26: 'Entity Framework', 27: 'File I/O',
        28: 'XAML Basics', 29: 'Advanced WPF', 30: 'ASP.NET Core', 31: 'Blazor', 32: 'Security',
        33: 'Razor Pages vs MVC', 34: 'Cross-Platform Development'
    };
    
    return conceptMap[levelId] || `Level ${levelId}`;
}

/**
 * Determines the difficulty of a level based on its ID.
 * @param {number} levelId The ID of the level.
 * @returns {string} The difficulty of the level.
 */
function getDifficultyForLevel(levelId) {
    if (levelId <= 10) return 'Beginner';
    if (levelId <= 25) return 'Intermediate';
    return 'Advanced';
}

/**
 * Shows a hint for a quiz question, deducts XP, and disables the hint button.
 * @param {HTMLElement} button The hint button element.
 * @param {number} levelId The ID of the level.
 * @param {number} questionIndex The index of the question.
 */
function showHint(button, levelId, questionIndex) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;

    const question = level.quiz[questionIndex];
    if (!question) return;

    // Deduct XP for using a hint
    window.LearningStorage.deductXp(window.USER_ID, 5);
    
    // Display the hint in a notification
    const hint = question.hint || "Think about the core concepts of this level.";
    showNotification(`💡 Hint: ${hint}`, 'info');

    // Disable the button to prevent multiple uses
    button.disabled = true;
    button.textContent = '💡 Hint Used';

    // Update the user's progress display
    renderProgress();
}

/**
 * Renders the quiz for a given level.
 * @param {object} level The level object containing the quiz data.
 */
function renderQuiz(level){
    const container = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-quiz');
    const resultEl = document.getElementById('quiz-result');
    container.innerHTML = '';
    resultEl.innerHTML = '';
    
    // Reset submit button to default state
    submitBtn.textContent = '🎯 Submit Answers';
    submitBtn.disabled = false;
    
    if (!Array.isArray(level.quiz) || level.quiz.length === 0){
        container.innerHTML = '<p style="color: #666; font-style: italic;">🤔 No quiz available for this level.</p>';
        submitBtn.style.display = 'none';
        return;
    }
    
    submitBtn.style.display = 'block';

    // Shuffle the quiz questions and select 5 for the quiz
    const shuffledQuiz = [...level.quiz];
    for (let i = shuffledQuiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuiz[i], shuffledQuiz[j]] = [shuffledQuiz[j], shuffledQuiz[i]];
    }
    const selectedQuestions = shuffledQuiz.slice(0, 5);
    
    selectedQuestions.forEach((q, qi) => {
        const block = document.createElement('div');
        block.className = 'quiz-question';
        const isMulti = !!q.multi;
        const name = `q_${qi}`;
        
        const options = q.options.map((opt, oi) => {
            const type = isMulti ? 'checkbox' : 'radio';
            const instantFeedbackJs = !isMulti 
                ? `checkInstantFeedback(this, ${qi}, ${oi}, ${JSON.stringify(q.answer)})` 
                : '';
            return `
                <div class="quiz-option" style="margin: 8px 0; padding: 8px; border-radius: 4px;" onclick="${instantFeedbackJs}">
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
                <button class="hint-button" onclick="showHint(this, ${level.id}, ${qi})">💡 Hint (-5 XP)</button>
            </p>
            ${options}
        `;
        container.appendChild(block);
    });
    
    submitBtn.onclick = () => {
        let correct = 0;
        let totalQuestions = selectedQuestions.length;
        const concept = getConceptForLevel(level.id);
        const difficulty = getDifficultyForLevel(level.id);
        
        // Check answers and provide visual feedback
        selectedQuestions.forEach((q, qi) => {
            const chosen = Array.from(document.querySelectorAll(`input[name="q_${qi}"]:checked`)).map(i=>parseInt(i.value));
            const expected = Array.isArray(q.answer) ? q.answer.map(n=>parseInt(n)) : [parseInt(q.answer)];
            chosen.sort(); 
            expected.sort();
            
            const isCorrect = JSON.stringify(chosen) === JSON.stringify(expected);
            if (isCorrect) correct++;
            
            window.LearningStorage?.recordQuizAttempt(window.USER_ID, level.id, qi, isCorrect, concept, difficulty);
            
            if (!isCorrect) {
                window.LearningStorage?.recordMissedQuestion(window.USER_ID, level.id, qi, q, chosen, expected);
            }
            
            const questionOptions = document.querySelectorAll(`input[name="q_${qi}"]`);
            questionOptions.forEach((input, index) => {
                const optionDiv = input.closest('.quiz-option');
                const isExpected = expected.includes(index);
                const isChosen = chosen.includes(index);
                
                if (isExpected) {
                    optionDiv.classList.add('correct');
                } else if (isChosen && !isExpected) {
                    optionDiv.classList.add('incorrect');
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
                    <button onclick="proceedWithGoodScore(${level.id})" class="btn btn-success">✅ Proceed to Next Level</button>
                    <button onclick="retryIncorrectQuestions(${level.id})" class="btn btn-warning">🔄 Retry Wrong Answers Only</button>
                </div>`;
            resultEl.style.color = '#2196F3';
        } else {
            resultHTML = `🤔 <strong>Keep learning!</strong> ${score}% (${correct}/${totalQuestions})<br>
                <div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                    <button onclick="retryIncorrectQuestions(${level.id})" class="btn btn-warning">🔄 Retry Wrong Answers Only</button>
                    <button onclick="resetQuiz(${level.id})" class="btn btn-secondary">🔄 Start Over</button>
                </div>`;
            resultEl.style.color = '#FF9800';
        }
        
        resultEl.innerHTML = resultHTML;
        
        if (score >= 80) {
            const xpAwarded = Math.floor(score / 10);
            window.LearningStorage?.addXp(window.USER_ID, xpAwarded);
            showNotification(`🎯 Quiz completed! +${xpAwarded} XP earned!`, 'success');
            maybeAwardQuizAchievements(level, score);
        }
        
        renderProgress();
        
        const completeBtn = document.getElementById('complete-level');
        if (isPerfectScore) {
            completeBtn.disabled = false;
            completeBtn.style.opacity = '1';
            completeBtn.style.cursor = 'pointer';
            if (!completeBtn.innerHTML.includes('Already completed')) {
                completeBtn.innerHTML = '🎉 Mark as Completed';
            }
        } else if (isGoodScore) {
            completeBtn.disabled = true;
            completeBtn.style.opacity = '0.5';
            completeBtn.style.cursor = 'not-allowed';
            if (!completeBtn.innerHTML.includes('Already completed')) {
                completeBtn.innerHTML = '🎯 Use "Proceed" button above or retry for perfect score';
            }
        } else {
            completeBtn.disabled = true;
            completeBtn.style.opacity = '0.5';
            completeBtn.style.cursor = 'not-allowed';
            if (!completeBtn.innerHTML.includes('Already completed')) {
                completeBtn.innerHTML = '🔒 Complete quiz perfectly to unlock';
            }
        }
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '✅ Quiz Submitted';
    };
}

/**
 * Provides instant feedback for single-choice quiz questions.
 * @param {HTMLElement} optionElement The selected option element.
 * @param {number} questionIndex The index of the question.
 * @param {number} optionIndex The index of the selected option.
 * @param {number} correctAnswer The index of the correct answer.
 */
function checkInstantFeedback(optionElement, questionIndex, optionIndex, correctAnswer) {
    const questionBlock = optionElement.closest('.quiz-question');
    const allOptions = questionBlock.querySelectorAll('.quiz-option');
    const allInputs = questionBlock.querySelectorAll('input');

    allInputs.forEach(input => input.disabled = true);

    const isCorrect = optionIndex === correctAnswer;

    if (isCorrect) {
        optionElement.classList.add('correct');
    } else {
        optionElement.classList.add('incorrect');
        allOptions.forEach((opt, oi) => {
            if (oi === correctAnswer) {
                opt.classList.add('correct');
            }
        });
    }
}

/**
 * Resets the quiz to its initial state.
 * @param {number} levelId The ID of the level to reset the quiz for.
 */
function resetQuiz(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    const container = document.getElementById('quiz-container');
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    const inputs = container.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => {
        input.checked = false;
    });
    
    document.getElementById('quiz-result').innerHTML = '';
    
    const submitBtn = document.getElementById('submit-quiz');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Submit Quiz';
    
    const completeBtn = document.getElementById('complete-level');
    const progress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const isCompleted = (progress.completedLevels || []).includes(levelId);
    
    if (!isCompleted) {
        completeBtn.disabled = true;
        completeBtn.style.opacity = '0.5';
        completeBtn.style.cursor = 'not-allowed';
        completeBtn.innerHTML = '🔒 Complete quiz perfectly to unlock';
    }
    
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Allows the user to proceed to the next level with a good score (>= 70%).
 * @param {number} levelId The ID of the level.
 */
function proceedWithGoodScore(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    window.LearningStorage?.completeLevel(window.USER_ID, levelId);
    
    const completeBtn = document.getElementById('complete-level');
    completeBtn.disabled = false;
    completeBtn.style.opacity = '1';
    completeBtn.style.cursor = 'pointer';
    completeBtn.innerHTML = '🎉 Level Completed!';
    
    const xpAwarded = 5;
    window.LearningStorage?.addXp(window.USER_ID, xpAwarded);
    showNotification(`🎯 Level completed with good score! +${xpAwarded} XP earned!`, 'success');
    
    renderProgress();
    
    maybeShowProceedSection(level);
    
    maybeAwardAchievements(level);
}

/**
 * Resets only the incorrectly answered questions for a smart retry.
 * @param {number} levelId The ID of the level.
 */
function retryIncorrectQuestions(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    
    const container = document.getElementById('quiz-container');
    
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
        
        const isCorrect = expectedAnswers.length === chosenAnswers.length &&
                         expectedAnswers.every(ans => chosenAnswers.includes(ans));
        
        if (!isCorrect) {
            incorrectQuestions.push(questionIndex);
        }
    });
    
    incorrectQuestions.forEach(questionIndex => {
        const questionOptions = container.querySelectorAll(`input[name="q_${questionIndex}"]`);
        questionOptions.forEach(input => {
            const optionDiv = input.closest('.quiz-option');
            optionDiv.classList.remove('correct', 'incorrect');
            
            input.checked = false;
        });
    });
    
    const resultEl = document.getElementById('quiz-result');
    resultEl.innerHTML = `<div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #2196F3;">
        <strong>🔄 Smart Retry Mode</strong><br>
        Only questions you got wrong have been reset. Your correct answers are preserved!<br>
        <small style="opacity: 0.8;">Questions to retry: ${incorrectQuestions.length} out of ${level.quiz.length}</small>
    </div>`;
    
    const submitBtn = document.getElementById('submit-quiz');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Submit Quiz';
    
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