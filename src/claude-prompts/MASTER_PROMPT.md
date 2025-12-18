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

## Порядок виконання

### ФАЗА 1: i18n ключі (КРИТИЧНО)
**Файл:** `TASK_03_I18N_KEYS.md`
Це головна причина чому тексти не перекладаються!

### ФАЗА 2: Header layout  
**Файл:** `TASK_01_HEADER_LANG_SWITCHER.md`

### ФАЗА 3: Material Icons
**Файл:** `TASK_02_MATERIAL_ICONS.md`

### ФАЗА 4: Сторінки
**Файл:** `TASK_04_PAGES_FIX.md`

### ФАЗА 5: CSS
**Файл:** `TASK_05_CSS_LAYOUT.md`

---

## Правила

1. Використовувати sed для масових замін
2. АБСОЛЮТНІ шляхи: `/assets/css/main.css`
3. Checkpoint кожні 3 файли
4. Якщо щось не працює — ЗУПИНИТИСЬ

---

## Git

```bash
git checkout -b fix/full-localization-v3
# після змін
git add index.html uk/index.html de/index.html
git commit -m "fix: i18n keys, header, icons"
git push origin fix/full-localization-v3
```
