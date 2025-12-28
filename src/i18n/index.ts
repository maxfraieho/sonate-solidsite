import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from './locales/fr.json';
import de from './locales/de.json';
import uk from './locales/uk.json';

const savedLanguage = localStorage.getItem('language') || 'fr'; // Default to French (Canton de Vaud)

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      de: { translation: de },
      uk: { translation: uk }
    },
    lng: savedLanguage,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
