import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.gallery': 'Galería',
    'nav.contact': 'Contacto',
    
    // Home
    'home.hero.title': 'Limpieza Láser Profesional',
    'home.hero.subtitle': 'Servicios especializados de arenado y limpieza láser para la industria petrolera en Venezuela',
    'home.hero.cta': 'Solicitar Cotización',
    'home.hero.cta2': 'Ver Servicios',
    'home.features.title': '¿Por Qué Elegirnos?',
    'home.features.precision.title': 'Precisión',
    'home.features.precision.desc': 'Tecnología láser de última generación para resultados impecables',
    'home.features.eco.title': 'Eco-Amigable',
    'home.features.eco.desc': 'Sin químicos dañinos ni residuos peligrosos',
    'home.features.efficient.title': 'Eficiente',
    'home.features.efficient.desc': 'Reducción significativa de tiempo y costos',
    'home.features.versatile.title': 'Versátil',
    'home.features.versatile.desc': 'Funciona en todo tipo de superficies y materiales',
    
    // About
    'about.title': 'Sobre Nosotros',
    'about.subtitle': 'Expertos en limpieza láser con años de experiencia',
    'about.intro': 'Somos líderes en servicios de limpieza láser en Cabimas, Zulia, Venezuela. Especializados en la industria petrolera, ofrecemos soluciones de limpieza innovadoras y eficientes.',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.desc': 'Proporcionar servicios de limpieza láser de la más alta calidad, garantizando la satisfacción del cliente y el cuidado del medio ambiente.',
    'about.vision.title': 'Nuestra Visión',
    'about.vision.desc': 'Ser la empresa líder en servicios de limpieza láser en Venezuela y expandir nuestros servicios a nivel internacional.',
    'about.values.title': 'Nuestros Valores',
    'about.values.quality': 'Calidad',
    'about.values.innovation': 'Innovación',
    'about.values.commitment': 'Compromiso',
    'about.values.safety': 'Seguridad',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Soluciones completas de limpieza láser',
    'services.ship.title': 'Limpieza de Cabinas de Barcos',
    'services.ship.desc': 'Servicio especializado para barcazas y embarcaciones de la industria petrolera. Eliminamos óxido, pintura vieja y contaminantes de cabinas y superficies metálicas.',
    'services.machinery.title': 'Limpieza de Maquinaria',
    'services.machinery.desc': 'Restauración de equipos industriales, vehículos y maquinaria pesada. Eliminamos corrosión y preparamos superficies para mantenimiento.',
    'services.rust.title': 'Remoción de Óxido',
    'services.rust.desc': 'Eliminación efectiva de óxido en todo tipo de piezas metálicas. Proceso no abrasivo que preserva la integridad del material base.',
    'services.parts.title': 'Limpieza de Piezas',
    'services.parts.desc': 'Servicio de limpieza para componentes industriales de cualquier tamaño. Resultados precisos sin daño a las piezas.',
    
    // Gallery
    'gallery.title': 'Galería de Trabajos',
    'gallery.subtitle': 'Vea la calidad de nuestro trabajo',
    'gallery.before': 'Antes',
    'gallery.after': 'Después',
    
    // Contact
    'contact.title': 'Contáctenos',
    'contact.subtitle': 'Estamos aquí para ayudarle',
    'contact.name': 'Nombre',
    'contact.email': 'Correo Electrónico',
    'contact.phone': 'Teléfono',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.info.title': 'Información de Contacto',
    'contact.info.location': 'Cabimas, Zulia, Venezuela',
    'contact.info.phone': '+58 (XXX) XXX-XXXX',
    'contact.info.email': 'info@limpiezalaser.com',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.location': 'Cabimas, Zulia, Venezuela',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    
    // Home
    'home.hero.title': 'Professional Laser Cleaning',
    'home.hero.subtitle': 'Specialized laser sandblasting and cleaning services for the oil industry in Venezuela',
    'home.hero.cta': 'Request Quote',
    'home.hero.cta2': 'View Services',
    'home.features.title': 'Why Choose Us?',
    'home.features.precision.title': 'Precision',
    'home.features.precision.desc': 'State-of-the-art laser technology for impeccable results',
    'home.features.eco.title': 'Eco-Friendly',
    'home.features.eco.desc': 'No harmful chemicals or hazardous waste',
    'home.features.efficient.title': 'Efficient',
    'home.features.efficient.desc': 'Significant reduction in time and costs',
    'home.features.versatile.title': 'Versatile',
    'home.features.versatile.desc': 'Works on all types of surfaces and materials',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Laser cleaning experts with years of experience',
    'about.intro': 'We are leaders in laser cleaning services in Cabimas, Zulia, Venezuela. Specialized in the oil industry, we offer innovative and efficient cleaning solutions.',
    'about.mission.title': 'Our Mission',
    'about.mission.desc': 'To provide the highest quality laser cleaning services, ensuring customer satisfaction and environmental care.',
    'about.vision.title': 'Our Vision',
    'about.vision.desc': 'To be the leading laser cleaning service company in Venezuela and expand our services internationally.',
    'about.values.title': 'Our Values',
    'about.values.quality': 'Quality',
    'about.values.innovation': 'Innovation',
    'about.values.commitment': 'Commitment',
    'about.values.safety': 'Safety',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Complete laser cleaning solutions',
    'services.ship.title': 'Ship Cabin Cleaning',
    'services.ship.desc': 'Specialized service for barges and vessels in the oil industry. We remove rust, old paint, and contaminants from cabins and metal surfaces.',
    'services.machinery.title': 'Machinery Cleaning',
    'services.machinery.desc': 'Restoration of industrial equipment, vehicles, and heavy machinery. We remove corrosion and prepare surfaces for maintenance.',
    'services.rust.title': 'Rust Removal',
    'services.rust.desc': 'Effective rust removal on all types of metal parts. Non-abrasive process that preserves the integrity of the base material.',
    'services.parts.title': 'Parts Cleaning',
    'services.parts.desc': 'Cleaning service for industrial components of any size. Precise results without damage to parts.',
    
    // Gallery
    'gallery.title': 'Work Gallery',
    'gallery.subtitle': 'See the quality of our work',
    'gallery.before': 'Before',
    'gallery.after': 'After',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to help you',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.location': 'Cabimas, Zulia, Venezuela',
    'contact.info.phone': '+58 (XXX) XXX-XXXX',
    'contact.info.email': 'info@limpiezalaser.com',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.location': 'Cabimas, Zulia, Venezuela',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.services': '服务项目',
    'nav.gallery': '作品展示',
    'nav.contact': '联系我们',
    
    // Home
    'home.hero.title': '专业激光清洁',
    'home.hero.subtitle': '为委内瑞拉石油行业提供专业的激光喷砂和清洁服务',
    'home.hero.cta': '索取报价',
    'home.hero.cta2': '查看服务',
    'home.features.title': '为什么选择我们？',
    'home.features.precision.title': '精准',
    'home.features.precision.desc': '最先进的激光技术，效果完美无瑕',
    'home.features.eco.title': '环保',
    'home.features.eco.desc': '无有害化学物质或危险废物',
    'home.features.efficient.title': '高效',
    'home.features.efficient.desc': '显著减少时间和成本',
    'home.features.versatile.title': '多功能',
    'home.features.versatile.desc': '适用于所有类型的表面和材料',
    
    // About
    'about.title': '关于我们',
    'about.subtitle': '拥有多年经验的激光清洁专家',
    'about.intro': '我们是委内瑞拉卡比马斯苏利亚州激光清洁服务的领导者。专注于石油行业，我们提供创新高效的清洁解决方案。',
    'about.mission.title': '我们的使命',
    'about.mission.desc': '提供最高质量的激光清洁服务，确保客户满意和环境保护。',
    'about.vision.title': '我们的愿景',
    'about.vision.desc': '成为委内瑞拉领先的激光清洁服务公司，并将我们的服务扩展到国际。',
    'about.values.title': '我们的价值观',
    'about.values.quality': '质量',
    'about.values.innovation': '创新',
    'about.values.commitment': '承诺',
    'about.values.safety': '安全',
    
    // Services
    'services.title': '我们的服务',
    'services.subtitle': '完整的激光清洁解决方案',
    'services.ship.title': '船舱清洁',
    'services.ship.desc': '为石油行业的驳船和船只提供专业服务。我们清除船舱和金属表面的锈迹、旧漆和污染物。',
    'services.machinery.title': '机械清洁',
    'services.machinery.desc': '工业设备、车辆和重型机械的修复。我们清除腐蚀并为维护准备表面。',
    'services.rust.title': '除锈',
    'services.rust.desc': '有效清除所有类型金属零件上的锈迹。非研磨工艺，保持基材的完整性。',
    'services.parts.title': '零件清洁',
    'services.parts.desc': '为任何尺寸的工业部件提供清洁服务。精确的结果，不会损坏零件。',
    
    // Gallery
    'gallery.title': '作品展示',
    'gallery.subtitle': '查看我们的工作质量',
    'gallery.before': '清洁前',
    'gallery.after': '清洁后',
    
    // Contact
    'contact.title': '联系我们',
    'contact.subtitle': '我们随时为您提供帮助',
    'contact.name': '姓名',
    'contact.email': '电子邮件',
    'contact.phone': '电话',
    'contact.message': '留言',
    'contact.send': '发送消息',
    'contact.info.title': '联系信息',
    'contact.info.location': '卡比马斯，苏利亚，委内瑞拉',
    'contact.info.phone': '+58 (XXX) XXX-XXXX',
    'contact.info.email': 'info@limpiezalaser.com',
    
    // Footer
    'footer.rights': '版权所有',
    'footer.location': '卡比马斯，苏利亚，委内瑞拉',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
