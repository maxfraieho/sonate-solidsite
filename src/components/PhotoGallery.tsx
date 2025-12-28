import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import photo1 from '@/assets/gallery/photo-1.jpg';
import photo2 from '@/assets/gallery/photo-2.jpg';
import photo3 from '@/assets/gallery/photo-3.jpg';
import photo4 from '@/assets/gallery/photo-4.jpg';
import photo5 from '@/assets/gallery/photo-5.jpg';
import photo6 from '@/assets/gallery/photo-6.jpg';
import photo7 from '@/assets/gallery/photo-7.jpg';
import photo8 from '@/assets/gallery/photo-8.jpg';
import photo9 from '@/assets/gallery/photo-9.jpg';

// Localized alt texts for gallery images
const galleryAltTexts: Record<string, string[]> = {
  fr: [
    'Ensemble folklorique en concert',
    'Quatuor devant le château',
    'Duo violon et accordéon',
    'Performance solo de violon',
    'Groupe folklorique traditionnel',
    'Concert de Noël solidaire',
    'Chorale en costumes traditionnels',
    'Performance au restaurant',
    'Trio devant le château de Lutsk',
  ],
  de: [
    'Folkloreensemble beim Konzert',
    'Quartett vor dem Schloss',
    'Duo Geige und Akkordeon',
    'Solo-Geigenperformance',
    'Traditionelle Folkloregruppe',
    'Solidaritäts-Weihnachtskonzert',
    'Chor in traditionellen Kostümen',
    'Auftritt im Restaurant',
    'Trio vor dem Schloss Lutsk',
  ],
  uk: [
    'Народний ансамбль на концерті',
    'Квартет біля замку',
    'Дует скрипка та акордеон',
    'Сольний виступ на скрипці',
    'Традиційний фольклорний гурт',
    'Різдвяний благодійний концерт',
    'Хор у традиційних костюмах',
    'Виступ у ресторані',
    'Тріо біля Луцького замку',
  ],
};

const galleryImages = [
  { id: 1, src: photo1, width: 600, height: 400 },
  { id: 2, src: photo2, width: 600, height: 400 },
  { id: 3, src: photo3, width: 600, height: 400 },
  { id: 4, src: photo4, width: 600, height: 400 },
  { id: 5, src: photo5, width: 600, height: 400 },
  { id: 6, src: photo6, width: 600, height: 400 },
  { id: 7, src: photo7, width: 600, height: 400 },
  { id: 8, src: photo8, width: 600, height: 400 },
  { id: 9, src: photo9, width: 600, height: 400 },
];

export const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { i18n } = useTranslation();
  
  // Get current language, fallback to French
  const currentLang = i18n.language?.substring(0, 2) || 'fr';
  const altTexts = galleryAltTexts[currentLang] || galleryAltTexts.fr;

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = useCallback(() => setSelectedImage(null), []);
  
  const nextImage = useCallback(() => {
    setSelectedImage((prev) => 
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);
  
  const prevImage = useCallback(() => {
    setSelectedImage((prev) => 
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, nextImage, prevImage, closeLightbox]);

  // Touch swipe navigation for mobile
  const touchStartX = useRef<number>(0);
  
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (selectedImage === null) return;
      
      const endX = e.changedTouches[0].clientX;
      const delta = endX - touchStartX.current;

      // Minimum swipe distance of 50px
      if (Math.abs(delta) > 50) {
        if (delta > 0) {
          prevImage();
        } else {
          nextImage();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [selectedImage, nextImage, prevImage]);

  // Preload adjacent images for smooth navigation
  useEffect(() => {
    if (selectedImage !== null) {
      const nextIndex = (selectedImage + 1) % galleryImages.length;
      const prevIndex = (selectedImage - 1 + galleryImages.length) % galleryImages.length;
      
      const preloadNext = new Image();
      preloadNext.src = galleryImages[nextIndex].src;
      
      const preloadPrev = new Image();
      preloadPrev.src = galleryImages[prevIndex].src;
    }
  }, [selectedImage]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="list" aria-label="Photo gallery">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-xl"
            aria-label={`View photo: ${altTexts[index]}`}
          >
            <img
              src={image.src}
              alt={altTexts[index]}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4 lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" aria-hidden="true" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" aria-hidden="true" />
          </button>
          
          <img
            src={galleryImages[selectedImage].src}
            alt={altTexts[selectedImage]}
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" aria-hidden="true" />
          </button>
          
          <div className="absolute bottom-4 text-center text-subtext" aria-live="polite">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};
