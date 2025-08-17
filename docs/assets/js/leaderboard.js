// leaderboard.js

document.addEventListener('DOMContentLoaded', () => {
    renderLeaderboard();
});

function getLeaderboardData() {
    // Predefined data for the top 5 learners
    const topLearners = [
        { name: 'Ada Lovelace', xp: 1500, level: 15 },
        { name: 'Grace Hopper', xp: 1350, level: 14 },
        { name: 'Margaret Hamilton', xp: 1200, level: 12 },
        { name: 'Katherine Johnson', xp: 1100, level: 11 },
        { name: 'Hedy Lamarr', xp: 950, level: 10 }
    ];

    // Get the current user's progress
    const userProgress = window.LearningStorage?.getUserProgress(window.USER_ID) || {};
    const user = {
        name: 'You',
        xp: userProgress.xp || 0,
        level: Math.floor((userProgress.xp || 0) / 100) + 1,
        isCurrentUser: true
    };

    // Add the current user to the list and sort by XP
    const leaderboard = [...topLearners, user].sort((a, b) => b.xp - a.xp);

    return leaderboard;
}

function renderLeaderboard() {
    const leaderboard = getLeaderboardData();
    const leaderboardList = document.getElementById('leaderboard-list');

    if (leaderboardList) {
        leaderboardList.innerHTML = '';
        leaderboard.forEach((learner, index) => {
            const rank = index + 1;
            const row = document.createElement('tr');
            if (learner.isCurrentUser) {
                row.className = 'current-user';
            }
            row.innerHTML = `
                <td>${rank}</td>
                <td>${learner.name}</td>
                <td>${learner.xp}</td>
                <td>${learner.level}</td>
            `;
            leaderboardList.appendChild(row);
        });
    }
}
