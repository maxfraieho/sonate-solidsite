import { useTranslation } from 'react-i18next';

export const QuoteSection = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-b border-primary/20 my-12 py-12 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-light text-subtext leading-relaxed max-w-5xl mx-auto italic">
          {t('quote.arsen')}
        </h2>
      </div>
    </div>
  );
};
