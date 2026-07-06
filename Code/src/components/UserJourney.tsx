import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  MessageSquare, 
  AlertTriangle, 
  Lightbulb, 
  Globe, 
  QrCode, 
  Smartphone, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';

interface JourneyStep {
  phase: string;
  action: string;
  thought: string;
  painPoint: string | string[];
  opportunity: string;
  channel: string;
}

interface UserJourneyProps {
  projectId?: string;
  lang?: 'it' | 'en';
}

export default function UserJourney({ projectId = 'aetheris', lang = 'it' }: UserJourneyProps) {
  const [activeTab, setActiveTab] = useState<'prima' | 'dopo'>('prima');
  const isAetheris = projectId === 'aetheris';

  // Theme configuration based on the active project
  const accentColorHex = isAetheris ? '#2E8B3A' : '#E8302A';
  const borderClass = isAetheris ? 'border-[#2E8B3A]/25' : 'border-[#E8302A]/25';
  const hoverBorderClass = isAetheris ? 'hover:border-[#2E8B3A]/30' : 'hover:border-[#E8302A]/30';
  const textAccentClass = isAetheris ? 'text-[#2E8B3A]' : 'text-[#E8302A]';
  const activeBgClass = isAetheris ? 'bg-[#2E8B3A]/20 border-[#2E8B3A]/30' : 'bg-[#E8302A]/20 border-[#E8302A]/30';
  const glowBgClass = isAetheris ? 'bg-[#2E8B3A]/10' : 'bg-[#E8302A]/10';

  // Journey data for "Prima" (Before)
  const primaSteps: JourneyStep[] = isAetheris ? [
    {
      phase: lang === 'it' ? 'Pianificazione e orientamento iniziale' : 'Planning and initial orientation',
      action: lang === 'it' ? 'Consultare tutte le informazioni su internet prima di arrivare per riuscire ad orientarmi.' : 'Consulting all information on the internet before arriving to find my way.',
      thought: lang === 'it' ? 'Chissà dove devo andare per trovare la pianta che cerco...' : 'I wonder where I need to go to find the plant I am looking for...',
      painPoint: lang === 'it' ? [
        'Mancanza di una mappa che mostri i possibili percorsi nell’orto.',
        'Mancanza di un percorso che mi guidi.'
      ] : [
        'Lack of a map showing the possible paths in the garden.',
        'Lack of a path to guide me.'
      ],
      opportunity: lang === 'it' ? 'Una mappa da poter consultare direttamente all’arrivo.' : 'A map that can be consulted directly upon arrival.',
      channel: lang === 'it' ? 'Sito web' : 'Website'
    },
    {
      phase: lang === 'it' ? 'Esplorazione e approfondimento' : 'Exploration and deep-dive',
      action: lang === 'it' ? 'Entrare a conoscenza di nuove specie di piante e raccogliere dati utili per la propria ricerca universitaria.' : 'Discovering new plant species and gathering useful data for university research.',
      thought: lang === 'it' ? 'Speravo di trovare molte più informazioni approfondite e dettagliate...' : 'I hoped to find much more deep and detailed information...',
      painPoint: lang === 'it' ? [
        'Scarsità di pannelli informativi che comporta poche informazioni disponibili per portare a termine la ricerca.'
      ] : [
        'Scarcity of informative panels, leading to little information available to complete the research.'
      ],
      opportunity: lang === 'it' ? 'Cartellini segnaletici delle piante con informazioni chiare e dettagliate per ogni singola pianta.' : 'Plant identification signs with clear and detailed information for each plant.',
      channel: lang === 'it' ? 'Segnaletica' : 'Signage'
    }
  ] : [
    {
      phase: lang === 'it' ? 'Ricerca e scoperta delle opere' : 'Research and discovery of artworks',
      action: lang === 'it' ? 'Cerca su blog di viaggio o Instagram spot di street art prima di arrivare in città.' : 'Searching for street art spots on travel blogs or Instagram before arriving in the city.',
      thought: lang === 'it' ? 'Chissà se questi murales esistono ancora e come faccio a raggiungerli...' : 'I wonder if these murals still exist and how to reach them...',
      painPoint: lang === 'it' ? [
        'Informazioni estremamente frammentate online.',
        'Coordinate GPS spesso inesistenti o del tutto errate.'
      ] : [
        'Extremely fragmented information online.',
        'GPS coordinates are often non-existent or completely wrong.'
      ],
      opportunity: lang === 'it' ? 'Un database centralizzato con localizzazione verificata e schede storiche delle opere.' : 'A centralized database with verified localization and historical cards for the artworks.',
      channel: lang === 'it' ? 'Social media & Blog' : 'Social media & Blogs'
    },
    {
      phase: lang === 'it' ? 'Esplorazione fisica sul posto' : 'Physical exploration on-site',
      action: lang === 'it' ? 'Cammina per i vicoli della città alla ricerca del murale, sperando di trovarlo e capire chi sia l’autore.' : 'Walking through city alleys searching for the mural, hoping to find it and understand who the artist is.',
      thought: lang === 'it' ? 'Il murale è maestoso, ma chi lo ha dipinto? Che cosa rappresenta questo stile?' : 'The mural is majestic, but who painted it? What does this style represent?',
      painPoint: lang === 'it' ? [
        'Nessuna targa esplicativa vicino alle opere, lasciando il visitatore privo di qualsiasi contesto storico o artistico.'
      ] : [
        'No explanatory plaque near the artworks, leaving the visitor without any historical or artistic context.'
      ],
      opportunity: lang === 'it' ? 'Integrazione di QR code e schede digitali geolocalizzate per accedere all’istante alla storia dell’opera.' : 'Integration of QR codes and geolocated digital cards to instantly access the history of the artwork.',
      channel: lang === 'it' ? 'Fruizione fisica' : 'Physical enjoyment'
    }
  ];

  // Journey data for "Dopo" (After)
  const dopoSteps: JourneyStep[] = isAetheris ? [
    {
      phase: lang === 'it' ? 'Pianificazione e orientamento iniziale' : 'Planning and initial orientation',
      action: lang === 'it' ? 'Entra e si dirige verso il totem per pianificare il suo percorso, scansionando il QR code per orientarsi tramite la guida sul telefono.' : 'Enters and heads toward the totem kiosk to plan her route, scanning the QR code to orient herself with the mobile guide.',
      thought: lang === 'it' ? 'Posso esplorare le varie zone dell’orto senza problemi e con estrema facilità!' : 'I can explore different areas of the garden smoothly and with ease!',
      painPoint: lang === 'it' ? [
        'Mirella pianifica di andare in una specifica zona, ma scopre solo una volta arrivata che è chiusa per cure botaniche.'
      ] : [
        'Mirella plans to go to a specific area, but only finds out upon arrival that it is closed for botanical care.'
      ],
      opportunity: lang === 'it' ? 'Inserire avvisi dinamici nella pianificazione iniziale sulla disponibilità o accessibilità delle singole aree dell’orto.' : 'Add dynamic alerts in the initial planning about the availability or accessibility of individual garden areas.',
      channel: lang === 'it' ? 'Totem digitale all’ingresso' : 'Digital totem kiosk at the entrance'
    },
    {
      phase: lang === 'it' ? 'Esplorazione e approfondimento' : 'Exploration and deep-dive',
      action: lang === 'it' ? 'Conoscere nuove specie di piante scansionando il QR code presente nei cartellini o cliccando sulla mappa interattiva.' : 'Learning about new plant species by scanning the QR code on the cards or clicking on the interactive map.',
      thought: lang === 'it' ? 'Posso muovermi in completa autonomia e trovare tutto ciò che mi serve a portata di mano!' : 'I can move around completely independently and find everything I need at my fingertips!',
      painPoint: lang === 'it' ? [
        'Perdersi una pianta rara lungo il percorso che potrebbe risultare molto interessante.'
      ] : [
        'Missing a rare plant along the way that could have been very interesting.'
      ],
      opportunity: lang === 'it' ? 'Notifiche di prossimità sulla Web App ("Sei vicino alla pianta rara X").' : 'Proximity notifications on the Web App ("You are close to rare plant X").',
      channel: lang === 'it' ? 'Cartellino identificativo della pianta con scansione del codice QR' : 'Plant ID tag with QR code scan'
    }
  ] : [
    {
      phase: lang === 'it' ? 'Pianificazione e orientamento iniziale' : 'Planning and initial orientation',
      action: lang === 'it' ? 'Usa la mappa interattiva sul telefono per selezionare un itinerario d’arte urbana nel quartiere San Berillo di Catania.' : 'Uses the interactive map on his phone to select an urban art itinerary in the San Berillo district of Catania.',
      thought: lang === 'it' ? 'Posso vedere in anticipo il percorso, il tempo stimato e le opere principali!' : 'I can see the route, estimated time, and key artworks in advance!',
      painPoint: lang === 'it' ? [
        'Alcune opere murali potrebbero essere state rimosse o vandalizzate di recente senza che sia segnalato.'
      ] : [
        'Some murals might have been removed or vandalized recently without being reported.'
      ],
      opportunity: lang === 'it' ? 'Segnalazioni in tempo reale da parte della community e aggiornamenti dinamici sullo stato dell’opera.' : 'Real-time reporting by the community and dynamic updates on the artwork status.',
      channel: lang === 'it' ? 'Mappa interattiva' : 'Interactive map'
    },
    {
      phase: lang === 'it' ? 'Esplorazione e approfondimento' : 'Exploration and deep-dive',
      action: lang === 'it' ? 'Arriva di fronte al murale e scansiona il QR code o sblocca la scheda geolocalizzata per approfondire.' : 'Arrives in front of the mural and scans the QR code or unlocks the geolocated card to dive deeper.',
      thought: lang === 'it' ? 'Fantastico, posso ascoltare l’audio-guida registrata direttamente dall’artista e vedere le foto del making-of!' : 'Awesome, I can listen to the audio guide recorded directly by the artist and see backstage photos!',
      painPoint: lang === 'it' ? [
        'La connessione dati potrebbe essere instabile o assente in alcuni vicoli interni molto stretti.'
      ] : [
        'The data connection might be unstable or non-existent in some very narrow inner alleys.'
      ],
      opportunity: lang === 'it' ? 'Sviluppare una modalità offline per scaricare l’itinerario e i contenuti audio in anticipo.' : 'Develop an offline mode to download the itinerary and audio content in advance.',
      channel: lang === 'it' ? 'Audio-guida & Scheda opera' : 'Audio guide & Artwork card'
    }
  ];

  const steps = activeTab === 'prima' ? primaSteps : dopoSteps;

  const isKinetics = projectId === 'kinetics';

  const content = (
    <>
      {/* Background radial gradients that animate/change depending on the tab */}
      {!isKinetics && (
        <div className="absolute inset-0 pointer-events-none transition-all duration-700">
          {activeTab === 'prima' ? (
            <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 via-transparent to-transparent opacity-40" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-b from-${isAetheris ? '[#2E8B3A]' : '[#E8302A]'}/10 via-transparent to-transparent opacity-40`} />
          )}
        </div>
      )}

      {/* Header Info */}
      {!isKinetics && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 relative z-10">
          <div className="flex flex-col gap-1.5">
            <span className={`text-[10px] font-mono uppercase tracking-widest ${textAccentClass} font-bold`}>
              {lang === 'it' ? '06 / Esperienza' : '06 / Experience'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">User Journey Map</h2>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 font-light max-w-2xl">
              {lang === 'it' 
                ? `L'evoluzione del viaggio dell'utente ${isAetheris ? 'Mirella' : 'Matteo'}, mettendo a confronto l'esperienza d'uso tradizionale priva di supporti con la nuova esperienza abilitata da ${isAetheris ? '"Bussola Verde"' : '"Urban StreetArt Sicily"'}.` 
                : `The evolution of the user journey of ${isAetheris ? 'Mirella' : 'Matteo'}, comparing the traditional unsupported user experience with the new experience enabled by ${isAetheris ? '"Bussola Verde"' : '"Urban StreetArt Sicily"'}.`}
            </p>
          </div>

          {/* Dynamic Interactive Switcher */}
          <div className="flex bg-[#0C0D0C] border border-white/5 p-1 rounded-2xl shrink-0 self-start md:self-auto shadow-inner relative">
            <button
              onClick={() => setActiveTab('prima')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 relative z-10 ${
                activeTab === 'prima' ? 'text-rose-200' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'prima' && (
                <motion.div
                  layoutId="active-journey-bg"
                  className="absolute inset-0 bg-rose-950/40 border border-rose-900/30 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative font-semibold">{lang === 'it' ? 'Prima (As-Is)' : 'Before (As-Is)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('dopo')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 relative z-10 ${
                activeTab === 'dopo' ? (isAetheris ? 'text-emerald-200' : 'text-rose-200') : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'dopo' && (
                <motion.div
                  layoutId="active-journey-bg"
                  className={`absolute inset-0 ${activeBgClass} rounded-xl`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative font-semibold font-sans">
                {lang === 'it' 
                  ? `Dopo (${isAetheris ? 'Bussola Verde' : 'StreetArt App'})` 
                  : `After (${isAetheris ? 'Bussola Verde' : 'StreetArt App'})`}
              </span>
            </button>
          </div>
        </div>
      )}

      {isKinetics && (
        <div className="flex justify-between items-center border-b border-white/5 pb-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-[#E8302A] font-bold">
            {lang === 'it' ? 'Fasi di Esperienza di Matteo' : "Matteo's Experience Phases"}
          </span>
          <div className="flex bg-[#0C0D0C] border border-white/5 p-1 rounded-2xl shrink-0 shadow-inner relative">
            <button
              onClick={() => setActiveTab('prima')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 relative z-10 ${
                activeTab === 'prima' ? 'text-rose-200 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'prima' && (
                <motion.div
                  layoutId="active-journey-bg-kinetics-tab"
                  className="absolute inset-0 bg-[#E8302A]/20 border border-[#E8302A]/40 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{lang === 'it' ? 'Prima (As-Is)' : 'Before (As-Is)'}</span>
            </button>
            <button
              onClick={() => setActiveTab('dopo')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 relative z-10 ${
                activeTab === 'dopo' ? 'text-[#E8302A] font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'dopo' && (
                <motion.div
                  layoutId="active-journey-bg-kinetics-tab"
                  className="absolute inset-0 bg-[#E8302A]/20 border border-[#E8302A]/40 rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{lang === 'it' ? 'Dopo (StreetArt App)' : 'After (StreetArt App)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Header with Emoji Face Card */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center gap-6 shadow-md transition-all ${
              activeTab === 'prima' 
                ? 'bg-rose-950/15 border-rose-900/30' 
                : isAetheris ? 'bg-[#2E8B3A]/10 border-[#2E8B3A]/20' : 'bg-[#E8302A]/10 border-[#E8302A]/20'
            }`}
          >
            {/* 3D-styled SVG Emoji */}
            <div className="shrink-0">
              {activeTab === 'prima' ? (
                /* Sad Emoji representation */
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                  <circle cx="42" cy="42" r="38" fill="url(#sad-grad-bg)" stroke="#8C5C60" strokeWidth="1.5" />
                  {/* Eyes */}
                  <circle cx="31" cy="35" r="4" fill="#F4E8EA" />
                  <circle cx="53" cy="35" r="4" fill="#F4E8EA" />
                  {/* Sad Mouth */}
                  <path d="M 28 55 Q 42 43 56 55" stroke="#F4E8EA" strokeWidth="4" strokeLinecap="round" fill="none" />
                  
                  {/* Gradients */}
                  <defs>
                    <radialGradient id="sad-grad-bg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30 25) rotate(55) scale(60)">
                      <stop offset="0%" stopColor="#C2868A" />
                      <stop offset="50%" stopColor="#9C5E62" />
                      <stop offset="100%" stopColor="#733D41" />
                    </radialGradient>
                  </defs>
                </svg>
              ) : (
                /* Happy Emoji representation */
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                  <circle cx="42" cy="42" r="38" fill="url(#happy-grad-bg)" stroke={isAetheris ? "#1F4733" : "#5C1E21"} strokeWidth="1.5" />
                  {/* Eyes */}
                  <circle cx="31" cy="35" r="4" fill="#EDF9F2" />
                  <circle cx="53" cy="35" r="4" fill="#EDF9F2" />
                  {/* Happy Mouth */}
                  <path d="M 28 47 Q 42 62 56 47" stroke="#EDF9F2" strokeWidth="4" strokeLinecap="round" fill="none" />
                  
                  {/* Gradients */}
                  <defs>
                    <radialGradient id="happy-grad-bg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30 25) rotate(55) scale(60)">
                      <stop offset="0%" stopColor={isAetheris ? "#41AA6D" : "#FF6B6B"} />
                      <stop offset="50%" stopColor={isAetheris ? "#2E8B3A" : "#E8302A"} />
                      <stop offset="100%" stopColor={isAetheris ? "#1E5C25" : "#8A1E22"} />
                    </radialGradient>
                  </defs>
                </svg>
              )}
            </div>

            <div className="flex flex-col gap-1.5 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white tracking-tight font-sans">
                User Journey <span className={activeTab === 'prima' ? 'text-rose-400 font-semibold' : (isAetheris ? 'text-emerald-400' : 'text-rose-400') + ' font-semibold'}>{activeTab === 'prima' ? (lang === 'it' ? 'Prima' : 'Before') : (lang === 'it' ? 'Dopo' : 'After')}</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-300 font-light">
                {activeTab === 'prima' 
                  ? (isAetheris 
                      ? (lang === 'it' ? "Senza strumenti dedicati, la visita è penalizzata da un senso di disorientamento, barriere di reperimento informazioni e carenza di approfondimenti durante la permanenza all'Orto." : "Without dedicated tools, the visit is penalized by disorientation, information retrieval barriers, and a lack of deep insights during the stay at the Garden.")
                      : (lang === 'it' ? "Senza strumenti dedicati, l'appassionato d'arte si muove in modo frammentato, spesso perdendo i murales più iconici a causa di coordinate errate o mancanza di contesto." : "Without dedicated tools, the art lover moves in a fragmented way, often missing the most iconic murals due to incorrect coordinates or lack of context."))
                  : (isAetheris
                      ? (lang === 'it' ? "Grazie a Bussola Verde e alla segnaletica IoT, l'esperienza viene potenziata in ogni istante: Mirella è autonoma, guidata ed ha accesso immediato alla conoscenza botanica." : "Thanks to Bussola Verde and IoT signage, the experience is enhanced at every moment: Mirella is autonomous, guided, and has instant access to botanical knowledge.")
                      : (lang === 'it' ? "Grazie a Urban StreetArt Sicily, la città si trasforma in un museo interattivo all'aperto: Matteo naviga con percorsi ottimizzati e approfondisce la storia di ogni murale in tempo reale." : "Thanks to Urban StreetArt Sicily, the city transforms into an interactive open-air museum: Matteo navigates with optimized itineraries and learns the history of each mural in real time."))
                }
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Grid Flow containing phases */}
      <div className="flex flex-col gap-10 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`p-6 sm:p-8 rounded-[2rem] border bg-[#1A1D1B]/30 border-white/5 relative flex flex-col gap-6 group ${hoverBorderClass} transition-all shadow-sm`}
              >
                {/* Horizontal flow line or badge representation */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      activeTab === 'prima' 
                        ? 'bg-rose-950/20 text-rose-300 border border-rose-900/40' 
                        : isAetheris ? 'bg-[#2E8B3A]/20 text-emerald-300 border border-[#2E8B3A]/40' : 'bg-[#E8302A]/20 text-rose-300 border border-[#E8302A]/40'
                    }`}>
                      {idx + 1}
                    </span>
                    <h4 className="text-lg font-bold text-white font-sans tracking-tight">
                      {step.phase}
                    </h4>
                  </div>
                  
                  {/* Channel tag */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Canale d'uso:</span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wide font-medium ${
                      activeTab === 'prima' 
                        ? 'bg-rose-950/20 text-rose-300 border border-rose-900/40' 
                        : isAetheris ? 'bg-[#2E8B3A]/20 text-emerald-300 border border-[#2E8B3A]/40' : 'bg-[#E8302A]/20 text-rose-300 border border-[#E8302A]/40'
                    }`}>
                      {activeTab === 'prima' ? (
                        idx === 0 ? <Globe className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />
                      ) : (
                        idx === 0 ? <Smartphone className="w-3.5 h-3.5" /> : <QrCode className="w-3.5 h-3.5" />
                      )}
                      {step.channel}
                    </span>
                  </div>
                </div>

                {/* Grid layout for steps content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                  
                  {/* Step 1: Goal / Action */}
                  <div className="p-4 rounded-2xl bg-[#0C0D0C]/40 border border-white/5 flex flex-col gap-3 shadow-sm hover:bg-[#0C0D0C]/60 transition-all">
                    <div className={`flex items-center gap-2 ${isAetheris ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <Target className="w-4 h-4" />
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                        {lang === 'it' ? 'Azione & Obiettivo' : 'Action & Goal'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-300 font-light">
                      {step.action}
                    </p>
                  </div>

                  {/* Step 2: Thought */}
                  <div className="p-4 rounded-2xl bg-[#0C0D0C]/40 border border-white/5 flex flex-col gap-3 shadow-sm hover:bg-[#0C0D0C]/60 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-900/[0.02] rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-2 text-neutral-400">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                        {lang === 'it' ? "Pensiero dell'Utente" : "User's Thought"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] italic leading-relaxed text-neutral-300 font-light pl-2 border-l border-white/10">
                      “{step.thought}”
                    </p>
                  </div>

                  {/* Step 3: Pain Point / Friction */}
                  <div className={`p-4 rounded-2xl border flex flex-col gap-3 shadow-sm transition-all ${
                    activeTab === 'prima' 
                      ? 'bg-rose-950/15 border-rose-900/30 hover:border-rose-900/40' 
                      : 'bg-amber-950/15 border-amber-900/30 hover:border-amber-900/40'
                  }`}>
                    <div className={`flex items-center gap-2 ${activeTab === 'prima' ? 'text-rose-400' : 'text-amber-400'}`}>
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                        {lang === 'it' ? 'Fattore di Attrito' : 'Friction Factor'}
                      </span>
                    </div>
                    {Array.isArray(step.painPoint) ? (
                      <ul className="flex flex-col gap-2">
                        {step.painPoint.map((p, i) => (
                          <li key={i} className="text-xs sm:text-[13px] leading-relaxed text-neutral-300 font-light flex items-start gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${activeTab === 'prima' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-300 font-light">
                        {step.painPoint}
                      </p>
                    )}
                  </div>

                  {/* Step 4: Opportunity / Solution */}
                  <div className={`p-4 rounded-2xl border flex flex-col gap-3 shadow-sm transition-all ${
                    activeTab === 'prima' 
                      ? 'bg-amber-950/15 border-amber-900/30 hover:border-amber-900/40' 
                      : isAetheris ? 'bg-[#2E8B3A]/10 border-[#2E8B3A]/20 hover:border-[#2E8B3A]/30' : 'bg-[#E8302A]/10 border-[#E8302A]/20 hover:border-[#E8302A]/30'
                  }`}>
                    <div className={`flex items-center gap-2 ${activeTab === 'prima' ? 'text-amber-400' : isAetheris ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {activeTab === 'prima' ? <Lightbulb className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                        {activeTab === 'prima' 
                          ? (lang === 'it' ? 'Opportunità Correlata' : 'Related Opportunity') 
                          : (lang === 'it' ? 'Soluzione Digitale' : 'Digital Solution')}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-300 font-light">
                      {step.opportunity}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );

  if (isKinetics) {
    return (
      <div className="flex flex-col gap-8 relative" id="user-journey-section">
        {content}
      </div>
    );
  }

  return (
    <div className={`bg-[#131514] border ${borderClass} rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col gap-8 relative shadow-xl overflow-hidden`} id="user-journey-section">
      {content}
    </div>
  );
}
