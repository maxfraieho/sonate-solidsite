You are an autonomous senior full-stack development agent.  
Your task is to fix and improve the multilingual website project "violin.pp.ua".  
Apply ALL changes listed below.  
Do NOT refactor the project beyond what is explicitly stated.  
Do NOT invent your own UI — keep the existing design system.  
All fixes must work identically in FR, UK, and DE versions.

====================================================================
GLOBAL LOCALIZATION FIXES
====================================================================

1. FIX ALL BROKEN LOCALIZATION KEYS
- Anywhere keys like:
  manifesto.v.title  
  manifesto.v.desc  
  actions.concerts.title  
  hero.supportCta  
  hero.founderCta  
  mission.cohesion.title  
…are displayed as text, replace with correct i18n bindings.

2. ENSURE EVERY PAGE HAS TRANSLATION SUPPORT
- "Mission", "Partenaires / Partners", "Contact", "About", "Founder", "Gallery", "Portfolio"
must all load translations the same way as index page.
- All pages must load i18n.js and include correct `data-i18n` attributes.

3. ENSURE BUTTON hero.founderCta OPENS A TRANSLATED PAGE
- The page opened by this button must have full localization support.
- Replace any duplicated or outdated mission page with the unified version specified in section “MISSION UNIFICATION” below.

====================================================================
HEADER / NAVIGATION FIXES
====================================================================

4. MOVE LANGUAGE SWITCHER INTO ITS CORRECT POSITION
Currently:
- The language flags are placed in the far-left corner (wrong).

Required:
- Place the language switcher **after the logo**, exactly where the user indicated.
- Flags must be vertically stacked on desktop.
- Flags must be horizontally centered on mobile.
- They must never overflow the header.

5. FIX LANGUAGE SWITCHER NAVIGATION
- Ensure switching languages via flags loads the correct page with proper styles (no “broken template” state).
- All language versions must reference styles via an ABSOLUTE path:
  /assets/css/main.css  
  /assets/js/main.js

6. ACTIVE LANGUAGE HIGHLIGHT
- Apply golden underline (border-bottom) on the currently active flag.

====================================================================
HERO SECTION FIXES
====================================================================

7. FIX HERO LOGO SIZE & POSITION
- The Sonata Solidare logo *in the hero* must be moved **below the buttons**, exactly where the user marked.
- Add margin and centering so the layout matches the user-provided reference screenshot.
- The logo must NOT overlap the headline.

8. FIX HERO TEXT & BUTTON POSITIONS
- Raise the hero text slightly (it is currently too low).
- Ensure correct spacing between the logo, text, and CTA buttons.

====================================================================
MISSION PAGE FIXES (CRITICAL)
====================================================================

9. UNIFY MISSION PAGE CONTENT
The website currently has TWO different versions of the Mission page:
- one from the menu,
- one from the "hero.founderCta" button.

Action:
- Keep the **second version** — the visually rich one with cards (Inclusion, Solidarité, Créativité, etc.).
- Replace the older mission page entirely with this unified version in ALL languages.
- Ensure layout is identical to user screenshot.

10. FIX TITLE OVERFLOW ON ALL AFFECTED PAGES  
Pages “Partenaires”, “Contact”, “Mission” currently display the main headline too high (cut off).

Required:
- Add a top margin or padding so the headline is fully visible.
- Ensure the golden underline/header shadow does not overlap text.

====================================================================
CONTACT PAGE FIXES
====================================================================

11. FIX CONTACT PAGE LOCALIZATION
- Headline must be properly translated.
- All labels (“Nom complet”, “Email”, etc.) must use proper i18n keys.

12. ADD TOP PADDING
- Headline on the Contact page must be moved down so it is fully readable.

====================================================================
PARTNERS PAGE FIXES
====================================================================

13. FIX PARTNERS PAGE STRUCTURE
- Add top spacing so title is visible.
- Add full translation support.
- Ensure all text elements use data-i18n.

====================================================================
AUDIO PLAYER FIXES
====================================================================

14. FIX AUDIO CONTROL ICONS
- Replace text labels for prev / play / next / mute with SVG icons.
- Ensure CSS hides default text fallback.

15. FIX VOLUME SLIDER COLOR
- The filled portion of the volume slider must be **gold (#D4AF37 or current project gold)**.
- The round handle and track must also match project styling.

====================================================================
GALLERY FIXES
====================================================================

16. FIX GALLERY RENDERING JUMPS
- Ensure gallery initializes *after* images load.
- Add min-height so layout doesn’t jump.
- Ensure captions always match the selected language.

====================================================================
BANK TRANSFER BLOCK FIX
====================================================================

17. REMOVE UNWANTED <br> TAG  
- In the “Virement Bancaire” block:  
  Leave text "Contactez-nous pour l'IBAN complet"  
  Remove the line break <br>.  
- DO NOT remove the masked IBAN formatting (**** stays).

====================================================================
VERIFY & APPLY COLORS / BRANDING
====================================================================

18. GOLD COLOR CONSISTENCY  
Make sure all UI elements (buttons, icons, sliders, headings) use the project’s official gold color.

====================================================================
FILES TO MODIFY
====================================================================

- /fr/*.html  
- /uk/*.html  
- /de/*.html  
- /assets/js/modules/i18n.js  
- /assets/js/modules/lang-switcher.js  
- /assets/js/modules/player.js  
- /assets/js/modules/gallery.js  
- /assets/css/main.css  
- /assets/css/header.css  
- /assets/css/hero.css  
- /assets/css/mission.css  
- /assets/css/contact.css  
- /assets/css/partners.css  

====================================================================
DELIVERABLES
====================================================================

Your output must include:
1. A commit with ALL fixes applied.  
2. A detailed summary of what was changed.  
3. A confirmation that all languages (FR, UK, DE) render correctly, with no localization keys visible.  
4. Screenshots (or descriptions) of expected UI states after fixes.

Push changes to a new branch:
  fix/full-localization-and-layout

Commit message:
  "Fix full localization system, reposition language switcher, correct hero layout, unify mission page, repair partners/contact pages, improve audio player, fix gallery, remove br, enforce gold styling."

