'use client';
import React, { useState, useEffect, useRef } from 'react';
import TimelineAccordion from './TimelineAccordion';
import BentoGrid from './BentoGrid';

export default function InteractiveBentoSection() {
  const [activePhase, setActivePhase] = useState('problems');
  const phases = ['problems', 'solutions'];
  const triggersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Interseca esattamente al 50% (centro dello schermo)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const phase = entry.target.getAttribute('data-phase');
            if (phase) setActivePhase(phase);
          }
        });
      },
      { rootMargin: "-50% 0px -49% 0px" } 
    );

    triggersRef.current.forEach((trigger) => {
      if (trigger) observer.observe(trigger);
    });

    return () => observer.disconnect();
  }, []);

  return (
    // L'altezza totale di 150vh garantisce 50vh di scroll "bloccato" 
    // mentre l'interfaccia sticky rimane fissa.
    <div className="relative w-full h-auto lg:h-[150vh]">
      
      {/* VISUAL CONTAINER (Sticky) */}
      {/* Su desktop resta incollato in alto. Su mobile è relativo e ha la sua altezza naturale. */}
      <div className="w-full lg:sticky lg:top-0 lg:left-0 lg:h-screen flex items-center justify-center relative z-10 bg-transparent">
        <div className="w-full flex flex-col xl:flex-row gap-8 lg:gap-16 xl:gap-24 justify-center items-center py-4 md:py-8 px-4 md:px-0">
          
          {/* Left Side: Timeline */}
          <div className="flex-1 w-full max-w-lg">
            <TimelineAccordion activePhase={activePhase} onPhaseChange={setActivePhase} />
          </div>
          
          {/* Right Side: Bento Grid */}
          <div className="flex-1 w-full max-w-xl mt-12 xl:mt-0">
            <BentoGrid activePhase={activePhase} />
          </div>

        </div>
      </div>

      {/* INVISIBLE SCROLL TRIGGERS */}
      {/* Questi trigger sono mappati in modo assoluto sull'intero contenitore da 200vh. */}
      {/* Il primo copre la prima metà (0-100vh), il secondo la seconda metà (100-200vh). */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:flex flex-col z-0">
        {phases.map((phase, index) => (
          <div
            key={phase}
            data-phase={phase}
            ref={(el) => {
              triggersRef.current[index] = el;
            }}
            className="flex-1 w-full opacity-0"
          />
        ))}
      </div>

    </div>
  );
}
