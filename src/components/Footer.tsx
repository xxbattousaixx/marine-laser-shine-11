import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/marine-laser-clean-logo.webp";

const popularPosts = [
  { slug: "laser-cleaning-vs-sandblasting-comparison", label: "Laser Cleaning vs Sandblasting" },
  { slug: "rust-removal-ship-hull-maintenance", label: "Ship Hull Rust Removal" },
  { slug: "industrial-laser-cleaning-benefits-manufacturing", label: "Industrial Manufacturing" },
  { slug: "eco-friendly-surface-preparation-techniques", label: "Eco-Friendly Surface Prep" },
  { slug: "welding-preparation-laser-cleaning-benefits", label: "Welding Preparation" },
];

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Marine Laser Clean Logo"
              className="h-12 mb-3 object-contain"
              width="192"
              height="48"
              loading="lazy"
            />
            <div className="flex items-center gap-2 text-sm mb-2">
              <MapPin className="h-4 w-4" />
              <p>{t("footer.location")}</p>
            </div>
            <p className="text-sm opacity-90">
              6000W industrial laser cleaning &amp; paint coating services.
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer navigation">
            <h2 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              Explore
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">{t("nav.home")}</Link></li>
              <li><Link to="/about" className="hover:underline">{t("nav.about")}</Link></li>
              <li><Link to="/services" className="hover:underline">{t("nav.services")}</Link></li>
              <li><Link to="/gallery" className="hover:underline">{t("nav.gallery")}</Link></li>
              <li><Link to="/blog" className="hover:underline">{t("nav.blog")}</Link></li>
              <li><Link to="/contact" className="hover:underline">{t("nav.contact")}</Link></li>
            </ul>
          </nav>

          {/* Popular articles */}
          <nav aria-label="Popular articles">
            <h2 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              From the Blog
            </h2>
            <ul className="space-y-2 text-sm">
              {popularPosts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="hover:underline">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h2 className="font-semibold mb-3 text-sm uppercase tracking-wider">
              Resources
            </h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:underline">Ship &amp; Marine Cleaning</Link></li>
              <li><Link to="/services" className="hover:underline">Industrial Rust Removal</Link></li>
              <li><Link to="/services" className="hover:underline">Paint &amp; Coating Removal</Link></li>
              <li><Link to="/gallery" className="hover:underline">Before &amp; After Gallery</Link></li>
              <li><Link to="/contact" className="hover:underline">Request a Quote</Link></li>
              <li><Link to="/privacy-policy" className="hover:underline">{t("footer.privacy")}</Link></li>
              <li><Link to="/cookie-policy" className="hover:underline">{t("footer.cookies")}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-primary-foreground/20 pt-4 text-center text-sm">
          <p>
            © {currentYear} {t("footer.company")}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
