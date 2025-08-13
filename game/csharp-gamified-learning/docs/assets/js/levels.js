// levels.js

const levels = [
    {
        id: 1,
        title: "Hello World",
        description: "Learn the basics of C# by creating a simple 'Hello, World!' application.",
        requirements: ["Install .NET SDK", "Create a new console application"],
        completed: false
    },
    {
        id: 2,
        title: "Variables",
        description: "Understand variables and data types in C#.",
        requirements: ["Declare variables", "Use different data types"],
        completed: false
    },
    {
        id: 3,
        title: "Control Flow",
        description: "Learn about control flow statements in C#.",
        requirements: ["Implement if-else statements", "Use loops"],
        completed: false
    }
];

function loadLevel(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (level) {
        displayLevel(level);
    } else {
        console.error("Level not found");
    }
}

function displayLevel(level) {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = `
        <h2>${level.title}</h2>
        <p>${level.description}</p>
        <h3>Requirements:</h3>
        <ul>
            ${level.requirements.map(req => `<li>${req}</li>`).join('')}
        </ul>
    `;
}

function markLevelCompleted(levelId) {
    const level = levels.find(l => l.id === levelId);
    if (level) {
        level.completed = true;
        console.log(`Level ${levelId} completed!`);
    }
}

// Export functions for use in other modules
export { loadLevel, markLevelCompleted };