import { useTranslation } from 'react-i18next';
import { Heart, Mail, MessageSquareHeart, Calendar, Users, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const SupportSection = () => {
  const { t } = useTranslation();

  const steps = [
    { key: 'step1', icon: Check, status: 'done' },
    { key: 'step2', icon: Clock, status: 'current' },
    { key: 'step3', icon: Clock, status: 'pending' },
    { key: 'step4', icon: Clock, status: 'pending' },
  ];

  const actionCards = [
    {
      key: 'testimonial',
      icon: MessageSquareHeart,
      link: '/support',
    },
    {
      key: 'concert',
      icon: Calendar,
      link: '/contact',
    },
    {
      key: 'partner',
      icon: Users,
      link: '/contact',
    },
  ];

  return (
    <section id="soutenir" className="py-24 bg-background relative overflow-hidden">
      {/* Backward-compatible anchor for old links */}
      <div id="don" className="absolute -top-20" aria-hidden="true" />
      
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary rounded-full" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">{t('support.title')}</span>{' '}
            <span className="text-primary drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]">{t('support.subtitle')}</span>
          </h2>
          <p className="text-subtext text-lg md:text-xl max-w-2xl mx-auto">
            {t('support.description')}
          </p>
        </div>

        {/* Status Timeline Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-surface border border-primary/30 rounded-3xl p-8 md:p-10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-8">
                {t('support.statusTitle')}
              </h3>
              
              {/* Timeline */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isDone = step.status === 'done';
                  const isCurrent = step.status === 'current';
                  
                  return (
                    <div key={step.key} className="relative">
                      {/* Connector line */}
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-primary/20">
                          {isDone && <div className="h-full bg-primary w-full" />}
                        </div>
                      )}
                      
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                          isDone 
                            ? 'bg-primary text-primary-foreground' 
                            : isCurrent 
                              ? 'bg-primary/20 border-2 border-primary text-primary animate-pulse' 
                              : 'bg-muted border border-border text-muted-foreground'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className={`font-semibold text-sm ${isDone || isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {t(`support.${step.key}`)}
                        </p>
                        <p className={`text-xs mt-1 ${isDone || isCurrent ? 'text-subtext' : 'text-muted-foreground'}`}>
                          {t(`support.${step.key}Desc`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <p className="text-center text-subtext text-sm border-t border-primary/20 pt-6">
                {t('support.statusDisclaimer')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.key} to={card.link} className="group/card relative block">
                <div className="absolute -inset-1 bg-primary/10 rounded-2xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-surface border border-primary/20 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300 h-full hover:-translate-y-1">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover/card:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-display font-bold text-foreground text-xl mb-3">
                    {t(`support.${card.key}Card`)}
                  </h4>
                  <p className="text-subtext text-sm">
                    {t(`support.${card.key}Desc`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                disabled 
                className="bg-primary/50 text-primary-foreground gap-3 px-10 py-7 text-lg rounded-full cursor-not-allowed opacity-60"
              >
                <Heart className="h-6 w-6" />
                {t('support.donateButton')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('support.comingSoon')}</p>
            </TooltipContent>
          </Tooltip>
          
          <Link to="/contact">
            <Button variant="outline" className="border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary gap-3 px-10 py-7 text-lg rounded-full transition-all duration-300 hover:-translate-y-1">
              <Mail className="h-6 w-6" />
              {t('support.contactUs')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
