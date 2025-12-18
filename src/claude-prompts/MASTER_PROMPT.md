# MASTER PROMPT: violin.pp.ua — Повне виправлення локалізації та верстки

## Активувати навички
```
RECOMMENDED SKILLS:
- frontend-design
- systematic-debugging  
- verification-before-completion
- executing-plans
```

## Протокол явного міркування (ОБОВ'ЯЗКОВО)

Перед КОЖНОЮ зміною файлу:
```
DOING: [що робиш]
EXPECT: [очікуваний результат]
IF YES: [наступний крок]
IF NO: [зупинка, діагностика]
```

Після КОЖНОЇ дії:
```
RESULT: [що сталося]
MATCHES: [так/ні]
THEREFORE: [висновок]
```

---

## Аналіз коду GitHub (перевірено 2025-01-18)

### Структура проекту
- Гілка: `master` (не main!)
- Material Symbols: ✅ підключений (рядок 77)
- i18n.js: ✅ працює з вкладеними ключами
- JSON локалізації: ✅ структура правильна

### ПРОБЛЕМА #1: Header (index.html рядки 283-305)
**Поточний стан:**
```html
<div class="header-left">
  <div id="lang-switcher">...</div>  <!-- ЗЛІВА -->
  <a href="index.html">Logo</a>       <!-- СПРАВА -->
</div>
```
**Потрібно:** Logo зліва, lang-switcher справа

### ПРОБЛЕМА #2: data-i18n ключі НЕ відповідають JSON
| HTML (data-i18n) | JSON (ключ) | Рядок |
|---|---|---|
| `hero.supportCta` | `hero.cta_support` | ~400 |
| `hero.founderCta` | `hero.cta_founder` | ~404 |
| `manifesto.v.title` | `manifesto.values.v_title` | ~438 |
| `manifesto.v.desc` | `manifesto.values.v_desc` | ~439 |
| `quote.arsen` | `manifesto.quote` | ~510 |
| `mission.cohesion.title` | `mission.items.cohesion` | ~539 |

### ПРОБЛЕМА #3: Material Icons показуються як текст
Шрифт підключений правильно, але на сайті показується текст.
Можлива причина: CSS блокує або шрифт не завантажився.

### ПРОБЛЕМА #4: Gallery показує index.html
Файл gallery.html може містити копію index.html.

### ПРОБЛЕМА #5: Partners заголовок обрізаний
Потрібен padding-top для .page-hero секції.

---

## КОМАНДА ВИКОНАННЯ (скопіювати в Claude CLI)

```bash
cd ~/violin.pp.ua && claude "
Виконай всі завдання з промт-файлів по черзі. 
Для кожного завдання:
1. Прочитай файл промту
2. Виконай всі кроки
3. Перевір результат
4. Переходь до наступного

ПОРЯДОК ВИКОНАННЯ:
1. src/claude-prompts/TASK_03_I18N_KEYS.md (КРИТИЧНО - виправити data-i18n ключі)
2. src/claude-prompts/TASK_01_HEADER_LANG_SWITCHER.md (lang-switcher після logo)
3. src/claude-prompts/TASK_02_MATERIAL_ICONS.md (іконки)
4. src/claude-prompts/TASK_04_PAGES_FIX.md (gallery, partners)
5. src/claude-prompts/TASK_05_CSS_LAYOUT.md (CSS fixes)

Після кожного завдання роби checkpoint. Якщо щось не працює - зупинись і поясни.
Використовуй протокол DOING/EXPECT/RESULT з MASTER_PROMPT.md.
"
```

---

## Альтернатива: По одному

```bash
# Фаза 1 - i18n ключі (НАЙВАЖЛИВІШЕ)
claude "Read src/claude-prompts/TASK_03_I18N_KEYS.md and execute all sed commands"

# Фаза 2 - Header
claude "Read src/claude-prompts/TASK_01_HEADER_LANG_SWITCHER.md and fix header structure"

# Фаза 3 - Icons
claude "Read src/claude-prompts/TASK_02_MATERIAL_ICONS.md and verify icons"

# Фаза 4 - Pages
claude "Read src/claude-prompts/TASK_04_PAGES_FIX.md and fix gallery/partners"

# Фаза 5 - CSS
claude "Read src/claude-prompts/TASK_05_CSS_LAYOUT.md and apply CSS fixes"
```

---

## Правила

1. Використовувати sed для масових замін
2. АБСОЛЮТНІ шляхи: `/assets/css/main.css`
3. Checkpoint кожні 3 файли
4. Якщо щось не працює — ЗУПИНИТИСЬ

---

## Git (після всіх змін)

```bash
git checkout -b fix/full-localization-v3

# Додавати ІНДИВІДУАЛЬНО
git add index.html
git add uk/index.html de/index.html
git add gallery.html partners.html contact.html
git add assets/css/*.css
git add assets/js/modules/*.js

git commit -m "fix: i18n keys, header layout, icons, pages, CSS

- Виправлено 22 data-i18n ключі (hero, manifesto, mission, quote)
- Lang-switcher переміщено після логотипу
- Material Icons перевірено
- Gallery та Partners сторінки виправлено
- CSS padding для page-hero"

git push origin fix/full-localization-v3
```
