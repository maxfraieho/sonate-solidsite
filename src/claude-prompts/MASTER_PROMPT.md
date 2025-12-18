# MASTER PROMPT: violin.pp.ua — Повне виправлення локалізації та верстки

## Активувати навички
```
RECOMMENDED SKILLS:
- frontend-design
- systematic-debugging  
- verification-before-completion
- executing-plans
```

## Протокол явного міркування (ОБОВ'ЯЗКОВО)

Перед КОЖНОЮ зміною файлу:
```
DOING: [що робиш]
EXPECT: [очікуваний результат]
IF YES: [наступний крок]
IF NO: [зупинка, діагностика]
```

Після КОЖНОЇ дії:
```
RESULT: [що сталося]
MATCHES: [так/ні]
THEREFORE: [висновок]
```

---

## Поточний стан (перевірено 2025-01-18)

### index.html — КРИТИЧНІ ПРОБЛЕМИ:
1. ❌ Прапорці зліва від логотипу (мають бути ПІСЛЯ логотипу)
2. ❌ `music_note` — текст замість Material Icon
3. ❌ Кнопки hero: `hero.supportCta`, `hero.founderCta` — сирі ключі
4. ❌ `keyboard_arrow_down` — текст замість іконки
5. ❌ Manifesto: `manifesto.v.title`, `manifesto.v.desc` — всі ключі не перекладені
6. ❌ `quote.arsen` — сирий ключ
7. ❌ Mission: `mission.cohesion.title` тощо — сирі ключі
8. ❌ Немає золотого підкреслення активної мови

### gallery.html — КРИТИЧНО:
- ❌ Показує контент index.html замість галереї

### partners.html:
- ❌ Заголовок "Nos Partenaires" обрізаний зверху
- ❌ Немає прапорців локалізації

---

## Порядок виконання завдань

### ФАЗА 1: Header та Language Switcher
**Файл:** `TASK_01_HEADER_LANG_SWITCHER.md`

### ФАЗА 2: Material Icons
**Файл:** `TASK_02_MATERIAL_ICONS.md`

### ФАЗА 3: i18n виправлення
**Файл:** `TASK_03_I18N_KEYS.md`

### ФАЗА 4: Gallery та інші сторінки
**Файл:** `TASK_04_PAGES_FIX.md`

### ФАЗА 5: CSS та верстка
**Файл:** `TASK_05_CSS_LAYOUT.md`

---

## Правила

1. **НЕ** рефакторити код поза явними вимогами
2. **НЕ** вигадувати новий UI
3. Всі зміни мають працювати однаково в FR, UK, DE
4. Використовувати АБСОЛЮТНІ шляхи: `/assets/css/main.css`
5. Checkpoint кожні 3 файли
6. Якщо щось не працює — ЗУПИНИТИСЬ і запитати Q

---

## Git Workflow

```bash
git checkout -b fix/full-localization-v2

# Додавати файли ІНДИВІДУАЛЬНО (НІКОЛИ git add .)
git add index.html
git add gallery.html
git add partners.html
# ... і так далі

git commit -m "fix: header lang switcher, material icons, i18n keys, gallery, page padding

- Прапорці перенесені після логотипу
- Material Icons завантажуються правильно
- Всі i18n ключі виправлені
- Gallery показує правильний контент
- Padding для заголовків сторінок"

git push origin fix/full-localization-v2
```

---

## Контакти

Репозиторій: https://github.com/maxfraieho/violin.pp.ua
Сайт: https://violin.pp.ua
