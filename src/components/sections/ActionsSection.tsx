import { useTranslation } from 'react-i18next';
import { Music, Heart, Globe } from 'lucide-react';

const actionItems = [
  { key: 'concerts', icon: Music },
  { key: 'humanitarian', icon: Heart },
  { key: 'integration', icon: Globe },
];

export const ActionsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="actions" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary text-center mb-16">
          {t('actions.title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {actionItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="bg-surface border border-primary/30 rounded-2xl p-8 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-6">
                  <Icon className="h-16 w-16 text-primary mx-auto group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {t(`actions.${item.key}.title`)}
                </h4>
                <p className="text-subtext">
                  {t(`actions.${item.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
