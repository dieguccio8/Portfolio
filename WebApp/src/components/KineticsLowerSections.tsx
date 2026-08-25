import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, AlertTriangle, Check, ArrowRight, Star, MapPin, Clock, FileQuestion } from 'lucide-react';
import { StickyCard002 } from './ui/sticky-card';
import LogoGridConstruction from './LogoGridConstruction';
import { DesignSystemSection } from './DesignSystemSection';
import HighlightCard from './ui/highlight-card';
import { GridVignetteBackground } from './ui/vignette-grid-background';
import AuroraBackground from './ui/aurora-background';
import IphoneMockup3D from './IphoneMockup3D';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const NeonGauge = ({ percentage, color, label, level }: { percentage: string, color: string, label: string, level: number }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-end group mt-4">
      <div className="relative w-full flex items-end justify-center">
        <svg viewBox="0 -10 200 130" className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="100%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
            <filter id={`glow-${color.replace('#', '')}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="6"
            strokeOpacity="0.05"
            strokeLinecap="round"
          />

          {/* Active Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={`url(#grad-${color.replace('#', '')})`}
            strokeWidth="6"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - level}
            filter={`url(#glow-${color.replace('#', '')})`}
            className="transition-all duration-1000 ease-out"
          />

          {/* Knob */}
          <circle
            cx={100 - 80 * Math.cos(level * Math.PI)}
            cy={100 - 80 * Math.sin(level * Math.PI)}
            r="8"
            fill="#0D0D0D"
            stroke={color}
            strokeWidth="2"
            filter={`url(#glow-${color.replace('#', '')})`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Percentage Text inside the arc */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-4xl font-urbanist font-medium tracking-tight text-white drop-shadow-lg">
            {percentage}
          </span>
        </div>
      </div>

      {/* Label under the gauge */}
      <div className="mt-4 text-xs font-urbanist text-neutral-400 uppercase tracking-widest font-semibold group-hover:text-neutral-200 transition-colors text-center">
        {label}
      </div>
    </div>
  );
};

const PersonaTestNode = ({ top, left, label, content, align }: { top: string, left: string, label: string, content: string, align: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' }) => {
  const labelClasses = {
    'top-left': 'bottom-5 right-5 text-right',
    'top-right': 'bottom-5 left-5 text-left',
    'bottom-left': 'top-5 right-5 text-right',
    'bottom-right': 'top-5 left-5 text-left',
    'top-center': 'bottom-5 left-1/2 -translate-x-1/2 text-center'
  }[align];

  const boxClasses = {
    'top-left': 'bottom-3 right-3 origin-bottom-right',
    'top-right': 'bottom-3 left-3 origin-bottom-left',
    'bottom-left': 'top-3 right-3 origin-top-right',
    'bottom-right': 'top-3 left-3 origin-top-left',
    'top-center': 'bottom-3 left-1/2 -translate-x-1/2 origin-bottom'
  }[align];

  return (
    <div className="absolute z-30 flex items-center justify-center w-0 h-0 group/node" style={{ top, left }}>
      {/* Invisible hover area */}
      <div className="absolute w-32 h-32 rounded-full cursor-pointer z-10" />

      {/* Label styled like HighlightCard */}
      <div className={`absolute ${labelClasses} whitespace-nowrap transition-all duration-300 group-hover/node:opacity-0 group-hover/node:-translate-y-2 pointer-events-auto cursor-pointer`}>
        <div className="relative overflow-hidden border border-white/5 bg-[#0D0D0D] backdrop-blur-3xl px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_0_20px_rgba(252,211,6,0.05)] rounded-2xl pointer-events-none" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[140%] h-16 bg-[#FCD306]/40 blur-[15px] opacity-80 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FCD306] to-transparent opacity-100 pointer-events-none" />

          <span className="relative z-10 text-xs sm:text-sm font-urbanist uppercase tracking-widest text-white font-medium drop-shadow-md">{label}</span>
        </div>
      </div>

      {/* Expanded Content Box styled like HighlightCard */}
      <div className={`absolute ${boxClasses} w-48 sm:w-56 bg-[#0D0D0D] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-5 sm:p-6 opacity-0 scale-90 pointer-events-none transition-all duration-400 group-hover/node:opacity-100 group-hover/node:scale-100 group-hover/node:pointer-events-auto shadow-2xl z-20 overflow-hidden`}>
        <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_0_20px_rgba(252,211,6,0.05)] rounded-[2rem] pointer-events-none" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[140%] h-32 bg-[#FCD306]/30 blur-[40px] opacity-90 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FCD306] to-transparent opacity-100 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10">
          <span className="text-[10px] font-urbanist text-[#FCD306] uppercase tracking-widest block mb-3 font-bold">{label}</span>
          <p className="text-sm font-light text-white leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

const PopOutImage = ({ className }: { className?: string }) => (
  <div className={`relative shrink-0 group/img cursor-pointer ${className}`}>
    {/* Base Circle with hidden overflow for the bottom */}
    <div className="absolute inset-0 rounded-full border-2 sm:border-[3px] border-[#FCD306] bg-[#1A1A1A] overflow-hidden shadow-[0_0_50px_rgba(252,211,6,0.15)]">
      <img src="/mirella_no_bg.png" alt="Mirella Base" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] max-w-none h-auto object-contain object-bottom transition-transform duration-700 origin-bottom group-hover/img:scale-110" />
    </div>
    {/* Top Half popping out - exact same positioning but clipped */}
    <img
      src="/mirella_no_bg.png"
      alt="Mirella Pop Out"
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] max-w-none h-auto object-contain object-bottom z-10 pointer-events-none drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] transition-transform duration-700 origin-bottom group-hover/img:scale-110"
      style={{ clipPath: 'inset(0 0 50% 0)' }}
    />
  </div>
);

interface Props {
  project: any;
  activeResearchTab: any;
  setActiveResearchTab: any;
  lang?: string;
  [key: string]: any;
}

const problems = [
  {
    title: "Disorientamento",
    description: "I visitatori si perdono facilmente senza mappe interattive.",
    icon: AlertTriangle
  },
  {
    title: "Mancanza di contesto",
    description: "Le informazioni scientifiche risultano spesso ostiche o incomplete.",
    icon: AlertTriangle
  },
  {
    title: "Esperienza passiva",
    description: "La visita si limita a un percorso osservativo senza interazione.",
    icon: AlertTriangle
  }
];

export default function KineticsLowerSections({
  project,
  activeResearchTab,
  setActiveResearchTab,
  lang
}: Props) {
  const [mobileImageIndex, setMobileImageIndex] = React.useState(0);
  const pinRef = React.useRef<HTMLDivElement>(null);

  // Using a ref to hold the current tab for the GSAP callback
  // This prevents the GSAP hook from recreating every time state changes
  const activeTabRef = React.useRef(activeResearchTab);
  React.useEffect(() => {
    activeTabRef.current = activeResearchTab;
  }, [activeResearchTab]);

  useGSAP(() => {
    if (!pinRef.current) return;

    ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        // We always want to sync state with the actual scroll position, even on refresh/mount
        const progress = self.progress;

        let targetTab = 'desk';
        if (progress > 0.33 && progress <= 0.66) {
          targetTab = 'sondaggi';
        } else if (progress > 0.66) {
          targetTab = 'interviste';
        } else {
          targetTab = 'desk';
        }

        // Update the tab state if it has changed. 
        // This ensures that if progress drops back to 0 (e.g. scrolling to top), it resets to 'desk' correctly.
        if (activeTabRef.current !== targetTab) {
          setActiveResearchTab(targetTab);
        }
      }
    });
  }, { scope: pinRef });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMobileImageIndex(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update tab click to use GSAP ScrollTo plugin if available, or just window.scrollTo
  const handleTabClick = (tab: string, index: number) => {
    if (!pinRef.current) return;
    const trigger = ScrollTrigger.getById(pinRef.current.id) || ScrollTrigger.getAll().find(st => st.trigger === pinRef.current);
    if (trigger) {
      const start = trigger.start;
      const end = trigger.end;
      // We offset slightly to land squarely in the middle of each section's trigger zone
      const progress = index === 0 ? 0.15 : index === 1 ? 0.5 : 0.85;
      const scrollPos = start + (end - start) * progress;
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-24 sm:gap-32 w-full">
      {/* YELLOW OBJECTIVE SECTION */}
      <div className="relative w-[100vw] left-1/2 -translate-x-1/2 bg-[#FCD306] z-10 mt-12 -mb-4 sm:-mb-8 py-24 sm:py-32 md:py-40 flex flex-col items-center justify-center text-[#111111] px-6 overflow-hidden">
        
        {/* Decorative Triangles (Strictly following original logo mark aspect ratio and orientation) */}
        <svg viewBox="0 0 230 208" className="absolute top-0 right-0 w-64 md:w-[600px] h-auto opacity-[0.05] translate-x-1/4 pointer-events-none">
          <path d="M229.9 0L229.8 208L0 0Z" fill="#111111"/>
        </svg>
        <svg viewBox="0 0 230 208" className="absolute bottom-0 left-0 w-48 md:w-[400px] h-auto opacity-[0.1] -translate-x-1/4 translate-y-1/4 pointer-events-none">
          <path d="M229.9 0L229.8 208L0 0Z" fill="#ffffff"/>
        </svg>
        <svg viewBox="0 0 230 208" className="absolute top-1/4 left-[8%] w-12 md:w-20 h-auto opacity-40 pointer-events-none">
          <path d="M229.9 0L229.8 208L0 0Z" fill="#111111"/>
        </svg>
        <svg viewBox="0 0 230 208" className="absolute bottom-1/4 right-[10%] w-10 md:w-16 h-auto opacity-50 pointer-events-none hidden md:block">
          <path d="M229.9 0L229.8 208L0 0Z" fill="#ffffff"/>
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-7xl sm:text-[100px] md:text-[140px] font-urbanist font-black tracking-tighter leading-none mb-6 sm:mb-8 text-center uppercase">
            Obiettivo
          </h2>
          <p className="max-w-4xl text-center text-lg sm:text-xl md:text-3xl font-light leading-[1.4] tracking-tight text-[#111111]/90">
            Creare un’identità visiva forte, contemporanea e coerente, capace di rappresentare l’energia dell’arte urbana e rendere il progetto riconoscibile su tutti i canali digitali.
          </p>
        </div>
      </div>

      {/* 02 / LOGO CONSTRUCTION GRID */}
      <div className="relative z-20 w-full my-4 md:my-8">
        <LogoGridConstruction />
      </div>

      {/* 03.5 / LOOPING MOCKUPS (Restored) */}
      <div className="relative z-10 flex flex-col justify-center items-center w-[100vw] left-1/2 -translate-x-1/2 h-[60vh] md:h-[100vh] mt-0">
        <div className="relative w-full h-full">
          <img
            src="/Images/Project 02/Mockup/mockup_tshirt.jpg"
            alt="Urban StreetArt Sicily Mockup T-Shirt"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 shadow-2xl ${mobileImageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
          />
          <img
            src="/Images/Project 02/Mockup/mockup_cappello.jpg"
            alt="Urban StreetArt Sicily Mockup Cappello"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 shadow-2xl ${mobileImageIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
          />
          <img
            src="/Images/Project 02/Mockup/mockup_totebag.jpg"
            alt="Urban StreetArt Sicily Mockup Tote Bag"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 shadow-2xl ${mobileImageIndex === 2 ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* DESIGN SYSTEM SECTION */}
      <DesignSystemSection />

      {/* EMPTY PLACEHOLDER SECTION */}
      <div className="w-full h-[80vh] flex items-center justify-center">
        {/* Spazio vuoto da riempire */}
      </div>

      {/* NEW StickyCard002 Gallery Instead of Single Image */}
      <div className="relative z-10 w-full shrink-0 block">
        <StickyCard002
          cards={[
            { id: 1, image: "/mockup_totem_3.jpg", alt: "Totem Mockup 3" },
            { id: 2, image: "/mockup_totem.jpg", alt: "Totem Mockup" },
            { id: 3, image: "/mockup_cartello_zone_2.jpeg", alt: "Cartello Zone Mockup" },
            { id: 4, image: "/mockup_cartello_pianta_2.jpg", alt: "Cartello Pianta Mockup 2" }
          ]}
        />
      </div>
    </div>
  );
}
