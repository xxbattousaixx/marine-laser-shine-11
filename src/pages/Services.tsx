import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Ship, Cog, Droplet, Package } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingVideo from "@/components/FloatingVideo";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Ship,
      title: t('services.ship.title'),
      description: t('services.ship.desc'),
    },
    {
      icon: Cog,
      title: t('services.machinery.title'),
      description: t('services.machinery.desc'),
    },
    {
      icon: Droplet,
      title: t('services.rust.title'),
      description: t('services.rust.desc'),
    },
    {
      icon: Package,
      title: t('services.parts.title'),
      description: t('services.parts.desc'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground variant="services" />
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 text-foreground">
                {t('services.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection 
                key={index} 
                animation={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                delay={index * 150}
              >
                <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm bg-background/80 h-full">
                  <CardHeader>
                    <div className="mb-4">
                      <div className="p-4 bg-primary/10 rounded-full inline-block transition-transform duration-300 hover:scale-110 hover:rotate-3">
                        <service.icon className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>

      <FloatingVideo />
      <Footer />
    </div>
  );
};

export default Services;
