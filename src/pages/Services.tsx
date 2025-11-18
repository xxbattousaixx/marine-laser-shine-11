import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Ship, Cog, Droplet, Package } from "lucide-react";
import logo from "@/assets/brilliant-epoxy-logo.png";

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
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <img src={logo} alt="Brilliant Epoxy Logo" className="h-20 md:h-24 object-contain" />
            </div>
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              {t('services.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4">
                    <div className="p-4 bg-primary/10 rounded-full inline-block">
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
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
