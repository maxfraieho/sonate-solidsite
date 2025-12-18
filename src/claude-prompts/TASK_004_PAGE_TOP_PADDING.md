# TASK 004: Fix Page Title Overflow

## Skills: `frontend-design`, `verification-before-completion`

## Priority: HIGH

## Affected Pages
- /fr/partners.html, /uk/partners.html, /de/partners.html
- /fr/contact.html, /uk/contact.html, /de/contact.html  
- /fr/our-actions.html, /uk/our-actions.html, /de/our-actions.html
- about.html (all versions)

## Problem
Page headlines are cut off at the top because they don't account for the fixed navbar height (h-20 = 80px).

---

## Explicit Reasoning Protocol

Before each page modification:
```
DOING: Add padding-top to [page].html first content section
EXPECT: Title visible below navbar with proper spacing
IF YES: Proceed to next page
IF NO: Adjust padding value, verify again
```

---

## Solution

### Step 1: Add CSS for Internal Page Headers

```
DOING: Add .page-hero class to /assets/css/main.css
EXPECT: Class provides proper top padding for internal pages
```

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

### Step 2: Update Each Internal Page

For each page, ensure the main content section has adequate top padding:

#### Template Structure
```html
<!-- Page Hero - with proper top padding for fixed navbar -->
<section class="page-hero">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4" 
        data-i18n="[page].title">
      Page Title
    </h1>
    <p class="text-lg md:text-xl text-subtext-dark max-w-3xl mx-auto" 
       data-i18n="[page].description">
      Page description...
    </p>
  </div>
</section>
```

### Step 3: Update Specific Pages

#### partners.html (all versions)
```
DOING: Add page-hero class or pt-32 to partners.html main section
EXPECT: "Nos Partenaires" title fully visible
```

```html
<main>
  <section class="page-hero">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4" 
          data-i18n="partners.title">Nos Partenaires</h1>
      <p class="text-lg md:text-xl text-subtext-dark max-w-3xl mx-auto" 
         data-i18n="partners.description">Ensemble, nous construisons des ponts...</p>
    </div>
  </section>
  <!-- rest of content -->
</main>
```

#### contact.html (all versions)
```html
<main>
  <section class="page-hero">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4" 
          data-i18n="contact.title">Contact</h1>
    </div>
  </section>
  <!-- rest of content -->
</main>
```

#### our-actions.html / mission.html
```html
<main>
  <section class="page-hero">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4" 
          data-i18n="actions.title">Nos Actions</h1>
    </div>
  </section>
  <!-- rest of content -->
</main>
```

### Quick Fix Alternative

If restructuring isn't possible, add inline class:
```html
<main class="pt-24 md:pt-32">
  <!-- existing content -->
</main>
```

---

## ⛳ Verification Checkpoint

```
DOING: Open each page in browser
EXPECT: Page title fully visible below navbar

Test each:
- /partners.html → RESULT: [visible/cut off]
- /fr/partners.html → RESULT: [visible/cut off]
- /uk/partners.html → RESULT: [visible/cut off]
- /de/partners.html → RESULT: [visible/cut off]
- /contact.html → RESULT: [visible/cut off]
- /fr/contact.html → RESULT: [visible/cut off]
...

MATCHES: [all visible = yes]
THEREFORE: [proceed to TASK_005 or list issues]
```

---

## Verification Checklist
- [ ] Partners page title fully visible (all languages)
- [ ] Contact page title fully visible (all languages)
- [ ] Mission/Actions page title fully visible (all languages)
- [ ] About page title fully visible (all languages)
- [ ] No text overlapping with navbar shadow
- [ ] Works on all screen sizes

---

## Handoff

When complete:
- Files modified: main.css, partners.html (×4), contact.html (×4), our-actions.html (×4), about.html (×4)
- Ready for: TASK_005_AUDIO_PLAYER.md
