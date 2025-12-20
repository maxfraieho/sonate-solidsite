import { useTranslation } from 'react-i18next';

export const QuoteSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="text-2xl md:text-3xl font-display italic text-primary mb-8">
          {t('quote.arsen')}
        </blockquote>
        <p className="text-lg text-subtext leading-relaxed">
          {t('quote.description')}
        </p>
      </div>
    </section>
  );
};
