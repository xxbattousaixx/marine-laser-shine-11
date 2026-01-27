import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const AboutCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
              boxShadow: '0 0 10px hsl(var(--primary))',
              animation: `float-cta ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="scale">
          <div 
            className="max-w-3xl mx-auto text-center p-12 md:p-16 rounded-3xl backdrop-blur-sm border border-primary/20"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--card) / 0.8), hsl(var(--card) / 0.5))',
              boxShadow: '0 40px 80px hsl(var(--primary) / 0.15), 0 0 0 1px hsl(var(--primary) / 0.1)',
            }}
          >
            {/* Icon */}
            <div 
              className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                boxShadow: '0 10px 30px hsl(var(--primary) / 0.4)',
              }}
            >
              <svg 
                className="w-8 h-8 text-primary-foreground" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </div>
            
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--muted-foreground)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('about.cta.title')}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              {t('about.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="relative overflow-hidden group px-8"
              >
                <Link to="/contact">
                  <span className="relative z-10">{t('about.cta.button1')}</span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, hsl(var(--accent) / 0.4) 0%, transparent 70%)',
                    }}
                  />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary/50 hover:bg-primary/10 px-8"
              >
                <Link to="/gallery">{t('about.cta.button2')}</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      <style>{`
        @keyframes float-cta {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(3px); }
        }
      `}</style>
    </section>
  );
};

export default AboutCTA;
