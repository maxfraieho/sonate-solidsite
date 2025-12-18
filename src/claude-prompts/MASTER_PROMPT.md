# MASTER PROMPT: violin.pp.ua — Повний рефакторинг мультимовної системи

## Дата аудиту: 2025-12-18

---

## 🔴 КРИТИЧНА ДІАГНОСТИКА

### Три конфліктуючі системи мультимовності

Проєкт одночасно використовує три несумісні підходи:

| Система | Опис | Статус |
|---------|------|--------|
| **A. Папки /fr, /uk, /de** | Дубльовані статичні HTML копії | ❌ Застарілі, не синхронізовані |
| **B. Query params ?lang=** | Динамічна зміна мови | ❌ Не імплементовано |
| **C. JSON словники /locales** | Правильний i18n підхід | ❌ Не підключено |

**Результат:** Жоден спосіб не працює, i18n ключі показуються як текст.

---

## 🔴 10 КРИТИЧНИХ ПРОБЛЕМ

| # | Проблема | Причина | Файли |
|---|----------|---------|-------|
| 1 | **Три мовні системи конфліктують** | Папки + ?lang= + JSON не синхронізовані | /fr, /uk, /de, /locales |
| 2 | **i18n-bridge.js не підключений** | `<script>` не додано в HTML | index.html |
| 3 | **data-i18n ключі не відповідають JSON** | hero.supportCta vs hero.cta_support | index.html, fr.json |
| 4 | **lang-switcher.js не працює** | Не імпортований, не взаємодіє з DOM | assets/js |
| 5 | **Material Icons = текст** | music_note, keyboard_arrow_down як текст | index.html, CSS |
| 6 | **Твердокодований FR текст в JS** | Алерти, кнопки, повідомлення | main.js, contact form |
| 7 | **Перемикання мов зламане** | Посилання /fr/index.html не існують | lang-switcher.js |
| 8 | **Внутрішні сторінки без i18n** | partners.html, contact.html не мають перекладів | *.html |
| 9 | **gallery.html не існує** | 404 при переході | - |
| 10 | **Header різний на сторінках** | Немає lang-switcher на внутрішніх | partners.html |

---

## 📋 ПОРЯДОК ВИКОНАННЯ ЗАВДАНЬ

```
TASK_01 → Видалити папки /fr, /uk, /de (застарілі копії)
TASK_02 → Створити повний i18n движок (i18n-bridge.js, lang-switcher.js)
TASK_03 → Виправити data-i18n ключі в HTML (22 невідповідності)
TASK_04 → Винести твердокодований текст з JS в JSON
TASK_05 → Виправити Material Icons
TASK_06 → Уніфікувати header + створити gallery.html
```

---

## 🚀 КОМАНДА ЗАПУСКУ

### Варіант A: Один промт для всіх завдань

```bash
cd ~/violin.pp.ua
claude "
DOING: Complete multilingual system repair for violin.pp.ua

Read and execute ALL tasks from src/claude-prompts/ in this order:
1. TASK_01_REMOVE_LANG_FOLDERS.md
2. TASK_02_I18N_ENGINE.md  
3. TASK_03_FIX_DATA_I18N.md
4. TASK_04_JS_HARDCODED.md
5. TASK_05_MATERIAL_ICONS.md
6. TASK_06_PAGES_UNIFIED.md

Use DOING/EXPECT/RESULT protocol for each task.
After each task, verify changes before proceeding.
Stop immediately if any task fails.
"
```

### Варіант B: Shell скрипт

```bash
chmod +x src/claude-prompts/run-all.sh
./src/claude-prompts/run-all.sh
```

### Варіант C: По одному завданню

```bash
claude "Read and execute src/claude-prompts/TASK_01_REMOVE_LANG_FOLDERS.md"
# Перевірити → якщо OK →
claude "Read and execute src/claude-prompts/TASK_02_I18N_ENGINE.md"
# і т.д.
```

---

## ✅ ВЕРИФІКАЦІЯ ПІСЛЯ ВИКОНАННЯ

```bash
# 1. Папки /fr, /uk, /de видалені
ls -la fr/ uk/ de/ 2>&1 | grep -c "No such file"
# Очікується: 3

# 2. i18n-bridge.js підключений
grep -c "i18n-bridge.js" index.html
# Очікується: 1

# 3. Нові data-i18n ключі
grep -c "hero.cta_support" index.html
# Очікується: 1

# 4. Перемикання мов працює (query params)
grep -c 'href="?lang=' index.html
# Очікується: 3

# 5. Material Icons підключені правильно
grep -c "Material Symbols Outlined" index.html
# Очікується: 1

# 6. gallery.html створений
ls -la gallery.html
# Очікується: файл існує
```

---

## 📁 GIT WORKFLOW

```bash
git checkout -b fix/multilingual-system-v5
git add -A
git commit -m "fix: complete multilingual system overhaul

BREAKING CHANGES:
- Removed /fr, /uk, /de static folders (use ?lang= instead)
- Implemented dynamic i18n with JSON translations
- Fixed 22 data-i18n key mismatches
- Created unified header with lang-switcher
- Fixed Material Icons font loading
- Created gallery.html page
- Extracted hardcoded FR text from JS to JSON"

git push origin fix/multilingual-system-v5
```

---

## 📚 АРХІТЕКТУРА ПІСЛЯ РЕФАКТОРИНГУ

```
violin.pp.ua/
├── index.html          ← data-i18n атрибути
├── about.html          ← data-i18n атрибути
├── contact.html        ← data-i18n атрибути
├── partners.html       ← data-i18n атрибути
├── gallery.html        ← НОВИЙ файл
├── our-actions.html    ← data-i18n атрибути
├── locales/
│   ├── fr.json         ← Французький (за замовчуванням)
│   ├── uk.json         ← Українська
│   └── de.json         ← Німецька
└── assets/js/
    ├── i18n-bridge.js  ← Завантаження та застосування перекладів
    └── lang-switcher.js ← Перемикання мов
```

**Принцип роботи:**
1. Користувач відкриває сторінку
2. i18n-bridge.js визначає мову (?lang= → localStorage → 'fr')
3. Завантажує /locales/{lang}.json
4. Застосовує переклади до всіх [data-i18n] елементів
5. lang-switcher.js підсвічує активний прапор
