import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
  const [open, setOpen] = useState(false);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];
  const CurrentFlag = currentLang.Flag;

  return (
    <nav aria-label="Language selector">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
        <PopoverContent 
          align="end" 
          className="w-48 p-1 bg-popover border-border"
          sideOffset={8}
        >
          <div className="flex flex-col">
            {languages.map((lang) => {
              const LangFlag = lang.Flag;
              const isActive = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-primary bg-accent' 
                      : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <LangFlag />
                  <span className="flex-1 text-left">{lang.name}</span>
                  {isActive && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
};
