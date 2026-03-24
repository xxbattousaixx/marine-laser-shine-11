import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 400, color = '#00d4ff' }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingShape({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
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
      <meshStandardMaterial color={color} transparent opacity={0.6} wireframe />
    </mesh>
  );
}

interface ParticleCanvasProps {
  variant: 'default' | 'services' | 'about';
}

const colors = {
  default: { particles: '#00d4ff', shapes: ['#00d4ff', '#ff6b35'] },
  services: { particles: '#00ff88', shapes: ['#00ff88', '#00d4ff'] },
  about: { particles: '#8b5cf6', shapes: ['#8b5cf6', '#00d4ff'] },
};

const ParticleCanvas = ({ variant }: ParticleCanvasProps) => {
  const config = colors[variant];

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
      gl={{ powerPreference: 'high-performance', antialias: false }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Particles count={400} color={config.particles} />
      <FloatingShape position={[-3, 2, -5]} color={config.shapes[0]} speed={0.8} />
      <FloatingShape position={[3, -1, -4]} color={config.shapes[1]} speed={1.2} />
    </Canvas>
  );
};

export default ParticleCanvas;
