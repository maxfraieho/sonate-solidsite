# TASK 06: Виправити data-i18n ключі щоб відповідали JSON структурі

## 🔴 КРИТИЧНА ПРОБЛЕМА

**Статус**: HTML файли МАЮТЬ data-i18n атрибути, але ключі НЕ ЗБІГАЮТЬСЯ з JSON структурою!

**Приклади невідповідностей (HTML → JSON):**
```
actions.concerts.title → actions.charity_concerts
actions.concerts.desc → actions.charity_concerts_desc
actions.humanitarian.title → actions.humanitarian
actions.humanitarian.desc → actions.humanitarian_desc
actions.integration.title → actions.community
actions.integration.desc → actions.community_desc
```

## 📋 REASONING PROTOCOL

```
DOING: Fixing data-i18n key mismatches between HTML and JSON
EXPECT: All data-i18n="key.path" in HTML match keys in de.json/uk.json
IF YES: i18n-engine.js will find and apply translations
IF NO: Translations not applied (current state - French shows)
RESULT: /de/about.html shows German text, /uk/index.html shows Ukrainian
MATCHES: User requirement for working multilingual site
THEREFORE: Key alignment is the critical fix
```

## 🎯 МЕТА

Виправити всі `data-i18n` ключі в HTML файлах щоб вони точно відповідали ключам у JSON файлах.

## 📁 ФАЙЛИ ДЛЯ ОБРОБКИ

```
de/index.html
de/about.html
de/contact.html
de/partners.html
de/our-actions.html
uk/index.html
uk/about.html
uk/contact.html
uk/partners.html
uk/our-actions.html
```

## 🔑 ПОВНИЙ MAPPING КЛЮЧІВ (HTML → JSON)

### Секція Actions (Дії):
```
actions.concerts.title    → actions.charity_concerts
actions.concerts.desc     → actions.charity_concerts_desc
actions.humanitarian.title → actions.humanitarian
actions.humanitarian.desc → actions.humanitarian_desc
actions.integration.title → actions.community
actions.integration.desc  → actions.community_desc
```

### Секція Founder (Засновник):
```
founder.bio_preview       → founder.fr_bio_preview
founder.bio_emphasis      → founder.fr_bio_emphasis
founder.education_title   → founder.fr_education_title
founder.education_school1 → founder.fr_education_school1
founder.education_university → founder.fr_education_university
founder.repertoire_title  → founder.fr_repertoire_title
founder.repertoire_classical → founder.fr_repertoire_classical
founder.repertoire_contemporary → founder.fr_repertoire_contemporary
founder.repertoire_folk   → founder.fr_repertoire_folk
founder.repertoire_pop    → founder.fr_repertoire_pop
founder.style_desc        → founder.fr_style_desc
```

## 🔧 BASH СКРИПТ ДЛЯ ВИПРАВЛЕННЯ

Створіть файл `fix-i18n-keys.sh`:

