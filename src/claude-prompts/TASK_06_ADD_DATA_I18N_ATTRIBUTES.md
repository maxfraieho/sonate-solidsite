# TASK 06: Додати data-i18n атрибути до всіх сторінок /de/ та /uk/

## 🔴 КРИТИЧНА ПРОБЛЕМА

**Статус**: i18n-engine.js працює правильно, але не має що перекладати

**Причина**: HTML файли в `/de/` та `/uk/` є копіями французького HTML без `data-i18n` атрибутів

**Наслідок**:
- `/de/about.html` показує французький текст "À Propos de Sonate Solidaire"
- `/uk/index.html` показує французький текст "L'Intégration par la Musique"
- i18n-engine.js завантажує JSON переклади (de.json, uk.json) але не може їх застосувати

## 📋 REASONING PROTOCOL

```
DOING: Adding data-i18n attributes to all text elements
EXPECT: Every translatable text has data-i18n="key.path"
IF YES: i18n-engine.js will replace text with translations from JSON
IF NO: Text stays in French (current state)
RESULT: /de/about.html shows German text instead of French
MATCHES: User sees German on /de/, Ukrainian on /uk/
THEREFORE: i18n system is fully functional
```

## 🎯 МЕТА

Додати `data-i18n` атрибути до всіх текстових елементів у файлах `/de/` та `/uk/` щоб i18n-engine.js міг застосувати переклади з JSON файлів.

## 📁 ФАЙЛИ ДЛЯ ОБРОБКИ

### Папка /de/:
- `de/index.html`
- `de/about.html`
- `de/contact.html`
- `de/partners.html`
- `de/our-actions.html`

### Папка /uk/:
- `uk/index.html`
- `uk/about.html`
- `uk/contact.html`
- `uk/partners.html`
- `uk/our-actions.html`

## 📝 ПРИКЛАД ПЕРЕТВОРЕННЯ

### ПЕРЕД (поточний стан):

```html
<!-- de/about.html -->
<h1 class="text-4xl font-bold">À Propos de Sonate Solidaire</h1>
<p class="text-lg">Notre mission est d'intégrer les musiciens...</p>
<button class="btn-primary">Contactez-nous</button>
```

### ПІСЛЯ (з data-i18n):

```html
<!-- de/about.html -->
<h1 class="text-4xl font-bold" data-i18n="about.title">À Propos de Sonate Solidaire</h1>
<p class="text-lg" data-i18n="about.mission">Notre mission est d'intégrer les musiciens...</p>
<button class="btn-primary" data-i18n="about.contact_button">Contactez-nous</button>
```

## 🔑 КЛЮЧІ ПЕРЕКЛАДІВ (JSON структура)

Переклади вже існують у `/locales/de.json` та `/locales/uk.json`:

```json
{
  "nav": {
    "home": "Startseite",
    "founder": "Gründer",
    "manifesto": "Manifest",
    "mission": "Mission",
    "portfolio": "Portfolio",
    "gallery": "Galerie",
    "contact": "Kontakt",
    "partners": "Partner",
    "support": "Unterstützen"
  },
  "hero": {
    "title": "Sonate Solidaire",
    "tagline": "Sonate Solidaire • Harmonie zwischen der Schweiz und der Ukraine",
    "description": "Integration durch Musik: Eine Brücke zwischen der Schweiz und der Ukraine",
    "cta_primary": "Unsere Mission entdecken",
    "cta_secondary": "Unterstützen"
  },
  "about": {
    "title": "Über Sonate Solidaire",
    "mission": "Unsere Mission ist es...",
    "description": "...",
    "values_title": "Unsere Werte"
  },
  // ... більше ключів
}
```

## 📊 ЕЛЕМЕНТИ ДЛЯ ОБРОБКИ

