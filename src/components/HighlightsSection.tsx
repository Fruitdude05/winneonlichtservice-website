import { CheckCircle } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

type HighlightsSectionProps = {
  items: string[];
  label?: string;
};

const HighlightsSection = ({ items, label = "Auf einen Blick" }: HighlightsSectionProps) => {
  return (
    <div className="space-y-8 md:space-y-10">
      <RevealOnScroll>
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold">
            {label}
          </span>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, index) => (
          <RevealOnScroll
            key={index}
            direction="up"
            delay={index * 100}
            className="reveal-card h-full"
          >
            <div className="flex h-full flex-col items-center text-center gap-3">
              <CheckCircle className="w-8 h-8 text-primary shrink-0" aria-hidden="true" />
              <p className="text-foreground text-sm md:text-base leading-relaxed">{item}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default HighlightsSection;
