# TASK 04: Створення gallery.html

## Проблема
**Файл gallery.html НЕ ІСНУЄ в репозиторії!**

GitHub raw URL повертає 404:
```
https://raw.githubusercontent.com/maxfraieho/violin.pp.ua/master/gallery.html
```

Тому Cloudflare показує fallback на index.html.

---

## Рішення: Створити gallery.html

### Базовий шаблон

```html
<!DOCTYPE html>
<html class="dark scroll-smooth" lang="fr">

<head>
  <title>Galerie | Sonate Solidaire</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Galerie photos et vidéos de Sonate Solidaire - concerts, événements et moments musicaux.">
  
  <!-- CSS (копіювати з index.html) -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
  <link href="/assets/css/main.css" rel="stylesheet">
  
  <style>
    /* Page Hero for internal pages */
    .page-hero {
      padding-top: 140px;
      padding-bottom: 60px;
      text-align: center;
      background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(26,26,26,1));
    }
    
    .page-hero h1 {
      color: #D4AF37;
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin-bottom: 1rem;
    }
    
    .page-hero p {
      color: #a0a0a0;
      max-width: 600px;
      margin: 0 auto;
    }
    
    /* Gallery Grid */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 2rem;
    }
    
    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 0.5rem;
      aspect-ratio: 4/3;
    }
    
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .gallery-item:hover img {
      transform: scale(1.05);
    }
    
    .gallery-item .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .gallery-item:hover .overlay {
      opacity: 1;
    }
  </style>
</head>

<body class="bg-background-dark text-text-dark font-body antialiased">

  <!-- HEADER (скопіювати повністю з index.html включно з lang-switcher) -->
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
          <a href="gallery.html" class="text-primary font-semibold" data-i18n="nav.gallery">Galerie</a>
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
  </nav>

  <!-- PAGE HERO -->
  <section class="page-hero">
    <h1 data-i18n="gallery.title">Galerie</h1>
    <p data-i18n="gallery.subtitle">Moments capturés de nos concerts et événements</p>
  </section>

  <!-- GALLERY GRID -->
  <main class="max-w-7xl mx-auto">
    <div class="gallery-grid">
      
      <div class="gallery-item">
        <img src="/assets/img/gallery/concert-1.jpg" alt="Concert Sonate Solidaire" loading="lazy">
        <div class="overlay">
          <p>Concert de bienfaisance - Nyon 2024</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="/assets/img/gallery/concert-2.jpg" alt="Arsen Kovalenko en concert" loading="lazy">
        <div class="overlay">
          <p>Arsen Kovalenko - Lausanne</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="/assets/img/gallery/workshop-1.jpg" alt="Atelier musical" loading="lazy">
        <div class="overlay">
          <p>Atelier musical pour enfants</p>
        </div>
      </div>
      
      <div class="gallery-item">
        <img src="/assets/img/gallery/event-1.jpg" alt="Événement communautaire" loading="lazy">
        <div class="overlay">
          <p>Rencontre interculturelle</p>
        </div>
      </div>
      
      <!-- Додати більше елементів за потреби -->
      
    </div>
  </main>

  <!-- FOOTER (скопіювати з index.html) -->
  <footer class="bg-surface-dark border-t border-primary/20 py-12 mt-16">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <p class="text-subtext-dark" data-i18n="footer.copyright">© 2024 Sonate Solidaire. Tous droits réservés.</p>
    </div>
  </footer>

  <!-- Scripts -->
  <script type="module" src="/assets/js/main.js"></script>
  <script src="/assets/js/modules/lang-switcher.js"></script>
</body>
</html>
```

---

## Важливо

1. **Скопіювати повний header з index.html** включно з lang-switcher
2. **Скопіювати footer з index.html**
3. **Додати реальні зображення** в `/assets/img/gallery/`
4. **Локалізація**: Додати ключі `gallery.title`, `gallery.subtitle` в JSON файли

---

## JSON ключі для локалізації

**Додати в locales/fr.json:**
```json
"gallery": {
  "title": "Galerie",
  "subtitle": "Moments capturés de nos concerts et événements"
}
```

**Додати в locales/uk.json:**
```json
"gallery": {
  "title": "Галерея",
  "subtitle": "Моменти наших концертів та подій"
}
```

**Додати в locales/de.json:**
```json
"gallery": {
  "title": "Galerie",
  "subtitle": "Momente unserer Konzerte und Veranstaltungen"
}
```

---

## Чекліст

- [ ] Створено файл gallery.html
- [ ] Скопійовано header з lang-switcher
- [ ] Скопійовано footer
- [ ] Додано page-hero секцію
- [ ] Додано gallery-grid
- [ ] Додано локалізаційні ключі в JSON
- [ ] Перевірено що сторінка відкривається
