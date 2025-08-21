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
            shortTitle: "Learning",
            themeColor: "#007acc",
            language: "plaintext",
            dataFile: "data/levels.json",
            achievementsFile: "data/achievements.json",
            course: {
                subject: "General Learning",
                description: "Learn through an interactive, gamified experience.",
                icon: "📚",
                heroTitle: "🚀 Master Your Subject",
                heroSubtitle: "Learn through an interactive, gamified experience.",
                footerText: "Gamified Learning Project",
                loadingMessages: [
                    "📚 Loading curriculum",
                    "🧠 Preparing interactive content",
                    "🎯 Setting up your learning experience"
                ]
            },
            features: [
                { "icon": "🎮", "title": "Gamified Learning", "description": "Earn points and unlock achievements." },
                { "icon": "📝", "title": "Interactive Content", "description": "Engage with interactive lessons." },
                { "icon": "📈", "title": "Progress Tracking", "description": "Monitor your learning journey." }
            ],
            navigation: [
                { "label": "🏠 Home", "href": "index.html" },
                { "label": "📚 Levels", "href": "levels.html" },
                { "label": "🏆 Achievements", "href": "achievements.html" },
                { "label": "📊 Leaderboard", "href": "leaderboard.html" }
            ]
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
    
    // Apply course-specific content
    if (AppConfig.course) {
        // Update hero section
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle && AppConfig.course.heroTitle) {
            heroTitle.textContent = AppConfig.course.heroTitle;
        }
        
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle && AppConfig.course.heroSubtitle) {
            heroSubtitle.textContent = AppConfig.course.heroSubtitle;
        }
        
        // Update main title header
        const mainTitleHeader = document.getElementById('main-title-header');
        if (mainTitleHeader) {
            mainTitleHeader.textContent = AppConfig.shortTitle || AppConfig.title;
        }
        
        // Update footer
        const footerText = document.querySelector('footer p');
        if (footerText && AppConfig.course.footerText) {
            footerText.innerHTML = `&copy; ${new Date().getFullYear()} ${AppConfig.course.footerText}`;
        }
    }
    
    // Apply features
    if (AppConfig.features) {
        const featureCards = document.querySelectorAll('.feature-card');
        AppConfig.features.forEach((feature, index) => {
            if (featureCards[index]) {
                const icon = featureCards[index].querySelector('.feature-icon');
                const title = featureCards[index].querySelector('.feature-title');
                const description = featureCards[index].querySelector('.feature-description');
                
                if (icon) icon.textContent = feature.icon;
                if (title) title.textContent = feature.title;
                if (description) description.textContent = feature.description;
            }
        });
    }
    
    // Apply navigation
    if (AppConfig.navigation) {
        const navLinks = document.querySelectorAll('nav ul li a');
        AppConfig.navigation.forEach((navItem, index) => {
            if (navLinks[index]) {
                navLinks[index].textContent = navItem.label;
                navLinks[index].href = navItem.href;
            }
        });
    }
    
    // Apply loading messages
    if (AppConfig.course && AppConfig.course.loadingMessages) {
        const loadingDetails = document.querySelector('.loading-details');
        if (loadingDetails) {
            loadingDetails.innerHTML = AppConfig.course.loadingMessages
                .map(message => `<p>${message}</p>`)
                .join('');
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
