# TASK 001: Fix All Broken i18n Keys

## Skills: `systematic-debugging`, `verification-before-completion`

## Priority: CRITICAL

## Problem
HTML files use incorrect data-i18n attribute keys that don't match JSON locale files.

---

## Explicit Reasoning Protocol

Before EACH file modification:
```
DOING: Replace data-i18n="[old_key]" with data-i18n="[new_key]" in [filename]
EXPECT: Attribute value changes, file saves without error
IF YES: Proceed to next replacement
IF NO: STOP, report error to Q
```

After EACH file:
```
RESULT: [what happened]
MATCHES: [yes/no]
THEREFORE: [next action or escalate to Q]
```

---

## Key Mapping Table

Replace ALL occurrences in ALL HTML files (index.html, /fr/*.html, /uk/*.html, /de/*.html):

### Hero Section
```
OLD KEY                    → NEW KEY
hero.supportCta            → hero.cta_support
hero.founderCta            → hero.cta_founder
```

### Manifesto Section  
```
OLD KEY                    → NEW KEY
manifesto.v.title          → manifesto.values.v_title
manifesto.v.desc           → manifesto.values.v_desc
manifesto.i.title          → manifesto.values.i_title
manifesto.i.desc           → manifesto.values.i_desc
manifesto.o.title          → manifesto.values.o_title
manifesto.o.desc           → manifesto.values.o_desc
manifesto.l.title          → manifesto.values.l_title
manifesto.l.desc           → manifesto.values.l_desc
manifesto.i2.title         → manifesto.values.i2_title
manifesto.i2.desc          → manifesto.values.i2_desc
manifesto.n.title          → manifesto.values.n_title
manifesto.n.desc           → manifesto.values.n_desc
quote.arsen                → manifesto.quote
```

### Mission Section
```
OLD KEY                    → NEW KEY
mission.cohesion.title     → mission.items.cohesion
mission.cohesion.desc      → mission.items.cohesion_desc
mission.mediation.title    → mission.items.mediation
mission.mediation.desc     → mission.items.mediation_desc
mission.integration.title  → mission.items.integration
mission.integration.desc   → mission.items.integration_desc
```

### Actions Section
```
OLD KEY                    → NEW KEY
actions.concerts.title     → actions.charity_concerts
actions.concerts.desc      → actions.charity_concerts_desc
actions.humanitarian.title → actions.humanitarian
actions.humanitarian.desc  → actions.humanitarian_desc
actions.community.title    → actions.community
actions.community.desc     → actions.community_desc
```

---

## Implementation Steps

### Step 1: Find all HTML files
```
DOING: List all HTML files in project
EXPECT: List of 20+ HTML files across /, /fr/, /uk/, /de/ directories
```

```bash
find . -name "*.html" -type f | sort
```

### Step 2: Replace keys systematically

For each key pair, run sed with explicit reasoning:

```bash
# Hero keys
DOING: Replace hero.supportCta → hero.cta_support
EXPECT: All occurrences replaced, exit code 0

find . -name "*.html" -exec sed -i 's/data-i18n="hero\.supportCta"/data-i18n="hero.cta_support"/g' {} \;

RESULT: [check exit code and grep for remaining old keys]
MATCHES: [yes if no old keys remain]
```

### Step 3: Full replacement commands

```bash
# Hero keys
find . -name "*.html" -exec sed -i 's/data-i18n="hero\.supportCta"/data-i18n="hero.cta_support"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="hero\.founderCta"/data-i18n="hero.cta_founder"/g' {} \;

# Manifesto keys
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.v\.title"/data-i18n="manifesto.values.v_title"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.v\.desc"/data-i18n="manifesto.values.v_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.i\.title"/data-i18n="manifesto.values.i_title"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.i\.desc"/data-i18n="manifesto.values.i_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.o\.title"/data-i18n="manifesto.values.o_title"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.o\.desc"/data-i18n="manifesto.values.o_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.l\.title"/data-i18n="manifesto.values.l_title"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.l\.desc"/data-i18n="manifesto.values.l_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.i2\.title"/data-i18n="manifesto.values.i2_title"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.i2\.desc"/data-i18n="manifesto.values.i2_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.n\.title"/data-i18n="manifesto.values.n_title"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="manifesto\.n\.desc"/data-i18n="manifesto.values.n_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="quote\.arsen"/data-i18n="manifesto.quote"/g' {} \;

# Mission keys
find . -name "*.html" -exec sed -i 's/data-i18n="mission\.cohesion\.title"/data-i18n="mission.items.cohesion"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="mission\.cohesion\.desc"/data-i18n="mission.items.cohesion_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="mission\.mediation\.title"/data-i18n="mission.items.mediation"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="mission\.mediation\.desc"/data-i18n="mission.items.mediation_desc"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="mission\.integration\.title"/data-i18n="mission.items.integration"/g' {} \;
find . -name "*.html" -exec sed -i 's/data-i18n="mission\.integration\.desc"/data-i18n="mission.items.integration_desc"/g' {} \;
```

---

## ⛳ Verification Checkpoint

After all replacements, VERIFY no broken keys remain:

```bash
DOING: Search for any remaining old keys
EXPECT: No matches found (exit code 1)

grep -rn "data-i18n=\"hero\.\(supportCta\|founderCta\)\"" --include="*.html"
grep -rn "data-i18n=\"manifesto\.\(v\|i\|o\|l\|n\)\.\(title\|desc\)\"" --include="*.html"
grep -rn "data-i18n=\"mission\.\(cohesion\|mediation\|integration\)\.\(title\|desc\)\"" --include="*.html"

RESULT: [record output]
MATCHES: [yes if no matches]
THEREFORE: [proceed to TASK_002 or report remaining issues to Q]
```

---

## Handoff

When complete, document:
- Files modified: [list]
- Keys replaced: [count]
- Remaining issues: [if any]
- Ready for: TASK_002_HEADER_LANG_SWITCHER.md
