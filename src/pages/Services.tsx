import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const ParticleBackground = lazy(() => import("@/components/ParticleBackground"));
const FloatingVideo = lazy(() => import("@/components/FloatingVideo"));
const MarineServicesCarousel = lazy(() => import("@/components/MarineServicesCarousel"));

const Services = () => {
  const { t, language } = useLanguage();

  // Services data for structured data (SEO)
  const services = [
    { title: t('services.ship.title'), description: t('services.ship.desc') },
    { title: t('services.machinery.title'), description: t('services.machinery.desc') },
    { title: t('services.rust.title'), description: t('services.rust.desc') },
    { title: t('services.parts.title'), description: t('services.parts.desc') },
    { title: t('services.coating.title'), description: t('services.coating.desc') },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Industrial Laser Cleaning",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Marine Laser Clean",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cabimas",
        "addressRegion": "Zulia",
        "addressCountry": "VE"
      }
    },
    "areaServed": "Venezuela",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Laser Cleaning Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('seo.services.title')}</title>
        <meta name="description" content={t('seo.services.description')} />
        <link rel="canonical" href="https://www.marinelaserclean.com/services" />
        
        <meta property="og:title" content={t('seo.services.title')} />
        <meta property="og:description" content={t('seo.services.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.marinelaserclean.com/services" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('seo.services.title')} />
        <meta name="twitter:description" content={t('seo.services.description')} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col relative">
        <Suspense fallback={null}>
          <ParticleBackground variant="services" />
        </Suspense>
        <Navigation />
        
        <main className="flex-grow pt-24 pb-12 relative z-10">
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="h-[600px]" />}>
              <AnimatedSection animation="scale" delay={100}>
                <MarineServicesCarousel />
              </AnimatedSection>
            </Suspense>
          </div>
        </main>

        <Suspense fallback={null}>
          <FloatingVideo />
        </Suspense>
        <Footer />
      </div>
    </>
  );
};

export default Services;
