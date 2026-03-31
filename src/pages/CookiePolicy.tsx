import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const CookiePolicy = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t('cookies.title')} | Marine Laser Clean</title>
        <meta name="description" content={t('cookies.metaDescription')} />
        <link rel="canonical" href="https://marinelaserclean.com/cookie-policy" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <AnimatedSection animation="fade-up">
              <h1 className="text-4xl font-bold mb-8 text-foreground">{t('cookies.title')}</h1>
              <p className="text-muted-foreground mb-8">{t('cookies.lastUpdated')}: {new Date().toLocaleDateString(language === 'es' ? 'es-VE' : language === 'zh' ? 'zh-CN' : 'en-US')}</p>
              
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('cookies.what.title')}</h2>
                  <p className="text-muted-foreground">{t('cookies.what.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('cookies.types.title')}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">{t('cookies.types.essential.title')}</h3>
                      <p className="text-muted-foreground">{t('cookies.types.essential.content')}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">{t('cookies.types.analytics.title')}</h3>
                      <p className="text-muted-foreground">{t('cookies.types.analytics.content')}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">{t('cookies.types.functional.title')}</h3>
                      <p className="text-muted-foreground">{t('cookies.types.functional.content')}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('cookies.manage.title')}</h2>
                  <p className="text-muted-foreground">{t('cookies.manage.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('cookies.thirdParty.title')}</h2>
                  <p className="text-muted-foreground">{t('cookies.thirdParty.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('cookies.consent.title')}</h2>
                  <p className="text-muted-foreground">{t('cookies.consent.content')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{t('cookies.contact.title')}</h2>
                  <p className="text-muted-foreground">{t('cookies.contact.content')}</p>
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

export default CookiePolicy;
