import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg">LaserClean</p>
            <div className="flex items-center gap-2 justify-center md:justify-start mt-2">
              <MapPin className="h-4 w-4" />
              <p className="text-sm">{t('footer.location')}</p>
            </div>
          </div>
          
          <div className="text-center text-sm">
            <p>© {currentYear} LaserClean. {t('footer.rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
