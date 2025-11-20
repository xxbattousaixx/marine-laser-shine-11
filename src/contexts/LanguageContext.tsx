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
    'home.hero.title': 'Limpieza Láser Industrial',
    'home.hero.subtitle': 'Máquina láser de 6000W para preparación de superficies, remoción de óxido y limpieza industrial de alta potencia',
    'home.hero.cta': 'Solicitar Cotización',
    'home.hero.cta2': 'Ver Servicios',
    'home.features.title': '¿Por Qué Elegirnos?',
    'home.features.precision.title': 'Cero Daño al Sustrato',
    'home.features.precision.desc': 'Tecnología láser que elimina solo la contaminación, preservando el metal base sin abrasión',
    'home.features.eco.title': 'Sin Residuos Secundarios',
    'home.features.eco.desc': 'Sin medios abrasivos, químicos ni costos de disposición. Solo polvo mínimo capturado',
    'home.features.efficient.title': 'Dramáticamente Más Rápido',
    'home.features.efficient.desc': 'Limpia áreas grandes rápidamente, reduciendo tiempo de inactividad del cliente',
    'home.features.versatile.title': 'Precisión Láser',
    'home.features.versatile.desc': 'Limpia áreas específicas como soldaduras sin afectar el material circundante',
    'home.power.title': 'Potencia Industrial de 6000W',
    'home.power.desc': 'Equipo de alta potencia para aplicaciones industriales pesadas y proyectos de gran escala',
    
    // About
    'about.title': 'Sobre Nosotros',
    'about.subtitle': 'Proveedores especializados de servicios de limpieza láser industrial',
    'about.intro': 'Operamos un sistema láser de limpieza de óxido de 6000W de alta potencia, ofreciendo servicios de preparación de superficies de nivel industrial para manufactura pesada, marítima, energía y sectores aeroespaciales. Nuestro equipo de Clase 4 maneja proyectos de gran escala donde el tiempo de inactividad del cliente es crítico.',
    'about.mission.title': 'Nuestra Tecnología',
    'about.mission.desc': 'Sistema láser de 6000W para aplicaciones industriales pesadas. Limpieza rápida de grandes áreas con cero daño al sustrato, sin medios abrasivos y sin residuos químicos. Operación remota para entornos peligrosos.',
    'about.vision.title': 'Modelo de Negocio',
    'about.vision.desc': 'Proveedor de servicios B2B ofreciendo contratos móviles, por proyecto y de mantenimiento. Nos especializamos en educación del mercado sobre las ventajas económicas y ambientales sobre métodos tradicionales.',
    'about.values.title': 'Ventajas Clave',
    'about.values.quality': 'Sin Desperdicio',
    'about.values.innovation': 'Más Rápido',
    'about.values.commitment': 'Seguro',
    'about.values.safety': 'Preciso',
    
    // Services
    'services.title': 'Servicios Industriales de Limpieza Láser',
    'services.subtitle': 'Soluciones B2B para manufactura pesada, marítima, energía y más',
    'services.ship.title': 'Marítimo & Construcción Naval',
    'services.ship.desc': 'Remoción de óxido, percebes y pintura vieja de cascos de barcos en dique seco. Limpieza de tanques de lastre y bodegas de carga. Más rápido y limpio que el arenado tradicional.',
    'services.machinery.title': 'Manufactura & Fabricación',
    'services.machinery.desc': 'Pre-tratamiento para soldadura de placas de acero, vigas y tuberías. Preparación de superficies para pintura en turbinas eólicas, cascos de barcos y tanques de almacenamiento. Mantenimiento de moldes sin daño abrasivo.',
    'services.rust.title': 'Energía & Infraestructura',
    'services.rust.desc': 'Limpieza de calderas, intercambiadores de calor y tuberías en plantas de energía. Mantenimiento de torres eólicas. Restauración de puentes sin contención de polvo tóxico de pintura con plomo.',
    'services.parts.title': 'Aeroespacial & Automotriz',
    'services.parts.desc': 'Refabricación de álabes de turbina y componentes de motor donde la precisión es primordial. Restauración de chasis de autos clásicos y bloques de motor. Cero daño al sustrato.',
    
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
    'contact.info.phone': '0412-324-3681',
    'contact.info.email': 'marinelaserclean@gmail.com',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.location': 'Cabimas, Zulia, Venezuela',
    'footer.company': 'Marine Laser Clean',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    
    // Home
    'home.hero.title': 'Industrial Laser Cleaning',
    'home.hero.subtitle': '6000W laser machine for surface preparation, rust removal, and high-power industrial cleaning',
    'home.hero.cta': 'Request Quote',
    'home.hero.cta2': 'View Services',
    'home.features.title': 'Why Choose Us?',
    'home.features.precision.title': 'Zero Substrate Damage',
    'home.features.precision.desc': 'Laser technology removes only contamination, preserving base metal without abrasion',
    'home.features.eco.title': 'No Secondary Waste',
    'home.features.eco.desc': 'No abrasive media, chemicals, or disposal costs. Only minimal captured dust',
    'home.features.efficient.title': 'Dramatically Faster',
    'home.features.efficient.desc': 'Cleans large areas quickly, reducing client downtime',
    'home.features.versatile.title': 'Laser Precision',
    'home.features.versatile.desc': 'Clean specific areas like weld seams without affecting surrounding material',
    'home.power.title': '6000W Industrial Power',
    'home.power.desc': 'High-power equipment for heavy-duty industrial applications and large-scale projects',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Specialized industrial laser cleaning service providers',
    'about.intro': 'We operate a high-power 6000W rust cleaning laser system, offering industrial-grade surface preparation services for heavy manufacturing, maritime, energy, and aerospace sectors. Our Class 4 equipment handles large-scale projects where client downtime is critical.',
    'about.mission.title': 'Our Technology',
    'about.mission.desc': '6000W laser system for heavy-duty industrial applications. Fast cleaning of large areas with zero substrate damage, no abrasive media, and no chemical waste. Remote operation for hazardous environments.',
    'about.vision.title': 'Business Model',
    'about.vision.desc': 'B2B service provider offering mobile, per-project, and maintenance contracts. We specialize in market education about economic and environmental advantages over traditional methods.',
    'about.values.title': 'Key Advantages',
    'about.values.quality': 'No Waste',
    'about.values.innovation': 'Faster',
    'about.values.commitment': 'Safe',
    'about.values.safety': 'Precise',
    
    // Services
    'services.title': 'Industrial Laser Cleaning Services',
    'services.subtitle': 'B2B solutions for heavy manufacturing, maritime, energy, and more',
    'services.ship.title': 'Maritime & Shipbuilding',
    'services.ship.desc': 'Rust, barnacle, and old paint removal from ship hulls in dry dock. Ballast tank and cargo hold cleaning. Faster and cleaner than traditional sandblasting.',
    'services.machinery.title': 'Manufacturing & Fabrication',
    'services.machinery.desc': 'Pre-treatment for welding steel plates, beams, and pipes. Surface prep for painting on wind turbine towers, ship hulls, and storage tanks. Mold maintenance without abrasive damage.',
    'services.rust.title': 'Energy & Infrastructure',
    'services.rust.desc': 'Cleaning boilers, heat exchangers, and pipelines in power plants. Wind tower maintenance. Bridge restoration without toxic lead paint dust containment.',
    'services.parts.title': 'Aerospace & Automotive',
    'services.parts.desc': 'Refurbishment of turbine blades and engine components where precision is paramount. Classic car chassis and engine block restoration. Zero substrate damage.',
    
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
    'contact.info.phone': '0412-324-3681',
    'contact.info.email': 'marinelaserclean@gmail.com',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.location': 'Cabimas, Zulia, Venezuela',
    'footer.company': 'Marine Laser Clean',
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
    'contact.info.phone': '0412-324-3681',
    'contact.info.email': 'marinelaserclean@gmail.com',
    
    // Footer
    'footer.rights': '版权所有',
    'footer.location': '卡比马斯，苏利亚，委内瑞拉',
    'footer.company': 'Marine Laser Clean',
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
