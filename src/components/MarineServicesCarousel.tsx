import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Ship, Plane, Factory, Zap, Paintbrush } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ServiceData {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  color: string;
  gradient: [string, string];
}

const MarineServicesCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cardsRef = useRef<{ group: THREE.Group; index: number }[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const animationIdRef = useRef<number>();
  const { t } = useLanguage();

  const services: ServiceData[] = [
    {
      titleKey: 'services.ship.title',
      descKey: 'services.ship.desc',
      icon: <Ship className="h-8 w-8" />,
      color: '#0066cc',
      gradient: ['#0066cc', '#0052a3']
    },
    {
      titleKey: 'services.parts.title',
      descKey: 'services.parts.desc',
      icon: <Plane className="h-8 w-8" />,
      color: '#0052a3',
      gradient: ['#0052a3', '#003d99']
    },
    {
      titleKey: 'services.machinery.title',
      descKey: 'services.machinery.desc',
      icon: <Factory className="h-8 w-8" />,
      color: '#003d99',
      gradient: ['#003d99', '#002d73']
    },
    {
      titleKey: 'services.rust.title',
      descKey: 'services.rust.desc',
      icon: <Zap className="h-8 w-8" />,
      color: '#002d73',
      gradient: ['#002d73', '#00264d']
    },
    {
      titleKey: 'services.coating.title',
      descKey: 'services.coating.desc',
      icon: <Paintbrush className="h-8 w-8" />,
      color: '#00264d',
      gradient: ['#00264d', '#0066cc']
    }
  ];

  const rotate = useCallback((direction: number) => {
    if (isRotating) return;
    
    setIsRotating(true);
    const angleStep = (Math.PI * 2) / services.length;
    targetRotationRef.current += direction * angleStep;
    
    const newIndex = direction > 0
      ? (currentIndex + 1) % services.length
      : (currentIndex - 1 + services.length) % services.length;
    
    setCurrentIndex(newIndex);
    
    setTimeout(() => setIsRotating(false), 700);
  }, [isRotating, currentIndex, services.length]);

  const goToSlide = useCallback((index: number) => {
    if (isRotating || index === currentIndex) return;
    
    const diff = index - currentIndex;
    const angleStep = (Math.PI * 2) / services.length;
    
    setIsRotating(true);
    targetRotationRef.current -= diff * angleStep;
    setCurrentIndex(index);
    
    setTimeout(() => setIsRotating(false), 700);
  }, [isRotating, currentIndex, services.length]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a1a, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0x4a90e2, 0.5);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0x667eea, 0.4);
    backLight.position.set(0, -5, -5);
    scene.add(backLight);

    // Particle background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x4a90e2,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create cards
    const radius = 8;
    const angleStep = (Math.PI * 2) / services.length;

    services.forEach((service, index) => {
      const group = new THREE.Group();

      // Card base with rounded corners
      const cardShape = new THREE.Shape();
      const width = 4;
      const height = 5;
      const radiusCorner = 0.2;

      cardShape.moveTo(-width / 2 + radiusCorner, -height / 2);
      cardShape.lineTo(width / 2 - radiusCorner, -height / 2);
      cardShape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radiusCorner);
      cardShape.lineTo(width / 2, height / 2 - radiusCorner);
      cardShape.quadraticCurveTo(width / 2, height / 2, width / 2 - radiusCorner, height / 2);
      cardShape.lineTo(-width / 2 + radiusCorner, height / 2);
      cardShape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radiusCorner);
      cardShape.lineTo(-width / 2, -height / 2 + radiusCorner);
      cardShape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radiusCorner, -height / 2);

      const extrudeSettings = {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 5
      };

      const cardGeometry = new THREE.ExtrudeGeometry(cardShape, extrudeSettings);
      const cardMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide
      });

      const card = new THREE.Mesh(cardGeometry, cardMaterial);
      card.castShadow = true;
      card.receiveShadow = true;
      group.add(card);

      // Border glow
      const borderGeometry = new THREE.EdgesGeometry(cardGeometry);
      const borderMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(service.color),
        transparent: true,
        opacity: 0.6
      });
      const border = new THREE.LineSegments(borderGeometry, borderMaterial);
      group.add(border);

      // Accent strip
      const stripGeometry = new THREE.BoxGeometry(4, 0.3, 0.11);
      const stripMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(service.color),
        roughness: 0.2,
        metalness: 0.8,
        emissive: new THREE.Color(service.color),
        emissiveIntensity: 0.3
      });

      const strip = new THREE.Mesh(stripGeometry, stripMaterial);
      strip.position.set(0, -2.2, 0.06);
      group.add(strip);

      // Position card in circle
      const angle = index * angleStep;
      group.position.x = Math.sin(angle) * radius;
      group.position.z = Math.cos(angle) * radius;
      group.rotation.y = -angle;

      scene.add(group);
      cardsRef.current.push({ group, index });
    });

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Smooth rotation
      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.1;

      cardsRef.current.forEach(({ group }, index) => {
        const baseAngle = index * angleStep;
        const totalAngle = baseAngle + currentRotationRef.current;

        group.position.x = Math.sin(totalAngle) * radius;
        group.position.z = Math.cos(totalAngle) * radius;
        group.rotation.y = -totalAngle;

        // Scale effect for focused card
        const normalizedAngle = ((totalAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const distanceFromFront = Math.abs(normalizedAngle);
        const scale = 1 + (1 - Math.min(distanceFromFront / Math.PI, 1)) * 0.15;
        group.scale.setScalar(scale);

        // Opacity effect
        group.children.forEach(child => {
          if ((child as THREE.Mesh).material) {
            const material = (child as THREE.Mesh).material as THREE.Material;
            material.opacity = 0.5 + (1 - Math.min(distanceFromFront / Math.PI, 1)) * 0.5;
            material.transparent = true;
          }
        });
      });

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
      }

      // Camera subtle movement
      camera.position.y = Math.sin(Date.now() * 0.0005) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cardsRef.current = [];
    };
  }, []);

  const currentService = services[currentIndex];

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-gradient-to-b from-background to-muted/50">
      {/* 3D Canvas */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at center, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)' }}
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Header */}
        <div className="absolute top-6 left-0 right-0 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t('carousel.title')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto px-4">
            {t('carousel.subtitle')}
          </p>
        </div>
        
        {/* Current Service Info */}
        <div className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-auto">
          <div 
            className={cn(
              "bg-card/90 backdrop-blur-md rounded-xl p-6 shadow-xl border border-border",
              "max-w-md mx-4 text-center transition-all duration-500"
            )}
            style={{
              boxShadow: `0 10px 40px ${currentService.color}30`
            }}
          >
            <div 
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 text-primary-foreground"
              style={{ background: `linear-gradient(135deg, ${currentService.gradient[0]}, ${currentService.gradient[1]})` }}
            >
              {currentService.icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t(currentService.titleKey)}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {t(currentService.descKey)}
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 pointer-events-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => rotate(-1)}
            disabled={isRotating}
          >
            <span className="text-2xl">‹</span>
          </Button>

          {/* Indicators */}
          <div className="flex gap-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isRotating}
                className={cn(
                  "h-3 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "w-8 bg-primary shadow-lg" 
                    : "w-3 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                )}
                style={index === currentIndex ? {
                  background: `linear-gradient(135deg, ${services[currentIndex].gradient[0]}, ${services[currentIndex].gradient[1]})`,
                  boxShadow: `0 5px 15px ${services[currentIndex].color}40`
                } : undefined}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-card/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => rotate(1)}
            disabled={isRotating}
          >
            <span className="text-2xl">›</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarineServicesCarousel;
