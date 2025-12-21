import { useState, useEffect, useCallback } from 'react';

const CONSENT_COOKIE_NAME = 'analytics_consent';
const CONSENT_EXPIRY_DAYS = 365;

type ConsentStatus = 'pending' | 'accepted' | 'declined';

export const useCookieConsent = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (stored === 'accepted' || stored === 'declined') {
      setConsentStatus(stored);
    }
  }, []);

  const acceptConsent = useCallback(() => {
    localStorage.setItem(CONSENT_COOKIE_NAME, 'accepted');
    setConsentStatus('accepted');
    
    // Set cookie for server-side detection
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
    document.cookie = `${CONSENT_COOKIE_NAME}=accepted; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }, []);

  const declineConsent = useCallback(() => {
    localStorage.setItem(CONSENT_COOKIE_NAME, 'declined');
    setConsentStatus('declined');
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
    document.cookie = `${CONSENT_COOKIE_NAME}=declined; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
  }, []);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
    document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setConsentStatus('pending');
  }, []);

  return {
    consentStatus,
    hasConsented: consentStatus === 'accepted',
    hasDeclined: consentStatus === 'declined',
    isPending: consentStatus === 'pending',
    acceptConsent,
    declineConsent,
    resetConsent,
  };
};
