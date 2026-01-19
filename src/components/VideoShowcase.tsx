import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface VideoShowcaseProps {
  className?: string;
}

const VideoShowcase = ({ className = "" }: VideoShowcaseProps) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const videoId = "vrk9-LOr7cs";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className={`py-16 px-4 bg-gradient-to-b from-background/95 to-background ${className}`}>
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              {t('video.title') || 'See Our Technology in Action'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('video.subtitle') || 'Watch how our advanced laser cleaning solutions deliver exceptional results for marine and industrial applications.'}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="scale" delay={150}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border-2 border-border/50 aspect-video group">
            {!isPlaying ? (
              <>
                <img 
                  src={thumbnailUrl} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary shadow-lg shadow-primary/30"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    Marine Laser Cleaning
                  </span>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full">
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-black/90"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="Marine Laser Cleaning Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VideoShowcase;
