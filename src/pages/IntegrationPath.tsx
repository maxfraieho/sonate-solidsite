import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Music, Users, MessageCircle, Heart, Frame, Eye, Globe, Network, Clock, Award, HandHeart, Compass, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

const IntegrationPath = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Music,
      number: '01',
      titleKey: 'integrationPath.step1.title',
      descKey: 'integrationPath.step1.desc',
    },
    {
      icon: Users,
      number: '02',
      titleKey: 'integrationPath.step2.title',
      descKey: 'integrationPath.step2.desc',
    },
    {
      icon: MessageCircle,
      number: '03',
      titleKey: 'integrationPath.step3.title',
      descKey: 'integrationPath.step3.desc',
    },
    {
      icon: Heart,
      number: '04',
      titleKey: 'integrationPath.step4.title',
      descKey: 'integrationPath.step4.desc',
    },
  ];

  const gives = [
    { icon: Frame, titleKey: 'integrationDetails.gives1Title', descKey: 'integrationDetails.gives1Desc' },
    { icon: Eye, titleKey: 'integrationDetails.gives2Title', descKey: 'integrationDetails.gives2Desc' },
    { icon: Globe, titleKey: 'integrationDetails.gives3Title', descKey: 'integrationDetails.gives3Desc' },
    { icon: Network, titleKey: 'integrationDetails.gives4Title', descKey: 'integrationDetails.gives4Desc' },
  ];

  const expects = [
    { icon: Clock, titleKey: 'integrationDetails.expects1Title', descKey: 'integrationDetails.expects1Desc' },
    { icon: Award, titleKey: 'integrationDetails.expects2Title', descKey: 'integrationDetails.expects2Desc' },
    { icon: HandHeart, titleKey: 'integrationDetails.expects3Title', descKey: 'integrationDetails.expects3Desc' },
    { icon: Compass, titleKey: 'integrationDetails.expects4Title', descKey: 'integrationDetails.expects4Desc' },
  ];

  return (
    <>
      <SEO path="/integration" />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" aria-hidden="true" />
                <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" aria-hidden="true" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" aria-hidden="true" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                {t('integrationPath.title')}
              </h1>
              <p className="text-sm text-subtext/80 italic mb-6 max-w-2xl mx-auto">
                {t('integrationPath.contextDisclaimer')}
              </p>
              <p className="text-lg text-subtext leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                {t('integrationPath.intro')}
              </p>
            </header>

            {/* Principles note */}
            <p className="text-center text-sm text-subtext/80 italic mb-8 max-w-2xl mx-auto">
              {t('integrationPath.principlesNote')}
            </p>

            {/* Steps */}
            <section className="space-y-6 mb-20" aria-label="Integration principles">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article
                    key={index}
                    className="group flex items-start gap-6 p-6 bg-surface rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-primary/60">{step.number}</span>
                        <h2 className="font-display text-xl font-semibold text-foreground">
                          {t(step.titleKey)}
                        </h2>
                      </div>
                      <p className="text-subtext leading-relaxed">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Contextual link to Portfolio */}
            <div className="text-center mb-12">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
              >
                <span>{t('integrationPath.portfolioLink')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Visual diagram */}
            <aside className="mb-20" aria-label="Integration path visual diagram">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-8 h-0.5 bg-primary/30 mx-1" aria-hidden="true" />
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* What project GIVES */}
            <section className="mb-16" aria-label="What the project offers">
              <header className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold text-primary mb-2">
                  {t('integrationDetails.givesTitle')}
                </h2>
                <p className="text-subtext">{t('integrationDetails.givesSubtitle')}</p>
              </header>
              <div className="grid md:grid-cols-2 gap-6">
                {gives.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article key={index} className="group bg-surface rounded-xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-green-500" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-foreground mb-2">
                            {t(item.titleKey)}
                          </h3>
                          <p className="text-subtext text-sm leading-relaxed">
                            {t(item.descKey)}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* What project EXPECTS */}
            <section className="mb-16" aria-label="What the project expects">
              <header className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold text-primary mb-2">
                  {t('integrationDetails.expectsTitle')}
                </h2>
                <p className="text-subtext">{t('integrationDetails.expectsSubtitle')}</p>
              </header>
              <div className="grid md:grid-cols-2 gap-6">
                {expects.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article key={index} className="group bg-surface rounded-xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-foreground mb-2">
                            {t(item.titleKey)}
                          </h3>
                          <p className="text-subtext text-sm leading-relaxed">
                            {t(item.descKey)}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Disclaimer */}
            <footer className="text-center border-t border-border/30 pt-10">
              <p className="text-sm text-subtext leading-relaxed max-w-xl mx-auto italic mb-6">
                {t('integrationPath.disclaimer')}
              </p>
              {/* Contextual link to Contact */}
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
              >
                <span>{t('integrationPath.contactLink')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </footer>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default IntegrationPath;
