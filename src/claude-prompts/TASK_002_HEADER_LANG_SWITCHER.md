# TASK 002: Fix Header & Language Switcher

## Skills: `frontend-design`, `verification-before-completion`

## Priority: HIGH

## Current Problems
1. Language flags are in far-left corner (wrong position)
2. No active language indicator
3. Broken styles when switching languages

---

## Explicit Reasoning Protocol

Before EACH modification:
```
DOING: [specific action]
EXPECT: [predicted outcome]
IF YES: [next step]
IF NO: [stop, diagnose]
```

---

## Required Changes

### Step 1: Locate Current Language Switcher Structure

```
DOING: Find lang-switcher HTML in index.html
EXPECT: Element with id="lang-switcher" or class="lang-switcher"
```

```bash
grep -n "lang-switcher\|lang-btn" index.html
```

### Step 2: Move Language Switcher After Logo

In ALL HTML files, restructure the header-left div:

```html
<!-- BEFORE (wrong) -->
<div class="header-left flex items-center gap-3">
  <!-- Language Switcher (BEFORE logo) - WRONG -->
  <div id="lang-switcher" class="lang-switcher">...</div>
  <!-- Logo -->
  <a href="index.html">...</a>
</div>

<!-- AFTER (correct) -->
<div class="header-left flex items-center gap-3">
  <!-- Logo FIRST -->
  <a href="index.html" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
    <span class="material-symbols-outlined text-primary text-4xl">music_note</span>
    <div class="flex flex-col">
      <span class="font-display font-bold text-xl">Sonate</span>
      <span class="font-display text-primary text-sm">Solidaire</span>
    </div>
  </a>
  
  <!-- Language Switcher AFTER logo -->
  <div id="lang-switcher" class="lang-switcher ml-4" role="navigation" aria-label="Language switcher">
    <a class="lang-btn" href="/fr/index.html" data-lang="fr" hreflang="fr" title="Français">
      <img class="flag" src="/assets/img/flags/fr.svg" alt="Français">
    </a>
    <a class="lang-btn" href="/uk/index.html" data-lang="uk" hreflang="uk" title="Українська">
      <img class="flag" src="/assets/img/flags/uk.svg" alt="Українська">
    </a>
    <a class="lang-btn" href="/de/index.html" data-lang="de" hreflang="de" title="Deutsch">
      <img class="flag" src="/assets/img/flags/de.svg" alt="Deutsch">
    </a>
  </div>
</div>
```

### Step 3: Add Active Language Indicator CSS

```
DOING: Add CSS for active language indicator to /assets/css/main.css
EXPECT: File modified, CSS block added at end
```

Add to `/assets/css/main.css`:

```css
/* Active Language Flag - Golden Underline */
.lang-switcher .lang-btn.active,
.lang-switcher .lang-btn[data-lang].active {
  position: relative;
}

.lang-switcher .lang-btn.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  border-radius: 1px;
}

.lang-switcher .lang-btn.active .flag {
  box-shadow: 0 2px 8px rgba(212, 175, 55, 0.4);
}
```

### Step 4: Update lang-switcher.js

```
DOING: Modify /assets/js/lang-switcher.js to add active class
EXPECT: Script detects current language and adds .active class
```

Modify `/assets/js/lang-switcher.js`:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Detect current language from URL path
  const path = window.location.pathname;
  let currentLang = 'fr'; // default
  
  if (path.startsWith('/uk/') || path.includes('/uk/')) {
    currentLang = 'uk';
  } else if (path.startsWith('/de/') || path.includes('/de/')) {
    currentLang = 'de';
  } else if (path.startsWith('/fr/') || path.includes('/fr/')) {
    currentLang = 'fr';
  }
  
  // Add active class to current language flag
  const langBtns = document.querySelectorAll('.lang-btn, .lang-btn-mobile');
  langBtns.forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
});
```

### Step 5: Fix Asset Paths (Use Absolute Paths)

```
DOING: Ensure all /fr/, /uk/, /de/ HTML files use absolute asset paths
EXPECT: All href/src attributes start with / not ../
```

In ALL HTML files in /fr/, /uk/, /de/ folders:

```html
<!-- WRONG (relative paths) -->
<link rel="stylesheet" href="../assets/css/main.css">
<script src="../assets/js/main.js"></script>

<!-- CORRECT (absolute paths) -->
<link rel="stylesheet" href="/assets/css/main.css">
<script src="/assets/js/main.js"></script>
```

Search and replace:
```bash
find ./fr ./uk ./de -name "*.html" -exec sed -i 's|href="\.\./assets/|href="/assets/|g' {} \;
find ./fr ./uk ./de -name "*.html" -exec sed -i 's|src="\.\./assets/|src="/assets/|g' {} \;
```

---

## ⛳ Verification Checkpoint

```
DOING: Open /index.html in browser
EXPECT: Logo appears first, language flags after, FR flag has gold underline

DOING: Click UK flag
EXPECT: Navigate to /uk/index.html, UK flag now has gold underline, styles intact

RESULT: [document observations]
MATCHES: [yes/no]
THEREFORE: [proceed or report to Q]
```

---

## Verification Checklist
- [ ] Logo appears BEFORE language switcher
- [ ] Active language has golden underline
- [ ] Switching languages loads correct page with styles
- [ ] No broken CSS on any language version
- [ ] Flags display correctly (not broken images)

---

## Handoff

When complete:
- Files modified: [list HTML files, main.css, lang-switcher.js]
- Ready for: TASK_003_HERO_LAYOUT.md
