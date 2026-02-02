import { useRef, useMemo, Suspense, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  color?: string;
}

const Particles = memo(function Particles({ count = 800, color = '#00d4ff' }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.015;
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
});

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
}

const FloatingShape = memo(function FloatingShape({ position, color, speed = 1 }: FloatingShapeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      ref.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
});

interface ParticleBackgroundProps {
  variant?: 'default' | 'services' | 'about';
  className?: string;
}

const ParticleBackground = memo(function ParticleBackground({ variant = 'default', className = '' }: ParticleBackgroundProps) {
  const colors = {
    default: { particles: '#00d4ff', shapes: ['#00d4ff', '#ff6b35'] },
    services: { particles: '#00ff88', shapes: ['#00ff88', '#00d4ff'] },
    about: { particles: '#8b5cf6', shapes: ['#8b5cf6', '#00d4ff'] },
  };

  const config = colors[variant];

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
          frameloop="demand"
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Particles count={600} color={config.particles} />
          <FloatingShape position={[-3, 2, -5]} color={config.shapes[0]} speed={0.8} />
          <FloatingShape position={[3, -1, -4]} color={config.shapes[1]} speed={1.2} />
        </Canvas>
      </Suspense>
    </div>
  );
});

export default ParticleBackground;
