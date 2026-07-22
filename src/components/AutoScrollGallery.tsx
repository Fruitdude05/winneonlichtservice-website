import { useRef, useState, useEffect } from "react";

interface AutoScrollGalleryProps {
  images: { src: string; alt: string }[];
}

const AutoScrollGallery = ({ images }: AutoScrollGalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (isHovering && scrollContainer) {
        scrollContainer.scrollLeft += 1;
        
        // Reset to beginning when reaching the end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-16"
        style={{ scrollBehavior: "auto" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 h-64 relative group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl cursor-pointer"
            />
          </div>
        ))}
        {/* Duplicate images for seamless loop */}
        {images.map((image, index) => (
          <div
            key={`dup-${index}`}
            className="flex-shrink-0 w-80 h-64 relative group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-xl shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl cursor-pointer"
            />
          </div>
        ))}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Mit der Maus über die Bilder fahren zum Scrollen
      </p>
    </div>
  );
};

export default AutoScrollGallery;
