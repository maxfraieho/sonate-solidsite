import { useTranslation } from 'react-i18next';
import { Heart, Brain, Users, Music } from 'lucide-react';

export const ApproachSection = () => {
  const { t } = useTranslation();

  return (
    <section id="approach" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            {t('approach.title')}
          </h2>
          <p className="text-xl text-foreground font-semibold mb-4">
            {t('approach.subtitle')}
          </p>
          <p className="text-lg text-subtext max-w-3xl mx-auto">
            {t('approach.intro')}
          </p>
        </div>

        {/* What this is NOT */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="group bg-surface rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {t('approach.notCharity')}
              </h3>
            </div>
            <p className="text-subtext text-sm leading-relaxed">
              {t('approach.notCharityDesc')}
            </p>
          </div>

          <div className="group bg-surface rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {t('approach.notTherapy')}
              </h3>
            </div>
            <p className="text-subtext text-sm leading-relaxed">
              {t('approach.notTherapyDesc')}
            </p>
          </div>

          <div className="group bg-surface rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {t('approach.activeParticipation')}
              </h3>
            </div>
            <p className="text-subtext text-sm leading-relaxed">
              {t('approach.activeParticipationDesc')}
            </p>
          </div>
        </div>

        {/* Musician Role - Single centered card */}
        <div className="max-w-2xl mx-auto">
          <div className="group relative bg-gradient-to-br from-surface to-surface/50 rounded-2xl p-8 border border-border/30 hover:border-primary/30 transition-all duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary font-medium">{t('approach.musicianRole')}</p>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {t('approach.musicianRoleTitle')}
                  </h3>
                </div>
              </div>
              <p className="text-subtext leading-relaxed">
                {t('approach.musicianRoleDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};
