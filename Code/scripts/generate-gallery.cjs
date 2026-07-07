const fs = require('fs');

const cards = [
  {
    title: "User Research & Analisi",
    description: "Analisi dei dati e dei comportamenti per individuare le reali necessità degli utenti",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/User Research.svg"
  },
  {
    title: "Architettura & User Flow",
    description: "Creazione di percorsi di navigazione logici e scalabili, ottimizzando la fruizione dei contenuti",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/User Flow.svg"
  },
  {
    title: "UI Design & Prototipazione",
    description: "Progettazione di interfacce funzionali e prototipi ad alta fedeltà",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/UI.svg"
  },
  {
    title: "Design Systems",
    description: "Creazione di librerie di componenti scalabili per assicurare coerenza visiva e accelerare i processi di sviluppo del team",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/Design System.svg"
  },
  {
    title: "Visual Hierarchy & Data Vis",
    description: "Organizzazione visiva di informazioni e dati complessi per facilitarne la lettura rapida",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/Visual Hierarchy.svg"
  },
  {
    title: "UX Writing",
    description: "Elaborazione dei testi per le interfacce, trasformando concetti complessi in messaggi immediati che migliorano l'usabilità e le conversioni",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/UX Writing.svg"
  },
  {
    title: "3D Graphics",
    description: "Fondamenti di 3D Graphics e Blender. Creazione e modellazione di asset tridimensionali",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/3D Graphic.svg"
  },
  {
    title: "Fondamenti HTML/CSS",
    description: "Traduzione dei design in codice di base per dialogare efficacemente con i team di sviluppo",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/HTML e CSS.svg"
  },
  {
    title: "AI Generativa",
    description: "Implementazione di strumenti di Intelligenza Artificiale per ottimizzare i flussi di lavoro e generare asset rapidamente",
    icon: "/Users/ericadibella/Desktop/DIEGO/Portfolio/Icons/Home/carosello/IA.svg"
  }
];

let output = `import type { GalleryItem } from './ui/circular-gallery-2';\n\nexport const galleryItems: GalleryItem[] = [\n`;

for (const card of cards) {
  const svgContent = fs.readFileSync(card.icon, 'utf-8').trim();
  output += `  {\n`;
  output += `    title: ${JSON.stringify(card.title)},\n`;
  output += `    description: ${JSON.stringify(card.description)},\n`;
  output += `    iconSvg: \`${svgContent}\`\n`;
  output += `  },\n`;
}

output += `];\n`;

fs.writeFileSync('/Users/ericadibella/Desktop/DIEGO/Portfolio/Code/src/components/galleryData.ts', output);
console.log('done');
