# TASK 003: Fix Hero Section Layout

## Priority: HIGH

## Current Problems
1. Hero logo (Sonate Solidaire) overlaps headline or is in wrong position
2. Hero text is too low
3. Spacing between elements is incorrect

## Required Changes

### 1. Restructure Hero Content Order

The hero section should have this order:
1. Logo (small, above headline)
2. Headline (H1)
3. Tagline
4. Description
5. CTA Buttons
6. Scroll Indicator (at bottom)

```html
<div class="relative z-10 text-center text-white px-4 max-w-5xl mx-auto hero__content">
  <div class="animate-fade-in-up">
    <!-- Logo - Small, centered above headline -->
    <img src="/assets/img/logo-sonate.png"
         alt="Logo Sonate Solidaire"
         class="sonata-logo mx-auto mb-6 h-20 md:h-24 rounded-full opacity-90 shadow-lg shadow-primary/30">

    <!-- Headline -->
    <h1 class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 drop-shadow-2xl" 
        data-i18n="hero.title">
      L'Intégration par la Musique
    </h1>
    
    <!-- Tagline -->
    <p class="text-xl md:text-2xl mb-4 text-primary font-semibold" 
       data-i18n="hero.tagline">
      Sonate Solidaire • Harmoniser les liens Suisse-Ukraine
    </p>
    
    <!-- Description -->
    <p class="text-base md:text-lg mb-8 text-white/80 max-w-3xl mx-auto" 
       data-i18n="hero.description">
      Une association à but non lucratif...
    </p>
  </div>

  <!-- CTA Buttons -->
  <div class="animate-fade-in-up animation-delay-200 flex flex-col sm:flex-row gap-4 justify-center items-center">
    <a href="#don" 
       class="inline-flex items-center px-8 py-4 bg-primary text-background-dark hover:bg-primary-hover transition-all duration-200 rounded-md text-lg font-semibold shadow-lg hover:shadow-xl" 
       data-i18n="hero.cta_support">
      <span class="material-symbols-outlined mr-2">favorite</span>
      Soutenir le projet
    </a>
    <a href="about.html" 
       class="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-background-dark transition-all duration-200 rounded-md text-lg font-semibold" 
       data-i18n="hero.cta_founder">
      <span class="material-symbols-outlined mr-2">person</span>
      Découvrir le fondateur
    </a>
  </div>
</div>
```

### 2. CSS Fixes for Hero

Add/update in styles:

```css
/* Hero Content - Proper vertical positioning */
.hero__content {
  margin-top: -40px; /* Raise content slightly */
  padding-top: 80px; /* Account for fixed navbar */
}

/* Sonata Logo in Hero - Controlled size */
.sonata-logo {
  max-width: 100px;
  width: 100px;
  height: auto;
  display: block;
}

@media (min-width: 768px) {
  .sonata-logo {
    max-width: 120px;
    width: 120px;
  }
}

@media (max-width: 560px) {
  .sonata-logo {
    max-width: 80px;
    width: 80px;
  }
  
  .hero__content {
    padding-top: 100px;
  }
}

/* Hero animation delays */
.animation-delay-200 {
  animation-delay: 200ms;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 3. Remove Conflicting !important Rules

In existing CSS, remove or modify:

```css
/* REMOVE these overrides if present */
.sonata-logo {
  max-width: 120px !important; /* Remove !important */
  width: 120px !important;     /* Remove !important */
}
```

## Verification Checklist
- [ ] Logo appears above headline (small, centered)
- [ ] Headline is fully visible, not cut off
- [ ] Proper spacing between all elements
- [ ] CTA buttons are below description
- [ ] Layout works on mobile, tablet, desktop
- [ ] Scroll indicator at bottom of hero section
