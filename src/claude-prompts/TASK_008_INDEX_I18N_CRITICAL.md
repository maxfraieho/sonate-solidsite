# TASK 008: Critical i18n Fix for index.html

## Priority: 🔴 CRITICAL

## Problem Description
The main page (index.html) has severe localization issues where i18n keys are displaying as raw text instead of translated content.

## Affected Elements

### 1. Header Icon Artifact
**Issue**: `music_note` text appearing instead of Material Icon
**Location**: Header/navbar logo area
**Fix**: Ensure the icon element has class `material-symbols-outlined` and the text is inside the span

```html
<!-- WRONG -->
music_note

<!-- CORRECT -->
<span class="material-symbols-outlined">music_note</span>
```

### 2. Hero Section Buttons
**Issue**: `hero.supportCta` and `hero.founderCta` showing as raw keys
**Expected**: "Soutenir le projet" / "Découvrir le fondateur" (FR)

**Check these elements:**
```html
<a data-i18n="hero.supportCta">...</a>
<a data-i18n="hero.founderCta">...</a>
```

**Verify JSON keys exist in `/locales/fr.json`:**
```json
{
  "hero": {
    "supportCta": "Soutenir le projet",
    "founderCta": "Découvrir le fondateur"
  }
}
```

### 3. Manifesto Section (V.I.O.L.I.N.)
**Issue**: All manifesto keys showing raw:
- `manifesto.v.title`, `manifesto.v.desc`
- `manifesto.i.title`, `manifesto.i.desc`
- `manifesto.o.title`, `manifesto.o.desc`
- `manifesto.l.title`, `manifesto.l.desc`
- `manifesto.i2.title`, `manifesto.i2.desc`
- `manifesto.n.title`, `manifesto.n.desc`

**Required JSON structure:**
```json
{
  "manifesto": {
    "v": { "title": "Valeurs", "desc": "Respect, dignité, entraide..." },
    "i": { "title": "Intégration", "desc": "Créer des ponts..." },
    "o": { "title": "Œuvre", "desc": "Transformer l'art..." },
    "l": { "title": "Lien", "desc": "Tisser des connexions..." },
    "i2": { "title": "Initiative", "desc": "Proactivité..." },
    "n": { "title": "Nuance", "desc": "Sensibilité aux différences..." }
  }
}
```

### 4. Mission Section
**Issue**: Mission card keys not translating:
- `mission.cohesion.title`, `mission.cohesion.desc`
- `mission.mediation.title`, `mission.mediation.desc`
- `mission.integration.title`, `mission.integration.desc`

### 5. Quote Section
**Issue**: `quote.arsen` showing raw
**Expected**: The founder's quote text

### 6. Scroll Arrow Icon
**Issue**: `keyboard_arrow_down` showing as text
**Fix**: Wrap in Material Icon span

## Diagnostic Steps

### Step 1: Check i18n.js initialization
```bash
# Verify i18n script loads before DOM content
grep -n "i18n" index.html
```

### Step 2: Compare working vs broken pages
```bash
# gallery.html works - compare its structure
diff index.html gallery.html | head -50
```

### Step 3: Check JSON file structure
```bash
# Verify all keys exist
cat locales/fr.json | jq '.hero, .manifesto, .mission, .quote'
```

### Step 4: Check data-i18n attributes
```bash
# List all i18n keys used in index.html
grep -oP 'data-i18n="[^"]*"' index.html | sort -u
```

## Solution Approach

### DOING: Fix i18n key mismatches
### EXPECT: All text displays in selected language
### IF YES: Move to next element
### IF NO: Check JSON structure and attribute names

### Fix Order:
1. Fix Material Icons (wrap in proper spans)
2. Verify JSON keys match HTML data-i18n attributes
3. Check i18n.js script execution order
4. Test language switching

## Verification Checklist

- [ ] `music_note` icon displays correctly in header
- [ ] Hero buttons show translated text
- [ ] All 6 manifesto cards show titles and descriptions
- [ ] Mission cards display translated content
- [ ] Quote section shows Arsen's quote
- [ ] Scroll arrow shows as icon, not text
- [ ] Language switcher changes all content
- [ ] Test FR, UK, DE languages

## Files to Modify

1. `index.html` - Fix icon spans, verify data-i18n attributes
2. `locales/fr.json` - Verify/add missing keys
3. `locales/uk.json` - Verify/add missing keys  
4. `locales/de.json` - Verify/add missing keys
5. `js/i18n.js` - Check translation function

## Git Workflow

```bash
git add index.html
git add locales/fr.json
git add locales/uk.json
git add locales/de.json
git commit -m "fix(i18n): resolve critical translation issues on index.html

- Fix Material Icons displaying as text
- Correct hero button i18n keys
- Add missing manifesto section translations
- Fix mission card translations
- Add quote.arsen translation"
```
