# TASK 004: Fix Page Title Overflow

## Priority: HIGH

## Affected Pages
- /fr/partners.html, /uk/partners.html, /de/partners.html
- /fr/contact.html, /uk/contact.html, /de/contact.html  
- /fr/our-actions.html, /uk/our-actions.html, /de/our-actions.html
- about.html (all versions)

## Problem
Page headlines are cut off at the top because they don't account for the fixed navbar height (h-20 = 80px).

## Solution

### 1. Add Hero Section with Proper Padding

Every internal page should have a hero/header section like this:

```html
<!-- Page Hero - with proper top padding for fixed navbar -->
<section class="relative pt-32 pb-16 bg-gradient-to-b from-surface-dark to-background-dark">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4" 
        data-i18n="partners.title">
      Nos Partenaires
    </h1>
    <p class="text-lg md:text-xl text-subtext-dark max-w-3xl mx-auto" 
       data-i18n="partners.description">
      Ensemble, nous construisons des ponts...
    </p>
  </div>
</section>
```

### 2. CSS for Internal Page Headers

Add to main.css:

```css
/* Internal Page Hero Sections */
.page-hero {
  padding-top: 8rem;   /* 128px - accounts for navbar */
  padding-bottom: 4rem;
  background: linear-gradient(180deg, 
    hsl(var(--surface-dark)) 0%, 
    hsl(var(--background-dark)) 100%
  );
}

.page-hero h1 {
  margin-top: 0;
}

/* Ensure scroll offset for anchor targets */
[id] {
  scroll-margin-top: 6rem; /* 96px offset for fixed navbar */
}

/* Alternative: Add padding to first section if no hero */
main > section:first-child,
.content-wrapper > section:first-child {
  padding-top: 6rem;
}
```

### 3. Quick Fix for Existing Pages

If restructuring isn't possible, add this class to the first content container:

```html
<div class="pt-24 md:pt-32">
  <!-- existing content -->
</div>
```

Or add inline style:
```html
<section style="padding-top: 8rem;">
```

## Files to Modify

For each page, ensure the main content section has adequate top padding:

### partners.html (all language versions)
```html
<main class="pt-24">
  <!-- or -->
  <section class="page-hero">
    <h1 data-i18n="partners.title">Partenaires</h1>
  </section>
</main>
```

### contact.html (all language versions)
```html
<main class="pt-24">
  <section class="page-hero">
    <h1 data-i18n="contact.title">Contact</h1>
  </section>
</main>
```

### our-actions.html / mission.html
```html
<main class="pt-24">
  <section class="page-hero">
    <h1 data-i18n="actions.title">Nos Actions</h1>
  </section>
</main>
```

## Verification Checklist
- [ ] Partners page title fully visible
- [ ] Contact page title fully visible  
- [ ] Mission/Actions page title fully visible
- [ ] About page title fully visible
- [ ] No text overlapping with navbar shadow
- [ ] Works on all screen sizes
