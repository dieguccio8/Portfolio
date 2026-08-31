import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const REGIONS = {
  Lombardy: { color: '#EE4256', pos: [-1.5, 1.5, -3.5] as [number, number, number], image: './Images/Project 02/Street Art Photos/Campania_Lombardia_Toscana/lombardy.jpg' },
  Tuscany: { color: '#A1D884', pos: [-0.5, 1.5, -1.0] as [number, number, number], image: './Images/Project 02/Street Art Photos/Campania_Lombardia_Toscana/tuscany.jpg' },
  Campania: { color: '#1FA9E5', pos: [2.5, 1.5, 3.5] as [number, number, number], image: './Images/Project 02/Street Art Photos/Campania_Lombardia_Toscana/campania.jpg' },
};

type RegionKey = keyof typeof REGIONS;

// The dynamic logo component
const DynamicLogo = ({ region, onClick }: { region: RegionKey, onClick: () => void }) => {
  const color = REGIONS[region].color;
  return (
    <div className="flex items-center gap-8 z-10 relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
      <svg width="120" height="120" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M486.461 266.834L486.341 474.767L256.534 266.701L486.461 266.834Z" fill={color} className="transition-colors duration-500"/>
        <path d="M72.7467 32.0347L141.491 383.165L127.607 383.821L58.7347 32.0347H0V474.701H229.865V32.0347H72.7467Z" fill="#F7F9FB"/>
        <path d="M256.534 32.0347V166.148L342.068 149.368L344.8 159.333L256.534 176.648V240.035H486.4V122.701L391.027 105.503L392.998 95.4493L486.398 112.292L486.4 122.701V101.849V32.0347H256.534Z" fill="#F7F9FB"/>
      </svg>
      <button 
        onClick={onClick}
        className="flex flex-col text-left hover:scale-105 transition-transform duration-300 group cursor-pointer"
      >
        <span className="font-urbanist font-medium text-[36px] leading-none text-white tracking-tight group-hover:text-white/80 transition-colors">Urban</span>
        <span className="font-urbanist font-medium text-[36px] leading-none text-white tracking-tight group-hover:text-white/80 transition-colors">StreetArt</span>
        <span className="font-urbanist font-medium text-[32px] leading-none mt-2 transition-colors duration-500" style={{ color }}>{region}</span>
      </button>
    </div>
  );
};

// Procedural 3D Terrain representing Italy
const Terrain = () => {
  const alphaMap = useTexture(import.meta.env.BASE_URL + 'Images/Project 02/italy_alpha.svg');
  const noise2D = useMemo(() => createNoise2D(), []);

  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(12, 12, 100, 100);
    geom.rotateX(-Math.PI / 2);
    
    const posAttribute = geom.attributes.position;
    const colorAttribute = new Float32Array(posAttribute.count * 3);
    
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const z = posAttribute.getZ(i);
      
      // Procedural noise for mountains
      const y = noise2D(x * 0.4, z * 0.4) * 0.8 + noise2D(x * 1.5, z * 1.5) * 0.2;
      posAttribute.setY(i, y > 0 ? y : 0); 
      
      // Calculate Vertex Colors based on proximity to regions
      let r = 1.0, g = 1.0, b = 1.0; // Default white lines
      
      Object.entries(REGIONS).forEach(([key, region]) => {
        const dx = x - region.pos[0];
        const dz = z - region.pos[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        const radius = 4.5; // Increased radius significantly for a much wider color glow
        if (dist < radius) {
          // Changed the exponent from 2 to 1.5 to make the fade smoother and the color reach further
          const falloff = Math.pow(1 - (dist / radius), 1.5); 
          const c = new THREE.Color(region.color);
          
          r = r * (1 - falloff) + c.r * falloff;
          g = g * (1 - falloff) + c.g * falloff;
          b = b * (1 - falloff) + c.b * falloff;
        }
      });
      
      colorAttribute[i * 3] = r;
      colorAttribute[i * 3 + 1] = g;
      colorAttribute[i * 3 + 2] = b;
    }
    
    geom.setAttribute('color', new THREE.BufferAttribute(colorAttribute, 3));
    geom.computeVertexNormals();
    return geom;
  }, [noise2D]);

  return (
    <mesh geometry={geometry} position={[0, -1, 0]}>
      <meshBasicMaterial 
        color="#ffffff" 
        wireframe={true} 
        vertexColors={true}
        alphaMap={alphaMap}
        transparent={true}
        opacity={0.8}
        alphaTest={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Interactive Hotspots
const Marker = ({ position, color, name, active, onClick }: any) => {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating animation for the label
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Invisible 3D hitbox to ensure easy clicking even if they miss the HTML button slightly */}
      <mesh onClick={onClick} visible={false}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial />
      </mesh>

      {/* HTML Button */}
      <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none' }}>
        <div 
          onClick={onClick}
          className={`px-6 py-3 rounded-full border-2 transition-all duration-300 backdrop-blur-md cursor-pointer whitespace-nowrap font-urbanist font-bold tracking-widest text-sm pointer-events-auto
            ${active 
              ? 'scale-110 shadow-2xl' 
              : 'bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/60 hover:scale-105 scale-100'}`}
          style={active ? { 
            color: color, 
            borderColor: color, 
            backgroundColor: '#050505',
            boxShadow: `0 0 25px ${color}60, inset 0 0 10px ${color}20` 
          } : {}}
        >
          {name.toUpperCase()}
        </div>
      </Html>
    </group>
  );
};

