import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1
  activeSection: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollProgress, activeSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const wireframeRef = useRef(wireframe);
  wireframeRef.current = wireframe;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(0x164cff, 5.0);
    blueRimLight.position.set(-6, -2, 3);
    scene.add(blueRimLight);

    const limeAccentLight = new THREE.DirectionalLight(0xd5f44a, 4.0);
    limeAccentLight.position.set(2, -5, 4);
    scene.add(limeAccentLight);

    // Interactive pointer light (follows cursor)
    const pointerLight = new THREE.PointLight(0xd5f44a, 6, 12);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);

    // Material generator
    const createMaterial = (color: number, metalness = 0.8, roughness = 0.15, iridescence = 0.4) => {
      return new THREE.MeshPhysicalMaterial({
        color,
        metalness,
        roughness,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        iridescence,
        iridescenceIOR: 1.35,
        wireframe: wireframeRef.current
      });
    };

    const blueMat = createMaterial(0x164cff, 0.5, 0.18, 0.3);
    const silverMat = createMaterial(0xe2eaf3, 0.95, 0.12, 0.6);
    const limeMat = createMaterial(0xd5f44a, 0.3, 0.22, 0.4);
    const darkChromeMat = createMaterial(0x10243b, 0.9, 0.15, 0.5);

    const materials = [blueMat, silverMat, limeMat, darkChromeMat];

    // Main Kinetic Sculpture Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Core: Multi-faceted Icosahedron with inner glow core
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const coreMesh = new THREE.Mesh(coreGeo, blueMat);
    coreGroup.add(coreMesh);

    const innerSphereGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const innerSphere = new THREE.Mesh(innerSphereGeo, limeMat);
    coreGroup.add(innerSphere);
    rootGroup.add(coreGroup);

    // 2. Interlocking Gyroscopic Precision Rings
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.18, 48, 120);
    const ring1 = new THREE.Mesh(ring1Geo, silverMat);
    ring1.rotation.set(0.6, 0.3, 0);
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.4, 0.14, 48, 120);
    const ring2 = new THREE.Mesh(ring2Geo, darkChromeMat);
    ring2.rotation.set(1.2, -0.7, 0.4);
    rootGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(1.95, 0.08, 48, 120);
    const ring3 = new THREE.Mesh(ring3Geo, limeMat);
    ring3.rotation.set(-0.8, 1.4, -0.3);
    rootGroup.add(ring3);

    // 3. Orbital Satellite Nodes
    const satelliteCount = 8;
    const satellites: THREE.Mesh[] = [];
    const satGroup = new THREE.Group();
    for (let i = 0; i < satelliteCount; i++) {
      const size = i % 2 === 0 ? 0.12 : 0.08;
      const satGeo = i % 3 === 0 ? new THREE.BoxGeometry(size * 1.5, size * 1.5, size * 1.5) : new THREE.SphereGeometry(size, 16, 16);
      const sat = new THREE.Mesh(satGeo, i % 2 === 0 ? limeMat : silverMat);
      satGroup.add(sat);
      satellites.push(sat);
    }
    rootGroup.add(satGroup);

    // 4. Subtle Ambient Particle Dust (Engineering grid points)
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8FA1B7,
      size: 0.035,
      transparent: true,
      opacity: 0.45
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Smooth Lerp State
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let smoothProgress = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointerMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isPausedRef.current) return;

      time += 0.012;

      // Update wireframe state if changed
      materials.forEach(m => {
        if (m.wireframe !== wireframeRef.current) {
          m.wireframe = wireframeRef.current;
        }
      });

      // Pointer smoothing
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Smooth scroll progress interpolation
      const targetProg = (window as any).__scrollProgress || 0;
      smoothProgress += (targetProg - smoothProgress) * 0.06;

      // Pointer light tracking
      pointerLight.position.set(currentX * 4, -currentY * 4, 3.5);

      // Scroll-Driven Choreography Stages:
      // Stage 0 (0.00 - 0.20): Hero - Centered/Slight Right, gentle spin
      // Stage 1 (0.20 - 0.40): Product Innovation Focus - Exploded Assembly, shifted right
      // Stage 2 (0.40 - 0.65): The Forge / Curriculum - High-speed gyro precession, shift left
      // Stage 3 (0.65 - 0.85): Builders Collective & Hackathons - Dynamic kinetic pulse
      // Stage 4 (0.85 - 1.00): Global Expedition & Lab Contact - Distant majestic orbit

      const p = smoothProgress;

      // Interpolate root position based on scroll progress
      // In Hero: slightly right (x ~ 1.2 on desktop, 0 on mobile)
      // In Innovation/Courses: shifted to right side (x ~ 2.2) to give room for text
      // In Builders: shifted to left side (x ~ -2.0)
      // In Contact: center background
      const isMobile = window.innerWidth < 768;
      const baseXOffset = isMobile ? 0 : 1.4;

      if (p < 0.25) {
        // Hero
        const t = p / 0.25;
        rootGroup.position.x = THREE.MathUtils.lerp(baseXOffset, baseXOffset + 0.6, t) + currentX * 0.3;
        rootGroup.position.y = THREE.MathUtils.lerp(0, -0.2, t) - currentY * 0.3;
        rootGroup.position.z = THREE.MathUtils.lerp(0, -0.5, t);
        camera.position.z = THREE.MathUtils.lerp(8.5, 8.8, t);
      } else if (p < 0.55) {
        // Engineering Focus & Curriculum
        const t = (p - 0.25) / 0.3;
        rootGroup.position.x = THREE.MathUtils.lerp(baseXOffset + 0.6, isMobile ? 0 : -2.4, t) + currentX * 0.3;
        rootGroup.position.y = THREE.MathUtils.lerp(-0.2, 0.3, t) - currentY * 0.3;
        rootGroup.position.z = THREE.MathUtils.lerp(-0.5, 0.4, t);
        camera.position.z = THREE.MathUtils.lerp(8.8, 8.0, t);
      } else if (p < 0.8) {
        // Faculty & Builders Collective
        const t = (p - 0.55) / 0.25;
        rootGroup.position.x = THREE.MathUtils.lerp(isMobile ? 0 : -2.4, isMobile ? 0 : 2.5, t) + currentX * 0.3;
        rootGroup.position.y = THREE.MathUtils.lerp(0.3, -0.3, t) - currentY * 0.3;
        rootGroup.position.z = THREE.MathUtils.lerp(0.4, -0.8, t);
        camera.position.z = THREE.MathUtils.lerp(8.0, 9.2, t);
      } else {
        // Global Immersion & Contact
        const t = (p - 0.8) / 0.2;
        rootGroup.position.x = THREE.MathUtils.lerp(isMobile ? 0 : 2.5, 0, t) + currentX * 0.3;
        rootGroup.position.y = THREE.MathUtils.lerp(-0.3, 0.2, t) - currentY * 0.3;
        rootGroup.position.z = THREE.MathUtils.lerp(-0.8, -1.2, t);
        camera.position.z = THREE.MathUtils.lerp(9.2, 8.2, t);
      }

      // Continuous Gyroscopic Rotations (Accelerated by scroll speed)
      rootGroup.rotation.y = time * 0.18 + p * 3.5 + currentX * 0.2;
      rootGroup.rotation.x = Math.sin(time * 0.35) * 0.12 + p * 1.8 + currentY * 0.15;

      // Independent Ring Rotations with Precession
      ring1.rotation.x = time * 0.25 + p * 4.0;
      ring1.rotation.y = time * 0.15 + p * 2.2;

      ring2.rotation.y = -time * 0.35 - p * 3.2;
      ring2.rotation.z = time * 0.2 + p * 1.5;

      ring3.rotation.z = time * 0.4 + p * 5.0;
      ring3.rotation.x = -time * 0.18 - p * 2.8;

      // Core pulsation & spin
      coreGroup.rotation.y = -time * 0.45;
      coreGroup.rotation.x = time * 0.3;
      const coreScale = 1.0 + Math.sin(time * 2.0) * 0.05 + p * 0.2;
      coreGroup.scale.set(coreScale, coreScale, coreScale);

      // Satellites orbiting
      satellites.forEach((sat, i) => {
        const speed = (i % 2 === 0 ? 1 : -1) * (0.4 + (i * 0.08));
        const radius = 2.4 + Math.sin(time + i) * 0.3 + p * 0.5;
        const angle = time * speed + (i * (Math.PI * 2 / satelliteCount));
        const elevation = Math.sin(angle * 1.5 + i) * 1.1;

        sat.position.set(
          Math.cos(angle) * radius,
          elevation,
          Math.sin(angle) * radius
        );
        sat.rotation.x = time * 2.0;
        sat.rotation.y = time * 1.5;
      });

      // Subtle particle float
      particleSystem.rotation.y = time * 0.02 + p * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D WebGL Canvas Host */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Cyber/Alche HUD Overlay Top-Right */}
      <div className="absolute top-20 right-6 md:right-10 pointer-events-auto flex items-center gap-3">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-3 py-1 text-[11px] font-mono tracking-wider uppercase rounded border transition-colors ${
            wireframe 
              ? 'bg-[#D5F44A] text-[#041026] border-[#D5F44A] font-bold' 
              : 'bg-[#081730]/70 text-[#8FA1B7] border-white/10 hover:border-[#D5F44A]/50 hover:text-white'
          }`}
          title="Toggle 3D Wireframe Inspection"
        >
          {wireframe ? 'MOSH: ON' : 'WIREFRAME'}
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-3 py-1 text-[11px] font-mono tracking-wider uppercase rounded bg-[#081730]/70 text-[#8FA1B7] border border-white/10 hover:border-[#D5F44A]/50 hover:text-white transition-colors"
          title={isPaused ? 'Resume 3D Motion' : 'Pause 3D Motion'}
        >
          {isPaused ? '▶ PLAY' : 'Ⅱ PAUSE'}
        </button>
      </div>

      {/* Interactive Coordinate & Telemetry Watermark */}
      <div className="absolute bottom-6 left-6 md:left-10 font-mono text-[10px] text-white/30 tracking-widest uppercase hidden sm:block">
        <span>EDI BLDG // 40.798°N 77.860°W // ESHIP_ENGINE_V3</span>
      </div>

      {/* Dynamic Scroll Progress Meter (Bottom Right) */}
      <div className="absolute bottom-6 right-6 md:right-10 font-mono text-[11px] text-[#D5F44A] tracking-widest hidden sm:flex items-center gap-3">
        <span className="text-white/40">PHASE //</span>
        <span>{activeSection.toUpperCase()}</span>
        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#D5F44A] transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
