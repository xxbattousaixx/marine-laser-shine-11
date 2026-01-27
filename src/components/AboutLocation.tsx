import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { MapPin } from 'lucide-react';

const AboutLocation = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('about.location.title')}
              </h2>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="scale" delay={100}>
            <div 
              className="relative rounded-3xl overflow-hidden backdrop-blur-sm border border-border/50 bg-card/50"
              style={{
                boxShadow: '0 40px 80px hsl(var(--primary) / 0.1)',
              }}
            >
              {/* Map background with gradient overlay */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%),
                    linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '100% 100%, 30px 30px, 30px 30px',
                }}
              />
              
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                {/* Location marker */}
                <div className="relative shrink-0">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                      boxShadow: '0 0 40px hsl(var(--primary) / 0.5)',
                    }}
                  >
                    <MapPin 
                      className="w-12 h-12 text-primary-foreground" 
                      style={{ animation: 'bounce 2s infinite' }}
                    />
                  </div>
                  
                  {/* Pulse rings */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-primary/50"
                    style={{ animation: 'location-pulse 2s ease-out infinite' }}
                  />
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    style={{ animation: 'location-pulse 2s ease-out infinite', animationDelay: '0.5s' }}
                  />
                </div>
                
                {/* Location info */}
                <div className="text-center md:text-left">
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Cabimas, Zulia
                  </h3>
                  <p className="text-xl text-muted-foreground mb-4">Venezuela</p>
                  <p className="text-muted-foreground max-w-lg leading-relaxed">
                    {t('about.location.description')}
                  </p>
                </div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes location-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default AboutLocation;