```bash
#!/bin/bash
# ===========================================
# FIX I18N KEY MISMATCHES
# Aligns HTML data-i18n keys with JSON keys
# ===========================================

echo "🔧 Fixing data-i18n key mismatches..."

# Directories to process
DIRS=("de" "uk")

for DIR in "${DIRS[@]}"; do
  echo "Processing /$DIR/ directory..."
  
  for FILE in $DIR/*.html; do
    if [ -f "$FILE" ]; then
      echo "  Fixing: $FILE"
      
      # Actions section key fixes
      sed -i '' 's/data-i18n="actions\.concerts\.title"/data-i18n="actions.charity_concerts"/g' "$FILE"
      sed -i '' 's/data-i18n="actions\.concerts\.desc"/data-i18n="actions.charity_concerts_desc"/g' "$FILE"
      sed -i '' 's/data-i18n="actions\.humanitarian\.title"/data-i18n="actions.humanitarian"/g' "$FILE"
      sed -i '' 's/data-i18n="actions\.humanitarian\.desc"/data-i18n="actions.humanitarian_desc"/g' "$FILE"
      sed -i '' 's/data-i18n="actions\.integration\.title"/data-i18n="actions.community"/g' "$FILE"
      sed -i '' 's/data-i18n="actions\.integration\.desc"/data-i18n="actions.community_desc"/g' "$FILE"
      
      # Founder section key fixes
      sed -i '' 's/data-i18n="founder\.bio_preview"/data-i18n="founder.fr_bio_preview"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.bio_emphasis"/data-i18n="founder.fr_bio_emphasis"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.education_title"/data-i18n="founder.fr_education_title"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.education_school1"/data-i18n="founder.fr_education_school1"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.education_university"/data-i18n="founder.fr_education_university"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.repertoire_title"/data-i18n="founder.fr_repertoire_title"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.repertoire_classical"/data-i18n="founder.fr_repertoire_classical"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.repertoire_contemporary"/data-i18n="founder.fr_repertoire_contemporary"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.repertoire_folk"/data-i18n="founder.fr_repertoire_folk"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.repertoire_pop"/data-i18n="founder.fr_repertoire_pop"/g' "$FILE"
      sed -i '' 's/data-i18n="founder\.style_desc"/data-i18n="founder.fr_style_desc"/g' "$FILE"
      
    fi
  done
done

echo ""
echo "✅ Key fixes applied!"
echo ""
echo "Verifying fixes..."
echo ""

# Verification
echo "=== Checking for OLD keys (should be 0) ==="
grep -r 'data-i18n="actions\.concerts\.' de/ uk/ 2>/dev/null | wc -l | xargs echo "actions.concerts.* count:"
grep -r 'data-i18n="actions\.integration\.' de/ uk/ 2>/dev/null | wc -l | xargs echo "actions.integration.* count:"

echo ""
echo "=== Checking for NEW keys (should be > 0) ==="
grep -r 'data-i18n="actions\.charity_concerts' de/ uk/ 2>/dev/null | wc -l | xargs echo "actions.charity_concerts count:"
grep -r 'data-i18n="actions\.community' de/ uk/ 2>/dev/null | wc -l | xargs echo "actions.community count:"
```

## 🐧 LINUX-СУМІСНА ВЕРСІЯ

Якщо ви на Linux (не macOS), використовуйте цю версію `sed`:

```bash
#!/bin/bash
# Linux version - sed without ''

DIRS=("de" "uk")

for DIR in "${DIRS[@]}"; do
  for FILE in $DIR/*.html; do
    if [ -f "$FILE" ]; then
      echo "Fixing: $FILE"
      
      # Actions section
      sed -i 's/data-i18n="actions\.concerts\.title"/data-i18n="actions.charity_concerts"/g' "$FILE"
      sed -i 's/data-i18n="actions\.concerts\.desc"/data-i18n="actions.charity_concerts_desc"/g' "$FILE"
      sed -i 's/data-i18n="actions\.humanitarian\.title"/data-i18n="actions.humanitarian"/g' "$FILE"
      sed -i 's/data-i18n="actions\.humanitarian\.desc"/data-i18n="actions.humanitarian_desc"/g' "$FILE"
      sed -i 's/data-i18n="actions\.integration\.title"/data-i18n="actions.community"/g' "$FILE"
      sed -i 's/data-i18n="actions\.integration\.desc"/data-i18n="actions.community_desc"/g' "$FILE"
      
      # Founder section
      sed -i 's/data-i18n="founder\.bio_preview"/data-i18n="founder.fr_bio_preview"/g' "$FILE"
      sed -i 's/data-i18n="founder\.bio_emphasis"/data-i18n="founder.fr_bio_emphasis"/g' "$FILE"
      sed -i 's/data-i18n="founder\.education_title"/data-i18n="founder.fr_education_title"/g' "$FILE"
      sed -i 's/data-i18n="founder\.education_school1"/data-i18n="founder.fr_education_school1"/g' "$FILE"
      sed -i 's/data-i18n="founder\.education_university"/data-i18n="founder.fr_education_university"/g' "$FILE"
      sed -i 's/data-i18n="founder\.repertoire_title"/data-i18n="founder.fr_repertoire_title"/g' "$FILE"
      sed -i 's/data-i18n="founder\.repertoire_classical"/data-i18n="founder.fr_repertoire_classical"/g' "$FILE"
      sed -i 's/data-i18n="founder\.repertoire_contemporary"/data-i18n="founder.fr_repertoire_contemporary"/g' "$FILE"
      sed -i 's/data-i18n="founder\.repertoire_folk"/data-i18n="founder.fr_repertoire_folk"/g' "$FILE"
      sed -i 's/data-i18n="founder\.repertoire_pop"/data-i18n="founder.fr_repertoire_pop"/g' "$FILE"
      sed -i 's/data-i18n="founder\.style_desc"/data-i18n="founder.fr_style_desc"/g' "$FILE"
    fi
  done
done

echo "✅ Done!"
```

