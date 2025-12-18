import { useTranslation } from 'react-i18next';
import { Users, Languages, Home } from 'lucide-react';

const missionItems = [
  { key: 'cohesion', icon: Users },
  { key: 'mediation', icon: Languages },
  { key: 'integration', icon: Home },
];

export const MissionSection = () => {
  const { t } = useTranslation();

  return (
    <section id="mission" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-primary text-center mb-16">
          {t('mission.title')}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://violin.pp.ua/assets/img/chee-yun-s.jpg"
              className="w-full rounded-2xl shadow-2xl shadow-primary/20"
              alt="Mission Sonate Solidaire"
            />
          </div>
          <div>
            <h3 className="text-3xl font-display font-bold text-primary mb-6">
              {t('mission.subtitle')}
            </h3>
            <p className="text-lg text-subtext mb-8">
              {t('mission.intro')}
            </p>

            <div className="space-y-6">
              {missionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="flex items-start gap-4 hover:opacity-80 transition-opacity duration-300 group cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h5 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {t(`mission.${item.key}.title`)}
                      </h5>
                      <p className="text-subtext">
                        {t(`mission.${item.key}.desc`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
