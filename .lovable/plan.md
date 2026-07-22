

# Plan: Moderne Bildergalerie fuer alle Dienstleistungsseiten

## Uebersicht
Eine neue, moderne `ImageGrid`-Komponente ersetzt die bestehende `AutoScrollGallery` und `FocusCarousel` auf allen 5 Dienstleistungsseiten. Die Bilder werden in einem responsiven Grid dargestellt mit Hover-Effekten und einer Fullscreen-Lightbox zum Vergroessern.

---

## Neue Komponente: `src/components/ImageGrid.tsx`

**Funktionen:**
- Responsives Grid: 2 Spalten (Mobile), 3 Spalten (Tablet), 4 Spalten (Desktop)
- Einheitliche Bildproportionen mit `aspect-[4/3]` und `object-cover`
- Hover-Effekt: leichter Zoom (`scale-105`) und halbtransparentes Overlay mit Lupe-Icon (`ZoomIn` aus lucide)
- Klick oeffnet Fullscreen-Lightbox mit dunklem Hintergrund
- Lightbox mit Links/Rechts-Navigation (Pfeile) und Schliessen-Button
- Tastatur-Support: Pfeiltasten und Escape
- Bildcounter ("3 von 8") im Lightbox

---

## Betroffene Seiten

Auf jeder Seite wird der Import von `AutoScrollGallery` bzw. `FocusCarousel` durch `ImageGrid` ersetzt und die Gallery-Section vereinfacht:

| Seite | Datei | Aktuell | Bilder |
|---|---|---|---|
| Fensterreinigung | `src/pages/Fensterreinigung.tsx` | AutoScrollGallery | 8 |
| Leuchtreklamenreinigung | `src/pages/Leuchtreklamenreinigung.tsx` | AutoScrollGallery | 6 |
| Folientechnik | `src/pages/Folientechnik.tsx` | AutoScrollGallery | 2 |
| LED-Umruestung | `src/pages/LEDUmruestung.tsx` | FocusCarousel | 4 |
| Montage & Anfertigung | `src/pages/MontageAnfertigung.tsx` | AutoScrollGallery | 6 |

**Aenderung pro Seite:**
- Import `AutoScrollGallery`/`FocusCarousel` durch `ImageGrid` ersetzen
- `<AutoScrollGallery images={...} />` bzw. `<FocusCarousel images={...} />` durch `<ImageGrid images={...} />` ersetzen
- Gallery-Section bleibt im Container (Ueberschrift, Padding)

---

## Technische Details

### ImageGrid-Komponente

```text
Props: images: { src: string; alt: string }[]

State:
- selectedIndex: number | null (Lightbox-Bild)

Features:
- useEffect fuer Keyboard-Events (Escape, ArrowLeft, ArrowRight)
- Grid mit rounded-xl und shadow-md auf Bildern
- Lightbox als fixed Overlay (z-50) mit backdrop blur
- Navigation-Buttons (ChevronLeft, ChevronRight, X aus lucide)
```

### Gallery-Section Design (einheitlich auf allen Seiten)

```text
<section className="py-16 bg-secondary/10">
  <div className="container mx-auto px-4">
    <h2>Unsere Referenzen</h2>
    <ImageGrid images={galleryImages} />
  </div>
</section>
```

---

## Erwartetes Ergebnis

- Alle Bilder sind sofort sichtbar (kein Hover-Scrolling noetig)
- Professionelle Lightbox mit Navigation
- Einheitliches Design auf allen 5 Seiten
- Responsive auf allen Geraeten
- Modernes Erscheinungsbild mit sanften Animationen

