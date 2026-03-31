import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const PrivacyPolicy = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('privacy.title')} | Marine Laser Clean</title>
        <meta name="description" content={t('privacy.metaDescription')} />
        <link rel="canonical" href="https://marinelaserclean.com/privacy-policy" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection animation="fade-up">
              <h1 className="text-4xl font-bold mb-8 text-foreground">{t('privacy.title')}</h1>
              <p className="text-muted-foreground mb-8">{t('privacy.lastUpdated')}: {new Date().toLocaleDateString(language === 'es' ? 'es-VE' : language === 'zh' ? 'zh-CN' : 'en-US')}</p>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.intro.title')}</h2>
                  <p className="text-muted-foreground">{t('privacy.intro.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.dataCollection.title')}</h2>
                  <p className="text-muted-foreground mb-4">{t('privacy.dataCollection.content')}</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>{t('privacy.dataCollection.item1')}</li>
                    <li>{t('privacy.dataCollection.item2')}</li>
                    <li>{t('privacy.dataCollection.item3')}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.dataUse.title')}</h2>
                  <p className="text-muted-foreground mb-4">{t('privacy.dataUse.content')}</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>{t('privacy.dataUse.item1')}</li>
                    <li>{t('privacy.dataUse.item2')}</li>
                    <li>{t('privacy.dataUse.item3')}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.cookies.title')}</h2>
                  <p className="text-muted-foreground">{t('privacy.cookies.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.thirdParty.title')}</h2>
                  <p className="text-muted-foreground">{t('privacy.thirdParty.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.security.title')}</h2>
                  <p className="text-muted-foreground">{t('privacy.security.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.rights.title')}</h2>
                  <p className="text-muted-foreground mb-4">{t('privacy.rights.content')}</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>{t('privacy.rights.item1')}</li>
                    <li>{t('privacy.rights.item2')}</li>
                    <li>{t('privacy.rights.item3')}</li>
                    <li>{t('privacy.rights.item4')}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('privacy.contact.title')}</h2>
                  <p className="text-muted-foreground">{t('privacy.contact.content')}</p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Email:</strong> lasercleanvz@proton.me
                  </p>
                </section>
              </div>
            </AnimatedSection>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
