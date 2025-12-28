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

// Organization Schema (enhanced with full address and geo)
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sonate Solidaire',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-sonate.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: 'Association suisse à but non lucratif pour l\'intégration culturelle des Ukrainiens par la musique.',
  foundingDate: '2024',
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Canton de Vaud',
      containedInPlace: {
        '@type': 'Country',
        name: 'Switzerland',
      },
    },
    {
      '@type': 'Country',
      name: 'Switzerland',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenue du Mont-Blanc 29',
    addressLocality: 'Gland',
    addressRegion: 'Vaud',
    postalCode: '1196',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.4192,
    longitude: 6.2728,
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

// Place Schema (linked to Organization for local SEO)
const placeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Sonate Solidaire – Projet culturel',
  description: 'Siège du projet culturel Sonate Solidaire pour l\'intégration par la musique.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenue du Mont-Blanc 29',
    addressLocality: 'Gland',
    addressRegion: 'Vaud',
    postalCode: '1196',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.4192,
    longitude: 6.2728,
  },
  containedInPlace: {
    '@type': 'AdministrativeArea',
    name: 'Canton de Vaud, Switzerland',
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

// FAQ Schema for Google Discover
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment soutenir Sonate Solidaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vous pouvez faire un don via IBAN ou Twint, ou assister à nos concerts solidaires en Suisse romande.',
      },
    },
    {
      '@type': 'Question',
      name: 'Où se déroulent les concerts ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nos concerts ont lieu dans le Canton de Vaud, en Suisse, principalement à Gland et dans les environs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie kann ich Sonate Solidaire unterstützen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sie können über IBAN oder Twint spenden oder unsere Solidaritätskonzerte in der Romandie besuchen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Як підтримати Sonate Solidaire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ви можете зробити донат через IBAN або Twint, або відвідати наші благодійні концерти у Швейцарії.',
      },
    },
  ],
};

// NewsArticle Schema for Google Discover
const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Sonate Solidaire – Intégration par la musique en Suisse Romande',
  description: 'Association culturelle favorisant l\'intégration des Ukrainiens par la musique. Concerts solidaires, médiation culturelle et inclusion sociale dans le Canton de Vaud.',
  datePublished: '2025-12-29',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'fr-CH',
  author: {
    '@type': 'Person',
    name: 'Arsen Kovalenko',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo-sonate.png`,
    },
  },
  image: `${SITE_URL}/og-image.jpg`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': SITE_URL,
  },
};

// VideoObject Schema for Google Discover
const videoObjectSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Sonate Solidaire – Live Performance',
    description: 'Intégration par la musique – concerts solidaires en Suisse Romande.',
    thumbnailUrl: `${SITE_URL}/og-image.jpg`,
    uploadDate: '2025-01-01',
    duration: 'PT3M15S',
    contentUrl: 'https://youtu.be/yzIiImWBuUU',
    embedUrl: 'https://www.youtube.com/embed/yzIiImWBuUU',
    publisher: {
      '@type': 'Organization',
      name: 'Sonate Solidaire',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-sonate.png`,
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Concert de violon – Sonate Solidaire',
    description: 'Performance musicale pour l\'intégration culturelle des Ukrainiens en Suisse.',
    thumbnailUrl: `${SITE_URL}/og-image.jpg`,
    uploadDate: '2025-01-01',
    duration: 'PT4M30S',
    contentUrl: 'https://youtu.be/uMiQg_sq_-w',
    embedUrl: 'https://www.youtube.com/embed/uMiQg_sq_-w',
    publisher: {
      '@type': 'Organization',
      name: 'Sonate Solidaire',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-sonate.png`,
      },
    },
  },
];

// CreativeWork Schema for Portfolio page
const creativeWorkSchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Portfolio Sonate Solidaire',
  creator: {
    '@type': 'Person',
    name: 'Arsen Kovalenko',
  },
  dateCreated: '2025-12-30',
  genre: 'Music Performance',
  inLanguage: 'fr-CH',
  description: 'Collection de performances musicales et concerts solidaires pour l\'intégration culturelle des Ukrainiens en Suisse.',
  image: `${SITE_URL}/og-image.jpg`,
  video: {
    '@type': 'VideoObject',
    name: 'Sonate Solidaire – Live Performance',
    embedUrl: 'https://www.youtube.com/embed/yzIiImWBuUU',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Sonate Solidaire',
  },
};

// ImageGallery Schema for Portfolio page
const imageGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Portfolio Photo Gallery – Sonate Solidaire',
  description: 'Collection de photos de concerts et performances musicales de Sonate Solidaire en Suisse.',
  image: [
    {
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}/images/founder.jpg`,
      description: 'Portrait du fondateur du projet Sonate Solidaire',
    },
    {
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}/images/hero.jpg`,
      description: 'Affiche du concert Sonate Solidaire à Lausanne',
    },
    {
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}/og-image.jpg`,
      description: 'Performance musicale Sonate Solidaire',
    },
  ],
  author: {
    '@type': 'Person',
    name: 'Arsen Kovalenko',
  },
};

