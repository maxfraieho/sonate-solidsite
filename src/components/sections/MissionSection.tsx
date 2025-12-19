import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
            <p className="text-lg text-subtext whitespace-pre-line leading-relaxed mb-8">
              {t('mission.intro')}
            </p>

            <Button asChild size="lg" className="group">
              <Link to="/integration">
                {t('mission.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
