# Gamified Learning Platform

This repository provides a **customizable, gamified learning platform** that can be easily adapted for any subject or course. Originally designed for C#/.NET learning, it now supports complete customization through JSON configuration files.

## ✨ Key Features

- **🎮 Fully Customizable**: Easy to fork and adapt for any learning subject
- **📚 JSON-Driven Content**: All course content defined in simple JSON files
- **🏆 Achievement System**: Unlock badges and track progress
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🎯 Interactive Quizzes**: Test knowledge with immediate feedback
- **📈 Progress Tracking**: Visual progress indicators and analytics
- **⚡ No Build Process**: Pure HTML/CSS/JS - deploy anywhere

## 🚀 Quick Start - Create Your Course

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally: `git clone https://github.com/yourusername/learning.git`
3. **Customize the configuration** in `docs/data/config.json`
4. **Add your content** to `docs/data/levels.json` and `docs/data/achievements.json`
5. **Test locally**: `cd docs && python3 -m http.server 8000`
6. **Deploy** to GitHub Pages or any web server

## 📋 Example Courses

See the `examples/` directory for complete course configurations:
- **Mathematics**: Interactive problem-solving with step-by-step guidance
- **JavaScript**: Modern web development with hands-on projects  
- **Science**: Virtual laboratory experiments and simulations

## 📖 Documentation

- **[Complete Course Creation Guide](COURSE_CREATION_GUIDE.md)** - Step-by-step instructions
- **[Template Configuration](template-config.json)** - Starting point for new courses
- **[Original Setup Guide](SETUP.md)** - For .NET development examples

## 🛠 Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for progress tracking
- **Deployment**: Static files - works with any web server
- **No Backend Required**: Everything runs client-side

## 🎨 Customization Options

### Theme & Branding
- Colors, fonts, and visual style
- Course title, hero text, and descriptions
- Navigation labels and icons
- Loading messages and feedback text

### Content Structure
- Learning levels with theory, code examples, and quizzes
- Achievement system with custom badges and rewards
- Progressive difficulty tiers
- Interactive elements and multimedia

### Subject Adaptation
The platform works for any subject:
- **Programming**: Code examples, debugging challenges, projects
- **Mathematics**: Problem-solving, step-by-step solutions, formulas
- **Sciences**: Experiments, simulations, theories
- **Languages**: Vocabulary, grammar, conversation practice
- **Business**: Case studies, simulations, skill development

## 📊 Original C# Course Content

This repository includes a complete C# learning curriculum with:

- **Track progress**: `checklist.md`
- **Study notes**: `notes/` directory  
- **Runnable examples**: `examples/` directory
- **Printable book**: Run `./build-book.ps1` to generate `book/book.html`

### Course Structure
1. **Core C# & .NET Fundamentals**
2. **Object-Oriented Programming** 
3. **Advanced Language Features**
4. **Web Development with ASP.NET Core**
5. **Desktop Applications**
6. **Database Integration**
7. **Testing & Deployment**

## 🚀 Deployment Options

### GitHub Pages (Recommended)
1. Enable GitHub Pages in repository settings
2. Select "Deploy from a branch" → "main" → "/docs" 
3. Your course will be available at `https://yourusername.github.io/learning/`

### Other Platforms
- **Netlify**: Drag and drop the `docs/` folder
- **Vercel**: Connect your GitHub repository
- **Any Web Server**: Upload the `docs/` folder contents

## 🤝 Contributing

We welcome contributions:
- **New course examples** in the `examples/` directory
- **Feature improvements** to the core platform
- **Documentation updates** and guides
- **Bug fixes** and performance improvements

## 📄 License

This project is open source and available for educational use. Feel free to use it for:
- Educational institutions and courses
- Corporate training programs  
- Personal learning projects
- Online learning platforms

---

## Original C# Learning Resources

### 1) Core C# & .NET Fundamentals
- 1.1 C# Basics
  - Data Types: `notes/01-csharp-basics/01-data-types.md`
  - Variables, Operators, Expressions: `notes/01-csharp-basics/02-variables-operators-expressions.md`
  - Type Conversion: `notes/01-csharp-basics/03-type-conversion.md`
  - Namespaces: `notes/01-csharp-basics/04-namespaces.md`
- 1.2 Flow Control
  - Branching (if-else, switch): `notes/02-flow-control/01-branching.md`
  - Looping (for, while, foreach): `notes/02-flow-control/02-looping.md`
  - Iterators (yield, IEnumerable): `notes/02-flow-control/03-iterators.md`
- 1.3 .NET Ecosystem
  - CLR: `notes/03-dotnet-ecosystem/01-clr.md`
  - FCL: `notes/03-dotnet-ecosystem/02-fcl.md`
  - Visual Studio / VS Code Setup: `notes/03-dotnet-ecosystem/03-ide-setup.md`

More sections and links will be added as we generate notes.

### Examples
- Basics demos: `examples/Basics`
- LINQ demos: `examples/Linq`
- Async demos: `examples/Async`
- File I/O demos: `examples/FileIO`
- EF Core demos: `examples/EFCore`
- ADO.NET demos: `examples/AdoNet`
- WPF app: `examples/WpfApp` (Windows only)
- ASP.NET Core Web API: `examples/WebApi`
