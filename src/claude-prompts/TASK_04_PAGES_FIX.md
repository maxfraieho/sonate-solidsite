# TASK 04: Виправлення сторінок (Gallery, Partners, Contact)

## Проблема 1: Gallery показує контент Index

### Діагностика
```
DOING: Перевіряю gallery.html на наявність правильного контенту
EXPECT: Знайду галерею зображень
IF YES: Проблема в іншому
IF NO: Файл містить копію index.html
```

Команда:
```bash
head -50 gallery.html
```

### Рішення
Gallery.html має містити:
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galerie | Sonate Solidaire</title>
  <link href="/assets/css/main.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
</head>
<body>
  <!-- Header (копіюється з index.html) -->
  <header>...</header>
  
  <!-- Gallery Hero -->
  <section class="page-hero">
    <h1 data-i18n="gallery.title">Notre Galerie</h1>
    <p data-i18n="gallery.subtitle">Moments capturés de nos événements</p>
  </section>
  
  <!-- Gallery Grid -->
  <section class="gallery-section">
    <div class="gallery-grid">
      <div class="gallery-item">
        <img src="/assets/img/gallery/concert-1.jpg" alt="Concert" loading="lazy">
        <div class="gallery-caption" data-i18n="gallery.caption_concert">Concert de charité</div>
      </div>
      <!-- ... more items -->
    </div>
  </section>
  
  <!-- Footer -->
  <footer>...</footer>
  
  <script src="/assets/js/main.js"></script>
</body>
</html>
```

---

## Проблема 2: Partners — заголовок обрізаний

### Діагностика
Заголовок "Nos Partenaires" частково прихований за header.

### Рішення CSS
Додати до `/assets/css/main.css`:

```css
/* === Page Hero Section (внутрішні сторінки) === */
.page-hero {
  padding-top: 120px;  /* Місце для fixed header */
  padding-bottom: 60px;
  text-align: center;
}

.page-hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #D4AF37;
  margin-bottom: 1rem;
}

/* Специфічно для partners */
.partners-page .page-hero,
body.partners .page-hero {
  padding-top: 140px;
}

/* Contact page */
.contact-page .page-hero {
  padding-top: 140px;
}
```

### Альтернатива: inline padding
```html
<section class="page-hero" style="padding-top: 140px;">
  <h1>Nos Partenaires</h1>
</section>
```

---

## Проблема 3: Partners — немає прапорців

### Діагностика
```
DOING: Перевіряю header в partners.html
EXPECT: Знайду lang-switcher
IF YES: Проблема в CSS
IF NO: Скопіювати header з index.html
```

### Рішення
Кожна сторінка (partners.html, contact.html, about.html, gallery.html) має мати ІДЕНТИЧНИЙ header:

```html
<header class="main-header">
  <div class="header-left">
    <a href="/" class="logo">
      <span class="material-symbols-outlined">music_note</span>
      <span class="logo-text">Sonate<br>Solidaire</span>
    </a>
    <div class="lang-switcher">
      <a href="/" class="lang-flag"><img src="/assets/img/flag-fr.png" alt="FR"></a>
      <a href="/uk/" class="lang-flag"><img src="/assets/img/flag-ua.png" alt="UA"></a>
      <a href="/de/" class="lang-flag"><img src="/assets/img/flag-de.png" alt="DE"></a>
    </div>
  </div>
  <nav class="main-nav">
    <a href="/about.html" data-i18n="nav.founder">Fondateur</a>
    <a href="/#manifesto" data-i18n="nav.manifesto">Manifesto</a>
    <a href="/mission.html" data-i18n="nav.mission">Mission</a>
    <a href="/portfolio.html" data-i18n="nav.portfolio">Portfolio</a>
    <a href="/gallery.html" data-i18n="nav.gallery">Galerie</a>
    <a href="/contact.html" data-i18n="nav.contact">Contact</a>
    <a href="/partners.html" data-i18n="nav.partners">Partenaires</a>
    <a href="/#don" class="btn-cta" data-i18n="nav.support">Soutenir</a>
  </nav>
</header>
```

---

## Проблема 4: Contact page локалізація

### Перевірити
```bash
grep -n "data-i18n" contact.html | head -20
```

### Потрібні ключі
```html
<h1 data-i18n="contact.title">Contactez-nous</h1>
<label data-i18n="contact.name">Nom complet</label>
<label data-i18n="contact.email">Email</label>
<label data-i18n="contact.message">Message</label>
<button data-i18n="contact.submit">Envoyer</button>
```

---

## Крок-за-кроком

1. **Gallery.html** — Замінити контент на правильну галерею
2. **Partners.html** — Додати padding-top: 140px для .page-hero
3. **Partners.html** — Додати lang-switcher в header
4. **Contact.html** — Додати padding та data-i18n атрибути
5. **About.html** — Перевірити та виправити аналогічно

---

## Файли для модифікації

```
/gallery.html
/partners.html
/contact.html
/about.html
/mission.html
/fr/gallery.html, /uk/gallery.html, /de/gallery.html
/fr/partners.html, /uk/partners.html, /de/partners.html
# ... всі мовні версії
/assets/css/main.css
```

---

## Чекліст

- [ ] Gallery показує галерею (не index)
- [ ] Partners заголовок повністю видимий
- [ ] Lang switcher є на всіх сторінках
- [ ] Contact форма локалізована
- [ ] About сторінка працює
- [ ] Всі внутрішні сторінки мають однаковий header
