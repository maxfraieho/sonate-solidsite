#!/bin/bash

# =====================================================
# violin.pp.ua - Claude CLI Fix Script
# =====================================================
# 
# USAGE:
# 1. Copy the claude-prompts folder to your project:
#    cp -r claude-prompts /path/to/violin.pp.ua/
#
# 2. Navigate to project directory:
#    cd /path/to/violin.pp.ua
#
# 3. Run Claude CLI with master prompt:
#    claude --file claude-prompts/CLAUDE_MASTER_PROMPT.md
#
# OR run individual tasks:
#    claude --file claude-prompts/TASK_001_FIX_I18N_KEYS.md
#    claude --file claude-prompts/TASK_002_HEADER_LANG_SWITCHER.md
#    etc.
# =====================================================

echo "🎻 violin.pp.ua Fix Script"
echo "=========================="

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

# Menu
echo "Select task to run:"
echo "1) Run ALL fixes (CLAUDE_MASTER_PROMPT.md)"
echo "2) Fix i18n keys only (TASK_001)"
echo "3) Fix header/lang switcher (TASK_002)"
echo "4) Fix hero layout (TASK_003)"
echo "5) Fix page top padding (TASK_004)"
echo "6) Fix audio player (TASK_005)"
echo "7) Fix gallery (TASK_006)"
echo "8) Miscellaneous fixes (TASK_007)"
echo "9) Exit"
echo ""
read -p "Enter choice [1-9]: " choice

case $choice in
    1)
        echo "🚀 Running ALL fixes..."
        claude --file claude-prompts/CLAUDE_MASTER_PROMPT.md
        ;;
    2)
        echo "🔧 Fixing i18n keys..."
        claude --file claude-prompts/TASK_001_FIX_I18N_KEYS.md
        ;;
    3)
        echo "🔧 Fixing header/lang switcher..."
        claude --file claude-prompts/TASK_002_HEADER_LANG_SWITCHER.md
        ;;
    4)
        echo "🔧 Fixing hero layout..."
        claude --file claude-prompts/TASK_003_HERO_LAYOUT.md
        ;;
    5)
        echo "🔧 Fixing page top padding..."
        claude --file claude-prompts/TASK_004_PAGE_TOP_PADDING.md
        ;;
    6)
        echo "🔧 Fixing audio player..."
        claude --file claude-prompts/TASK_005_AUDIO_PLAYER.md
        ;;
    7)
        echo "🔧 Fixing gallery..."
        claude --file claude-prompts/TASK_006_GALLERY_FIX.md
        ;;
    8)
        echo "🔧 Running misc fixes..."
        claude --file claude-prompts/TASK_007_MISC_FIXES.md
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
echo "📝 Don't forget to commit changes:"
echo "   git add ."
echo "   git commit -m 'Fix: localization and layout improvements'"
echo "   git push"
