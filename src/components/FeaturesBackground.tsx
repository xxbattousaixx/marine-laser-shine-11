import { Suspense, lazy } from 'react';

const FeaturesCanvas = lazy(() => import('./FeaturesCanvas'));

const FeaturesBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-70">
      <Suspense fallback={null}>
        <FeaturesCanvas />
      </Suspense>
    </div>
  );
};

export default FeaturesBackground;
