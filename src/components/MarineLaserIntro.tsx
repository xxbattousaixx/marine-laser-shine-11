import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const MarineLaserIntro = () => {
  const { t } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const threeLoadedRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current || threeLoadedRef.current) return;
    threeLoadedRef.current = true;

    let disposed = false;

    import('three').then((THREE) => {
      if (disposed || !mountRef.current) return;

      const container = mountRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x05070d, 8, 28);

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.set(0, 0, 9);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Lights
      scene.add(new THREE.AmbientLight(0x223344, 0.6));
      const cyanLight = new THREE.PointLight(0x00d4ff, 3, 30);
      cyanLight.position.set(-4, 2, 4);
      scene.add(cyanLight);
      const amberLight = new THREE.PointLight(0xff8a3d, 2, 30);
      amberLight.position.set(5, -1, 3);
      scene.add(amberLight);

      // Central torus — represents a pipe/ring being laser-cleaned
      const torusGeo = new THREE.TorusGeometry(2.1, 0.55, 32, 96);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0x2a3340,
        metalness: 0.95,
        roughness: 0.32,
        emissive: 0x0a1a24,
        emissiveIntensity: 0.4,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.position.set(3.2, -0.4, -1);
      torus.rotation.x = 0.6;
      torus.rotation.y = 0.3;
      scene.add(torus);

      // Inner glowing ring (laser pass effect)
      const ringGeo = new THREE.TorusGeometry(2.1, 0.06, 16, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(torus.position);
      ring.rotation.copy(torus.rotation);
      scene.add(ring);

      // Floating cube particles
      const cubeCount = 60;
      const cubes: any[] = [];
      const cubeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
      for (let i = 0; i < cubeCount; i++) {
        const isAccent = Math.random() > 0.55;
        const mat = new THREE.MeshBasicMaterial({
          color: isAccent ? 0xff8a3d : 0x4a5a6a,
          transparent: true,
          opacity: isAccent ? 0.85 : 0.35,
        });
        const cube = new THREE.Mesh(cubeGeo, mat);
        cube.position.set(
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 10 - 2,
        );
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        (cube as any).speed = 0.002 + Math.random() * 0.006;
        (cube as any).rotSpeed = (Math.random() - 0.5) * 0.01;
        (cube as any).drift = (Math.random() - 0.5) * 0.003;
        scene.add(cube);
        cubes.push(cube);
      }

      // Spark particles (laser dust)
      const sparkCount = 180;
      const sparkGeo = new THREE.BufferGeometry();
      const sparkPos = new Float32Array(sparkCount * 3);
      for (let i = 0; i < sparkCount * 3; i += 3) {
        sparkPos[i] = (Math.random() - 0.5) * 18;
        sparkPos[i + 1] = (Math.random() - 0.5) * 12;
        sparkPos[i + 2] = (Math.random() - 0.5) * 8;
      }
      sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
      const sparkMat = new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const sparks = new THREE.Points(sparkGeo, sparkMat);
      scene.add(sparks);

      const clock = new THREE.Clock();
      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      const animate = () => {
        if (disposed) return;
        animationRef.current = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        torus.rotation.y = 0.3 + t * 0.15;
        torus.rotation.x = 0.6 + Math.sin(t * 0.4) * 0.05;
        ring.rotation.copy(torus.rotation);
        ring.rotation.z = t * 1.2;
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(t * 3) * 0.3;

        cubes.forEach((c) => {
          c.position.y += (c as any).speed;
          c.position.x += (c as any).drift;
          c.rotation.x += (c as any).rotSpeed;
          c.rotation.y += (c as any).rotSpeed;
          if (c.position.y > 6) c.position.y = -6;
          if (c.position.x > 9) c.position.x = -9;
          if (c.position.x < -9) c.position.x = 9;
        });

        const sp = sparkGeo.attributes.position.array as Float32Array;
        for (let i = 1; i < sparkCount * 3; i += 3) {
          sp[i] += 0.008;
          if (sp[i] > 6) sp[i] = -6;
        }
        sparkGeo.attributes.position.needsUpdate = true;

        camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.04;
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

      (container as any).__threeCleanup = () => {
        disposed = true;
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        torusGeo.dispose();
        torusMat.dispose();
        ringGeo.dispose();
        ringMat.dispose();
        cubeGeo.dispose();
        cubes.forEach((c) => (c.material as THREE.Material).dispose());
        sparkGeo.dispose();
        sparkMat.dispose();
        renderer.dispose();
      };
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
    <div className="relative w-full min-h-[88vh] overflow-hidden bg-[#05070d]">
      {/* Three.js scene */}
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(5,7,13,0.55) 70%, rgba(5,7,13,0.95) 100%)',
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[88vh] px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-md shadow-[0_0_30px_hsl(var(--primary)/0.25)] animate-fade-in">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs sm:text-sm font-medium tracking-wider text-primary uppercase">
            {t('home.hero.badge')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
          <span className="block">{t('home.hero.title')}</span>
          <span
            className="block mt-2 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #00d4ff 0%, #38bdf8 40%, #ff8a3d 100%)',
            }}
          >
            {t('home.hero.titleAccent')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-300/90 font-light leading-relaxed mb-10">
          {t('home.hero.subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/contact">
            <Button
              size="lg"
              className="group px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wider rounded-full shadow-[0_0_40px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.7)] transition-all"
            >
              {t('home.hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/60 text-white font-semibold tracking-wider rounded-full transition-all"
            >
              {t('home.hero.cta2')}
            </Button>
          </Link>
        </div>

        {/* Bottom meta strip */}
        <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-center text-[10px] sm:text-xs text-gray-500 tracking-[0.3em] uppercase pointer-events-none">
          <span className="hidden sm:block">6000W Laser</span>
          <span>Cabimas · Zulia · VE</span>
          <span className="hidden sm:block">Zero Abrasion</span>
        </div>
      </div>
    </div>
  );
};

export default MarineLaserIntro;
