import { cn } from "@/lib/utils";

type ContentImageBlockProps = {
  badge?: string;
  title: string;
  description?: string;
  paragraphs?: string[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  imageObjectPosition?: string;
  children?: React.ReactNode;
  className?: string;
};

const ContentImageBlock = ({
  badge,
  title,
  description,
  paragraphs,
  image,
  imageAlt,
  imagePosition = "right",
  imageObjectPosition = "center",
  children,
  className,
}: ContentImageBlockProps) => {
  const textParagraphs = paragraphs ?? (description ? [description] : []);

  const textBlock = (
    <div className="flex flex-col justify-center">
      {badge && (
        <span className="inline-block w-fit px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
        {title}
      </h2>
      <div className="space-y-4 mb-6">
        {textParagraphs.map((paragraph, index) => (
          <p key={index} className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      {children}
    </div>
  );

  const imageBlock = (
    <figure className="image-hover-zoom relative overflow-hidden rounded-xl border border-border shadow-lg aspect-[4/3] md:aspect-[5/4]">
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover"
        style={{ objectPosition: imageObjectPosition }}
        loading="lazy"
      />
    </figure>
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center",
        className,
      )}
    >
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
};

export default ContentImageBlock;
