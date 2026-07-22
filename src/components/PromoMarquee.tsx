import { Link } from "react-router-dom";

const promoMessages = [
  "Spezielle Rabatte für regelmäßige Reinigungsservices verfügbar!",
  "Kostenlose Kostenvoranschläge! Kontaktieren Sie uns einfach!",
  "Buchen Sie jetzt und erhalten Sie 10 % Rabatt auf Ihre erste Reinigung!",
];

const PromoMarquee = () => {
  const items = [...promoMessages, ...promoMessages];

  return (
    <section className="bg-primary text-primary-foreground py-4 md:py-5 overflow-hidden select-none">
      <div className="promo-marquee-track flex w-max items-center">
        {items.map((message, index) => (
          <Link
            key={`${message}-${index}`}
            to="/kontakt"
            className="shrink-0 inline-flex items-center text-primary-foreground text-base md:text-lg font-semibold whitespace-nowrap hover:underline"
          >
            {index > 0 && (
              <span className="mx-6 md:mx-8 text-primary-foreground/50" aria-hidden="true">
                •
              </span>
            )}
            <span className="px-6 md:px-8">{message}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromoMarquee;
