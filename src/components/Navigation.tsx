import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Languages, Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/marine-laser-clean-logo.png";

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const getNextLanguage = () => {
    if (language === 'es') return 'en';
    if (language === 'en') return 'zh';
    return 'es';
  };

  const getLanguageLabel = () => {
    if (language === 'es') return 'EN';
    if (language === 'en') return '中文';
    return 'ES';
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Marine Laser Clean Logo" className="h-10 object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              {t('nav.home')}
            </NavLink>
            <NavLink 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              {t('nav.about')}
            </NavLink>
            <NavLink 
              to="/services" 
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              {t('nav.services')}
            </NavLink>
            <NavLink 
              to="/gallery" 
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              {t('nav.gallery')}
            </NavLink>
            <NavLink 
              to="/blog" 
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              {t('nav.blog')}
            </NavLink>
            <NavLink 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              {t('nav.contact')}
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(getNextLanguage() as 'es' | 'en' | 'zh')}
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              <span className="font-semibold">{getLanguageLabel()}</span>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 pb-4 border-b border-border">
                    <span className="text-sm text-muted-foreground">Theme:</span>
                    <ThemeToggle />
                  </div>
                  
                  <NavLink 
                    to="/" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-foreground hover:text-primary transition-colors py-2"
                    activeClassName="text-primary font-semibold"
                  >
                    {t('nav.home')}
                  </NavLink>
                  <NavLink 
                    to="/about" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-foreground hover:text-primary transition-colors py-2"
                    activeClassName="text-primary font-semibold"
                  >
                    {t('nav.about')}
                  </NavLink>
                  <NavLink 
                    to="/services" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-foreground hover:text-primary transition-colors py-2"
                    activeClassName="text-primary font-semibold"
                  >
                    {t('nav.services')}
                  </NavLink>
                  <NavLink 
                    to="/gallery" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-foreground hover:text-primary transition-colors py-2"
                    activeClassName="text-primary font-semibold"
                  >
                    {t('nav.gallery')}
                  </NavLink>
                  <NavLink 
                    to="/blog" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-foreground hover:text-primary transition-colors py-2"
                    activeClassName="text-primary font-semibold"
                  >
                    {t('nav.blog')}
                  </NavLink>
                  <NavLink 
                    to="/contact" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-foreground hover:text-primary transition-colors py-2"
                    activeClassName="text-primary font-semibold"
                  >
                    {t('nav.contact')}
                  </NavLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
