# TASK 06: Уніфікація сторінок та створення gallery.html

## DOING
1. Уніфікувати header на всіх внутрішніх сторінках (lang-switcher)
2. Створити gallery.html (зараз 404)
3. Підключити i18n скрипти на всіх сторінках

## EXPECT
- Всі сторінки мають однаковий header з lang-switcher
- gallery.html існує та працює
- i18n працює на всіх сторінках

---

## ЧАСТИНА 1: Уніфікація Header

### Стандартний header для всіх сторінок

```html
<header class="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm">
  <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
    <!-- Logo -->
    <a href="index.html" class="flex items-center gap-2">
      <span class="material-symbols-outlined text-gold text-3xl">music_note</span>
      <span class="text-xl font-serif text-white">Sonate<span class="text-gold">Solidaire</span></span>
    </a>

    <!-- Lang Switcher (після лого) -->
    <div class="lang-switcher flex items-center gap-1 ml-4">
      <a href="?lang=fr" class="lang-flag" data-lang="fr" title="Français">
        <img src="assets/img/flags/fr.svg" alt="FR" class="w-6 h-4 rounded opacity-70 hover:opacity-100 transition-opacity">
      </a>
      <a href="?lang=uk" class="lang-flag" data-lang="uk" title="Українська">
        <img src="assets/img/flags/uk.svg" alt="UK" class="w-6 h-4 rounded opacity-70 hover:opacity-100 transition-opacity">
      </a>
      <a href="?lang=de" class="lang-flag" data-lang="de" title="Deutsch">
        <img src="assets/img/flags/de.svg" alt="DE" class="w-6 h-4 rounded opacity-70 hover:opacity-100 transition-opacity">
      </a>
    </div>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-6">
      <a href="about.html" class="nav-link" data-i18n="nav.founder">Fondateur</a>
      <a href="index.html#manifesto" class="nav-link" data-i18n="nav.manifesto">Manifesto</a>
      <a href="index.html#mission" class="nav-link" data-i18n="nav.mission">Mission</a>
      <a href="gallery.html" class="nav-link" data-i18n="nav.gallery">Galerie</a>
      <a href="contact.html" class="nav-link" data-i18n="nav.contact">Contact</a>
      <a href="partners.html" class="nav-link" data-i18n="nav.partners">Partenaires</a>
      <a href="index.html#don" class="btn btn-gold" data-i18n="nav.support">Soutenir</a>
    </div>

    <!-- Mobile Menu Button -->
    <button class="md:hidden text-white" id="mobile-menu-btn">
      <span class="material-symbols-outlined">menu</span>
    </button>
  </nav>
</header>
```

### Файли для оновлення

```bash
# Сторінки де потрібно оновити header:
about.html
contact.html
partners.html
our-actions.html
gallery.html (створити)
```

---

## ЧАСТИНА 2: Створення gallery.html

### Повний шаблон gallery.html

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-i18n="gallery.meta_title">Galerie — Sonate Solidaire</title>
  <meta name="description" content="Découvrez notre galerie de photos et vidéos" data-i18n-content="gallery.meta_description">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  
  <!-- Styles -->
  <link href="assets/css/tailwind.css" rel="stylesheet">
  <link href="assets/css/main.css" rel="stylesheet">
