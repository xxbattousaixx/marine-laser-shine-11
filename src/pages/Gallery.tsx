import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import shipBefore from "@/assets/gallery/ship-before.jpg";
import shipAfter from "@/assets/gallery/ship-after.jpg";
import machineryBefore from "@/assets/gallery/machinery-before.jpg";
import machineryAfter from "@/assets/gallery/machinery-after.jpg";
import partsBefore from "@/assets/gallery/parts-before.jpg";
import partsAfter from "@/assets/gallery/parts-after.jpg";

const Gallery = () => {
  const { t } = useLanguage();

  const galleryItems = [
    { id: 1, image: shipBefore, label: t('gallery.before'), category: 'Ship Cabin' },
    { id: 2, image: shipAfter, label: t('gallery.after'), category: 'Ship Cabin' },
    { id: 3, image: machineryBefore, label: t('gallery.before'), category: 'Machinery' },
    { id: 4, image: machineryAfter, label: t('gallery.after'), category: 'Machinery' },
    { id: 5, image: partsBefore, label: t('gallery.before'), category: 'Parts' },
    { id: 6, image: partsAfter, label: t('gallery.after'), category: 'Parts' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              {t('gallery.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('gallery.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border-2 hover:border-primary transition-all group">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={`${item.category} - ${item.label}`}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {item.label}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-primary/90 backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
