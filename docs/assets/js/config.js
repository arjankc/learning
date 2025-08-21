// config.js - Loads the application configuration

let AppConfig = {};

async function loadConfig() {
    try {
        const response = await fetch('data/config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        AppConfig = await response.json();
        console.log('Configuration loaded:', AppConfig);
    } catch (error) {
        console.error('Could not load configuration:', error);
        // Fallback to default or show an error
        AppConfig = {
            title: "Gamified Learning",
            themeColor: "#007acc",
            language: "plaintext",
            dataFile: "data/levels.json",
            achievementsFile: "data/achievements.json"
        };
        showErrorMessage("Could not load the course configuration. Please check the `data/config.json` file.");
    }
}

function applyTheme() {
    if (AppConfig.themeColor) {
        document.documentElement.style.setProperty('--primary-color', AppConfig.themeColor);
    }
    if (AppConfig.title) {
        document.title = AppConfig.title;
        const mainTitle = document.querySelector('header h1');
        if (mainTitle) {
            mainTitle.textContent = AppConfig.shortTitle || AppConfig.title;
        }
    }
}

// This function will be called by other scripts after the config is loaded.
function onConfigLoaded(callback) {
    if (Object.keys(AppConfig).length > 0) {
        callback();
    } else {
        document.addEventListener('configLoaded', callback);
    }
}

// Load config immediately and then dispatch an event
document.addEventListener('DOMContentLoaded', async () => {
    await loadConfig();
    applyTheme();
    document.dispatchEvent(new Event('configLoaded'));
});
