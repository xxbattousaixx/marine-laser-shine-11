import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Target, Eye, Recycle, Zap, Shield } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingVideo from "@/components/FloatingVideo";

const About = () => {
  const { t, language } = useLanguage();

  const values = [
    { icon: Recycle, text: t('about.values.quality') },
    { icon: Zap, text: t('about.values.innovation') },
    { icon: Shield, text: t('about.values.commitment') },
    { icon: Target, text: t('about.values.safety') },
  ];

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
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('seo.about.title')} />
        <meta name="twitter:description" content={t('seo.about.description')} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col relative">
      <ParticleBackground variant="about" />
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 text-foreground">
                {t('about.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('about.subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale" delay={100}>
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-2 backdrop-blur-sm bg-background/80">
                <CardContent className="pt-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.intro')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <AnimatedSection animation="fade-left" delay={200}>
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm bg-background/80 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full transition-transform duration-300 hover:scale-110">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{t('about.mission.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('about.mission.desc')}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={300}>
              <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm bg-background/80 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full transition-transform duration-300 hover:scale-110">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{t('about.vision.title')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('about.vision.desc')}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-up" delay={400}>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {t('about.values.title')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {values.map((value, index) => (
                  <AnimatedSection key={index} animation="scale" delay={500 + index * 100}>
                    <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm bg-background/80 group">
                      <CardContent className="pt-6 text-center">
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          <value.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                        </div>
                        <p className="font-semibold text-foreground">{value.text}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <FloatingVideo />
      <Footer />
      </div>
    </>
  );
};

export default About;
