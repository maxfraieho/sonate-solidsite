# TASK 010: Fix Partners Page

## Priority: 🟡 MEDIUM

## Problem Description
The partners.html page fails to load (returns error or empty content).

## Diagnostic Steps

### Step 1: Check if file exists
```bash
ls -la partners.html
cat partners.html | head -20
```

### Step 2: Check for syntax errors
```bash
# Validate HTML
npx html-validate partners.html

# Or check manually for unclosed tags
grep -n "<\|>" partners.html | head -50
```

### Step 3: Check server response
```bash
curl -I https://violin.pp.ua/partners.html
```

## Common Issues

### Issue 1: File doesn't exist
Create partners.html with proper structure

### Issue 2: Broken HTML (unclosed tags)
Fix HTML syntax

### Issue 3: Missing includes
Check header/footer includes are correct

## Expected Structure

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-i18n="partners.pageTitle">Partenaires | Sonate Solidaire</title>
    <!-- CSS includes -->
</head>
<body>
    <!-- Header -->
    
    <main>
        <!-- Hero Section -->
        <section class="page-hero">
            <h1 data-i18n="partners.title">Nos Partenaires</h1>
            <p data-i18n="partners.subtitle">Ensemble, nous créons l'harmonie</p>
        </section>
        
        <!-- Partners Grid -->
        <section class="partners-section">
            <div class="partners-grid">
                <!-- Partner cards -->
            </div>
        </section>
        
        <!-- Become Partner CTA -->
        <section class="become-partner">
            <h2 data-i18n="partners.becomeCta">Devenir Partenaire</h2>
            <p data-i18n="partners.becomeDesc">Rejoignez notre mission</p>
            <a href="contact.html" data-i18n="partners.contactBtn">Nous contacter</a>
        </section>
    </main>
    
    <!-- Footer -->
</body>
</html>
```

## Verification Checklist

- [ ] partners.html loads without errors
- [ ] Page displays partner logos/cards
- [ ] All text translates correctly
- [ ] "Become partner" CTA works
- [ ] Responsive on mobile
- [ ] Navigation links work

## Git Workflow

```bash
git add partners.html
git commit -m "fix(partners): restore partners page functionality

- Fix HTML structure
- Add partner cards section
- Add become partner CTA"
```
