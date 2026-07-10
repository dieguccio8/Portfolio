'use client';
import React, { useRef, useState } from 'react';
import { MapPinOff, FileText, Frown, SearchX, MonitorSmartphone, QrCode, Smartphone, Map } from 'lucide-react';

const problemsFeatures = [
  {
    title: 'Disorientamento',
    description: 'I visitatori si perdono facilmente senza mappe interattive.',
    icon: MapPinOff
  },
  {
    title: 'Informazione Statica',
    description: 'La cartellonistica analogica fornisce solo nomi scientifici.',
    icon: FileText
  },
  {
    title: 'Scarsa Interazione',
    description: 'Visita frettolosa senza un effettivo coinvolgimento digitale.',
    icon: Frown
  },
  {
    title: 'Mancanza di informazioni',
    description: 'Non è presente una mappa, poche informazioni utili e interessanti sulle piante.',
    icon: SearchX
  }
];

const solutionsFeatures = [
  {
    title: 'Totem all\'ingresso',
    description: 'Selezione immediata di percorsi tematici e mappa generale.',
    icon: MonitorSmartphone
  },
  {
    title: 'QR Code',
    description: 'Approfondimenti istantanei direttamente sul proprio smartphone.',
    icon: QrCode
  },
  {
    title: 'Web-App Dedicata',
    description: 'Esperienza guidata, accessibile e interattiva in tasca.',
    icon: Smartphone
  },
  {
    title: 'Informazioni alla portata di tutti',
    description: 'Inserimento di una mappa generale a portata di mano e curiosità sulle piante.',
    icon: Map
  }
];

const SpotlightFeatureCard: React.FC<{ 
  feature: typeof problemsFeatures[0]; 
  idx: number; 
  animationDelay: string;
  theme: 'red' | 'emerald';
}> = ({ feature, idx, animationDelay, theme }) => {
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

  // Theme Colors
  const strokeColor = theme === 'red' ? 'rgba(232,48,42,0.8)' : 'rgba(16,185,129,0.8)';
  const glowColor = theme === 'red' ? 'rgba(232,48,42,0.15)' : 'rgba(16,185,129,0.15)';
  const iconGradientFrom = theme === 'red' ? 'from-[#E8302A]' : 'from-emerald-400';
  const iconGradientTo = theme === 'red' ? 'to-[#8B0606]' : 'to-[#068B35]';
  const iconTextColor = theme === 'red' ? 'text-[#E8302A]' : 'text-emerald-400';
  const textHoverColor = theme === 'red' ? 'group-hover:text-[#E8302A]' : 'group-hover:text-emerald-400';

  return (
    <div 
      className={`relative col-span-1 row-span-1 h-full w-full animate-in fade-in zoom-in-95 duration-500`}
      style={{ animationDelay, animationFillMode: 'both' }}
    >
      <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full w-full transition-all duration-300 ease-in-out z-20 flex flex-col items-center justify-start pt-14 pb-14 md:pt-16 md:pb-24 px-6"
      >
        
        {/* SPOTLIGHT GLOW EFFECTS CONTAINER */}
        <div className="absolute -inset-px overflow-hidden pointer-events-none z-0">

          {/* STROKE GLOW (Dynamic Border) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${strokeColor}, transparent 40%)`,
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
              background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
            }}
          />
        </div>
        
        {/* OVERLAPPING ICON */}
        <div className="absolute top-0 left-[50%] z-30 shrink-0 -translate-x-1/2 -translate-y-1/2">
          <div className="relative overflow-hidden rounded-full p-[1px] transition-transform duration-300 ease-in-out group-hover:scale-110">
            
            {/* Outline / Stroke effect when NOT hovered */}
            <div className="absolute inset-0 rounded-full border border-white/15 group-hover:opacity-0 transition-opacity duration-300"></div>
            
            {/* The Icon Wrapper */}
            <div className="bg-[#121312] p-4 relative z-10 flex shrink-0 rounded-full overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${iconGradientFrom} ${iconGradientTo} opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100`}></div>
              {/* Added key for React reconciliation so animation plays on icon change */}
              <Icon key={feature.title} className={`w-6 h-6 ${iconTextColor} group-hover:text-white relative z-20 transition-colors duration-300`} />
            </div>
          </div>
        </div>
        
        {/* CONTENT */}
        <div className="space-y-3 text-center relative z-20 mt-4 w-full">
          <h3 className={`text-xl font-bold text-white tracking-tight ${textHoverColor} transition-colors duration-300`}>
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

export default function BentoGrid({ activePhase }: { activePhase: string }) {
  const isProblems = activePhase === 'problems';
  const activeFeatures = isProblems ? problemsFeatures : solutionsFeatures;
  const theme = isProblems ? 'red' : 'emerald';

  return (
    <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center pt-16">
      
      {/* Container for the 2x2 grid */}
      <div className="relative w-full grid grid-cols-1 gap-y-20 md:grid-cols-2 md:grid-rows-2 md:gap-y-0 text-center z-10">
        
        {/* Horizontal & Vertical Cross Dividers (Hidden on mobile) */}
        <span className="hidden md:block absolute top-[-5%] left-[50%] h-[110%] w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none z-30 transition-opacity duration-500"></span>
        <span className="hidden md:block absolute top-[50%] left-[-10%] w-[120%] h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-30 transition-opacity duration-500"></span>

        {activeFeatures.map((feature, idx) => (
          <SpotlightFeatureCard 
            key={feature.title} 
            feature={feature} 
            idx={idx} 
            animationDelay={`${idx * 100}ms`} 
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
