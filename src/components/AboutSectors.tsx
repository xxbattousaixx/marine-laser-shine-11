import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Factory, Zap, Plane, Ship } from 'lucide-react';

const AboutSectors = () => {
  const { t } = useLanguage();

  const sectors = [
    {
      icon: <Factory className="w-10 h-10" />,
      title: t('about.sectors.manufacturing'),
      gradient: ['hsl(200, 100%, 50%)', 'hsl(220, 100%, 60%)'],
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: t('about.sectors.energy'),
      gradient: ['hsl(45, 100%, 50%)', 'hsl(30, 100%, 50%)'],
    },
    {
      icon: <Plane className="w-10 h-10" />,
      title: t('about.sectors.aerospace'),
      gradient: ['hsl(280, 100%, 60%)', 'hsl(320, 100%, 60%)'],
    },
    {
      icon: <Ship className="w-10 h-10" />,
      title: t('about.sectors.maritime'),
      gradient: ['hsl(180, 100%, 40%)', 'hsl(200, 100%, 50%)'],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.sectors.title')}
          </h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {sectors.map((sector, index) => (
            <AnimatedSection 
              key={index} 
              animation="scale" 
              delay={index * 100}
            >
              <div 
                className="relative group cursor-pointer"
              >
                {/* Card */}
                <div 
                  className="relative aspect-square rounded-2xl backdrop-blur-sm border border-border/50 bg-card/50 p-6 flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:-translate-y-2"
                  style={{
                    boxShadow: '0 10px 30px hsl(var(--primary) / 0.05)',
                  }}
                >
                  {/* Glowing background on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${sector.gradient[0]}10, ${sector.gradient[1]}10)`,
                    }}
                  />
                  
                  {/* Glowing border on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      border: `1px solid ${sector.gradient[0]}50`,
                    }}
                  />
                  
                  {/* Icon container */}
                  <div 
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${sector.gradient[0]}20, ${sector.gradient[1]}20)`,
                      border: `1px solid ${sector.gradient[0]}30`,
                    }}
                  >
                    <div 
                      className="transition-all duration-500"
                      style={{ 
                        color: sector.gradient[0],
                        filter: 'drop-shadow(0 0 10px currentColor)',
                      }}
                    >
                      {sector.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className="font-semibold text-foreground transition-colors duration-300"
                    style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                  >
                    {sector.title}
                  </h3>
                </div>
                
                {/* Pulse effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    border: `2px solid ${sector.gradient[0]}`,
                    animation: 'sector-pulse 1.5s ease-out infinite',
                  }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes sector-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default AboutSectors;
