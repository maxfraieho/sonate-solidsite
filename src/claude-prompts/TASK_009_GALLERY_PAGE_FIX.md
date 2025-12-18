# TASK 009: Fix Gallery Page Content

## Priority: 🟡 MEDIUM

## Problem Description
The gallery.html page is displaying the index.html content instead of the actual gallery content. This appears to be either:
1. Wrong file content (copy of index.html)
2. Incorrect include/template issue
3. Redirect misconfiguration

## Current State
- URL: https://violin.pp.ua/gallery.html
- Shows: Main page hero, manifesto, mission sections
- Expected: Photo/video gallery of concerts and events

## Diagnostic Steps

### Step 1: Check file content
```bash
# Compare files
head -50 gallery.html
head -50 index.html

# Check if they're identical
diff gallery.html index.html
```

### Step 2: Check for redirects
```bash
# Look for meta refresh or JS redirects
grep -i "redirect\|location\|refresh" gallery.html
```

### Step 3: Verify gallery structure exists
```bash
# Check if gallery section exists anywhere
grep -r "gallery\|galerie" *.html
```

## Expected Gallery Structure

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <title data-i18n="gallery.pageTitle">Galerie | Sonate Solidaire</title>
    <!-- ... meta tags ... -->
</head>
<body>
    <!-- Header include -->
    
    <!-- Gallery Hero -->
    <section class="page-hero">
        <h1 data-i18n="gallery.title">Galerie</h1>
        <p data-i18n="gallery.subtitle">Moments capturés de nos concerts et événements</p>
    </section>
    
    <!-- Gallery Grid -->
    <section class="gallery-section">
        <div class="gallery-filters">
            <button data-filter="all" data-i18n="gallery.filterAll">Tout</button>
            <button data-filter="concerts" data-i18n="gallery.filterConcerts">Concerts</button>
            <button data-filter="events" data-i18n="gallery.filterEvents">Événements</button>
        </div>
        
        <div class="gallery-grid">
            <!-- Gallery items -->
        </div>
    </section>
    
    <!-- Footer include -->
</body>
</html>
```

## Required Translations (locales/fr.json)

```json
{
  "gallery": {
    "pageTitle": "Galerie | Sonate Solidaire",
    "title": "Galerie",
    "subtitle": "Moments capturés de nos concerts et événements",
    "filterAll": "Tout",
    "filterConcerts": "Concerts",
    "filterEvents": "Événements",
    "filterHumanitarian": "Actions humanitaires",
    "viewMore": "Voir plus",
    "lightboxClose": "Fermer",
    "lightboxPrev": "Précédent",
    "lightboxNext": "Suivant"
  }
}
```

## Solution

### DOING: Restore correct gallery.html content
### EXPECT: Gallery page shows photo grid with filters
### IF YES: Verify lightbox functionality
### IF NO: Check for missing CSS/JS dependencies

### Option A: If gallery content was overwritten
```bash
# Restore from git
git checkout HEAD~5 -- gallery.html
# Or restore from backup
```

### Option B: If gallery never existed
Create new gallery.html with proper structure (see expected structure above)

## Verification Checklist

- [ ] gallery.html shows gallery content, not index content
- [ ] Gallery hero section displays correctly
- [ ] Filter buttons work
- [ ] Gallery grid displays images
- [ ] Lightbox opens on image click
- [ ] All text is translatable (FR, UK, DE)
- [ ] Responsive design works on mobile

## Git Workflow

```bash
git add gallery.html
git add locales/fr.json
git add locales/uk.json
git add locales/de.json
git commit -m "fix(gallery): restore gallery page content

- Replace incorrect index.html content with gallery
- Add gallery section with image grid
- Add filter functionality
- Add i18n translations for gallery"
```
