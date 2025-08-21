#!/bin/bash

# Course Configuration Validator
# This script helps validate your custom course configuration files

echo "🔍 Validating Course Configuration Files..."
echo "============================================="

CONFIG_FILE="docs/data/config.json"
LEVELS_FILE="docs/data/levels.json"  
ACHIEVEMENTS_FILE="docs/data/achievements.json"

# Function to validate JSON
validate_json() {
    local file=$1
    if [ -f "$file" ]; then
        if python3 -m json.tool "$file" > /dev/null 2>&1; then
            echo "✅ $file - Valid JSON"
            return 0
        else
            echo "❌ $file - Invalid JSON syntax"
            return 1
        fi
    else
        echo "❌ $file - File not found"
        return 1
    fi
}

# Function to check required config fields
validate_config() {
    echo ""
    echo "📋 Checking required configuration fields..."
    
    local required_fields=("title" "shortTitle" "themeColor" "language" "dataFile" "achievementsFile")
    local missing_fields=()
    
    for field in "${required_fields[@]}"; do
        if ! python3 -c "import json; config=json.load(open('$CONFIG_FILE')); print(config.get('$field', ''))" | grep -q .; then
            missing_fields+=("$field")
        fi
    done
    
    if [ ${#missing_fields[@]} -eq 0 ]; then
        echo "✅ All required config fields present"
    else
        echo "❌ Missing required fields: ${missing_fields[*]}"
        return 1
    fi
    
    # Check course object
    if python3 -c "import json; config=json.load(open('$CONFIG_FILE')); exit(0 if 'course' in config else 1)" 2>/dev/null; then
        echo "✅ Course configuration object found"
    else
        echo "⚠️  Course configuration object missing (optional but recommended)"
    fi
}

# Function to validate levels structure
validate_levels() {
    echo ""
    echo "📚 Checking levels structure..."
    
    if python3 -c "
import json
try:
    levels = json.load(open('$LEVELS_FILE'))
    if 'levels' not in levels or not isinstance(levels['levels'], list):
        exit(1)
    if len(levels['levels']) == 0:
        exit(2)
    
    # Check first level structure
    first_level = levels['levels'][0]
    required = ['id', 'tier', 'title', 'description']
    for field in required:
        if field not in first_level:
            print(f'Missing field: {field}')
            exit(3)
    
    print(f'Found {len(levels[\"levels\"])} levels')
    exit(0)
except Exception as e:
    print(f'Error: {e}')
    exit(4)
" 2>/dev/null; then
        echo "✅ Levels structure is valid"
    else
        echo "❌ Levels structure has issues"
        return 1
    fi
}

# Function to validate achievements
validate_achievements() {
    echo ""
    echo "🏆 Checking achievements structure..."
    
    if python3 -c "
import json
try:
    achievements = json.load(open('$ACHIEVEMENTS_FILE'))
    if 'achievements' not in achievements or not isinstance(achievements['achievements'], list):
        exit(1)
    
    count = len(achievements['achievements'])
    print(f'Found {count} achievements')
    exit(0)
except Exception as e:
    print(f'Error: {e}')
    exit(1)
" 2>/dev/null; then
        echo "✅ Achievements structure is valid"
    else
        echo "❌ Achievements structure has issues"
        return 1
    fi
}

# Function to test local server
test_local_server() {
    echo ""
    echo "🌐 Testing local server setup..."
    
    cd docs
    if python3 -m http.server 8000 --bind 127.0.0.1 > /dev/null 2>&1 & then
        SERVER_PID=$!
        sleep 2
        
        if curl -s http://localhost:8000/ | grep -q "$(python3 -c "import json; print(json.load(open('data/config.json'))['title'])")"; then
            echo "✅ Local server test passed"
            echo "   Your course is accessible at http://localhost:8000/"
        else
            echo "❌ Local server test failed"
        fi
        
        kill $SERVER_PID 2>/dev/null
    else
        echo "❌ Could not start local server"
    fi
    cd ..
}

# Main validation
echo ""
echo "Starting validation..."
echo ""

errors=0

# Validate JSON syntax
validate_json "$CONFIG_FILE" || ((errors++))
validate_json "$LEVELS_FILE" || ((errors++))  
validate_json "$ACHIEVEMENTS_FILE" || ((errors++))

# Validate structure if JSON is valid
if [ $errors -eq 0 ]; then
    validate_config || ((errors++))
    validate_levels || ((errors++))
    validate_achievements || ((errors++))
    
    if [ $errors -eq 0 ]; then
        test_local_server
    fi
fi

echo ""
echo "============================================="
if [ $errors -eq 0 ]; then
    echo "🎉 Validation Complete - Your course configuration looks good!"
    echo ""
    echo "Next steps:"
    echo "1. Test your course: cd docs && python3 -m http.server 8000"
    echo "2. Open http://localhost:8000 in your browser"
    echo "3. Deploy to GitHub Pages or your preferred hosting"
else
    echo "⚠️  Found $errors issue(s) that need to be fixed"
    echo ""
    echo "Please review the errors above and update your configuration files."
fi
echo "============================================="