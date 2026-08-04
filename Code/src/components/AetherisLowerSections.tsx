import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, AlertTriangle, Check, ArrowRight, Star, MapPin, Clock, FileQuestion } from 'lucide-react';
import { StickyCard002 } from './ui/sticky-card';
import InteractiveBentoSection from './InteractiveBentoSection';
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
            fill="#030604"
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
      <div className="mt-4 text-xs font-raleway text-neutral-400 uppercase tracking-widest font-semibold group-hover:text-neutral-200 transition-colors text-center">
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
        <div className="relative overflow-hidden border border-white/5 bg-[#030604] backdrop-blur-3xl px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_0_20px_rgba(6,139,53,0.05)] rounded-2xl pointer-events-none" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[140%] h-16 bg-[#068B35]/40 blur-[15px] opacity-80 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#068B35] to-transparent opacity-100 pointer-events-none" />

          <span className="relative z-10 text-xs sm:text-sm font-raleway uppercase tracking-widest text-white font-medium drop-shadow-md">{label}</span>
        </div>
      </div>

      {/* Expanded Content Box styled like HighlightCard */}
      <div className={`absolute ${boxClasses} w-48 sm:w-56 bg-[#030604] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-5 sm:p-6 opacity-0 scale-90 pointer-events-none transition-all duration-400 group-hover/node:opacity-100 group-hover/node:scale-100 group-hover/node:pointer-events-auto shadow-2xl z-20 overflow-hidden`}>
        <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_0_20px_rgba(6,139,53,0.05)] rounded-[2rem] pointer-events-none" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[140%] h-32 bg-[#068B35]/30 blur-[40px] opacity-90 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#068B35] to-transparent opacity-100 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10">
          <span className="text-[10px] font-raleway text-[#068B35] uppercase tracking-widest block mb-3 font-bold">{label}</span>
          <p className="text-sm font-light text-white leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

