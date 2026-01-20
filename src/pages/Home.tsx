import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Sparkles, Leaf, Clock, Layers, Zap } from "lucide-react";
import MarineLaserIntro from "@/components/MarineLaserIntro";
import AnimatedSection from "@/components/AnimatedSection";
import VideoShowcase from "@/components/VideoShowcase";

const Home = () => {
  const { t, language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Marine Laser Clean",
    "description": t('seo.home.description'),
    "url": "https://marinelaserclean.com",
    "telephone": "+58-412-324-3681",
    "email": "lasercleanvz@proton.me",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cabimas",
      "addressRegion": "Zulia",
      "addressCountry": "VE"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 10.4,
        "longitude": -71.45
      },
      "geoRadius": "500"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Industrial Laser Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.ship.title')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.machinery.title')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.rust.title')
          }
        }
      ]
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: t('home.features.precision.title'),
      description: t('home.features.precision.desc'),
    },
    {
      icon: Leaf,
      title: t('home.features.eco.title'),
      description: t('home.features.eco.desc'),
    },
    {
      icon: Clock,
      title: t('home.features.efficient.title'),
      description: t('home.features.efficient.desc'),
    },
    {
      icon: Layers,
      title: t('home.features.versatile.title'),
      description: t('home.features.versatile.desc'),
    },
    {
      icon: Zap,
      title: t('home.power.title'),
      description: t('home.power.desc'),
    },
  ];

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta name="keywords" content="limpieza láser, laser cleaning, rust removal, remoción de óxido, industrial cleaning, limpieza industrial, ship hull cleaning, Venezuela, Cabimas, 6000W laser" />
        <link rel="canonical" href="https://marinelaserclean.com/" />
        
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marinelaserclean.com/" />
        <meta property="og:site_name" content="Marine Laser Clean" />
        <meta property="og:locale" content={language === 'es' ? 'es_VE' : language === 'zh' ? 'zh_CN' : 'en_US'} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.home.title')} />
        <meta name="twitter:description" content={t('seo.home.description')} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* 3D Laser Intro Section */}
      <section className="pt-20">
        <MarineLaserIntro />
      </section>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
              {t('home.features.title')}
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="scale" delay={index * 100}>
                <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 h-full">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-4 bg-primary/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Home;
