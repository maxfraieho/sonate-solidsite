# TASK 007: Miscellaneous Fixes

## Priority: LOW-MEDIUM

---

## 1. Remove Unwanted `<br>` in Bank Transfer Block

### Location
- index.html (all language versions)
- support.html (if exists)
- Any section with class containing "bank" or "donation"

### Problem
```html
<!-- WRONG -->
<p>IBAN: CH** **** **** **** ****<br>Contactez-nous pour l'IBAN complet</p>
```

### Solution
```html
<!-- CORRECT -->
<p>IBAN: CH** **** **** **** ****</p>
<p class="text-sm text-subtext-dark mt-1" data-i18n="support.bank_contact_text">
  Contactez-nous pour l'IBAN complet
</p>
```

Or if single line is preferred:
```html
<p>
  <span data-i18n="support.bank_transfer_text">IBAN: CH** **** **** **** ****</span>
  <span class="block mt-1 text-sm" data-i18n="support.bank_contact_note">Contactez-nous pour l'IBAN complet</span>
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

In main.css or at root level:
```css
:root {
  --gold: #D4AF37;
  --gold-light: #E5C158;
  --gold-dark: #B8962E;
  --gold-glow: rgba(212, 175, 55, 0.4);
}

/* Tailwind-style utility if needed */
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

### Search and Replace

Find any hardcoded gold colors and replace with variable:
```bash
# Find hardcoded gold colors
grep -rn "#D4AF37\|#d4af37\|rgb(212, 175, 55)" --include="*.css" --include="*.html"

# Replace with variable where appropriate
# (manual review recommended)
```

---

## 3. Ensure i18n Loads on All Pages

### Required Script Tags (ALL pages)

Each HTML page must include:
```html
<!-- Before closing </body> -->

<!-- Main JS -->
<script src="/assets/js/main.js" type="text/javascript"></script>

<!-- i18n Bridge (ES6 Module) -->
<script type="module" src="/assets/js/i18n-bridge.js"></script>

<!-- Language Switcher -->
<script src="/assets/js/lang-switcher.js" type="text/javascript"></script>
```

### Pages to Check
- [ ] index.html
- [ ] about.html
- [ ] contact.html
- [ ] partners.html
- [ ] our-actions.html
- [ ] /fr/index.html
- [ ] /fr/about.html
- [ ] /fr/contact.html
- [ ] /fr/partners.html
- [ ] /uk/index.html
- [ ] /uk/about.html
- [ ] /uk/contact.html
- [ ] /uk/partners.html
- [ ] /de/index.html
- [ ] /de/about.html
- [ ] /de/contact.html
- [ ] /de/partners.html

---

## 4. Fix Mobile Menu Language Switcher

Ensure mobile menu also has working language switcher:

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
Two different versions of mission page exist.

### Solution
1. Keep the visually rich version with cards (Inclusion, Solidarité, Créativité, etc.)
2. Delete or redirect the older version
3. Ensure hero.founderCta links to the correct unified page

### Link Updates
```html
<!-- In hero section -->
<a href="about.html" data-i18n="hero.cta_founder">
  Découvrir le fondateur
</a>

<!-- OR if it should go to mission page -->
<a href="our-actions.html" data-i18n="hero.cta_founder">
  Découvrir le fondateur
</a>
```

Make sure this link is consistent across all language versions.

---

## Verification Checklist
- [ ] No `<br>` in bank transfer text
- [ ] Gold color used consistently (#D4AF37)
- [ ] All pages load i18n scripts
- [ ] Mobile language switcher works
- [ ] Mission page is unified (single version)
- [ ] All links use absolute paths (/assets/...)