const PopOutImage = ({ className }: { className?: string }) => (
  <div className={`relative shrink-0 group/img cursor-pointer ${className}`}>
    {/* Base Circle with hidden overflow for the bottom */}
    <div className="absolute inset-0 rounded-full border-2 sm:border-[3px] border-[#068B35] bg-[#131514] overflow-hidden shadow-[0_0_50px_rgba(6,139,53,0.15)]">
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
  activeResearchTab: string;
  setActiveResearchTab: (tab: string) => void;
  lang: string;
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

export function AetherisLowerSections({
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
      setMobileImageIndex(prev => (prev === 0 ? 1 : 0));
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

      {/* 01 / RESEARCH & ANALYSIS */}
      <div ref={pinRef} className="relative left-1/2 -translate-x-1/2 w-[100vw] h-[300vh] -mt-4 z-10">
        <div className="sticky top-0 w-full h-auto overflow-hidden flex flex-col pb-20">
          <AuroraBackground className="!bg-transparent h-auto w-full pt-32 sm:pt-40 pb-20">
            <div className="w-full max-w-7xl mx-auto px-5 relative z-10 flex flex-col h-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-raleway">
                  Metodologia di Ricerca
                </h2>
              </div>

              {/* Tab Selector */}
              <div className="flex gap-8 sm:gap-12 shrink-0 self-start relative overflow-x-auto scrollbar-none w-full sm:w-auto border-b border-white/10 pb-3 px-2 mt-16">
                {['desk', 'sondaggi', 'interviste'].map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab, index)}
                    className={`flex items-center justify-center pb-2 text-xs sm:text-sm tracking-widest transition-all duration-300 relative z-10 uppercase font-raleway ${activeResearchTab === tab ? 'text-white/90 font-bold' : 'text-white/40 hover:text-white/70'
                      }`}
                  >
                    {activeResearchTab === tab && (
                      <motion.div
                        layoutId="active-research-bg-aetheris"
                        className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-white/80"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-20">
                      {tab === 'desk' ? 'Desk' : tab === 'sondaggi' ? 'Sondaggi' : 'Interviste'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Dynamic Content Area */}
              <div className="flex-1 relative w-full mt-24">
                <AnimatePresence mode="wait">
                  {activeResearchTab === 'desk' && (
                    <motion.div
                      key="desk-tab"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                    >
                      <HighlightCard animatedBorder={true}
                        title="Orientamento"
                        description={["Nessuna guida per non esperti."]}
                        icon={<MapPin className="w-8 h-8 text-white" />}
                      />
                      <HighlightCard animatedBorder={true}
                        title="Coinvolgimento"
                        description={["Esperienza passiva e veloce (5 min)."]}
                        icon={<Clock className="w-8 h-8 text-white" />}
                      />
                      <HighlightCard animatedBorder={true}
                        title="Informazioni"
                        description={["Mancano spiegazioni oltre al nome scientifico."]}
                        icon={<FileQuestion className="w-8 h-8 text-white" />}
                      />
                    </motion.div>
                  )}

                  {activeResearchTab === 'sondaggi' && (
                    <motion.div
                      key="sondaggi-tab"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    >
                      {/* Chart 1 */}
                      <HighlightCard animatedBorder={true} title="Come ti orienti?">
                        <div className="flex w-full justify-between gap-8 mt-2 mb-8 max-w-[320px] mx-auto">
                          <div className="w-1/2">
                            <NeonGauge percentage="20%" color="#FFFFFF" label="Segnaletica" level={0.2} />
                          </div>
                          <div className="w-1/2">
                            <NeonGauge percentage="70%" color="#068B35" label="Casuale" level={0.7} />
                          </div>
                        </div>
                      </HighlightCard>

                      {/* Chart 2 */}
                      <HighlightCard animatedBorder={true} title="Useresti QR code interattivi?">
                        <div className="flex w-full justify-between gap-8 mt-2 mb-8 max-w-[320px] mx-auto">
                          <div className="w-1/2">
                            <NeonGauge percentage="25%" color="#FFFFFF" label="Forse" level={0.25} />
                          </div>
                          <div className="w-1/2">
                            <NeonGauge percentage="75%" color="#068B35" label="Sì" level={0.75} />
                          </div>
                        </div>
                      </HighlightCard>
                    </motion.div>
                  )}

                  {activeResearchTab === 'interviste' && (
                    <motion.div
                      key="interviste-tab"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    >
                      <HighlightCard animatedBorder={true} title="Utilità di un Totem Digitale?">
                        <div className="flex flex-col items-center gap-4 text-center">
                          <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-raleway border border-[#068B35]/20 shrink-0">Q1</span>
                          <p className="text-sm leading-relaxed text-neutral-400 font-light border-l-2 border-[#068B35] pl-4 italic">
                            "Migliorerebbe l'esperienza, permettendo di orientarsi e prepararsi prima della visita."
                          </p>
                        </div>
                      </HighlightCard>

                      <HighlightCard animatedBorder={true} title="Mancanze Informative?">
                        <div className="flex flex-col items-center gap-4 text-center">
                          <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-raleway border border-[#068B35]/20 shrink-0">Q2</span>
                          <p className="text-sm leading-relaxed text-neutral-400 font-light border-l-2 border-[#068B35] pl-4 italic">
                            "Sì, mancano dettagli scientifici chiari oltre al nome della pianta."
                          </p>
                        </div>
                      </HighlightCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </AuroraBackground>

          {/* Fade-in mask for smooth transition from the hero */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] from-10% via-[#050505]/80 to-transparent pointer-events-none z-0" />

          {/* Fade-out mask for smooth transition to the next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-0" />
        </div>
      </div>

      {/* 02 / ANALYSIS & STRATEGY: PROBLEMS VS SOLUTIONS */}
      <div className="relative z-20 w-full -mt-[10vh] md:-mt-[25vh]">
        <InteractiveBentoSection />
      </div>

      {/* 03.5 / LOOPING MOCKUPS (Restored) */}
      <div className="relative z-10 flex flex-col justify-center items-center w-[100vw] left-1/2 -translate-x-1/2 h-[60vh] md:h-[100vh] -mt-[10vh] md:-mt-[25vh]">
        <div className="relative w-full h-full">
          <img
            src="/project-01-mockup-mobile.jpg"
            alt="Bussola Verde App Preview 1"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 shadow-2xl ${mobileImageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
          />
          <img
            src="/project-01-mockup-mobile-2.jpg"
            alt="Bussola Verde App Preview 2"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 shadow-2xl ${mobileImageIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

      {/* 04 / USER PERSONA */}
      <div className="py-20 md:py-32 relative z-10 w-[100vw] ml-[calc(50%-50vw)] flex flex-col items-center overflow-hidden">

        {/* Background Grid Vignette */}
        <GridVignetteBackground className="opacity-100" horizontalVignetteSize={50} verticalVignetteSize={50} intensity={100} />

        {/* Header Block (Standard Flow) */}
        <div className="flex flex-col items-center gap-6 w-[90vw] max-w-2xl mb-16 md:mb-24 relative z-30">
          <h3 className="text-4xl sm:text-5xl font-raleway tracking-wide drop-shadow-md leading-none text-center">
            <span className="font-black text-[#068B35]">Mirella</span>
            <span className="text-neutral-500 font-light mx-3 sm:mx-4">•</span>
            <span className="font-light text-white">L'utente Ideale</span>
          </h3>
          <p className="text-sm md:text-base italic text-neutral-200 font-light leading-relaxed text-center drop-shadow-md">
            "Voglio connettermi alla natura e approfondire la mia conoscenza scientifica senza barriere, in modo dinamico e intuitivo."
          </p>
        </div>

        {/* Diagram Area */}
        <div className="relative w-full max-w-4xl aspect-square md:aspect-[4/3] flex items-center justify-center">

          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">

            {/* Status (Top Left) */}
            <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
            <circle cx="15%" cy="15%" r="4" fill="rgba(255,255,255,0.15)" />

            {/* Necessità (Top Right) */}
            <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
            <circle cx="85%" cy="15%" r="4" fill="rgba(255,255,255,0.15)" />

            {/* Obiettivo (Bottom Left) */}
            <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
            <circle cx="15%" cy="85%" r="4" fill="rgba(255,255,255,0.15)" />

            {/* Origine (Bottom Right) */}
            <line x1="85%" y1="85%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
            <circle cx="85%" cy="85%" r="4" fill="rgba(255,255,255,0.15)" />
          </svg>

          {/* Interactive Nodes */}
          <PersonaTestNode top="15%" left="15%" label="Status" content="Nuova residente a Catania (Studentessa)." align="top-left" />
          <PersonaTestNode top="15%" left="85%" label="Necessità" content="Informazioni repentine tramite smartphone." align="top-right" />
          <PersonaTestNode top="85%" left="15%" label="Obiettivo" content="Esplorazione scientifica intuitiva." align="bottom-left" />
          <PersonaTestNode top="85%" left="85%" label="Origine" content="Colombia, ricca di biodiversità." align="bottom-right" />

          {/* Center Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            {/* Pop-out Image Component */}
            <PopOutImage className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64" />
          </div>
        </div>
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
