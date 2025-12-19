import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Music, Users, MessageCircle, Heart } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              {t('integrationPath.title')}
            </h1>
            <p className="text-lg text-subtext leading-relaxed max-w-2xl mx-auto">
              {t('integrationPath.intro')}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-6 p-6 bg-surface rounded-xl border border-border/30"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-primary/60">{step.number}</span>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {t(step.titleKey)}
                      </h3>
                    </div>
                    <p className="text-subtext leading-relaxed">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual diagram */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-0.5 bg-border mx-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center border-t border-border/30 pt-10">
            <p className="text-sm text-subtext leading-relaxed max-w-xl mx-auto">
              {t('integrationPath.disclaimer')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IntegrationPath;
