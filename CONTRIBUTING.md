# Contributing to Gamified Learning Platform

Thank you for your interest in contributing to the Gamified Learning Platform! This project is maintained by [Gurkha Technology](https://www.gurkhatech.com) and welcomes contributions from the community.

## 🎯 Ways to Contribute

We welcome various types of contributions:

### 1. 📚 Course Content & Examples
- Add new course examples in the `examples/` directory
- Create sample configurations for different subjects (Mathematics, Science, Programming, etc.)
- Improve existing .NET/C# learning examples
- Add new programming language demonstrations

### 2. 🚀 Platform Features
- Enhance the gamification system (achievements, progress tracking)
- Improve the user interface and user experience
- Add new interactive quiz types
- Implement accessibility features
- Optimize performance

### 3. 📖 Documentation
- Improve setup guides and tutorials
- Add translations for documentation
- Create video tutorials or walkthroughs
- Expand the course creation guide
- Fix typos and clarify instructions

### 4. 🐛 Bug Fixes
- Report bugs through GitHub Issues
- Fix existing bugs
- Improve error handling
- Add better validation

## 🔧 Development Setup

### Prerequisites
- **.NET SDK 8+** (for .NET examples)
- **Python 3** (for local web server)
- **Git** for version control
- A modern web browser

### Setting Up the Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork locally:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/learning.git
   cd learning
   ```

3. **Set up the upstream remote:**
   ```bash
   git remote add upstream https://github.com/arjankc/learning.git
   ```

4. **Install .NET SDK** (if working on .NET examples):
   ```bash
   dotnet --version  # Verify .NET 8+ is installed
   ```

5. **Restore dependencies** (for .NET projects):
   ```bash
   dotnet restore ./LearningExamples.sln
   ```

6. **Build the projects:**
   ```bash
   # Build individual projects (recommended on Linux to avoid WPF errors)
   for dir in AdoNet Async Basics BlazorServer EFCore FileIO Linq Security WebApi; do
       echo "Building examples/$dir"
       dotnet build "examples/$dir" -c Release --no-restore
   done
   ```

7. **Test the web interface locally:**
   ```bash
   cd docs
   python3 -m http.server 8000
   # Open http://localhost:8000 in your browser
   ```

## 📝 Making Contributions

### Creating a Pull Request

1. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes thoroughly:**
   - For .NET code: Build and run the affected projects
   - For web interface: Test in multiple browsers
   - For documentation: Check formatting and links

4. **Commit your changes** with clear, descriptive messages:
   ```bash
   git add .
   git commit -m "Add feature: Brief description of changes"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Screenshots for UI changes
   - Reference to any related issues

### Commit Message Guidelines

Write clear, concise commit messages:

- **Good:** `Add Mathematics course example with 10 interactive problems`
- **Good:** `Fix progress tracking bug in achievement system`
- **Good:** `Update README with deployment instructions`
- **Avoid:** `Fixed stuff`, `Update`, `WIP`

## 🧪 Testing Guidelines

### For .NET Examples
```bash
# Run individual example projects to test
cd examples/Basics
dotnet run

# Run web applications
cd examples/WebApi
dotnet run
# Test with: curl http://localhost:5000/weatherforecast
```

### For Web Interface
- Test in Chrome, Firefox, and Safari
- Test on mobile devices (responsive design)
- Verify progress tracking and achievements work correctly
- Test quiz functionality and scoring
- Check browser console for errors

### For Documentation
- Verify all links work correctly
- Check markdown formatting renders properly
- Test code examples work as described
- Ensure instructions are clear and complete

## 🎨 Coding Standards

### .NET/C# Code
- Follow standard C# naming conventions
- Use meaningful variable and method names
- Add XML documentation comments for public APIs
- Keep methods focused and concise
- Handle errors appropriately

### JavaScript/Web Code
- Use ES6+ modern JavaScript features
- Follow consistent indentation (2 spaces)
- Use descriptive variable names
- Add comments for complex logic
- Keep functions small and focused

### Documentation
- Use clear, simple language
- Include code examples where helpful
- Keep line length reasonable (80-100 characters)
- Use proper markdown formatting
- Check spelling and grammar

## 📋 Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check the documentation** for solutions
3. **Test with the latest version** if possible

### Creating a Good Issue

Include the following information:

**For Bug Reports:**
- Clear description of the problem
- Steps to reproduce the issue
- Expected vs. actual behavior
- Environment details (.NET version, OS, browser)
- Screenshots or error messages if applicable

**For Feature Requests:**
- Clear description of the proposed feature
- Use case and benefits
- Possible implementation approach
- Examples or mockups if relevant

## 🏗️ Project Structure

Understanding the repository structure helps with contributions:

```
learning/
├── .github/              # GitHub configuration and workflows
├── docs/                 # Gamified web learning interface
│   ├── assets/          # CSS, JS, images
│   ├── data/            # Course configuration JSON files
│   └── *.html           # Main interface pages
├── examples/            # .NET runnable code examples
│   ├── Basics/          # Core C# concepts
│   ├── Linq/            # LINQ demonstrations
│   ├── WebApi/          # ASP.NET Core Web API
│   └── ...              # Other examples
├── notes/               # Structured learning notes
├── tools/               # Build and utility tools
├── scripts/             # PowerShell utility scripts
├── README.md            # Main documentation
├── CONTRIBUTING.md      # This file
├── COURSE_CREATION_GUIDE.md  # Guide for creating courses
└── SETUP.md            # .NET setup guide
```

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- Ask questions if you're unsure

## 📚 Resources

- **Main README**: [README.md](README.md)
- **Course Creation Guide**: [COURSE_CREATION_GUIDE.md](COURSE_CREATION_GUIDE.md)
- **.NET Setup Guide**: [SETUP.md](SETUP.md)
- **Template Configuration**: [template-config.json](template-config.json)

## 🚀 Future Directions

We're always looking to improve! Here are some areas where contributions would be especially valuable:

### Platform Enhancements
- Multi-language support and internationalization
- Advanced quiz types (drag-and-drop, matching, fill-in-blank)
- Real-time collaboration features
- Integration with Learning Management Systems (LMS)
- Mobile app versions

### Content Expansion
- More programming language examples (Python, Java, JavaScript)
- Non-programming subjects (Mathematics, Science, Languages)
- Video tutorial integration
- Interactive coding environments
- Peer review and discussion features

### Technical Improvements
- Progressive Web App (PWA) support
- Offline mode with service workers
- Export/import course data
- Analytics and learning insights
- Automated testing infrastructure

### Educational Features
- Adaptive learning paths based on performance
- Spaced repetition for better retention
- Social learning features (leaderboards, study groups)
- Certificate generation upon completion
- Integration with popular education platforms

## 💡 Getting Help

If you need help with your contribution:

1. Check the [documentation](README.md)
2. Search [existing issues](https://github.com/arjankc/learning/issues)
3. Ask questions in your pull request
4. Contact the maintainers

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for contributing to making education more accessible and engaging!** 🎓

*Maintained by [Gurkha Technology](https://www.gurkhatech.com)*
