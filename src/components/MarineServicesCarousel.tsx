import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Ship, Plane, Factory, Zap, Paintbrush } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ServiceData {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  emoji: string;
  gradient: [string, string];
  accent: string;
}

const MarineServicesCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const cardsRef = useRef<{
    group: THREE.Group;
    angle: number;
    originalY: number;
    cardMesh: THREE.Mesh;
    borderMesh: THREE.Mesh;
    wireframe: THREE.LineSegments;
  }[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const autoRotateRef = useRef(true);
  const clockRef = useRef<THREE.Clock | null>(null);

  const { t } = useLanguage();

  const services: ServiceData[] = [
    {
      titleKey: 'services.ship.title',
      descKey: 'services.ship.desc',
      icon: <Ship className="h-6 w-6" />,
      emoji: '⚓',
      gradient: ['#00d2ff', '#3a7bd5'],
      accent: '#00d2ff'
    },
    {
      titleKey: 'services.parts.title',
      descKey: 'services.parts.desc',
      icon: <Plane className="h-6 w-6" />,
      emoji: '✈️',
      gradient: ['#f857a6', '#ff5858'],
      accent: '#ff5858'
    },
    {
      titleKey: 'services.machinery.title',
      descKey: 'services.machinery.desc',
      icon: <Factory className="h-6 w-6" />,
      emoji: '⚙️',
      gradient: ['#f093fb', '#f5576c'],
      accent: '#f5576c'
    },
    {
      titleKey: 'services.rust.title',
      descKey: 'services.rust.desc',
      icon: <Zap className="h-6 w-6" />,
      emoji: '⚡',
      gradient: ['#4facfe', '#00f2fe'],
      accent: '#00f2fe'
    },
    {
      titleKey: 'services.coating.title',
      descKey: 'services.coating.desc',
      icon: <Paintbrush className="h-6 w-6" />,
      emoji: '🎨',
      gradient: ['#43e97b', '#38f9d7'],
      accent: '#38f9d7'
    }
  ];

  const radius = 7;

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup with fog for depth
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.02);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 14);
    cameraRef.current = camera;

    // Renderer with alpha and antialiasing
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Post-processing for bloom effects
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.2;
    bloomPass.strength = 0.8;
    bloomPass.radius = 0.5;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Lighting setup - dramatic cinematic lighting
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0x00d2ff, 0.8, 20);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xff5858, 0.6, 20);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create holographic cards
    const angleStep = (Math.PI * 2) / services.length;

    services.forEach((service, index) => {
      const group = new THREE.Group();

      // Glass-like card material
      const cardGeometry = new THREE.BoxGeometry(3.2, 4.5, 0.08);
      const cardMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0f0f23,
        metalness: 0.1,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85,
        transmission: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide
      });

      const card = new THREE.Mesh(cardGeometry, cardMaterial);
      card.castShadow = true;
      card.receiveShadow = true;
      group.add(card);

      // Glowing border
      const borderGeometry = new THREE.BoxGeometry(3.3, 4.6, 0.09);
      const borderMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(service.accent),
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      group.add(border);

      // Inner glow line
      const edges = new THREE.EdgesGeometry(cardGeometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(service.accent),
        transparent: true,
        opacity: 0.8
      });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      group.add(wireframe);

      // Position in circle
      const angle = index * angleStep;
      group.position.x = Math.sin(angle) * radius;
      group.position.z = Math.cos(angle) * radius;
      group.rotation.y = -angle;

      cardsRef.current.push({
        group,
        angle,
        originalY: 0,
        cardMesh: card,
        borderMesh: border,
        wireframe
      });

      scene.add(group);
    });

    // Clock for animations
    clockRef.current = new THREE.Clock();

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer || !composer) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!clockRef.current) return;
      const time = clockRef.current.getElapsedTime();

      // Smooth rotation interpolation
      const rotationSpeed = 0.05;
      const diff = targetRotationRef.current - currentRotationRef.current;

      if (Math.abs(diff) > 0.001) {
        currentRotationRef.current += diff * rotationSpeed;
      } else if (autoRotateRef.current) {
        targetRotationRef.current += 0.001;
        currentRotationRef.current += 0.001;
      }

      const angleStep = (Math.PI * 2) / services.length;

      // Update card positions
      cardsRef.current.forEach((item, index) => {
        const baseAngle = item.angle + currentRotationRef.current;

        // Circular motion
        item.group.position.x = Math.sin(baseAngle) * radius;
        item.group.position.z = Math.cos(baseAngle) * radius;
        item.group.rotation.y = -baseAngle;

        // Floating animation
        const floatOffset = Math.sin(time * 2 + index) * 0.1;
        item.group.position.y = item.originalY + floatOffset;

        // Scale and glow based on facing direction
        const facingAngle = baseAngle % (Math.PI * 2);
        const normalizedAngle = ((facingAngle + Math.PI) % (Math.PI * 2)) - Math.PI;
        const distanceFromFront = Math.abs(normalizedAngle);

        const scale = Math.max(0.8, 1 - (distanceFromFront / Math.PI) * 0.2);
        item.group.scale.setScalar(scale);

        // Dynamic opacity/glow
        const opacity = Math.max(0.4, 1 - (distanceFromFront / Math.PI) * 0.6);
        (item.borderMesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.5;
        (item.wireframe.material as THREE.LineBasicMaterial).opacity = opacity;

        // Hover effect
        if (hoveredIndex === index) {
          item.group.scale.multiplyScalar(1.05);
          (item.borderMesh.material as THREE.MeshBasicMaterial).opacity = 0.8;
        }
      });

      // Particle animation
      if (particlesRef.current) {
        particlesRef.current.rotation.y = time * 0.05;
        particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      }

      // Camera subtle parallax
      const targetCamX = mouseRef.current.x * 0.5;
      const targetCamY = 2 + mouseRef.current.y * 0.2;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      composer.render();
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
      cardsRef.current = [];
    };
  }, []);

  // Update hovered index effect
  useEffect(() => {
    // This effect triggers re-render for hover state
  }, [hoveredIndex]);

  const rotate = useCallback((direction: number) => {
    if (isRotating) return;
    setIsRotating(true);
    autoRotateRef.current = false;

    const angleStep = (Math.PI * 2) / services.length;
    targetRotationRef.current += direction * angleStep;

    const newIndex = direction > 0
      ? (currentIndex + 1) % services.length
      : (currentIndex - 1 + services.length) % services.length;

    setCurrentIndex(newIndex);
    setTimeout(() => setIsRotating(false), 800);
  }, [currentIndex, isRotating, services.length]);

  const goToSlide = useCallback((index: number) => {
    if (isRotating || index === currentIndex) return;
    setIsRotating(true);
    autoRotateRef.current = false;

    const angleStep = (Math.PI * 2) / services.length;
    const diff = index - currentIndex;
    const shortestDiff = ((diff + services.length + services.length / 2) % services.length) - services.length / 2;

    targetRotationRef.current += shortestDiff * angleStep;
    setCurrentIndex(index);
    setTimeout(() => setIsRotating(false), 800);
  }, [currentIndex, isRotating, services.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') rotate(-1);
      if (e.key === 'ArrowRight') rotate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rotate]);

  const currentService = services[currentIndex];

  const tags = [
    t('carousel.tag.eco'),
    t('carousel.tag.zero'),
    t('carousel.tag.precision')
  ];

  return (
    <div className="w-full min-h-[700px] py-6">
      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">
          {t('carousel.header.industrial')}{' '}
          <span className="bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] bg-clip-text text-transparent">
            {t('carousel.header.laser')}
          </span>{' '}
          {t('carousel.header.solutions')}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          {t('carousel.subtitle')}
        </p>
      </div>

      {/* Main Container */}
      <div
        className="relative w-full max-w-[1400px] h-[600px] mx-auto rounded-3xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(20, 20, 40, 0.8) 0%, rgba(5, 5, 16, 0.95) 100%)',
          boxShadow: '0 0 80px rgba(0, 210, 255, 0.1), inset 0 0 80px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* 3D Canvas */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Glassmorphism Info Card */}
        <div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 backdrop-blur-xl rounded-3xl p-6 md:p-8 max-w-[500px] w-[90%] text-center transition-all duration-500 z-10"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${currentService.accent}20`
          }}
        >
          <div className="mb-4">
            <div
              className="w-16 h-16 rounded-2xl inline-flex items-center justify-center text-3xl mx-auto"
              style={{
                background: `linear-gradient(135deg, ${currentService.gradient[0]}, ${currentService.gradient[1]})`,
                boxShadow: `0 0 30px ${currentService.accent}40`
              }}
            >
              {currentService.emoji}
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            {t(currentService.titleKey)}
          </h2>
          <p className="text-sm md:text-base text-white/70 leading-relaxed mb-5 line-clamp-3">
            {t(currentService.descKey)}
          </p>

          <div className="flex gap-2 justify-center flex-wrap">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{
                  border: `1px solid ${currentService.accent}`,
                  color: currentService.accent,
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-5 z-20">
          <button
            onClick={() => rotate(-1)}
            disabled={isRotating}
            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex gap-2 items-center">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: index === currentIndex ? '40px' : '8px',
                  background: index === currentIndex
                    ? `linear-gradient(90deg, ${service.gradient[0]}, ${service.gradient[1]})`
                    : 'rgba(255,255,255,0.2)',
                  boxShadow: index === currentIndex ? `0 0 20px ${service.accent}` : 'none'
                }}
              />
            ))}
          </div>

          <button
            onClick={() => rotate(1)}
            disabled={isRotating}
            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full transition-all duration-700"
            style={{
              background: `linear-gradient(90deg, ${currentService.gradient[0]}, ${currentService.gradient[1]})`,
              width: `${((currentIndex + 1) / services.length) * 100}%`,
              boxShadow: `0 0 20px ${currentService.accent}`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarineServicesCarousel;
