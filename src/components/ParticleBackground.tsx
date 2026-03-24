import { useRef, useMemo, Suspense, lazy } from 'react';

// Lazy load the entire Three.js canvas
const LazyCanvas = lazy(() => import('./ParticleCanvas'));

interface ParticleBackgroundProps {
  variant?: 'default' | 'services' | 'about';
  className?: string;
}

const ParticleBackground = ({ variant = 'default', className = '' }: ParticleBackgroundProps) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Suspense fallback={null}>
        <LazyCanvas variant={variant} />
      </Suspense>
    </div>
  );
};

export default ParticleBackground;
