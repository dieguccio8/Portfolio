'use client';
import React, { useState } from 'react';
import TimelineAccordion from './TimelineAccordion';
import BentoGrid from './BentoGrid';

export default function InteractiveBentoSection() {
  const [activePhase, setActivePhase] = useState('problems');

  return (
    <div className="w-full flex flex-col xl:flex-row gap-8 lg:gap-16 xl:gap-24 justify-center items-center py-16 relative z-10 px-4 md:px-0">
      
      {/* Left Side: Timeline */}
      <div className="flex-1 w-full max-w-lg">
        <TimelineAccordion activePhase={activePhase} onPhaseChange={setActivePhase} />
      </div>
      
      {/* Right Side: Bento Grid */}
      <div className="flex-1 w-full max-w-xl mt-12 xl:mt-0">
        <BentoGrid activePhase={activePhase} />
      </div>

    </div>
  );
}
