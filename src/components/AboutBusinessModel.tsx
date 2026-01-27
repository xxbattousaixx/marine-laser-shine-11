import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { Truck, FileText, Calendar, Check } from 'lucide-react';

const AboutBusinessModel = () => {
  const { t } = useLanguage();

  const models = [
    {
      number: '01',
      icon: <Truck className="w-6 h-6" />,
      title: t('about.business.model1.title'),
      description: t('about.business.model1.desc'),
      features: [
        t('about.business.model1.feature1'),
        t('about.business.model1.feature2'),
        t('about.business.model1.feature3'),
      ],
      gradient: ['hsl(200, 100%, 50%)', 'hsl(220, 100%, 60%)'],
    },
    {
      number: '02',
      icon: <FileText className="w-6 h-6" />,
      title: t('about.business.model2.title'),
      description: t('about.business.model2.desc'),
      features: [
        t('about.business.model2.feature1'),
        t('about.business.model2.feature2'),
        t('about.business.model2.feature3'),
      ],
      gradient: ['hsl(280, 100%, 60%)', 'hsl(320, 100%, 60%)'],
    },
    {
      number: '03',
      icon: <Calendar className="w-6 h-6" />,
      title: t('about.business.model3.title'),
      description: t('about.business.model3.desc'),
      features: [
        t('about.business.model3.feature1'),
        t('about.business.model3.feature2'),
        t('about.business.model3.feature3'),
      ],
      gradient: ['hsl(142, 76%, 50%)', 'hsl(172, 66%, 50%)'],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              hsl(var(--foreground)) 50px,
              hsl(var(--foreground)) 51px
            )
          `,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.business.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('about.business.subtitle')}
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {models.map((model, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-up" 
              delay={index * 150}
            >
              <div 
                className="relative h-full p-8 rounded-2xl backdrop-blur-sm border border-border/50 bg-card/50 transition-all duration-500 group hover:-translate-y-2"
                style={{
                  boxShadow: '0 20px 40px hsl(var(--primary) / 0.05)',
                }}
              >
                {/* Glowing top border on hover */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${model.gradient[0]}, ${model.gradient[1]})`,
                  }}
                />
                
                {/* Number badge */}
                <div 
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                  style={{
                    background: `linear-gradient(135deg, ${model.gradient[0]}, ${model.gradient[1]})`,
                    boxShadow: `0 10px 30px ${model.gradient[0]}40`,
                  }}
                >
                  {model.number}
                </div>
                
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ 
                    background: `linear-gradient(135deg, ${model.gradient[0]}20, ${model.gradient[1]}20)`,
                    border: `1px solid ${model.gradient[0]}40`,
                  }}
                >
                  <div style={{ color: model.gradient[0] }}>{model.icon}</div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {model.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {model.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3">
                  {model.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ 
                          background: `linear-gradient(135deg, ${model.gradient[0]}20, ${model.gradient[1]}20)`,
                        }}
                      >
                        <Check className="w-3 h-3" style={{ color: model.gradient[0] }} />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBusinessModel;
