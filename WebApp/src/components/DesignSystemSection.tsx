import React from 'react';
import { motion } from 'framer-motion';

export const DesignSystemSection: React.FC = () => {
  return (
    <section className="relative w-[100vw] left-1/2 -translate-x-1/2 bg-[#111111] text-white py-24 sm:py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/10">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FCD306] opacity-[0.02] blur-[150px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-[100px] font-urbanist font-black tracking-tighter leading-none mb-6 uppercase"
          >
            Design <span className="text-[#FCD306]">System</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-neutral-400 font-light max-w-3xl leading-[1.5] mx-auto"
          >
            Un'estetica moderna, urbana e ad alto contrasto. L'identità visiva è progettata per far risaltare le opere d'arte di strada, utilizzando una base scura punteggiata da accenti geometrici e di colore decisi.
          </motion.p>
        </div>

        {/* Bento Grid Design System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          
          {/* Left: Color Palette (Triangles) */}
          <div className="md:col-span-7 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 shadow-2xl relative overflow-hidden group flex flex-col gap-12">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h3 className="text-sm font-urbanist uppercase tracking-widest text-neutral-400 font-bold relative z-10 text-center">Color Palette</h3>
            
            <div className="grid grid-cols-2 gap-8 md:gap-12 w-full max-w-lg mx-auto relative z-10">
              <div className="relative w-full aspect-[230/208] group/tri cursor-pointer">
                <svg viewBox="0 0 230 208" className="absolute inset-0 w-full h-full drop-shadow-lg overflow-visible scale-x-[-1] transition-transform duration-500 group-hover/tri:scale-105 group-hover/tri:-scale-x-105">
                  <path d="M229.9 0L229.8 208L0 0Z" fill="#111111" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/tri:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="font-mono font-medium tracking-wide text-white -rotate-[42deg] -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 text-xs sm:text-sm">#111111</p>
                </div>
              </div>
              <div className="relative w-full aspect-[230/208] group/tri cursor-pointer">
                <svg viewBox="0 0 230 208" className="absolute inset-0 w-full h-full drop-shadow-lg overflow-visible transition-transform duration-500 group-hover/tri:scale-105">
                  <path d="M229.9 0L229.8 208L0 0Z" fill="#FFFFFF" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/tri:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="font-mono font-bold tracking-wide text-[#111111] rotate-[42deg] translate-x-4 -translate-y-4 md:translate-x-6 md:-translate-y-6 text-xs sm:text-sm">#FFFFFF</p>
                </div>
              </div>
              <div className="relative w-full aspect-[230/208] group/tri cursor-pointer">
                <svg viewBox="0 0 230 208" className="absolute inset-0 w-full h-full drop-shadow-lg overflow-visible scale-x-[-1] transition-transform duration-500 group-hover/tri:scale-105 group-hover/tri:-scale-x-105">
                  <path d="M229.9 0L229.8 208L0 0Z" fill="#A3A3A3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/tri:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="font-mono font-bold tracking-wide text-[#111111] -rotate-[42deg] -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6 text-xs sm:text-sm">#A3A3A3</p>
                </div>
              </div>
              <div className="relative w-full aspect-[230/208] group/tri cursor-pointer">
                <svg viewBox="0 0 230 208" className="absolute inset-0 w-full h-full drop-shadow-lg overflow-visible transition-transform duration-500 group-hover/tri:scale-105">
                  <path d="M229.9 0L229.8 208L0 0Z" fill="#FCD306" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/tri:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <p className="font-mono font-bold tracking-wide text-[#111111] rotate-[42deg] translate-x-4 -translate-y-4 md:translate-x-6 md:-translate-y-6 text-xs sm:text-sm">#FCD306</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Typography */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* H1 Demo */}
            <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col gap-2 relative z-10 w-full">
                <span className="font-urbanist text-[11px] text-[#FCD306] font-bold uppercase tracking-wider mb-4">H1 / Urbanist, Black</span>
                <h1 className="text-white text-[60px] md:text-[80px] font-urbanist font-black leading-none tracking-tighter uppercase mb-2">
                  Urbanist
                </h1>
                <p className="text-neutral-400 text-sm md:text-base font-light">
                  Pesi Bold o ExtraBold. Spesso declinati in all-caps per logotipi o intestazioni forti.
                </p>
              </div>
            </div>

            {/* Body Demo */}
            <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
              <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col gap-2 relative z-10">
                <span className="font-urbanist text-[11px] text-[#FCD306] font-bold uppercase tracking-wider mb-4">Body / Urbanist, Regular</span>
                <p className="text-[#EBEBEB] text-base md:text-lg leading-relaxed font-light font-urbanist">
                  Sans-serif geometrico, pulito, moderno e altamente leggibile a diverse scale. Colore Grigio Chiaro per ridurre l'affaticamento visivo sui fondi neri.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
