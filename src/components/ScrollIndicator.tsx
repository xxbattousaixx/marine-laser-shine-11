import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

const ScrollIndicator = ({ targetId = 'features', className = '' }: ScrollIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 transition-all duration-500 cursor-pointer group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } ${className}`}
      aria-label="Scroll to content"
    >
      <span className="text-xs tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors">
        SCROLL TO EXPLORE
      </span>
      <div className="relative">
        <ChevronDown className="w-6 h-6 text-cyan-400 animate-bounce" />
        <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md animate-pulse" />
      </div>
    </button>
  );
};

export default ScrollIndicator;
