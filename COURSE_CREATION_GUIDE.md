# Creating Custom Gamified Learning Courses

This guide explains how to fork this repository and create your own gamified learning experience for any subject by simply updating JSON configuration files.

## Quick Start

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally
3. **Update the configuration files** in `docs/data/` with your course content
4. **Deploy** to GitHub Pages or any web server

## Configuration Files Overview

The platform uses three main JSON files to define your course:

### 1. `docs/data/config.json` - Main Course Configuration

This file defines the overall theme, branding, and structure of your learning platform:

```json
{
  "title": "Your Course Title",
  "shortTitle": "Short Title",
  "themeColor": "#yourcolor",
  "language": "your-language",
  "dataFile": "data/levels.json",
  "achievementsFile": "data/achievements.json",
  "course": {
    "subject": "Your Subject",
    "description": "Course description",
    "icon": "📚",
    "heroTitle": "🚀 Master Your Subject",
    "heroSubtitle": "Engaging learning subtitle",
    "footerText": "Your Course Project",
    "loadingMessages": [
      "📚 Loading your curriculum",
      "🧠 Preparing interactive content",
      "🎯 Setting up learning experience"
    ]
  },
  "features": [
    {
      "icon": "🎮",
      "title": "Feature Title",
      "description": "Feature description"
    }
  ],
  "navigation": [
    { "label": "🏠 Home", "href": "index.html" }
  ]
}
```

### 2. `docs/data/levels.json` - Course Content

This file contains all your learning levels, lessons, quizzes, and content:

```json
{
  "levels": [
    {
      "id": 1,
      "tier": 1,
      "title": "Lesson Title",
      "description": "What students will learn",
      "requirements": [
        "Learning objective 1",
        "Learning objective 2"
      ],
      "theory": "<div>HTML content with lesson explanation</div>",
      "code": "// Example code if applicable",
      "quiz": [
        {
          "q": "Question text?",
          "options": ["Option A", "Option B", "Option C"],
          "answer": 0
        }
      ],
      "completionCriteria": "What defines completion",
      "nextLevel": 2
    }
  ]
}
```

### 3. `docs/data/achievements.json` - Gamification Elements

This file defines the achievements students can unlock:

```json
{
  "achievements": [
    {
      "id": 1,
      "title": "Achievement Name",
      "description": "What the student accomplished",
      "points": 10,
      "type": "levelComplete",
      "value": 1
    }
  ]
}
```

## Customization Options

### Theme Colors
Change the `themeColor` in config.json to match your subject:
- Mathematics: `#ff6b6b` (red)
- Science: `#4ecdc4` (teal)
- Programming: `#007acc` (blue)
- Languages: `#9b59b6` (purple)

### Icons and Emojis
Use relevant emojis throughout your configuration:
- Mathematics: 📐 🧮 📊 ➗ ✖️ ➕
- Science: 🔬 🧪 ⚗️ 🧬 🌡️ 🔥
- Programming: 💻 ⌨️ 🖥️ 💾 🔧 ⚡
- Languages: 📚 ✍️ 🗣️ 👂 📖 🌍

### Navigation Labels
Customize navigation to match your subject terminology:
- Programming: "Challenges", "Code Labs", "Projects"
- Mathematics: "Problems", "Topics", "Practice"
- Science: "Experiments", "Lab", "Discoveries"
- Languages: "Lessons", "Practice", "Conversations"

## Example Courses

Check the `examples/` directory for complete configuration examples:

- **`examples/math-course/`** - Mathematics learning platform
- **`examples/science-course/`** - Science laboratory platform  
- **`examples/javascript-course/`** - JavaScript programming course

## Creating Your Course Content

### 1. Plan Your Curriculum
- Break your subject into logical levels/lessons
- Group levels into tiers by difficulty
- Define clear learning objectives for each level

### 2. Write Engaging Theory Content
- Use HTML formatting in the `theory` field
- Include examples, diagrams, and explanations
- Make content interactive and engaging

### 3. Create Effective Quizzes
- Write clear, unambiguous questions
- Provide plausible incorrect answers
- Test understanding, not memorization
- Use a mix of question types

### 4. Design Meaningful Achievements
- Reward progress milestones
- Celebrate skill mastery
- Include fun, motivational achievements
- Balance challenge with achievability

## Achievement Types

The platform supports several achievement types:

- `levelComplete`: Awarded when specific level is completed
- `tierComplete`: Awarded when all levels in a tier are completed  
- `quizScore`: Awarded when quiz score reaches threshold
- `meta`: Custom achievements for special accomplishments

## Testing Your Course

1. **Local Testing**: Use `python3 -m http.server 8000` in the `docs/` directory
2. **Content Review**: Check all text, links, and functionality
3. **Quiz Validation**: Verify all quiz answers are correct
4. **Mobile Testing**: Test on different screen sizes
5. **Performance**: Ensure fast loading and smooth interactions

## Deployment

### GitHub Pages
1. Enable GitHub Pages in your repository settings
2. Select "Deploy from a branch" 
3. Choose "main" branch and "/docs" folder
4. Your course will be available at `https://yourusername.github.io/learning/`

### Custom Domain
1. Add a `CNAME` file in the `docs/` directory with your domain
2. Configure your DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

## Best Practices

### Content Creation
- Keep lessons focused and digestible
- Use progressive difficulty
- Provide immediate feedback
- Include real-world examples

### User Experience
- Choose colors that work well together
- Test on mobile devices
- Keep loading times fast
- Make navigation intuitive

### Gamification
- Balance challenge with achievability
- Provide multiple paths to success
- Celebrate small wins
- Track meaningful progress

## Troubleshooting

### Common Issues

**Configuration not loading**: Check JSON syntax with a validator
**Images not displaying**: Use relative paths from the docs/ directory  
**Styles not applying**: Verify CSS class names match your content
**Quizzes not working**: Ensure answer indices are zero-based

### Getting Help

- Check browser developer console for error messages
- Validate JSON files at jsonlint.com
- Test in incognito mode to rule out caching issues
- Review example configurations for reference

## Contributing

If you create an interesting course configuration, consider contributing it back:

1. Add your example to the `examples/` directory
2. Update this documentation if needed
3. Submit a pull request

## License

This platform is open source. Feel free to use it for educational purposes, commercial training, or personal learning projects.