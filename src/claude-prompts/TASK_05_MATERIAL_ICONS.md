# TASK 05: Виправлення Material Icons

## DOING
Виправити відображення Material Icons (зараз показуються як текст: music_note, keyboard_arrow_down)

## EXPECT
- Іконки відображаються як графіка
- Шрифт Material Symbols завантажується правильно

---

## ДІАГНОСТИКА ПРОБЛЕМИ

На скріншоті видно:
- `music_note` показується як текст замість іконки 🎵
- `keyboard_arrow_down` показується як текст замість ⌄

**Причина:** Шрифт Material Symbols Outlined не завантажується або CSS клас неправильний.

---

## IMPLEMENTATION

### Крок 1: Перевірити поточне підключення

```bash
# Пошук підключення Material Icons в HTML
grep -n "Material" index.html
grep -n "fonts.googleapis.com" index.html
```

### Крок 2: Правильне підключення (варіанти)

**Варіант A: Стандартний Material Symbols Outlined**

```html
<!-- В <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

**Варіант B: Класичний Material Icons (якщо A не працює)**

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

**Варіант C: Конкретний список іконок**

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=music_note,keyboard_arrow_down,favorite,groups,palette,link,bolt,graphic_eq,translate,home_work,play_arrow,pause" rel="stylesheet">
```

### Крок 3: Обов'язковий CSS

```css
/* В assets/css/main.css або <style> в head */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* Для класичного Material Icons */
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
```

### Крок 4: Правильний HTML для іконок

```html
<!-- Material Symbols Outlined (новий) -->
<span class="material-symbols-outlined">music_note</span>
<span class="material-symbols-outlined">keyboard_arrow_down</span>
<span class="material-symbols-outlined">favorite</span>

<!-- Material Icons (класичний) -->
<i class="material-icons">music_note</i>
<i class="material-icons">keyboard_arrow_down</i>
```

### Крок 5: Перевірка класів в HTML

```bash
# Перевірити який клас використовується
grep -n "material-symbols" index.html
grep -n "material-icons" index.html

# Перевірити конкретні іконки
grep -n "music_note" index.html
grep -n "keyboard_arrow_down" index.html
```

---

## DEBUGGING

### Перевірка в DevTools (Console)

```javascript
// Перевірити чи шрифт завантажений
document.fonts.check('24px "Material Symbols Outlined"')
// Має повернути: true

// Перевірити завантажені шрифти
document.fonts.forEach(font => {
  if (font.family.includes('Material')) {
    console.log(font.family, font.status);
  }
});
```

### Перевірка в DevTools (Network)

1. Відкрити DevTools → Network
2. Фільтр: Font
3. Перевірити чи завантажується woff2 файл для Material

### Перевірка в DevTools (Elements)

1. Inspect елемент з іконкою
2. Перевірити Computed Styles → font-family
3. Має бути: "Material Symbols Outlined" або "Material Icons"

---

## МОЖЛИВІ ПРОБЛЕМИ

### Проблема 1: Неправильний клас

```html
<!-- ❌ НЕПРАВИЛЬНО -->
<span class="material-symbols">music_note</span>

<!-- ✅ ПРАВИЛЬНО -->
<span class="material-symbols-outlined">music_note</span>
```

### Проблема 2: Відсутній CSS

Навіть якщо шрифт завантажений, без CSS правил іконки не відобразяться.

### Проблема 3: CSP блокує шрифти

Перевірити Content-Security-Policy заголовки в `_headers`:

```
font-src 'self' https://fonts.gstatic.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

### Проблема 4: Кешування

```bash
# Додати cache-bust до link
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&v=1" rel="stylesheet">
```

---

## SED КОМАНДИ ДЛЯ ВИПРАВЛЕННЯ

```bash
# Якщо клас неправильний (material-symbols → material-symbols-outlined)
sed -i 's/class="material-symbols"/class="material-symbols-outlined"/g' index.html

# Якщо використовується <i> замість <span>
# (обережно, може змінити інші елементи)
```

---

## VERIFICATION

```bash
# 1. Перевірити що link тег є
grep -c "Material Symbols Outlined" index.html
# Очікується: 1

# 2. Перевірити CSS
grep -c "material-symbols-outlined" assets/css/main.css
# Очікується: >= 1

# 3. Відкрити в браузері і перевірити візуально
```

---

## RESULT
- [ ] Link тег для Material Symbols додано/виправлено в <head>
- [ ] CSS для .material-symbols-outlined додано
- [ ] Всі іконки використовують правильний клас
- [ ] Іконки відображаються як графіка (не текст)

## NEXT TASK
→ TASK_06_PAGES_UNIFIED.md
