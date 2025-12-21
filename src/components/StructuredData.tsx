import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://violin.pp.ua';

// Organization Schema - Swiss focused
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sonate Solidaire',
  alternateName: 'V.I.O.L.I.N.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: 'Association suisse à but non lucratif pour l\'intégration culturelle des Ukrainiens à travers la musique. Basée dans le canton de Vaud.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
    alternateName: ['Schweiz', 'Suisse', 'Svizzera'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenue du Mont-Blanc 29',
    addressLocality: 'Gland',
    addressRegion: 'Vaud',
    postalCode: '1196',
    addressCountry: 'CH',
  },
  knowsLanguage: ['de-CH', 'fr-CH', 'uk'],
  sameAs: [
    'https://www.youtube.com/@ArsenKovalenkoViolin',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'general',
    telephone: '+41-78-326-11-12',
    email: 'arsen.k111999@gmail.com',
    availableLanguage: ['German', 'French', 'Ukrainian'],
    areaServed: 'CH',
  },
};

// Person Schema (Founder) - Swiss context
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arsen Kovalenko',
  alternateName: 'Арсен Коваленко',
  jobTitle: 'Violinist & Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gland',
      addressRegion: 'Vaud',
      addressCountry: 'CH',
    },
  },
  description: 'Professional violinist of Ukrainian origin based in Canton de Vaud, Switzerland. Founder of Sonate Solidaire, dedicated to cultural integration through music.',
  knowsLanguage: ['Ukrainian', 'French', 'German'],
  nationality: {
    '@type': 'Country',
    name: 'Ukraine',
  },
  workLocation: {
    '@type': 'Place',
    name: 'Canton de Vaud, Switzerland',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Vaud',
      addressCountry: 'CH',
    },
  },
};

// Website Schema - Swiss regional
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sonate Solidaire',
  alternateName: 'V.I.O.L.I.N. - Integration durch Musik',
  url: SITE_URL,
  description: 'Kulturelle Integration von Ukrainern in der Schweiz durch Musik. Schweizer Verein mit Sitz im Kanton Waadt.',
  inLanguage: ['de-CH', 'fr-CH', 'uk'],
  publisher: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gland',
      addressRegion: 'Vaud',
      addressCountry: 'CH',
    },
  },
};

// NonProfitOrganization Schema - Swiss context
const nonprofitSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Sonate Solidaire',
  url: SITE_URL,
  description: 'Gemeinnütziger Schweizer Verein für soziale Inklusion, kulturelle Vermittlung und Solidaritätsaktivitäten durch Musikpraxis.',
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenue du Mont-Blanc 29',
    addressLocality: 'Gland',
    addressRegion: 'Vaud',
    postalCode: '1196',
    addressCountry: 'CH',
  },
  foundingDate: '2024',
  knowsLanguage: ['German', 'French', 'Ukrainian'],
};

export const StructuredData = () => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(founderSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(nonprofitSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
