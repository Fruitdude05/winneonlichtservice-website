import { type ReactNode } from "react";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";

type LegalPageLayoutProps = {
  title: string;
  children: ReactNode;
};

const LegalPageLayout = ({ title, children }: LegalPageLayoutProps) => (
  <div className="min-h-screen bg-background">
    <MegaMenu />
    <main className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <article className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 not-prose">{title}</h1>
          {children}
        </article>
      </div>
    </main>
    <Footer />
  </div>
);

export default LegalPageLayout;
