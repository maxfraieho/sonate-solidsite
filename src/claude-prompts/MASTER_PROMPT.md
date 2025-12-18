# MASTER PROMPT: violin.pp.ua — Повне виправлення (v4)

## Аудит 2025-12-18

### КРИТИЧНІ ПРОБЛЕМИ

| # | Проблема | Причина | Файли |
|---|---|---|---|
| 1 | **Ключі i18n показуються як текст** | HTML `data-i18n` атрибути НЕ відповідають ключам в JSON | `index.html` |
| 2 | **Перемикання мов не працює** | Посилання ведуть на `/fr/index.html` яких не існує | `lang-switcher.js`, `i18n.js` |
| 3 | **Material Icons = текст** | Шрифт не завантажується правильно | `index.html`, CSS |
| 4 | **gallery.html = копія index** | Файл `gallery.html` НЕ ІСНУЄ в репо (404!) | Потрібно створити |
| 5 | **Заголовок partners обрізано** | Недостатній padding-top | `partners.html` |
| 6 | **Немає прапорів на внутр. стор.** | Header відрізняється від index.html | `partners.html`, `contact.html` |

---

## ПРОБЛЕМА #1: i18n ключі (КРИТИЧНО!)

### Повна таблиця невідповідностей

```
HTML data-i18n              →  JSON ключ
─────────────────────────────────────────────────────────
hero.supportCta             →  hero.cta_support
hero.founderCta             →  hero.cta_founder
manifesto.v.title           →  manifesto.values.v_title
manifesto.v.desc            →  manifesto.values.v_desc
manifesto.i.title           →  manifesto.values.i_title
manifesto.i.desc            →  manifesto.values.i_desc
manifesto.o.title           →  manifesto.values.o_title
manifesto.o.desc            →  manifesto.values.o_desc
manifesto.l.title           →  manifesto.values.l_title
manifesto.l.desc            →  manifesto.values.l_desc
manifesto.i2.title          →  manifesto.values.i2_title
manifesto.i2.desc           →  manifesto.values.i2_desc
manifesto.n.title           →  manifesto.values.n_title
manifesto.n.desc            →  manifesto.values.n_desc
quote.arsen                 →  manifesto.quote
mission.cohesion.title      →  mission.items.cohesion
mission.cohesion.desc       →  mission.items.cohesion_desc
mission.mediation.title     →  mission.items.mediation
mission.mediation.desc      →  mission.items.mediation_desc
mission.integration.title   →  mission.items.integration
mission.integration.desc    →  mission.items.integration_desc
```

---

## ПРОБЛЕМА #2: Перемикання мов

### Поточний стан
```html
<!-- Посилання ведуть на неіснуючі папки -->
<a href="/fr/index.html" data-lang="fr">
<a href="/uk/index.html" data-lang="uk">
<a href="/de/index.html" data-lang="de">
```

### Рішення (варіант A - query params)
```html
<a href="?lang=fr" data-lang="fr">
<a href="?lang=uk" data-lang="uk">
<a href="?lang=de" data-lang="de">
```

### Оновити i18n.js
```javascript
function detectLanguage() {
  // 1. Check URL query param first
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && SUPPORTED_LANGUAGES.includes(langParam)) {
    return langParam;
  }
  
  // 2. Check localStorage
  const cached = localStorage.getItem(LOCALE_CACHE_KEY);
  if (cached && SUPPORTED_LANGUAGES.includes(cached)) {
    return cached;
  }
  
  // 3. Default to French
  return 'fr';
}
```

---

## ПРОБЛЕМА #3: Material Icons

### Симптом
На скріншоті видно: `music_note`, `keyboard_arrow_down` як текст

### Перевірка підключення (index.html рядок ~77)
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=..." rel="stylesheet" />
```

### CSS (має бути в head або main.css)
```css
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
```

### Діагностика в браузері
```javascript
// DevTools Console:
document.fonts.check('24px "Material Symbols Outlined"')
// Має повернути true
```

---

## ПРОБЛЕМА #4: gallery.html НЕ ІСНУЄ!

**Факт:** `https://raw.githubusercontent.com/maxfraieho/violin.pp.ua/master/gallery.html` повертає **404**

Тому Cloudflare показує index.html як fallback.

### Рішення
Створити окремий файл `gallery.html` з галереєю зображень.

---

## ПРОБЛЕМА #5-6: Внутрішні сторінки

### partners.html
- Заголовок обрізаний зверху (padding є в CSS, але можливо перезаписується)
- Немає lang-switcher в header

### Потрібно
Скопіювати повний header з index.html включно з lang-switcher.

---

## ПОРЯДОК ВИКОНАННЯ

```
TASK_01_I18N_KEYS.md      ← НАЙКРИТИЧНІШЕ (виправити data-i18n атрибути)
TASK_02_LANG_SWITCHER.md  ← Виправити перемикання мов
TASK_03_MATERIAL_ICONS.md ← Виправити іконки
TASK_04_GALLERY_CREATE.md ← Створити gallery.html
TASK_05_INTERNAL_PAGES.md ← Виправити partners, contact
```

---

## КОМАНДА ЗАПУСКУ

```bash
cd ~/violin.pp.ua && claude "
Read and execute ALL tasks from src/claude-prompts/ in this order:
1. TASK_01_I18N_KEYS.md
2. TASK_02_LANG_SWITCHER.md
3. TASK_03_MATERIAL_ICONS.md
4. TASK_04_GALLERY_CREATE.md
5. TASK_05_INTERNAL_PAGES.md

Use DOING/EXPECT/RESULT protocol.
Stop if any task fails.
"
```

---

## ВЕРИФІКАЦІЯ ПІСЛЯ ВИКОНАННЯ

```bash
# 1. Перевірити що немає старих ключів
grep -E "hero\.(supportCta|founderCta)" index.html
# Має бути порожньо

# 2. Перевірити що є нові ключі  
grep -E "hero\.(cta_support|cta_founder)" index.html
# Має знайти 2 збіги

# 3. Перевірити gallery.html існує
ls -la gallery.html

# 4. Перевірити lang-switcher посилання
grep -E 'href="\?lang=' index.html
```

---

## GIT

```bash
git checkout -b fix/localization-v4
git add index.html gallery.html partners.html contact.html
git add assets/js/modules/i18n.js assets/js/modules/lang-switcher.js
git commit -m "fix: i18n keys, lang switcher, icons, gallery page

- Fixed 22 data-i18n key mismatches (hero, manifesto, mission)
- Changed lang switcher to use ?lang= query params
- Fixed Material Icons font loading
- Created gallery.html (was missing!)
- Fixed internal pages header with lang-switcher"

git push origin fix/localization-v4
```
