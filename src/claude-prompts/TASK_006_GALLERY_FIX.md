# TASK 006: Fix Gallery Rendering

## Skills: `frontend-design`, `systematic-debugging`, `verification-before-completion`

## Priority: MEDIUM

## Problems
1. Gallery layout jumps during image loading
2. Captions may not update when language changes
3. Layout shift causes poor UX

---

## Explicit Reasoning Protocol

Before modifications:
```
DOING: [action]
EXPECT: [outcome]
IF YES: [proceed]
IF NO: [stop, diagnose, report to Q]
```

---

## Required Changes

### Step 1: Locate Gallery Section

```
DOING: Find gallery section in index.html
EXPECT: Section with id="galerie" or class containing "gallery"
```

```bash
grep -n "gallery\|galerie" index.html
```

### Step 2: Add CSS to Prevent Layout Shift

```
DOING: Add gallery CSS to main.css
EXPECT: Fixed aspect ratios, loading placeholders, smooth transitions
```

Add to main.css:

```css
/* Gallery Container - Prevent layout shift */
.gallery-masonry {
  min-height: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .gallery-masonry {
    min-height: 400px;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery-masonry {
    min-height: 500px;
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Gallery Item - Fixed aspect ratio */
.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.gallery-item img.loaded {
  opacity: 1;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

/* Gallery Caption */
.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  font-size: 0.875rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-caption {
  transform: translateY(0);
}

/* Loading placeholder shimmer */
.gallery-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.gallery-item.loaded::before {
  display: none;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Step 3: Update JavaScript for Image Loading

```
DOING: Add gallery initialization JS
EXPECT: Images fade in when loaded, placeholders removed
```

Add to gallery.js or main.js:

```javascript
// Gallery initialization
document.addEventListener('DOMContentLoaded', function() {
  initGallery();
});

function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    
    if (img) {
      // Check if already loaded (cached)
      if (img.complete && img.naturalHeight !== 0) {
        item.classList.add('loaded');
        img.classList.add('loaded');
      } else {
        // Wait for image to load
        img.addEventListener('load', function() {
          item.classList.add('loaded');
          img.classList.add('loaded');
        });
        
        // Handle error
        img.addEventListener('error', function() {
          item.classList.add('loaded');
          item.classList.add('error');
          console.warn('Gallery image failed to load:', img.src);
        });
      }
    }
  });
}

// Update captions when language changes
window.addEventListener('i18n-changed', function(e) {
  updateGalleryCaptions();
});

function updateGalleryCaptions() {
  const captions = document.querySelectorAll('.gallery-caption[data-i18n]');
  
  captions.forEach(caption => {
    const key = caption.getAttribute('data-i18n');
    if (key && window.getTranslation) {
      const translation = window.getTranslation(key);
      if (translation && translation !== key) {
        caption.textContent = translation;
      }
    }
  });
}
```

### Step 4: Verify HTML Structure

Ensure gallery items follow this structure:

```html
<section id="galerie" class="py-16 bg-background-dark">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-display font-bold text-primary mb-4" 
          data-i18n="gallery.title">Galerie Photos</h2>
      <p class="text-lg text-subtext-dark" 
         data-i18n="gallery.description">Moments capturés lors de nos concerts</p>
    </div>
    
    <div class="gallery-masonry">
      <!-- Gallery Item -->
      <div class="gallery-item">
        <img src="/assets/img/gallery/photo-1.jpg" 
             alt="Concert description"
             data-i18n-attr="alt:gallery.photo_1_alt"
             loading="lazy">
        <div class="gallery-caption" data-i18n="gallery.photo_1_caption">
          Arsen Kovalenko en concert
        </div>
      </div>
      
      <!-- More items... -->
    </div>
  </div>
</section>
```

---

## ⛳ Verification Checkpoint

```
DOING: Test gallery in browser (reload with cache cleared)
EXPECT:
  - Gallery has minimum height (no collapse on load)
  - Loading shimmer shows while images load
  - Images fade in smoothly when loaded
  - No layout shift during loading
  - Captions appear on hover
  - Responsive grid works at all sizes

RESULT: [document observations]
MATCHES: [yes/no]
THEREFORE: [proceed to TASK_007 or report issues]
```

---

## Verification Checklist
- [ ] Gallery has minimum height (no collapse)
- [ ] Loading placeholder shows while images load
- [ ] Images fade in when loaded
- [ ] No layout shift during loading
- [ ] Captions display correctly
- [ ] Captions update when language changes
- [ ] Hover effects work smoothly
- [ ] Works on all screen sizes

---

## Handoff

When complete:
- Files modified: index.html, main.css, gallery.js/main.js
- Ready for: TASK_007_MISC_FIXES.md
