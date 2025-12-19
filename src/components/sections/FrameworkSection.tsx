import { useTranslation } from 'react-i18next';

export const FrameworkSection = () => {
  const { t } = useTranslation();

  return (
    <section id="framework" className="py-20 bg-surface">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-10">
          {t('framework.title')}
        </h2>
        
        <div className="space-y-6 text-subtext text-lg leading-relaxed">
          <p>{t('framework.line1')}</p>
          <p>{t('framework.line2')}</p>
          <p className="text-foreground/60 text-base">{t('framework.line3')}</p>
        </div>
      </div>
    </section>
  );
};
