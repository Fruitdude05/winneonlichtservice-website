import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
};

const RevealOnScroll = ({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealOnScrollProps) => {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-on-scroll",
        direction === "left" && "reveal-from-left",
        direction === "right" && "reveal-from-right",
        direction === "scale" && "reveal-scale",
        isVisible && "is-visible",
        className,
      )}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
