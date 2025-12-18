# TASK 06: Виправлення невідповідності ключів i18n

## 🔴 КРИТИЧНА ПРОБЛЕМА

**Статус**: data-i18n атрибути є в HTML, але ключі НЕ ЗБІГАЮТЬСЯ з JSON

**Причина**: HTML використовує одні ключі, JSON — інші

**Приклади невідповідності**:
| HTML (data-i18n)       | JSON ключ              | Має бути |
|------------------------|------------------------|----------|
| `hero.supportCta`      | `hero.cta_support`     | Виправити HTML |
| `hero.founderCta`      | `hero.cta_founder`     | Виправити HTML |
| `manifesto.v.title`    | `manifesto.values.v_title` | Виправити HTML |
| `manifesto.v.desc`     | `manifesto.values.v_desc`  | Виправити HTML |
| `manifesto.i.title`    | `manifesto.values.i_title` | Виправити HTML |
| `manifesto.i.desc`     | `manifesto.values.i_desc`  | Виправити HTML |
| `manifesto.o.title`    | `manifesto.values.o_title` | Виправити HTML |
| `manifesto.o.desc`     | `manifesto.values.o_desc`  | Виправити HTML |
| `manifesto.l.title`    | `manifesto.values.l_title` | Виправити HTML |
| `manifesto.l.desc`     | `manifesto.values.l_desc`  | Виправити HTML |
| `manifesto.i2.title`   | `manifesto.values.i2_title`| Виправити HTML |
| `manifesto.i2.desc`    | `manifesto.values.i2_desc` | Виправити HTML |
| `manifesto.n.title`    | `manifesto.values.n_title` | Виправити HTML |
| `manifesto.n.desc`     | `manifesto.values.n_desc`  | Виправити HTML |
| `quote.arsen`          | `manifesto.quote`       | Виправити HTML |
| `mission.cohesion.title` | `mission.items.cohesion` | Виправити HTML |
| `mission.cohesion.desc`  | `mission.items.cohesion_desc` | Виправити HTML |

## 📋 REASONING PROTOCOL

```
DOING: Fix i18n key mismatches between HTML and JSON
EXPECT: All data-i18n keys in HTML match JSON structure
IF YES: i18n-engine.js can find and apply translations
IF NO: Translation returns undefined, French text stays
RESULT: German/Ukrainian text appears on /de/ and /uk/ pages
MATCHES: User sees correct language on correct URL
THEREFORE: Multilingual system is fully functional
```

## 🎯 ПЛАН ДІЙ

**Стратегія**: Виправити HTML ключі щоб відповідали JSON структурі (не чіпаємо JSON)

**Чому HTML, а не JSON?**: 
- JSON файли вже мають логічну вкладену структуру
- Легше знайти/замінити в HTML через sed
- JSON структура (`values.v_title`) краща за плоску (`v.title`)

## 🔧 АВТОМАТИЧНЕ ВИПРАВЛЕННЯ

### Крок 1: Створити скрипт fix-i18n-keys.sh

