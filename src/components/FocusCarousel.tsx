import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FocusCarouselProps {
  images: { src: string; alt: string }[];
}

const FocusCarousel = ({ images }: FocusCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getIndex = (offset: number) => {
    return (currentIndex + offset + images.length) % images.length;
  };

  const prev = () => setCurrentIndex(getIndex(-1));
  const next = () => setCurrentIndex(getIndex(1));

  if (images.length === 0) return null;

  return (
    <div className="relative w-full py-8">
      {/* Cards Container */}
      <div className="flex items-center justify-center gap-3 md:gap-4">
        
        {/* Left Card - Previous */}
        <div 
          className="hidden sm:block w-40 md:w-52 h-56 md:h-72 flex-shrink-0 cursor-pointer transition-all duration-300 opacity-60 hover:opacity-80"
          onClick={prev}
        >
          <img
            src={images[getIndex(-1)].src}
            alt={images[getIndex(-1)].alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Card - Current (Focus) */}
        <div className="w-52 md:w-64 h-56 md:h-72 flex-shrink-0 shadow-2xl transition-all duration-300 z-10 ring-2 ring-primary/20">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Card - Next */}
        <div 
          className="hidden sm:block w-40 md:w-52 h-56 md:h-72 flex-shrink-0 cursor-pointer transition-all duration-300 opacity-60 hover:opacity-80"
          onClick={next}
        >
          <img
            src={images[getIndex(1)].src}
            alt={images[getIndex(1)].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-primary w-6" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Bild ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FocusCarousel;
