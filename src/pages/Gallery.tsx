import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Maximize2, MoveHorizontal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FloatingVideo from "@/components/FloatingVideo";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

import shipBefore from "@/assets/gallery/ship-before.jpg";
import shipAfter from "@/assets/gallery/ship-after.jpg";
import machineryBefore from "@/assets/gallery/machinery-before.jpg";
import machineryAfter from "@/assets/gallery/machinery-after.jpg";
import partsBefore from "@/assets/gallery/parts-before.jpg";
import partsAfter from "@/assets/gallery/parts-after.jpg";
import hullBefore from "@/assets/gallery/hull-before.jpg";
import hullAfter from "@/assets/gallery/hull-after.jpg";
import pipesBefore from "@/assets/gallery/pipes-before.jpg";
import pipesAfter from "@/assets/gallery/pipes-after.jpg";
import engineBefore from "@/assets/gallery/engine-before.jpg";
import engineAfter from "@/assets/gallery/engine-after.jpg";

type CategoryKey = "ship" | "machinery" | "parts" | "pipes" | "engine";

interface GalleryPair {
  id: number;
  before: string;
  after: string;
  category: CategoryKey;
}

const pairs: GalleryPair[] = [
  { id: 1, before: shipBefore, after: shipAfter, category: "ship" },
  { id: 2, before: hullBefore, after: hullAfter, category: "ship" },
  { id: 3, before: machineryBefore, after: machineryAfter, category: "machinery" },
  { id: 4, before: engineBefore, after: engineAfter, category: "engine" },
  { id: 5, before: pipesBefore, after: pipesAfter, category: "pipes" },
  { id: 6, before: partsBefore, after: partsAfter, category: "parts" },
];

const Gallery = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<"all" | CategoryKey>("all");
  const [lightbox, setLightbox] = useState<GalleryPair | null>(null);

  const categories: { key: "all" | CategoryKey; label: string }[] = [
    { key: "all", label: t("gallery.filter.all") },
    { key: "ship", label: t("gallery.filter.ship") },
    { key: "machinery", label: t("gallery.filter.machinery") },
    { key: "engine", label: t("gallery.filter.engine") },
    { key: "pipes", label: t("gallery.filter.pipes") },
    { key: "parts", label: t("gallery.filter.parts") },
  ];

  const visiblePairs = useMemo(
    () => (activeCategory === "all" ? pairs : pairs.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: t("gallery.title"),
    description: t("seo.gallery.description"),
    url: "https://marinelaserclean.com/gallery",
    creator: { "@type": "Organization", name: "Marine Laser Clean" },
    image: pairs.map((p) => `https://marinelaserclean.com${p.after}`),
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("seo.gallery.title")}</title>
        <meta name="description" content={t("seo.gallery.description")} />
        <link rel="canonical" href="https://marinelaserclean.com/gallery" />
        <meta property="og:title" content={t("seo.gallery.title")} />
        <meta property="og:description" content={t("seo.gallery.description")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marinelaserclean.com/gallery" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("seo.gallery.title")} />
        <meta name="twitter:description" content={t("seo.gallery.description")} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-grow pt-24 pb-16">
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div
              className="absolute inset-0 -z-10 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at top, hsl(var(--primary) / 0.18), transparent 60%), radial-gradient(ellipse at bottom, hsl(var(--accent) / 0.12), transparent 60%)",
              }}
            />
            <div className="container mx-auto px-4 text-center max-w-3xl animate-fade-in">
              <Badge variant="secondary" className="mb-4">
                {t("gallery.before")} / {t("gallery.after")}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground tracking-tight">
                {t("gallery.title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {t("gallery.subtitle")}
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MoveHorizontal className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{t("gallery.hint")}</span>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="container mx-auto px-4 mt-10">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((c) => {
                const active = activeCategory === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActiveCategory(c.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      active
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_18px_hsl(var(--primary)/0.45)]"
                        : "bg-background/50 text-foreground border-border hover:border-primary/60 hover:text-primary"
                    }`}
                    aria-pressed={active}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Grid */}
          <section className="container mx-auto px-4 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {visiblePairs.map((pair, i) => (
                <article
                  key={pair.id}
                  className="group relative rounded-xl overflow-hidden border border-border/70 bg-card shadow-sm hover:shadow-xl hover:border-primary/60 transition-all animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="relative aspect-[4/3]">
                    <BeforeAfterSlider
                      beforeSrc={pair.before}
                      afterSrc={pair.after}
                      beforeLabel={t("gallery.before")}
                      afterLabel={t("gallery.after")}
                      alt={t(`gallery.filter.${pair.category}`)}
                    />
                    <button
                      onClick={() => setLightbox(pair)}
                      className="absolute bottom-3 right-3 p-2 rounded-md bg-background/85 backdrop-blur-sm border border-border/60 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                      aria-label="Expand"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-foreground">
                      {t(`gallery.filter.${pair.category}`)}
                    </h2>
                    <Badge variant="outline" className="text-xs">
                      6000W
                    </Badge>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="container mx-auto px-4 mt-20">
            <div
              className="relative overflow-hidden rounded-2xl border border-primary/30 p-10 md:p-14 text-center"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--accent) / 0.10))",
              }}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-3 text-foreground">
                {t("gallery.cta.title")}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {t("gallery.cta.desc")}
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  {t("gallery.cta.button")}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        {/* Lightbox */}
        <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background border-border">
            {lightbox && (
              <div className="relative aspect-[16/10]">
                <BeforeAfterSlider
                  beforeSrc={lightbox.before}
                  afterSrc={lightbox.after}
                  beforeLabel={t("gallery.before")}
                  afterLabel={t("gallery.after")}
                  alt={t(`gallery.filter.${lightbox.category}`)}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        <FloatingVideo />
        <Footer />
      </div>
    </>
  );
};

export default Gallery;
