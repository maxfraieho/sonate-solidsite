import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { useAnalytics } from '@/hooks/use-analytics';
import { CookieConsent } from '@/components/CookieConsent';

export const AnalyticsProvider = () => {
  const { hasConsented, isPending, acceptConsent, declineConsent } = useCookieConsent();

  // Initialize analytics tracking when consent is given
  useAnalytics(hasConsented);

  // Show consent banner only when pending
  if (!isPending) {
    return null;
  }

  return (
    <CookieConsent
      onAccept={acceptConsent}
      onDecline={declineConsent}
    />
  );
};
