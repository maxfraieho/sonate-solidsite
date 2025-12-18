# TASK 02: Виправлення перемикання мов

## Проблема
Перемикач мов не працює. Посилання ведуть на неіснуючі папки `/fr/`, `/uk/`, `/de/`.

## Поточний код (index.html ~рядки 286-294)
```html
<a class="lang-btn" href="/fr/index.html" data-lang="fr">
<a class="lang-btn" href="/uk/index.html" data-lang="uk">
<a class="lang-btn" href="/de/index.html" data-lang="de">
```

---

## РІШЕННЯ: Query параметри

### Крок 1: Змінити посилання в index.html

**Header desktop (рядки ~286-294):**
```html
<div id="lang-switcher" class="lang-switcher" role="navigation" aria-label="Language switcher">
  <a class="lang-btn" href="?lang=fr" data-lang="fr" hreflang="fr" title="Français">
    <img class="flag" src="/assets/img/flags/fr.svg" alt="Français">
  </a>
  <a class="lang-btn" href="?lang=uk" data-lang="uk" hreflang="uk" title="Українська">
    <img class="flag" src="/assets/img/flags/uk.svg" alt="Українська">
  </a>
  <a class="lang-btn" href="?lang=de" data-lang="de" hreflang="de" title="Deutsch">
    <img class="flag" src="/assets/img/flags/de.svg" alt="Deutsch">
  </a>
</div>
```

**Mobile menu (рядки ~340-348):**
```html
<div class="flex items-center justify-center gap-3 pt-2 border-t border-primary/20 mt-3">
  <a class="lang-btn-mobile" href="?lang=fr" data-lang="fr" hreflang="fr" title="Français">
    <img class="flag-mobile" src="/assets/img/flags/fr.svg" alt="Français">
  </a>
  <a class="lang-btn-mobile" href="?lang=uk" data-lang="uk" hreflang="uk" title="Українська">
    <img class="flag-mobile" src="/assets/img/flags/uk.svg" alt="Українська">
  </a>
  <a class="lang-btn-mobile" href="?lang=de" data-lang="de" hreflang="de" title="Deutsch">
    <img class="flag-mobile" src="/assets/img/flags/de.svg" alt="Deutsch">
  </a>
</div>
```

### SED команди
```bash
# Замінити /fr/index.html на ?lang=fr
sed -i 's|href="/fr/index.html"|href="?lang=fr"|g' index.html
sed -i 's|href="/uk/index.html"|href="?lang=uk"|g' index.html
sed -i 's|href="/de/index.html"|href="?lang=de"|g' index.html
```

---

### Крок 2: Оновити i18n.js

**Файл:** `assets/js/modules/i18n.js`

**Замінити функцію detectLanguage():**

```javascript
/**
 * Detect language from URL query param, localStorage, or default to French
 */
function detectLanguage() {
  // 1. Check URL query param first (?lang=uk)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && SUPPORTED_LANGUAGES.includes(langParam)) {
    console.log(`[i18n] Language from URL param: ${langParam}`);
    return langParam;
  }
  
  // 2. Check localStorage cache
  const cached = localStorage.getItem(LOCALE_CACHE_KEY);
  if (cached && SUPPORTED_LANGUAGES.includes(cached)) {
    console.log(`[i18n] Language from cache: ${cached}`);
    return cached;
  }
  
  // 3. Default to French
  console.log('[i18n] Defaulting to French');
  return 'fr';
}
```

---

### Крок 3: Оновити lang-switcher.js

**Файл:** `assets/js/modules/lang-switcher.js`

```javascript
(function() {
  'use strict';

  function highlightActiveFlag() {
    // Get language from URL param or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const currentLang = urlParams.get('lang') || localStorage.getItem('violin-i18n-lang') || 'fr';
    
    const flags = document.querySelectorAll('.lang-btn, .lang-btn-mobile');

    flags.forEach(flag => {
      flag.classList.remove('active');
      const lang = flag.getAttribute('data-lang');
      
      if (lang === currentLang) {
        flag.classList.add('active');
      }
    });
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', highlightActiveFlag);
  
  // Also run after i18n initializes (in case of dynamic content)
  window.addEventListener('i18n-ready', highlightActiveFlag);
})();
```

---

### Крок 4: CSS для активного прапора

**Додати в `<style>` секцію index.html або в main.css:**

```css
/* Active language flag indicator */
.lang-btn.active,
.lang-btn-mobile.active {
  position: relative;
}

.lang-btn.active::after,
.lang-btn-mobile.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 2px;
  background-color: #D4AF37; /* gold */
  border-radius: 1px;
}

.lang-btn,
.lang-btn-mobile {
  position: relative;
  display: inline-block;
}
```

---

## Верифікація

```bash
# 1. Перевірити що немає старих посилань
grep -c '/fr/index.html' index.html  # має бути 0

# 2. Перевірити що є нові посилання
grep -c '?lang=fr' index.html  # має бути >= 2

# 3. Тест в браузері
# Відкрити: https://violin.pp.ua/?lang=uk
# Має показати український контент
```

---

## Чекліст

- [ ] Змінено посилання в header desktop
- [ ] Змінено посилання в mobile menu
- [ ] Оновлено detectLanguage() в i18n.js
- [ ] Оновлено lang-switcher.js
- [ ] Додано CSS для active стану
- [ ] Перемикання мов працює
