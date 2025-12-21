import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background Image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="https://violin.pp.ua/assets/img/hero-large-blur3.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-16">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 text-foreground drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-primary font-semibold">
            {t('hero.tagline')}
          </p>
          <p className="text-lg md:text-xl mb-8 text-subtext max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
        </div>

        <div className="animate-fade-in-up animation-delay-200 flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a href="#soutenir" aria-label={t('hero.supportCta')}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-hover text-lg px-8 py-6 shadow-lg cta-glow">
              {t('hero.supportCta')}
            </Button>
          </a>
          <a href="/integration" aria-label={t('hero.integrationCta')}>
            <Button size="lg" variant="outline" className="border-2 border-foreground/60 text-foreground/90 hover:bg-foreground/10 hover:border-foreground text-lg px-8 py-6">
              {t('hero.integrationCta')}
            </Button>
          </a>
        </div>

        <img
          src="https://violin.pp.ua/assets/img/logo-sonate.png"
          alt="Logo Sonate Solidaire"
          className="hidden md:inline-block h-48 rounded-full opacity-90 shadow-lg shadow-primary/30 animate-fade-in-up animation-delay-300"
          loading="eager"
        />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => document.getElementById('manifeste')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 -ml-4 z-10 animate-bounce cursor-pointer group"
        aria-label="Scroll down to read more"
      >
        <div className="w-8 h-14 border-2 border-primary rounded-full flex justify-center pt-2 group-hover:border-primary-hover transition-colors" aria-hidden="true">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse group-hover:bg-primary-hover" />
        </div>
      </button>
    </section>
  );
};
