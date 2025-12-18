# TASK 003: Fix Hero Section Layout

## Skills: `frontend-design`, `verification-before-completion`

## Priority: HIGH

## Current Problems
1. Hero logo (Sonate Solidaire) overlaps headline or is in wrong position
2. Hero text is too low
3. Spacing between elements is incorrect

---

## Explicit Reasoning Protocol

Before modifications:
```
DOING: [action]
EXPECT: [outcome]
IF YES: [proceed]
IF NO: [stop, report to Q]
```

---

## Required Changes

### Step 1: Analyze Current Hero Structure

```
DOING: Find hero section structure in index.html
EXPECT: Section with class containing "hero" and nested content
```

```bash
grep -n "hero\|Hero" index.html | head -20
```

### Step 2: Restructure Hero Content Order

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

### Step 3: CSS Fixes for Hero

```
DOING: Add/update hero CSS in /assets/css/main.css
EXPECT: Styles control positioning, logo size, content spacing
```

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

### Step 4: Remove Conflicting !important Rules

```
DOING: Search for !important rules on .sonata-logo
EXPECT: Find and remove any !important that conflicts
```

```bash
grep -n "sonata-logo" assets/css/*.css
```

Remove or modify conflicting rules:
```css
/* REMOVE these if present */
.sonata-logo {
  max-width: 120px !important; /* Remove !important */
  width: 120px !important;     /* Remove !important */
}
```

---

## ⛳ Verification Checkpoint

```
DOING: Open /index.html in browser at various widths
EXPECT: 
  - Desktop: Logo above headline, proper spacing, CTA buttons visible
  - Tablet: Elements scale appropriately
  - Mobile: Logo smaller, content fits screen

RESULT: [document observations]
MATCHES: [yes/no]
THEREFORE: [proceed or report to Q]
```

---

## Verification Checklist
- [ ] Logo appears above headline (small, centered)
- [ ] Headline is fully visible, not cut off
- [ ] Proper spacing between all elements
- [ ] CTA buttons are below description
- [ ] Layout works on mobile, tablet, desktop
- [ ] Scroll indicator at bottom of hero section (if exists)

---

## Handoff

When complete:
- Files modified: index.html (all versions), main.css
- Ready for: TASK_004_PAGE_TOP_PADDING.md

---

## Phase 1 Complete Checkpoint

After TASK_001, TASK_002, TASK_003:

```
⛳ PHASE 1 VERIFICATION

DOING: Test all three language versions
EXPECT: 
  - /index.html: i18n working, lang switcher correct, hero layout proper
  - /fr/index.html: Same checks pass
  - /uk/index.html: Same checks pass
  - /de/index.html: Same checks pass

RESULT: [document for each]
MATCHES: [yes/no for each]
THEREFORE: [proceed to Phase 2 or list issues for Q]
```
