import { useState, useEffect, useCallback } from "react";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGridProps {
  images: { src: string; alt: string }[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(
    () => setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );
  const next = useCallback(
    () => setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, close, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="group image-hover-zoom relative aspect-[4/3] overflow-hidden rounded-xl shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Image */}
          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {selectedIndex + 1} von {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGrid;
