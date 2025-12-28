import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// SVG Flag components
const FlagFR = () => (
  <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
    <rect width="213.3" height="480" fill="#002654"/>
    <rect x="213.3" width="213.3" height="480" fill="#fff"/>
    <rect x="426.6" width="213.3" height="480" fill="#ce1126"/>
  </svg>
);

const FlagDE = () => (
  <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
    <rect width="640" height="160" fill="#000"/>
    <rect y="160" width="640" height="160" fill="#dd0000"/>
    <rect y="320" width="640" height="160" fill="#ffcc00"/>
  </svg>
);

const FlagUA = () => (
  <svg className="w-5 h-4 rounded-sm" viewBox="0 0 640 480">
    <rect width="640" height="240" fill="#0057b7"/>
    <rect y="240" width="640" height="240" fill="#ffd700"/>
  </svg>
);

const languages = [
  { code: 'fr', name: 'Français', Flag: FlagFR },
  { code: 'de', name: 'Deutsch', Flag: FlagDE },
  { code: 'uk', name: 'Українська', Flag: FlagUA },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];
  const CurrentFlag = currentLang.Flag;

  return (
    <nav aria-label="Language selector">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-foreground hover:text-primary"
            aria-label={`Current language: ${currentLang.name}. Click to change language.`}
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline flex items-center gap-2">
              <CurrentFlag /> {currentLang.name}
            </span>
            <span className="sm:hidden"><CurrentFlag /></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-surface border-border">
          {languages.map((lang) => {
            const LangFlag = lang.Flag;
            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`cursor-pointer flex items-center gap-2 ${i18n.language === lang.code ? 'text-primary' : 'text-foreground'}`}
                aria-current={i18n.language === lang.code ? 'true' : undefined}
              >
                <LangFlag />
                {lang.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
