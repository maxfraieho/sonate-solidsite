import { useTranslation } from 'react-i18next';

export const QuoteSection = () => {
  const { t } = useTranslation();

  return (
    <section id="manifeste" className="py-20 bg-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-primary rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-primary/50 rounded-full" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Decorative line top */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <div className="mx-3 text-primary text-2xl">♪</div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </div>
        
        <blockquote className="text-2xl md:text-4xl font-display italic text-primary mb-10 leading-relaxed drop-shadow-[0_0_30px_rgba(234,179,8,0.2)]">
          {t('quote.arsen')}
        </blockquote>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
        
        <p className="text-lg md:text-xl text-subtext leading-relaxed max-w-3xl mx-auto">
          {t('quote.description')}
        </p>
        
        {/* Decorative line bottom */}
        <div className="flex items-center justify-center mt-10">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <div className="mx-3 text-primary text-2xl">♪</div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </div>
      </div>
    </section>
  );
};
