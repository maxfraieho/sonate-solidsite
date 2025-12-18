#!/bin/bash

# =============================================
# VIOLIN.PP.UA - Run All Fix Tasks
# =============================================

echo "🎻 Starting violin.pp.ua fixes..."
echo "=================================="

# Navigate to project root
cd ~/violin.pp.ua || exit 1

# Create backup branch
git checkout -b fix/full-localization-v2-$(date +%Y%m%d)

# =============================================
# TASK 01: Header & Language Switcher
# =============================================
echo ""
echo "📌 TASK 01: Header & Language Switcher"
echo "--------------------------------------"

claude "Read src/claude-prompts/TASK_01_HEADER_LANG_SWITCHER.md and execute all steps. Follow the explicit reasoning protocol."

read -p "Press Enter after verifying header changes..."

# =============================================
# TASK 02: Material Icons
# =============================================
echo ""
echo "📌 TASK 02: Material Icons"
echo "--------------------------------------"

claude "Read src/claude-prompts/TASK_02_MATERIAL_ICONS.md and execute all steps."

read -p "Press Enter after verifying icons..."

# =============================================
# TASK 03: i18n Keys
# =============================================
echo ""
echo "📌 TASK 03: i18n Keys"
echo "--------------------------------------"

claude "Read src/claude-prompts/TASK_03_I18N_KEYS.md and execute all steps. This is critical - all translation keys must work."

read -p "Press Enter after verifying translations..."

# =============================================
# TASK 04: Pages Fix
# =============================================
echo ""
echo "📌 TASK 04: Pages Fix (Gallery, Partners, Contact)"
echo "--------------------------------------"

claude "Read src/claude-prompts/TASK_04_PAGES_FIX.md and execute all steps."

read -p "Press Enter after verifying pages..."

# =============================================
# TASK 05: CSS & Layout
# =============================================
echo ""
echo "📌 TASK 05: CSS & Layout"
echo "--------------------------------------"

claude "Read src/claude-prompts/TASK_05_CSS_LAYOUT.md and execute all steps."

read -p "Press Enter after verifying CSS..."

# =============================================
# Final Verification
# =============================================
echo ""
echo "✅ FINAL VERIFICATION"
echo "====================="
echo ""
echo "Check these pages:"
echo "  1. https://violin.pp.ua/"
echo "  2. https://violin.pp.ua/partners.html"
echo "  3. https://violin.pp.ua/gallery.html"
echo "  4. https://violin.pp.ua/contact.html"
echo "  5. https://violin.pp.ua/uk/"
echo "  6. https://violin.pp.ua/de/"
echo ""

read -p "All verified? Press Enter to commit..."

# =============================================
# Git Commit
# =============================================
echo ""
echo "📦 Committing changes..."

# Stage files individually
git add index.html
git add gallery.html
git add partners.html
git add contact.html
git add about.html
git add mission.html
git add fr/*.html
git add uk/*.html
git add de/*.html
git add assets/css/main.css
git add assets/js/modules/*.js

git commit -m "fix: complete localization and layout overhaul

- Header: lang switcher moved after logo
- Header: active language gold underline
- Icons: Material Symbols properly loaded
- i18n: all key mismatches fixed
- Gallery: correct content restored
- Partners: title padding fixed
- Pages: unified header across all
- Audio: SVG icons for player
- CSS: gold color consistency #D4AF37
- CSS: page hero padding for all internal pages"

echo ""
echo "🎉 Done! Push with: git push origin $(git branch --show-current)"
