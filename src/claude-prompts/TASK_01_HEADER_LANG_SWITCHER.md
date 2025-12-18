# TASK 01: Header та Language Switcher

## Проблема
Прапорці мов розташовані ЗЛІВА від логотипу. Користувач хоче їх СПРАВА (після логотипу).
Немає золотого підкреслення активної мови.

---

## Поточна структура в index.html (рядки 283-305)

```html
<!-- Header Left: Language Switcher + Logo -->
<div class="header-left flex items-center gap-3">
  <!-- Language Switcher (BEFORE logo) -->  ← ПРОБЛЕМА ТУТ
  <div id="lang-switcher" class="lang-switcher">
    <a class="lang-btn" href="/fr/index.html">...</a>
    <a class="lang-btn" href="/uk/index.html">...</a>
    <a class="lang-btn" href="/de/index.html">...</a>
  </div>

  <!-- Logo -->
  <a href="index.html" class="flex items-center gap-3">
    <span class="material-symbols-outlined">music_note</span>
    <div class="flex flex-col">
      <span>Sonate</span>
      <span>Solidaire</span>
    </div>
  </a>
</div>
```

---

## Потрібна структура (Logo ПЕРЕД lang-switcher)

```html
<!-- Header Left: Logo + Language Switcher -->
<div class="header-left flex items-center gap-3">
  <!-- Logo -->
  <a href="index.html" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
    <span class="material-symbols-outlined text-primary text-4xl">music_note</span>
    <div class="flex flex-col">
      <span class="font-display font-bold text-xl">Sonate</span>
      <span class="font-display text-primary text-sm">Solidaire</span>
    </div>
  </a>

  <!-- Language Switcher (AFTER logo) -->
  <div id="lang-switcher" class="lang-switcher">
    <a class="lang-btn" href="/fr/index.html" data-lang="fr">
      <img class="flag" src="/assets/img/flags/fr.svg" alt="FR">
    </a>
    <a class="lang-btn" href="/uk/index.html" data-lang="uk">
      <img class="flag" src="/assets/img/flags/uk.svg" alt="UA">
    </a>
    <a class="lang-btn" href="/de/index.html" data-lang="de">
      <img class="flag" src="/assets/img/flags/de.svg" alt="DE">
    </a>
  </div>
</div>
```

---

## Крок 1: Змінити порядок елементів

В файлі index.html знайти блок `<div class="header-left">` (~рядок 283) і поміняти місцями:
1. Спочатку Logo (`<a href="index.html"...>`)
2. Потім lang-switcher (`<div id="lang-switcher"...>`)

---

## Крок 2: Додати CSS для активної мови

Знайти в `<style>` секції (~рядок 161-184) блок `.lang-switcher` і додати:

```css
/* Active language indicator */
.lang-btn.active .flag,
.lang-btn[data-active="true"] .flag {
  border-bottom: 2px solid #c5a059;
}
```

---

## Крок 3: JavaScript для активної мови

Створити або оновити `/assets/js/modules/lang-switcher.js`:

```javascript
(function() {
  'use strict';
  
  function highlightActiveFlag() {
    const path = window.location.pathname;
    const flags = document.querySelectorAll('.lang-btn');
    
    flags.forEach(flag => {
      flag.classList.remove('active');
      const href = flag.getAttribute('href') || '';
      const lang = flag.getAttribute('data-lang');
      
      // Визначити активну мову
      if (path.includes('/uk/') && lang === 'uk') {
        flag.classList.add('active');
      } else if (path.includes('/de/') && lang === 'de') {
        flag.classList.add('active');
      } else if (!path.includes('/uk/') && !path.includes('/de/') && lang === 'fr') {
        flag.classList.add('active');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', highlightActiveFlag);
})();
```

---

## Файли для модифікації

```
/index.html (header-left block, CSS)
/uk/index.html
/de/index.html
/partners.html
/contact.html
/gallery.html
/about.html
/assets/js/modules/lang-switcher.js
```

---

## Чекліст

- [ ] Logo зліва, прапорці справа від нього
- [ ] Активна мова має золоте підкреслення
- [ ] Всі сторінки мають однаковий header
- [ ] Прапорці є на partners.html, gallery.html тощо
