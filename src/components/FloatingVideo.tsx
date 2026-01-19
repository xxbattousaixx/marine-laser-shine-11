import { useState, useEffect } from "react";
import { Play, X, Minimize2, Maximize2 } from "lucide-react";

const FloatingVideo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const videoId = "vrk9-LOr7cs";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  // Show floating video after user scrolls a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !hasInteracted) {
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasInteracted]);

  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed z-50 transition-all duration-500 ease-out ${
        isMinimized 
          ? 'bottom-4 right-4 w-48 md:w-56' 
          : 'bottom-4 right-4 w-80 md:w-96'
      }`}
    >
      <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-border/50 bg-background">
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-2 bg-gradient-to-b from-black/70 to-transparent">
          <span className="text-white/90 text-xs font-medium ml-1">
            Watch Demo
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white/30"
              aria-label={isMinimized ? "Expand video" : "Minimize video"}
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3 text-white" />
              ) : (
                <Minimize2 className="w-3 h-3 text-white" />
              )}
            </button>
            <button
              onClick={handleClose}
              className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-red-500/80"
              aria-label="Close video"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Video content */}
        <div className={`aspect-video ${isMinimized ? 'cursor-pointer' : ''}`}>
          {isMinimized ? (
            <div 
              onClick={() => setIsMinimized(false)}
              className="relative w-full h-full group"
            >
              <img 
                src={thumbnailUrl} 
                alt="Video preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-200 group-hover:bg-black/20">
                <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title="Marine Laser Cleaning Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingVideo;
