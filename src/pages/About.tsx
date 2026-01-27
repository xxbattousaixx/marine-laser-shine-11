import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingVideo from "@/components/FloatingVideo";
import AboutHero from "@/components/AboutHero";
import AboutStats from "@/components/AboutStats";
import AboutTechnology from "@/components/AboutTechnology";
import AboutBusinessModel from "@/components/AboutBusinessModel";
import AboutSectors from "@/components/AboutSectors";
import AboutLocation from "@/components/AboutLocation";
import AboutCTA from "@/components/AboutCTA";

const About = () => {
  const { t, language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marine Laser Clean",
    "description": t('seo.about.description'),
    "url": "https://marinelaserclean.com/about",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Cabimas",
        "addressRegion": "Zulia",
        "addressCountry": "VE"
      }
    },
    "knowsAbout": ["Industrial Laser Cleaning", "Rust Removal", "Surface Preparation", "Maritime Maintenance"]
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('seo.about.title')}</title>
        <meta name="description" content={t('seo.about.description')} />
        <link rel="canonical" href="https://marinelaserclean.com/about" />
        
        <meta property="og:title" content={t('seo.about.title')} />
        <meta property="og:description" content={t('seo.about.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marinelaserclean.com/about" />
        <meta property="og:image" content="https://marinelaserclean.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Marine Laser Clean" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.about.title')} />
        <meta name="twitter:description" content={t('seo.about.description')} />
        <meta name="twitter:image" content="https://marinelaserclean.com/og-image.png" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col relative bg-background">
        <ParticleBackground variant="about" />
        <Navigation />
        
        <main className="flex-grow pt-16 relative z-10">
          <AboutHero />
          <AboutStats />
          <AboutTechnology />
          <AboutBusinessModel />
          <AboutSectors />
          <AboutLocation />
          <AboutCTA />
        </main>

        <FloatingVideo />
        <Footer />
      </div>
    </>
  );
};

export default About;
