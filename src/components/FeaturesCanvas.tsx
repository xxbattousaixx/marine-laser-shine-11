import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NeonGrid() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const size = 40;
    const divisions = 40;
    const step = size / divisions;
    const half = size / 2;
    const verts: number[] = [];
    for (let i = 0; i <= divisions; i++) {
      const p = -half + i * step;
      verts.push(-half, 0, p, half, 0, p);
      verts.push(p, 0, -half, p, 0, half);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.position.z = (t * 1.5) % 1;
      const mat = ref.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.35 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry} position={[0, -2.5, 0]} rotation={[0, 0, 0]}>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </lineSegments>
  );
}

function Orb({ position, color, speed, scale = 1 }: { position: [number, number, number]; color: string; speed: number; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.x = t * speed * 0.3;
      ref.current.rotation.y = t * speed * 0.5;
      ref.current.position.y = position[1] + Math.sin(t * speed) * 0.4;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

const FeaturesCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
      gl={{ powerPreference: 'high-performance', antialias: false }}
    >
      <ambientLight intensity={0.4} />
      <NeonGrid />
      <Orb position={[-4, 1.5, -2]} color="#00d4ff" speed={0.6} scale={0.8} />
      <Orb position={[4, 0.5, -3]} color="#ff6b35" speed={0.9} scale={1.1} />
      <Orb position={[0, 2.5, -5]} color="#8b5cf6" speed={0.5} scale={0.6} />
    </Canvas>
  );
};

export default FeaturesCanvas;
