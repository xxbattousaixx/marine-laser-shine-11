import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BlogPostData {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  categoryKey: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPostData[] = [
  {
    id: "1",
    slug: "laser-cleaning-vs-sandblasting-comparison",
    titleKey: "blog.post1.title",
    excerptKey: "blog.post1.excerpt",
    contentKey: "blog.post1.content",
    categoryKey: "blog.category.comparison",
    date: "2024-12-01",
    readTime: "5",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
  },
  {
    id: "2",
    slug: "rust-removal-ship-hull-maintenance",
    titleKey: "blog.post2.title",
    excerptKey: "blog.post2.excerpt",
    contentKey: "blog.post2.content",
    categoryKey: "blog.category.maritime",
    date: "2024-11-28",
    readTime: "7",
    image: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1200&q=80"
  },
  {
    id: "3",
    slug: "industrial-laser-cleaning-benefits-manufacturing",
    titleKey: "blog.post3.title",
    excerptKey: "blog.post3.excerpt",
    contentKey: "blog.post3.content",
    categoryKey: "blog.category.industry",
    date: "2024-11-25",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80"
  },
  {
    id: "4",
    slug: "eco-friendly-surface-preparation-techniques",
    titleKey: "blog.post4.title",
    excerptKey: "blog.post4.excerpt",
    contentKey: "blog.post4.content",
    categoryKey: "blog.category.environment",
    date: "2024-11-20",
    readTime: "4",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80"
  },
  {
    id: "5",
    slug: "wind-turbine-maintenance-laser-cleaning",
    titleKey: "blog.post5.title",
    excerptKey: "blog.post5.excerpt",
    contentKey: "blog.post5.content",
    categoryKey: "blog.category.energy",
    date: "2024-11-15",
    readTime: "8",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&q=80"
  },
  {
    id: "6",
    slug: "aerospace-component-cleaning-precision-laser",
    titleKey: "blog.post6.title",
    excerptKey: "blog.post6.excerpt",
    contentKey: "blog.post6.content",
    categoryKey: "blog.category.aerospace",
    date: "2024-11-10",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"
  },
  {
    id: "7",
    slug: "paint-removal-laser-technology-guide",
    titleKey: "blog.post7.title",
    excerptKey: "blog.post7.excerpt",
    contentKey: "blog.post7.content",
    categoryKey: "blog.category.technique",
    date: "2024-11-05",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80"
  },
  {
    id: "8",
    slug: "oil-gas-industry-laser-cleaning-applications",
    titleKey: "blog.post8.title",
    excerptKey: "blog.post8.excerpt",
    contentKey: "blog.post8.content",
    categoryKey: "blog.category.oilgas",
    date: "2024-10-28",
    readTime: "7",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1200&q=80"
  },
  {
    id: "9",
    slug: "welding-preparation-laser-cleaning-benefits",
    titleKey: "blog.post9.title",
    excerptKey: "blog.post9.excerpt",
    contentKey: "blog.post9.content",
    categoryKey: "blog.category.welding",
    date: "2024-10-20",
    readTime: "5",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?w=1200&q=80"
  },
  {
    id: "10",
    slug: "historical-monument-restoration-laser-cleaning",
    titleKey: "blog.post10.title",
    excerptKey: "blog.post10.excerpt",
    contentKey: "blog.post10.content",
    categoryKey: "blog.category.restoration",
    date: "2024-10-15",
    readTime: "6",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80"
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": t(post.titleKey),
    "description": t(post.excerptKey),
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Marine Laser Clean"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marine Laser Clean",
      "logo": {
        "@type": "ImageObject",
        "url": "https://marinelaserclean.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://marinelaserclean.com/blog/${post.slug}`
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t(post.titleKey),
          text: t(post.excerptKey),
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{`${t(post.titleKey)} | Marine Laser Clean`}</title>
        <meta name="description" content={t(post.excerptKey)} />
        <meta name="keywords" content="laser cleaning, rust removal, surface preparation, industrial cleaning, ship hull cleaning, sandblasting alternative" />
        <link rel="canonical" href={`https://marinelaserclean.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={t(post.titleKey)} />
        <meta property="og:description" content={t(post.excerptKey)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://marinelaserclean.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content={post.date} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t(post.titleKey)} />
        <meta name="twitter:description" content={t(post.excerptKey)} />
        <meta name="twitter:image" content={post.image} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <article className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("blog.backToBlog")}
            </Link>

            {/* Header */}
            <header className="mb-8">
              <Badge variant="secondary" className="mb-4">
                {t(post.categoryKey)}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {t(post.titleKey)}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {t(post.excerptKey)}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : language === 'zh' ? 'zh-CN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min {t("blog.readTime")}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  {t("blog.share")}
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-10">
              <img 
                src={post.image} 
                alt={t(post.titleKey)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div 
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: t(post.contentKey) }}
              />
            </div>

            {/* CTA */}
            <aside className="mt-12 bg-primary/10 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("blog.cta.title")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("blog.cta.description")}
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {t("blog.cta.button")}
              </Link>
            </aside>

            {/* Related Posts */}
            <section className="mt-12">
              <h3 className="text-xl font-bold text-foreground mb-6">{t("blog.relatedPosts")}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts
                  .filter(p => p.slug !== post.slug)
                  .slice(0, 2)
                  .map(relatedPost => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group block p-4 rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {t(relatedPost.categoryKey)}
                      </Badge>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {t(relatedPost.titleKey)}
                      </h4>
                    </Link>
                  ))}
              </div>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
