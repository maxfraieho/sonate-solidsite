# TASK 05: Виправлення внутрішніх сторінок

## Проблеми

1. **partners.html** - заголовок обрізано зверху
2. **partners.html** - немає прапорів мов в header
3. **contact.html** - можливо теж немає прапорів

---

## partners.html

### Проблема 1: Заголовок обрізано

CSS вже має `padding-top: 140px`, але можливо не застосовується.

**Перевірити HTML структуру:**
```html
<section class="page-hero">
  <h1>Nos Partenaires</h1>
  ...
</section>
```

**Переконатись що клас page-hero є і CSS застосований:**
```css
.page-hero {
  padding-top: 140px;  /* Для header offset */
  padding-bottom: 60px;
  text-align: center;
}

@media (max-width: 768px) {
  .page-hero {
    padding-top: 100px;
  }
}
```

### Проблема 2: Немає lang-switcher

**Поточний header в partners.html (перевірити ~рядки 200-250):**
Може бути спрощений header БЕЗ lang-switcher.

**Рішення:** Замінити header на ПОВНУ копію з index.html.

---

## Єдиний Header Template

Всі сторінки повинні мати ІДЕНТИЧНИЙ header:

```html
<nav class="fixed w-full z-50 bg-background-dark/90 backdrop-blur-md border-b border-primary/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      
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
        
        <!-- Language Switcher -->
        <div id="lang-switcher" class="lang-switcher ml-4" role="navigation" aria-label="Language switcher">
          <a class="lang-btn" href="?lang=fr" data-lang="fr" hreflang="fr" title="Français">
            <img class="flag" src="/assets/img/flags/fr.svg" alt="Français" width="24" height="18">
          </a>
          <a class="lang-btn" href="?lang=uk" data-lang="uk" hreflang="uk" title="Українська">
            <img class="flag" src="/assets/img/flags/uk.svg" alt="Українська" width="24" height="18">
          </a>
          <a class="lang-btn" href="?lang=de" data-lang="de" hreflang="de" title="Deutsch">
            <img class="flag" src="/assets/img/flags/de.svg" alt="Deutsch" width="24" height="18">
          </a>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <a href="index.html#fondateur" class="text-text-dark hover:text-primary transition-colors" data-i18n="nav.founder">Fondateur</a>
        <a href="index.html#manifeste" class="text-text-dark hover:text-primary transition-colors" data-i18n="nav.manifesto">Manifesto</a>
        <a href="our-actions.html" class="text-text-dark hover:text-primary transition-colors" data-i18n="nav.mission">Mission</a>
        <a href="index.html#portfolio" class="text-text-dark hover:text-primary transition-colors" data-i18n="nav.portfolio">Portfolio</a>
        <a href="gallery.html" class="text-text-dark hover:text-primary transition-colors" data-i18n="nav.gallery">Galerie</a>
        <a href="contact.html" class="text-text-dark hover:text-primary transition-colors" data-i18n="nav.contact">Contact</a>
        <a href="partners.html" class="text-text-dark hover:text-primary transition-colors" data-i18n="nav.partners">Partenaires</a>
        <a href="#soutenir" class="bg-primary hover:bg-primary-hover text-background-dark px-6 py-2 rounded-full font-semibold transition-all" data-i18n="nav.support">Soutenir</a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="mobile-menu-button" class="md:hidden text-text-dark">
        <span class="material-symbols-outlined text-3xl">menu</span>
      </button>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden md:hidden bg-surface-dark border-t border-primary/20">
    <div class="px-4 py-4 space-y-3">
      <a href="index.html#fondateur" class="block text-text-dark hover:text-primary py-2" data-i18n="nav.founder">Fondateur</a>
      <a href="index.html#manifeste" class="block text-text-dark hover:text-primary py-2" data-i18n="nav.manifesto">Manifesto</a>
      <a href="our-actions.html" class="block text-text-dark hover:text-primary py-2" data-i18n="nav.mission">Mission</a>
      <a href="index.html#portfolio" class="block text-text-dark hover:text-primary py-2" data-i18n="nav.portfolio">Portfolio</a>
      <a href="gallery.html" class="block text-text-dark hover:text-primary py-2" data-i18n="nav.gallery">Galerie</a>
      <a href="contact.html" class="block text-text-dark hover:text-primary py-2" data-i18n="nav.contact">Contact</a>
      <a href="partners.html" class="block text-text-dark hover:text-primary py-2" data-i18n="nav.partners">Partenaires</a>
      <a href="#soutenir" class="block bg-primary text-background-dark px-6 py-3 rounded-full font-semibold text-center" data-i18n="nav.support">Soutenir</a>
      
      <!-- Mobile Language Switcher -->
      <div class="flex items-center justify-center gap-3 pt-2 border-t border-primary/20 mt-3">
        <a class="lang-btn-mobile" href="?lang=fr" data-lang="fr" title="Français">
          <img class="flag-mobile" src="/assets/img/flags/fr.svg" alt="Français" width="24" height="18">
        </a>
        <a class="lang-btn-mobile" href="?lang=uk" data-lang="uk" title="Українська">
          <img class="flag-mobile" src="/assets/img/flags/uk.svg" alt="Українська" width="24" height="18">
        </a>
        <a class="lang-btn-mobile" href="?lang=de" data-lang="de" title="Deutsch">
          <img class="flag-mobile" src="/assets/img/flags/de.svg" alt="Deutsch" width="24" height="18">
        </a>
      </div>
    </div>
  </div>
</nav>
```

---

## Файли для оновлення

1. **partners.html** - замінити header + перевірити page-hero padding
2. **contact.html** - замінити header + перевірити page-hero padding
3. **about.html** - замінити header (якщо існує)
4. **our-actions.html** - замінити header (якщо існує)

---

## CSS для page-hero (якщо немає)

```css
/* Internal pages hero section */
.page-hero {
  padding-top: 140px;
  padding-bottom: 60px;
  text-align: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), var(--bg-dark));
}

.page-hero h1 {
  color: var(--gold);
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
}

.page-hero p {
  color: #a0a0a0;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .page-hero {
    padding-top: 100px;
    padding-bottom: 40px;
  }
}
```

---

## Верифікація

```bash
# 1. Перевірити lang-switcher на partners.html
grep -c "lang-switcher" partners.html  # має бути >= 1

# 2. Перевірити page-hero padding
grep "padding-top: 140px" partners.html  # має знайти

# 3. Візуальна перевірка
# Відкрити https://violin.pp.ua/partners.html
# - Заголовок НЕ обрізаний
# - Прапори мов є в header
```

---

## Чекліст

- [ ] partners.html має повний header з lang-switcher
- [ ] partners.html page-hero має padding-top: 140px
- [ ] contact.html має повний header з lang-switcher
- [ ] Всі внутрішні сторінки мають однаковий header
- [ ] Заголовки не обрізані на жодній сторінці
