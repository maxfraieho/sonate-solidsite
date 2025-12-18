# TASK 03: i18n Keys — Виправлення локалізації

## Проблема
На index.html відображаються сирі ключі локалізації замість перекладів.

**ТОЧНА ПРИЧИНА (перевірено в коді):**
HTML використовує `data-i18n="hero.supportCta"`, але JSON має `hero.cta_support`.
Потрібно змінити data-i18n атрибути в HTML щоб відповідали структурі JSON.

---

## ТОЧНИЙ МАПІНГ (HTML рядок → JSON ключ)

### Hero Section (index.html ~рядок 400)
```
data-i18n="hero.supportCta"  →  data-i18n="hero.cta_support"
data-i18n="hero.founderCta"  →  data-i18n="hero.cta_founder"
```

### Manifesto Section (index.html ~рядки 438-502)
```
data-i18n="manifesto.v.title"   →  data-i18n="manifesto.values.v_title"
data-i18n="manifesto.v.desc"    →  data-i18n="manifesto.values.v_desc"
data-i18n="manifesto.i.title"   →  data-i18n="manifesto.values.i_title"
data-i18n="manifesto.i.desc"    →  data-i18n="manifesto.values.i_desc"
data-i18n="manifesto.o.title"   →  data-i18n="manifesto.values.o_title"
data-i18n="manifesto.o.desc"    →  data-i18n="manifesto.values.o_desc"
data-i18n="manifesto.l.title"   →  data-i18n="manifesto.values.l_title"
data-i18n="manifesto.l.desc"    →  data-i18n="manifesto.values.l_desc"
data-i18n="manifesto.i2.title"  →  data-i18n="manifesto.values.i2_title"
data-i18n="manifesto.i2.desc"   →  data-i18n="manifesto.values.i2_desc"
data-i18n="manifesto.n.title"   →  data-i18n="manifesto.values.n_title"
data-i18n="manifesto.n.desc"    →  data-i18n="manifesto.values.n_desc"
```

### Quote Section (index.html ~рядок 510)
```
data-i18n="quote.arsen"  →  data-i18n="manifesto.quote"
```

### Mission Section (index.html ~рядки 539-561)
```
data-i18n="mission.cohesion.title"     →  data-i18n="mission.items.cohesion"
data-i18n="mission.cohesion.desc"      →  data-i18n="mission.items.cohesion_desc"
data-i18n="mission.mediation.title"    →  data-i18n="mission.items.mediation"
data-i18n="mission.mediation.desc"     →  data-i18n="mission.items.mediation_desc"
data-i18n="mission.integration.title"  →  data-i18n="mission.items.integration"
data-i18n="mission.integration.desc"   →  data-i18n="mission.items.integration_desc"
```

---

## Крок 1: Перевірити JSON структуру (ПІДТВЕРДЖЕНО)

JSON fr.json має таку структуру:
```json
{
  "hero": {
    "cta_support": "Soutenir le projet",
    "cta_founder": "Découvrir le fondateur"
  },
  "manifesto": {
    "values": {
      "v_title": "Valeurs",
      "v_desc": "Respect, dignité..."
    },
    "quote": "Arsen Kovalenko..."
  },
  "mission": {
    "items": {
      "cohesion": "Cohésion Sociale",
      "cohesion_desc": "Créer des espaces..."
    }
  }
}
```

---

## Крок 2: Масова заміна в index.html

```bash
cd ~/violin.pp.ua

# Hero buttons
sed -i 's/data-i18n="hero\.supportCta"/data-i18n="hero.cta_support"/g' index.html
sed -i 's/data-i18n="hero\.founderCta"/data-i18n="hero.cta_founder"/g' index.html

# Manifesto - all 12 keys
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

# Mission - all 6 keys
sed -i 's/data-i18n="mission\.cohesion\.title"/data-i18n="mission.items.cohesion"/g' index.html
sed -i 's/data-i18n="mission\.cohesion\.desc"/data-i18n="mission.items.cohesion_desc"/g' index.html
sed -i 's/data-i18n="mission\.mediation\.title"/data-i18n="mission.items.mediation"/g' index.html
sed -i 's/data-i18n="mission\.mediation\.desc"/data-i18n="mission.items.mediation_desc"/g' index.html
sed -i 's/data-i18n="mission\.integration\.title"/data-i18n="mission.items.integration"/g' index.html
sed -i 's/data-i18n="mission\.integration\.desc"/data-i18n="mission.items.integration_desc"/g' index.html
```

---

## Крок 3: Перевірити результат

```bash
# Перевірити що старих ключів немає
grep -n "hero.supportCta\|hero.founderCta\|manifesto.v.\|quote.arsen\|mission.cohesion" index.html

# Має бути порожній вивід!
```

---

## Крок 4: Застосувати до мовних версій

```bash
# Скопіювати зміни до uk/ та de/ версій
for lang in uk de; do
  cp index.html ${lang}/index.html
done
```

АБО виконати ті самі sed команди для кожного файлу окремо.

---

## Файли для модифікації

```
/index.html
/uk/index.html  
/de/index.html
```

Примітка: /fr/ папка може не існувати якщо французька є дефолтом в корені.

---

## Чекліст

- [ ] `hero.cta_support` та `hero.cta_founder` працюють
- [ ] Всі 12 ключів manifesto.values.* працюють  
- [ ] `manifesto.quote` відображає цитату
- [ ] Всі 6 ключів mission.items.* працюють
- [ ] Перемикання мов оновлює тексти
- [ ] Немає сирих ключів на сторінці
