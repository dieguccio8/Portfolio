import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Ticket, Sparkles } from 'lucide-react';

interface ItaloBeforeAfterSectionProps {
  lang: 'it' | 'en';
}

interface ScreenComparison {
  id: string;
  labelIt: string;
  labelEn: string;
  icon: any;
  oldImg: string;
  newImg: string;
  titleIt: string;
  titleEn: string;
  descIt: string;
  descEn: string;
  highlightsIt: string[];
  highlightsEn: string[];
}

export default function ItaloBeforeAfterSection({ lang }: ItaloBeforeAfterSectionProps) {
  const screens: ScreenComparison[] = [
    {
      id: 'home',
      labelIt: 'Home',
      labelEn: 'Home',
      icon: Home,
      oldImg: 'home.png',
      newImg: 'Home.jpg',
      titleIt: 'Home Screen & Prenotazione Rapida',
      titleEn: 'Home Screen & Quick Booking',
      descIt: 'Riorganizzazione visiva radicale: la ricerca rapida è posta in primo piano, con un widget pulito che semplifica la selezione delle tratte e l\'accesso immediato all\'ultimo viaggio acquistato.',
      descEn: 'Radical visual reorganization: quick search is brought front and center with a streamlined widget that eases station inputs and provides immediate access to upcoming bookings.',
      highlightsIt: [
        'Gerarchia visiva focalizzata sulla ricerca del viaggio',
        'Visualizzazione dinamica del biglietto attivo e stato treno in tempo reale',
        'Eliminazione degli elementi decorativi superflui per la massima leggibilità'
      ],
      highlightsEn: [
        'Visual hierarchy focused on immediate trip booking',
        'Dynamic active ticket card with live train status',
        'Elimination of extraneous decorative elements for optimal legibility'
      ]
    },
    {
      id: 'cerca',
      labelIt: 'Cerca Biglietto',
      labelEn: 'Search Route',
      icon: Search,
      oldImg: 'cerca_biglietto.png',
      newImg: 'Cerca.jpg',
      titleIt: 'Selezione Tratta & Parametri di Viaggio',
      titleEn: 'Route Selection & Travel Parameters',
      descIt: 'Il modulo di ricerca passa da un modulo statico a un\'interfaccia conversazionale e touch-friendly, con selezione stazioni fluida e filtri intelligenti per andata e ritorno.',
      descEn: 'The search form transitions from a static layout into an intuitive touch-first UI with smart station auto-completion and seamless round-trip selectors.',
      highlightsIt: [
        'Input stazioni ottimizzato con cronologia delle ricerche frequenti',
        'Selettore data con calendario interattivo e prezzi minimi in anteprima',
        'Controllo immediato del numero di passeggeri e sconti attivi'
      ],
      highlightsEn: [
        'Optimized station inputs with frequent travel history',
        'Date picker with interactive calendar previewing lowest daily fares',
        'Instant passenger count and promotion code validation'
      ]
    },
    {
      id: 'biglietti',
      labelIt: 'Scegli Biglietto',
      labelEn: 'Select Ticket',
      icon: Ticket,
      oldImg: 'scegli_biglietto.png',
      newImg: 'Biglietti.jpg',
      titleIt: 'Risultati di Ricerca & Tariffe',
      titleEn: 'Search Results & Travel Tariffs',
      descIt: 'Trasparenza totale sui prezzi: i viaggi disponibili sono organizzati in card orarie ad alto contrasto con chiara distinzione delle classi di viaggio (Smart, Prima, Club Executive).',
      descEn: 'Total fare transparency: available trains are categorized into high-contrast timeline cards clearly distinguishing Italo travel classes (Smart, Prima, Club Executive).',
      highlightsIt: [
        'Confronto orizzontale istantaneo delle classi e delle condizioni di rimborso',
        'Visualizzazione chiara della durata di viaggio e delle coincidenze',
        'Badge distintivo per la tariffa più economica disponibile sul treno'
      ],
      highlightsEn: [
        'Instant horizontal comparison of travel classes and refund rules',
        'Clear display of travel duration, train code, and connections',
        'Prominent badge highlighting the lowest available fare'
      ]
    },
    {
      id: 'offerte',
      labelIt: 'Offerte',
      labelEn: 'Offers',
      icon: Sparkles,
      oldImg: 'offerte.png',
      newImg: 'Offerte.jpg',
      titleIt: 'Offerte & Vantaggi Italo Più',
      titleEn: 'Offers & Italo Più Perks',
      descIt: 'La sezione promozionale si trasforma in un hub premiante: card visive con immagini aspirazionali, codici sconto applicabili con un tocco e integrazione con il programma fedeltà.',
      descEn: 'The promotional section evolves into a rewarding hub: visual editorial cards, one-tap coupon code redemption, and seamless loyalty program integration.',
      highlightsIt: [
        'Card promozionali fotografiche con payoff accattivanti e chiari',
        'Saldo punti Italo Più sempre visibile e progress bar verso il livello successivo',
        'Pulsante rapido per applicare il codice sconto direttamente alla ricerca'
      ],
      highlightsEn: [
        'Photographic promo cards with compelling, transparent value propositions',
        'Italo Più points balance always visible with level progression bar',
        'One-tap button to apply promo codes directly to search parameters'
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<string>('home');
  const activeScreen = screens.find((s) => s.id === activeTab) || screens[0];

  const oldBasePath = `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/old/`;
  const newBasePath = `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/new/`;

  return (
    <section className="w-full relative z-20 py-20 sm:py-28 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/5">
      {/* Section Title Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans text-center">
          {lang === 'it' ? 'Prima & Dopo' : 'Before & After'}
        </h2>
        <div className="w-12 h-1 bg-[#B50D3A] mt-1 rounded-full" />
      </div>

      {/* Horizontal Capsule Tab Menu */}
      <div className="flex justify-center w-full mb-14 sm:mb-18">
        <div className="flex bg-[#121315] border border-white/10 p-1.5 rounded-2xl shrink-0 shadow-2xl relative w-fit max-w-full overflow-x-auto scrollbar-none transform-gpu">
          {screens.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 whitespace-nowrap uppercase cursor-pointer ${
                  isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-before-after-tab-bg"
                    className="absolute inset-0 bg-[#B50D3A] rounded-xl shadow-[0_0_20px_rgba(181,13,58,0.4)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {lang === 'it' ? tab.labelIt : tab.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full flex flex-col gap-12 sm:gap-16 items-center transform-gpu"
        >
          {/* Side-by-Side Comparison Mockups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 w-full max-w-3xl justify-items-center items-start transform-gpu">
            
            {/* Left Card: PRIMA (Old Design) */}
            <div className="flex flex-col items-center gap-4 w-full max-w-[230px] sm:max-w-[260px] md:max-w-[280px]">
              {/* Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[11px] sm:text-xs font-mono tracking-wider uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                {lang === 'it' ? 'Prima / Vecchia App' : 'Before / Legacy App'}
              </div>

              {/* Phone Frame */}
              <div className="w-full rounded-[2.2rem] bg-gradient-to-b from-neutral-800/90 via-neutral-900 to-black p-2 sm:p-2.5 border border-white/10 shadow-xl relative overflow-hidden transform-gpu">
                <div className="w-full rounded-[1.8rem] overflow-hidden bg-neutral-950 aspect-[504/1092] flex items-center justify-center">
                  <img
                    src={`${oldBasePath}${activeScreen.oldImg}`}
                    alt={`${activeScreen.labelIt} - Prima`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Right Card: DOPO (New Redesign) */}
            <div className="flex flex-col items-center gap-4 w-full max-w-[230px] sm:max-w-[260px] md:max-w-[280px]">
              {/* Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B50D3A]/20 border border-[#B50D3A]/50 text-white text-[11px] sm:text-xs font-mono tracking-wider uppercase font-semibold shadow-[0_0_15px_rgba(181,13,58,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B50D3A] animate-pulse" />
                {lang === 'it' ? 'Dopo / Nuovo Redesign' : 'After / Redesign'}
              </div>

              {/* Phone Frame with Red Neon Border */}
              <div className="w-full rounded-[2.2rem] bg-gradient-to-b from-neutral-800/90 via-neutral-900 to-black p-2 sm:p-2.5 border border-[#B50D3A]/50 shadow-[0_0_30px_rgba(181,13,58,0.18)] relative overflow-hidden transform-gpu">
                <div className="w-full rounded-[1.8rem] overflow-hidden bg-neutral-950 aspect-[393/852] flex items-center justify-center">
                  <img
                    src={`${newBasePath}${activeScreen.newImg}`}
                    alt={`${activeScreen.labelIt} - Dopo`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </AnimatePresence>
    </section>
  );
}
