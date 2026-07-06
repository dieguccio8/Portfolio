import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DottedSurface: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // SCENE & BACKGROUND
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
    // FOG
    // Add linear fog to fade the particles elegantly into the distance
    scene.fog = new THREE.Fog(0x050505, 15, 85);

    // PARAMETERS FOR GRID
    const countX = 85;
    const countZ = 85;
    const spacingX = 1.4;
    const spacingZ = 1.4;
    const numParticles = countX * countZ;

    // PARTICLES GEOMETRY
    const positions = new Float32Array(numParticles * 3);
    const initialCoords = []; // Keep track of base X and Z coordinate indices to calculate waves in the animation loop

    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        // Center the grid around (0, 0)
        const x = (ix - countX / 2) * spacingX;
        const z = (iz - countZ / 2) * spacingZ;
        
        positions[i] = x;     // X
        positions[i + 1] = 0; // Y (will be animated)
        positions[i + 2] = z; // Z

        initialCoords.push({ x, z });
        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // POINTS MATERIAL
    // Crisp, small white particles with a bit of opacity for elegant look
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // CAMERA
    // Position camera low, looking across the surface towards the horizon
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 150);
    camera.position.set(0, 4.5, 40);
    camera.lookAt(0, -2, -20);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ANIMATION & WAVE LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const timeMultiplier = elapsed * 0.9;
      const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < countX; ix++) {
        for (let iz = 0; iz < countZ; iz++) {
          const { x, z } = initialCoords[idx];
          
          // Wave mathematics: y = sin(x) + cos(z) tied to time to simulate elegant floating sea
          // Applying spatial frequencies for natural wave patterns
          const y = (
            Math.sin(x * 0.15 + timeMultiplier) * 2.2 +
            Math.cos(z * 0.15 + timeMultiplier) * 2.2 +
            Math.sin((x + z) * 0.05 + timeMultiplier * 0.5) * 1.5
          );

          // Update the Y-coordinate (index: i * 3 + 1)
          posArray[idx * 3 + 1] = y;
          idx++;
        }
      }

      // Tell Three.js positions changed
      positionAttr.needsUpdate = true;

      // Slowly rotate the entire grid for a subtle extra dynamic feel
      particles.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    // HANDLE RESIZING WITH RESIZEOBSERVER
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        
        // Update camera aspect
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Update renderer size
        renderer.setSize(width, height, false);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      // Debounce resize updates or run synchronously on content size changes
      handleResize(entries);
    });

    resizeObserver.observe(container);

    // Trigger initial animate
    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      id="dotted-surface-container"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 250px, black 450px, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 250px, black 450px, black 100%)'
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

