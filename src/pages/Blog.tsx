import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  categoryKey: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "laser-cleaning-vs-sandblasting-comparison",
    titleKey: "blog.post1.title",
    excerptKey: "blog.post1.excerpt",
    categoryKey: "blog.category.comparison",
    date: "2024-12-01",
    readTime: "5",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: "2",
    slug: "rust-removal-ship-hull-maintenance",
    titleKey: "blog.post2.title",
    excerptKey: "blog.post2.excerpt",
    categoryKey: "blog.category.maritime",
    date: "2024-11-28",
    readTime: "7",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=80"
  },
  {
    id: "3",
    slug: "industrial-laser-cleaning-benefits-manufacturing",
    titleKey: "blog.post3.title",
    excerptKey: "blog.post3.excerpt",
    categoryKey: "blog.category.industry",
    date: "2024-11-25",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80"
  },
  {
    id: "4",
    slug: "eco-friendly-surface-preparation-techniques",
    titleKey: "blog.post4.title",
    excerptKey: "blog.post4.excerpt",
    categoryKey: "blog.category.environment",
    date: "2024-11-20",
    readTime: "4",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
  },
  {
    id: "5",
    slug: "wind-turbine-maintenance-laser-cleaning",
    titleKey: "blog.post5.title",
    excerptKey: "blog.post5.excerpt",
    categoryKey: "blog.category.energy",
    date: "2024-11-15",
    readTime: "8",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80"
  },
  {
    id: "6",
    slug: "aerospace-component-cleaning-precision-laser",
    titleKey: "blog.post6.title",
    excerptKey: "blog.post6.excerpt",
    categoryKey: "blog.category.aerospace",
    date: "2024-11-10",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
  }
];

const Blog = () => {
  const { t, language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": t("blog.title"),
    "description": t("blog.metaDescription"),
    "url": "https://marinelaserclean.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Marine Laser Clean",
      "logo": {
        "@type": "ImageObject",
        "url": "https://marinelaserclean.com/logo.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": t(post.titleKey),
      "description": t(post.excerptKey),
      "datePublished": post.date,
      "image": post.image,
      "url": `https://marinelaserclean.com/blog/${post.slug}`
    }))
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("blog.metaTitle")}</title>
        <meta name="description" content={t("blog.metaDescription")} />
        <meta name="keywords" content="laser cleaning, rust removal, surface preparation, industrial cleaning, ship hull cleaning, sandblasting alternative, eco-friendly cleaning, maritime maintenance" />
        <link rel="canonical" href="https://marinelaserclean.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t("blog.metaTitle")} />
        <meta property="og:description" content={t("blog.metaDescription")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marinelaserclean.com/blog" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("blog.metaTitle")} />
        <meta name="twitter:description" content={t("blog.metaDescription")} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <header className="container mx-auto px-4 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {t("blog.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("blog.subtitle")}
              </p>
            </div>
          </header>

          {/* Blog Grid */}
          <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={t(post.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {t(post.categoryKey)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>
                          {t(post.titleKey)}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3 mb-4">
                        {t(post.excerptKey)}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : language === 'zh' ? 'zh-CN' : 'en-US')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime} min
                          </span>
                        </div>
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                          aria-label={`${t("blog.readMore")} ${t(post.titleKey)}`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <aside className="container mx-auto px-4 mt-16">
            <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("blog.cta.title")}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t("blog.cta.description")}
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {t("blog.cta.button")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </aside>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;