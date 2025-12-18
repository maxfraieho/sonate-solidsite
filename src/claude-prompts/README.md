# Claude CLI Prompts для violin.pp.ua v4

## Виявлені проблеми (аудит 2025-12-18)

| # | Проблема | Критичність |
|---|---|---|
| 1 | i18n ключі не відповідають JSON | 🔴 КРИТИЧНО |
| 2 | Перемикання мов не працює | 🔴 КРИТИЧНО |
| 3 | Material Icons = текст | 🟡 СЕРЕДНЯ |
| 4 | gallery.html не існує (404!) | 🟡 СЕРЕДНЯ |
| 5 | Внутр. сторінки без lang-switcher | 🟢 НИЗЬКА |

## Швидкий старт

```bash
cd ~/violin.pp.ua
chmod +x src/claude-prompts/run-all.sh
./src/claude-prompts/run-all.sh
```

## Файли

- `MASTER_PROMPT.md` - Головний промт з аудитом
- `TASK_01_I18N_KEYS.md` - Виправлення data-i18n ключів
- `TASK_02_LANG_SWITCHER.md` - Перемикання мов (?lang=)
- `TASK_03_MATERIAL_ICONS.md` - Material Icons
- `TASK_04_GALLERY_CREATE.md` - Створення gallery.html
- `TASK_05_INTERNAL_PAGES.md` - partners.html, contact.html

## Repository
https://github.com/maxfraieho/violin.pp.ua
