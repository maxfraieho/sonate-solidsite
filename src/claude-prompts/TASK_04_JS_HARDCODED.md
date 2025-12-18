# TASK 04: Винесення твердокодованого тексту з JS в JSON

## DOING
Замінити твердокодований французький текст в JS файлах на виклики i18n.t()

## EXPECT
- Всі алерти, повідомлення, кнопки використовують i18n.t()
- Відповідні ключі додані в /locales/*.json
- JS працює на всіх мовах

---

## ФАЙЛИ ДЛЯ ПЕРЕВІРКИ

```
assets/js/main.js
assets/js/contact-form.js
assets/js/cookie-consent.js
assets/js/audio-player.js
assets/js/hero-video.js
assets/js/modules/*.js
```

---

## ТИПОВІ ПРОБЛЕМИ

### 1. Contact Form

**ЗАРАЗ (assets/js/contact-form.js або main.js):**
```javascript
alert('Votre message a été envoyé avec succès!');
alert('Une erreur est survenue. Veuillez réessayer.');
```

**ПОТРІБНО:**
```javascript
alert(window.i18n.t('contact.success'));
alert(window.i18n.t('contact.error'));
```

### 2. Cookie Consent

**ЗАРАЗ:**
```javascript
const message = 'Ce site utilise des cookies...';
const acceptBtn = 'Accepter';
const declineBtn = 'Refuser';
```

**ПОТРІБНО:**
```javascript
const message = window.i18n.t('cookies.message');
const acceptBtn = window.i18n.t('cookies.accept');
const declineBtn = window.i18n.t('cookies.decline');
```

### 3. Form Validation

**ЗАРАЗ:**
```javascript
input.setCustomValidity('Ce champ est requis');
input.setCustomValidity('Email invalide');
```

**ПОТРІБНО:**
```javascript
input.setCustomValidity(window.i18n.t('validation.required'));
input.setCustomValidity(window.i18n.t('validation.invalid_email'));
```

### 4. Audio Player

**ЗАРАЗ:**
```javascript
playBtn.textContent = 'Lecture';
playBtn.textContent = 'Pause';
```

**ПОТРІБНО:**
```javascript
playBtn.textContent = window.i18n.t('player.play');
playBtn.textContent = window.i18n.t('player.pause');
```

---

## IMPLEMENTATION

### Крок 1: Додати ключі в JSON файли

**locales/fr.json** — додати секції:
```json
{
  "contact": {
    "success": "Votre message a été envoyé avec succès !",
    "error": "Une erreur est survenue. Veuillez réessayer.",
    "sending": "Envoi en cours..."
  },
  "cookies": {
    "message": "Ce site utilise des cookies pour améliorer votre expérience.",
    "accept": "Accepter",
    "decline": "Refuser",
    "learn_more": "En savoir plus"
  },
  "validation": {
    "required": "Ce champ est requis",
    "invalid_email": "Adresse email invalide",
    "min_length": "Minimum {min} caractères requis",
    "max_length": "Maximum {max} caractères"
  },
  "player": {
    "play": "Lecture",
    "pause": "Pause",
    "mute": "Couper le son",
    "unmute": "Activer le son"
  }
}
```

**locales/uk.json** — відповідні переклади:
```json
{
  "contact": {
    "success": "Ваше повідомлення успішно надіслано!",
    "error": "Сталася помилка. Спробуйте ще раз.",
    "sending": "Надсилання..."
  },
  "cookies": {
    "message": "Цей сайт використовує cookies для покращення вашого досвіду.",
    "accept": "Прийняти",
    "decline": "Відхилити",
    "learn_more": "Дізнатись більше"
  },
  "validation": {
    "required": "Це поле обов'язкове",
    "invalid_email": "Невірна адреса email",
    "min_length": "Мінімум {min} символів",
    "max_length": "Максимум {max} символів"
  },
  "player": {
    "play": "Відтворити",
    "pause": "Пауза",
    "mute": "Вимкнути звук",
    "unmute": "Увімкнути звук"
  }
}
```

**locales/de.json** — відповідні переклади:
```json
{
  "contact": {
    "success": "Ihre Nachricht wurde erfolgreich gesendet!",
    "error": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    "sending": "Wird gesendet..."
  },
  "cookies": {
    "message": "Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.",
    "accept": "Akzeptieren",
    "decline": "Ablehnen",
    "learn_more": "Mehr erfahren"
  },
  "validation": {
    "required": "Dieses Feld ist erforderlich",
    "invalid_email": "Ungültige E-Mail-Adresse",
    "min_length": "Mindestens {min} Zeichen erforderlich",
    "max_length": "Maximal {max} Zeichen"
  },
  "player": {
    "play": "Abspielen",
    "pause": "Pause",
    "mute": "Stumm",
    "unmute": "Ton an"
  }
}
```

### Крок 2: Оновити JS файли

```bash
# Знайти всі твердокодовані французькі рядки
grep -rn "Votre message" assets/js/
grep -rn "erreur" assets/js/
grep -rn "Accepter" assets/js/
grep -rn "Ce champ" assets/js/
```

### Крок 3: Шаблон для заміни

```javascript
// Замість прямого тексту:
// alert('Votre message a été envoyé');

// Використовувати:
if (window.i18n && window.i18n.t) {
  alert(window.i18n.t('contact.success'));
} else {
  // Fallback якщо i18n не завантажено
  alert('Message sent successfully');
}

// Або коротше (якщо i18n гарантовано є):
alert(window.i18n.t('contact.success'));
```

---

## VERIFICATION

```bash
# Пошук залишків французького тексту
echo "=== Пошук твердокодованого FR тексту ==="
grep -rn "Votre message" assets/js/
grep -rn "erreur est survenue" assets/js/
grep -rn "Ce site utilise" assets/js/
grep -rn "Ce champ est" assets/js/

# Має повернути порожній результат

# Перевірити що i18n.t використовується
echo "=== Перевірка використання i18n.t ==="
grep -c "i18n.t(" assets/js/*.js
```

---

## RESULT
- [ ] Ключі contact.* додані у всі JSON файли
- [ ] Ключі cookies.* додані у всі JSON файли
- [ ] Ключі validation.* додані у всі JSON файли
- [ ] Ключі player.* додані у всі JSON файли
- [ ] JS файли використовують window.i18n.t()
- [ ] Немає твердокодованого FR тексту в JS

## NEXT TASK
→ TASK_05_MATERIAL_ICONS.md
