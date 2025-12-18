import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://violin.pp.ua/assets/img/hero-large-blur3.jpg',
    alt: 'Arsen Kovalenko concert',
    category: 'concert'
  },
  {
    id: 2,
    src: 'https://violin.pp.ua/assets/img/chee-yun-s.jpg',
    alt: 'Portrait',
    category: 'portrait'
  },
  {
    id: 3,
    src: 'https://violin.pp.ua/assets/img/hero/hero-desktop.jpg',
    alt: 'Performance',
    category: 'concert'
  },
  {
    id: 4,
    src: 'https://violin.pp.ua/assets/img/audio-covers/cover-1.webp',
    alt: 'Recording session',
    category: 'studio'
  },
  {
    id: 5,
    src: 'https://violin.pp.ua/assets/img/audio-covers/cover-2.webp',
    alt: 'Album cover',
    category: 'studio'
  },
  {
    id: 6,
    src: 'https://violin.pp.ua/assets/img/audio-covers/cover-3.webp',
    alt: 'Album artwork',
    category: 'studio'
  },
];

export const PhotoGallery = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { key: 'all', label: { fr: 'Tout', de: 'Alle', uk: 'Усі' } },
    { key: 'concert', label: { fr: 'Concerts', de: 'Konzerte', uk: 'Концерти' } },
    { key: 'portrait', label: { fr: 'Portraits', de: 'Porträts', uk: 'Портрети' } },
    { key: 'studio', label: { fr: 'Studio', de: 'Studio', uk: 'Студія' } },
  ];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };
  
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const lang = i18n.language as 'fr' | 'de' | 'uk';

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              filter === cat.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-surface text-foreground hover:bg-primary/20'
            }`}
          >
            {cat.label[lang] || cat.label.fr}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://violin.pp.ua/assets/img/chee-yun-s.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          
          <img
            src={filteredImages[selectedImage].src}
            alt={filteredImages[selectedImage].alt}
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-foreground hover:text-primary transition-colors"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          
          <div className="absolute bottom-4 text-center text-subtext">
            {selectedImage + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
};
