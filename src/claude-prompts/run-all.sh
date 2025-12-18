#!/bin/bash
# =============================================
# VIOLIN.PP.UA - Run All Fix Tasks v4
# =============================================

set -e  # Exit on error

echo "🎻 violin.pp.ua - Виконання всіх виправлень v4"
echo "================================================"

cd ~/violin.pp.ua || { echo "❌ Папка ~/violin.pp.ua не знайдена"; exit 1; }

# Create branch
git checkout -b fix/localization-v4 2>/dev/null || git checkout fix/localization-v4

echo ""
echo "📌 TASK 01: i18n Keys (КРИТИЧНО)"
echo "---------------------------------"
claude "Read src/claude-prompts/TASK_01_I18N_KEYS.md and execute all sed commands to fix data-i18n attributes in index.html"
read -p "✓ i18n ключі виправлено? (Enter для продовження, Ctrl+C для скасування) "

echo ""
echo "📌 TASK 02: Language Switcher"
echo "-----------------------------"
claude "Read src/claude-prompts/TASK_02_LANG_SWITCHER.md and fix lang switcher: change hrefs to ?lang= params, update i18n.js and lang-switcher.js"
read -p "✓ Перемикач мов працює? (Enter для продовження) "

echo ""
echo "📌 TASK 03: Material Icons"
echo "--------------------------"
claude "Read src/claude-prompts/TASK_03_MATERIAL_ICONS.md and verify/fix Material Icons font loading"
read -p "✓ Іконки показуються? (Enter для продовження) "

echo ""
echo "📌 TASK 04: Create gallery.html"
echo "-------------------------------"
claude "Read src/claude-prompts/TASK_04_GALLERY_CREATE.md and create gallery.html file with proper header and gallery grid"
read -p "✓ gallery.html створено? (Enter для продовження) "

echo ""
echo "📌 TASK 05: Internal Pages Fix"
echo "------------------------------"
claude "Read src/claude-prompts/TASK_05_INTERNAL_PAGES.md and fix partners.html and contact.html: add lang-switcher to header, fix page-hero padding"
read -p "✓ Внутрішні сторінки виправлено? (Enter для продовження) "

echo ""
echo "✅ Всі завдання виконано!"
echo ""

# Verification
echo "🔍 Верифікація..."
echo ""

echo "Перевірка старих i18n ключів (має бути 0):"
grep -c "hero.supportCta" index.html 2>/dev/null || echo "0"

echo ""
echo "Перевірка нових i18n ключів (має бути 1+):"
grep -c "hero.cta_support" index.html 2>/dev/null || echo "ERROR: не знайдено"

echo ""
echo "Перевірка lang-switcher посилань:"
grep -c '?lang=fr' index.html 2>/dev/null || echo "ERROR: не знайдено"

echo ""
echo "Перевірка gallery.html існує:"
ls -la gallery.html 2>/dev/null || echo "ERROR: файл не існує"

echo ""
read -p "Все працює? Комітимо? (Enter для git commit, Ctrl+C для скасування) "

# Git commit
echo ""
echo "📦 Git commit..."
git add index.html
git add gallery.html 2>/dev/null || true
git add partners.html contact.html about.html our-actions.html 2>/dev/null || true
git add assets/js/modules/i18n.js assets/js/modules/lang-switcher.js 2>/dev/null || true
git add locales/*.json 2>/dev/null || true

git commit -m "fix: i18n keys, lang switcher, icons, gallery page v4

- Fixed 22 data-i18n key mismatches (hero, manifesto, mission)
- Changed lang switcher to use ?lang= query params
- Fixed Material Icons font loading
- Created gallery.html (was missing!)
- Fixed internal pages header with lang-switcher
- Added page-hero padding for internal pages"

echo ""
echo "✅ Commit створено!"
echo ""
echo "🚀 Push з командою:"
echo "   git push origin fix/localization-v4"
