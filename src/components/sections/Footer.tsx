import { useTranslation } from 'react-i18next';
import { Music, Youtube, Heart, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'de' | 'uk';

  const content = {
    description: {
      fr: 'Association suisse à but non lucratif dédiée à l\'accessibilité de la musique classique et au soutien humanitaire pour l\'Ukraine.',
      de: 'Gemeinnütziger Schweizer Verein für den Zugang zur klassischen Musik und humanitäre Hilfe für die Ukraine.',
      uk: 'Швейцарська некомерційна організація, присвячена доступності класичної музики та гуманітарній допомозі Україні.'
    },
    basedIn: {
      fr: 'Basé en Suisse • Cœur en Ukraine 🇺🇦',
      de: 'Sitz in der Schweiz • Herz in der Ukraine 🇺🇦',
      uk: 'Базується у Швейцарії • Серце в Україні 🇺🇦'
    },
    quickLinks: { fr: 'Liens Rapides', de: 'Schnelllinks', uk: 'Швидкі посилання' },
    contact: { fr: 'Contact', de: 'Kontakt', uk: 'Контакти' },
    donate: { fr: 'Faire un don', de: 'Spenden', uk: 'Зробити внесок' },
    copyright: {
      fr: '© 2024 Sonate Solidaire. Tous droits réservés.',
      de: '© 2024 Sonate Solidaire. Alle Rechte vorbehalten.',
      uk: '© 2024 Sonate Solidaire. Усі права захищені.'
    },
    madeWith: {
      fr: 'Développé avec',
      de: 'Entwickelt mit',
      uk: 'Розроблено з'
    },
    inSwitzerland: {
      fr: 'en Suisse',
      de: 'in der Schweiz',
      uk: 'у Швейцарії'
    }
  };

  const privacyLabel = {
    fr: 'Politique de confidentialité',
    de: 'Datenschutzerklärung',
    uk: 'Політика конфіденційності'
  };

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'mission', href: '/integration' },
    { key: 'portfolio', href: '/portfolio' },
    { key: 'solidarity', href: '/support' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <footer className="mt-16 sm:mt-24 bg-surface-dark border-t border-border/40 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Music className="text-primary w-9 h-9" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-foreground">Sonate</span>
                <span className="font-display text-primary text-sm">Solidaire</span>
              </div>
            </div>
            <p className="text-subtext leading-relaxed mb-5 max-w-md">
              {content.description[lang]}
            </p>
            <div className="flex items-center gap-2 text-sm text-subtext">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg" 
                alt="Suisse" 
                className="w-6 h-4"
                loading="lazy"
              />
              <span>{content.basedIn[lang]}</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-lg font-bold text-foreground mb-5">{content.quickLinks[lang]}</h3>
            <ul className="space-y-3 text-subtext">
              {navItems.map((item, idx) => (
                <li key={item.key || idx}>
                  <Link 
                    to={item.href} 
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground mb-5">{content.contact[lang]}</h3>
            <ul className="space-y-4 text-subtext">
              <li>
                <a 
                  href="https://t.me/sonatesolidaire" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200 group"
                >
                  <Send className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  Telegram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/@arsen111999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200 group"
                >
                  <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  YouTube
                </a>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200 group"
                >
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  {content.donate[lang]}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-subtext">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>{content.copyright[lang]}</p>
            <span className="hidden sm:inline text-border">•</span>
            <Link 
              to="/privacy" 
              className="hover:text-primary transition-colors duration-200"
            >
              {privacyLabel[lang]}
            </Link>
          </div>
          <p className="flex items-center gap-2">
            {content.madeWith[lang]} <span className="text-primary animate-pulse">♥</span> {content.inSwitzerland[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
};
