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
    <section id="actions" className="py-20 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with decorative elements */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">
            {t('actions.title')}
          </h2>
          <p className="mt-6 text-subtext max-w-3xl mx-auto leading-relaxed">
            {t('actions.intro')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-surface border border-primary/20 rounded-2xl p-10 text-center hover:border-primary/60 transition-all duration-500 h-full">
                  {/* Icon with glow */}
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-20 h-20 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {t(`actions.${item.key}.title`)}
                  </h4>
                  
                  <p className="text-subtext leading-relaxed">
                    {t(`actions.${item.key}.desc`)}
                  </p>
                  
                  {/* Bottom decorative line */}
                  <div className="mt-6 h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
