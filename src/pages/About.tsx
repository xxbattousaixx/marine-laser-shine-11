import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Target, Eye, Award, Shield } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Award, text: t('about.values.quality') },
    { icon: Target, text: t('about.values.innovation') },
    { icon: Shield, text: t('about.values.commitment') },
    { icon: Shield, text: t('about.values.safety') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-2">
              <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('about.intro')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">{t('about.mission.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('about.mission.desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">{t('about.vision.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('about.vision.desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              {t('about.values.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6 text-center">
                    <value.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-foreground">{value.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
