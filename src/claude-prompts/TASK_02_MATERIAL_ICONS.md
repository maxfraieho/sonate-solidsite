# TASK 02: Material Icons — Виправлення відображення

## Проблема
Material Icons показуються як текст (`music_note`, `keyboard_arrow_down`, `favorite`, `groups` тощо) замість іконок.

## Причини
1. Не підключений шрифт Material Symbols
2. Неправильний клас (`material-icons` vs `material-symbols-outlined`)
3. Шрифт блокується або не завантажується

---

## Крок 1: Перевірити підключення шрифту

```
DOING: Перевіряю <head> секцію на наявність Material Icons
EXPECT: Знайду <link> з fonts.googleapis.com/css2?family=Material+Symbols
IF YES: Перевіряю правильність URL
IF NO: Додаю підключення
```

Команда:
```bash
grep -n "Material\|material" index.html | head -20
```

---

## Крок 2: Правильне підключення Material Symbols

Додати до `<head>` всіх HTML файлів (ПЕРЕД main.css):

```html
<!-- Material Symbols -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
```

---

## Крок 3: Перевірити клас іконок в HTML

Правильний синтаксис:
```html
<!-- ПРАВИЛЬНО -->
<span class="material-symbols-outlined">music_note</span>
<span class="material-symbols-outlined">keyboard_arrow_down</span>
<span class="material-symbols-outlined">favorite</span>

<!-- НЕПРАВИЛЬНО (старий формат) -->
<span class="material-icons">music_note</span>
<i class="material-icons">favorite</i>
```

---

## Крок 4: Додати CSS fallback

Додати до `/assets/css/main.css`:

```css
/* === Material Symbols === */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined', sans-serif;
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

/* Hero scroll indicator */
.hero-scroll-indicator .material-symbols-outlined {
  font-size: 32px;
  color: #D4AF37;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Logo icon */
.logo .material-symbols-outlined {
  font-size: 28px;
  color: #D4AF37;
}
```

---

## Крок 5: Список іконок для перевірки

| Місце | Текст що відображається | Має бути іконка |
|-------|------------------------|-----------------|
| Header logo | `music_note` | 🎵 нота |
| Hero scroll | `keyboard_arrow_down` | ⬇️ стрілка |
| Manifesto V | `favorite` | ❤️ серце |
| Manifesto I | `groups` | 👥 групи |
| Manifesto O | `palette` | 🎨 палітра |
| Manifesto L | `link` | 🔗 зв'язок |
| Manifesto I2 | `bolt` | ⚡ блискавка |
| Manifesto N | `graphic_eq` | 📊 еквалайзер |
| Mission | `translate`, `home_work` | відповідні |
| Audio player | `play_arrow`, `pause`, `skip_previous`, `skip_next`, `volume_up` | плеєр |

---

## Файли для модифікації

```
/index.html (та всі мовні версії)
/assets/css/main.css
```

---

## Тестування

```
DOING: Відкриваю index.html в браузері
EXPECT: Всі іконки відображаються як графічні символи, не текст
IF YES: Переходжу до TASK_03
IF NO: Перевіряю DevTools → Network → чи завантажився шрифт
```

DevTools перевірка:
1. F12 → Network → Filter: Font
2. Шукати `Material+Symbols+Outlined`
3. Status має бути 200

---

## Чекліст

- [ ] Шрифт Material Symbols підключений в `<head>`
- [ ] Клас `material-symbols-outlined` (не `material-icons`)
- [ ] CSS fallback стилі додані
- [ ] Всі іконки відображаються на index.html
- [ ] Іконки працюють на внутрішніх сторінках
