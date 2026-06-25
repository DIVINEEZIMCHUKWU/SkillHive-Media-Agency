import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MediaRenderer from './MediaRenderer';

export default function ImageCarousel({ images, altBase, interactive = false, mediaClassName = 'w-full h-full object-cover' }: { images: string[]; altBase: string; interactive?: boolean; mediaClassName?: string }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateControls = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateControls();
    window.addEventListener('resize', updateControls);
    return () => window.removeEventListener('resize', updateControls);
  }, [images.length]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className="relative h-full">
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/75 text-white text-[11px] uppercase tracking-[0.2em] px-3 py-2 shadow-xl backdrop-blur-sm pointer-events-none">
          Use the arrows to browse
        </div>
      )}
      <div className="absolute inset-y-0 left-3 z-30 flex items-center">
        <button
          type="button"
          disabled={!canScrollLeft}
          onClick={() => scrollByAmount('left')}
          className="w-14 h-14 rounded-full bg-white/95 dark:bg-[#0F0F12]/95 text-brand-black dark:text-white shadow-2xl border border-gray-200 dark:border-white/10 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Scroll images left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-3 z-30 flex items-center">
        <button
          type="button"
          disabled={!canScrollRight}
          onClick={() => scrollByAmount('right')}
          className="w-14 h-14 rounded-full bg-white/95 dark:bg-[#0F0F12]/95 text-brand-black dark:text-white shadow-2xl border border-gray-200 dark:border-white/10 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Scroll images right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div
        ref={scrollRef}
        onScroll={updateControls}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory touch-pan-x scrollbar-thin scrollbar-thumb-brand-blue/40 scrollbar-track-transparent"
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full flex-shrink-0 snap-center">
            <MediaRenderer
              interactive={interactive}
              src={img}
              alt={`${altBase} ${i + 1}`}
              className={mediaClassName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
