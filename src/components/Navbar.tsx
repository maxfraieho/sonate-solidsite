import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '/#home' },
    { key: 'mission', href: '/integration', isRoute: true },
    { key: 'actions', href: '/#actions' },
    { key: 'founder', href: '/#fondateur' },
    { key: 'portfolio', href: '/#portfolio' },
    { key: 'contact', href: '/contact', isRoute: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-primary">Sonate Solidaire</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.key}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {t(`nav.${item.key}`)}
                </a>
              )
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a href="/#soutenir">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-hover gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">{t('nav.donate')}</span>
              </Button>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.key}
                  to={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
