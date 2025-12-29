import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { key: 'home', href: '/#home', path: '/' },
    { key: 'mission', href: '/integration', isRoute: true, path: '/integration' },
    { key: 'ensemble', href: '/#ensemble', path: '/' },
    { key: 'portfolio', href: '/portfolio', isRoute: true, path: '/portfolio' },
    { key: 'solidarity', href: '/support', isRoute: true, path: '/support' },
    { key: 'contact', href: '/contact', isRoute: true, path: '/contact' },
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.isRoute) {
      return location.pathname === item.path;
    }
    // For hash links on homepage, check if we're on the homepage
    if (item.path === '/' && location.pathname === '/') {
      const hash = item.href.replace('/', '');
      return location.hash === hash || (item.key === 'home' && !location.hash);
    }
    return false;
  };

  const getLinkClasses = (item: typeof navItems[0]) => {
    const active = isActive(item);
    return `relative text-sm font-medium transition-colors duration-200 ${
      active
        ? 'text-primary'
        : 'text-foreground hover:text-primary/80'
    }`;
  };

  const getUnderlineClasses = (item: typeof navItems[0]) => {
    const active = isActive(item);
    return `absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
      active ? 'w-full' : 'w-0 group-hover:w-full'
    }`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Sonate Solidaire - Home">
            <span className="text-xl sm:text-2xl font-display font-bold text-primary group-hover:text-primary/80 transition-colors">
              Sonate Solidaire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <div key={item.key} className="relative group">
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={getLinkClasses(item)}
                  >
                    {t(`nav.${item.key}`)}
                    <span className={getUnderlineClasses(item)} />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={getLinkClasses(item)}
                  >
                    {t(`nav.${item.key}`)}
                    <span className={getUnderlineClasses(item)} />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <Link to="/support" aria-label={t('nav.support')}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary-hover gap-2 cta-glow text-sm">
                <Heart className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{t('nav.support')}</span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-fade-in" role="menu">
            {navItems.map((item) => {
              const active = isActive(item);
              return item.isRoute ? (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`block py-3 transition-colors ${
                    active 
                      ? 'text-primary font-medium border-l-2 border-primary pl-4' 
                      : 'text-foreground hover:text-primary pl-4'
                  }`}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block py-3 transition-colors ${
                    active 
                      ? 'text-primary font-medium border-l-2 border-primary pl-4' 
                      : 'text-foreground hover:text-primary pl-4'
                  }`}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  {t(`nav.${item.key}`)}
                </a>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};