### 1. Навігація (nav):
```html
<a href="/de/index.html" data-i18n="nav.home">Accueil</a>
<a href="/de/about.html" data-i18n="nav.about">À Propos</a>
<a href="/de/contact.html" data-i18n="nav.contact">Contact</a>
<a href="/de/partners.html" data-i18n="nav.partners">Partenaires</a>
```

### 2. Заголовки (h1-h6):
```html
<h1 data-i18n="hero.title">Sonate Solidaire</h1>
<h2 data-i18n="about.values_title">Nos Valeurs</h2>
<h3 data-i18n="mission.approach">Notre Approche</h3>
```

### 3. Параграфи та текст:
```html
<p data-i18n="about.description">Description texte...</p>
<span data-i18n="footer.copyright">© 2025 Sonate Solidaire</span>
```

### 4. Кнопки та посилання:
```html
<button data-i18n="hero.cta_primary">Découvrir notre mission</button>
<a href="#" data-i18n="hero.cta_secondary">Soutenir</a>
```

### 5. Форми:
```html
<label data-i18n="contact.form.name">Nom complet</label>
<input type="text" data-i18n-placeholder="contact.form.name_placeholder">
<button type="submit" data-i18n="contact.form.submit">Envoyer</button>
```

### 6. Footer:
```html
<p data-i18n="footer.description">Sonate Solidaire - Association à but non lucratif</p>
<p data-i18n="footer.developed_with">Développé avec ❤️ en Suisse</p>
```

## 🔧 ПІДХІД ДО РЕАЛІЗАЦІЇ

### Варіант A: Ручна обробка (рекомендовано)
1. Відкрити кожен файл (`de/*.html`, `uk/*.html`)
2. Знайти всі текстові елементи
3. Перевірити чи існує ключ у JSON (de.json, uk.json)
4. Додати `data-i18n="key.path"` до кожного елемента
5. Зберегти файл

### Варіант B: Автоматична обробка (складно)
- Використати скрипт для пошуку тексту
- Автоматично згенерувати data-i18n атрибути
- **Проблема**: важко автоматично визначити правильні ключі JSON

### Варіант C: Копіювання з /fr/index.html (якщо там є)
- Якщо `/fr/index.html` вже має data-i18n атрибути
- Скопіювати структуру на /de/ та /uk/
- Перевірити відповідність ключів

## 📝 CHECKLIST (для кожного файлу)

```markdown
### de/index.html
- [ ] Navigation links (8 елементів)
- [ ] Hero section (title, tagline, description, 2 CTAs)
- [ ] Manifesto section (6 VIOLIN cards)
- [ ] Mission section (title, description)
- [ ] Portfolio section (title, track names)
- [ ] Gallery section (title)
- [ ] Contact section (form labels, placeholders, button)
- [ ] Footer (description, links, copyright)

### de/about.html
- [ ] Page title
- [ ] Mission statement
- [ ] Values section (4-6 values)
- [ ] Team section (if exists)
- [ ] CTA buttons

### de/contact.html
- [ ] Page title
- [ ] Contact info (address, phone, email)
- [ ] Form fields (name, email, message, submit)
- [ ] Map section (if text labels exist)

### de/partners.html
- [ ] Page title
- [ ] Partner descriptions
- [ ] Partnership benefits
- [ ] CTA to become partner

### de/our-actions.html
- [ ] Page title
- [ ] Actions list (titles, descriptions)
- [ ] Impact metrics
- [ ] CTA buttons
```

## ✅ КРИТЕРІЇ УСПІХУ

1. [ ] Всі видимі тексти в `/de/` мають `data-i18n` атрибути
2. [ ] Всі видимі тексти в `/uk/` мають `data-i18n` атрибути
3. [ ] Ключі в data-i18n відповідають ключам у JSON файлах
4. [ ] `/de/about.html` показує німецький текст замість французького
5. [ ] `/uk/index.html` показує український текст замість французького
6. [ ] Консоль браузера показує `[i18n] Loaded de.json` при відкритті /de/
7. [ ] Консоль браузера показує `[i18n] Applied translations for: de`

