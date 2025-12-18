# TASK 05: CSS та Layout — Фінальні виправлення

## Проблема 1: Hero Logo позиція

За вимогами: логотип Sonate Solidaire в hero має бути ПІД кнопками, не над ними.

### Поточна структура (НЕПРАВИЛЬНА)
```
[Logo Sonate Solidaire]  ← зверху
[Headline]
[Subtitle]  
[Buttons]
```

### Потрібна структура (ПРАВИЛЬНА)
```
[Headline]
[Subtitle]
[Buttons]
[Logo Sonate Solidaire]  ← знизу
```

### CSS рішення
```css
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-logo {
  order: 4;  /* Останній елемент */
  margin-top: 2rem;
}

.hero-headline { order: 1; }
.hero-subtitle { order: 2; }
.hero-buttons { order: 3; }
```

Або перемістити в HTML:
```html
<section class="hero">
  <h1 class="hero-headline">L'Intégration par la Musique</h1>
  <p class="hero-subtitle">Sonate Solidaire • Harmoniser...</p>
  <div class="hero-buttons">
    <a href="#don" data-i18n="hero.cta_support">Soutenir</a>
    <a href="/about.html" data-i18n="hero.cta_founder">Fondateur</a>
  </div>
  <img src="/assets/img/logo-sonate.png" alt="Logo" class="hero-logo">
</section>
```

---

## Проблема 2: Audio Player іконки

### Поточний стан
Кнопки показують текст: `prev`, `play`, `next`, `mute`

### Рішення
```html
<div class="audio-player">
  <button class="player-btn prev">
    <span class="material-symbols-outlined">skip_previous</span>
  </button>
  <button class="player-btn play-pause">
    <span class="material-symbols-outlined">play_arrow</span>
  </button>
  <button class="player-btn next">
    <span class="material-symbols-outlined">skip_next</span>
  </button>
  <button class="player-btn mute">
    <span class="material-symbols-outlined">volume_up</span>
  </button>
  <input type="range" class="volume-slider" min="0" max="100" value="80">
</div>
```

### CSS для volume slider (золотий)
```css
.volume-slider {
  -webkit-appearance: none;
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #D4AF37 0%, #D4AF37 80%, #333 80%, #333 100%);
  border-radius: 2px;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #D4AF37;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #D4AF37;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
```

---

## Проблема 3: Bank Transfer — видалити <br>

### Знайти
```bash
grep -n "IBAN\|Virement" index.html
```

### Виправити
```html
<!-- БУЛО -->
<p>Contactez-nous pour l'IBAN complet<br></p>

<!-- СТАЛО -->
<p>Contactez-nous pour l'IBAN complet</p>
```

---

## Проблема 4: Gold Color Consistency

### Визначити змінну
```css
:root {
  --gold: #D4AF37;
  --gold-light: #E5C158;
  --gold-dark: #B8960C;
}
```

### Застосувати всюди
```css
.btn-cta { background-color: var(--gold); }
.hero-subtitle { color: var(--gold); }
.lang-flag.active { border-color: var(--gold); }
.volume-slider::-webkit-slider-thumb { background: var(--gold); }
.page-hero h1 { color: var(--gold); }
.card-icon { color: var(--gold); }
```

---

## Проблема 5: Gallery layout shift

### CSS fix
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  min-height: 200px;  /* Запобігає layout shift */
  position: relative;
  overflow: hidden;
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
```

### JavaScript — ініціалізація після завантаження
```javascript
// gallery.js
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.gallery-item img');
  let loaded = 0;
  
  images.forEach(img => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === images.length) {
          document.body.classList.add('gallery-ready');
        }
      });
    }
  });
});
```

---

## Повний CSS блок для додавання

```css
/* ========================================
   VIOLIN.PP.UA - Layout Fixes
   ======================================== */

:root {
  --gold: #D4AF37;
  --gold-light: #E5C158;
  --gold-dark: #B8960C;
  --bg-dark: #1a1a1a;
  --text-light: #f5f5f5;
}

/* Header */
.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lang-switcher {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.lang-flag {
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s;
}

.lang-flag.active,
.lang-flag:hover {
  border-bottom-color: var(--gold);
}

/* Page Hero (внутрішні сторінки) */
.page-hero {
  padding-top: 140px;
  padding-bottom: 60px;
  text-align: center;
}

.page-hero h1 {
  color: var(--gold);
  font-size: clamp(2rem, 5vw, 3.5rem);
}

/* Audio Player */
.audio-player .player-btn {
  background: transparent;
  border: none;
  color: var(--gold);
  cursor: pointer;
  padding: 0.5rem;
}

.volume-slider {
  -webkit-appearance: none;
  width: 80px;
  height: 4px;
  background: #333;
  border-radius: 2px;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: var(--gold);
  border-radius: 50%;
  cursor: pointer;
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  min-height: 200px;
  overflow: hidden;
  border-radius: 8px;
}

/* Mobile */
@media (max-width: 768px) {
  .lang-switcher {
    flex-direction: row;
    gap: 0.5rem;
  }
  
  .page-hero {
    padding-top: 100px;
  }
}
```

---

## Файли для модифікації

```
/assets/css/main.css
/index.html (hero structure)
/assets/js/modules/player.js (icons)
/assets/js/modules/gallery.js
```

---

## Фінальний чекліст

- [ ] Hero logo під кнопками
- [ ] Audio player з іконками
- [ ] Volume slider золотий
- [ ] Немає <br> в bank transfer
- [ ] Gold color єдиний (#D4AF37)
- [ ] Gallery без layout shift
- [ ] Page hero padding достатній
- [ ] Mobile responsive працює
