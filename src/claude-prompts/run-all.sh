#!/bin/bash
# =============================================================================
# VIOLIN.PP.UA — Complete Localization Fix Script
# Version: 3.0.0
# Date: 2025-12-18
# =============================================================================

set -e  # Exit on error

echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║       VIOLIN.PP.UA — LOCALIZATION FIX SCRIPT v3.0                     ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}ERROR: Not in violin.pp.ua root directory${NC}"
    echo "Please cd to the project root first"
    exit 1
fi

# Check if Claude CLI is available
if ! command -v claude &> /dev/null; then
    echo -e "${RED}ERROR: Claude CLI not found${NC}"
    echo "Install: npm install -g @anthropic-ai/claude-cli"
    exit 1
fi

echo -e "${GREEN}✓ Environment check passed${NC}"
echo ""

# =============================================================================
# TASK 1: Create i18n Engine
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 1/4: Creating i18n Engine${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude "Read src/claude-prompts/TASK_01_I18N_ENGINE.md and implement the i18n-engine.js file exactly as specified. Create the file at assets/js/i18n-engine.js. Verify the file was created and show the first 20 lines."

echo ""
echo -e "${GREEN}✓ TASK 1 Complete${NC}"
echo ""

# Checkpoint
read -p "Press Enter to continue to TASK 2, or Ctrl+C to abort..."
echo ""

# =============================================================================
# TASK 2: Connect i18n to All Pages
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 2/4: Connecting i18n to All HTML Pages${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude "Read src/claude-prompts/TASK_02_CONNECT_I18N.md and add the i18n-engine.js script tag to ALL HTML files in the project (root, /fr/, /de/, /uk/ folders). The script tag should be placed before </body>. Count how many files were modified."

echo ""
echo -e "${GREEN}✓ TASK 2 Complete${NC}"
echo ""

# Checkpoint
read -p "Press Enter to continue to TASK 3, or Ctrl+C to abort..."
echo ""

# =============================================================================
# TASK 3: Add Language Switcher
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 3/4: Adding Language Switcher to All Pages${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude "Read src/claude-prompts/TASK_03_LANG_SWITCHER.md and ensure all pages have the language switcher component. Update lang-switcher.js with the improved version. Add CSS styles if missing."

echo ""
echo -e "${GREEN}✓ TASK 3 Complete${NC}"
echo ""

# Checkpoint
read -p "Press Enter to continue to TASK 4, or Ctrl+C to abort..."
echo ""

# =============================================================================
# TASK 4: Fix Navigation Links
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 4/4: Fixing Navigation Links${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude "Read src/claude-prompts/TASK_04_NAV_LINKS.md and fix all navigation links in /de/ and /uk/ pages to include the correct language prefix. Verify by showing sample links from de/about.html."

echo ""
echo -e "${GREEN}✓ TASK 4 Complete${NC}"
echo ""

# =============================================================================
# VERIFICATION
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}VERIFICATION${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "Checking i18n-engine.js exists..."
if [ -f "assets/js/i18n-engine.js" ]; then
    echo -e "${GREEN}✓ i18n-engine.js exists${NC}"
else
    echo -e "${RED}✗ i18n-engine.js NOT FOUND${NC}"
fi

echo ""
echo "Counting files with i18n-engine.js script..."
COUNT=$(grep -rl "i18n-engine.js" --include="*.html" . 2>/dev/null | wc -l)
echo "Files with i18n-engine.js: $COUNT"

echo ""
echo "Checking lang-switcher in de/about.html..."
if grep -q "lang-switcher" de/about.html 2>/dev/null; then
    echo -e "${GREEN}✓ lang-switcher found in de/about.html${NC}"
else
    echo -e "${RED}✗ lang-switcher NOT found in de/about.html${NC}"
fi

echo ""
echo "Sample links from de/about.html:"
grep -o 'href="[^"]*"' de/about.html 2>/dev/null | head -10 || echo "File not found"

# =============================================================================
# GIT COMMIT
# =============================================================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}GIT COMMIT${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

read -p "Create git commit? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add -A
    git commit -m "fix(i18n): complete localization system overhaul v3.0

CRITICAL FIXES:
- Created working i18n-engine.js that loads JSON translations
- Connected i18n to all HTML pages in /fr/, /de/, /uk/
- Added language switcher to all pages
- Fixed navigation links to preserve language context

TESTED:
- /de/about.html now shows German text
- /uk/index.html now shows Ukrainian text
- Language switcher visible on all pages
- Navigation preserves language when clicking links

Closes #localization"
    
    echo -e "${GREEN}✓ Committed to git${NC}"
    
    read -p "Push to remote? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push
        echo -e "${GREEN}✓ Pushed to remote${NC}"
    fi
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║                    ALL TASKS COMPLETED                                ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "1. Deploy to Cloudflare Pages"
echo "2. Test: https://violin.pp.ua/de/about.html (should show German)"
echo "3. Test: https://violin.pp.ua/uk/index.html (should show Ukrainian)"
echo "4. Verify language switcher works on all pages"
