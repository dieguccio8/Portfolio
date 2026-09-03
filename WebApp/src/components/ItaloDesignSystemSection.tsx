import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ItaloDesignSystemSectionProps {
  lang?: 'it' | 'en';
}

export default function ItaloDesignSystemSection({ lang = 'it' }: ItaloDesignSystemSectionProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    try {
      navigator.clipboard.writeText(hex);
    } catch {}
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const primaryColors = [
    { hex: '#B50D3A', nameIt: 'Rosso Italo', nameEn: 'Italo Red', bgClass: 'bg-[#B50D3A]' },
    { hex: '#FFFFFF', nameIt: 'Bianco Ottico', nameEn: 'Pure White', bgClass: 'bg-white' },
    { hex: '#EBEBEB', nameIt: 'Grigio Chiaro', nameEn: 'Light Surface', bgClass: 'bg-[#EBEBEB]' },
    { hex: '#111111', nameIt: 'Carbone', nameEn: 'Carbon Black', bgClass: 'bg-[#111111]' },
  ];

  const row1 = [
    { file: 'Tracciato 816.svg', name: 'Alert' },
    { file: 'Tracciato 817.svg', name: 'Account Settings' },
    { file: 'Tracciato 818.svg', name: 'Notifications' },
    { file: 'Tracciato 815.svg', name: 'History' },
    { file: 'Tracciato 819.svg', name: 'Home' },
    { file: 'Tracciato 828.svg', name: 'Entertainment / Gamepad' },
    { file: 'Tracciato 820.svg', name: 'Payments / Dollar' },
    { file: 'Tracciato 823.svg', name: 'Ticket' },
    { file: 'Tracciato 827.svg', name: 'User Profile' },
    { file: 'Tracciato 826.svg', name: 'Media / Video' },
  ];

  const row2 = [
    { file: 'Tracciato 832.svg', name: 'Train / High Speed' },
    { file: 'Tracciato 830.svg', name: 'Seat Comfort' },
    { file: 'Tracciato 822.svg', name: 'News & Press' },
    { file: 'Tracciato 829.svg', name: 'Help & Support' },
    { file: 'Tracciato 821.svg', name: 'Travel Guide / Book' },
    { file: 'Tracciato 833.svg', name: 'Security / Shield' },
    { file: 'Tracciato 834.svg', name: 'Info' },
    { file: 'Raggruppa 36.svg', name: 'Cinema / Clapperboard' },
    { file: 'Tracciato 824.svg', name: 'Accessibility / Wheelchair' },
    { file: 'Tracciato 831.svg', name: 'Italo Più Loyalty / Crown' },
  ];

  const basePath = `${import.meta.env.BASE_URL}Images/Project 03/design_system/`;

  return (
    <section className="w-full relative z-20 py-20 sm:py-28 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto border-t border-white/5">
      {/* Section Title Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 mb-20 sm:mb-24 lg:mb-28">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans text-center">
          Design System
        </h2>
        <div className="w-12 h-1 bg-[#B50D3A] mt-1 rounded-full" />
      </div>

      {/* Design System Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">

        {/* Left Side: Componenti Core & UI Kit (lg:col-span-7) */}
        <div className="lg:col-span-7 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 md:p-10 shadow-2xl relative overflow-hidden group flex flex-col justify-between gap-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#B50D3A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-start relative z-10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Componenti Core & UI Kit
            </h3>
          </div>

          {/* Component Showcase Gallery */}
          <div className="flex flex-col gap-8 relative z-10 w-full">
            {/* Hero booking component */}
            <div className="w-full flex justify-center items-center">
              <img
                src={`${basePath}image%209.svg`}
                alt="Search & Booking Widget"
                className="w-full max-h-[170px] object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            </div>

            {/* Middle Grid: Ticket Cards, Price Tags & Action Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full items-center justify-items-center">
              <img
                src={`${basePath}image%2015.svg`}
                alt="Ticket Tariff Card"
                className="w-full max-h-[130px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
              <img
                src={`${basePath}Group%209.svg`}
                alt="Booking Selection Component"
                className="w-full max-h-[130px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
              <img
                src={`${basePath}image%2018.svg`}
                alt="Loyalty Banner"
                className="w-full max-h-[130px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>

            {/* Core Interactive Cards (Enlarged for high clarity & readability) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full items-center justify-items-center py-2">
              <img
                src={`${basePath}image%2014.svg`}
                alt="Ticket Selection Card"
                className="w-full max-h-[240px] sm:max-h-[280px] md:max-h-[320px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
              <img
                src={`${basePath}image%2013.svg`}
                alt="Search Route Card"
                className="w-full max-h-[240px] sm:max-h-[280px] md:max-h-[320px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
              <img
                src={`${basePath}image%2010.svg`}
                alt="UI Button States Hierarchy"
                className="w-full max-h-[240px] sm:max-h-[280px] md:max-h-[320px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>

            {/* Bottom Navigation Bar */}
            <div className="w-full flex justify-center items-center pt-2">
              <img
                src={`${basePath}image%208.svg`}
                alt="Mobile Bottom Navigation Bar"
                className="w-full max-w-[340px] max-h-[56px] object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Color Palette & Typography (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Color Palette Principale */}
          <div className="rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B50D3A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-6 relative z-10 text-center">
              Color Palette
            </h3>

            <div className="flex flex-wrap justify-center gap-6 relative z-10 w-full">
              {primaryColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleCopyHex(color.hex)}
                  className="group/btn flex flex-col items-center gap-2 cursor-pointer"
                  title="Clicca per copiare HEX"
                >
                  <div
                    className={`w-12 h-12 rounded-full shadow-lg border border-white/15 shrink-0 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_20px_rgba(181,13,58,0.4)] ${color.bgClass}`}
                  />
                  <div className="text-center">
                    <span className="text-xs text-white/90 font-medium block">
                      {lang === 'it' ? color.nameIt : color.nameEn}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 group-hover/btn:text-[#B50D3A] transition-colors flex items-center justify-center gap-1">
                      {copiedColor === color.hex ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiato!</span>
                        </>
                      ) : (
                        color.hex
                      )}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Body Text Demo */}
          <div className="rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-col gap-2 relative z-10 w-full">
              <span className="font-mono text-[11px] text-[#B50D3A] font-bold uppercase tracking-wider mb-1">
                Body / Instrument Sans, Regular, 18px
              </span>
              <p 
                style={{ fontFamily: "'Instrument Sans', sans-serif" }} 
                className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal"
              >
                {lang === 'it'
                  ? "La nuova esperienza digitale di Italo unisce velocità, trasparenza e chiarezza visiva. Un sistema tipografico ad alto contrasto per rendere ogni informazione immediata e priva di attriti."
                  : "Italo's new digital experience blends high speed, transparency, and visual clarity. A high-contrast typographic system engineered to make every travel decision instantaneous and frictionless."}
              </p>
            </div>
          </div>

          {/* H1 Demo */}
          <div className="rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B50D3A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-col gap-2 relative z-10 w-full">
              <span className="font-mono text-[11px] text-[#B50D3A] font-bold uppercase tracking-wider mb-2">
                H1 / Instrument Sans, Bold, 56px
              </span>
              <h1 
                style={{ fontFamily: "'Instrument Sans', sans-serif" }} 
                className="text-white text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight"
              >
                {lang === 'it' ? 'Viaggia ad Alta Velocità' : 'High-Speed Journey'}
              </h1>
            </div>
          </div>
        </div>

        {/* 3. Bottom Card: Iconografia (lg:col-span-12) */}
        <div className="lg:col-span-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden group flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#B50D3A]/5 via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center justify-center relative z-10 py-3 sm:py-6 gap-6 sm:gap-8 md:gap-10">
            {/* Row 1: 10 icons */}
            <div className="grid grid-cols-5 sm:grid-cols-10 w-full justify-items-center items-center gap-y-6">
              {row1.map((icon, index) => (
                <div
                  key={index}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-300 hover:scale-130 hover:drop-shadow-[0_0_12px_rgba(250,240,230,0.55)] cursor-pointer group/icon"
                  title={icon.name}
                >
                  <img
                    src={`${basePath}icons/${encodeURIComponent(icon.file)}`}
                    alt={icon.name}
                    className="w-full h-full object-contain filter transition-transform duration-300"
                    loading="eager"
                  />
                </div>
              ))}
            </div>

            {/* Row 2: 10 icons */}
            <div className="grid grid-cols-5 sm:grid-cols-10 w-full justify-items-center items-center gap-y-6">
              {row2.map((icon, index) => (
                <div
                  key={index}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-300 hover:scale-130 hover:drop-shadow-[0_0_12px_rgba(250,240,230,0.55)] cursor-pointer group/icon"
                  title={icon.name}
                >
                  <img
                    src={`${basePath}icons/${encodeURIComponent(icon.file)}`}
                    alt={icon.name}
                    className="w-full h-full object-contain filter transition-transform duration-300"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
