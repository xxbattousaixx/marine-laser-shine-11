import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Zap, Shield, Gauge } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  unit?: string;
  label: string;
  description: string;
  color: string;
  delay: number;
}

const StatItem = ({ icon, value, unit, label, description, color, delay }: StatItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  return (
    <div
      ref={ref}
      className={`relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        background: 'hsl(var(--card) / 0.5)',
        borderColor: `${color}40`,
        boxShadow: isVisible ? `0 20px 40px ${color}20, 0 0 0 1px ${color}10` : 'none',
      }}
    >
      {/* Pulse ring effect */}
      <div 
        className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 opacity-60"
        style={{
          borderColor: color,
          animation: isVisible ? 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
        }}
      />
      
      {/* Icon */}
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
        style={{ 
          background: `linear-gradient(135deg, ${color}20, ${color}40)`,
          boxShadow: `0 0 20px ${color}30`,
        }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      
      {/* Value */}
      <div className="flex items-baseline gap-1 mb-2">
        <span 
          className="text-5xl font-bold tracking-tight"
          style={{ color }}
        >
          {count}
        </span>
        {unit && (
          <span className="text-2xl font-semibold text-muted-foreground">{unit}</span>
        )}
      </div>
      
      {/* Label */}
      <h3 className="text-lg font-semibold text-foreground mb-2">{label}</h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const AboutStats = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <Zap className="w-7 h-7" />,
      value: '6000',
      unit: 'W',
      label: t('about.stats.power.label'),
      description: t('about.stats.power.desc'),
      color: 'hsl(200, 100%, 50%)',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      value: '0',
      unit: '%',
      label: t('about.stats.damage.label'),
      description: t('about.stats.damage.desc'),
      color: 'hsl(142, 76%, 50%)',
    },
    {
      icon: <Gauge className="w-7 h-7" />,
      value: '100',
      unit: '%',
      label: t('about.stats.efficiency.label'),
      description: t('about.stats.efficiency.desc'),
      color: 'hsl(262, 83%, 58%)',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.stats.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('about.stats.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
