# TASK 04: Виправити навігаційні посилання

## 🎯 МЕТА
Виправити всі навігаційні посилання щоб вони зберігали поточну мову.

## 📋 REASONING PROTOCOL

```
DOING: Fixing navigation links to preserve language context
EXPECT: All nav links include language prefix
IF YES: User stays in their language when navigating
IF NO: Check link generation logic
RESULT: Clicking "Contact" on /de/ goes to /de/contact.html
MATCHES: Language context preserved across navigation
THEREFORE: Navigation is language-aware
```

## 🔴 ПОТОЧНА ПРОБЛЕМА

Навігаційні посилання НЕ враховують мову:

```html
<!-- ❌ НЕПРАВИЛЬНО (на сторінці /de/about.html) -->
<a href="/index.html#fondateur">Fondateur</a>
<a href="/contact.html">Contact</a>

<!-- ✅ ПРАВИЛЬНО -->
<a href="/de/index.html#fondateur">Gründer</a>
<a href="/de/contact.html">Kontakt</a>
```

## 📁 РІШЕННЯ 1: JavaScript автоматичне оновлення

Додати в `i18n-engine.js` або створити `nav-lang-fix.js`:

```javascript
/**
 * Navigation Language Fix
 * Automatically updates navigation links to include current language
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    fixNavigationLinks();
  });

  function fixNavigationLinks() {
    const currentPath = window.location.pathname;
    const currentLang = detectLanguage(currentPath);
    
    // Skip if we're on root (no language prefix needed for FR default)
    if (currentLang === 'fr' && !currentPath.startsWith('/fr/')) {
      return;
    }

    // Find all navigation links
    const navLinks = document.querySelectorAll('nav a, .nav-menu a, header a:not(.lang-btn)');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (!href) return;
      
      // Skip external links, anchors-only, and already-prefixed links
      if (href.startsWith('http') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') ||
          href.startsWith('#') ||
          href.startsWith(`/${currentLang}/`)) {
        return;
      }
      
      // Fix relative and absolute internal links
      let newHref = href;
      
      if (href.startsWith('/')) {
        // Absolute path - add language prefix
        // Remove any existing language prefix first
        newHref = href.replace(/^\/(fr|de|uk)\//, '/');
        newHref = `/${currentLang}${newHref}`;
      } else if (!href.includes('://')) {
        // Relative path - convert to absolute with language
        newHref = `/${currentLang}/${href}`;
      }
      
      // Handle hash links (anchors)
      if (href.includes('#') && !href.startsWith('#')) {
        const [path, hash] = href.split('#');
        const fixedPath = path.startsWith('/') 
          ? `/${currentLang}${path.replace(/^\/(fr|de|uk)\//, '/')}`
          : `/${currentLang}/${path}`;
        newHref = `${fixedPath}#${hash}`;
      }
      
      if (newHref !== href) {
        link.setAttribute('href', newHref);
        console.log(`[nav-fix] ${href} → ${newHref}`);
      }
    });

    console.log('[nav-fix] Navigation links updated for:', currentLang);
  }

  function detectLanguage(path) {
    if (path.startsWith('/de/')) return 'de';
    if (path.startsWith('/uk/')) return 'uk';
    if (path.startsWith('/fr/')) return 'fr';
    return 'fr';
  }

})();
```

## 📁 РІШЕННЯ 2: Оновити посилання в HTML напряму

Для кожного мовного варіанту сторінок, посилання мають включати мовний префікс:

### Шаблон для /de/ сторінок:

```html
<nav>
  <a href="/de/index.html" data-i18n="nav.home">Startseite</a>
  <a href="/de/index.html#fondateur" data-i18n="nav.founder">Gründer</a>
  <a href="/de/index.html#manifesto" data-i18n="nav.manifesto">Manifest</a>
  <a href="/de/about.html" data-i18n="nav.mission">Mission</a>
  <a href="/de/our-actions.html" data-i18n="nav.portfolio">Portfolio</a>
  <a href="/de/gallery.html" data-i18n="nav.gallery">Galerie</a>
  <a href="/de/contact.html" data-i18n="nav.contact">Kontakt</a>
  <a href="/de/partners.html" data-i18n="nav.partners">Partner</a>
