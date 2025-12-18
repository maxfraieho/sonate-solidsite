# Claude CLI Prompts for violin.pp.ua

## Оптимізовано під CLAUDE.md Protocol

Ці промпти адаптовані під ваш CLAUDE.md з:
- ✅ Explicit Reasoning Protocol (DOING/EXPECT/RESULT/MATCHES)
- ✅ Checkpoint-и після критичних операцій
- ✅ Skills підказки для кожного завдання
- ✅ Handoff протокол для передачі контексту
- ✅ Правильний git workflow (окремі `git add`, без `git add .`)
- ✅ Session management нагадування

---

## Швидкий старт

### 1. Скопіюйте папку до проєкту:
```bash
cp -r src/claude-prompts /path/to/violin.pp.ua/claude-prompts
```

### 2. Почніть сесію:
```bash
cd /path/to/violin.pp.ua
/project:session-start violin-localization-fix
```

### 3. Запустіть Claude CLI:

**Весь набір виправлень:**
```bash
claude chat --file claude-prompts/CLAUDE_MASTER_PROMPT.md
```

**АБО поетапно:**
```bash
# Phase 1: Critical (виконайте спочатку)
claude chat --file claude-prompts/TASK_001_FIX_I18N_KEYS.md
claude chat --file claude-prompts/TASK_002_HEADER_LANG_SWITCHER.md
claude chat --file claude-prompts/TASK_003_HERO_LAYOUT.md

# Phase 2: Pages
claude chat --file claude-prompts/TASK_004_PAGE_TOP_PADDING.md

# Phase 3: Components
claude chat --file claude-prompts/TASK_005_AUDIO_PLAYER.md
claude chat --file claude-prompts/TASK_006_GALLERY_FIX.md

# Phase 4: Cleanup
claude chat --file claude-prompts/TASK_007_MISC_FIXES.md
```

### 4. Оновлюйте сесію:
```bash
/project:session-update Completed Phase 1 - i18n keys fixed
```

### 5. Завершіть сесію:
```bash
/project:session-end
```

---

## Файли

| Файл | Skills | Опис |
|------|--------|------|
| `CLAUDE_MASTER_PROMPT.md` | executing-plans, verification | Головний промпт |
| `TASK_001_FIX_I18N_KEYS.md` | systematic-debugging | Виправлення ключів |
| `TASK_002_HEADER_LANG_SWITCHER.md` | frontend-design | Позиція перемикача |
| `TASK_003_HERO_LAYOUT.md` | frontend-design | Макет hero |
| `TASK_004_PAGE_TOP_PADDING.md` | frontend-design | Відступи сторінок |
| `TASK_005_AUDIO_PLAYER.md` | frontend-design, debugging | Аудіо плеєр |
| `TASK_006_GALLERY_FIX.md` | frontend-design, debugging | Галерея |
| `TASK_007_MISC_FIXES.md` | verification | Різні виправлення |
| `run-fixes.sh` | — | Bash меню |

---

## Git Workflow (КРИТИЧНО)

**НІКОЛИ не використовуйте `git add .`!**

Правильно:
```bash
git checkout -b fix/full-localization-and-layout

# Додавайте файли окремо
git add index.html
git add fr/index.html
git add uk/index.html
git add de/index.html
git add assets/css/main.css
git add assets/js/lang-switcher.js
# ... всі змінені файли окремо

git commit -m "fix: localization and layout improvements"
git push origin fix/full-localization-and-layout
```

---

## Reasoning Protocol

Кожен промпт слідує протоколу:

**Перед дією:**
```
DOING: [що робимо]
EXPECT: [очікуваний результат]
IF YES: [наступний крок]
IF NO: [зупинка, діагностика]
```

**Після дії:**
```
RESULT: [що сталось]
MATCHES: [так/ні]
THEREFORE: [висновок]
```

**При помилці:**
```
FAILED: [що не спрацювало]
ERROR: [точний текст помилки]
THEORY: [чому це сталось]
PROPOSAL: [що хочу спробувати]
Q, should I proceed? [чекаємо підтвердження]
```

---

## Таблиця ключів i18n

```
НЕПРАВИЛЬНО                  → ПРАВИЛЬНО
hero.supportCta              → hero.cta_support
hero.founderCta              → hero.cta_founder
manifesto.v.title            → manifesto.values.v_title
manifesto.v.desc             → manifesto.values.v_desc
manifesto.i.title            → manifesto.values.i_title
manifesto.i.desc             → manifesto.values.i_desc
manifesto.o.title            → manifesto.values.o_title
manifesto.o.desc             → manifesto.values.o_desc
manifesto.l.title            → manifesto.values.l_title
manifesto.l.desc             → manifesto.values.l_desc
manifesto.i2.title           → manifesto.values.i2_title
manifesto.i2.desc            → manifesto.values.i2_desc
manifesto.n.title            → manifesto.values.n_title
manifesto.n.desc             → manifesto.values.n_desc
quote.arsen                  → manifesto.quote
mission.cohesion.title       → mission.items.cohesion
mission.cohesion.desc        → mission.items.cohesion_desc
mission.mediation.title      → mission.items.mediation
mission.mediation.desc       → mission.items.mediation_desc
mission.integration.title    → mission.items.integration
mission.integration.desc     → mission.items.integration_desc
```

---

## Підтримка

- Repository: https://github.com/maxfraieho/violin.pp.ua
- Live: https://violin.pp.ua
