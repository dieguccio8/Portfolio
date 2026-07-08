import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, AlertTriangle, Check, ArrowRight } from 'lucide-react';
import { StickyCard002 } from './ui/sticky-card';

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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMobileImageIndex(prev => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-24 sm:gap-32 w-full">
      
      {/* 01 / RESEARCH & ANALYSIS */}
      <div className="pt-16 border-t border-white/5 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#068B35] font-bold">01 / Ricerca ed Analisi</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-raleway">
            Metodologia a Scansione
          </h2>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#131514] border border-white/5 p-1.5 rounded-full shrink-0 self-start shadow-inner relative overflow-x-auto scrollbar-none w-full sm:w-auto">
          {['desk', 'sondaggi', 'interviste'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveResearchTab(tab)}
              className={`flex items-center justify-center min-w-[120px] gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 uppercase font-mono ${
                activeResearchTab === tab ? 'text-white' : 'text-neutral-500 hover:text-white'
              }`}
            >
              {activeResearchTab === tab && (
                <motion.div
                  layoutId="active-research-bg-aetheris"
                  className="absolute inset-0 bg-[#068B35] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-20">
                {tab === 'desk' ? 'Desk' : tab === 'sondaggi' ? 'Sondaggi' : 'Interviste'}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeResearchTab === 'desk' && (
            <motion.div
              key="desk-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-10"
            >
              {/* Visual Cards for Desk Research */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-[#131514] rounded-[2rem] border border-white/5 flex flex-col gap-6 items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#068B35]/10 flex items-center justify-center text-[#068B35] font-bold font-mono text-xl shrink-0">1</div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Pain Point</span>
                    <h3 className="text-xl font-bold text-white font-raleway">Orientamento</h3>
                    <p className="text-sm leading-relaxed text-neutral-400 font-light">Nessuna guida per non esperti.</p>
                  </div>
                </div>

                <div className="p-8 bg-[#131514] rounded-[2rem] border border-white/5 flex flex-col gap-6 items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#068B35]/10 flex items-center justify-center text-[#068B35] font-bold font-mono text-xl shrink-0">2</div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Pain Point</span>
                    <h3 className="text-xl font-bold text-white font-raleway">Coinvolgimento</h3>
                    <p className="text-sm leading-relaxed text-neutral-400 font-light">Esperienza passiva e veloce (5 min).</p>
                  </div>
                </div>

                <div className="p-8 bg-[#131514] rounded-[2rem] border border-white/5 flex flex-col gap-6 items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#068B35]/10 flex items-center justify-center text-[#068B35] font-bold font-mono text-xl shrink-0">3</div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Pain Point</span>
                    <h3 className="text-xl font-bold text-white font-raleway">Informazioni</h3>
                    <p className="text-sm leading-relaxed text-neutral-400 font-light">Mancano spiegazioni oltre al nome scientifico.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeResearchTab === 'sondaggi' && (
            <motion.div
              key="sondaggi-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Chart 1 */}
                <div className="p-8 bg-[#131514] rounded-[2rem] border border-white/5 flex flex-col gap-8 justify-center">
                  <h3 className="text-lg font-bold text-white font-raleway">Come ti orienti?</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider">Casuale</span>
                        <span className="text-3xl font-black text-[#068B35]">70%</span>
                      </div>
                      <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="h-full bg-[#068B35] rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider">Segnaletica</span>
                        <span className="text-3xl font-black text-white">20%</span>
                      </div>
                      <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="h-full bg-white/20 rounded-full" style={{ width: '20%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 2 */}
                <div className="p-8 bg-[#131514] rounded-[2rem] border border-white/5 flex flex-col gap-8 justify-center">
                  <h3 className="text-lg font-bold text-white font-raleway">Useresti QR code interattivi?</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider">Sì, assolutamente</span>
                        <span className="text-3xl font-black text-[#068B35]">75%</span>
                      </div>
                      <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="h-full bg-[#068B35] rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider">Forse</span>
                        <span className="text-3xl font-black text-white">25%</span>
                      </div>
                      <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden">
                        <div className="h-full bg-white/20 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeResearchTab === 'interviste' && (
            <motion.div
              key="interviste-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="p-8 bg-[#131514] rounded-[2rem] border border-white/5 flex flex-col gap-6 justify-center">
                <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-mono border border-[#068B35]/20 shrink-0">Q1</span>
                <h3 className="text-xl font-bold text-white font-raleway">Utilità di un Totem Digitale?</h3>
                <p className="text-sm leading-relaxed text-neutral-400 font-light border-l-2 border-[#068B35] pl-4 italic">
                  "Migliorerebbe l'esperienza, permettendo di orientarsi e prepararsi prima della visita."
                </p>
              </div>

              <div className="p-8 bg-[#131514] rounded-[2rem] border border-white/5 flex flex-col gap-6 justify-center">
                <span className="w-12 h-12 rounded-full bg-[#068B35]/10 text-[#068B35] flex items-center justify-center font-bold font-mono border border-[#068B35]/20 shrink-0">Q2</span>
                <h3 className="text-xl font-bold text-white font-raleway">Mancanze Informative?</h3>
                <p className="text-sm leading-relaxed text-neutral-400 font-light border-l-2 border-[#068B35] pl-4 italic">
                  "Le info online sono incomplete per chi viene da fuori città. Serve contesto rapido."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 02 / ANALYSIS & STRATEGY: PROBLEMS VS SOLUTIONS */}
      <div className="pt-16 border-t border-white/5 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#068B35] font-bold">02 / Analisi e Strategia</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-raleway">
            Criticità vs Innovazione
          </h2>
        </div>

        <div className="group relative mt-8 [perspective:2000px] cursor-pointer w-full">
          {/* STATIC SPACER: Invisible copy of the tallest content. This locks the parent's height and width 100% solidly, so it never shrinks during 3D projection! */}
          <div className="w-full flex flex-col gap-10 sm:gap-16 items-center invisible pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8" />
              <h3 className="text-3xl sm:text-4xl font-bold font-raleway">I Problemi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Dummy cards just for height calculation */}
              <div className="p-8 sm:p-10 flex flex-col gap-6">
                <span className="text-3xl font-bold">?</span>
                <div className="flex flex-col gap-4">
                  <h4 className="text-xl font-bold">Disorientamento</h4>
                  <p className="text-sm">I visitatori si perdono facilmente senza mappe interattive</p>
                </div>
              </div>
            </div>
          </div>

          {/* BULLETPROOF HIT SHIELD: sits on top of everything and never rotates */}
          <div className="absolute inset-0 z-[100]" />
          
          <div className="absolute inset-0 w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] grid">
            
            {/* PROBLEMS BLOCK (FRONT) */}
            <div className="col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] flex flex-col gap-10 sm:gap-16 items-center">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-8 h-8 text-rose-500" />
                <h3 className="text-3xl sm:text-4xl font-bold text-rose-500 font-raleway">I Problemi</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-[#1A1515] border border-rose-900/20 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center gap-6 h-full shadow-lg">
                  <span className="text-3xl font-bold text-white">?</span>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-white">Disorientamento</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">I visitatori si perdono facilmente senza mappe interattive</p>
                  </div>
                </div>

                <div className="bg-[#1A1515] border border-rose-900/20 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center gap-6 h-full shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-4"/><path d="M12 6V2"/><path d="M22 12h-4"/><path d="M6 12H2"/><path d="M19.071 19.071l-2.828-2.828"/><path d="M7.757 7.757L4.929 4.929"/><path d="M19.071 4.929l-2.828 2.828"/><path d="M7.757 16.243l-2.828 2.828"/><circle cx="12" cy="12" r="4"/></svg>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-white">Informazione Statica</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">La cartellonistica analogica fornisce solo nomi scientifici</p>
                  </div>
                </div>

                <div className="bg-[#1A1515] border border-rose-900/20 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center gap-6 h-full shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l-4 4-2-2"/><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/><path d="M13 13l4-4 2 2"/></svg>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-white">Scarsa Interazione</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">Visita frettolosa senza un effettivo coinvolgimento digitale</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SOLUTIONS BLOCK (BACK) */}
            <div className="col-start-1 row-start-1 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col gap-10 sm:gap-16 items-center">
              <div className="flex items-center gap-4">
                <Check className="w-8 h-8 text-[#068B35]" />
                <h3 className="text-3xl sm:text-4xl font-bold text-[#068B35] font-raleway">Le Soluzioni</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-[#121A15] border border-[#068B35]/20 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center gap-6 h-full shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-white">Totem All'Ingresso</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">Selezione immediata di percorsi tematici e mappa generale</p>
                  </div>
                </div>

                <div className="bg-[#121A15] border border-[#068B35]/20 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center gap-6 h-full shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-white">QR Code Point</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">Approfondimenti istantanei direttamente sul proprio smartphone</p>
                  </div>
                </div>

                <div className="bg-[#121A15] border border-[#068B35]/20 rounded-[2rem] p-8 sm:p-10 flex flex-col items-center text-center gap-6 h-full shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xl font-bold text-white">Web-App Dedicata</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">Esperienza guidata, accessibile e interattiva in tasca</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 03 / L'ECOSISTEMA */}
      <div className="pt-16 border-t border-white/5 flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#068B35] font-bold">03 / Il Progetto</span>
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
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#068B35] font-bold">04 / Target User</span>
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
              <span className="text-xs font-mono uppercase tracking-widest text-[#068B35] font-bold bg-[#068B35]/10 px-4 py-1.5 rounded-full inline-block">Profilo Accademico</span>
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
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Origine</span>
                <span className="text-base font-bold text-white">Colombia, ricca di biodiversità.</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Status</span>
                <span className="text-base font-bold text-white">Nuova residente a Catania (Studentessa).</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Obiettivo</span>
                <span className="text-base font-bold text-white">Esplorazione scientifica intuitiva.</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Necessità</span>
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
