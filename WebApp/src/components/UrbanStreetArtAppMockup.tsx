import React from 'react';
import { motion } from 'framer-motion';
import { Menu, ShoppingCart, User, Search, Battery, Wifi, Signal } from 'lucide-react';

const column1Images = [
  "/Images/Project 02/Street Art Photos/sicily_streetart_1.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_3.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_5.jpg"
];

const column2Images = [
  "/Images/Project 02/Street Art Photos/sicily_streetart_2.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_4.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_6.jpg"
];

const column3Images = [
  "/Images/Project 02/Street Art Photos/sicily_streetart_3.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_6.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_1.jpg"
];

const column4Images = [
  "/Images/Project 02/Street Art Photos/sicily_streetart_5.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_2.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_4.jpg"
];

const column5Images = [
  "/Images/Project 02/Street Art Photos/sicily_streetart_4.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_1.jpg",
  "/Images/Project 02/Street Art Photos/sicily_streetart_5.jpg"
];

// Double the arrays for infinite scrolling
const col1 = [...column1Images, ...column1Images];
const col2 = [...column2Images, ...column2Images];
const col3 = [...column3Images, ...column3Images];
const col4 = [...column4Images, ...column4Images];
const col5 = [...column5Images, ...column5Images];

export const UrbanStreetArtAppMockup: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-20 py-32 px-6 xl:px-12 max-w-[1800px] mx-auto">
      
      {/* Background Ambient Blobs */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-[#FCD306]/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-[5%] w-[600px] h-[600px] bg-[#FCD306]/15 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FCD306]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* DESKTOP MOCKUP */}
      <div className="relative w-full max-w-[1100px] aspect-[16/10] xl:aspect-auto xl:max-w-none xl:w-[840px] xl:h-[525px] bg-[#111111] rounded-[30px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6),_0_0_0_2px_#333,_0_0_0_12px_#1a1a1a] overflow-hidden order-2 xl:order-1 hidden md:block shrink-0">
        
        {/* Solid Top Header Background */}
        <div className="absolute top-0 left-0 w-full h-[90px] bg-[#111111] z-30 pointer-events-none" />

        {/* Header Navigation */}
        <div className="absolute top-0 left-0 w-full px-12 h-[90px] flex justify-between items-center z-40 text-white">
          <div className="flex items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
             <img 
               src="./Images/Project 02/Logo/bianco_logotipo.svg" 
               alt="Urban StreetArt Sicily" 
               className="h-12 w-auto object-contain" 
             />
          </div>
          
          <div className="flex items-center gap-10 font-urbanist text-[15px] font-medium text-white/60">
            <span className="text-white cursor-pointer transition-colors">Home</span>
            <span className="hover:text-white cursor-pointer transition-colors">Eventi</span>
            <span className="hover:text-white cursor-pointer transition-colors">Shop</span>
            <span className="hover:text-white cursor-pointer transition-colors">Artisti</span>
            <span className="hover:text-white cursor-pointer transition-colors">About</span>
          </div>

          <div className="flex items-center gap-8">
            <ShoppingCart className="w-5 h-5 stroke-[2] text-[#FCD306] hover:text-white cursor-pointer transition-colors" />
            <User className="w-5 h-5 stroke-[2] text-[#FCD306] hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Background Scrolling Gallery */}
        <div className="absolute inset-0 pt-[110px] px-10 grid grid-cols-5 gap-6 pb-12 overflow-hidden bg-[#111111]">
          {[col1, col2, col3, col4, col5].map((column, colIdx) => (
             <motion.div
               key={`desktop-col-${colIdx}`}
               animate={{ y: colIdx % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
               transition={{
                 y: {
                   repeat: Infinity,
                   repeatType: "loop",
                   duration: 35 + (colIdx * 2), // varied speed
                   ease: "linear",
                 },
               }}
               className="flex flex-col gap-6 w-full"
             >
               {column.map((src, idx) => {
                 const aspectsEven = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1.1/1]"];
                 const aspectsOdd = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[4/5]"];
                 const aspect = colIdx % 2 === 0 ? aspectsEven[idx % 3] : aspectsOdd[idx % 3];
                 
                 return (
                   <div key={`dcol${colIdx}-${idx}`} className={`w-full relative ${aspect}`}>
                     <img
                       src={src}
                       alt={`Street Art ${idx}`}
                       className="w-full h-full object-cover border border-white/30 brightness-[0.5] sepia-[0.1] contrast-[1.1]"
                     />
                   </div>
                 );
               })}
             </motion.div>
          ))}
        </div>

        {/* Overlay Darkener */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-20" />
        
        {/* Localized Dark Glow behind Search Bar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-32 bg-black/80 blur-3xl pointer-events-none z-20" />

        {/* Search Bar Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-30 px-6">
          <div className="w-[80%] max-w-[450px] border-b-[2px] border-white pb-2 flex justify-between items-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <input
              type="text"
              placeholder="Hai un'opera in mente? Cercala qui"
              className="bg-transparent text-white placeholder-white outline-none text-[18px] font-urbanist w-full font-medium tracking-tight"
              readOnly
            />
            <Search className="text-white w-6 h-6 shrink-0 ml-4 stroke-[2.5]" />
          </div>
        </div>
        
        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#111111] to-transparent z-40 pointer-events-none" />
      </div>

      {/* MOBILE MOCKUP */}
      <div className="relative w-full max-w-[380px] aspect-[9/19.5] xl:aspect-auto xl:max-w-none xl:w-[245px] xl:h-[530px] bg-[#111111] rounded-[45px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),_0_0_0_2px_#333,_0_0_0_12px_#1a1a1a] overflow-hidden order-1 xl:order-2 shrink-0">
        
        {/* Status Bar removed as requested */}

        {/* Dynamic Island / Notch Space */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50 pointer-events-none" />

        {/* Header Navigation */}
        <div className="absolute top-12 w-full px-5 py-4 flex justify-between items-center z-40 text-white">
          <Menu className="w-7 h-7 stroke-[1.5] text-[#FCD306]" />
          <div className="flex items-center gap-5">
            <ShoppingCart className="w-6 h-6 stroke-[1.5] text-[#FCD306]" />
            <User className="w-6 h-6 stroke-[1.5] text-[#FCD306]" />
          </div>
        </div>

        {/* Solid Top Header Background */}
        <div className="absolute top-0 left-0 w-full h-[115px] bg-[#111111] z-30 pointer-events-none" />

        {/* Background Scrolling Gallery */}
        <div className="absolute inset-0 pt-32 px-4 grid grid-cols-2 gap-4 pb-12 overflow-hidden bg-[#111111]">
          {/* Col 1 */}
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex flex-col gap-4 w-full"
          >
            {col1.map((src, idx) => {
              const aspects = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square"];
              const aspect = aspects[idx % 3];
              return (
                <div key={`col1-${idx}`} className={`w-full relative ${aspect}`}>
                <img
                  src={src}
                  alt={`Street Art ${idx}`}
                  className="w-full h-full object-cover border border-white/30 brightness-[0.5] sepia-[0.1] contrast-[1.1]"
                />
                </div>
              );
            })}
          </motion.div>

          {/* Col 2 */}
          <motion.div
            animate={{ y: ["-50%", "0%"] }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex flex-col gap-4 w-full"
          >
            {col2.map((src, idx) => {
              const aspects = ["aspect-square", "aspect-[4/3]", "aspect-[3/4]"];
              const aspect = aspects[idx % 3];
              return (
                <div key={`col2-${idx}`} className={`w-full relative ${aspect}`}>
                <img
                  src={src}
                  alt={`Street Art ${idx}`}
                  className="w-full h-full object-cover border border-white/30 brightness-[0.5] sepia-[0.1] contrast-[1.1]"
                />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Overlay Darkener to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-20" />

        {/* Localized Dark Glow behind Search Bar for readability */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-black/80 blur-xl pointer-events-none z-20" />

        {/* Search Bar Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-30 px-4">
          <div className="w-full border-b-[1.5px] border-white pb-2 flex justify-between items-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <input
              type="text"
              placeholder="Cerca un'opera..."
              className="bg-transparent text-white placeholder-white/90 outline-none text-[13px] font-urbanist w-full font-medium tracking-tight"
              readOnly
            />
            <Search className="text-white w-4 h-4 shrink-0 ml-2 stroke-[2.5]" />
          </div>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#111111] to-transparent z-40 pointer-events-none" />

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white rounded-full z-50 pointer-events-none" />
      </div>

    </div>
  );
};
