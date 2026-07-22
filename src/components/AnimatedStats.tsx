import { useRef, useState, useEffect } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 35, suffix: "+", label: "Jahre Erfahrung" },
  { value: 500, suffix: "+", label: "Zufriedene Kunden" },
  { value: 100, suffix: "%", label: "Familiengeführt" },
  { value: 2, suffix: "", label: "Servicebereiche" },
];

const StatCounter = ({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-primary-foreground/80 text-sm md:text-base">
        {stat.label}
      </div>
    </div>
  );
};

const AnimatedStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={ref} className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCounter key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
