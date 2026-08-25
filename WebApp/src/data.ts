import { Project, SkillGroup } from './types.ts';

export const PROJECTS: Project[] = [
  {
    id: 'aetheris',
    title: 'Orto Botanico',
    category: 'Ecosistema digitale per migliorare l\'esplorazione dell\'Orto Botanico di Catania',
    year: '2024',
    description: 'Un sistema web immersivo e focalizzato sulla fluidità tipografica, progettato per l\'Orto Botanico universitario. Navigazione tra specie rare ed ecosistemi.',
    longDescription: 'Il progetto Orto Botanico nasce con l\'intento di digitalizzare l\'immenso patrimonio botanico storico, trasformandolo in un\'esperienza web interattiva fruibile sia da remoto sia in loco tramite QR code. Abbiamo progettato un archivio vivente, in cui la fluidità visiva si unisce al rigore scientifico, offrendo ai visitatori un viaggio immersivo tra piante secolari, serre calde ed erbari d\'epoca.',
    challenge: 'La sfida principale risiedeva nel rendre accessibile e accattivante un enorme database scientifico ad un pubblico eterogeneo (studenti, turisti, appassionati). Era fondamentale evitare la pesantezza tipica dei portali accademici, garantendo al contempo la massima accuratezza tassonomica e prestazioni impeccabili anche su dispositivi mobili all\'interno del giardino.',
    solution: 'Abbiamo sviluppato un\'interfaccia "organic fluid" dominata da una tipografia elegante e micro-animazioni ispirate ai cicli della natura. La navigazione è divisa in "Serre", "Ecosistemi" e "Specie Rare". Grazie a una mappa interattiva georeferenziata e percorsi guidati a tema (es. Piante Succulente, Piante Officinali), l\'utente può esplorare il parco in modo dinamico e interattivo.',
    client: 'Orto Botanico di Catania',
    role: 'UX/UI & Visual, Frontend',
    heroImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop',
    colorPalette: [
      { hex: '#0D2E27', name: 'Deep Forest Green' },
      { hex: '#E2F3EE', name: 'Fresh Eucalyptus' },
      { hex: '#E8302A', name: 'Catania Lava' }
    ],
    typography: 'Playfair Display (Serif d\'impatto per titoli) & Inter (Leggibilità scientifica per testi)',
    tags: ['React', 'Typography-First', 'Interactive Flow', 'Tailwind']
  },
  {
    id: 'kinetics',
    title: 'Urban StreetArt Sicily',
    category: 'Cultural Heritage Mapping & Branding',
    year: '2025',
    description: 'Mappatura interattiva e identità visiva per le opere di street art in Sicilia. Un layout brutale e geometrico per valorizzare l\'arte urbana contemporanea.',
    longDescription: 'Urban StreetArt Sicily è una piattaforma digitale e identità visiva dedicata alla catalogazione, localizzazione e valorizzazione del muralismo contemporaneo in Sicilia. Dai silos del porto di Catania ai vicoli di Palermo, l\'applicazione funge da museo a cielo aperto, guidando l\'utente attraverso itinerari urbani e interviste esclusive con gli artisti internazionali.',
    challenge: 'Unire l\'anima spontanea e "ruvida" della street art con un design system solido, geometrico e altamente navigabile. Il sistema doveva supportare caricamenti rapidi di fotografie ad alta risoluzione e consentire agli utenti di orientarsi facilmente tra i quartieri popolari siciliani.',
    solution: 'Un design system ispirato all\'estetica brutalista e industriale, caratterizzato da griglie geometriche marcate, contrasti elevati e coordinate geografiche reali. Abbiamo integrato un sistema di geolocalizzazione live che genera itinerari artistici personalizzati e un archivio fotografico ad altissima risoluzione con schede informative dedicate alle storie dietro ogni murale.',
    client: 'Sicilia Musei & Associazione Culturale StreetArt',
    role: 'Visual Designer, UI Architect',
    heroImage: 'https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?q=80&w=1200&auto=format&fit=crop',
    colorPalette: [
      { hex: '#000000', name: 'Absolute Dark' },
      { hex: '#FFCC00', name: 'Industrial Amber' },
      { hex: '#E8302A', name: 'Lava Flare' }
    ],
    typography: 'Space Grotesk (Brutalismo geometrico) & JetBrains Mono (Coordinate e metadati)',
    tags: ['Next.js', 'Performance Metrics', 'Clean Data', 'Geometrics']
  },
  {
    id: 'chronos',
    title: 'Italo Treni',
    category: 'High-Performance Interface Concept',
    year: '2025',
    description: 'Concept di interfaccia per la prenotazione rapida di treni ad alta velocità. Ottimizzazione dei flussi transazionali ed elevata accessibilità visiva.',
    longDescription: 'Un radicale redesign concettuale dell\'esperienza di biglietteria digitale per Italo Treni. Il focus primario è la riduzione drastica dei passaggi necessari per acquistare un biglietto dell\'alta velocità, eliminando il rumore visivo a favore di una fluidità ottimale e di un design system altamente inclusivo e accessibile.',
    challenge: 'I portali di viaggio tradizionali sono spesso affollati di promozioni, popup e passaggi superflui che confondono l\'utente. La sfida era condensare la ricerca del viaggio, la selezione del posto, i servizi aggiuntivi e il pagamento in un unico flusso lineare e privo di attrito.',
    solution: 'Un flusso d\'interfaccia "Single-Stream" ultra-lineare. Attraverso l\'uso di card flessibili e transizioni ottimistiche, l\'utente completa la prenotazione in soli 3 clic. Abbiamo introdotto una palette ad alto contrasto conforme alle linee guida WCAG AAA, filtri intelligenti predittivi basati sulle abitudini del passeggero e un sistema offline per la consultazione istantanea del biglietto.',
    client: 'Italo NTV SpA (Concept Design)',
    role: 'Lead UX Researcher, Lead UI Designer',
    heroImage: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=1200&auto=format&fit=crop',
    colorPalette: [
      { hex: '#9E1C1F', name: 'Italo Red' },
      { hex: '#FFFFFF', name: 'Pure White' },
      { hex: '#111111', name: 'Carbon Slate' }
    ],
    typography: 'Outfit (Moderna e pulita per UI) & Fira Code (Metadati orari ed emissioni)',
    tags: ['TypeScript', 'Optimistic UI', 'Archiving', 'Minimal UI']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Design Disciplines',
    items: ['Art Direction', 'Typography Systems', 'Grid Structures', 'Interactive Prototyping', 'User Interface Design']
  },
  {
    category: 'Frontend Engineering',
    items: ['TypeScript/React/Vite', 'Fluid Motion Orchestration', 'Interactive WebGL Canvas', 'Performance Optimization', 'Semantic Accessibility']
  },
  {
    category: 'Collaborative Philosophy',
    items: ['Design/Dev Bridge Building', 'Open-Source Experimentation', 'Iterative Craftsmanship', 'No-Frills Focus']
  }
];

export const BIOGRAPHY_TEXT = "Diego Cavallaro is a Junior UX/UI & Visual Designer with a background in Digital Media Design. Operating at the meticulous intersection of structured layouts, clean typography, and intuitive interactive interfaces, Diego designs simple, functional, and highly polished digital experiences.";