## 📊 ДЕТАЛЬНИЙ АНАЛІЗ JSON СТРУКТУРИ

### de.json ключі (актуальні):
```json
{
  "nav": {
    "home": "...", "founder": "...", "manifesto": "...",
    "mission": "...", "portfolio": "...", "gallery": "...",
    "contact": "...", "partners": "...", "support": "..."
  },
  "hero": {
    "title": "...", "tagline": "...", "description": "...",
    "cta_support": "...", "cta_founder": "...", "scroll_label": "..."
  },
  "manifesto": {
    "title": "...", "intro": "...", "quote": "...",
    "values": {
      "v_title": "...", "v_desc": "...",
      "i_title": "...", "i_desc": "...",
      "o_title": "...", "o_desc": "...",
      "l_title": "...", "l_desc": "...",
      "i2_title": "...", "i2_desc": "...",
      "n_title": "...", "n_desc": "..."
    }
  },
  "mission": {
    "title": "...", "subtitle": "...", "intro": "...",
    "items": {
      "cohesion": "...", "cohesion_desc": "...",
      "mediation": "...", "mediation_desc": "...",
      "integration": "...", "integration_desc": "..."
    }
  },
  "actions": {
    "title": "...",
    "charity_concerts": "...",
    "charity_concerts_desc": "...",
    "humanitarian": "...",
    "humanitarian_desc": "...",
    "community": "...",
    "community_desc": "..."
  },
  "founder": {
    "title": "...", "biography_tab": "...", "musician_tab": "...",
    "name": "...", "role": "...",
    "ukraine_badge": "...", "switzerland_badge": "...",
    "fr_bio_preview": "...",
    "fr_bio_emphasis": "...",
    "fr_education_title": "...",
    "fr_education_school1": "...",
    "fr_education_university": "...",
    "fr_repertoire_title": "...",
    "fr_repertoire_classical": "...",
    "fr_repertoire_contemporary": "...",
    "fr_repertoire_folk": "...",
    "fr_repertoire_pop": "...",
    "fr_style_desc": "...",
    "bio_expand": "...", "bio_collapse": "...",
    "cv_download_title": "...", "cv_download_desc": "...",
    "cv_french": "...", "cv_french_subtitle": "...",
    "cv_ukrainian": "...", "cv_ukrainian_subtitle": "..."
  },
  "musician_form": { ... },
  "portfolio": { ... },
  "videos": { ... },
  "gallery": { ... },
  "support": { ... },
  "footer": { ... }
}
```

## ✅ КРИТЕРІЇ УСПІХУ

1. [ ] Всі `data-i18n` ключі в `/de/` відповідають ключам у `de.json`
2. [ ] Всі `data-i18n` ключі в `/uk/` відповідають ключам у `uk.json`
3. [ ] `/de/index.html` показує німецький текст
4. [ ] `/uk/index.html` показує український текст
5. [ ] Консоль браузера: `[i18n] Applied translations for: de`

## 🔍 ВЕРИФІКАЦІЯ

```bash
# Перевірити що старі ключі видалені
grep -r 'actions\.concerts\.' de/ uk/ | wc -l  # Має бути 0
grep -r 'actions\.integration\.' de/ uk/ | wc -l  # Має бути 0

# Перевірити що нові ключі є
grep -r 'actions\.charity_concerts' de/ uk/ | wc -l  # Має бути > 0
grep -r 'actions\.community' de/ uk/ | wc -l  # Має бути > 0

# Підрахувати загальну кількість data-i18n
grep -c 'data-i18n=' de/index.html  # Має бути ~50+
grep -c 'data-i18n=' uk/index.html  # Має бути ~50+
```

