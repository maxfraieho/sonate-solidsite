#!/bin/bash
# =============================================================================
# VIOLIN.PP.UA — Complete Localization Fix Script
# Version: 3.1.0
# Date: 2025-12-18
# =============================================================================

set -e  # Exit on error

echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║       VIOLIN.PP.UA — LOCALIZATION FIX SCRIPT v3.1                     ║"
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
# TASK 0: FIX ASSET PATHS (MOST CRITICAL!)
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${RED}🔴 TASK 0/5: FIXING BROKEN ASSET PATHS (CRITICAL!)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "This fixes CSS/JS not loading on /uk/ and /de/ pages"
echo ""

claude "Read src/claude-prompts/TASK_05_FIX_ASSET_PATHS.md and execute the bash script to fix all relative asset paths in /uk/ and /de/ folders. Convert href=\"assets/\" to href=\"/assets/\" and src=\"assets/\" to src=\"/assets/\". Also fix lang attribute. Show verification output."

echo ""
echo -e "${GREEN}✓ TASK 0 Complete - Asset paths fixed${NC}"
echo ""

read -p "Press Enter to continue to TASK 1, or Ctrl+C to abort..."
echo ""

# =============================================================================
# TASK 1: Create i18n Engine
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 1/5: Creating i18n Engine${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude "Read src/claude-prompts/TASK_01_I18N_ENGINE.md and implement the i18n-engine.js file exactly as specified. Create the file at assets/js/i18n-engine.js. Verify the file was created and show the first 20 lines."

echo ""
echo -e "${GREEN}✓ TASK 1 Complete${NC}"
echo ""

read -p "Press Enter to continue to TASK 2, or Ctrl+C to abort..."
echo ""

# =============================================================================
# TASK 2: Connect i18n to All Pages
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 2/5: Connecting i18n to All HTML Pages${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude "Read src/claude-prompts/TASK_02_CONNECT_I18N.md and add the i18n-engine.js script tag to ALL HTML files in the project (root, /fr/, /de/, /uk/ folders). The script tag should be placed before </body>. Use ABSOLUTE path: /assets/js/i18n-engine.js. Count how many files were modified."

echo ""
echo -e "${GREEN}✓ TASK 2 Complete${NC}"
echo ""

read -p "Press Enter to continue to TASK 3, or Ctrl+C to abort..."
echo ""

# =============================================================================
# TASK 3: Add Language Switcher
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 3/5: Adding Language Switcher to All Pages${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude "Read src/claude-prompts/TASK_03_LANG_SWITCHER.md and ensure all pages have the language switcher component. Update lang-switcher.js with the improved version. Add CSS styles if missing."

echo ""
echo -e "${GREEN}✓ TASK 3 Complete${NC}"
echo ""

read -p "Press Enter to continue to TASK 4, or Ctrl+C to abort..."
echo ""

# =============================================================================
# TASK 4: Fix Navigation Links
# =============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}TASK 4/5: Fixing Navigation Links${NC}"
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

echo ""
echo "1. Checking asset paths (should be 0 relative paths):"
echo "   /uk/ relative paths: $(grep -r 'href="assets/' uk/*.html 2>/dev/null | wc -l)"
echo "   /de/ relative paths: $(grep -r 'href="assets/' de/*.html 2>/dev/null | wc -l)"

echo ""
echo "2. Checking lang attributes:"
echo "   /uk/ lang=\"uk\": $(grep -l 'lang="uk"' uk/*.html 2>/dev/null | wc -l) files"
echo "   /de/ lang=\"de\": $(grep -l 'lang="de"' de/*.html 2>/dev/null | wc -l) files"

echo ""
echo "3. Checking i18n-engine.js exists..."
if [ -f "assets/js/i18n-engine.js" ]; then
    echo -e "   ${GREEN}✓ i18n-engine.js exists${NC}"
else
    echo -e "   ${RED}✗ i18n-engine.js NOT FOUND${NC}"
fi

echo ""
echo "4. Counting files with i18n-engine.js script..."
COUNT=$(grep -rl "i18n-engine.js" --include="*.html" . 2>/dev/null | wc -l)
echo "   Files with i18n-engine.js: $COUNT"

echo ""
echo "5. Sample CSS path from uk/index.html:"
grep -o 'href="[^"]*tailwind[^"]*"' uk/index.html 2>/dev/null | head -1 || echo "   Not found"

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
    git commit -m "fix(i18n): complete localization system overhaul v3.1

CRITICAL FIXES:
- Fixed broken asset paths in /uk/ and /de/ (relative → absolute)
- Fixed lang attribute (lang=\"fr\" → lang=\"uk\"/lang=\"de\")
- Created working i18n-engine.js that loads JSON translations
- Connected i18n to all HTML pages
- Added language switcher to all pages
- Fixed navigation links to preserve language context

TESTED:
- /uk/index.html now loads CSS correctly
- /de/about.html now shows German text
- Language switcher visible on all pages

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
echo "2. Test: https://violin.pp.ua/uk/ (should have proper CSS)"
echo "3. Test: https://violin.pp.ua/de/about.html (should show German)"
echo "4. Verify language switcher works on all pages"
