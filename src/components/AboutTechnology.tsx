import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Zap, Leaf, Radio } from 'lucide-react';

const AboutTechnology = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('about.tech.feature1.title'),
      description: t('about.tech.feature1.desc'),
      gradient: ['hsl(200, 100%, 50%)', 'hsl(220, 100%, 60%)'],
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('about.tech.feature2.title'),
      description: t('about.tech.feature2.desc'),
      gradient: ['hsl(142, 76%, 50%)', 'hsl(172, 66%, 50%)'],
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: t('about.tech.feature3.title'),
      description: t('about.tech.feature3.desc'),
      gradient: ['hsl(280, 100%, 60%)', 'hsl(320, 100%, 60%)'],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Features */}
          <div>
            <AnimatedSection animation="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                {t('about.tech.title')}
              </h2>
            </AnimatedSection>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <AnimatedSection 
                  key={index} 
                  animation="fade-left" 
                  delay={index * 100}
                >
                  <div
                    className="relative p-6 rounded-2xl backdrop-blur-sm border border-border/50 transition-all duration-500 cursor-pointer group"
                    style={{
                      background: hoveredCard === index 
                        ? `linear-gradient(135deg, ${feature.gradient[0]}10, ${feature.gradient[1]}10)` 
                        : 'hsl(var(--card) / 0.5)',
                      borderColor: hoveredCard === index ? feature.gradient[0] : undefined,
                      boxShadow: hoveredCard === index 
                        ? `0 20px 40px ${feature.gradient[0]}20` 
                        : undefined,
                      transform: hoveredCard === index ? 'translateY(-5px)' : 'translateY(0)',
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Holographic shine effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(45deg, transparent 30%, ${feature.gradient[0]}20 50%, transparent 70%)`,
                        animation: hoveredCard === index ? 'holoShine 0.6s ease-in-out' : 'none',
                      }}
                    />
                    
                    <div className="flex gap-5 relative z-10">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ 
                          background: `linear-gradient(135deg, ${feature.gradient[0]}, ${feature.gradient[1]})`,
                          boxShadow: `0 10px 30px ${feature.gradient[0]}40`,
                        }}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
          
          {/* Right side - Compact Interactive visual */}
          <AnimatedSection animation="fade-right" delay={200}>
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Main display container - compact */}
              <div 
                className="relative aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--background)))',
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0 20px 40px hsl(var(--primary) / 0.1), inset 0 0 30px hsl(var(--primary) / 0.05)',
                }}
              >
                {/* Tech grid */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px),
                      linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />
                
                {/* Central laser visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    {/* Outer ring */}
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_20s_linear_infinite]"
                    />
                    
                    {/* Middle ring */}
                    <div 
                      className="absolute inset-3 rounded-full border-2 border-accent/40 animate-[spin_15s_linear_infinite_reverse]"
                    />
                    
                    {/* Inner core */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary animate-pulse"
                      style={{
                        boxShadow: '0 0 30px hsl(var(--primary)), 0 0 60px hsl(var(--primary) / 0.5)',
                      }}
                    />
                    
                    {/* Rotating laser beams */}
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                      <div 
                        className="absolute top-1/2 left-1/2 w-0.5 h-16 -translate-x-1/2 origin-top"
                        style={{
                          background: 'linear-gradient(to bottom, hsl(var(--primary)), transparent)',
                          boxShadow: '0 0 10px hsl(var(--primary))',
                        }}
                      />
                      <div 
                        className="absolute top-1/2 left-1/2 w-0.5 h-16 -translate-x-1/2 origin-top rotate-90"
                        style={{
                          background: 'linear-gradient(to bottom, hsl(var(--accent)), transparent)',
                          boxShadow: '0 0 10px hsl(var(--accent))',
                        }}
                      />
                      <div 
                        className="absolute top-1/2 left-1/2 w-0.5 h-16 -translate-x-1/2 origin-top rotate-180"
                        style={{
                          background: 'linear-gradient(to bottom, hsl(var(--primary)), transparent)',
                          boxShadow: '0 0 10px hsl(var(--primary))',
                        }}
                      />
                      <div 
                        className="absolute top-1/2 left-1/2 w-0.5 h-16 -translate-x-1/2 origin-top -rotate-90"
                        style={{
                          background: 'linear-gradient(to bottom, hsl(var(--accent)), transparent)',
                          boxShadow: '0 0 10px hsl(var(--accent))',
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Status indicators */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-primary">ONLINE</span>
                  </div>
                  <span className="text-muted-foreground">6000W</span>
                </div>
                
                {/* Scanning line */}
                <div 
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 animate-[scanY_3s_linear_infinite]"
                />
              </div>
              
              {/* Corner decorations */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br" />
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <style>{`
        @keyframes holoShine {
          0% { transform: translateX(-100%) translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) translateY(100%); opacity: 0; }
        }
        
        @keyframes scanY {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
};

export default AboutTechnology;
