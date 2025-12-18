# TASK 007: Miscellaneous Fixes

## Skills: `frontend-design`, `systematic-debugging`, `verification-before-completion`

## Priority: LOW-MEDIUM

---

## Explicit Reasoning Protocol

For each fix:
```
DOING: [action]
EXPECT: [outcome]
RESULT: [what happened]
MATCHES: [yes/no]
THEREFORE: [next step or report to Q]
```

---

## 1. Remove Unwanted `<br>` in Bank Transfer Block

### Location
- index.html (all language versions)
- support.html (if exists)

### Problem
```html
<!-- WRONG -->
<p>IBAN: CH** **** **** **** ****<br>Contactez-nous pour l'IBAN complet</p>
```

### Solution
```
DOING: Replace <br> with separate paragraphs or span blocks
EXPECT: Cleaner markup, text still on separate lines
```

```html
<!-- CORRECT -->
<p>IBAN: CH** **** **** **** ****</p>
<p class="text-sm text-subtext-dark mt-1" data-i18n="support.bank_contact_text">
  Contactez-nous pour l'IBAN complet
</p>
```

### Update Locale Files

In `/locales/fr.json`, `/locales/uk.json`, `/locales/de.json`:

```json
"support": {
  "bank_transfer": "Virement Bancaire",
  "bank_transfer_text": "IBAN: CH** **** **** **** ****",
  "bank_contact_note": "Contactez-nous pour l'IBAN complet"
}
```

---

## 2. Gold Color Consistency

### Define Gold Variables

```
DOING: Verify gold CSS variables exist in main.css
EXPECT: :root has --gold, --gold-light, --gold-dark, --gold-glow
```

Add if missing:

```css
:root {
  --gold: #D4AF37;
  --gold-light: #E5C158;
  --gold-dark: #B8962E;
  --gold-glow: rgba(212, 175, 55, 0.4);
}

/* Utility classes */
.text-gold { color: var(--gold); }
.bg-gold { background-color: var(--gold); }
.border-gold { border-color: var(--gold); }
```

### Elements That Should Use Gold
- [ ] Primary buttons (hover state)
- [ ] Navigation active state
- [ ] Section headings (or primary color)
- [ ] Audio player controls
- [ ] Volume slider fill
- [ ] Language switcher active underline
- [ ] Links on hover
- [ ] Form focus states
- [ ] Card borders on hover
- [ ] Icon accents

### Search for Hardcoded Colors

```
DOING: Find hardcoded #D4AF37 that should use variable
EXPECT: List of files/lines with hardcoded values
```

```bash
grep -rn "#D4AF37\|#d4af37\|rgb(212, 175, 55)" --include="*.css" --include="*.html"
```

---

## 3. Ensure i18n Loads on All Pages

### Required Script Tags

```
DOING: Verify each HTML page has correct script includes
EXPECT: main.js, i18n-bridge.js, lang-switcher.js present
```

Each HTML page must include before `</body>`:
```html
<!-- Main JS -->
<script src="/assets/js/main.js" type="text/javascript"></script>

<!-- i18n Bridge (ES6 Module) -->
<script type="module" src="/assets/js/i18n-bridge.js"></script>

<!-- Language Switcher -->
<script src="/assets/js/lang-switcher.js" type="text/javascript"></script>
```

### Pages to Check
- [ ] index.html (root + /fr/ + /uk/ + /de/)
- [ ] about.html (all versions)
- [ ] contact.html (all versions)
- [ ] partners.html (all versions)
- [ ] our-actions.html (all versions)

---

## 4. Fix Mobile Menu Language Switcher

```
DOING: Verify mobile menu has working language switcher
EXPECT: Flags visible in mobile menu, links work
```

Add if missing:

```html
<!-- Mobile Language Switcher -->
<div class="flex items-center justify-center gap-4 pt-4 border-t border-primary/20 mt-4">
  <a class="lang-btn-mobile" href="/fr/index.html" data-lang="fr" title="Français">
    <img class="flag-mobile w-8 h-auto rounded shadow" src="/assets/img/flags/fr.svg" alt="Français">
  </a>
  <a class="lang-btn-mobile" href="/uk/index.html" data-lang="uk" title="Українська">
    <img class="flag-mobile w-8 h-auto rounded shadow" src="/assets/img/flags/uk.svg" alt="Українська">
  </a>
  <a class="lang-btn-mobile" href="/de/index.html" data-lang="de" title="Deutsch">
    <img class="flag-mobile w-8 h-auto rounded shadow" src="/assets/img/flags/de.svg" alt="Deutsch">
  </a>
</div>
```

---

## 5. Mission Page Unification

### Problem
Two different versions of mission page may exist.

### Solution

```
DOING: Check for duplicate mission pages
EXPECT: Single version with rich card layout
```

1. Keep the visually rich version with cards (Inclusion, Solidarité, Créativité)
2. Delete or redirect the older version
3. Ensure hero.cta_founder links to correct page

### Link Consistency Check
```bash
grep -rn "href.*about\|href.*our-actions\|href.*mission" --include="*.html"
```

Ensure consistent across all language versions.

---

## ⛳ Final Verification Checkpoint

```
DOING: Complete cross-page, cross-language verification
EXPECT: All issues resolved, consistent styling

TESTS:
1. Open /index.html → Check all sections work
2. Switch to /uk/index.html → Verify Ukrainian translations
3. Switch to /de/index.html → Verify German translations
4. Navigate to /partners.html → Title visible, content styled
5. Navigate to /contact.html → Form works, title visible
6. Check audio player → Icons display, gold styling
7. Check gallery → No layout shift, captions work
8. Mobile menu → Language switcher works
9. Resize browser → Responsive at all breakpoints

RESULT: [document each test]
MATCHES: [all pass = yes]
THEREFORE: [ready for commit or list remaining issues]
```

---

## Verification Checklist
- [ ] No `<br>` in bank transfer text
- [ ] Gold color used consistently (#D4AF37)
- [ ] All pages load i18n scripts
- [ ] Mobile language switcher works
- [ ] Mission page is unified (single version)
- [ ] All links use absolute paths (/assets/...)

---

## Final Handoff

When complete, provide summary:

```
## Session Summary

### Completed:
- [list all completed tasks]

### Files Modified:
- [list all files with change type]

### Git Commands (individual file adds):
git add index.html
git add fr/index.html uk/index.html de/index.html
git add assets/css/main.css
git add assets/js/lang-switcher.js
git add assets/js/main.js
# ... add all modified files individually

git commit -m "fix: complete localization and UI fixes

- Fix all i18n key mismatches
- Reposition language switcher after logo
- Add active language indicator
- Fix hero layout and spacing
- Add proper page top padding
- Fix audio player icons and styling
- Fix gallery layout shift
- Ensure gold color consistency
- Remove unwanted <br> tags
- Verify mobile menu language switcher"

git push origin fix/full-localization-and-layout

### Remaining Issues (if any):
- [list any unresolved problems for Q to review]

### Recommendations:
- [next steps or suggestions]
```
