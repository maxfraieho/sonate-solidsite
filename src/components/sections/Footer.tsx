import { useTranslation } from 'react-i18next';
import { Music } from 'lucide-react';

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
      fr: '© 2024 Sonate Solidaire • Association à but non lucratif • Tous droits réservés',
      de: '© 2024 Sonate Solidaire • Gemeinnütziger Verein • Alle Rechte vorbehalten',
      uk: '© 2024 Sonate Solidaire • Некомерційна організація • Усі права захищені'
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

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'mission', href: '/integration' },
    { key: 'actions', href: '/#actions' },
    { key: 'founder', href: '/#fondateur' },
    { key: 'portfolio', href: '/#portfolio' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <footer className="bg-surface border-t border-primary/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Music className="text-primary w-10 h-10" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl">Sonate</span>
                <span className="font-display text-primary text-sm">Solidaire</span>
              </div>
            </div>
            <p className="text-subtext mb-4">
              {content.description[lang]}
            </p>
            <div className="flex items-center gap-2 text-sm text-subtext">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg" 
                alt="Suisse" 
                className="w-6 h-4"
              />
              <span>{content.basedIn[lang]}</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-lg font-bold mb-4">{content.quickLinks[lang]}</h3>
            <ul className="space-y-2 text-subtext">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="hover:text-primary transition-colors">
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">{content.contact[lang]}</h3>
            <ul className="space-y-3 text-subtext">
              <li>
                <a 
                  href="https://t.me/sonatesolidaire" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  Telegram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/@arsen111999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </li>
              <li>
                <a href="#soutenir" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  {content.donate[lang]}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-subtext">
          <p>{content.copyright[lang]}</p>
          <p className="flex items-center gap-2">
            {content.madeWith[lang]} <span className="text-primary">♥</span> {content.inSwitzerland[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
};
