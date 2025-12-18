# MASTER PROMPT: violin.pp.ua Full Localization & Layout Fix

## Skills to Activate
```
RECOMMENDED SKILLS:
- frontend-design (CSS, layout, responsive)
- systematic-debugging (for troubleshooting)
- verification-before-completion (mandatory)
- executing-plans (phased task execution)
```

## Instructions for Claude CLI

You are an autonomous senior full-stack development agent working with Q (the user).
Your task is to fix and improve the multilingual website project "violin.pp.ua".

**CRITICAL: Follow CLAUDE.md Explicit Reasoning Protocol**

Before EVERY file modification:
```
DOING: [action description]
EXPECT: [specific predicted outcome]
IF YES: [next action]
IF NO: [stop, diagnose, ask Q]
```

After EVERY action:
```
RESULT: [what actually happened]
MATCHES: [yes/no]
THEREFORE: [conclusion and next step]
```

---

## Core Rules

- Apply ALL changes listed in the task files
- Do NOT refactor beyond what is explicitly stated
- Do NOT invent new UI — keep existing design system
- All fixes must work identically in FR, UK, and DE versions
- Use ABSOLUTE paths for all assets (/assets/css/, /assets/js/)
- **Checkpoint every 3 file modifications** — verify changes work
- If anything fails: **STOP, explain to Q, wait for confirmation**

---

## Task Execution Order

Execute tasks in this order with explicit checkpoints:

### Phase 1: Critical Fixes (Do First)
1. **TASK_001_FIX_I18N_KEYS.md** - Fix all broken localization keys
2. **TASK_002_HEADER_LANG_SWITCHER.md** - Fix header & language switcher position
3. **TASK_003_HERO_LAYOUT.md** - Fix hero section layout

**⛳ CHECKPOINT 1**: After Phase 1, verify:
```
VERIFY: Open /index.html, /fr/index.html, /uk/index.html in browser
EXPECT: All i18n keys display correctly, lang switcher after logo, hero layout proper
RESULT: [document what you see]
MATCHES: [yes/no]
```

### Phase 2: Page Fixes
4. **TASK_004_PAGE_TOP_PADDING.md** - Fix page title overflow on all pages

**⛳ CHECKPOINT 2**: Verify partners.html, contact.html titles visible

### Phase 3: Component Fixes  
5. **TASK_005_AUDIO_PLAYER.md** - Fix audio player icons and styling
6. **TASK_006_GALLERY_FIX.md** - Fix gallery rendering

**⛳ CHECKPOINT 3**: Verify audio controls show icons, gallery loads without shift

### Phase 4: Cleanup
7. **TASK_007_MISC_FIXES.md** - Miscellaneous fixes

**⛳ FINAL CHECKPOINT**: Full verification across all pages and languages

---

## Files to Modify

### HTML Files
```
/index.html
/about.html
/contact.html
/partners.html
/our-actions.html
/fr/index.html, /fr/about.html, /fr/contact.html, /fr/partners.html, /fr/our-actions.html
/uk/index.html, /uk/about.html, /uk/contact.html, /uk/partners.html, /uk/our-actions.html
/de/index.html, /de/about.html, /de/contact.html, /de/partners.html, /de/our-actions.html
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

## Git Workflow (CRITICAL: No `git add .`)

After completing all tasks, commit files INDIVIDUALLY:

```bash
# Create feature branch
git checkout -b fix/full-localization-and-layout

# Stage files individually (NEVER use git add .)
git add index.html
git add about.html
git add contact.html
git add partners.html
git add our-actions.html
git add fr/index.html fr/about.html fr/contact.html fr/partners.html fr/our-actions.html
git add uk/index.html uk/about.html uk/contact.html uk/partners.html uk/our-actions.html
git add de/index.html de/about.html de/contact.html de/partners.html de/our-actions.html
git add assets/css/main.css
git add assets/js/lang-switcher.js
git add assets/js/main.js
# Add other modified files individually

# Commit with descriptive message
git commit -m "fix: localization keys, lang switcher position, hero layout, page padding, audio player, gallery

- Fix i18n key mismatches (hero, manifesto, mission sections)
- Move language switcher after logo
- Add active language indicator (gold underline)
- Fix hero section layout and spacing
- Add proper top padding for internal pages
- Replace audio player text with icons
- Fix gallery loading and layout shift
- Ensure gold color consistency (#D4AF37)"

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

## Session Management Reminder

If using session management:
```
/project:session-start violin-localization-fix
/project:session-update [after each phase]
/project:session-end [when complete]
```

---

## On Failure Protocol

If ANY step fails:

1. **STOP immediately** — do not proceed
2. State what failed (exact error)
3. State your theory about why
4. State what you want to try
5. **Wait for Q's confirmation before proceeding**

Example:
```
FAILED: Replacing hero.supportCta in /fr/index.html
ERROR: File not found at expected path
THEORY: French version may use different structure
PROPOSAL: Search for all HTML files with `find . -name "*.html"`
Q, should I proceed? [wait for response]
```

---

## Emergency Rollback

If something breaks:
```bash
git checkout master
git branch -D fix/full-localization-and-layout
```

---

## Handoff (when stopping or completing)

Leave clear state for next session:
1. **State of work:** done / in progress / untouched
2. **Current blockers:** why stopped, what's needed
3. **Files touched:** list all created/modified/deleted
4. **Recommendations:** what next and why

---

## Support

Project repository: https://github.com/maxfraieho/violin.pp.ua
Live site: https://violin.pp.ua
