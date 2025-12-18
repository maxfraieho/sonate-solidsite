# TASK 02: Створення повного i18n движка

## DOING
Створити/оновити i18n-bridge.js та lang-switcher.js для динамічного завантаження перекладів.

## EXPECT
- i18n-bridge.js завантажує JSON та застосовує до [data-i18n]
- lang-switcher.js перемикає мови через ?lang= параметр
- Активний прапор підсвічується
- Мова зберігається в localStorage

---

## IMPLEMENTATION

### Крок 1: Створити/оновити assets/js/i18n-bridge.js

```javascript
/**
 * i18n-bridge.js — Dynamic Translation Engine
 * Завантажує переклади з /locales/*.json та застосовує до DOM
 */

const I18N = {
  SUPPORTED_LANGUAGES: ['fr', 'uk', 'de'],
  DEFAULT_LANGUAGE: 'fr',
  CACHE_KEY: 'violin_lang',
  translations: {},
  currentLang: null,

  /**
   * Ініціалізація i18n системи
   */
  async init() {
    this.currentLang = this.detectLanguage();
    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.updateActiveFlag();
    this.setupLangSwitcher();
    
    console.log(`[i18n] Initialized with language: ${this.currentLang}`);
  },

  /**
   * Визначення мови (пріоритет: URL → localStorage → default)
   */
  detectLanguage() {
    // 1. URL параметр ?lang=
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && this.SUPPORTED_LANGUAGES.includes(langParam)) {
      localStorage.setItem(this.CACHE_KEY, langParam);
      return langParam;
    }

    // 2. localStorage
    const cached = localStorage.getItem(this.CACHE_KEY);
    if (cached && this.SUPPORTED_LANGUAGES.includes(cached)) {
      return cached;
    }

    // 3. Browser language
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang && this.SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }

    // 4. Default
    return this.DEFAULT_LANGUAGE;
  },

  /**
   * Завантаження JSON перекладів
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`/locales/${lang}.json?v=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      this.translations = await response.json();
      console.log(`[i18n] Loaded translations for: ${lang}`);
    } catch (error) {
      console.error(`[i18n] Failed to load ${lang}.json:`, error);
      // Fallback to French
      if (lang !== this.DEFAULT_LANGUAGE) {
        console.log(`[i18n] Falling back to ${this.DEFAULT_LANGUAGE}`);
        await this.loadTranslations(this.DEFAULT_LANGUAGE);
      }
    }
  },

  /**
   * Отримання перекладу за ключем (підтримує вкладені ключі)
   */
  t(key) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`[i18n] Missing key: ${key}`);
        return key; // Повертаємо ключ якщо переклад не знайдено
      }
    }
    
    return value;
  },

  /**
   * Застосування перекладів до DOM
   */
  applyTranslations() {
    // data-i18n — текстовий контент
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });

    // data-i18n-placeholder — плейсхолдери інпутів
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.placeholder = translation;
      }
    });

    // data-i18n-aria — aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.setAttribute('aria-label', translation);
      }
    });

    // data-i18n-title — title атрибут
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.title = translation;
      }
    });

    // Оновити lang атрибут html
    document.documentElement.lang = this.currentLang;
    
    console.log(`[i18n] Applied translations to DOM`);
  },

  /**
   * Підсвітка активного прапора
   */
  updateActiveFlag() {
    document.querySelectorAll('.lang-flag').forEach(flag => {
      const flagLang = flag.getAttribute('data-lang');
      if (flagLang === this.currentLang) {
        flag.classList.add('active', 'ring-2', 'ring-gold');
      } else {
        flag.classList.remove('active', 'ring-2', 'ring-gold');
      }
    });
  },

  /**
   * Налаштування обробників для перемикання мов
   */
  setupLangSwitcher() {
    document.querySelectorAll('.lang-flag').forEach(flag => {
      flag.addEventListener('click', (e) => {
        e.preventDefault();
        const newLang = flag.getAttribute('data-lang');
        if (newLang && newLang !== this.currentLang) {
          this.switchLanguage(newLang);
        }
      });
    });
  },

  /**
   * Перемикання мови
   */
  async switchLanguage(lang) {
    if (!this.SUPPORTED_LANGUAGES.includes(lang)) {
      console.warn(`[i18n] Unsupported language: ${lang}`);
      return;
    }

    localStorage.setItem(this.CACHE_KEY, lang);
    this.currentLang = lang;

    // Оновити URL без перезавантаження
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    // Завантажити нові переклади
    await this.loadTranslations(lang);
    this.applyTranslations();
    this.updateActiveFlag();

    // Dispatch event для інших скриптів
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
};

