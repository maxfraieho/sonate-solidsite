# TASK 01: Створити робочий i18n Engine

## 🎯 МЕТА
Створити повнофункціональний `i18n-engine.js` який:
1. Визначає мову з URL шляху (`/de/`, `/uk/`, `/fr/`)
2. Завантажує відповідний JSON з `locales/`
3. Застосовує переклади до всіх `[data-i18n]` елементів
4. Експортує глобальний `i18n.t()` для JS-модулів

## 📋 REASONING PROTOCOL

```
DOING: Creating i18n-engine.js with full translation loading
EXPECT: File assets/js/i18n-engine.js exists and exports i18n object
IF YES: Verify it loads JSON and applies translations
IF NO: Check syntax errors, file path
RESULT: Engine loads translations from /locales/*.json
MATCHES: All [data-i18n] elements show translated text
THEREFORE: i18n system is functional
```

## 📁 ФАЙЛ: assets/js/i18n-engine.js

```javascript
/**
 * i18n Engine for violin.pp.ua
 * Loads JSON translations and applies them to DOM
 * 
 * @author Claude CLI
 * @version 2.0.0
 */

(function(global) {
  'use strict';

  const CONFIG = {
    defaultLang: 'fr',
    supportedLangs: ['fr', 'de', 'uk'],
    localesPath: '/locales/',
    storageKey: 'violin_lang'
  };

  let translations = {};
  let currentLang = CONFIG.defaultLang;

  /**
   * Detect language from URL path
   * /de/about.html → 'de'
   * /uk/index.html → 'uk'
   * /fr/contact.html → 'fr'
   */
  function detectLanguageFromPath() {
    const path = window.location.pathname;
    
    for (const lang of CONFIG.supportedLangs) {
      if (path.startsWith(`/${lang}/`) || path === `/${lang}`) {
        return lang;
      }
    }
    
    // Check localStorage fallback
    const stored = localStorage.getItem(CONFIG.storageKey);
    if (stored && CONFIG.supportedLangs.includes(stored)) {
      return stored;
    }
    
    return CONFIG.defaultLang;
  }

  /**
   * Load JSON translation file
   * @param {string} lang - Language code (fr, de, uk)
   * @returns {Promise<Object>} Translation object
   */
  async function loadTranslations(lang) {
    const url = `${CONFIG.localesPath}${lang}.json`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${url}`);
      }
      const data = await response.json();
      console.log(`[i18n] Loaded ${lang}.json (${Object.keys(data).length} keys)`);
      return data;
    } catch (error) {
      console.error(`[i18n] Failed to load ${url}:`, error);
      return {};
    }
  }

  /**
   * Get nested value from object by dot-notation key
   * @param {Object} obj - Translation object
   * @param {string} key - Dot-notation key (e.g., "hero.title")
   * @returns {string|undefined}
   */
  function getNestedValue(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
  }

  /**
   * Translate a key
   * @param {string} key - Translation key (e.g., "hero.title")
   * @param {Object} params - Optional interpolation params
   * @returns {string} Translated string or key if not found
   */
  function t(key, params = {}) {
    let value = getNestedValue(translations, key);
    
    if (value === undefined) {
      console.warn(`[i18n] Missing key: ${key}`);
      return key;
    }
    
    // Interpolate {param} placeholders
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(new RegExp(`{${k}}`, 'g'), v);
      });
    }
    
    return value;
  }

  /**
   * Apply translations to all DOM elements with data-i18n attributes
   */
  function applyTranslations() {
    // data-i18n → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated !== key) {
        el.textContent = translated;
      }
    });

    // data-i18n-placeholder → placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translated = t(key);
      if (translated !== key) {
        el.setAttribute('placeholder', translated);
      }
    });

    // data-i18n-aria → aria-label attribute
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const translated = t(key);
      if (translated !== key) {
        el.setAttribute('aria-label', translated);
      }
    });

    // data-i18n-title → title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translated = t(key);
      if (translated !== key) {
        el.setAttribute('title', translated);
      }
    });

    // data-i18n-alt → alt attribute
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const translated = t(key);
      if (translated !== key) {
        el.setAttribute('alt', translated);
      }
    });

    // Update lang attribute on <html>
    document.documentElement.lang = currentLang;
    
    console.log(`[i18n] Applied translations for: ${currentLang}`);
  }

  /**
   * Initialize i18n system
   */
  async function init() {
    currentLang = detectLanguageFromPath();
    localStorage.setItem(CONFIG.storageKey, currentLang);
    
    translations = await loadTranslations(currentLang);
    
    // Apply translations when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyTranslations);
    } else {
      applyTranslations();
    }
    
    console.log(`[i18n] Initialized with language: ${currentLang}`);
  }

  /**
   * Change language and reload translations
   * @param {string} lang - New language code
   */
  async function setLanguage(lang) {
    if (!CONFIG.supportedLangs.includes(lang)) {
      console.error(`[i18n] Unsupported language: ${lang}`);
      return;
    }
    
    currentLang = lang;
    localStorage.setItem(CONFIG.storageKey, lang);
    translations = await loadTranslations(lang);
    applyTranslations();
  }

  /**
   * Get current language
   * @returns {string}
   */
  function getCurrentLanguage() {
    return currentLang;
  }

  // Export global i18n object
  global.i18n = {
    t,
    init,
    setLanguage,
    getCurrentLanguage,
    applyTranslations
  };

  // Auto-initialize
  init();

})(typeof window !== 'undefined' ? window : this);
```

## 🔧 КОМАНДИ ВИКОНАННЯ

```bash
# Skill hint: /systematic-debugging, /frontend-design

# 1. Backup існуючого файлу
cp assets/js/i18n-bridge.js assets/js/i18n-bridge.js.backup-$(date +%Y%m%d-%H%M%S)

# 2. Створити новий i18n-engine.js
cat > assets/js/i18n-engine.js << 'JSEOF'
# [ВСТАВИТИ КОД ВИЩЕ]
JSEOF

# 3. Верифікація
echo "=== Verification ==="
head -20 assets/js/i18n-engine.js
wc -l assets/js/i18n-engine.js
```

## ✅ КРИТЕРІЇ УСПІХУ

1. [ ] Файл `assets/js/i18n-engine.js` створено
2. [ ] Файл експортує `window.i18n` об'єкт
3. [ ] Функція `i18n.t("hero.title")` повертає переклад
4. [ ] Автоматична ініціалізація при завантаженні
5. [ ] Визначення мови з URL шляху працює

## 📝 GIT COMMIT

```bash
git add assets/js/i18n-engine.js
git commit -m "feat(i18n): create working i18n-engine.js with JSON translation loading

- Detect language from URL path (/de/, /uk/, /fr/)
- Load translations from /locales/*.json
- Apply to [data-i18n], [data-i18n-placeholder], etc.
- Export global i18n.t() function
- Auto-initialize on page load"
```
