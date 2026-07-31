import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, AlertTriangle, Check, ArrowRight } from 'lucide-react';
import { StickyCard002 } from './ui/sticky-card';
import InteractiveBentoSection from './InteractiveBentoSection';
import HighlightCard from './ui/highlight-card';
import AuroraBackground from './ui/aurora-background';
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
      <div className="mt-4 text-xs font-mono text-neutral-400 uppercase tracking-widest font-semibold group-hover:text-neutral-200 transition-colors text-center">
        {label}
      </div>
    </div>
  );
};

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
        const progress = self.progress;

        let targetTab = 'desk';
        if (progress > 0.33 && progress <= 0.66) {
          targetTab = 'sondaggi';
        } else if (progress > 0.66) {
          targetTab = 'interviste';
        }

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
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">
          <AuroraBackground className="!bg-transparent h-full w-full pt-32 sm:pt-40 pb-20">
            <div className="w-full max-w-7xl mx-auto px-5 relative z-10 flex flex-col h-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-raleway">
                  Metodologia a Scansione
                </h2>
              </div>

              {/* Tab Selector */}
              <div className="flex gap-8 sm:gap-12 shrink-0 self-start relative overflow-x-auto scrollbar-none w-full sm:w-auto border-b border-white/10 pb-3 px-2 mt-16">
                {['desk', 'sondaggi', 'interviste'].map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab, index)}
                    className={`flex items-center justify-center pb-2 text-xs sm:text-sm tracking-widest transition-all duration-300 relative z-10 uppercase font-mono ${activeResearchTab === tab ? 'text-white/90 font-bold' : 'text-white/40 hover:text-white/70'
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
                        icon={<AlertTriangle className="w-8 h-8 text-white" />}
                      />
                      <HighlightCard animatedBorder={true}
                        title="Coinvolgimento"
                        description={["Esperienza passiva e veloce (5 min)."]}
                        icon={<AlertTriangle className="w-8 h-8 text-white" />}
                      />
                      <HighlightCard animatedBorder={true}
                        title="Informazioni"
                        description={["Mancano spiegazioni oltre al nome scientifico."]}
                        icon={<AlertTriangle className="w-8 h-8 text-white" />}
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
                          <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-mono border border-[#068B35]/20 shrink-0">Q1</span>
                          <p className="text-sm leading-relaxed text-neutral-400 font-light border-l-2 border-[#068B35] pl-4 italic">
                            "Migliorerebbe l'esperienza, permettendo di orientarsi e prepararsi prima della visita."
                          </p>
                        </div>
                      </HighlightCard>

                      <HighlightCard animatedBorder={true} title="Mancanze Informative?">
                        <div className="flex flex-col items-center gap-4 text-center">
                          <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-mono border border-[#068B35]/20 shrink-0">Q2</span>
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
      <div className="relative z-20 w-full -mt-[30vh] sm:-mt-[40vh]">
        <InteractiveBentoSection />
      </div>

      {/* 03 / L'ECOSISTEMA */}
      <div className="pt-16 border-t border-white/5 flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-raleway">
            Cos'è Bussola Verde?
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light max-w-2xl mt-4">
            Un ecosistema digitale che trasforma il parco in un percorso su misura, rendendo il visitatore esploratore attivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {/* CARD 1 */}
          <div className="animated-border-card h-full shadow-lg group">
            {/* Inner Content Block */}
            <div className="animated-border-content p-8 flex flex-col gap-6 items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#068B35]/10 flex items-center justify-center text-[#068B35] group-hover:scale-110 transition-transform duration-500 shrink-0">
                <Compass className="w-8 h-8 animate-pulse" />
              </div>
              <div className="flex flex-col flex-1 z-10">
                <h3 className="text-lg font-bold text-white font-raleway mb-2">Interattività</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">Pannelli digitali e QR accrescono istantaneamente la conoscenza.</p>
              </div>
            </div>
            {/* Add a transparent structural div just to give the card height since animated-border-content is absolute */}
            <div className="p-8 flex flex-col gap-6 items-center text-center invisible pointer-events-none">
              <div className="w-16 h-16 shrink-0" />
              <div>
                <h3 className="text-lg mb-2">Interattività</h3>
                <p className="text-sm">Pannelli digitali e QR accrescono istantaneamente la conoscenza.</p>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="animated-border-card h-full shadow-lg group">
            <div className="animated-border-content p-8 flex flex-col gap-6 items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#068B35]/10 flex items-center justify-center text-[#068B35] group-hover:scale-110 transition-transform duration-500 shrink-0">
                <ArrowRight className="w-8 h-8" />
              </div>
              <div className="flex flex-col flex-1 z-10">
                <h3 className="text-lg font-bold text-white font-raleway mb-2">Percorsi Agili</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">Itinerari personalizzati scelti tramite i Totem all'ingresso.</p>
              </div>
            </div>
            <div className="p-8 flex flex-col gap-6 items-center text-center invisible pointer-events-none">
              <div className="w-16 h-16 shrink-0" />
              <div>
                <h3 className="text-lg mb-2">Percorsi Agili</h3>
                <p className="text-sm">Itinerari personalizzati scelti tramite i Totem all'ingresso.</p>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="animated-border-card h-full shadow-lg group">
            <div className="animated-border-content p-8 flex flex-col gap-6 items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#068B35]/10 flex items-center justify-center text-[#068B35] group-hover:scale-110 transition-transform duration-500 shrink-0">
                <div className="w-4 h-4 bg-[#068B35] rounded-full shadow-[0_0_15px_rgba(6,139,53,0.8)]" />
              </div>
              <div className="flex flex-col flex-1 z-10">
                <h3 className="text-lg font-bold text-white font-raleway mb-2">Protagonismo</h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">Il visitatore è l'attore principale della propria esplorazione.</p>
              </div>
            </div>
            <div className="p-8 flex flex-col gap-6 items-center text-center invisible pointer-events-none">
              <div className="w-16 h-16 shrink-0" />
              <div>
                <h3 className="text-lg mb-2">Protagonismo</h3>
                <p className="text-sm">Il visitatore è l'attore principale della propria esplorazione.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MOCKUP MOBILE */}
      <div className="pt-16 pb-8 w-full">
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
          <img
            src="/project-01-mockup-mobile.jpg"
            alt="Bussola Verde Mobile Mockup 1"
            className="w-full h-auto object-cover block"
          />
          <motion.img
            initial={false}
            animate={{ opacity: mobileImageIndex === 1 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            src="/project-01-mockup-mobile-2.jpg"
            alt="Bussola Verde Mobile Mockup 2"
            className="w-full h-full object-cover absolute inset-0 z-10"
          />
        </div>
      </div>

      {/* 04 / USER PERSONA */}
      <div className="pt-16 border-t border-white/5 flex flex-col gap-12 pb-16">
        <div className="flex flex-col gap-4 text-center items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-raleway">
            L'Utente Ideale
          </h2>
        </div>

        <div className="bg-[#131514] rounded-[3rem] border border-[#068B35]/20 p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row gap-16 items-center lg:items-start shadow-2xl relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#068B35]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Left: Image & Identity */}
          <div className="flex flex-col gap-6 items-center lg:items-start w-full lg:w-1/3 z-10">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-[#068B35]/30 shadow-lg shrink-0">
              <img
                src="/mirella.png"
                alt="Mirella - User Persona"
                className="w-full h-full object-cover grayscale contrast-110 brightness-95"
              />
            </div>
            <div className="text-center lg:text-left flex flex-col gap-2">
              <h3 className="text-4xl font-black text-white font-raleway">Mirella</h3>
              <span className="text-sm font-mono uppercase tracking-widest text-[#068B35] font-bold bg-[#068B35]/10 px-4 py-1.5 rounded-full inline-block">Profilo Accademico</span>
            </div>
          </div>

          {/* Right: Facts & Bio in Grid */}
          <div className="flex flex-col gap-10 w-full lg:w-2/3 z-10">

            <div className="bg-[#1A1D1B] p-6 sm:p-8 rounded-[2rem] border border-white/5 relative mt-4 lg:mt-0">
              <div className="text-5xl font-serif text-[#068B35]/40 absolute -top-4 left-4">"</div>
              <p className="text-base sm:text-lg italic text-neutral-200 leading-relaxed font-light text-center px-4 sm:px-8 relative z-10">
                Voglio connettermi alla natura e approfondire la mia conoscenza scientifica senza barriere, in modo dinamico e intuitivo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Origine</span>
                <span className="text-base font-bold text-white">Colombia, ricca di biodiversità.</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Status</span>
                <span className="text-base font-bold text-white">Nuova residente a Catania (Studentessa).</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Obiettivo</span>
                <span className="text-base font-bold text-white">Esplorazione scientifica intuitiva.</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Necessità</span>
                <span className="text-base font-bold text-white">Informazioni repentine tramite smartphone.</span>
              </div>
            </div>

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
