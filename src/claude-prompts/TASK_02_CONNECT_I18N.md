# TASK 02: Підключити i18n до ВСІХ сторінок

## 🎯 МЕТА
Додати `<script src="/assets/js/i18n-engine.js">` до ВСІХ HTML сторінок у папках `/fr/`, `/de/`, `/uk/` та корені.

## 📋 REASONING PROTOCOL

```
DOING: Adding i18n-engine.js script to all HTML pages
EXPECT: All pages in /fr/, /de/, /uk/ include the script tag
IF YES: Translations will be loaded and applied automatically
IF NO: Check file paths, script placement
RESULT: /de/about.html shows German text instead of French
MATCHES: User sees correct language based on URL path
THEREFORE: i18n connection is successful
```

## 📁 СПИСОК СТОРІНОК ДЛЯ ОНОВЛЕННЯ

### Кореневі сторінки:
- `index.html`
- `about.html`
- `contact.html`
- `partners.html`
- `our-actions.html`
- `events.html`
- `news.html`
- `donate.html`
- `gallery.html` (якщо існує)

### Папка /fr/:
- `fr/index.html`
- `fr/about.html`
- `fr/contact.html`
- `fr/partners.html`
- `fr/our-actions.html`
- `fr/events.html`
- `fr/news.html`
- `fr/donate.html`

### Папка /de/:
- `de/index.html`
- `de/about.html`
- `de/contact.html`
- `de/partners.html`
- `de/our-actions.html`
- `de/events.html`
- `de/news.html`
- `de/donate.html`

### Папка /uk/:
- `uk/index.html`
- `uk/about.html`
- `uk/contact.html`
- `uk/partners.html`
- `uk/our-actions.html`
- `uk/events.html`
- `uk/news.html`
- `uk/donate.html`

## 🔧 СКРИПТ ДЛЯ МАСОВОГО ОНОВЛЕННЯ

```bash
#!/bin/bash
# Skill hint: /systematic-debugging

# Script tag to add (before </body>)
SCRIPT_TAG='<script src="/assets/js/i18n-engine.js"></script>'

# Find all HTML files and add script if not present
find . -name "*.html" -type f | while read file; do
  # Skip node_modules, .git, etc.
  if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".git"* ]]; then
    continue
  fi
  
  # Check if script already exists
  if grep -q "i18n-engine.js" "$file"; then
    echo "[SKIP] Already has i18n-engine.js: $file"
    continue
  fi
  
  # Check if file has </body> tag
  if grep -q "</body>" "$file"; then
    # Add script before </body>
    sed -i.bak 's|</body>|'"$SCRIPT_TAG"'\n</body>|' "$file"
    echo "[ADDED] $file"
    rm -f "${file}.bak"
  else
    echo "[WARN] No </body> tag found: $file"
  fi
done

echo ""
echo "=== Verification ==="
echo "Files with i18n-engine.js:"
grep -rl "i18n-engine.js" --include="*.html" . | wc -l
```

## 📝 АЛЬТЕРНАТИВНИЙ МЕТОД (sed команди)

```bash
# Для кожної папки окремо:

# Корінь
for f in index.html about.html contact.html partners.html our-actions.html events.html news.html donate.html; do
  [ -f "$f" ] && sed -i.bak 's|</body>|<script src="/assets/js/i18n-engine.js"></script>\n</body>|' "$f"
done

# /fr/
for f in fr/*.html; do
  [ -f "$f" ] && sed -i.bak 's|</body>|<script src="/assets/js/i18n-engine.js"></script>\n</body>|' "$f"
done

# /de/
for f in de/*.html; do
  [ -f "$f" ] && sed -i.bak 's|</body>|<script src="/assets/js/i18n-engine.js"></script>\n</body>|' "$f"
done

# /uk/
for f in uk/*.html; do
  [ -f "$f" ] && sed -i.bak 's|</body>|<script src="/assets/js/i18n-engine.js"></script>\n</body>|' "$f"
done

# Cleanup backup files
find . -name "*.bak" -delete
```

## ⚠️ ВАЖЛИВО: Порядок скриптів

Скрипт `i18n-engine.js` має бути підключений **ПІСЛЯ** основних скриптів, але **ПЕРЕД** `</body>`:

```html
    <!-- Existing scripts -->
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/audio-player.js"></script>
    
    <!-- i18n MUST be last before </body> -->
    <script src="/assets/js/i18n-engine.js"></script>
</body>
</html>
```

## ✅ КРИТЕРІЇ УСПІХУ

1. [ ] Всі HTML файли містять `<script src="/assets/js/i18n-engine.js">`
2. [ ] Скрипт розміщений перед `</body>`
3. [ ] `/de/about.html` показує німецький текст
4. [ ] `/uk/index.html` показує український текст
5. [ ] Консоль показує `[i18n] Loaded de.json` при відкритті `/de/` сторінки

## 🔍 ВЕРИФІКАЦІЯ

```bash
# Перевірити кількість файлів з i18n-engine.js
echo "Files with i18n-engine.js:"
grep -rl "i18n-engine.js" --include="*.html" . | wc -l

# Має бути >= 24 файли (8 сторінок × 3 мови + корінь)

# Перевірити конкретний файл
grep "i18n-engine.js" de/about.html
```

## 📝 GIT COMMIT

```bash
git add -A
git commit -m "feat(i18n): connect i18n-engine.js to all HTML pages

- Added script tag to all pages in /fr/, /de/, /uk/
- Added script tag to root pages
- Script loads after main.js for proper initialization
- Enables automatic translation loading based on URL path"
```
