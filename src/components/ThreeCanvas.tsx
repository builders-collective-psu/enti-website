import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1
  activeSection: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const blueAccentLight = new THREE.DirectionalLight(0x164cff, 4.5);
    blueAccentLight.position.set(-6, -3, 4);
    scene.add(blueAccentLight);

    const goldAccentLight = new THREE.DirectionalLight(0xd4af37, 3.5);
    goldAccentLight.position.set(3, -5, 5);
    scene.add(goldAccentLight);

    // Interactive pointer light
    const pointerLight = new THREE.PointLight(0xd4af37, 5, 12);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);

    // High quality metallic materials
    const darkTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x111c30,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15
    });

    const brushedSilverMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8e2ec,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 0.9
    });

    const psuBlueMat = new THREE.MeshPhysicalMaterial({
      color: 0x001e44,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 1.0
    });

    const goldAccentMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x3d2f0a,
      emissiveIntensity: 0.4
    });

    const glowingTraceMat = new THREE.MeshBasicMaterial({
      color: 0xd5f44a,
      wireframe: true
    });

    // Root Assembly
    const rootAssembly = new THREE.Group();
    scene.add(rootAssembly);

    // 1. Central Turbine / Impeller Core
    const turbineGroup = new THREE.Group();
    const turbineHubGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.4, 32);
    const turbineHub = new THREE.Mesh(turbineHubGeo, brushedSilverMat);
    turbineHub.rotation.x = Math.PI / 2;
    turbineGroup.add(turbineHub);

    // Turbine Blades
    const bladeCount = 12;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.12, 0.75, 0.04);
      const blade = new THREE.Mesh(bladeGeo, goldAccentMat);
      blade.position.set(Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0);
      blade.rotation.z = angle + 0.4;
      turbineGroup.add(blade);
    }
    rootAssembly.add(turbineGroup);

    // 2. Interlocking Machined Planetary Gears
    const planetaryGears: THREE.Mesh[] = [];
    const gearCount = 4;
    const gearOrbitRadius = 1.95;
    for (let i = 0; i < gearCount; i++) {
      const angle = (i / gearCount) * Math.PI * 2;
      const gearGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.2, 18);
      const gear = new THREE.Mesh(gearGeo, brushedSilverMat);
      gear.position.set(Math.cos(angle) * gearOrbitRadius, Math.sin(angle) * gearOrbitRadius, 0);
      gear.rotation.x = Math.PI / 2;
      rootAssembly.add(gear);
      planetaryGears.push(gear);
    }

    // 3. Exploded Chassis Plates (Top & Bottom Plates that separate with scroll)
    const plateGeo = new THREE.CylinderGeometry(2.7, 2.7, 0.12, 48, 1, false);
    const topPlate = new THREE.Mesh(plateGeo, darkTitaniumMat);
    topPlate.rotation.x = Math.PI / 2;
    topPlate.position.z = 0.5;
    rootAssembly.add(topPlate);

    const bottomPlate = new THREE.Mesh(plateGeo, psuBlueMat);
    bottomPlate.rotation.x = Math.PI / 2;
    bottomPlate.position.z = -0.5;
    rootAssembly.add(bottomPlate);

    // 4. Circuit Substrate / PCB Wafer Ring with Glowing Traces
    const waferGeo = new THREE.RingGeometry(1.2, 2.5, 36);
    const waferMesh = new THREE.Mesh(waferGeo, glowingTraceMat);
    rootAssembly.add(waferMesh);

    // 5. Outer Caliper / Enclosure Brackets
    const bracketGeo = new THREE.TorusGeometry(3.1, 0.08, 16, 64, Math.PI * 1.5);
    const bracketMesh = new THREE.Mesh(bracketGeo, goldAccentMat);
    bracketMesh.rotation.z = -Math.PI / 4;
    rootAssembly.add(bracketMesh);

    // Floating micro-particles (representing engineering dust/cleanroom precision)
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.035,
      transparent: true,
      opacity: 0.6
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerLight.position.x = targetMouseX * 4;
      pointerLight.position.y = targetMouseY * 3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const p = scrollRef.current; // 0 to 1

      // Exploded Assembly kinematics based on scroll
      // Top plate lifts forward, bottom plate drops backward
      const explodeDist = p * 2.2;
      topPlate.position.z = 0.5 + explodeDist;
      bottomPlate.position.z = -0.5 - explodeDist;

      // Wafer tilts and reveals interior
      waferMesh.position.z = -explodeDist * 0.3;
      waferMesh.rotation.z = time * 0.2 + p * Math.PI;

      // Turbine rotation
      turbineGroup.rotation.z = time * 0.8 + p * 4.0;
      turbineGroup.position.z = Math.sin(time * 1.5) * 0.05;

      // Planetary gears rotate on their axes and orbit slightly
      planetaryGears.forEach((gear, idx) => {
        gear.rotation.z = -time * 1.6 - p * 3.0;
        const baseAngle = (idx / gearCount) * Math.PI * 2 + p * 0.5;
        const currentRadius = gearOrbitRadius + explodeDist * 0.35;
        gear.position.x = Math.cos(baseAngle) * currentRadius;
        gear.position.y = Math.sin(baseAngle) * currentRadius;
      });

      bracketMesh.rotation.z = time * 0.15 + p * 1.2;

      // Root assembly rotation with mouse parallax and scroll position
      rootAssembly.rotation.x = 0.35 + mouseY * 0.35 + (p - 0.5) * 0.6;
      rootAssembly.rotation.y = time * 0.25 + mouseX * 0.45 + p * Math.PI * 1.2;

      // Camera responds subtly to progress
      camera.position.z = 9.0 - p * 2.0;
      camera.position.x = (mouseX * 0.5) + (p > 0.4 ? (p - 0.4) * 1.5 : 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
