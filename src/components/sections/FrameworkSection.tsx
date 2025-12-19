import { useTranslation } from 'react-i18next';

export const FrameworkSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8 text-center">
          {t('framework.title')}
        </h2>
        
        <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
          <p>{t('framework.intro')}</p>
          <p>{t('framework.disclaimer')}</p>
          
          <div className="pl-4 border-l-2 border-primary/30">
            <p className="mb-2">{t('framework.activitiesIntro')}</p>
            <ul className="space-y-1 text-foreground/80">
              <li>– {t('framework.activity1')}</li>
              <li>– {t('framework.activity2')}</li>
              <li>– {t('framework.activity3')}</li>
            </ul>
          </div>
          
          <p>{t('framework.legal')}</p>
        </div>
      </div>
    </section>
  );
};
