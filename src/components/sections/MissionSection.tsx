import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const MissionSection = () => {
  const { t } = useTranslation();

  return (
    <section id="mission" className="py-20 bg-surface relative overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with decorative elements */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">
            {t('mission.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {/* Image glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/images/founder.jpg"
              className="relative w-full rounded-2xl shadow-2xl shadow-primary/20 border border-primary/10"
              alt="Mission Sonate Solidaire"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <div className="text-lg text-subtext leading-relaxed mb-10 text-left space-y-5">
              <p className="relative pl-6 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300">
                {t('mission.line1')}
              </p>
              <p className="relative pl-6 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300">
                {t('mission.line4')}
              </p>
              <p className="relative pl-6 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300">
                {t('mission.line5')}
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button asChild size="lg" className="group bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300">
                <Link to="/integration">
                  {t('mission.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};
