# TASK 03: Додати lang-switcher на ВСІ сторінки

## 🎯 МЕТА
Додати компонент перемикача мов (FR/DE/UK прапорці) на всі сторінки, де він відсутній.

## 📋 REASONING PROTOCOL

```
DOING: Adding language switcher component to all pages
EXPECT: All pages have visible FR/DE/UK flag buttons
IF YES: Users can switch languages from any page
IF NO: Check HTML structure, CSS visibility
RESULT: Language switcher appears in header on all pages
MATCHES: Clicking DE flag navigates to /de/ version
THEREFORE: Language switching works site-wide
```

## 🔴 СТОРІНКИ БЕЗ ПЕРЕМИКАЧА (підтверджено аудитом)

- `/fr/our-actions.html` ❌
- `/fr/contact.html` ❌
- `/fr/partners.html` ❌
- `/fr/events.html` ❌
- `/fr/news.html` ❌
- `/fr/donate.html` ❌
- Всі сторінки в `/de/` та `/uk/` ❌

## 📁 HTML КОМПОНЕНТ ПЕРЕМИКАЧА

```html
<!-- Language Switcher - додати в <header> після навігації -->
<div class="lang-switcher" role="navigation" aria-label="Language selection">
  <a href="/fr/" class="lang-btn" data-lang="fr" title="Français">
    <img src="/assets/img/flags/fr.svg" alt="FR" width="24" height="16">
  </a>
  <a href="/de/" class="lang-btn" data-lang="de" title="Deutsch">
    <img src="/assets/img/flags/de.svg" alt="DE" width="24" height="16">
  </a>
  <a href="/uk/" class="lang-btn" data-lang="uk" title="Українська">
    <img src="/assets/img/flags/uk.svg" alt="UK" width="24" height="16">
  </a>
</div>
```

## 📁 ОНОВЛЕНИЙ lang-switcher.js

```javascript
/**
 * Language Switcher Module v2.0
 * Handles language switching with proper URL generation
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
  });

  function initLanguageSwitcher() {
    const langLinks = document.querySelectorAll('.lang-btn');
    
    if (langLinks.length === 0) {
      console.warn('[lang-switcher] No .lang-btn elements found');
      return;
    }

    // Get current path and language
    const currentPath = window.location.pathname;
    const currentLang = detectCurrentLanguage(currentPath);
    
    // Update active state
    updateActiveLanguage(currentLang);
    
    // Update hrefs to preserve current page
    langLinks.forEach(link => {
      const targetLang = link.dataset.lang;
      link.href = generateLanguageUrl(currentPath, targetLang);
      
      link.addEventListener('click', function(e) {
        // Allow default navigation, but store preference
        localStorage.setItem('violin_lang', targetLang);
      });
    });

    console.log('[lang-switcher] Initialized. Current:', currentLang);
  }

  function detectCurrentLanguage(path) {
    if (path.startsWith('/de/')) return 'de';
    if (path.startsWith('/uk/')) return 'uk';
    if (path.startsWith('/fr/')) return 'fr';
    return 'fr'; // default
  }

  function generateLanguageUrl(currentPath, targetLang) {
    // Remove existing language prefix
    let pagePath = currentPath
      .replace(/^\/(fr|de|uk)\//, '/')
      .replace(/^\/(fr|de|uk)$/, '/');
    
    // Handle root path
    if (pagePath === '/' || pagePath === '') {
      pagePath = '/index.html';
    }
    
    // Generate new URL with target language
    return `/${targetLang}${pagePath}`;
  }

  function updateActiveLanguage(activeLang) {
    document.querySelectorAll('.lang-btn').forEach(link => {
      const linkLang = link.dataset.lang;
      
      if (linkLang === activeLang) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

})();
```

## 📁 CSS ДЛЯ ПЕРЕМИКАЧА

Додати в `assets/css/tailwind.css` або окремий файл:

```css
/* Language Switcher Styles */
.lang-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.lang-btn {
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 4px;
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.lang-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.lang-btn.active {
  opacity: 1;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

.lang-btn img {
  display: block;
  border-radius: 2px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .lang-switcher {
    justify-content: center;
    padding: 1rem 0;
  }
}
```

## 🔧 СКРИПТ МАСОВОГО ДОДАВАННЯ

```bash
#!/bin/bash
# Skill hint: /systematic-debugging

# HTML snippet for language switcher
LANG_SWITCHER='<div class="lang-switcher" role="navigation" aria-label="Language selection">
  <a href="/fr/" class="lang-btn" data-lang="fr" title="Français">
    <img src="/assets/img/flags/fr.svg" alt="FR" width="24" height="16">
  </a>
  <a href="/de/" class="lang-btn" data-lang="de" title="Deutsch">
    <img src="/assets/img/flags/de.svg" alt="DE" width="24" height="16">
  </a>
  <a href="/uk/" class="lang-btn" data-lang="uk" title="Українська">
    <img src="/assets/img/flags/uk.svg" alt="UK" width="24" height="16">
  </a>
</div>'

# List of pages that need lang-switcher
PAGES=(
  "fr/our-actions.html"
  "fr/contact.html"
  "fr/partners.html"
  "fr/events.html"
  "fr/news.html"
  "fr/donate.html"
  "de/index.html"
  "de/about.html"
  "de/our-actions.html"
  "de/contact.html"
  "de/partners.html"
  "de/events.html"
  "de/news.html"
  "de/donate.html"
  "uk/index.html"
  "uk/about.html"
  "uk/our-actions.html"
  "uk/contact.html"
  "uk/partners.html"
  "uk/events.html"
  "uk/news.html"
  "uk/donate.html"
)

for page in "${PAGES[@]}"; do
  if [ -f "$page" ]; then
    # Check if lang-switcher already exists
    if grep -q "lang-switcher" "$page"; then
      echo "[SKIP] Already has switcher: $page"
    else
      echo "[TODO] Need to add switcher: $page"
      # Manual insertion needed - find the right place in header
    fi
  else
    echo "[WARN] File not found: $page"
  fi
done
```

## ⚠️ РУЧНЕ ДОДАВАННЯ

Оскільки структура header може відрізнятися, для кожної сторінки:

1. Відкрити файл
2. Знайти `<header>` або `<nav>` елемент
3. Додати `.lang-switcher` блок після меню навігації
4. Перевірити візуально

## ✅ КРИТЕРІЇ УСПІХУ

1. [ ] Всі сторінки мають `.lang-switcher` в header
2. [ ] Прапорці відображаються коректно
3. [ ] Активна мова виділена (клас `active`)
4. [ ] Клік на прапорець переводить на відповідну мовну версію
5. [ ] URL зберігає поточну сторінку: `/fr/about.html` → `/de/about.html`

## 📝 GIT COMMIT

```bash
git add -A
git commit -m "feat(i18n): add language switcher to all pages

- Added .lang-switcher component to pages missing it
- Updated lang-switcher.js with URL generation logic
- Added CSS styles for switcher component
- Active language is highlighted visually"
```