</nav>
```

### Шаблон для /uk/ сторінок:

```html
<nav>
  <a href="/uk/index.html" data-i18n="nav.home">Головна</a>
  <a href="/uk/index.html#fondateur" data-i18n="nav.founder">Засновник</a>
  <a href="/uk/index.html#manifesto" data-i18n="nav.manifesto">Маніфест</a>
  <a href="/uk/about.html" data-i18n="nav.mission">Місія</a>
  <a href="/uk/our-actions.html" data-i18n="nav.portfolio">Портфоліо</a>
  <a href="/uk/gallery.html" data-i18n="nav.gallery">Галерея</a>
  <a href="/uk/contact.html" data-i18n="nav.contact">Контакт</a>
  <a href="/uk/partners.html" data-i18n="nav.partners">Партнери</a>
</nav>
```

## 🔧 СКРИПТ МАСОВОЇ ЗАМІНИ

```bash
#!/bin/bash
# Skill hint: /systematic-debugging

# Fix links in /de/ pages
for file in de/*.html; do
  if [ -f "$file" ]; then
    # Replace href="/xxx" with href="/de/xxx" (excluding already prefixed)
    sed -i.bak -E 's|href="/([^d][^e][^/])|href="/de/\1|g' "$file"
    sed -i.bak -E 's|href="/([a-z])|href="/de/\1|g' "$file"
    
    # More precise: replace specific pages
    sed -i.bak 's|href="/index.html|href="/de/index.html|g' "$file"
    sed -i.bak 's|href="/about.html|href="/de/about.html|g' "$file"
    sed -i.bak 's|href="/contact.html|href="/de/contact.html|g' "$file"
    sed -i.bak 's|href="/partners.html|href="/de/partners.html|g' "$file"
    sed -i.bak 's|href="/our-actions.html|href="/de/our-actions.html|g' "$file"
    sed -i.bak 's|href="/events.html|href="/de/events.html|g' "$file"
    sed -i.bak 's|href="/news.html|href="/de/news.html|g' "$file"
    sed -i.bak 's|href="/donate.html|href="/de/donate.html|g' "$file"
    sed -i.bak 's|href="/gallery.html|href="/de/gallery.html|g' "$file"
    
    echo "[FIXED] $file"
  fi
done

# Same for /uk/
for file in uk/*.html; do
  if [ -f "$file" ]; then
    sed -i.bak 's|href="/index.html|href="/uk/index.html|g' "$file"
    sed -i.bak 's|href="/about.html|href="/uk/about.html|g' "$file"
    sed -i.bak 's|href="/contact.html|href="/uk/contact.html|g' "$file"
    sed -i.bak 's|href="/partners.html|href="/uk/partners.html|g' "$file"
    sed -i.bak 's|href="/our-actions.html|href="/uk/our-actions.html|g' "$file"
    sed -i.bak 's|href="/events.html|href="/uk/events.html|g' "$file"
    sed -i.bak 's|href="/news.html|href="/uk/news.html|g' "$file"
    sed -i.bak 's|href="/donate.html|href="/uk/donate.html|g' "$file"
    sed -i.bak 's|href="/gallery.html|href="/uk/gallery.html|g' "$file"
    
    echo "[FIXED] $file"
  fi
done

# Cleanup backups
find . -name "*.bak" -delete

echo "=== Verification ==="
grep -h 'href="/' de/about.html | head -5
```

## ✅ КРИТЕРІЇ УСПІХУ

1. [ ] На `/de/about.html` всі навігаційні посилання ведуть на `/de/`
2. [ ] На `/uk/index.html` всі посилання ведуть на `/uk/`
3. [ ] Anchor links (`#fondateur`) працюють з мовним префіксом
4. [ ] Мобільне меню також має правильні посилання
5. [ ] Footer links також оновлені

## 🔍 ВЕРИФІКАЦІЯ

```bash
# Перевірити посилання на DE сторінці
grep -o 'href="[^"]*"' de/about.html | sort | uniq

# Все має починатися з /de/ або бути зовнішнім
# Не має бути: href="/index.html", href="/contact.html"
```

## 📝 GIT COMMIT

```bash
git add -A
git commit -m "fix(nav): update navigation links to preserve language context

- All links on /de/ pages now point to /de/ versions
- All links on /uk/ pages now point to /uk/ versions  
- Added JavaScript fallback for dynamic link fixing
- Anchor links properly prefixed with language"
```
