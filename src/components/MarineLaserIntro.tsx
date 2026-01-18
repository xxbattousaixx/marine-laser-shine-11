import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const MarineLaserIntro = () => {
  const { t } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
    sceneRef.current = scene;

    // Get container dimensions
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Laser blue light
    const blueLight = new THREE.PointLight(0x00d4ff, 2, 100);
    blueLight.position.set(0, 0, 5);
    scene.add(blueLight);

    // Orange rust light
    const orangeLight = new THREE.PointLight(0xff6b35, 1.5, 100);
    orangeLight.position.set(-5, 3, 0);
    scene.add(orangeLight);

    // Create metal surface with rust effect
    const geometry = new THREE.PlaneGeometry(8, 8, 32, 32);
    
    // Custom shader material for rust-to-clean effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        laserColor: { value: new THREE.Color(0x00d4ff) },
        rustColor: { value: new THREE.Color(0xff6b35) },
        cleanColor: { value: new THREE.Color(0x8a9ba8) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vec3 pos = position;
          
          // Add subtle wave effect
          pos.z += sin(pos.x * 2.0 + time) * 0.1;
          pos.z += cos(pos.y * 2.0 + time * 0.7) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float progress;
        uniform vec3 laserColor;
        uniform vec3 rustColor;
        uniform vec3 cleanColor;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Noise function
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          // Create rust pattern
          float rustPattern = random(floor(vUv * 20.0)) * 0.5 + 0.5;
          
          // Laser sweep from left to right
          float laserPos = progress * 2.0 - 1.0;
          float laserWidth = 0.3;
          float distToLaser = abs(vUv.x - laserPos);
          float laserIntensity = smoothstep(laserWidth, 0.0, distToLaser);
          
          // Determine if area is cleaned
          float cleaned = step(vUv.x, laserPos + laserWidth);
          
          // Mix colors
          vec3 surfaceColor = mix(rustColor * rustPattern, cleanColor, cleaned);
          
          // Add laser glow
          surfaceColor += laserColor * laserIntensity * 0.5;
          
          // Pulsing laser beam effect
          float pulse = sin(time * 3.0) * 0.3 + 0.7;
          surfaceColor += laserColor * laserIntensity * pulse * 0.3;
          
          gl_FragColor = vec4(surfaceColor, 1.0);
        }
      `
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -0.3;
    scene.add(plane);

    // Particle system for laser sparks
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = Math.random() * 0.05;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let progress = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update progress
      if (progress < 1) {
        progress += 0.003;
        setLoadingProgress(Math.floor(progress * 100));
        material.uniforms.progress.value = progress;
      } else if (!showContent) {
        setTimeout(() => setShowContent(true), 500);
      }
      
      material.uniforms.time.value = elapsedTime;
      
      // Animate particles
      const posArray = particlesGeometry.attributes.position.array as Float32Array;
      const velArray = particlesGeometry.attributes.velocity.array as Float32Array;
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] += velArray[i];
        posArray[i + 1] += velArray[i + 1];
        posArray[i + 2] += velArray[i + 2];
        
        // Reset particles that go too far
        if (posArray[i + 1] > 5) {
          posArray[i] = (Math.random() - 0.5) * 8;
          posArray[i + 1] = -3;
          posArray[i + 2] = (Math.random() - 0.5) * 2;
        }
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Rotate scene slightly
      plane.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;
      
      // Camera subtle movement
      camera.position.x = Math.sin(elapsedTime * 0.3) * 0.2;
      camera.position.y = Math.cos(elapsedTime * 0.4) * 0.2;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black">
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Loading overlay */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
          showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            MARINE LASER CLEAN
          </h2>
          <div className="text-lg md:text-xl text-cyan-400 mb-8 font-light tracking-wider">
            {t('home.hero.subtitle')}
          </div>
          <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-cyan-400 mt-4 text-sm tracking-widest">
            {loadingProgress}% INITIALIZED
          </div>
        </div>
      </div>

      {/* Main content */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center z-10 max-w-4xl px-6">
          <div className="text-sm tracking-widest text-cyan-400 mb-4">
            CABIMAS, ZULIA — VENEZUELA
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {t('home.hero.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 font-light leading-relaxed">
            {t('home.hero.subtitle')}
          </p>

          <div className="mb-10 text-gray-400 text-base">
            <p className="mb-2">{t('home.features.eco.desc')}</p>
            <p className="text-cyan-400 font-medium">{t('home.features.precision.desc')}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/services">
              <Button size="lg" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold tracking-wider">
                {t('home.hero.cta2')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-white hover:bg-white hover:text-black text-white font-semibold tracking-wider">
                {t('home.hero.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center text-xs text-gray-500 tracking-widest transition-opacity duration-1000 ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="hidden sm:block">6000W LASER TECHNOLOGY</div>
        <div>NAVAL & INDUSTRIAL</div>
        <div className="hidden sm:block">ZERO ABRASION</div>
      </div>
    </div>
  );
};

export default MarineLaserIntro;
