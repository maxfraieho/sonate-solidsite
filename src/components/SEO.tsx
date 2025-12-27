import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
}

const SITE_URL = 'https://violin.pp.ua';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const seoContent = {
  fr: {
    siteName: 'Sonate Solidaire',
    defaultTitle: 'Sonate Solidaire | Intégration par la Musique en Suisse',
    defaultDescription: 'Association suisse à but non lucratif pour l\'intégration culturelle des Ukrainiens. Concerts solidaires et médiation culturelle dans le canton de Vaud.',
    pages: {
      home: {
        title: 'Sonate Solidaire | Intégration Culturelle par la Musique – Suisse',
        description: 'Association suisse basée dans le canton de Vaud. Intégration culturelle des Ukrainiens par concerts solidaires, médiation et inclusion sociale.',
      },
      contact: {
        title: 'Contact | Sonate Solidaire – Gland, Suisse',
        description: 'Contactez Sonate Solidaire à Gland (Vaud). Collaborations musicales, concerts solidaires et programmes d\'intégration culturelle en Suisse.',
      },
      integration: {
        title: 'Parcours d\'Intégration | Sonate Solidaire – Suisse',
        description: 'Parcours d\'intégration culturelle par la musique en Suisse. Un chemin structuré vers l\'inclusion sociale dans le canton de Vaud.',
      },
    },
  },
  de: {
    siteName: 'Sonate Solidaire',
    defaultTitle: 'Sonate Solidaire | Integration durch Musik in der Schweiz',
    defaultDescription: 'Gemeinnütziger Schweizer Verein für kulturelle Integration von Ukrainern. Solidaritätskonzerte und kulturelle Vermittlung im Kanton Waadt.',
    pages: {
      home: {
        title: 'Sonate Solidaire | Kulturelle Integration durch Musik – Schweiz',
        description: 'Schweizer Verein mit Sitz im Kanton Waadt. Kulturelle Integration von Ukrainern durch Solidaritätskonzerte und soziale Inklusion.',
      },
      contact: {
        title: 'Kontakt | Sonate Solidaire – Gland, Schweiz',
        description: 'Kontaktieren Sie Sonate Solidaire in Gland (Waadt). Musikalische Zusammenarbeit, Solidaritätskonzerte und Integrationsprogramme in der Schweiz.',
      },
      integration: {
        title: 'Integrationsweg | Sonate Solidaire – Schweiz',
        description: 'Kultureller Integrationsweg durch Musik in der Schweiz. Strukturierter Weg zur sozialen Inklusion im Kanton Waadt.',
      },
    },
  },
  uk: {
    siteName: 'Sonate Solidaire',
    defaultTitle: 'Sonate Solidaire | Інтеграція через музику у Швейцарії',
    defaultDescription: 'Швейцарська неприбуткова асоціація для культурної інтеграції українців. Солідарні концерти та культурна медіація в кантоні Во.',
    pages: {
      home: {
        title: 'Sonate Solidaire | Культурна інтеграція через музику – Швейцарія',
        description: 'Швейцарська асоціація у кантоні Во. Культурна інтеграція українців через солідарні концерти та соціальну інклюзію.',
      },
      contact: {
        title: 'Контакти | Sonate Solidaire – Гланд, Швейцарія',
        description: 'Зв\'яжіться з Sonate Solidaire у Гланді (Во). Музична співпраця, солідарні концерти та програми інтеграції у Швейцарії.',
      },
      integration: {
        title: 'Шлях інтеграції | Sonate Solidaire – Швейцарія',
        description: 'Шлях культурної інтеграції через музику у Швейцарії. Структурований шлях до соціальної інклюзії в кантоні Во.',
      },
    },
  },
};

type PageKey = 'home' | 'contact' | 'integration';


export const SEO = ({ 
  title, 
  description, 
  path = '/', 
  type = 'website',
  image = DEFAULT_IMAGE 
}: SEOProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as keyof typeof seoContent;
  const content = seoContent[currentLang] || seoContent.de; // Default to German (primary)
  
  // Determine page key from path
  const getPageKey = (path: string): PageKey => {
    if (path === '/contact') return 'contact';
    if (path === '/integration') return 'integration';
    return 'home';
  };
  
  const pageKey = getPageKey(path);
  const pageContent = content.pages[pageKey];
  
  const finalTitle = title || pageContent.title;
  const finalDescription = description || pageContent.description;
  const canonicalUrl = `${SITE_URL}${path}`;
  
  // Get html lang attribute with Swiss regional code
  const getHtmlLang = () => {
    if (currentLang === 'uk') return 'uk';
    if (currentLang === 'de') return 'de-CH';
    return 'fr-CH';
  };
  
  // Get OG locale
  const getOgLocale = () => {
    if (currentLang === 'uk') return 'uk_UA';
    if (currentLang === 'de') return 'de_CH';
    return 'fr_CH';
  };
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={getHtmlLang()} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Geo targeting for Switzerland */}
      <meta name="geo.region" content="CH-VD" />
      <meta name="geo.placename" content="Gland, Vaud, Switzerland" />
      
      {/* Open Graph */}
      <meta property="og:site_name" content={content.siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={getOgLocale()} />
      <meta property="og:locale:alternate" content="de_CH" />
      <meta property="og:locale:alternate" content="fr_CH" />
      <meta property="og:locale:alternate" content="uk_UA" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Hreflang Tags with Swiss regional codes */}
      <link rel="alternate" hrefLang="de-CH" href={canonicalUrl} />
      <link rel="alternate" hrefLang="fr-CH" href={canonicalUrl} />
      <link rel="alternate" hrefLang="uk" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
