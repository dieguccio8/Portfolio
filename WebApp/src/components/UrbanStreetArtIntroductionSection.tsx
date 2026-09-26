import React from 'react';
import { motion } from 'motion/react';
import { LogoMorph } from './LogoMorph';

export function UrbanStreetArtIntroductionSection() {
  return (
    <section id="urban-streetart-introduction" data-project-section="02-introduction" aria-label="Introduzione Urban StreetArt Sicily" className="relative z-20 w-full">
      <div className="relative left-1/2 -translate-x-1/2 w-[100vw] overflow-hidden border-b-2 border-[#0D0D0D] py-2 sm:py-3 flex items-center bg-[#FCD306]">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, ease: 'linear', duration: 20 }} className="flex whitespace-nowrap gap-8 text-[#0D0D0D] font-urbanist font-black text-xl sm:text-2xl uppercase tracking-widest">
          {[...Array(20)].map((_, index) => (
            <React.Fragment key={index}>
              <span>INTRODUZIONE</span>
              <span className="text-[#0D0D0D] text-lg sm:text-xl">✦</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="w-full flex flex-col items-center justify-center min-h-screen py-20 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto">
        <div className="w-full max-w-5xl p-10 md:p-16 lg:p-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="flex flex-col items-center justify-center gap-8">
            <LogoMorph />
          </div>
          <div className="flex items-center">
            <p className="text-white font-urbanist text-xl md:text-2xl lg:text-[28px] leading-[1.4] font-light tracking-tight">
              <span className="font-semibold text-[#FCD306]">Rebranding dell'identità visiva di Urban StreetArt Sicily:</span>{' '}
              pagina Instagram dedicata alla diffusione dell'arte urbana in Sicilia, con l'obiettivo di trasformarla in un vero e proprio portale digitale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
