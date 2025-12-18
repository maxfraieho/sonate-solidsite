import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-8 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-subtext text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-subtext hover:text-primary text-sm transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-subtext hover:text-primary text-sm transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
