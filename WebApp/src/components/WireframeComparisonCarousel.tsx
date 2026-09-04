import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenComparison {
  id: string;
  name: string;
  description: string;
  wireframeImg: string;
  oldImg: string;
}

const SCREENS: ScreenComparison[] = [
  {
    id: 'home',
    name: 'Home Screen',
    description: 'Dashboard principale: ricerca rapida e stato del treno in tempo reale.',
    wireframeImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/wireframe/home.jpg`,
    oldImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/old/home.png`,
  },
  {
    id: 'biglietti',
    name: 'Scelta Biglietto',
    description: 'Confronto immediato di orari, tariffe e classi di viaggio.',
    wireframeImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/wireframe/biglietti.jpg`,
    oldImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/old/scegli_biglietto.png`,
  },
  {
    id: 'fedelta',
    name: 'Programma Fedeltà',
    description: 'Gestione punti e riscatto vantaggi con gerarchia semplificata.',
    wireframeImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/wireframe/programma_fedelta.jpg`,
    oldImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/old/offerte.png`,
  },
  {
    id: 'relax',
    name: 'Carrozza & Relax',
    description: 'Mappa visiva dei servizi di bordo e selezione ambiente di viaggio.',
    wireframeImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/wireframe/relax.jpg`,
    oldImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/old/cerca_biglietto.png`,
  },
  {
    id: 'tracker',
    name: 'Live Tracker Corsa',
    description: 'Monitoraggio dell’avanzamento treno, fermate e binari live.',
    wireframeImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/wireframe/tracker.jpg`,
    oldImg: `${import.meta.env.BASE_URL}Images/Project 03/app_mobile/old/home.png`,
  },
];

export default function WireframeComparisonCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentScreen = SCREENS[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? SCREENS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === SCREENS.length - 1 ? 0 : prev + 1));
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="w-[340px] flex flex-col items-center gap-3 select-none shrink-0">
      {/* Helper tip above image */}
      <div className="flex items-center justify-center">
        <span className="text-[11px] font-urbanist font-medium tracking-wide text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          Trascina per confrontare
        </span>
      </div>

      {/* Frameless Pure Image Comparison Container (Height-constrained to fit laptop viewports) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-[440px] sm:h-[480px] md:h-[500px] aspect-[640/1385] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/15 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] cursor-ew-resize select-none touch-none shrink-0"
      >
        {/* Under Layer (Right Side): WIREFRAME */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <img
            src={currentScreen.wireframeImg}
            alt="Wireframe"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
            loading="eager"
          />
        </div>

        {/* Over Layer (Left Side): VECCHIA APP (Clipped from 0% to sliderPos%) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <img
            src={currentScreen.oldImg}
            alt="Vecchia App"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
            loading="eager"
          />
        </div>

        {/* Draggable Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#B50D3A] z-40 pointer-events-none shadow-[0_0_10px_rgba(181,13,58,0.9)]"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Draggable Thumb Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#B50D3A] border border-white/90 shadow-[0_2px_10px_rgba(0,0,0,0.6)] flex items-center justify-center text-white text-[11px] font-black pointer-events-none">
            <span>↔</span>
          </div>
        </div>
      </div>

      {/* Navigation Controls Bar (Prev - Title/Dots - Next) with fixed height */}
      <div className="flex items-center justify-between w-full h-14 px-2 mt-1 gap-3 shrink-0">
        {/* Carousel Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Schermata precedente"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-[#B50D3A] hover:border-[#B50D3A] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Screen Title & Dots */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1.5 text-center min-w-0">
          <span className="text-sm sm:text-base font-urbanist font-semibold text-white tracking-tight truncate whitespace-nowrap block max-w-full">
            {currentScreen.name}
          </span>

          {/* Navigation Dots */}
          <div className="flex items-center gap-1.5 mt-0.5">
            {SCREENS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-5 bg-[#B50D3A]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Vai alla schermata ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Carousel Next Button */}
        <button
          onClick={handleNext}
          aria-label="Schermata successiva"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-[#B50D3A] hover:border-[#B50D3A] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
