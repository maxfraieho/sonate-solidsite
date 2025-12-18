# TASK 01: Виправлення data-i18n ключів (КРИТИЧНО!)

## Проблема
Ключі `data-i18n` в HTML не відповідають структурі ключів в JSON файлах локалізації.

## Наслідок
Замість перекладеного тексту показуються сирі ключі як текст.

---

## SED команди для масової заміни

### Hero секція
```bash
sed -i 's/data-i18n="hero\.supportCta"/data-i18n="hero.cta_support"/g' index.html
sed -i 's/data-i18n="hero\.founderCta"/data-i18n="hero.cta_founder"/g' index.html
```

### Manifesto секція (values)
```bash
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
```

### Quote секція
```bash
sed -i 's/data-i18n="quote\.arsen"/data-i18n="manifesto.quote"/g' index.html
```

### Mission секція (items)
```bash
sed -i 's/data-i18n="mission\.cohesion\.title"/data-i18n="mission.items.cohesion"/g' index.html
sed -i 's/data-i18n="mission\.cohesion\.desc"/data-i18n="mission.items.cohesion_desc"/g' index.html
sed -i 's/data-i18n="mission\.mediation\.title"/data-i18n="mission.items.mediation"/g' index.html
sed -i 's/data-i18n="mission\.mediation\.desc"/data-i18n="mission.items.mediation_desc"/g' index.html
sed -i 's/data-i18n="mission\.integration\.title"/data-i18n="mission.items.integration"/g' index.html
sed -i 's/data-i18n="mission\.integration\.desc"/data-i18n="mission.items.integration_desc"/g' index.html
```

---

## Один скрипт для всіх замін

```bash
#!/bin/bash
# fix-i18n-keys.sh

FILE="index.html"

echo "Fixing i18n keys in $FILE..."

# Hero
sed -i 's/data-i18n="hero\.supportCta"/data-i18n="hero.cta_support"/g' "$FILE"
sed -i 's/data-i18n="hero\.founderCta"/data-i18n="hero.cta_founder"/g' "$FILE"

# Manifesto values
for letter in v i o l n; do
  sed -i "s/data-i18n=\"manifesto\\.${letter}\\.title\"/data-i18n=\"manifesto.values.${letter}_title\"/g" "$FILE"
  sed -i "s/data-i18n=\"manifesto\\.${letter}\\.desc\"/data-i18n=\"manifesto.values.${letter}_desc\"/g" "$FILE"
done

# i2 окремо
sed -i 's/data-i18n="manifesto\.i2\.title"/data-i18n="manifesto.values.i2_title"/g' "$FILE"
sed -i 's/data-i18n="manifesto\.i2\.desc"/data-i18n="manifesto.values.i2_desc"/g' "$FILE"

# Quote
sed -i 's/data-i18n="quote\.arsen"/data-i18n="manifesto.quote"/g' "$FILE"

# Mission items
for item in cohesion mediation integration; do
  sed -i "s/data-i18n=\"mission\\.${item}\\.title\"/data-i18n=\"mission.items.${item}\"/g" "$FILE"
  sed -i "s/data-i18n=\"mission\\.${item}\\.desc\"/data-i18n=\"mission.items.${item}_desc\"/g" "$FILE"
done

echo "Done! Verifying..."
echo ""
echo "Old keys remaining (should be empty):"
grep -oE 'data-i18n="(hero\.(supportCta|founderCta)|manifesto\.[violn2]+\.(title|desc)|quote\.arsen|mission\.(cohesion|mediation|integration)\.(title|desc))"' "$FILE" || echo "None found (good!)"
```

---

## Верифікація

```bash
# Перевірити що старих ключів НЕМАЄ
grep -c "hero.supportCta" index.html  # має бути 0
grep -c "manifesto.v.title" index.html  # має бути 0
grep -c "quote.arsen" index.html  # має бути 0

# Перевірити що нові ключі Є
grep -c "hero.cta_support" index.html  # має бути 1
grep -c "manifesto.values.v_title" index.html  # має бути 1
grep -c "manifesto.quote" index.html  # має бути 1
```

---

## JSON структура (для довідки)

```json
{
  "hero": {
    "cta_support": "Soutenir le projet",
    "cta_founder": "Découvrir le fondateur"
  },
  "manifesto": {
    "values": {
      "v_title": "Valeurs",
      "v_desc": "..."
    },
    "quote": "Arsen Kovalenko : Violoniste virtuose..."
  },
  "mission": {
    "items": {
      "cohesion": "Cohésion Sociale",
      "cohesion_desc": "..."
    }
  }
}
```

---

## Чекліст

- [ ] Виконано sed команди
- [ ] Перевірено: старих ключів немає
- [ ] Перевірено: нові ключі є
- [ ] Локалізація показує текст замість ключів
