import { useTranslation } from 'react-i18next';
import { Heart, Users, Palette, Link, Zap, Activity } from 'lucide-react';

const manifestoItems = [
  { key: 'v', letter: 'V', icon: Heart },
  { key: 'i', letter: 'I', icon: Users },
  { key: 'o', letter: 'O', icon: Palette },
  { key: 'l', letter: 'L', icon: Link },
  { key: 'i2', letter: 'I', icon: Zap },
  { key: 'n', letter: 'N', icon: Activity },
];

export const ManifestoSection = () => {
  const { t } = useTranslation();

  return (
    <section id="manifeste" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
            {t('manifesto.title')}
          </h2>
          <p className="text-lg md:text-xl text-subtext">
            {t('manifesto.intro')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manifestoItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="bg-background border border-primary/30 rounded-2xl p-6 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-6xl font-display font-bold text-primary">{item.letter}</span>
                </div>
                <h4 className="text-2xl font-display font-bold text-foreground mb-3">
                  {t(`manifesto.${item.key}.title`)}
                </h4>
                <p className="text-subtext">
                  {t(`manifesto.${item.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
