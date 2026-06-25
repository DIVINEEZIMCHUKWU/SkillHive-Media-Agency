import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MediaRenderer from './MediaRenderer';

export default function ImageGallery({
  images,
  altBase,
  initialIndex = 0,
  onClose,
}: {
  images: string[];
  altBase: string;
  initialIndex?: number;
  onClose?: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(Math.min(Math.max(initialIndex, 0), images.length - 1));

  useEffect(() => {
    setCurrentIndex(Math.min(Math.max(initialIndex, 0), images.length - 1));
  }, [initialIndex, images.length]);

  if (!images.length) return null;

  const prev = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  const next = () => setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

  return (
    <div className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-12 h-12 rounded-full bg-black/70 text-white hover:bg-black transition-colors flex items-center justify-center shadow-xl"
          aria-label="Close image gallery"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <div className="absolute top-4 left-4 z-30 rounded-full bg-black/70 text-white text-xs uppercase tracking-[0.2em] px-3 py-2 shadow-xl backdrop-blur-sm">
        {`${currentIndex + 1} / ${images.length}`}
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-4 z-20 w-14 h-14 rounded-full bg-white/90 text-brand-black hover:bg-white transition-colors shadow-2xl flex items-center justify-center"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <div className="w-full h-full px-4 py-8 flex items-center justify-center">
        <div className="max-w-full max-h-full w-full h-full">
          <MediaRenderer
            interactive={true}
            src={images[currentIndex]}
            alt={`${altBase} ${currentIndex + 1}`}
            className="w-full h-full object-contain rounded-3xl"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={next}
        className="absolute right-4 z-20 w-14 h-14 rounded-full bg-white/90 text-brand-black hover:bg-white transition-colors shadow-2xl flex items-center justify-center"
        aria-label="Next image"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  );
}
