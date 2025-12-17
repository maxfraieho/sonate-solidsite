# Quick Start Commands for Claude CLI

## Швидкий старт

### 1. Скопіюйте папку claude-prompts до вашого проєкту:
```bash
# З Lovable проєкту (якщо клонували)
cp -r src/claude-prompts /path/to/violin.pp.ua/claude-prompts
```

### 2. Перейдіть до папки проєкту:
```bash
cd /path/to/violin.pp.ua
```

### 3. Запустіть Claude CLI:

**Весь набір виправлень одразу:**
```bash
claude chat --file claude-prompts/CLAUDE_MASTER_PROMPT.md
```

**АБО виконуйте поетапно:**
```bash
# Критичні виправлення (спочатку)
claude chat --file claude-prompts/TASK_001_FIX_I18N_KEYS.md
claude chat --file claude-prompts/TASK_002_HEADER_LANG_SWITCHER.md
claude chat --file claude-prompts/TASK_003_HERO_LAYOUT.md

# Виправлення сторінок
claude chat --file claude-prompts/TASK_004_PAGE_TOP_PADDING.md

# Компоненти
claude chat --file claude-prompts/TASK_005_AUDIO_PLAYER.md
claude chat --file claude-prompts/TASK_006_GALLERY_FIX.md

# Різне
claude chat --file claude-prompts/TASK_007_MISC_FIXES.md
```

### 4. Після завершення - коміт:
```bash
git checkout -b fix/full-localization-and-layout
git add .
git commit -m "Fix full localization system, reposition language switcher, correct hero layout, unify mission page"
git push origin fix/full-localization-and-layout
```

---

## Файли

| Файл | Опис |
|------|------|
| `CLAUDE_MASTER_PROMPT.md` | Головний промпт з усіма інструкціями |
| `TASK_001_FIX_I18N_KEYS.md` | Виправлення ключів локалізації |
| `TASK_002_HEADER_LANG_SWITCHER.md` | Позиція перемикача мов |
| `TASK_003_HERO_LAYOUT.md` | Макет hero секції |
| `TASK_004_PAGE_TOP_PADDING.md` | Відступи на сторінках |
| `TASK_005_AUDIO_PLAYER.md` | Аудіо плеєр |
| `TASK_006_GALLERY_FIX.md` | Галерея |
| `TASK_007_MISC_FIXES.md` | Різні виправлення |
| `run-fixes.sh` | Bash скрипт для запуску |

---

## Таблиця ключів i18n (довідка)

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
