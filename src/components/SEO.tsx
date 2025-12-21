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
    defaultTitle: 'Sonate Solidaire | Intégration par la Musique',
    defaultDescription: 'Association à but non lucratif dédiée à l\'intégration culturelle des Ukrainiens en Suisse à travers la musique et les concerts solidaires.',
    pages: {
      home: {
        title: 'Sonate Solidaire | Intégration Culturelle par la Musique',
        description: 'Association suisse pour l\'intégration culturelle des Ukrainiens. Concerts solidaires, médiation culturelle et inclusion sociale par la musique.',
      },
      contact: {
        title: 'Contact | Sonate Solidaire',
        description: 'Contactez Sonate Solidaire pour collaborations musicales, concerts solidaires ou information sur nos programmes d\'intégration culturelle.',
      },
      integration: {
        title: 'Parcours d\'Intégration | Sonate Solidaire',
        description: 'Découvrez notre parcours d\'intégration culturelle par la musique. Un chemin structuré vers l\'inclusion sociale en Suisse.',
      },
    },
  },
  de: {
    siteName: 'Sonate Solidaire',
    defaultTitle: 'Sonate Solidaire | Integration durch Musik',
    defaultDescription: 'Gemeinnütziger Verein für die kulturelle Integration von Ukrainern in der Schweiz durch Musik und Solidaritätskonzerte.',
    pages: {
      home: {
        title: 'Sonate Solidaire | Kulturelle Integration durch Musik',
        description: 'Schweizer Verein für kulturelle Integration von Ukrainern. Solidaritätskonzerte, kulturelle Vermittlung und soziale Inklusion durch Musik.',
      },
      contact: {
        title: 'Kontakt | Sonate Solidaire',
        description: 'Kontaktieren Sie Sonate Solidaire für musikalische Zusammenarbeit, Solidaritätskonzerte oder Informationen zu unseren Integrationsprogrammen.',
      },
      integration: {
        title: 'Integrationsweg | Sonate Solidaire',
        description: 'Entdecken Sie unseren kulturellen Integrationsweg durch Musik. Ein strukturierter Weg zur sozialen Inklusion in der Schweiz.',
      },
    },
  },
  uk: {
    siteName: 'Sonate Solidaire',
    defaultTitle: 'Sonate Solidaire | Інтеграція через музику',
    defaultDescription: 'Неприбуткова асоціація для культурної інтеграції українців у Швейцарії через музику та солідарні концерти.',
    pages: {
      home: {
        title: 'Sonate Solidaire | Культурна інтеграція через музику',
        description: 'Швейцарська асоціація для культурної інтеграції українців. Солідарні концерти, культурна медіація та соціальна інклюзія через музику.',
      },
      contact: {
        title: 'Контакти | Sonate Solidaire',
        description: 'Зв\'яжіться з Sonate Solidaire для музичної співпраці, солідарних концертів або інформації про наші програми культурної інтеграції.',
      },
      integration: {
        title: 'Шлях інтеграції | Sonate Solidaire',
        description: 'Відкрийте наш шлях культурної інтеграції через музику. Структурований шлях до соціальної інклюзії у Швейцарії.',
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
  const content = seoContent[currentLang] || seoContent.fr;
  
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
  
  // Language codes for hreflang
  const languages = ['fr', 'de', 'uk'] as const;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang === 'uk' ? 'uk' : currentLang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:site_name" content={content.siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={currentLang === 'uk' ? 'uk_UA' : currentLang === 'de' ? 'de_CH' : 'fr_CH'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Hreflang Tags */}
      {languages.map((lang) => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang === 'uk' ? 'uk' : lang} 
          href={`${SITE_URL}${path}`} 
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />
    </Helmet>
  );
};

export default SEO;
