import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const CookieConsent = ({ onAccept, onDecline }: CookieConsentProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const content = {
    de: {
      title: 'Datenschutz & Cookies',
      description:
        'Wir verwenden Google Analytics, um die Nutzung unserer Website zu analysieren und zu verbessern. Gemäss dem Schweizer Datenschutzgesetz (nDSG) und der DSGVO bitten wir um Ihre Zustimmung zur Verwendung von Analyse-Cookies. Ihre Daten werden anonymisiert und nicht für Werbezwecke verwendet.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen',
      learnMore: 'Mehr erfahren',
    },
    fr: {
      title: 'Protection des données & Cookies',
      description:
        "Nous utilisons Google Analytics pour analyser et améliorer l'utilisation de notre site. Conformément à la loi suisse sur la protection des données (nLPD) et au RGPD, nous demandons votre consentement pour l'utilisation de cookies analytiques. Vos données sont anonymisées et ne sont pas utilisées à des fins publicitaires.",
      accept: 'Accepter',
      decline: 'Refuser',
      learnMore: 'En savoir plus',
    },
    uk: {
      title: 'Захист даних та Cookies',
      description:
        'Ми використовуємо Google Analytics для аналізу та покращення роботи нашого сайту. Відповідно до швейцарського закону про захист даних (nDSG) та GDPR, ми просимо вашу згоду на використання аналітичних cookies. Ваші дані анонімізуються та не використовуються для реклами.',
      accept: 'Прийняти',
      decline: 'Відхилити',
      learnMore: 'Дізнатись більше',
    },
  };

  const t = content[lang as keyof typeof content] || content.de;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Shield className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.description}{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  {t.learnMore}
                </a>
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={onDecline}
              className="flex-1 md:flex-none"
            >
              {t.decline}
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 md:flex-none"
            >
              {t.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
