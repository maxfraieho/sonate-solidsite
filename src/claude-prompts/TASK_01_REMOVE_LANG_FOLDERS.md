# TASK 01: Видалення застарілих мовних папок

## DOING
Видалити папки /fr, /uk, /de які містять застарілі дубльовані HTML копії.

## EXPECT
- Папки /fr, /uk, /de повністю видалені
- Єдиним джерелом перекладів залишаються /locales/*.json

## WHY
Ці папки створюють конфлікт з JSON-based i18n системою:
- Вміст не синхронізований між мовами
- Дубляж ускладнює підтримку
- Навігація посилається на неіснуючі шляхи типу /fr/index.html

---

## IMPLEMENTATION

### Крок 1: Перевірити вміст папок

```bash
echo "=== Перевірка вмісту папок ==="
ls -la fr/ 2>/dev/null && echo "fr/ існує" || echo "fr/ не існує"
ls -la uk/ 2>/dev/null && echo "uk/ існує" || echo "uk/ не існує"
ls -la de/ 2>/dev/null && echo "de/ існує" || echo "de/ не існує"
```

### Крок 2: Створити бекап (опціонально)

```bash
# Якщо потрібен бекап:
mkdir -p _archive_lang_folders
mv fr/ _archive_lang_folders/ 2>/dev/null || true
mv uk/ _archive_lang_folders/ 2>/dev/null || true
mv de/ _archive_lang_folders/ 2>/dev/null || true
```

### Крок 3: Або просто видалити

```bash
rm -rf fr/ uk/ de/
```

### Крок 4: Оновити _redirects (Cloudflare)

Перевірити файл `_redirects` і видалити редиректи на /fr/, /uk/, /de/:

```bash
# Видалити рядки з редиректами на мовні папки
sed -i '/\/fr\//d' _redirects 2>/dev/null || true
sed -i '/\/uk\//d' _redirects 2>/dev/null || true
sed -i '/\/de\//d' _redirects 2>/dev/null || true
```

---

## VERIFICATION

```bash
# Перевірка що папки видалені
ls -la fr/ 2>&1 | grep -q "No such file" && echo "✅ fr/ видалено" || echo "❌ fr/ існує"
ls -la uk/ 2>&1 | grep -q "No such file" && echo "✅ uk/ видалено" || echo "❌ uk/ існує"
ls -la de/ 2>&1 | grep -q "No such file" && echo "✅ de/ видалено" || echo "❌ de/ існує"

# Перевірка що locales залишились
ls locales/*.json && echo "✅ JSON словники на місці"
```

## RESULT
- [ ] Папка /fr видалена
- [ ] Папка /uk видалена
- [ ] Папка /de видалена
- [ ] _redirects оновлений (якщо був)
- [ ] /locales/*.json залишились

## NEXT TASK
→ TASK_02_I18N_ENGINE.md
