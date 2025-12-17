# MASTER PROMPT: violin.pp.ua Full Localization & Layout Fix

## Instructions for Claude CLI

You are an autonomous senior full-stack development agent.
Your task is to fix and improve the multilingual website project "violin.pp.ua".

**IMPORTANT RULES:**
- Apply ALL changes listed in the task files
- Do NOT refactor beyond what is explicitly stated
- Do NOT invent new UI — keep existing design system
- All fixes must work identically in FR, UK, and DE versions
- Use ABSOLUTE paths for all assets (/assets/css/, /assets/js/)
- Test all three language versions after changes

---

## Task Execution Order

Execute tasks in this order:

### Phase 1: Critical Fixes (Do First)
1. **TASK_001_FIX_I18N_KEYS.md** - Fix all broken localization keys
2. **TASK_002_HEADER_LANG_SWITCHER.md** - Fix header & language switcher position
3. **TASK_003_HERO_LAYOUT.md** - Fix hero section layout

### Phase 2: Page Fixes
4. **TASK_004_PAGE_TOP_PADDING.md** - Fix page title overflow on all pages

### Phase 3: Component Fixes  
5. **TASK_005_AUDIO_PLAYER.md** - Fix audio player icons and styling
6. **TASK_006_GALLERY_FIX.md** - Fix gallery rendering

### Phase 4: Cleanup
7. **TASK_007_MISC_FIXES.md** - Miscellaneous fixes

---

## Files to Modify

### HTML Files
```
/index.html
/about.html
/contact.html
/partners.html
/our-actions.html
/fr/index.html
/fr/about.html
/fr/contact.html
/fr/partners.html
/fr/our-actions.html
/uk/index.html
/uk/about.html
/uk/contact.html
/uk/partners.html
/uk/our-actions.html
/de/index.html
/de/about.html
/de/contact.html
/de/partners.html
/de/our-actions.html
```

### CSS Files
```
/assets/css/main.css
/assets/css/header.css (if exists)
/assets/css/hero.css (if exists)
```

### JavaScript Files
```
/assets/js/main.js
/assets/js/modules/i18n.js
/assets/js/lang-switcher.js
/assets/js/audio-player.js (or similar)
/assets/js/gallery.js (if exists)
```

### Locale Files
```
/locales/fr.json
/locales/uk.json
/locales/de.json
```

---

## Key Mappings Reference (Quick Reference)

```
hero.supportCta         → hero.cta_support
hero.founderCta         → hero.cta_founder
manifesto.v.title       → manifesto.values.v_title
manifesto.v.desc        → manifesto.values.v_desc
manifesto.i.title       → manifesto.values.i_title
manifesto.i.desc        → manifesto.values.i_desc
manifesto.o.title       → manifesto.values.o_title
manifesto.o.desc        → manifesto.values.o_desc
manifesto.l.title       → manifesto.values.l_title
manifesto.l.desc        → manifesto.values.l_desc
manifesto.i2.title      → manifesto.values.i2_title
manifesto.i2.desc       → manifesto.values.i2_desc
manifesto.n.title       → manifesto.values.n_title
manifesto.n.desc        → manifesto.values.n_desc
quote.arsen             → manifesto.quote
mission.cohesion.title  → mission.items.cohesion
mission.cohesion.desc   → mission.items.cohesion_desc
mission.mediation.title → mission.items.mediation
mission.mediation.desc  → mission.items.mediation_desc
mission.integration.title → mission.items.integration
mission.integration.desc  → mission.items.integration_desc
```

---

## Git Workflow

After completing all tasks:

```bash
# Create feature branch
git checkout -b fix/full-localization-and-layout

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Fix full localization system, reposition language switcher, correct hero layout, unify mission page, repair partners/contact pages, improve audio player, fix gallery, remove br, enforce gold styling."

# Push to remote
git push origin fix/full-localization-and-layout
```

---

## Verification Checklist (Run After All Tasks)

### Localization
- [ ] No broken keys visible (no text like "manifesto.v.title")
- [ ] All pages load translations correctly
- [ ] Language switcher changes language without breaking styles
- [ ] Active language has golden underline

### Layout
- [ ] Hero logo is correctly positioned
- [ ] Hero text not cut off
- [ ] Page titles visible on Partners, Contact, Mission pages
- [ ] No elements overlapping navbar

### Components
- [ ] Audio player shows icons (not text)
- [ ] Volume slider is gold colored
- [ ] Gallery loads without layout shift
- [ ] Gallery captions update with language

### Branding
- [ ] Gold color consistent (#D4AF37)
- [ ] No `<br>` in bank transfer block

### Cross-Browser
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile devices

---

## Emergency Rollback

If something breaks:
```bash
git checkout master
git branch -D fix/full-localization-and-layout
```

---

## Support

Project repository: https://github.com/maxfraieho/violin.pp.ua
Live site: https://violin.pp.ua
