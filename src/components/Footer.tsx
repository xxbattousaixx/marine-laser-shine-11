import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/marine-laser-clean-logo.png";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <img src={logo} alt="Marine Laser Clean Logo" className="h-12 mb-2 object-contain mx-auto md:mx-0" />
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4" />
                <p className="text-sm">{t('footer.location')}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-4 text-sm">
                <Link to="/privacy-policy" className="hover:underline transition-colors">
                  {t('footer.privacy')}
                </Link>
                <span>|</span>
                <Link to="/cookie-policy" className="hover:underline transition-colors">
                  {t('footer.cookies')}
                </Link>
              </div>
              <p className="text-sm">© {currentYear} {t('footer.company')}. {t('footer.rights')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
