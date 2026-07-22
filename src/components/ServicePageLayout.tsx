import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContentImageBlock from "@/components/ContentImageBlock";
import HighlightsSection from "@/components/HighlightsSection";
import RevealOnScroll from "@/components/RevealOnScroll";

export type ServiceFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServiceStoryBlock = {
  badge?: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  imageObjectPosition?: string;
};

export type ServicePageLayoutProps = {
  heroImage: string;
  heroObjectPosition?: string;
  title: string;
  subtitle: string;
  highlights: string[];
  storyBlocks: ServiceStoryBlock[];
  features: ServiceFeature[];
  forWhom?: string[];
  relatedServices: { name: string; link: string }[];
};

const ServicePageLayout = ({
  heroImage,
  heroObjectPosition,
  title,
  subtitle,
  highlights,
  storyBlocks,
  features,
  forWhom,
  relatedServices,
}: ServicePageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <MegaMenu />

      <PageHero
        image={heroImage}
        title={title}
        subtitle={subtitle}
        objectPosition={heroObjectPosition}
      />

      <section className="bg-gradient-to-b from-muted/30 via-background to-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
            <HighlightsSection items={highlights} />

            {storyBlocks.map((block, index) => (
              <RevealOnScroll
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                className="reveal-card reveal-card--flush w-full"
              >
                <ContentImageBlock
                  badge={block.badge}
                  title={block.title}
                  paragraphs={block.paragraphs}
                  image={block.image}
                  imageAlt={block.imageAlt}
                  imagePosition={block.imagePosition ?? (index % 2 === 0 ? "right" : "left")}
                  imageObjectPosition={block.imageObjectPosition}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Ihre Vorteile auf einen Blick
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Was Sie von uns erwarten können — klar und übersichtlich.
                </p>
              </div>
            </RevealOnScroll>
            <div className="grid sm:grid-cols-2 gap-5 md:gap-6 items-stretch">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <RevealOnScroll
                    key={index}
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={index * 80}
                    className="reveal-card h-full flex flex-col"
                  >
                    <Icon className="w-10 h-10 text-primary mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {forWhom && forWhom.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <RevealOnScroll className="max-w-6xl mx-auto w-full reveal-card text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Typische Einsatzbereiche
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Wir betreuen vor allem diese Branchen — gerne auch Ihren Betrieb.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {forWhom.map((item, index) => (
                  <span
                    key={index}
                    className="inline-block px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="py-12 md:py-16 border-t border-border/60 bg-muted/15">
          <div className="container mx-auto px-4 md:px-6">
            <RevealOnScroll className="max-w-6xl mx-auto w-full reveal-card">
              <h2 className="text-xl font-bold text-foreground mb-2 text-center">
                Das passt auch zu Ihrem Anliegen
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Weitere Leistungen aus demselben Bereich
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedServices.map((service, index) => (
                  <Link
                    key={index}
                    to={service.link}
                    className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {service.name}
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
