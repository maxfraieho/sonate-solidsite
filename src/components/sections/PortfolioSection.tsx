import { useTranslation } from 'react-i18next';
import { AudioPlayer } from '@/components/AudioPlayer';
import { PhotoGallery } from '@/components/PhotoGallery';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export const PortfolioSection = () => {
  const { i18n } = useTranslation();
  
  const lang = i18n.language as 'fr' | 'de' | 'uk';
  
  const titles = {
    description: { 
      fr: 'Écoutez, s\'il vous plaît, ses interprétations : du classique virtuose aux arrangements modernes',
      de: 'Hören Sie sich bitte seine Interpretationen an: von virtuoser Klassik bis zu modernen Arrangements',
      uk: 'Прослухайте, будь ласка, його інтерпретації: від віртуозної класики до сучасних аранжувань'
    },
    gallery: { fr: 'Galerie Photos', de: 'Fotogalerie', uk: 'Фотогалерея' },
    galleryDesc: {
      fr: 'Moments capturés lors de concerts et sessions d\'enregistrement',
      de: 'Momente von Konzerten und Aufnahmesessions',
      uk: 'Моменти з концертів та студійних сесій'
    },
    video: { fr: 'Vidéos', de: 'Videos', uk: 'Відео' }
  };

  return (
    <section id="portfolio" className="py-20 bg-surface relative">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Audio Section */}
        <div className="mb-24">
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <div className="mx-4 text-primary text-xl">♫</div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
          
          <p className="text-center text-lg md:text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
            <span className="text-primary font-display font-semibold italic text-xl md:text-2xl">{titles.description[lang].split(':')[0]}:</span>
            <br />
            <span className="text-subtext">{titles.description[lang].split(':')[1]}</span>
          </p>
          <AudioPlayer />
        </div>

        {/* Photo Gallery */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
              <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              {titles.gallery[lang]}
            </h2>
            <p className="text-subtext text-lg max-w-2xl mx-auto">
              {titles.galleryDesc[lang]}
            </p>
          </div>
          <PhotoGallery />
        </div>

        {/* Video Section */}
        <div role="region" aria-label="Video gallery">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
              <div className="mx-4 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              {titles.video[lang]}
            </h2>
          </div>
          
          {/* Main Videos */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16" role="list" aria-label="Featured videos">
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-video rounded-xl overflow-hidden bg-background border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 lite-youtube-wrapper">
                <LiteYouTubeEmbed
                  id="3jnDrzAo820"
                  title="Concert Arsen Kovalenko"
                  poster="maxresdefault"
                  noCookie
                />
              </div>
            </div>
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-video rounded-xl overflow-hidden bg-background border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 lite-youtube-wrapper">
                <LiteYouTubeEmbed
                  id="5-wAIreCeNk"
                  title="Performance violon"
                  poster="maxresdefault"
                  noCookie
                />
              </div>
            </div>
          </div>

          {/* Shorts */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
            <h3 className="mx-6 text-2xl font-display font-bold text-primary">Shorts</h3>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" role="list" aria-label="Short videos">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-background border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 lite-youtube-wrapper lite-youtube-shorts">
                <LiteYouTubeEmbed
                  id="uMiQg_sq_-w"
                  title="Short 1"
                  poster="hqdefault"
                  noCookie
                />
              </div>
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-background border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 lite-youtube-wrapper lite-youtube-shorts">
                <LiteYouTubeEmbed
                  id="T15hZVOKaSc"
                  title="Short 2"
                  poster="hqdefault"
                  noCookie
                />
              </div>
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-background border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 lite-youtube-wrapper lite-youtube-shorts">
                <LiteYouTubeEmbed
                  id="yzIiImWBuUU"
                  title="Short 3"
                  poster="hqdefault"
                  noCookie
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};