```bash
#!/bin/bash
# fix-i18n-keys.sh - Виправляє невідповідність ключів i18n

set -e

echo "🔧 Fixing i18n key mismatches..."

# Файли для обробки
FILES=(
    "index.html"
    "fr/index.html"
    "de/index.html"
    "uk/index.html"
    "about.html"
    "fr/about.html"
    "de/about.html"
    "uk/about.html"
    "contact.html"
    "fr/contact.html"
    "de/contact.html"
    "uk/contact.html"
    "partners.html"
    "fr/partners.html"
    "de/partners.html"
    "uk/partners.html"
    "our-actions.html"
    "fr/our-actions.html"
    "de/our-actions.html"
    "uk/our-actions.html"
)

# Функція для заміни ключів
fix_keys() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  Skipping (not found): $file"
        return
    fi
    
    echo "📝 Processing: $file"
    
    # Hero section keys
    sed -i 's/data-i18n="hero\.supportCta"/data-i18n="hero.cta_support"/g' "$file"
    sed -i 's/data-i18n="hero\.founderCta"/data-i18n="hero.cta_founder"/g' "$file"
    
    # Manifesto section keys (v, i, o, l, i2, n)
    sed -i 's/data-i18n="manifesto\.v\.title"/data-i18n="manifesto.values.v_title"/g' "$file"
    sed -i 's/data-i18n="manifesto\.v\.desc"/data-i18n="manifesto.values.v_desc"/g' "$file"
    sed -i 's/data-i18n="manifesto\.i\.title"/data-i18n="manifesto.values.i_title"/g' "$file"
    sed -i 's/data-i18n="manifesto\.i\.desc"/data-i18n="manifesto.values.i_desc"/g' "$file"
    sed -i 's/data-i18n="manifesto\.o\.title"/data-i18n="manifesto.values.o_title"/g' "$file"
    sed -i 's/data-i18n="manifesto\.o\.desc"/data-i18n="manifesto.values.o_desc"/g' "$file"
    sed -i 's/data-i18n="manifesto\.l\.title"/data-i18n="manifesto.values.l_title"/g' "$file"
    sed -i 's/data-i18n="manifesto\.l\.desc"/data-i18n="manifesto.values.l_desc"/g' "$file"
    sed -i 's/data-i18n="manifesto\.i2\.title"/data-i18n="manifesto.values.i2_title"/g' "$file"
    sed -i 's/data-i18n="manifesto\.i2\.desc"/data-i18n="manifesto.values.i2_desc"/g' "$file"
    sed -i 's/data-i18n="manifesto\.n\.title"/data-i18n="manifesto.values.n_title"/g' "$file"
    sed -i 's/data-i18n="manifesto\.n\.desc"/data-i18n="manifesto.values.n_desc"/g' "$file"
    
    # Quote section
    sed -i 's/data-i18n="quote\.arsen"/data-i18n="manifesto.quote"/g' "$file"
    
    # Mission section keys
    sed -i 's/data-i18n="mission\.cohesion\.title"/data-i18n="mission.items.cohesion"/g' "$file"
    sed -i 's/data-i18n="mission\.cohesion\.desc"/data-i18n="mission.items.cohesion_desc"/g' "$file"
    sed -i 's/data-i18n="mission\.mediation\.title"/data-i18n="mission.items.mediation"/g' "$file"
    sed -i 's/data-i18n="mission\.mediation\.desc"/data-i18n="mission.items.mediation_desc"/g' "$file"
    sed -i 's/data-i18n="mission\.integration\.title"/data-i18n="mission.items.integration"/g' "$file"
    sed -i 's/data-i18n="mission\.integration\.desc"/data-i18n="mission.items.integration_desc"/g' "$file"
    
    # Actions section keys
    sed -i 's/data-i18n="actions\.concerts\.title"/data-i18n="actions.charity_concerts"/g' "$file"
    sed -i 's/data-i18n="actions\.concerts\.desc"/data-i18n="actions.charity_concerts_desc"/g' "$file"
    sed -i 's/data-i18n="actions\.humanitarian\.title"/data-i18n="actions.humanitarian"/g' "$file"
    sed -i 's/data-i18n="actions\.humanitarian\.desc"/data-i18n="actions.humanitarian_desc"/g' "$file"
    sed -i 's/data-i18n="actions\.integration\.title"/data-i18n="actions.community"/g' "$file"
    sed -i 's/data-i18n="actions\.integration\.desc"/data-i18n="actions.community_desc"/g' "$file"
    
    # Founder section keys
    sed -i 's/data-i18n="founder\.fr_bio_preview"/data-i18n="founder.fr_bio_preview"/g' "$file"
    sed -i 's/data-i18n="founder\.fr_bio_emphasis"/data-i18n="founder.fr_bio_emphasis"/g' "$file"
    
    # Support section keys
    sed -i 's/data-i18n="support\.donation_tab"/data-i18n="support.donation_tab"/g' "$file"
    sed -i 's/data-i18n="support\.contact_tab"/data-i18n="support.contact_tab"/g' "$file"
    
    # Footer section keys
    sed -i 's/data-i18n="footer\.quick_links"/data-i18n="footer.quick_links"/g' "$file"
    sed -i 's/data-i18n="footer\.contact_section"/data-i18n="footer.contact_section"/g' "$file"
}

# Обробити всі файли
for file in "${FILES[@]}"; do
    fix_keys "$file"
done

echo ""
echo "✅ All i18n keys fixed!"
echo ""
echo "📊 Verification:"
echo "Run: grep -c 'data-i18n=' index.html"
echo "Expected: 50+ occurrences"
```

