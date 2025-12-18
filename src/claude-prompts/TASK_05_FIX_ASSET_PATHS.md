# TASK 05: Виправити шляхи до assets в /uk/ та /de/

## 🔴 КРИТИЧНА ПРОБЛЕМА

Всі шляхи до CSS, JS, зображень у папках `/uk/` та `/de/` є **відносними**, що ламає завантаження:

```html
<!-- ❌ ЗАРАЗ (в /uk/index.html) -->
<link rel="stylesheet" href="assets/css/tailwind.css">
<!-- Браузер шукає: /uk/assets/css/tailwind.css — 404! -->

<!-- ✅ ПРАВИЛЬНО -->
<link rel="stylesheet" href="/assets/css/tailwind.css">
<!-- Браузер шукає: /assets/css/tailwind.css — OK -->
```

## 📋 REASONING PROTOCOL

```
DOING: Converting relative asset paths to absolute paths
EXPECT: All href="assets/..." become href="/assets/..."
IF YES: CSS, JS, images load correctly on /uk/ and /de/ pages
IF NO: Check sed patterns, verify file changes
RESULT: /uk/index.html page has proper styling
MATCHES: Screenshot shows styled page, not broken layout
THEREFORE: Asset paths are fixed
```

## 🔧 МАСОВА ЗАМІНА

```bash
#!/bin/bash
# Skill hint: /systematic-debugging

echo "=== Fixing asset paths in /uk/ ===" 

for file in uk/*.html; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    
    # Fix CSS paths
    sed -i.bak 's|href="assets/|href="/assets/|g' "$file"
    
    # Fix JS paths  
    sed -i.bak 's|src="assets/|src="/assets/|g' "$file"
    
    # Fix image paths
    sed -i.bak 's|src="apple-touch-icon|src="/apple-touch-icon|g' "$file"
    sed -i.bak 's|href="apple-touch-icon|href="/apple-touch-icon|g' "$file"
    sed -i.bak 's|href="favicon|href="/favicon|g' "$file"
    
    # Fix lang attribute
    sed -i.bak 's|lang="fr"|lang="uk"|g' "$file"
    
    rm -f "${file}.bak"
  fi
done

echo ""
echo "=== Fixing asset paths in /de/ ==="

for file in de/*.html; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    
    # Fix CSS paths
    sed -i.bak 's|href="assets/|href="/assets/|g' "$file"
    
    # Fix JS paths
    sed -i.bak 's|src="assets/|src="/assets/|g' "$file"
    
    # Fix image paths
    sed -i.bak 's|src="apple-touch-icon|src="/apple-touch-icon|g' "$file"
    sed -i.bak 's|href="apple-touch-icon|href="/apple-touch-icon|g' "$file"
    sed -i.bak 's|href="favicon|href="/favicon|g' "$file"
    
    # Fix lang attribute
    sed -i.bak 's|lang="fr"|lang="de"|g' "$file"
    
    rm -f "${file}.bak"
  fi
done

echo ""
echo "=== Verification ==="
echo "Checking /uk/index.html CSS paths:"
grep -o 'href="[^"]*css[^"]*"' uk/index.html | head -5

echo ""
echo "Checking /de/index.html CSS paths:"
grep -o 'href="[^"]*css[^"]*"' de/index.html | head -5
```

## 📝 ДЕТАЛЬНИЙ СПИСОК ЗАМІН

### CSS файли (в `<head>`):
```
href="assets/css/tailwind.css"       → href="/assets/css/tailwind.css"
href="assets/css/audio-player.css"   → href="/assets/css/audio-player.css"
href="assets/css/gallery-masonry.css" → href="/assets/css/gallery-masonry.css"
href="assets/css/hero-video.css"     → href="/assets/css/hero-video.css"
href="assets/css/cookie-banner.css"  → href="/assets/css/cookie-banner.css"
```

### JS файли (перед `</body>`):
```
src="assets/js/main.js"              → src="/assets/js/main.js"
src="assets/js/audio-player.js"      → src="/assets/js/audio-player.js"
src="assets/js/cookie-consent.js"    → src="/assets/js/cookie-consent.js"
src="assets/js/hero-video.js"        → src="/assets/js/hero-video.js"
src="assets/js/i18n-engine.js"       → src="/assets/js/i18n-engine.js"
```

### Зображення:
```
src="assets/img/..."                 → src="/assets/img/..."
```

### Favicon:
```
href="apple-touch-icon-57x57.png"    → href="/apple-touch-icon-57x57.png"
href="favicon.ico"                   → href="/favicon.ico"
```

### HTML атрибут lang:
```
lang="fr"                            → lang="uk" (для /uk/)
lang="fr"                            → lang="de" (для /de/)
```

## ⚠️ ВАЖЛИВО

НЕ чіпати:
- Зовнішні URL (https://...)
- CDN посилання (cdn.jsdelivr.net, fonts.googleapis.com)
- Якорні посилання (#section)

## ✅ КРИТЕРІЇ УСПІХУ

1. [ ] Всі `href="assets/` замінено на `href="/assets/`
2. [ ] Всі `src="assets/` замінено на `src="/assets/`
3. [ ] `lang="uk"` в `/uk/` сторінках
4. [ ] `lang="de"` в `/de/` сторінках
5. [ ] `/uk/index.html` відображає CSS стилі
6. [ ] Зображення завантажуються

## 🔍 ВЕРИФІКАЦІЯ

```bash
# Перевірити що немає відносних шляхів
echo "Relative paths remaining in /uk/:"
grep -c 'href="assets/' uk/*.html 2>/dev/null || echo "0"
grep -c 'src="assets/' uk/*.html 2>/dev/null || echo "0"

echo "Relative paths remaining in /de/:"
grep -c 'href="assets/' de/*.html 2>/dev/null || echo "0"
grep -c 'src="assets/' de/*.html 2>/dev/null || echo "0"

# Має бути 0 для всіх
```

## 📝 GIT COMMIT

```bash
git add uk/ de/
git commit -m "fix(assets): convert relative paths to absolute in /uk/ and /de/

CRITICAL FIX:
- Changed href=\"assets/\" to href=\"/assets/\" in all HTML files
- Changed src=\"assets/\" to src=\"/assets/\" in all HTML files  
- Fixed lang attribute: lang=\"uk\" for /uk/, lang=\"de\" for /de/
- Fixed favicon and apple-touch-icon paths

This fixes the broken layout on /uk/ and /de/ pages where
CSS/JS/images were not loading due to incorrect relative paths."
```