// Map Scene wrapper to handle animated rotation and zoom
const MapScene = ({ region, onRegionSelect }: { region: RegionKey, onRegionSelect: (r: RegionKey) => void }) => {
  const controlsRef = useRef<any>(null);

  // Create points for the glowing path connecting the regions
  const pathPoints = useMemo(() => {
    return [
      new THREE.Vector3(...REGIONS.Lombardy.pos),
      new THREE.Vector3(...REGIONS.Tuscany.pos),
      new THREE.Vector3(...REGIONS.Campania.pos)
    ];
  }, []);

  useFrame((state, delta) => {
    // Target position for the region
    const targetRegionPos = new THREE.Vector3(...REGIONS[region].pos);
    
    // To keep the map large but prevent cropping the edges when selecting extremities (North/South),
    // we don't look exactly at the region. We look 40% towards the region from the center of the map.
    const mapCenter = new THREE.Vector3(0, 1.5, 0);
    const lookAtPoint = new THREE.Vector3().lerpVectors(mapCenter, targetRegionPos, 0.4);

    // FORCE VERTICAL CENTERING AND RIGHT ALIGNMENT: 
    // By locking X and Y, we prevent the map from panning wildly when changing regions.
    lookAtPoint.x = -3.5;
    lookAtPoint.y = 0.5; 
    const actualLookAt = lookAtPoint;

    // Bring the camera closer to make the map large!
    const baseCameraOffset = new THREE.Vector3(0, 8.5, 12.5);
    
    // Apply a gentle back-and-forth swaying motion (pendulum effect)
    const swaySpeed = state.clock.elapsedTime * 0.3; 
    const swayAmplitude = 0.2; // Reduced amplitude slightly so the sway doesn't throw the map out of bounds
    const rotatedOffset = baseCameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.sin(swaySpeed) * swayAmplitude);

    const targetCameraPos = actualLookAt.clone().add(rotatedOffset);

    // Smoothly interpolate camera position
    state.camera.position.lerp(targetCameraPos, delta * 2.5);

    // Smoothly interpolate where the camera is looking
    if (controlsRef.current) {
      controlsRef.current.target.lerp(actualLookAt, delta * 2.5);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enableZoom={false} 
        enablePan={false} // Disable manual pan to keep the focus on the active region
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />

      <group>
        {/* The Italy Topographic Map */}
        <Terrain />

        {/* Glowing connecting line */}
        <group position={[0, -1, 0]}>
          <Line 
            points={pathPoints}
            color="#FCD306"
            lineWidth={2}
            dashed={false}
            opacity={0.6}
            transparent={true}
          />

          {/* The interactive region markers */}
          {(Object.keys(REGIONS) as RegionKey[]).map((key) => (
            <Marker 
              key={key}
              name={key}
              position={REGIONS[key].pos}
              color={REGIONS[key].color}
              active={region === key}
              onClick={(e: any) => { e.stopPropagation(); onRegionSelect(key); }}
            />
          ))}
        </group>
      </group>
    </>
  );
};

const AdattabilitaMarquee = () => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] overflow-hidden py-2 sm:py-3 z-50 flex items-center bg-[#FCD306]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex whitespace-nowrap gap-8 text-[#0D0D0D] font-urbanist font-black text-xl sm:text-2xl uppercase tracking-widest"
      >
        {[...Array(20)].map((_, i) => (
          <React.Fragment key={i}>
            <span>ADATTABILITÀ</span>
            <span className="text-[#0D0D0D] text-lg sm:text-xl">✦</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export const UrbanStreetArtMapSection: React.FC = () => {
  const [region, setRegion] = useState<RegionKey>('Lombardy');

  const cycleRegion = () => {
    const keys = Object.keys(REGIONS) as RegionKey[];
    const nextIndex = (keys.indexOf(region) + 1) % keys.length;
    setRegion(keys[nextIndex]);
  };

  const handleMarkerClick = (r: RegionKey) => {
    if (r !== region) {
      setRegion(r);
    }
  };

  return (
    // Rimosso overflow-hidden per permettere al bagliore sfocato di sfumare dolcemente sopra e sotto senza tagli netti
    <div className="relative w-[100vw] left-1/2 -translate-x-1/2 min-h-[100vh] py-20 bg-transparent flex items-center justify-center">
      <AdattabilitaMarquee />
      
      {/* Dynamic Background Image for Region */}
      {Object.entries(REGIONS).map(([key, data]) => (
        <img
          key={key}
          src={data.image}
          alt={`Urban Art in ${key}`}
          className={`absolute left-0 top-0 w-full md:w-[45%] h-full object-cover grayscale transition-all duration-1000 ease-in-out z-0 pointer-events-none ${region === key ? 'opacity-30 scale-100' : 'opacity-0 scale-105'}`}
          style={{
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
          }}
        />
      ))}

      {/* Bottom Fade to blend image with background */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent z-0 pointer-events-none" />

      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none transition-colors duration-1000 z-0"
        style={{ backgroundColor: REGIONS[region].color }}
      />

      {/* 3D Map Background */}
      <div className="absolute inset-0 w-full h-full z-0 cursor-move">
        <Canvas camera={{ position: [0, 6, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <MapScene region={region} onRegionSelect={handleMarkerClick} />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 flex items-center z-10 pointer-events-none">
        {/* Left Side: Logo */}
        <div className="w-full md:w-[45%] flex justify-center pointer-events-auto">
          <DynamicLogo region={region} onClick={cycleRegion} />
        </div>
      </div>
    </div>
  );
};
