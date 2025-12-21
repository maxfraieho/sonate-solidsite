import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://violin.pp.ua';

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sonate Solidaire',
  url: SITE_URL,
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
  },
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
};

export const StructuredData = () => {
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
    </Helmet>
  );
};

export default StructuredData;
