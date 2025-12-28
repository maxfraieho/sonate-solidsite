import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { PhotoGallery } from '@/components/PhotoGallery';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const Portfolio = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Get localized path
  const getPath = () => {
    if (currentLang === 'de') return '/portfolio';
    return `/${currentLang}/portfolio`;
  };

  const seoContent = {
    fr: {
      title: 'Portfolio | Sonate Solidaire – Concerts et Performances',
      description: 'Découvrez les œuvres et performances de Sonate Solidaire – un projet d\'intégration culturelle à travers la musique en Suisse.',
    },
    de: {
      title: 'Portfolio | Sonate Solidaire – Konzerte und Aufführungen',
      description: 'Entdecken Sie die Werke und Aufführungen von Sonate Solidaire – ein Projekt zur kulturellen Integration durch Musik in der Schweiz.',
    },
    uk: {
      title: 'Портфоліо | Sonate Solidaire – Концерти та Виступи',
      description: 'Відкрийте для себе роботи та виступи Sonate Solidaire – проєкту культурної інтеграції через музику у Швейцарії.',
    },
  };

  const content = seoContent[currentLang as keyof typeof seoContent] || seoContent.de;

  const pageText = {
    fr: {
      heading: 'Portfolio',
      intro: 'Ce portfolio présente les enregistrements, concerts et collaborations de Sonate Solidaire, un projet qui unit les cultures à travers la musique.',
      videosTitle: 'Performances Vidéo',
      galleryTitle: 'Galerie Photo',
    },
    de: {
      heading: 'Portfolio',
      intro: 'Dieses Portfolio zeigt die Aufnahmen, Konzerte und Kooperationen von Sonate Solidaire, einem Projekt, das Kulturen durch Musik verbindet.',
      videosTitle: 'Video-Aufführungen',
      galleryTitle: 'Fotogalerie',
    },
    uk: {
      heading: 'Портфоліо',
      intro: 'Це портфоліо представляє записи, концерти та колаборації Sonate Solidaire – проєкту, що об\'єднує культури через музику.',
      videosTitle: 'Відео Виступи',
      galleryTitle: 'Фотогалерея',
    },
  };

  const text = pageText[currentLang as keyof typeof pageText] || pageText.de;

  const videos = [
    { id: 'uMiQg_sq_-w', title: 'Concert Performance – Sonate Solidaire' },
    { id: 'yzIiImWBuUU', title: 'Shorts – Intégration par la Musique' },
    { id: 'dQw4w9WgXcQ', title: 'Performance Live – Lausanne' },
  ];

  return (
    <>
      <SEO
        title={content.title}
        description={content.description}
        path={getPath()}
      />
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20" aria-labelledby="portfolio-heading">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Header */}
          <header className="text-center mb-12 md:mb-16">
            <h1 
              id="portfolio-heading" 
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-6"
            >
              {text.heading}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {text.intro}
            </p>
          </header>

          {/* Video Section */}
          <section className="mb-16 md:mb-24" aria-labelledby="videos-heading">
            <h2 
              id="videos-heading" 
              className="text-2xl md:text-3xl font-playfair font-semibold text-foreground mb-8 text-center"
            >
              {text.videosTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="lite-youtube-wrapper rounded-xl overflow-hidden shadow-lg"
                  role="region"
                  aria-label={video.title}
                >
                  <LiteYouTubeEmbed
                    id={video.id}
                    title={video.title}
                    poster="maxresdefault"
                    noCookie
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section aria-labelledby="gallery-heading">
            <h2 
              id="gallery-heading" 
              className="text-2xl md:text-3xl font-playfair font-semibold text-foreground mb-8 text-center"
            >
              {text.galleryTitle}
            </h2>
            <PhotoGallery />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Portfolio;