### Крок 2: Виконати скрипт

```bash
cd ~/violin.pp.ua
chmod +x fix-i18n-keys.sh
./fix-i18n-keys.sh
```

## 📊 ПОВНИЙ МАППІНГ КЛЮЧІВ

### JSON Структура (uk.json / de.json)

```
nav.
├── home
├── founder
├── manifesto
├── mission
├── portfolio
├── gallery
├── contact
├── partners
└── support

hero.
├── title
├── tagline
├── description
├── cta_support      ← HTML має hero.supportCta
├── cta_founder      ← HTML має hero.founderCta
└── scroll_label

manifesto.
├── title
├── intro
├── values.          ← HTML має manifesto.v.* замість manifesto.values.v_*
│   ├── v_title
│   ├── v_desc
│   ├── i_title
│   ├── i_desc
│   ├── o_title
│   ├── o_desc
│   ├── l_title
│   ├── l_desc
│   ├── i2_title
│   ├── i2_desc
│   ├── n_title
│   └── n_desc
└── quote            ← HTML має quote.arsen

mission.
├── title
├── subtitle
├── intro
└── items.           ← HTML має mission.cohesion.* замість mission.items.*
    ├── cohesion
    ├── cohesion_desc
    ├── mediation
    ├── mediation_desc
    ├── integration
    └── integration_desc

actions.
├── title
├── charity_concerts       ← HTML має actions.concerts.title
├── charity_concerts_desc  ← HTML має actions.concerts.desc
├── humanitarian
├── humanitarian_desc
├── community              ← HTML має actions.integration.title
└── community_desc         ← HTML має actions.integration.desc

founder.
├── title
├── biography_tab
├── musician_tab
├── name
├── role
├── ukraine_badge
├── switzerland_badge
├── fr_bio_preview
├── fr_bio_emphasis
├── fr_education_title
├── fr_education_school1
├── fr_education_university
├── fr_repertoire_title
├── fr_repertoire_classical
├── fr_repertoire_contemporary
├── fr_repertoire_folk
├── fr_repertoire_pop
├── fr_style_desc
├── bio_expand
├── bio_collapse
├── cv_download_title
├── cv_download_desc
├── cv_french
├── cv_french_subtitle
├── cv_ukrainian
└── cv_ukrainian_subtitle

portfolio.
├── title
├── description
├── playlist_title
├── select_track
├── artist
├── prev_track
├── play_pause
├── next_track
├── shuffle
├── mute
├── track_1 ... track_7

gallery.
├── title
├── description
├── zoom_alt
├── photo_*_caption
└── photo_*_alt

support.
├── title
├── description
├── donation_tab
├── contact_tab
├── donation_title
├── bank_transfer
├── bank_transfer_text
├── twint
├── twint_phone
├── contact_info_title
├── contact_name
├── phone_label
├── contact_phone
├── contact_email
├── telegram_button
└── telegram_write

footer.
├── description
├── location
├── quick_links
├── contact_section
├── telegram
├── youtube
├── donate_link
├── copyright
├── developed_with
├── heart
└── in_switzerland
```

## 🔍 ПЕРЕВІРКА ПІСЛЯ ВИКОНАННЯ

### Тест 1: Перевірити кількість атрибутів
```bash
echo "=== data-i18n count per file ==="
for f in index.html de/index.html uk/index.html; do
    count=$(grep -c 'data-i18n=' "$f" 2>/dev/null || echo "0")
    echo "$f: $count attributes"
done
```

