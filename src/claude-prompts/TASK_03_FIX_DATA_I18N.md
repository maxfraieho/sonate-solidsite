# TASK 03: Виправлення data-i18n ключів в HTML

## DOING
Виправити невідповідності між data-i18n атрибутами в HTML та ключами в JSON.

## EXPECT
- Всі data-i18n атрибути відповідають ключам у /locales/*.json
- Переклади відображаються замість ключів

---

## ПОВНА ТАБЛИЦЯ НЕВІДПОВІДНОСТЕЙ

Проаналізовано index.html та fr.json. Ось ВСІ невідповідності:

| # | HTML data-i18n (ЗАРАЗ) | JSON ключ (ПОТРІБНО) |
|---|------------------------|----------------------|
| 1 | hero.supportCta | hero.cta_support |
| 2 | hero.founderCta | hero.cta_founder |
| 3 | manifesto.v.title | manifesto.values.v_title |
| 4 | manifesto.v.desc | manifesto.values.v_desc |
| 5 | manifesto.i.title | manifesto.values.i_title |
| 6 | manifesto.i.desc | manifesto.values.i_desc |
| 7 | manifesto.o.title | manifesto.values.o_title |
| 8 | manifesto.o.desc | manifesto.values.o_desc |
| 9 | manifesto.l.title | manifesto.values.l_title |
| 10 | manifesto.l.desc | manifesto.values.l_desc |
| 11 | manifesto.i2.title | manifesto.values.i2_title |
| 12 | manifesto.i2.desc | manifesto.values.i2_desc |
| 13 | manifesto.n.title | manifesto.values.n_title |
| 14 | manifesto.n.desc | manifesto.values.n_desc |
| 15 | quote.arsen | manifesto.quote |
| 16 | mission.cohesion.title | mission.items.cohesion |
| 17 | mission.cohesion.desc | mission.items.cohesion_desc |
| 18 | mission.mediation.title | mission.items.mediation |
| 19 | mission.mediation.desc | mission.items.mediation_desc |
| 20 | mission.integration.title | mission.items.integration |
| 21 | mission.integration.desc | mission.items.integration_desc |
| 22 | footer.copyright | footer.rights |

---

## IMPLEMENTATION

### Варіант A: Масова заміна через sed

```bash
cd ~/violin.pp.ua

# Hero section
sed -i 's/data-i18n="hero\.supportCta"/data-i18n="hero.cta_support"/g' index.html
sed -i 's/data-i18n="hero\.founderCta"/data-i18n="hero.cta_founder"/g' index.html

# Manifesto values
sed -i 's/data-i18n="manifesto\.v\.title"/data-i18n="manifesto.values.v_title"/g' index.html
sed -i 's/data-i18n="manifesto\.v\.desc"/data-i18n="manifesto.values.v_desc"/g' index.html
sed -i 's/data-i18n="manifesto\.i\.title"/data-i18n="manifesto.values.i_title"/g' index.html
sed -i 's/data-i18n="manifesto\.i\.desc"/data-i18n="manifesto.values.i_desc"/g' index.html
sed -i 's/data-i18n="manifesto\.o\.title"/data-i18n="manifesto.values.o_title"/g' index.html
sed -i 's/data-i18n="manifesto\.o\.desc"/data-i18n="manifesto.values.o_desc"/g' index.html
sed -i 's/data-i18n="manifesto\.l\.title"/data-i18n="manifesto.values.l_title"/g' index.html
sed -i 's/data-i18n="manifesto\.l\.desc"/data-i18n="manifesto.values.l_desc"/g' index.html
sed -i 's/data-i18n="manifesto\.i2\.title"/data-i18n="manifesto.values.i2_title"/g' index.html
sed -i 's/data-i18n="manifesto\.i2\.desc"/data-i18n="manifesto.values.i2_desc"/g' index.html
sed -i 's/data-i18n="manifesto\.n\.title"/data-i18n="manifesto.values.n_title"/g' index.html
sed -i 's/data-i18n="manifesto\.n\.desc"/data-i18n="manifesto.values.n_desc"/g' index.html

# Quote
sed -i 's/data-i18n="quote\.arsen"/data-i18n="manifesto.quote"/g' index.html

# Mission items
sed -i 's/data-i18n="mission\.cohesion\.title"/data-i18n="mission.items.cohesion"/g' index.html
sed -i 's/data-i18n="mission\.cohesion\.desc"/data-i18n="mission.items.cohesion_desc"/g' index.html
sed -i 's/data-i18n="mission\.mediation\.title"/data-i18n="mission.items.mediation"/g' index.html
sed -i 's/data-i18n="mission\.mediation\.desc"/data-i18n="mission.items.mediation_desc"/g' index.html
sed -i 's/data-i18n="mission\.integration\.title"/data-i18n="mission.items.integration"/g' index.html
sed -i 's/data-i18n="mission\.integration\.desc"/data-i18n="mission.items.integration_desc"/g' index.html

# Footer
sed -i 's/data-i18n="footer\.copyright"/data-i18n="footer.rights"/g' index.html

echo "✅ Всі 22 ключі замінено"
```

### Варіант B: Скрипт fix-i18n-keys.sh

Створити файл `fix-i18n-keys.sh`:

```bash
#!/bin/bash
# fix-i18n-keys.sh — Автоматичне виправлення data-i18n ключів

FILE="${1:-index.html}"

echo "🔧 Виправлення data-i18n ключів в $FILE..."

declare -A REPLACEMENTS=(
  ["hero.supportCta"]="hero.cta_support"
  ["hero.founderCta"]="hero.cta_founder"
  ["manifesto.v.title"]="manifesto.values.v_title"
  ["manifesto.v.desc"]="manifesto.values.v_desc"
  ["manifesto.i.title"]="manifesto.values.i_title"
  ["manifesto.i.desc"]="manifesto.values.i_desc"
  ["manifesto.o.title"]="manifesto.values.o_title"
  ["manifesto.o.desc"]="manifesto.values.o_desc"
  ["manifesto.l.title"]="manifesto.values.l_title"
  ["manifesto.l.desc"]="manifesto.values.l_desc"
  ["manifesto.i2.title"]="manifesto.values.i2_title"
  ["manifesto.i2.desc"]="manifesto.values.i2_desc"
  ["manifesto.n.title"]="manifesto.values.n_title"
  ["manifesto.n.desc"]="manifesto.values.n_desc"
  ["quote.arsen"]="manifesto.quote"
  ["mission.cohesion.title"]="mission.items.cohesion"
  ["mission.cohesion.desc"]="mission.items.cohesion_desc"
  ["mission.mediation.title"]="mission.items.mediation"
  ["mission.mediation.desc"]="mission.items.mediation_desc"
  ["mission.integration.title"]="mission.items.integration"
  ["mission.integration.desc"]="mission.items.integration_desc"
  ["footer.copyright"]="footer.rights"
)

COUNT=0
for OLD_KEY in "${!REPLACEMENTS[@]}"; do
  NEW_KEY="${REPLACEMENTS[$OLD_KEY]}"
  ESCAPED_OLD=$(echo "$OLD_KEY" | sed 's/\./\\./g')
  
  if grep -q "data-i18n=\"$OLD_KEY\"" "$FILE"; then
    sed -i "s/data-i18n=\"$ESCAPED_OLD\"/data-i18n=\"$NEW_KEY\"/g" "$FILE"
    echo "  ✓ $OLD_KEY → $NEW_KEY"
    ((COUNT++))
  fi
done

echo "✅ Замінено $COUNT ключів"
```

Запуск:
```bash
chmod +x fix-i18n-keys.sh
./fix-i18n-keys.sh index.html
./fix-i18n-keys.sh about.html
./fix-i18n-keys.sh partners.html
```

---

## VERIFICATION

```bash
# Перевірити що старих ключів немає
echo "=== Пошук старих ключів (має бути порожньо) ==="
grep -E "hero\.(supportCta|founderCta)" index.html
grep -E "manifesto\.(v|i|o|l|i2|n)\.(title|desc)" index.html
grep -E "quote\.arsen" index.html
grep -E "mission\.(cohesion|mediation|integration)\.(title|desc)" index.html

# Перевірити що нові ключі є
echo "=== Пошук нових ключів ==="
grep -c "hero.cta_support" index.html  # Очікується: 1
grep -c "hero.cta_founder" index.html  # Очікується: 1
grep -c "manifesto.values" index.html  # Очікується: 12
grep -c "manifesto.quote" index.html   # Очікується: 1
grep -c "mission.items" index.html     # Очікується: 6
```

---

## IMPORTANT: Перевірка JSON структури

Перед заміною переконатись що ключі існують у fr.json:

```bash
# Перевірити структуру fr.json
cat locales/fr.json | python3 -c "
import json, sys
data = json.load(sys.stdin)

keys_to_check = [
  'hero.cta_support', 'hero.cta_founder',
  'manifesto.values.v_title', 'manifesto.quote',
  'mission.items.cohesion'
]

for key in keys_to_check:
  parts = key.split('.')
  val = data
  try:
    for p in parts:
      val = val[p]
    print(f'✅ {key}: {val[:30]}...')
  except:
    print(f'❌ {key}: NOT FOUND')
"
```

---

## RESULT
- [ ] 22 data-i18n ключі виправлені в index.html
- [ ] Перевірено що нові ключі відповідають fr.json
- [ ] Перевірено інші HTML файли (about, contact, partners)
- [ ] Немає "Missing key" помилок в консолі

## NEXT TASK
→ TASK_04_JS_HARDCODED.md
