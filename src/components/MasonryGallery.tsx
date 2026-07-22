interface MasonryGalleryProps {
  images: { src: string; alt: string }[];
}

const MasonryGallery = ({ images }: MasonryGalleryProps) => {
  // Distribute images into columns for masonry effect
  const getColumnImages = () => {
    const columns: { src: string; alt: string; height: string }[][] = [[], [], []];
    
    // Predefined heights for visual variety
    const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60'];
    
    images.forEach((image, index) => {
      const columnIndex = index % 3;
      columns[columnIndex].push({
        ...image,
        height: heights[index % heights.length]
      });
    });
    
    return columns;
  };

  const columns = getColumnImages();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-3 md:gap-4">
          {column.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className={`${image.height} overflow-hidden group cursor-pointer`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;
