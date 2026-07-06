import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Search, 
  Check, 
  Compass, 
  Smartphone,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface ChronosLowerSectionsProps {
  copiedColor: string | null;
  handleCopyHex: (hex: string) => void;
  lang?: string;
}

// Before/After Slider Component for Italo App Screen
function ItaloBeforeAfterSlider({ lang = 'it' }: { lang?: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={(e) => handleMove(e.clientX)}
      className="absolute inset-0 z-20 select-none cursor-ew-resize overflow-hidden"
    >
      {/* After Image (Controlled by clipping path) */}
      <div 
        className="absolute inset-0 bg-neutral-950 pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-transparent z-10" />
        
        {/* Mockup Screen After */}
        <div className="w-full h-full bg-[#111] p-6 flex flex-col justify-between text-left relative">
          <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#9E1C1F] rounded-full text-[9px] font-mono text-white font-bold uppercase tracking-wider">
            {lang === 'it' ? "AFTER: Flusso Rapido 3-Tap" : "AFTER: Fast 3-Tap Flow"}
          </div>
          
          <div className="flex flex-col gap-4 mt-6">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
              {lang === 'it' ? "Riepilogo Viaggio" : "Journey Summary"}
            </span>
            <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-white uppercase tracking-tight">Catania C.le</span>
                  <span className="text-[10px] font-mono text-[#9E1C1F] font-bold">MILANO CENTRALE</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono text-neutral-400">08:15 ➔ 17:40</span>
                  <span className="text-[9px] font-mono text-neutral-500">
                    {lang === 'it' ? "Durata: 9h 25m" : "Duration: 9h 25m"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-neutral-400">
                  {lang === 'it' ? "Tariffa Smart • Flex" : "Smart • Flex Fare"}
                </span>
                <span className="text-sm font-black text-white">€89,90</span>
              </div>
            </div>
            
            {/* Quick checkout CTA button */}
            <div className="w-full py-3 bg-[#9E1C1F] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl text-center shadow-lg shadow-[#9E1C1F]/20 flex items-center justify-center gap-2">
              <span>{lang === 'it' ? "Paga in 1-Click con Apple Pay" : "Pay in 1-Click with Apple Pay"}</span>
              <span className="text-white/60">➔</span>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-neutral-500 flex justify-between uppercase">
            <span>{lang === 'it' ? "Selezionato: Carrozza 4 - Posto 42" : "Selected: Carriage 4 - Seat 42"}</span>
            <span>{lang === 'it' ? "No Frizioni" : "No Friction"}</span>
          </div>
        </div>
      </div>

      {/* Slider Line Divider */}
      <div 
        className="absolute top-0 bottom-0 w-[2.5px] bg-white z-30 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#9E1C1F] shadow-xl flex items-center justify-center text-black font-bold text-sm pointer-events-none">
          <span className="text-[#9E1C1F]">↔</span>
        </div>
      </div>
    </div>
  );
}

// Counting element on Scroll
function CountUpNumber({ target, suffix = '', duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    
    // Simple Intersection Observer to start animation when visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function ChronosLowerSections({
  copiedColor,
  handleCopyHex,
  lang = 'it'
}: ChronosLowerSectionsProps) {
  
  // Interactive UX Flow Selector
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = [
    {
      title: lang === 'it' ? '01 / Ricerca Rapida' : '01 / Quick Search',
      subtitle: lang === 'it' ? 'Input Intelligente' : 'Smart Input',
      desc: lang === 'it' 
        ? 'Mappatura predittiva delle ultime ricerche e tratte preferite. Riduzione del form-filling dell\'80%.' 
        : 'Predictive mapping of recent searches and favorite routes. 80% reduction in form-filling.',
      coords: 'LAT 37.5 / LON 15.0',
    },
    {
      title: lang === 'it' ? '02 / Scelta Treno' : '02 / Train Selection',
      subtitle: lang === 'it' ? 'Griglia Tariffe Integrata' : 'Integrated Fare Grid',
      desc: lang === 'it' 
        ? 'Orari, prezzi e classi accorpati in un singolo colpo d\'occhio lineare senza popup nascosti.' 
        : 'Schedules, prices and classes consolidated in a single linear glance with no hidden popups.',
      coords: 'COMPACT_CELL_V2',
    },
    {
      title: lang === 'it' ? '03 / Checkout Instantaneo' : '03 / Instant Checkout',
      subtitle: lang === 'it' ? 'Acquisto One-Tap' : 'One-Tap Purchase',
      desc: lang === 'it' 
        ? 'Integrazione sicura dei metodi di pagamento digitali rapidi. Il biglietto viene emesso offline.' 
        : 'Secure integration of fast digital payment methods. The ticket is issued offline.',
      coords: 'WALLET_READY',
    }
  ];

  return (
    <div className="flex flex-col gap-24 w-full text-white">
      
      {/* SECTION 2: CONTEXT & CHALLENGE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12 border-t border-white/5">
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9E1C1F] font-bold">02 / Context & Challenge</span>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
              {lang === 'it' ? "L'Attrito Invisibile." : "The Invisible Friction."}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-300 font-light">
              {lang === 'it' ? (
                <>Italo è sinonimo di viaggi rapidi e premium. Ma una grande promessa brand perde valore se l'app frena gli utenti proprio al momento dell'acquisto. La vera sfida? Non si trattava di "fare un restyling estetico", ma di abbattere i muri cognitivi e risolvere un problema strutturale di navigazione. Obiettivo: <span className="font-semibold text-white">eliminare ogni singola frizione nel funnel di acquisto</span>.</>
              ) : (
                <>Italo is synonymous with fast, premium travel. But a great brand promise loses value if the app slows down users right at the moment of purchase. The real challenge? It wasn't about "making an aesthetic restyling", but about breaking down cognitive walls and solving a structural navigation problem. Goal: <span className="font-semibold text-white">eliminate every single friction in the checkout funnel</span>.</>
              )}
            </p>
          </div>

          {/* Interactive Heatmap Simulator */}
          <div className="p-6 bg-neutral-950/60 border border-white/5 rounded-3xl flex flex-col gap-4 relative overflow-hidden group">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                {lang === 'it' ? "Heatmap Attuale / Frizioni Rilevate" : "Current Heatmap / Detected Frictions"}
              </span>
              <span className="text-[8px] font-mono text-red-500 font-bold uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                CRITIC DROP-OFF ZONE
              </span>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {lang === 'it' 
                ? "L'analisi euristica ha evidenziato un eccesso di elementi promozionali e banner di fidelizzazione inseriti proprio nella schermata di checkout, generando rumore cognitivo e rallentando il caricamento dell'itinerario." 
                : "Heuristic analysis highlighted an excess of promotional elements and loyalty banners placed right in the checkout screen, generating cognitive noise and slowing down itinerary loading."}
            </p>
            
            {/* Blurry Heatmap Simulator Card */}
            <div className="relative h-48 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale blur-[1.5px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=600&auto=format&fit=crop')" }} />
              
              {/* Dynamic Simulated Interactive Hotspots */}
              <div className="relative z-10 w-full h-full flex items-center justify-around">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full bg-red-600/70 blur-md animate-pulse flex items-center justify-center text-white text-[10px] font-mono font-bold">
                    84%
                  </div>
                  <span className="text-[9px] font-mono text-red-400 uppercase">
                    {lang === 'it' ? "Banner Promozionali" : "Promotional Banners"}
                  </span>
                </div>
                
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full bg-orange-500/70 blur-md animate-pulse flex items-center justify-center text-white text-[10px] font-mono font-bold">
                    65%
                  </div>
                  <span className="text-[9px] font-mono text-orange-400 uppercase">
                    {lang === 'it' ? "Input Confusi" : "Confused Inputs"}
                  </span>
                </div>
                
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/60 blur-md animate-pulse flex items-center justify-center text-white text-[10px] font-mono font-bold">
                    42%
                  </div>
                  <span className="text-[9px] font-mono text-yellow-400 uppercase">
                    {lang === 'it' ? "Passaggi Lunghi" : "Long Steps"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Metric Accent */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#9E1C1F]/10 via-[#9E1C1F]/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between aspect-square lg:aspect-auto lg:h-[450px]">
          {/* Subtle glowing badge */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
              UX ASSESSMENT SUMMARY
            </span>
            <span className="text-[9px] font-mono text-[#9E1C1F] font-bold">
              STATUS: AUDIT COMPLETE
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 text-left my-6">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-sans tracking-tight">
              {lang === 'it' ? "PERDITA DI VELOCITÀ SUL CANALE MOBILE." : "LOSS OF SPEED ON MOBILE CHANNEL."}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {lang === 'it' 
                ? "Il checkout mobile registrava un tasso di abbandono anomalo in coincidenza con la selezione delle tariffe accessorie. Riordinare la priorità visiva ha permesso di recuperare conversioni vitali salvaguardando l'esperienza utente premium tipica dei treni Italo." 
                : "The mobile checkout registered an abnormal drop-off rate coinciding with the selection of accessory fares. Reordering visual priority recovered vital conversions while safeguarding the premium user experience typical of Italo trains."}
            </p>
          </div>

          <div className="border-t border-white/5 pt-4 flex gap-3 items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-[10px] font-mono text-neutral-500 uppercase">
              {lang === 'it' ? "Risoluzione mirata delle barriere cognitive" : "Targeted resolution of cognitive barriers"}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PROCESS - STRATEGY & ARCHITECTURE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12 border-t border-white/5">
        <div className="lg:col-span-6 flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9E1C1F] font-bold">03 / The Process</span>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
              {lang === 'it' ? "Oltre i Pixel: Strategia e Architettura." : "Beyond Pixels: Strategy & Architecture."}
            </h2>
            <p className="text-base leading-relaxed text-neutral-300 font-light">
              {lang === 'it' ? (
                <>Un'ottima UI nasce da un'Analisi UX/UI rigorosa. Mappando il viaggio dell'utente ho ricavato l'Insight chiave: <span className="font-semibold text-white">gli utenti volevano prenotare in meno di tre tap</span>. Ho ricostruito l'architettura passando per uno Sviluppo logico basato sui Wireframe, validando ogni passaggio prima di applicare un singolo colore.</>
              ) : (
                <>A great UI is born from a rigorous UX/UI Analysis. By mapping the user journey, I derived the key Insight: <span className="font-semibold text-white">users wanted to book in fewer than three taps</span>. I rebuilt the architecture through a logical Wireframe-based Development, validating each step before applying a single color.</>
              )}
            </p>
          </div>

          {/* Interactive User Flow Selector */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              {lang === 'it' ? "Lo \"Svuotatasche\" del Designer / Architettura di Flusso" : "The Designer's Pocket-Dump / Flow Architecture"}
            </span>
            <div className="bg-neutral-950 rounded-2xl border border-white/5 p-4 flex flex-col gap-2">
              {steps.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-4 rounded-xl flex justify-between items-center text-left transition-all border cursor-pointer ${
                    activeStep === idx 
                      ? 'bg-[#9E1C1F]/10 border-[#9E1C1F] text-white' 
                      : 'bg-black/30 border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#9E1C1F]">{st.title}</span>
                    <span className="text-xs font-bold font-sans uppercase">{st.subtitle}</span>
                    <p className="text-[11px] font-light text-neutral-400 mt-1 leading-relaxed max-w-md">{st.desc}</p>
                  </div>
                  <span className="text-xs font-mono text-neutral-600">{st.coords}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Wireframe Asymmetric Grid */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              {lang === 'it' ? "Sviluppo Schemi a Bassa Fedeltà (Wireframe)" : "Low-Fidelity Schematics Development (Wireframes)"}
            </span>
            <span className="text-[9px] font-mono text-[#9E1C1F] border border-[#9E1C1F]/20 bg-[#9E1C1F]/5 px-2 py-0.5 rounded font-bold uppercase">
              Low-Fi Stage
            </span>
          </div>

          {/* Designer Desk Showcase Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Post-it Note Card */}
            <div className="bg-[#1C1717] border border-[#9E1C1F]/20 p-6 rounded-2xl flex flex-col justify-between aspect-square text-left relative overflow-hidden group hover:border-[#9E1C1F] transition-all">
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono text-[#9E1C1F] tracking-wider uppercase font-bold">INSIGHT #12</span>
                <p className="text-xs font-serif text-neutral-300 italic leading-relaxed">
                  {lang === 'it' 
                    ? '"Troppi passaggi prima del riepilogo. Gli utenti vogliono vedere subito il prezzo finale incluse tasse e supplementi."' 
                    : '"Too many steps before the summary. Users want to see the final price immediately, including taxes and surcharges."'}
                </p>
              </div>
              <span className="text-[8px] font-mono text-neutral-500 uppercase">Desk Research Post-It</span>
            </div>

            {/* User Journey Blueprint Card */}
            <div className="bg-neutral-950 border border-white/5 p-6 rounded-2xl flex flex-col justify-between aspect-square text-left relative overflow-hidden group hover:border-white/10 transition-all">
              {/* Technical grids */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1rem_1rem]" />
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase font-bold">USER FLOW BLUEPRINT</span>
                <div className="flex flex-col gap-1 text-[11px] text-neutral-300 font-mono">
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /><span>{lang === 'it' ? "Ricerca Tratta" : "Route Search"}</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400" /><span>{lang === 'it' ? "Selezione Orario" : "Time Selection"}</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span>{lang === 'it' ? "Checkout Istantaneo" : "Instant Checkout"}</span></div>
                </div>
              </div>
              <span className="text-[8px] font-mono text-neutral-500 uppercase relative z-10">Optimized 3-Tap Sequence</span>
            </div>
          </div>
          
          <p className="text-xs text-neutral-400 leading-relaxed font-light text-left">
            {lang === 'it' 
              ? "Questo approccio metodologico ha garantito la validazione logica dell'esperienza d'uso prima di addentrarsi nella fase di visual design, scongiurando ripensamenti architetturali tardivi e focalizzando gli sforzi sulla purezza dell'interazione finale." 
              : "This methodological approach guaranteed logical validation of the user experience before diving into the visual design phase, preventing late architectural second-guessing and focusing efforts on the purity of the final interaction."}
          </p>
        </div>
      </section>

      {/* SECTION 4: THE SOLUTION - VISUAL DESIGN SYSTEM */}
      <section className="flex flex-col gap-10 pt-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1 flex flex-col gap-2 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9E1C1F] font-bold">04 / The Solution</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
              {lang === 'it' ? "Navigazione Impeccabile, Scalabilità Assoluta." : "Impeccable Navigation, Absolute Scalability."}
            </h2>
            <p className="text-base leading-relaxed text-neutral-300 font-light max-w-3xl">
              {lang === 'it' ? (
                <>La Soluzione è stata l'introduzione di un <span className="font-semibold text-white">Design System proprietario robusto</span>. Utilizzando la tipografia <span className="font-semibold text-white">Instrument Sans</span> per la sua massima leggibilità e i <span className="font-semibold text-white">Material Symbols by Google</span> per icone universali e pulite, ho restituito agli utenti un'app che si naviga a occhi chiusi. Veloce, moderna, inarrestabile.</>
              ) : (
                <>The Solution was the introduction of a <span className="font-semibold text-white">robust proprietary Design System</span>. By using the <span className="font-semibold text-white">Instrument Sans</span> typography for maximum readability and <span className="font-semibold text-white">Material Symbols by Google</span> for clean, universal icons, I gave users an app they can navigate with their eyes closed. Fast, modern, unstoppable.</>
              )}
            </p>
          </div>
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">
            {lang === 'it' ? "Prima / Dopo & UI Kit System" : "Before / After & UI Kit System"}
          </span>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
          
          {/* Interactive comparative slider card (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-mono text-neutral-400 text-left">
              {lang === 'it' ? "Trascina la barra centrale per confrontare il vecchio e il nuovo flusso" : "Drag the center bar to compare the old and new flow"}
            </span>
            
            <div className="relative w-full h-[400px] rounded-[2rem] overflow-hidden border border-white/10 select-none cursor-ew-resize bg-neutral-950 shadow-2xl">
              {/* Before Image */}
              <div className="absolute inset-0 bg-neutral-900 p-6 flex flex-col justify-between text-left">
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/80 border border-white/10 rounded-full text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                  {lang === 'it' ? "BEFORE: Interfaccia Frammentata e Lenta" : "BEFORE: Fragmented and Slow Interface"}
                </div>
                
                <div className="flex flex-col gap-3 mt-12 opacity-60">
                  <div className="bg-black/50 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-red-500 uppercase">{lang === 'it' ? "Avviso" : "Alert"}</span>
                    <span className="text-xs font-bold">{lang === 'it' ? "Inserisci Codice Italo Più per proseguire" : "Enter Italo Più Code to continue"}</span>
                    <div className="w-full h-8 bg-neutral-800 rounded-lg flex items-center px-3 text-[10px] text-neutral-500">
                      {lang === 'it' ? "Form d'inserimento opzionale" : "Optional input form"}
                    </div>
                  </div>
                  <div className="w-full h-10 bg-neutral-800 rounded-lg" />
                  <div className="w-full h-10 bg-neutral-800 rounded-lg" />
                </div>
                <span className="text-[8px] font-mono text-neutral-500 uppercase">
                  {lang === 'it' ? "Processo Multi-Fase Obsoleto" : "Obsolete Multi-Phase Process"}
                </span>
              </div>

              {/* After Slider overlay component */}
              <ItaloBeforeAfterSlider lang={lang} />
            </div>
          </div>

          {/* Design System Moodboard card (Col span 5) */}
          <div className="lg:col-span-5 bg-[#0C0D0C] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between text-left shadow-2xl relative overflow-hidden group">
            {/* Ambient Red Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9E1C1F]/5 blur-3xl rounded-full" />
            
            <div className="flex flex-col gap-4 z-10">
              <span className="text-[9px] font-mono text-[#9E1C1F] tracking-widest uppercase font-bold">
                DIGITAL IDENTITY SYSTEM
              </span>
              <h3 className="text-lg font-black tracking-tight text-white uppercase font-sans">
                ITALO DESIGN SYSTEM SPEC
              </h3>
              
              <div className="h-[1px] bg-white/5 my-1" />
              
              {/* Typography showcase */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono text-neutral-500 uppercase">Typography</span>
                <span className="text-xl font-bold font-sans tracking-tight text-white">Instrument Sans</span>
                <span className="text-[11px] font-mono text-[#9E1C1F] tracking-widest uppercase">Aa Bb Cc Dd Ee Ff 123</span>
              </div>

              <div className="h-[1px] bg-white/5 my-1" />

              {/* Material Symbols icon showcase */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono text-neutral-500 uppercase">Icons (Material Symbols by Google)</span>
                <div className="flex gap-3 text-neutral-300">
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shadow-md">
                    <Compass className="w-5 h-5 text-[#9E1C1F]" />
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shadow-md">
                    <RotateCcw className="w-5 h-5 text-[#9E1C1F]" />
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/5 my-1" />

              {/* Color Swatch Selector */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono text-neutral-500 uppercase">Iconic Palette (Click to Copy)</span>
                <div className="flex gap-2">
                  {[
                    { hex: '#9E1C1F', name: 'Italo Red' },
                    { hex: '#111111', name: 'Carbon' },
                    { hex: '#FFFFFF', name: 'Pure White' }
                  ].map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => handleCopyHex(col.hex)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 border border-white/5 text-[9px] font-mono text-neutral-300 hover:text-white hover:border-[#9E1C1F] transition-all cursor-pointer"
                    >
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0 border border-white/10" style={{ backgroundColor: col.hex }} />
                      <span>{copiedColor === col.hex ? 'COPIED' : col.hex}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 text-[10px] text-neutral-500 mt-6 z-10">
              {lang === 'it' 
                ? "Coerenza e accessibilità visiva secondo lo standard WCAG AAA." 
                : "Consistency and visual accessibility according to WCAG AAA standards."}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: IMPACT & METRICS */}
      <section className="flex flex-col gap-10 pt-12 pb-8 border-t border-white/5 text-left">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9E1C1F] font-bold">05 / Impact & Metrics</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            {lang === 'it' ? "I Numeri della Velocità." : "The Numbers of Speed."}
          </h2>
          <p className="text-sm leading-relaxed text-neutral-400 font-light max-w-2xl mt-1">
            {lang === 'it' ? (
              <>Un design audace non deve solo essere bello da guardare; deve portare risultati misurabili per il business. <span className="italic text-neutral-500">Proiezioni stimate del nuovo flusso ottimizzato:</span></>
            ) : (
              <>A bold design must not only be beautiful to look at; it must bring measurable results for the business. <span className="italic text-neutral-500">Estimated projections of the new optimized flow:</span></>
            )}
          </p>
        </div>

        {/* Counter grid with red highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-white/5 py-8 mt-2">
          
          {/* Block 1 */}
          <div className="flex flex-col gap-2 p-4 bg-neutral-950/40 rounded-2xl border border-white/5 hover:border-[#9E1C1F]/20 transition-all">
            <span className="font-sans font-black tracking-tighter text-5xl sm:text-6xl text-[#9E1C1F] leading-none">
              +<CountUpNumber target={34} suffix="%" />
            </span>
            <span className="text-[11px] font-mono uppercase text-white font-bold tracking-wider mt-1">
              {lang === 'it' ? "Tasso di Conversione Mobile" : "Mobile Conversion Rate"}
            </span>
            <div className="h-[1px] w-8 bg-neutral-700 my-1.5" />
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {lang === 'it' 
                ? "Incremento stimato derivato dalla rimozione delle distrazioni promozionali e dei passaggi non essenziali all'interno dell'imbuto transazionale." 
                : "Estimated increase derived from the removal of promotional distractions and non-essential steps within the transactional funnel."}
            </p>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col gap-2 p-4 bg-neutral-950/40 rounded-2xl border border-white/5 hover:border-[#9E1C1F]/20 transition-all">
            <span className="font-sans font-black tracking-tighter text-5xl sm:text-6xl text-white leading-none">
              -<CountUpNumber target={40} suffix="%" />
            </span>
            <span className="text-[11px] font-mono uppercase text-[#9E1C1F] font-bold tracking-wider mt-1">
              {lang === 'it' ? "Tempo Medio d'Acquisto" : "Average Purchase Time"}
            </span>
            <div className="h-[1px] w-8 bg-neutral-700 my-1.5" />
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {lang === 'it' 
                ? "Forte contrazione delle tempistiche medie di completamento prenotazione grazie all'innovativa architettura lineare integrata One-Tap." 
                : "Significant reduction in average booking completion times thanks to the innovative integrated One-Tap linear architecture."}
            </p>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col gap-2 p-4 bg-neutral-950/40 rounded-2xl border border-white/5 hover:border-[#9E1C1F]/20 transition-all">
            <span className="font-sans font-black tracking-tighter text-5xl sm:text-6xl text-white leading-none">
              -<CountUpNumber target={25} suffix="%" />
            </span>
            <span className="text-[11px] font-mono uppercase text-white font-bold tracking-wider mt-1">
              {lang === 'it' ? "Drop-off nel Checkout" : "Checkout Drop-off"}
            </span>
            <div className="h-[1px] w-8 bg-neutral-700 my-1.5" />
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              {lang === 'it' 
                ? "Riduzione dei rimbalzi e dei carrelli abbandonati nella fase più delicata di inserimento dati passeggero e verifica dei posti a sedere." 
                : "Reduction in bounces and abandoned carts during the most delicate phase of entering passenger data and verifying seat availability."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: FIGMA PROTOTYPE */}
      <section className="flex flex-col items-center justify-center text-center pt-12 pb-12 border-t border-white/5 gap-6 w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-3 max-w-2xl px-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9E1C1F] font-bold">
            {lang === 'it' ? "06 / Prototipo Interattivo" : "06 / Interactive Prototype"}
          </span>
          <h2 id="figma-prototype-title" className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
            {lang === 'it' ? "Italo - Progetto esame finale" : "Italo - Final Exam Project"}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-400 font-light">
            {lang === 'it' 
              ? "Questo è il prototipo interattivo per il mio progetto finale, focalizzato sul redesign dell'esperienza utente per l'app di Italo." 
              : "This is the interactive prototype for my final project, focused on redesigning the user experience for the Italo app."}
          </p>
        </div>

        {/* Figma Iframe Centered Container - Scaled up for full visibility */}
        <div className="w-full flex justify-center items-center mt-2 overflow-hidden">
          <div className="w-full max-w-5xl h-[550px] sm:h-[700px] lg:h-[820px] flex justify-center items-center">
            <iframe 
              id="figma-prototype-iframe"
              style={{ border: "none", width: "100%", height: "100%" }} 
              width="100%" 
              height="100%" 
              src="https://embed.figma.com/proto/itW6BttAowSoBwLm60A802/Italo---Progetto-esame-finale?node-id=2191-3062&scaling=contain&content-scaling=fixed&page-id=115%3A361&starting-point-node-id=2191%3A3062&show-proto-sidebar=0&hide-ui=1&embed-host=share&bg-color=000000" 
              allowFullScreen
            />
          </div>
        </div>
      </section>

    </div>
  );
}
