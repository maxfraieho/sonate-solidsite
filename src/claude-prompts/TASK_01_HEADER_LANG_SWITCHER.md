# TASK 01: Header та Language Switcher

## Проблема
Прапорці мов розташовані ЗЛІВА від логотипу. Мають бути ПІСЛЯ логотипу.
Немає золотого підкреслення активної мови.
На внутрішніх сторінках (partners.html) немає прапорців взагалі.

## Поточна структура (НЕПРАВИЛЬНА)
```html
<header>
  <div class="lang-switcher">  <!-- ЗЛІВА, неправильно -->
    <a href="/fr/"><img src="flag-fr.png"></a>
    <a href="/uk/"><img src="flag-ua.png"></a>
    <a href="/de/"><img src="flag-de.png"></a>
  </div>
  <div class="logo">
    <span class="material-symbols-outlined">music_note</span>
    <span>Sonate Solidaire</span>
  </div>
  <nav>...</nav>
</header>
```

## Потрібна структура (ПРАВИЛЬНА)
```html
<header>
  <div class="header-left">
    <div class="logo">
      <span class="material-symbols-outlined">music_note</span>
      <span class="logo-text">Sonate<br>Solidaire</span>
    </div>
    <div class="lang-switcher">  <!-- ПІСЛЯ логотипу -->
      <a href="/fr/" class="lang-flag active">
        <img src="/assets/img/flag-fr.png" alt="Français">
      </a>
      <a href="/uk/" class="lang-flag">
        <img src="/assets/img/flag-ua.png" alt="Українська">
      </a>
      <a href="/de/" class="lang-flag">
        <img src="/assets/img/flag-de.png" alt="Deutsch">
      </a>
    </div>
  </div>
  <nav>...</nav>
</header>
```

---

## Крок 1: Знайти поточну структуру header

```
DOING: Шукаю header структуру в index.html
EXPECT: Знайду div.lang-switcher перед логотипом
IF YES: Продовжую до кроку 2
IF NO: Перевіряю альтернативні селектори
```

Команда:
```bash
grep -n "lang-switcher\|header\|logo" index.html | head -30
```

---

## Крок 2: Перемістити lang-switcher після логотипу

```
DOING: Переміщую lang-switcher після logo в index.html
EXPECT: Структура: logo → lang-switcher → nav
IF YES: Продовжую до CSS
IF NO: Зупинка, перевірка HTML синтаксису
```

---

## Крок 3: Додати CSS для активної мови

Додати до `/assets/css/main.css`:

```css
/* === Language Switcher === */
.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-switcher {
  display: flex;
  flex-direction: column;  /* Вертикально на desktop */
  gap: 0.25rem;
}

.lang-flag {
  display: block;
  width: 24px;
  height: 16px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.lang-flag.active,
.lang-flag:hover {
  border-bottom-color: #D4AF37;  /* Золоте підкреслення */
}

.lang-flag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

/* Mobile: горизонтально */
@media (max-width: 768px) {
  .lang-switcher {
    flex-direction: row;
    gap: 0.5rem;
  }
}
```

---

## Крок 4: Додати JavaScript для визначення активної мови

Додати/оновити `/assets/js/modules/lang-switcher.js`:

```javascript
(function() {
  'use strict';
  
  function detectCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/uk/')) return 'uk';
    if (path.startsWith('/de/')) return 'de';
    return 'fr';  // default
  }
  
  function highlightActiveFlag() {
    const currentLang = detectCurrentLanguage();
    const flags = document.querySelectorAll('.lang-flag');
    
    flags.forEach(flag => {
      flag.classList.remove('active');
      const href = flag.getAttribute('href');
      
      if (currentLang === 'fr' && (href === '/' || href === '/fr/' || href.endsWith('/index.html'))) {
        flag.classList.add('active');
      } else if (currentLang === 'uk' && href.includes('/uk/')) {
        flag.classList.add('active');
      } else if (currentLang === 'de' && href.includes('/de/')) {
        flag.classList.add('active');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', highlightActiveFlag);
})();
```

---

## Крок 5: Виправити шляхи до assets (АБСОЛЮТНІ)

У всіх HTML файлах мовних версій (/fr/, /uk/, /de/) замінити:

```html
<!-- НЕПРАВИЛЬНО -->
<link href="../assets/css/main.css" rel="stylesheet">
<script src="../assets/js/main.js"></script>

<!-- ПРАВИЛЬНО -->
<link href="/assets/css/main.css" rel="stylesheet">
<script src="/assets/js/main.js"></script>
```

---

## Файли для модифікації

```
/index.html
/fr/index.html
/uk/index.html
/de/index.html
/partners.html
/fr/partners.html
/uk/partners.html
/de/partners.html
/gallery.html
/contact.html
/about.html
/assets/css/main.css
/assets/js/modules/lang-switcher.js
```

---

## Чекліст перевірки

- [ ] Прапорці після логотипу на всіх сторінках
- [ ] Золоте підкреслення активної мови
- [ ] Перемикання мов працює без зламаних стилів
- [ ] Вертикально на desktop, горизонтально на mobile
- [ ] Всі шляхи абсолютні (/assets/...)