// VideoGallery Schema for Portfolio page (Discover eligibility)
const videoGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGallery',
  name: 'Portfolio Video Performances – Sonate Solidaire',
  description: 'Collection de vidéos illustrant les concerts et performances de Sonate Solidaire en Suisse.',
  video: [
    {
      '@type': 'VideoObject',
      name: 'Concert Performance – Sonate Solidaire',
      description: 'Performance live de violon pour l\'intégration culturelle.',
      embedUrl: 'https://www.youtube.com/embed/uMiQg_sq_-w',
      thumbnailUrl: 'https://i.ytimg.com/vi/uMiQg_sq_-w/hqdefault.jpg',
      uploadDate: '2025-01-01',
      duration: 'PT4M30S',
      inLanguage: 'fr-CH',
    },
    {
      '@type': 'VideoObject',
      name: 'Shorts – Intégration par la Musique',
      description: 'Court extrait de performance musicale solidaire.',
      embedUrl: 'https://www.youtube.com/embed/yzIiImWBuUU',
      thumbnailUrl: 'https://i.ytimg.com/vi/yzIiImWBuUU/hqdefault.jpg',
      uploadDate: '2025-01-01',
      duration: 'PT3M15S',
      inLanguage: 'fr-CH',
    },
  ],
  author: {
    '@type': 'Person',
    name: 'Arsen Kovalenko',
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
  '/portfolio': [
    { name: 'Accueil', nameKey: 'home', path: '/' },
    { name: 'Portfolio', nameKey: 'portfolio', path: '/portfolio' },
  ],
};

const generateBreadcrumbSchema = (pathname: string) => {
  // Normalize pathname by removing language prefix
  const normalizedPath = pathname.replace(/^\/(fr|de|uk)/, '') || '/';
  const breadcrumbs = breadcrumbConfig[normalizedPath];
  
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
  const isHomepage = location.pathname === '/' || /^\/(fr|de|uk)\/?$/.test(location.pathname);
  const isPortfolioPage = /^\/(fr|de|uk)?\/portfolio/.test(location.pathname) || location.pathname === '/portfolio';

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
      {/* Place Schema for local SEO */}
      <script type="application/ld+json">
        {JSON.stringify(placeSchema)}
      </script>
      {/* FAQ Schema for Discover visibility */}
      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {/* NewsArticle for Discover eligibility */}
      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify(newsArticleSchema)}
        </script>
      )}
      {/* VideoObject for Discover video carousel */}
      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify(videoObjectSchema)}
        </script>
      )}
      {/* CreativeWork Schema for Portfolio page */}
      {isPortfolioPage && (
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkSchema)}
        </script>
      )}
      {/* ImageGallery Schema for Portfolio page */}
      {isPortfolioPage && (
        <script type="application/ld+json">
          {JSON.stringify(imageGallerySchema)}
        </script>
      )}
      {/* VideoGallery Schema for Portfolio page */}
      {isPortfolioPage && (
        <script type="application/ld+json">
          {JSON.stringify(videoGallerySchema)}
        </script>
      )}
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
