# TASK 03: Виправлення Material Icons

## Проблема
Material Symbols показуються як текст (`music_note`, `keyboard_arrow_down`) замість іконок.

## Діагностика

### Крок 1: Перевірити підключення шрифту

**В index.html (рядок ~77) має бути:**
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
```

**АБО альтернативний варіант (надійніший):**
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet">
```

### Крок 2: Перевірити CSS

**Має бути в `<style>` секції або main.css:**

```css
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
```

---

## Рішення

### Варіант A: Виправити Google Fonts посилання

Замінити поточне посилання на:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
```

### Варіант B: Використати CDN (надійніший)

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
```

**І змінити клас з `material-symbols-outlined` на `material-icons-outlined`:**

```bash
sed -i 's/material-symbols-outlined/material-icons-outlined/g' index.html
```

### Варіант C: Inline preload (найнадійніший)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" rel="stylesheet">
```

---

## Діагностика в браузері

### Console тест
```javascript
// Перевірити чи шрифт завантажено
document.fonts.check('24px "Material Symbols Outlined"')
// Має повернути true

// Перевірити всі завантажені шрифти
for (const font of document.fonts) {
  console.log(font.family, font.status);
}
```

### Network тест
1. Відкрити DevTools → Network
2. Фільтр: Font
3. Перезавантажити сторінку
4. Має бути запит на `fonts.gstatic.com`

---

## Fallback рішення

Якщо Google Fonts не працює, використати локальні іконки:

### 1. Завантажити шрифт
```bash
mkdir -p assets/fonts
curl -o assets/fonts/material-symbols.woff2 "https://fonts.gstatic.com/s/materialsymbolsoutlined/v..."
```

### 2. CSS @font-face
```css
@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 400;
  src: url('/assets/fonts/material-symbols.woff2') format('woff2');
}
```

---

## Верифікація

```bash
# 1. Візуально перевірити що іконки показуються
# Відкрити https://violin.pp.ua/
# В header має бути іконка музичної ноти (не текст "music_note")
# На hero секції має бути стрілка вниз (не текст "keyboard_arrow_down")

# 2. Console тест в браузері
document.fonts.check('24px "Material Symbols Outlined"')  // true
```

---

## Чекліст

- [ ] Перевірено підключення шрифту
- [ ] Перевірено CSS для .material-symbols-outlined
- [ ] Іконка music_note в header показується як іконка
- [ ] Іконка keyboard_arrow_down показується як іконка
- [ ] Всі іконки в manifesto секції працюють
