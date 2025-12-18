import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', shortCode: 'FR' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', shortCode: 'DE' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', shortCode: 'UA' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-primary">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang.shortCode} {currentLang.name}</span>
          <span className="sm:hidden">{currentLang.shortCode}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-surface border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer ${i18n.language === lang.code ? 'text-primary' : 'text-foreground'}`}
          >
            <span className="mr-2 text-xs font-medium uppercase opacity-60">{lang.shortCode}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