### Тест 2: Перевірити що старі ключі видалені
```bash
echo "=== Checking for OLD keys (should be 0) ==="
grep -r 'hero\.supportCta' *.html */*.html 2>/dev/null | wc -l
grep -r 'manifesto\.v\.title' *.html */*.html 2>/dev/null | wc -l
grep -r 'quote\.arsen' *.html */*.html 2>/dev/null | wc -l
```

### Тест 3: Перевірити що нові ключі присутні
```bash
echo "=== Checking for NEW keys (should be > 0) ==="
grep -r 'hero\.cta_support' *.html */*.html 2>/dev/null | wc -l
grep -r 'manifesto\.values\.v_title' *.html */*.html 2>/dev/null | wc -l
grep -r 'manifesto\.quote' *.html */*.html 2>/dev/null | wc -l
```

### Тест 4: Браузер перевірка
```bash
# Відкрити в браузері та перевірити консоль
open https://violin.pp.ua/de/index.html

# В консолі браузера має бути:
# [i18n] Loaded de.json (X keys)
# [i18n] Applied translations for: de
# [i18n] Translated X elements

# Текст на сторінці має бути німецькою, не французькою
```

## 📝 GIT COMMIT

```bash
git add -A
git commit -m "fix(i18n): align HTML data-i18n keys with JSON structure

CRITICAL FIX - Key mismatch resolution:

Hero section:
- hero.supportCta → hero.cta_support
- hero.founderCta → hero.cta_founder

Manifesto section:
- manifesto.v.title → manifesto.values.v_title
- manifesto.i.desc → manifesto.values.i_desc
- (all 12 manifesto value keys fixed)
- quote.arsen → manifesto.quote

Mission section:
- mission.cohesion.title → mission.items.cohesion
- mission.mediation.desc → mission.items.mediation_desc
- (all 6 mission item keys fixed)

Actions section:
- actions.concerts.title → actions.charity_concerts
- actions.integration.title → actions.community
- (all 6 action keys fixed)

Files modified:
- index.html, fr/index.html, de/index.html, uk/index.html
- about.html (all language versions)
- contact.html (all language versions)
- partners.html (all language versions)
- our-actions.html (all language versions)

Result: i18n-engine.js can now find all translations in JSON files.
German and Ukrainian pages display correct language content."

git push origin main
```

## ✅ КРИТЕРІЇ УСПІХУ

- [ ] Всі `hero.supportCta` замінені на `hero.cta_support`
- [ ] Всі `manifesto.v.*` замінені на `manifesto.values.v_*`
- [ ] Всі `quote.arsen` замінені на `manifesto.quote`
- [ ] Всі `mission.cohesion.*` замінені на `mission.items.*`
- [ ] Всі `actions.concerts.*` замінені на `actions.charity_*`
- [ ] `/de/index.html` показує німецький текст
- [ ] `/uk/index.html` показує український текст
- [ ] Консоль браузера показує `[i18n] Translated X elements` (X > 40)

## 🚨 ВАЖЛИВО

1. **НЕ ЗМІНЮЙТЕ JSON ФАЙЛИ** - вони мають правильну структуру
2. **Виправляйте тільки HTML** - через sed заміни
3. **Тестуйте після кожного файлу** - щоб переконатися що заміни працюють
4. **Зробіть бекап перед запуском** - `cp -r . ../violin-backup`

---

## 🎯 READY FOR EXECUTION

```bash
cd ~/violin.pp.ua

# Бекап
cp -r . ../violin-backup-$(date +%Y%m%d)

# Створити скрипт (скопіювати з Крок 1 вище)
nano fix-i18n-keys.sh

# Виконати
chmod +x fix-i18n-keys.sh
./fix-i18n-keys.sh

# Перевірити
./verify-i18n.sh

# Комміт
git add -A
git commit -m "fix(i18n): align HTML data-i18n keys with JSON structure"
git push origin main
```
