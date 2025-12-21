import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://violin.pp.ua';

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sonate Solidaire',
  alternateName: 'V.I.O.L.I.N.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: 'Association à but non lucratif dédiée à l\'intégration culturelle des Ukrainiens en Suisse à travers la musique.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
  },
  knowsLanguage: ['fr', 'de', 'uk'],
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'general',
    availableLanguage: ['French', 'German', 'Ukrainian'],
  },
};

// Person Schema (Founder)
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arsen Kovalenko',
  alternateName: 'Арсен Коваленко',
  jobTitle: 'Violinist & Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
  },
  description: 'Professional musician of Ukrainian origin with extensive musical education and over fifteen years of experience.',
  knowsLanguage: ['Ukrainian', 'French', 'German'],
  nationality: {
    '@type': 'Country',
    name: 'Ukraine',
  },
  performerIn: {
    '@type': 'MusicGroup',
    name: 'Sonate Solidaire',
  },
};

// Website Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sonate Solidaire',
  alternateName: 'V.I.O.L.I.N. - Integration through Music',
  url: SITE_URL,
  description: 'Cultural integration of Ukrainians in Switzerland through music',
  inLanguage: ['fr', 'de', 'uk'],
  publisher: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// NonProfitOrganization Schema
const nonprofitSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Sonate Solidaire',
  url: SITE_URL,
  description: 'Non-profit association dedicated to social inclusion, cultural mediation and solidarity activities through musical practice.',
  areaServed: 'Switzerland',
  foundingDate: '2024',
  nonprofitStatus: 'NonprofitType',
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
