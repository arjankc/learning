// levels.js (data-driven)

let LevelsData = [];
const USER_ID = 'local-user';

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
    const progress = window.LearningStorage?.getUserProgress(USER_ID) || {};
    const completed = (progress.completedLevels || []).length;
    progressEl.textContent = `Completed ${completed}/${LevelsData.length} levels • XP: ${progress.xp || 0}`;
}

function renderLevelsList() {
    console.log('Rendering levels list...');
    const list = document.getElementById('levels-list');
    if (!list) {
        console.error('levels-list element not found');
        return;
    }
    
    console.log(`Rendering ${LevelsData.length} levels`);
    const progress = window.LearningStorage?.getUserProgress(USER_ID) || {};
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
        const div = document.createElement('div');
        div.className = 'card';
        const status = done.has(l.id) ? '✅ Completed' : '⏳ Not completed';
        div.innerHTML = `
            <h3>${l.id.toString().padStart(2,'0')}: ${l.title}</h3>
            <p>${l.description}</p>
            <p><strong>Tier:</strong> ${l.tier || 'N/A'}</p>
            <p><strong>Status:</strong> ${status}</p>
            <a href="#" class="button" data-level-id="${l.id}">View</a>
        `;
        list.appendChild(div);
    });

    console.log(`Added ${filteredLevels.length} level cards to the list`);

    list.querySelectorAll('a[data-level-id]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(a.getAttribute('data-level-id'));
            showLevelDetail(id);
        });
    });
    
    console.log('Level list rendering complete');
}

function showLevelDetail(levelId) {
    const level = LevelsData.find(l => l.id === levelId);
    if (!level) return;
    document.getElementById('level-title').textContent = `${level.id.toString().padStart(2,'0')}: ${level.title}`;
    document.getElementById('level-description').textContent = level.description;
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
    // Quiz
    renderQuiz(level);
    const btn = document.getElementById('complete-level');
    btn.onclick = () => completeCurrentLevel(level);
    document.getElementById('level-detail').style.display = '';
    window.scrollTo({ top: document.getElementById('level-detail').offsetTop, behavior: 'smooth' });
}

function completeCurrentLevel(level) {
    window.LearningStorage?.completeLevel(USER_ID, level.id);
    // award XP per level (simple rule)
    window.LearningStorage?.addXp(USER_ID, 10);
    maybeAwardAchievements(level);
    alert(`Great job! Marked "${level.title}" as completed and awarded 10 XP.`);
    renderProgress();
    renderLevelsList();
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
    resultEl.textContent = '';
    if (!Array.isArray(level.quiz) || level.quiz.length === 0){
        submitBtn.style.display = 'none';
        return;
    }
    submitBtn.style.display = '';
    level.quiz.forEach((q, qi) => {
        const block = document.createElement('div');
        block.className = 'card';
        const isMulti = !!q.multi;
        const name = `q_${qi}`;
        const options = q.options.map((opt, oi)=>{
            const type = isMulti ? 'checkbox' : 'radio';
            return `<label><input type="${type}" name="${name}" value="${oi}"> ${opt}</label>`;
        }).join('<br>');
        block.innerHTML = `<p><strong>Q${qi+1}:</strong> ${q.q}</p>${options}`;
        container.appendChild(block);
    });
    submitBtn.onclick = () => {
        let correct = 0;
        level.quiz.forEach((q, qi)=>{
            const chosen = Array.from(document.querySelectorAll(`input[name="q_${qi}"]:checked`)).map(i=>parseInt(i.value));
            const expected = Array.isArray(q.answer) ? q.answer.map(n=>parseInt(n)) : [parseInt(q.answer)];
            chosen.sort(); expected.sort();
            if (JSON.stringify(chosen) === JSON.stringify(expected)) correct++;
        });
        const score = Math.round((correct / level.quiz.length) * 100);
        resultEl.textContent = `Score: ${score}% (${correct}/${level.quiz.length})`;
        // Award XP for quiz
        if (score >= 80){
            window.LearningStorage?.addXp(USER_ID, 10);
            maybeAwardQuizAchievements(level, score);
        }
        renderProgress();
    };
}

function maybeAwardAchievements(level){
    // Award basic achievements by level id and tier completion
    fetch('data/achievements.json')
      .then(r=>r.json())
      .then(data=>{
        const items = data.achievements || [];
        const unlocked = window.LearningStorage?.getUnlockedAchievements(USER_ID) || new Set();
        // byLevel completion
        items.filter(a => a.type === 'levelComplete' && a.value === level.id)
             .forEach(a => {
                if (!unlocked.has || !unlocked.has(a.id)) window.LearningStorage?.unlockAchievement(USER_ID, a.id);
             });
        // tier completion
        const progress = window.LearningStorage?.getUserProgress(USER_ID) || {};
        const done = new Set(progress.completedLevels || []);
        [1,2,3].forEach(tier => {
            const tierLevels = LevelsData.filter(l=>l.tier===tier).map(l=>l.id);
            if (tierLevels.length>0 && tierLevels.every(id=>done.has(id))){
                items.filter(a=>a.type==='tierComplete' && a.value===tier)
                    .forEach(a=>{ if(!unlocked.has || !unlocked.has(a.id)) window.LearningStorage?.unlockAchievement(USER_ID, a.id); });
            }
        });
      });
}

function maybeAwardQuizAchievements(level, score){
    fetch('data/achievements.json')
      .then(r=>r.json())
      .then(data=>{
        const items = data.achievements || [];
        const unlocked = window.LearningStorage?.getUnlockedAchievements(USER_ID) || new Set();
        items.filter(a=>a.type==='quizScore' && score >= a.value)
             .forEach(a=>{ if(!unlocked.has || !unlocked.has(a.id)) window.LearningStorage?.unlockAchievement(USER_ID, a.id); });
      });
}