</head>
<body class="bg-dark text-white">

  <!-- Header (стандартний) -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-2">
        <span class="material-symbols-outlined text-gold text-3xl">music_note</span>
        <span class="text-xl font-serif text-white">Sonate<span class="text-gold">Solidaire</span></span>
      </a>
      
      <div class="lang-switcher flex items-center gap-1 ml-4">
        <a href="?lang=fr" class="lang-flag" data-lang="fr" title="Français">
          <img src="assets/img/flags/fr.svg" alt="FR" class="w-6 h-4 rounded opacity-70 hover:opacity-100">
        </a>
        <a href="?lang=uk" class="lang-flag" data-lang="uk" title="Українська">
          <img src="assets/img/flags/uk.svg" alt="UK" class="w-6 h-4 rounded opacity-70 hover:opacity-100">
        </a>
        <a href="?lang=de" class="lang-flag" data-lang="de" title="Deutsch">
          <img src="assets/img/flags/de.svg" alt="DE" class="w-6 h-4 rounded opacity-70 hover:opacity-100">
        </a>
      </div>

      <div class="hidden md:flex items-center gap-6">
        <a href="about.html" class="nav-link" data-i18n="nav.founder">Fondateur</a>
        <a href="index.html#manifesto" class="nav-link" data-i18n="nav.manifesto">Manifesto</a>
        <a href="index.html#mission" class="nav-link" data-i18n="nav.mission">Mission</a>
        <a href="gallery.html" class="nav-link active" data-i18n="nav.gallery">Galerie</a>
        <a href="contact.html" class="nav-link" data-i18n="nav.contact">Contact</a>
        <a href="partners.html" class="nav-link" data-i18n="nav.partners">Partenaires</a>
        <a href="index.html#don" class="btn btn-gold" data-i18n="nav.support">Soutenir</a>
      </div>

      <button class="md:hidden text-white" id="mobile-menu-btn">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </nav>
  </header>

  <!-- Page Hero -->
  <section class="page-hero pt-32 pb-16 bg-gradient-to-b from-dark to-dark/50">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-5xl font-serif text-gold mb-4" data-i18n="gallery.title">
        Notre Galerie
      </h1>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto" data-i18n="gallery.subtitle">
        Découvrez les moments forts de nos concerts et événements
      </p>
    </div>
  </section>

  <!-- Gallery Grid -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      
      <!-- Filter Tabs -->
      <div class="flex justify-center gap-4 mb-12">
        <button class="gallery-filter active px-6 py-2 rounded-full bg-gold/20 text-gold" data-filter="all" data-i18n="gallery.filter_all">
          Tout
        </button>
        <button class="gallery-filter px-6 py-2 rounded-full hover:bg-gold/10" data-filter="concerts" data-i18n="gallery.filter_concerts">
          Concerts
        </button>
        <button class="gallery-filter px-6 py-2 rounded-full hover:bg-gold/10" data-filter="events" data-i18n="gallery.filter_events">
          Événements
        </button>
        <button class="gallery-filter px-6 py-2 rounded-full hover:bg-gold/10" data-filter="backstage" data-i18n="gallery.filter_backstage">
          Coulisses
        </button>
      </div>

      <!-- Gallery Items -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
        
        <!-- Gallery Item Template -->
        <div class="gallery-item" data-category="concerts">
          <div class="relative group overflow-hidden rounded-lg aspect-video">
            <img src="assets/img/gallery/concert-1.jpg" alt="Concert" class="w-full h-full object-cover transition-transform group-hover:scale-110">
            <div class="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="material-symbols-outlined text-4xl text-gold">zoom_in</span>
            </div>
          </div>
          <p class="mt-3 text-gray-300" data-i18n="gallery.item1_caption">Concert de bienfaisance, Genève 2024</p>
        </div>

        <div class="gallery-item" data-category="concerts">
          <div class="relative group overflow-hidden rounded-lg aspect-video">
            <img src="assets/img/gallery/concert-2.jpg" alt="Concert" class="w-full h-full object-cover transition-transform group-hover:scale-110">
            <div class="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="material-symbols-outlined text-4xl text-gold">zoom_in</span>
            </div>
          </div>
          <p class="mt-3 text-gray-300" data-i18n="gallery.item2_caption">Récital privé, Lausanne 2024</p>
        </div>

        <div class="gallery-item" data-category="events">
          <div class="relative group overflow-hidden rounded-lg aspect-video">
            <img src="assets/img/gallery/event-1.jpg" alt="Événement" class="w-full h-full object-cover transition-transform group-hover:scale-110">
            <div class="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="material-symbols-outlined text-4xl text-gold">zoom_in</span>
            </div>
          </div>
          <p class="mt-3 text-gray-300" data-i18n="gallery.item3_caption">Remise de prix, Zurich 2024</p>
        </div>

        <!-- Placeholder для майбутніх фото -->
        <div class="gallery-item" data-category="backstage">
          <div class="relative group overflow-hidden rounded-lg aspect-video bg-dark-lighter flex items-center justify-center">
            <span class="material-symbols-outlined text-6xl text-gray-600">add_photo_alternate</span>
          </div>
          <p class="mt-3 text-gray-500" data-i18n="gallery.coming_soon">Photos à venir...</p>
        </div>

      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-dark-darker py-12">
    <div class="container mx-auto px-4 text-center text-gray-400">
      <p data-i18n="footer.rights">© 2024 Sonate Solidaire. Tous droits réservés.</p>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="assets/js/main.js"></script>
  <script src="assets/js/i18n-bridge.js"></script>
  <script src="assets/js/lang-switcher.js"></script>
  
  <!-- Gallery Filter Script -->
  <script>
    document.querySelectorAll('.gallery-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active state
        document.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active', 'bg-gold/20', 'text-gold'));
        btn.classList.add('active', 'bg-gold/20', 'text-gold');
        
        // Filter items
        document.querySelectorAll('.gallery-item').forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  </script>
</body>
</html>
```

---

## ЧАСТИНА 3: Додати ключі в JSON

**locales/fr.json** — додати секцію gallery:
```json
{
  "gallery": {
    "meta_title": "Galerie — Sonate Solidaire",
    "meta_description": "Découvrez notre galerie de photos et vidéos des concerts et événements",
    "title": "Notre Galerie",
    "subtitle": "Découvrez les moments forts de nos concerts et événements",
    "filter_all": "Tout",
    "filter_concerts": "Concerts",
    "filter_events": "Événements",
    "filter_backstage": "Coulisses",
    "item1_caption": "Concert de bienfaisance, Genève 2024",
    "item2_caption": "Récital privé, Lausanne 2024",
    "item3_caption": "Remise de prix, Zurich 2024",
    "coming_soon": "Photos à venir..."
  }
}
```

---

## ЧАСТИНА 4: Підключення i18n на всіх сторінках

Перед `</body>` у КОЖНОМУ HTML файлі:

```html
<!-- i18n System -->
<script src="assets/js/i18n-bridge.js"></script>
<script src="assets/js/lang-switcher.js"></script>
```

---

## VERIFICATION

```bash
# 1. gallery.html створений
ls -la gallery.html
# Очікується: файл існує

# 2. i18n підключено на всіх сторінках
for f in index.html about.html contact.html partners.html our-actions.html gallery.html; do
  count=$(grep -c "i18n-bridge.js" $f 2>/dev/null || echo 0)
  echo "$f: $count"
done
# Очікується: всі = 1

# 3. Lang switcher в header на всіх сторінках
for f in index.html about.html contact.html partners.html gallery.html; do
  count=$(grep -c "lang-switcher" $f 2>/dev/null || echo 0)
  echo "$f: $count"
done
# Очікується: всі >= 1
```

---

## RESULT
- [ ] Header уніфіковано на всіх сторінках
- [ ] gallery.html створено
- [ ] Ключі gallery.* додано в JSON
- [ ] i18n-bridge.js підключено на всіх сторінках
- [ ] lang-switcher.js підключено на всіх сторінках
- [ ] Всі сторінки тестовані в браузері

## COMPLETE
Після цього завдання всі критичні проблеми мають бути виправлені!
