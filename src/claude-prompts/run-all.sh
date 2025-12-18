#!/bin/bash
# =============================================
# VIOLIN.PP.UA - Run All Fix Tasks
# =============================================

set -e  # Exit on error

echo "🎻 violin.pp.ua - Виконання всіх виправлень"
echo "============================================"

cd ~/violin.pp.ua || { echo "❌ Папка ~/violin.pp.ua не знайдена"; exit 1; }

# Create branch
git checkout -b fix/full-localization-v3 2>/dev/null || git checkout fix/full-localization-v3

echo ""
echo "📌 TASK 03: i18n Keys (КРИТИЧНО)"
echo "--------------------------------"
claude "Read src/claude-prompts/TASK_03_I18N_KEYS.md and execute all sed commands to fix data-i18n attributes"

read -p "✓ i18n ключі виправлено? (Enter для продовження, Ctrl+C для скасування)"

echo ""
echo "📌 TASK 01: Header Lang Switcher"
echo "--------------------------------"
claude "Read src/claude-prompts/TASK_01_HEADER_LANG_SWITCHER.md and move lang-switcher after logo"

read -p "✓ Header виправлено? (Enter для продовження)"

echo ""
echo "📌 TASK 02: Material Icons"
echo "--------------------------"
claude "Read src/claude-prompts/TASK_02_MATERIAL_ICONS.md and verify icons display correctly"

read -p "✓ Іконки працюють? (Enter для продовження)"

echo ""
echo "📌 TASK 04: Pages Fix"
echo "---------------------"
claude "Read src/claude-prompts/TASK_04_PAGES_FIX.md and fix gallery.html and partners.html"

read -p "✓ Сторінки виправлено? (Enter для продовження)"

echo ""
echo "📌 TASK 05: CSS Layout"
echo "----------------------"
claude "Read src/claude-prompts/TASK_05_CSS_LAYOUT.md and apply CSS fixes"

echo ""
echo "✅ Всі завдання виконано!"
echo ""
echo "Перевір сайт: https://violin.pp.ua/"
echo ""

read -p "Все працює? Комітимо? (Enter для git commit)"

# Git commit
git add index.html uk/index.html de/index.html
git add gallery.html partners.html contact.html about.html 2>/dev/null || true
git add assets/css/*.css 2>/dev/null || true
git add assets/js/modules/*.js 2>/dev/null || true

git commit -m "fix: i18n keys, header, icons, pages, CSS

- Fixed 22 data-i18n key mismatches
- Moved lang-switcher after logo
- Verified Material Icons
- Fixed gallery and partners pages
- Added page-hero padding"

echo ""
echo "🚀 Push with: git push origin fix/full-localization-v3"
