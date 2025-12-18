import { useTranslation } from 'react-i18next';
import { AudioPlayer } from '@/components/AudioPlayer';
import { PhotoGallery } from '@/components/PhotoGallery';

export const PortfolioSection = () => {
  const { t, i18n } = useTranslation();
  
  const lang = i18n.language as 'fr' | 'de' | 'uk';
  
  const titles = {
    music: { fr: 'Musique', de: 'Musik', uk: 'Музика' },
    description: { 
      fr: 'Découvrez mes interprétations : du classique virtuose aux arrangements modernes',
      de: 'Entdecken Sie meine Interpretationen: von virtuoser Klassik bis zu modernen Arrangements',
      uk: 'Відкрийте мої інтерпретації: від віртуозної класики до сучасних аранжувань'
    },
    gallery: { fr: 'Galerie Photos', de: 'Fotogalerie', uk: 'Фотогалерея' },
    galleryDesc: {
      fr: 'Moments capturés lors de concerts et sessions d\'enregistrement',
      de: 'Momente von Konzerten und Aufnahmesessions',
      uk: 'Моменти з концертів та студійних сесій'
    },
    video: { fr: 'Vidéos Performances', de: 'Video-Performances', uk: 'Відео виступи' },
    videoDesc: {
      fr: 'Retrouvez mes meilleures performances en vidéo',
      de: 'Entdecken Sie meine besten Videoauftritte',
      uk: 'Дивіться мої найкращі виступи на відео'
    }
  };

  return (
    <section id="portfolio" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Audio Section */}
        <div className="mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            {titles.music[lang]}
          </h2>
          <p className="text-center text-subtext text-lg mb-12 max-w-2xl mx-auto">
            {titles.description[lang]}
          </p>
          <AudioPlayer />
        </div>

        {/* Photo Gallery */}
        <div className="mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            {titles.gallery[lang]}
          </h2>
          <p className="text-center text-subtext text-lg mb-12 max-w-2xl mx-auto">
            {titles.galleryDesc[lang]}
          </p>
          <PhotoGallery />
        </div>

        {/* Video Section */}
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            {titles.video[lang]}
          </h2>
          <p className="text-center text-subtext text-lg mb-12 max-w-2xl mx-auto">
            {titles.videoDesc[lang]}
          </p>
          
          {/* Main Videos */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="aspect-video rounded-xl overflow-hidden bg-background border border-primary/30">
              <iframe
                src="https://www.youtube.com/embed/3jnDrzAo820"
                title="Concert Arsen Kovalenko"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-background border border-primary/30">
              <iframe
                src="https://www.youtube.com/embed/5-wAIreCeNk"
                title="Performance violon"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Shorts */}
          <h3 className="text-2xl font-display font-bold text-primary text-center mb-8">Shorts</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="aspect-[9/16] rounded-xl overflow-hidden bg-background border border-primary/30">
              <iframe
                src="https://www.youtube.com/embed/uMiQg_sq_-w"
                title="Short 1"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-[9/16] rounded-xl overflow-hidden bg-background border border-primary/30">
              <iframe
                src="https://www.youtube.com/embed/T15hZVOKaSc"
                title="Short 2"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-[9/16] rounded-xl overflow-hidden bg-background border border-primary/30">
              <iframe
                src="https://www.youtube.com/embed/uMiQg_sq_-w"
                title="Short 3"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
