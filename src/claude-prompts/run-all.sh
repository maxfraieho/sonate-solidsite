#!/bin/bash
# run-all.sh — Автоматичне виконання всіх завдань для violin.pp.ua
# Запуск: ./src/claude-prompts/run-all.sh

set -e  # Зупинитись при помилці

PROMPTS_DIR="src/claude-prompts"
LOG_FILE="multilingual-fix.log"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  VIOLIN.PP.UA — Повний рефакторинг мультимовної системи     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Дата: $(date)"
echo "Логування в: $LOG_FILE"
echo ""

# Функція для виконання завдання
run_task() {
    local task_num=$1
    local task_file=$2
    local task_name=$3
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📋 TASK $task_num: $task_name"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if [ -f "$PROMPTS_DIR/$task_file" ]; then
        echo "⏳ Виконання..."
        claude "
DOING: Execute TASK $task_num - $task_name

Read and execute: $PROMPTS_DIR/$task_file

Use DOING/EXPECT/RESULT protocol.
Verify changes after completion.
Report any errors immediately.
" 2>&1 | tee -a $LOG_FILE
        
        echo ""
        read -p "✅ Task $task_num завершено? (y/n/skip): " confirm
        if [ "$confirm" = "n" ]; then
            echo "❌ Task $task_num failed. Зупинка."
            exit 1
        elif [ "$confirm" = "skip" ]; then
            echo "⏭️  Пропуск Task $task_num"
        fi
    else
        echo "⚠️  Файл не знайдено: $PROMPTS_DIR/$task_file"
        read -p "Продовжити? (y/n): " cont
        if [ "$cont" != "y" ]; then
            exit 1
        fi
    fi
    echo ""
}

# Головне меню
echo "Оберіть режим виконання:"
echo "1) Виконати ВСІ завдання послідовно"
echo "2) Виконати конкретне завдання"
echo "3) Показати список завдань"
echo ""
read -p "Ваш вибір (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Запуск всіх завдань..."
        echo ""
        
        run_task "01" "TASK_01_REMOVE_LANG_FOLDERS.md" "Видалення папок /fr, /uk, /de"
        run_task "02" "TASK_02_I18N_ENGINE.md" "Створення i18n движка"
        run_task "03" "TASK_03_FIX_DATA_I18N.md" "Виправлення data-i18n ключів"
        run_task "04" "TASK_04_JS_HARDCODED.md" "Винесення тексту з JS"
        run_task "05" "TASK_05_MATERIAL_ICONS.md" "Виправлення Material Icons"
        run_task "06" "TASK_06_PAGES_UNIFIED.md" "Уніфікація сторінок"
        
        echo "╔══════════════════════════════════════════════════════════════╗"
        echo "║  ✅ ВСІ ЗАВДАННЯ ВИКОНАНО!                                   ║"
        echo "╚══════════════════════════════════════════════════════════════╝"
        echo ""
        echo "📝 Наступні кроки:"
        echo "   1. Перевірте сайт локально"
        echo "   2. git add -A"
        echo "   3. git commit -m 'fix: complete multilingual system overhaul'"
        echo "   4. git push origin fix/multilingual-system-v5"
        ;;
    2)
        echo ""
        echo "Доступні завдання:"
        echo "  1. TASK_01 - Видалення папок /fr, /uk, /de"
        echo "  2. TASK_02 - Створення i18n движка"
        echo "  3. TASK_03 - Виправлення data-i18n ключів"
        echo "  4. TASK_04 - Винесення тексту з JS"
        echo "  5. TASK_05 - Виправлення Material Icons"
        echo "  6. TASK_06 - Уніфікація сторінок"
        echo ""
        read -p "Номер завдання (1-6): " task_num
        
        case $task_num in
            1) run_task "01" "TASK_01_REMOVE_LANG_FOLDERS.md" "Видалення папок" ;;
            2) run_task "02" "TASK_02_I18N_ENGINE.md" "i18n движок" ;;
            3) run_task "03" "TASK_03_FIX_DATA_I18N.md" "data-i18n ключі" ;;
            4) run_task "04" "TASK_04_JS_HARDCODED.md" "JS текст" ;;
            5) run_task "05" "TASK_05_MATERIAL_ICONS.md" "Material Icons" ;;
            6) run_task "06" "TASK_06_PAGES_UNIFIED.md" "Сторінки" ;;
            *) echo "Невірний номер" ;;
        esac
        ;;
    3)
        echo ""
        echo "📋 СПИСОК ЗАВДАНЬ:"
        echo ""
        echo "TASK_01_REMOVE_LANG_FOLDERS.md"
        echo "  → Видалити застарілі папки /fr, /uk, /de"
        echo ""
        echo "TASK_02_I18N_ENGINE.md"
        echo "  → Створити i18n-bridge.js та lang-switcher.js"
        echo ""
        echo "TASK_03_FIX_DATA_I18N.md"
        echo "  → Виправити 22 невідповідності data-i18n ключів"
        echo ""
        echo "TASK_04_JS_HARDCODED.md"
        echo "  → Винести твердокодований текст з JS в JSON"
        echo ""
        echo "TASK_05_MATERIAL_ICONS.md"
        echo "  → Виправити відображення Material Icons"
        echo ""
        echo "TASK_06_PAGES_UNIFIED.md"
        echo "  → Уніфікувати header, створити gallery.html"
        ;;
    *)
        echo "Невірний вибір"
        exit 1
        ;;
esac
