'use client';
import React, { useRef, useState } from 'react';
import { Rocket, Puzzle, Zap, Cpu } from 'lucide-react';

const features = [
  {
    title: 'Global scalability',
    description: 'Scale across the ecosystems with a single unified infrastructure.',
    icon: Rocket
  },
  {
    title: 'Flexible solutions',
    description: 'Design and configure your product to fit your specific needs.',
    icon: Puzzle
  },
  {
    title: 'Lightning speed',
    description: 'Ultra-fast performance optimized for seamless experiences.',
    icon: Zap
  },
  {
    title: 'Next-Gen Tech',
    description: 'Built with the latest technologies for maximum reliability.',
    icon: Cpu
  }
];

const SpotlightFeatureCard: React.FC<{ feature: typeof features[0]; idx: number }> = ({ feature, idx }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const Icon = feature.icon;

  return (
    <div 
      className={`relative col-span-1 row-span-1 h-full w-full ${idx === 0 || idx === 1 ? 'mt-8 md:mt-0' : 'mt-16 md:mt-0'}`}
    >
      <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full w-full transition-all duration-300 ease-in-out z-20 flex flex-col items-center justify-start pt-12 pb-12 px-6"
      >
        
        {/* 
          NEW SPOTLIGHT GLOW EFFECTS CONTAINER 
          This is exactly the grid square. No rounded corners, no gaps.
          The glow traces the edges of the grid cell itself.
        */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

          {/* STROKE GLOW (Dynamic Border) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(16,185,129,0.8), transparent 40%)`,
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          {/* BACKGROUND GLOW (Internal Spotlight) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(16,185,129,0.15), transparent 40%)`,
            }}
          />
        </div>
        
        {/* OVERLAPPING ICON */}
        {/* Placed at the top edge of the grid square */}
        <div className="absolute top-0 left-[50%] z-30 shrink-0 -translate-x-1/2 -translate-y-1/2">
          <div className="relative overflow-hidden rounded-full p-[1px] transition-transform duration-300 ease-in-out group-hover:scale-110">
            
            {/* Outline / Stroke effect when NOT hovered */}
            <div className="absolute inset-0 rounded-full border border-white/15 group-hover:opacity-0 transition-opacity duration-300"></div>
            
            {/* The Icon Wrapper */}
            <div className="bg-[#121312] p-4 relative z-10 flex shrink-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-[#068B35] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
              <Icon className="w-6 h-6 text-emerald-400 group-hover:text-white relative z-20 transition-colors duration-300" />
            </div>
          </div>
        </div>
        
        {/* CONTENT */}
        <div className="space-y-3 text-center relative z-20 mt-4">
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-300">
            {feature.description}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center pt-16">
      
      {/* Container for the 2x2 grid. Notice gap is removed so cells touch. */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 text-center z-10">
        
        {/* Horizontal & Vertical Cross Dividers (Hidden on mobile) */}
        {/* These provide the base lines of the grid when not hovering */}
        <span className="hidden md:block absolute top-[-5%] left-[50%] h-[110%] w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none z-30"></span>
        <span className="hidden md:block absolute top-[50%] left-[-10%] w-[120%] h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-30"></span>

        {features.map((feature, idx) => (
          <SpotlightFeatureCard key={idx} feature={feature} idx={idx} />
        ))}
      </div>
    </div>
  );
}