## 🔍 ВЕРИФІКАЦІЯ

### Крок 1: Локальна перевірка
```bash
# Перевірити кількість data-i18n атрибутів
echo "de/index.html:"
grep -c 'data-i18n=' de/index.html

echo "uk/index.html:"
grep -c 'data-i18n=' uk/index.html

# Має бути > 50 на кожній сторінці
```

### Крок 2: Браузер тест
```bash
# Відкрити в браузері
open https://violin.pp.ua/de/about.html

# Перевірити консоль:
# [i18n] Loaded de.json (X keys)
# [i18n] Applied translations for: de

# Перевірити текст на сторінці:
# Має бути німецький, не французький
```

### Крок 3: Порівняння тексту
```bash
# Витягти перший заголовок
echo "FR version:"
curl -s https://violin.pp.ua/fr/about.html | grep -o '<h1[^>]*>.*</h1>' | head -1

echo "DE version:"
curl -s https://violin.pp.ua/de/about.html | grep -o '<h1[^>]*>.*</h1>' | head -1

# Тексти мають бути різні (німецький vs французький)
```

## 📝 GIT COMMIT

```bash
git add de/ uk/
git commit -m "feat(i18n): add data-i18n attributes to all /de/ and /uk/ pages

CRITICAL FIX:
- Added data-i18n attributes to all translatable text elements
- Covers: navigation, headings, paragraphs, buttons, forms, footer
- Total: ~50-80 attributes per page across 10 HTML files
- Enables i18n-engine.js to apply translations from JSON files

This completes the i18n implementation:
- i18n-engine.js loads de.json and uk.json ✅
- HTML elements have data-i18n attributes ✅
- Translations are applied automatically ✅

Result:
- /de/about.html now shows German text instead of French
- /uk/index.html now shows Ukrainian text instead of French
- Language switching works correctly on all pages"
```

## 🚨 ВАЖЛИВІ ПРИМІТКИ

1. **Не змінювати вміст тексту** - тільки додати атрибути:
   ```html
   <!-- ✅ ПРАВИЛЬНО -->
   <h1 data-i18n="hero.title">Sonate Solidaire</h1>

   <!-- ❌ НЕПРАВИЛЬНО -->
   <h1 data-i18n="hero.title">Solidarität Sonate</h1>
   ```

2. **Перевірити відповідність ключів у JSON**:
   - Кожен ключ в `data-i18n="key.path"` має існувати в de.json та uk.json
   - Якщо ключа немає - додати його в JSON або використати інший ключ

3. **Порядок виконання**:
   - Спочатку `/de/` файли
   - Потім `/uk/` файли (скопіювати той самий pattern)
   - Тестувати після кожного файлу

4. **Placeholder атрибути**:
   ```html
   <input type="text"
          data-i18n-placeholder="contact.form.name_placeholder"
          placeholder="Votre nom complet">
   ```

5. **ARIA та title атрибути**:
   ```html
   <button data-i18n-title="nav.home_tooltip"
           data-i18n="nav.home"
           title="Retour à l'accueil">
     Accueil
   </button>
   ```

## 📊 ОЧІКУВАНІ МЕТРИКИ

- **Файлів для обробки**: 10 (5 /de/ + 5 /uk/)
- **Атрибутів на файл**: ~50-80
- **Загальна кількість атрибутів**: ~500-800
- **Час виконання (ручна обробка)**: 2-4 години
- **Час виконання (з готовим рішенням від Q)**: 30-60 хвилин

---

## 🎯 READY FOR IMPLEMENTATION

**Очікую від Q готове рішення для імплементації.**

Можливі варіанти:
1. Список конкретних ключів для кожного файлу
2. Скрипт автоматизації
3. Шаблони для копіювання
4. Покрокові інструкції

**Після отримання рішення - виконаю імплементацію коду.**
