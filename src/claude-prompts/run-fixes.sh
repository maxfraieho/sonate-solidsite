#!/bin/bash

# =====================================================
# violin.pp.ua - Claude CLI Fix Script
# Оптимізовано під CLAUDE.md Protocol
# =====================================================

echo "🎻 violin.pp.ua Fix Script"
echo "=========================="
echo ""

# Check if in correct directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Are you in the violin.pp.ua project root?"
    exit 1
fi

# Check if Claude CLI is installed
if ! command -v claude &> /dev/null; then
    echo "❌ Error: Claude CLI not found. Install it first."
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

# Session management reminder
echo "💡 Рекомендація: почніть сесію перед роботою"
echo "   /project:session-start violin-fix"
echo ""

# Menu
echo "Оберіть завдання:"
echo ""
echo "  [1] 🚀 Всі виправлення (CLAUDE_MASTER_PROMPT.md)"
echo ""
echo "  Phase 1 - Critical:"
echo "  [2] 🔧 Fix i18n keys (TASK_001)"
echo "  [3] 🔧 Fix header/lang switcher (TASK_002)"
echo "  [4] 🔧 Fix hero layout (TASK_003)"
echo ""
echo "  Phase 2 - Pages:"
echo "  [5] 🔧 Fix page top padding (TASK_004)"
echo ""
echo "  Phase 3 - Components:"
echo "  [6] 🔧 Fix audio player (TASK_005)"
echo "  [7] 🔧 Fix gallery (TASK_006)"
echo ""
echo "  Phase 4 - Cleanup:"
echo "  [8] 🔧 Miscellaneous fixes (TASK_007)"
echo ""
echo "  [9] 👋 Exit"
echo ""

read -p "Enter choice [1-9]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Running ALL fixes..."
        echo "Skills: executing-plans, frontend-design, verification-before-completion"
        echo ""
        claude chat --file claude-prompts/CLAUDE_MASTER_PROMPT.md
        ;;
    2)
        echo ""
        echo "🔧 Fixing i18n keys..."
        echo "Skills: systematic-debugging, verification-before-completion"
        echo ""
        claude chat --file claude-prompts/TASK_001_FIX_I18N_KEYS.md
        ;;
    3)
        echo ""
        echo "🔧 Fixing header/lang switcher..."
        echo "Skills: frontend-design, verification-before-completion"
        echo ""
        claude chat --file claude-prompts/TASK_002_HEADER_LANG_SWITCHER.md
        ;;
    4)
        echo ""
        echo "🔧 Fixing hero layout..."
        echo "Skills: frontend-design, verification-before-completion"
        echo ""
        claude chat --file claude-prompts/TASK_003_HERO_LAYOUT.md
        ;;
    5)
        echo ""
        echo "🔧 Fixing page top padding..."
        echo "Skills: frontend-design, verification-before-completion"
        echo ""
        claude chat --file claude-prompts/TASK_004_PAGE_TOP_PADDING.md
        ;;
    6)
        echo ""
        echo "🔧 Fixing audio player..."
        echo "Skills: frontend-design, systematic-debugging"
        echo ""
        claude chat --file claude-prompts/TASK_005_AUDIO_PLAYER.md
        ;;
    7)
        echo ""
        echo "🔧 Fixing gallery..."
        echo "Skills: frontend-design, systematic-debugging"
        echo ""
        claude chat --file claude-prompts/TASK_006_GALLERY_FIX.md
        ;;
    8)
        echo ""
        echo "🔧 Running misc fixes..."
        echo "Skills: frontend-design, verification-before-completion"
        echo ""
        claude chat --file claude-prompts/TASK_007_MISC_FIXES.md
        ;;
    9)
        echo "👋 Bye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "✅ Task completed!"
echo ""
echo "📝 Git workflow (ВАЖЛИВО: не використовуйте 'git add .'):"
echo ""
echo "   # Додавайте файли окремо:"
echo "   git add index.html"
echo "   git add fr/index.html uk/index.html de/index.html"
echo "   git add assets/css/main.css"
echo "   git add assets/js/lang-switcher.js"
echo "   # ... інші змінені файли"
echo ""
echo "   git commit -m 'fix: localization and layout improvements'"
echo "   git push origin fix/full-localization-and-layout"
echo ""
echo "💡 Не забудьте завершити сесію:"
echo "   /project:session-end"