// Глобальна функція для JS модулів
window.i18n = {
  t: (key) => I18N.t(key),
  currentLang: () => I18N.currentLang,
  switchLanguage: (lang) => I18N.switchLanguage(lang)
};

// Автоматична ініціалізація
document.addEventListener('DOMContentLoaded', () => I18N.init());
```

### Крок 2: Створити/оновити assets/js/lang-switcher.js

```javascript
/**
 * lang-switcher.js — Language Switcher UI
 * Управління UI елементами перемикача мов
 */

const LangSwitcher = {
  init() {
    this.updateLinks();
    this.addKeyboardSupport();
  },

  /**
   * Оновити href посилань прапорів (для no-JS fallback)
   */
  updateLinks() {
    const currentPage = window.location.pathname;
    
    document.querySelectorAll('.lang-flag').forEach(flag => {
      const lang = flag.getAttribute('data-lang');
      if (lang) {
        // Встановити href з ?lang= параметром
        flag.href = `${currentPage}?lang=${lang}`;
      }
    });
  },

  /**
   * Підтримка клавіатури
   */
  addKeyboardSupport() {
    document.querySelectorAll('.lang-flag').forEach(flag => {
      flag.setAttribute('role', 'button');
      flag.setAttribute('tabindex', '0');
      
      flag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flag.click();
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => LangSwitcher.init());
```

### Крок 3: Підключити скрипти в HTML

Додати перед `</body>` у ВСІХ HTML файлах:

```html
<!-- i18n System -->
<script src="assets/js/i18n-bridge.js"></script>
<script src="assets/js/lang-switcher.js"></script>
```

### Крок 4: Оновити HTML для прапорів

```html
<!-- Lang Switcher (після лого в header) -->
<div class="lang-switcher flex items-center gap-1">
  <a href="?lang=fr" class="lang-flag" data-lang="fr" title="Français">
    <img src="assets/img/flags/fr.svg" alt="FR" class="w-6 h-4 rounded">
  </a>
  <a href="?lang=uk" class="lang-flag" data-lang="uk" title="Українська">
    <img src="assets/img/flags/uk.svg" alt="UK" class="w-6 h-4 rounded">
  </a>
  <a href="?lang=de" class="lang-flag" data-lang="de" title="Deutsch">
    <img src="assets/img/flags/de.svg" alt="DE" class="w-6 h-4 rounded">
  </a>
</div>
```

### Крок 5: Додати CSS для активного прапора

```css
/* В assets/css/main.css або tailwind.css */
.lang-flag {
  transition: all 0.2s ease;
  opacity: 0.7;
}

.lang-flag:hover,
.lang-flag.active {
  opacity: 1;
}

.lang-flag.active {
  box-shadow: 0 0 0 2px var(--gold, #D4AF37);
  border-radius: 4px;
}
```

---

## VERIFICATION

```bash
# Перевірити що файли створені
ls -la assets/js/i18n-bridge.js assets/js/lang-switcher.js

# Перевірити що скрипти підключені в index.html
grep -c "i18n-bridge.js" index.html
# Очікується: 1

# Перевірити console в браузері
# Очікується: [i18n] Initialized with language: fr
```

## RESULT
- [ ] assets/js/i18n-bridge.js створений/оновлений
- [ ] assets/js/lang-switcher.js створений/оновлений
- [ ] Скрипти підключені в index.html
- [ ] Скрипти підключені в about.html
- [ ] Скрипти підключені в contact.html
- [ ] Скрипти підключені в partners.html
- [ ] Скрипти підключені в our-actions.html
- [ ] CSS для активного прапора додано

## NEXT TASK
→ TASK_03_FIX_DATA_I18N.md
