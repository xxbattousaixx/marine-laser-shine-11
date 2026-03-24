import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const MarineLaserIntro = () => {
  const { t } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const animationRef = useRef<number | null>(null);
  const threeLoadedRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current || threeLoadedRef.current) return;
    threeLoadedRef.current = true;

    let disposed = false;

    // Dynamically import Three.js to avoid blocking initial render
    import('three').then((THREE) => {
      if (disposed || !mountRef.current) return;

      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);
      scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
      scene.add(ambientLight);
      const blueLight = new THREE.PointLight(0x00d4ff, 2, 100);
      blueLight.position.set(0, 0, 5);
      scene.add(blueLight);
      const orangeLight = new THREE.PointLight(0xff6b35, 1.5, 100);
      orangeLight.position.set(-5, 3, 0);
      scene.add(orangeLight);

      const geometry = new THREE.PlaneGeometry(8, 8, 16, 16);
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
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + time) * 0.1 + cos(pos.y * 2.0 + time * 0.7) * 0.1;
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
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }
          void main() {
            float rustPattern = random(floor(vUv * 20.0)) * 0.5 + 0.5;
            float laserPos = progress * 2.0 - 1.0;
            float laserWidth = 0.3;
            float distToLaser = abs(vUv.x - laserPos);
            float laserIntensity = smoothstep(laserWidth, 0.0, distToLaser);
            float cleaned = step(vUv.x, laserPos + laserWidth);
            vec3 surfaceColor = mix(rustColor * rustPattern, cleanColor, cleaned);
            surfaceColor += laserColor * laserIntensity * 0.5;
            float pulse = sin(time * 3.0) * 0.3 + 0.7;
            surfaceColor += laserColor * laserIntensity * pulse * 0.3;
            gl_FragColor = vec4(surfaceColor, 1.0);
          }
        `
      });

      const plane = new THREE.Mesh(geometry, material);
      plane.rotation.x = -0.3;
      scene.add(plane);

      // Reduced particle count for performance
      const particlesCount = 200;
      const particlesGeometry = new THREE.BufferGeometry();
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
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      let progress = 0;
      const clock = new THREE.Clock();

      const animate = () => {
        if (disposed) return;
        animationRef.current = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        if (progress < 1) {
          progress += 0.005;
          setLoadingProgress(Math.floor(progress * 100));
          material.uniforms.progress.value = progress;
        } else {
          setShowContent(true);
        }

        material.uniforms.time.value = elapsedTime;

        const posArray = particlesGeometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] += velocities[i];
          posArray[i + 1] += velocities[i + 1];
          posArray[i + 2] += velocities[i + 2];
          if (posArray[i + 1] > 5) {
            posArray[i] = (Math.random() - 0.5) * 8;
            posArray[i + 1] = -3;
            posArray[i + 2] = (Math.random() - 0.5) * 2;
          }
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        plane.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;
        camera.position.x = Math.sin(elapsedTime * 0.3) * 0.2;
        camera.position.y = Math.cos(elapsedTime * 0.4) * 0.2;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Store cleanup in the disposed flag
      const originalDispose = () => {
        disposed = true;
        window.removeEventListener('resize', handleResize);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      };

      // Store for cleanup
      (container as any).__threeCleanup = originalDispose;
    });

    return () => {
      disposed = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mountRef.current && (mountRef.current as any).__threeCleanup) {
        (mountRef.current as any).__threeCleanup();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black">
      <div ref={mountRef} className="absolute inset-0" />
      
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
          showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            MARINE LASER CLEAN
          </h1>
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