## 📝 GIT COMMIT

```bash
git add de/ uk/
git commit -m "fix(i18n): align data-i18n keys with JSON structure

CRITICAL FIX:
- Fixed actions.concerts.* → actions.charity_concerts*
- Fixed actions.integration.* → actions.community*
- Fixed founder.bio_* → founder.fr_bio_*
- Fixed founder.education_* → founder.fr_education_*
- Fixed founder.repertoire_* → founder.fr_repertoire_*

Now HTML data-i18n keys match JSON translation keys.
Result: /de/ shows German, /uk/ shows Ukrainian"

git push origin master
```

## 🚀 ВИКОНАННЯ

```bash
cd ~/violin.pp.ua

# 1. Створити скрипт
cat > fix-i18n-keys.sh << 'EOF'
#!/bin/bash
# Paste the Linux version script here
EOF

# 2. Зробити виконуваним
chmod +x fix-i18n-keys.sh

# 3. Запустити
./fix-i18n-keys.sh

# 4. Перевірити
grep -c 'data-i18n="actions.charity_concerts"' de/index.html

# 5. Коміт
git add de/ uk/
git commit -m "fix(i18n): align data-i18n keys with JSON"
git push
```

---

## 🎯 ГОТОВЕ РІШЕННЯ

**Скопіюйте цей скрипт і запустіть на сервері:**

```bash
#!/bin/bash
cd ~/violin.pp.ua

for DIR in de uk; do
  for FILE in $DIR/*.html; do
    [ -f "$FILE" ] || continue
    echo "Fixing: $FILE"
    
    # Actions fixes
    sed -i 's/data-i18n="actions\.concerts\.title"/data-i18n="actions.charity_concerts"/g' "$FILE"
    sed -i 's/data-i18n="actions\.concerts\.desc"/data-i18n="actions.charity_concerts_desc"/g' "$FILE"
    sed -i 's/data-i18n="actions\.humanitarian\.title"/data-i18n="actions.humanitarian"/g' "$FILE"
    sed -i 's/data-i18n="actions\.humanitarian\.desc"/data-i18n="actions.humanitarian_desc"/g' "$FILE"
    sed -i 's/data-i18n="actions\.integration\.title"/data-i18n="actions.community"/g' "$FILE"
    sed -i 's/data-i18n="actions\.integration\.desc"/data-i18n="actions.community_desc"/g' "$FILE"
    
    # Founder fixes
    sed -i 's/data-i18n="founder\.bio_preview"/data-i18n="founder.fr_bio_preview"/g' "$FILE"
    sed -i 's/data-i18n="founder\.bio_emphasis"/data-i18n="founder.fr_bio_emphasis"/g' "$FILE"
    sed -i 's/data-i18n="founder\.education_title"/data-i18n="founder.fr_education_title"/g' "$FILE"
    sed -i 's/data-i18n="founder\.education_school1"/data-i18n="founder.fr_education_school1"/g' "$FILE"
    sed -i 's/data-i18n="founder\.education_university"/data-i18n="founder.fr_education_university"/g' "$FILE"
    sed -i 's/data-i18n="founder\.repertoire_title"/data-i18n="founder.fr_repertoire_title"/g' "$FILE"
    sed -i 's/data-i18n="founder\.repertoire_classical"/data-i18n="founder.fr_repertoire_classical"/g' "$FILE"
    sed -i 's/data-i18n="founder\.repertoire_contemporary"/data-i18n="founder.fr_repertoire_contemporary"/g' "$FILE"
    sed -i 's/data-i18n="founder\.repertoire_folk"/data-i18n="founder.fr_repertoire_folk"/g' "$FILE"
    sed -i 's/data-i18n="founder\.repertoire_pop"/data-i18n="founder.fr_repertoire_pop"/g' "$FILE"
    sed -i 's/data-i18n="founder\.style_desc"/data-i18n="founder.fr_style_desc"/g' "$FILE"
  done
done

echo "✅ All keys fixed!"
git add de/ uk/
git commit -m "fix(i18n): align data-i18n keys with JSON structure"
git push origin master
```
