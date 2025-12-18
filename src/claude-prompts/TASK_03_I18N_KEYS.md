# TASK 03: i18n Keys — Виправлення локалізації

## Проблема
На index.html відображаються сирі ключі локалізації замість перекладів:
- `hero.supportCta`
- `hero.founderCta`
- `manifesto.v.title`, `manifesto.v.desc`
- `quote.arsen`
- `mission.cohesion.title`, `mission.cohesion.desc`

## Причина
Невідповідність між ключами в HTML (`data-i18n="hero.supportCta"`) та ключами в JSON файлах (`hero.cta_support`).

---

## Крок 1: Отримати реальну структуру JSON

```
DOING: Читаю /locales/fr.json щоб побачити реальні ключі
EXPECT: Знайду правильну структуру ключів
IF YES: Складаю мапінг
IF NO: Створюю необхідні ключі в JSON
```

Команда:
```bash
cat locales/fr.json | head -100
```

---

## Крок 2: Мапінг ключів (HTML → JSON)

### Hero Section
| HTML (data-i18n) | JSON (правильний ключ) |
|-----------------|----------------------|
| `hero.supportCta` | `hero.cta_support` |
| `hero.founderCta` | `hero.cta_founder` |

### Manifesto Section
| HTML | JSON |
|------|------|
| `manifesto.v.title` | `manifesto.values.v_title` |
| `manifesto.v.desc` | `manifesto.values.v_desc` |
| `manifesto.i.title` | `manifesto.values.i_title` |
| `manifesto.i.desc` | `manifesto.values.i_desc` |
| `manifesto.o.title` | `manifesto.values.o_title` |
| `manifesto.o.desc` | `manifesto.values.o_desc` |
| `manifesto.l.title` | `manifesto.values.l_title` |
| `manifesto.l.desc` | `manifesto.values.l_desc` |
| `manifesto.i2.title` | `manifesto.values.i2_title` |
| `manifesto.i2.desc` | `manifesto.values.i2_desc` |
| `manifesto.n.title` | `manifesto.values.n_title` |
| `manifesto.n.desc` | `manifesto.values.n_desc` |

### Quote & Mission
| HTML | JSON |
|------|------|
| `quote.arsen` | `manifesto.quote` |
| `mission.cohesion.title` | `mission.items.cohesion` |
| `mission.cohesion.desc` | `mission.items.cohesion_desc` |
| `mission.mediation.title` | `mission.items.mediation` |
| `mission.mediation.desc` | `mission.items.mediation_desc` |
| `mission.integration.title` | `mission.items.integration` |
| `mission.integration.desc` | `mission.items.integration_desc` |

---

## Крок 3: Виправлення — Два варіанти

### Варіант A: Виправити HTML (рекомендовано)
Замінити data-i18n атрибути на правильні ключі:

```html
<!-- БУЛО -->
<button data-i18n="hero.supportCta">hero.supportCta</button>

<!-- СТАЛО -->
<button data-i18n="hero.cta_support">Soutenir le projet</button>
```

### Варіант B: Додати аліаси в i18n.js
Якщо HTML важко змінити, додати мапінг в `/assets/js/modules/i18n.js`:

```javascript
const keyAliases = {
  'hero.supportCta': 'hero.cta_support',
  'hero.founderCta': 'hero.cta_founder',
  'manifesto.v.title': 'manifesto.values.v_title',
  // ... решта
};

function getTranslation(key, translations) {
  const actualKey = keyAliases[key] || key;
  return getNestedValue(translations, actualKey);
}
```

---

## Крок 4: Масова заміна в HTML

Використати sed для заміни:

```bash
# Hero buttons
sed -i 's/data-i18n="hero.supportCta"/data-i18n="hero.cta_support"/g' index.html
sed -i 's/data-i18n="hero.founderCta"/data-i18n="hero.cta_founder"/g' index.html

# Manifesto
sed -i 's/data-i18n="manifesto.v.title"/data-i18n="manifesto.values.v_title"/g' index.html
sed -i 's/data-i18n="manifesto.v.desc"/data-i18n="manifesto.values.v_desc"/g' index.html
# ... продовжити для всіх ключів

# Quote
sed -i 's/data-i18n="quote.arsen"/data-i18n="manifesto.quote"/g' index.html

# Mission
sed -i 's/data-i18n="mission.cohesion.title"/data-i18n="mission.items.cohesion"/g' index.html
sed -i 's/data-i18n="mission.cohesion.desc"/data-i18n="mission.items.cohesion_desc"/g' index.html
```

---

## Крок 5: Перевірка i18n.js

```
DOING: Перевіряю чи i18n.js правильно підключений та працює
EXPECT: Скрипт знаходить елементи з data-i18n та замінює текст
IF YES: Тестую в браузері
IF NO: Перевіряю console на помилки
```

Перевірити `/assets/js/modules/i18n.js`:
```javascript
// Має бути функція для отримання вкладених ключів
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
```

---

## Крок 6: Дефолтні тексти в HTML

Текст між тегами має бути французькою (дефолт):

```html
<button data-i18n="hero.cta_support">Soutenir le projet</button>
<button data-i18n="hero.cta_founder">Découvrir le fondateur</button>

<h4 data-i18n="manifesto.values.v_title">Valeurs</h4>
<p data-i18n="manifesto.values.v_desc">Respect, dignité, entraide — le fondement...</p>
```

---

## Файли для модифікації

```
/index.html
/fr/index.html (якщо є)
/uk/index.html
/de/index.html
/assets/js/modules/i18n.js (якщо потрібен fallback)
```

---

## Чекліст

- [ ] Ключі hero.cta_support / hero.cta_founder працюють
- [ ] Manifesto секція показує переклади
- [ ] Quote Арсена відображається
- [ ] Mission секція перекладена
- [ ] Перемикання мов оновлює всі тексти
- [ ] Немає видимих сирих ключів на жодній сторінці
