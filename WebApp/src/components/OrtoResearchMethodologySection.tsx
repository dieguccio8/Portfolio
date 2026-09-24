import React from 'react';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, FileQuestion, MapPin } from 'lucide-react';
import AuroraBackground from './ui/aurora-background';
import HighlightCard from './ui/highlight-card';

gsap.registerPlugin(ScrollTrigger);

interface OrtoResearchMethodologySectionProps {
  activeResearchTab: string;
  setActiveResearchTab: (tab: string) => void;
}

function NeonGauge({ percentage, color, label, level }: { percentage: string; color: string; label: string; level: number }) {
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
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#ffffff" strokeWidth="6" strokeOpacity="0.05" strokeLinecap="round" />
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-4xl font-urbanist font-medium tracking-tight text-white drop-shadow-lg">{percentage}</span>
        </div>
      </div>
      <div className="mt-4 text-xs font-raleway text-neutral-400 uppercase tracking-widest font-semibold group-hover:text-neutral-200 transition-colors text-center">
        {label}
      </div>
    </div>
  );
}

export function OrtoResearchMethodologySection({ activeResearchTab, setActiveResearchTab }: OrtoResearchMethodologySectionProps) {
  const pinRef = React.useRef<HTMLDivElement>(null);
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
        const targetTab = progress > 0.66 ? 'interviste' : progress > 0.33 ? 'sondaggi' : 'desk';

        if (activeTabRef.current !== targetTab) {
          setActiveResearchTab(targetTab);
        }
      },
    });
  }, { scope: pinRef });

  const handleTabClick = (tab: string, index: number) => {
    if (!pinRef.current) return;

    const trigger = ScrollTrigger.getAll().find((item) => item.trigger === pinRef.current);
    if (!trigger) return;

    const progress = index === 0 ? 0.15 : index === 1 ? 0.5 : 0.85;
    const scrollPos = trigger.start + (trigger.end - trigger.start) * progress;

    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(scrollPos);
    } else {
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <section ref={pinRef} id="research-methodology" className="relative left-1/2 -translate-x-1/2 w-[100vw] h-[300vh] -mt-4 z-10">
      <div className="orto-research-sticky sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col pb-10 sm:pb-20">
        <AuroraBackground className="orto-research-aurora !bg-transparent h-full w-full pt-24 sm:pt-40 pb-10 sm:pb-20">
          <div className="w-full max-w-7xl mx-auto px-5 relative z-10 flex flex-col h-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-raleway">Metodologia di Ricerca</h2>
            </div>

            <div className="orto-research-tabs flex gap-8 sm:gap-12 shrink-0 self-start relative overflow-x-auto scrollbar-none w-full sm:w-auto border-b border-white/10 pb-3 px-2 mt-8 sm:mt-16">
              {['desk', 'sondaggi', 'interviste'].map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabClick(tab, index)}
                  className={`flex items-center justify-center pb-2 text-xs sm:text-sm tracking-widest transition-all duration-300 relative z-10 uppercase font-raleway ${activeResearchTab === tab ? 'text-white/90 font-bold' : 'text-white/40 hover:text-white/70'}`}
                >
                  {activeResearchTab === tab && (
                    <motion.div
                      layoutId="active-research-bg-aetheris"
                      className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-white/80"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-20">{tab === 'desk' ? 'Desk' : tab === 'sondaggi' ? 'Sondaggi' : 'Interviste'}</span>
                </button>
              ))}
            </div>

            <div className="orto-research-content flex-1 relative w-full mt-10 sm:mt-24">
              <AnimatePresence mode="wait">
                {activeResearchTab === 'desk' && (
                  <motion.div
                    key="desk-tab"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="relative flex md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0"
                  >
                    <HighlightCard animatedBorder className="min-w-[260px] md:min-w-0 snap-center" title="Orientamento" description={["Nessuna guida per non esperti."]} icon={<MapPin className="w-8 h-8 text-white" />} />
                    <HighlightCard animatedBorder className="min-w-[260px] md:min-w-0 snap-center" title="Coinvolgimento" description={["Esperienza passiva e veloce (5 min)."]} icon={<Clock className="w-8 h-8 text-white" />} />
                    <HighlightCard animatedBorder className="min-w-[260px] md:min-w-0 snap-center" title="Informazioni" description={["Mancano spiegazioni oltre al nome scientifico."]} icon={<FileQuestion className="w-8 h-8 text-white" />} />
                  </motion.div>
                )}

                {activeResearchTab === 'sondaggi' && (
                  <motion.div
                    key="sondaggi-tab"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="relative flex md:grid md:grid-cols-2 gap-8 max-w-4xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0"
                  >
                    <HighlightCard animatedBorder title="Come ti orienti?" className="min-w-[260px] md:min-w-0 snap-center">
                      <div className="flex w-full justify-between gap-8 mt-2 mb-8 max-w-[320px] mx-auto">
                        <div className="w-1/2"><NeonGauge percentage="20%" color="#FFFFFF" label="Segnaletica" level={0.2} /></div>
                        <div className="w-1/2"><NeonGauge percentage="70%" color="#068B35" label="Casuale" level={0.7} /></div>
                      </div>
                    </HighlightCard>
                    <HighlightCard animatedBorder title="Useresti QR code interattivi?" className="min-w-[260px] md:min-w-0 snap-center">
                      <div className="flex w-full justify-between gap-8 mt-2 mb-8 max-w-[320px] mx-auto">
                        <div className="w-1/2"><NeonGauge percentage="25%" color="#FFFFFF" label="Forse" level={0.25} /></div>
                        <div className="w-1/2"><NeonGauge percentage="75%" color="#068B35" label="Sì" level={0.75} /></div>
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
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="relative flex md:grid md:grid-cols-2 gap-8 max-w-4xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0"
                  >
                    <HighlightCard animatedBorder title="Utilità di un Totem Digitale?" className="min-w-[260px] md:min-w-0 snap-center">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-raleway border border-[#068B35]/20 shrink-0">Q1</span>
                        <p className="text-sm leading-relaxed text-neutral-400 font-light border-l-2 border-[#068B35] pl-4 italic">"Migliorerebbe l'esperienza, permettendo di orientarsi e prepararsi prima della visita."</p>
                      </div>
                    </HighlightCard>
                    <HighlightCard animatedBorder title="Mancanze Informative?" className="min-w-[260px] md:min-w-0 snap-center">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-raleway border border-[#068B35]/20 shrink-0">Q2</span>
                        <p className="text-sm leading-relaxed text-neutral-400 font-light border-l-2 border-[#068B35] pl-4 italic">"Sì, mancano dettagli scientifici chiari oltre al nome della pianta."</p>
                      </div>
                    </HighlightCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AuroraBackground>

        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] from-10% via-[#050505]/80 to-transparent pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-0" />
      </div>
    </section>
  );
}
