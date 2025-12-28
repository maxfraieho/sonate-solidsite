import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://violin.pp.ua';

interface MusicEventData {
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  description?: string;
}

interface StructuredDataProps {
  event?: MusicEventData;
}

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sonate Solidaire',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-sonate.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: 'Association suisse à but non lucratif pour l\'intégration culturelle des Ukrainiens par la musique.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Vaud, Switzerland',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gland',
    addressRegion: 'Vaud',
    addressCountry: 'CH',
  },
  sameAs: [
    'https://t.me/sonatesolidaire',
    'https://www.youtube.com/@arsen111999',
  ],
  availableLanguage: ['French', 'German', 'Ukrainian'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'arsen.k111999@gmail.com',
    telephone: '+41 78 326 11 12',
    availableLanguage: ['French', 'German', 'Ukrainian'],
  },
};

// Person Schema (Founder)
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arsen Kovalenko',
  jobTitle: 'Violinist, Founder',
  affiliation: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH',
    addressLocality: 'Gland',
    addressRegion: 'Vaud',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
  },
};

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sonate Solidaire',
  url: SITE_URL,
  inLanguage: ['fr-CH', 'de-CH', 'uk-UA'],
  publisher: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
  },
};

// Breadcrumb configuration for indexable pages
const breadcrumbConfig: Record<string, { name: string; nameKey: string; path: string }[]> = {
  '/': [
    { name: 'Accueil', nameKey: 'home', path: '/' },
  ],
  '/contact': [
    { name: 'Accueil', nameKey: 'home', path: '/' },
    { name: 'Contact', nameKey: 'contact', path: '/contact' },
  ],
  '/integration': [
    { name: 'Accueil', nameKey: 'home', path: '/' },
    { name: 'Parcours d\'Intégration', nameKey: 'integration', path: '/integration' },
  ],
  '/support': [
    { name: 'Accueil', nameKey: 'home', path: '/' },
    { name: 'Solidarité', nameKey: 'support', path: '/support' },
  ],
  '/privacy': [
    { name: 'Accueil', nameKey: 'home', path: '/' },
    { name: 'Politique de Confidentialité', nameKey: 'privacy', path: '/privacy' },
  ],
};

const generateBreadcrumbSchema = (pathname: string) => {
  const breadcrumbs = breadcrumbConfig[pathname];
  
  if (!breadcrumbs) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
};

const generateMusicEventSchema = (event: MusicEventData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.description,
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
        addressCountry: 'CH',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CHF',
      availability: 'https://schema.org/InStock',
    },
    organizer: {
      '@type': 'Organization',
      name: 'Sonate Solidaire',
      url: SITE_URL,
    },
    performer: {
      '@type': 'Person',
      name: 'Arsen Kovalenko',
    },
  };
};

export const StructuredData = ({ event }: StructuredDataProps) => {
  const location = useLocation();
  const breadcrumbSchema = generateBreadcrumbSchema(location.pathname);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {event && (
        <script type="application/ld+json">
          {JSON.stringify(generateMusicEventSchema(event))}
        </script>
      )}
    </Helmet>
  );
};

export default StructuredData;
