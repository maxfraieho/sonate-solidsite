import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import photo1 from '@/assets/gallery/photo-1.jpg';
import photo2 from '@/assets/gallery/photo-2.jpg';
import photo3 from '@/assets/gallery/photo-3.jpg';
import photo4 from '@/assets/gallery/photo-4.jpg';
import photo5 from '@/assets/gallery/photo-5.jpg';
import photo6 from '@/assets/gallery/photo-6.jpg';
import photo7 from '@/assets/gallery/photo-7.jpg';
import photo8 from '@/assets/gallery/photo-8.jpg';
import photo9 from '@/assets/gallery/photo-9.jpg';

const galleryImages = [
  { id: 1, src: photo1, alt: 'Народний ансамбль' },
  { id: 2, src: photo2, alt: 'Квартет біля замку' },
  { id: 3, src: photo3, alt: 'Дует скрипка та акордеон' },
  { id: 4, src: photo4, alt: 'Сольний виступ' },
  { id: 5, src: photo5, alt: 'Фольклорний гурт' },
  { id: 6, src: photo6, alt: 'Різдвяний виступ' },
  { id: 7, src: photo7, alt: 'Хор у традиційних костюмах' },
  { id: 8, src: photo8, alt: 'Виступ у ресторані' },
  { id: 9, src: photo9, alt: 'Тріо біля Луцького замку' },
];

export const PhotoGallery = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };
  
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-foreground hover:text-primary transition-colors"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          
          <div className="absolute bottom-4 text-center text-subtext">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};
