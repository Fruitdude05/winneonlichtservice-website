import PromoMarquee from "@/components/PromoMarquee";

interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  height?: "sm" | "md" | "lg";
  objectPosition?: string;
  showPromoMarquee?: boolean;
}

const heightMap = {
  sm: "h-[200px] sm:h-[220px] md:h-[260px]",
  md: "h-[240px] sm:h-[300px] md:h-[340px]",
  lg: "h-[280px] sm:h-[380px] md:h-[420px]",
};

const PageHero = ({
  image,
  title,
  subtitle,
  height = "md",
  objectPosition = "center",
  showPromoMarquee = true,
}: PageHeroProps) => {
  return (
    <>
      <section className={`relative w-full ${heightMap[height]} overflow-hidden`}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition }}
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base md:text-xl text-white/90 drop-shadow-md">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>
      {showPromoMarquee && <PromoMarquee />}
    </>
  );
};

export default PageHero;
