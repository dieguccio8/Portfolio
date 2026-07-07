import {
  CircularGallery,
  type GalleryItem,
} from "./ui/circular-gallery-2";

const galleryItems: GalleryItem[] = [
  { 
    title: "User Research & Analisi", 
    description: "Analisi dei dati e comportamenti per individuare le reali necessità degli utenti, guidando decisioni di design basate su metriche oggettive.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#E8302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="4"/><path d="M10.3 15H7a4 4 0 0 0-4 4v2"/><circle cx="17" cy="17" r="3"/><path d="m21 21-1.5-1.5"/></svg>`
  },
  { 
    title: "Wireframing & Prototyping", 
    description: "Creazione di wireframe e prototipi interattivi per testare flussi di navigazione e validare l'esperienza utente prima dello sviluppo.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#E8302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
  },
  { 
    title: "UI Design & Visual", 
    description: "Sviluppo di interfacce visivamente accattivanti, con un forte focus su tipografia, gerarchia visiva e design system scalabili.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#E8302A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5c-4.7 0-8.5-3.8-8.5-8.5S7.3 3.5 12 3.5c4.7 0 8.5 3.8 8.5 8.5a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 0-5 0c0 1.4 1.1 2.5 2.5 2.5.7 0 1.3-.3 1.8-.7.5-.4 1.2-.4 1.7 0l.5.5c.3.3.7.3 1 0l.5-.5c.4-.5.4-1.2 0-1.7a2.5 2.5 0 0 0-.7-1.8c-.4-.5-.4-1.2 0-1.7L18.5 7"/></svg>`
  }
];

export function CircularGalleryDemo() {
  return (
    <div className="relative h-[600px] w-full bg-transparent">
      <CircularGallery
        items={galleryItems}
        bend={3}
        borderRadius={0.05}
        scrollEase={0.02}
        className="text-white"
      />
    </div>
  );
}
