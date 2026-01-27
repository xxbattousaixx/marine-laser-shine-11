import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const AboutHero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchText, setGlitchText] = useState(t('about.hero.title'));
  
  useEffect(() => {
    setGlitchText(t('about.hero.title'));
  }, [t]);

  // Glitch effect on hover
  const handleGlitch = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const original = t('about.hero.title');
    let iterations = 0;
    
    const interval = setInterval(() => {
      setGlitchText(
        original
          .split('')
          .map((char, index) => {
            if (index < iterations) return original[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iterations >= original.length) {
        clearInterval(interval);
      }
      iterations += 1;
    }, 30);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridFloat 20s linear infinite',
          }}
        />
      </div>
      
      {/* Laser beam scanning effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 w-[2px] h-full opacity-60"
          style={{
            background: 'linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)',
            boxShadow: '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--accent))',
            animation: 'laserScan 4s linear infinite',
          }}
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.4,
              boxShadow: '0 0 10px hsl(var(--primary))',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-4 inline-block">
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/30 backdrop-blur-sm">
            {t('about.hero.badge')}
          </span>
        </div>
        
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight cursor-pointer"
          onMouseEnter={handleGlitch}
        >
          <span className="text-foreground">{t('about.hero.preTitle')} </span>
          <span 
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px hsl(var(--primary) / 0.3)',
            }}
          >
            {glitchText}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          {t('about.hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg"
            className="relative overflow-hidden group px-8"
          >
            <Link to="/services">
              <span className="relative z-10">{t('about.hero.cta1')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-primary/50 hover:bg-primary/10 px-8"
          >
            <Link to="/gallery">{t('about.hero.cta2')}</Link>
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </div>
      
      <style>{`
        @keyframes laserScan {
          0% { left: -10%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { left: 110%; opacity: 0; }
        }
        
        @keyframes gridFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default AboutHero;
