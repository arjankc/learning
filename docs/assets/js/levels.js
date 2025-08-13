// mirrored from game/csharp-gamified-learning/docs
// levels.js (data-driven)

let LevelsData = [];
const USER_ID = 'local-user';

async function fetchLevels() {
    const res = await fetch('data/levels.json');
    const json = await res.json();
    LevelsData = Array.isArray(json.levels) ? json.levels : [];
}

function renderProgress() {
    const progressEl = document.getElementById('progress-text');
    const progress = window.LearningStorage?.getUserProgress(USER_ID) || {};
    const completed = (progress.completedLevels || []).length;
    progressEl.textContent = `Completed ${completed}/${LevelsData.length} levels • XP: ${progress.xp || 0}`;
}

function renderLevelsList() {
    const list = document.getElementById('levels-list');
    const progress = window.LearningStorage?.getUserProgress(USER_ID) || {};
    const done = new Set(progress.completedLevels || []);
    list.innerHTML = '';
    LevelsData.forEach(l => {
        const div = document.createElement('div');
        div.className = 'card';
        const status = done.has(l.id) ? '✅ Completed' : '⏳ Not completed';
        div.innerHTML = `
            <h3>${l.id.toString().padStart(2,'0')}: ${l.title}</h3>
            <p>${l.description}</p>
            <p><strong>Status:</strong> ${status}</p>
            <a href="#" class="button" data-level-id="${l.id}">View</a>
        `;
        list.appendChild(div);
    });

    list.querySelectorAll('a[data-level-id]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(a.getAttribute('data-level-id'));
            showLevelDetail(id);
        });
    });
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
    const btn = document.getElementById('complete-level');
    btn.onclick = () => completeCurrentLevel(level);
    document.getElementById('level-detail').style.display = '';
    window.scrollTo({ top: document.getElementById('level-detail').offsetTop, behavior: 'smooth' });
}

function completeCurrentLevel(level) {
    window.LearningStorage?.completeLevel(USER_ID, level.id);
    // award XP per level (simple rule)
    window.LearningStorage?.addXp(USER_ID, 10);
    alert(`Great job! Marked "${level.title}" as completed and awarded 10 XP.`);
    renderProgress();
    renderLevelsList();
}

async function initLevelsPage() {
    await fetchLevels();
    renderProgress();
    renderLevelsList();
}

document.addEventListener('DOMContentLoaded', initLevelsPage);
