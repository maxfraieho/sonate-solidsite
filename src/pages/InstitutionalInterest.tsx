import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Building2, Users, School, Landmark, Handshake, MessageCircle, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const InstitutionalInterest = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  // Get language-aware contact path with preselected subject
  const getContactPath = () => {
    const basePath = lang === 'de' ? '/contact' : `/${lang}/contact`;
    return `${basePath}?subject=institutional`;
  };

  const targetAudience = [
    { icon: School, key: 'schools' },
    { icon: Landmark, key: 'municipalities' },
    { icon: Building2, key: 'cultural' },
    { icon: Users, key: 'associations' },
  ];

  const collaborationTypes = [
    'cultural',
    'pilot',
    'exchange',
    'venue',
    'exploratory',
  ];

  return (
    <>
      <SEO path="/interet-institutionnel" />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" aria-hidden="true" />
                <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" aria-hidden="true" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" aria-hidden="true" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                {t('institutional.title')}
              </h1>
              <p className="text-lg text-subtext max-w-2xl mx-auto">
                {t('institutional.subtitle')}
              </p>
            </header>

            {/* Section 1: Project Stage */}
            <section className="mb-12 bg-surface rounded-xl p-8 border border-border/30">
              <p className="text-foreground leading-relaxed">
                {t('institutional.projectStage.line1')}
              </p>
              <p className="text-subtext leading-relaxed mt-4">
                {t('institutional.projectStage.line2')}
              </p>
            </section>

            {/* Section 2: Target Audience */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {t('institutional.targetAudience.title')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {targetAudience.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={item.key}
                      className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border/30"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <span className="text-foreground">
                        {t(`institutional.targetAudience.${item.key}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 3: Proposed Collaborations */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {t('institutional.proposed.title')}
              </h2>
              <p className="text-subtext mb-6">
                {t('institutional.proposed.intro')}
              </p>
              <ul className="space-y-3">
                {collaborationTypes.map((type) => (
                  <li key={type} className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-foreground">
                      {t(`institutional.proposed.${type}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 4: What is NOT requested */}
            <section className="mb-12 bg-surface-dark rounded-xl p-8 border border-primary/20">
              <h2 className="font-display text-xl font-bold text-primary mb-4">
                {t('institutional.notRequested.title')}
              </h2>
              <p className="text-foreground leading-relaxed">
                {t('institutional.notRequested.line1')}
              </p>
              <p className="text-subtext leading-relaxed mt-3">
                {t('institutional.notRequested.line2')}
              </p>
            </section>

            {/* Section 5: Call to Action */}
            <section className="text-center mb-12">
              <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto">
                {t('institutional.cta.text')}
              </p>
              <Button asChild size="lg" className="gap-2 cta-glow">
                <Link to={getContactPath()}>
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  {t('institutional.cta.button')}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </section>

            {/* Footer Note */}
            <footer className="text-center border-t border-border/30 pt-8">
              <p className="text-sm text-subtext/70 italic max-w-xl mx-auto">
                {t('institutional.footerNote')}
              </p>
            </footer>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default InstitutionalInterest;
