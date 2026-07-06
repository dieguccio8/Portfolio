import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trash2,
  Upload
} from 'lucide-react';
import { Project } from '../types';

interface KineticsLowerSectionsProps {
  project: Project;
  activeResearchTab: 'desk' | 'sondaggi' | 'interviste';
  setActiveResearchTab: (tab: 'desk' | 'sondaggi' | 'interviste') => void;
  wireframeImages: { [key: string]: string };
  handleImageUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (id: string) => void;
  copiedColor: string | null;
  handleCopyHex: (hex: string) => void;
  lang?: string;
}

export default function KineticsLowerSections({
  project,
  wireframeImages,
  handleImageUpload,
  handleRemoveImage,
  lang = 'it'
}: KineticsLowerSectionsProps) {
  
  // Interactive Region Switcher State (Section 3)
  const regions = ['SICILY', 'TUSCANY', 'LOMBARDY'];
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);

  // Auto-switch regions every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRegionIndex((prev) => (prev + 1) % regions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-24 w-full">
      
      {/* SECTION 3: THE PROCESS - BRAND ARCHITECTURE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12 border-t border-[#2B2B2B]">
        {/* Left Column: Branding Concept */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#FCD306] font-bold font-urbanist">03 / The Process</span>
              <div className="h-[1px] flex-1 bg-[#2B2B2B]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase font-urbanist relative">
              {lang === 'it' ? (
                <>Un sistema, <span className="text-[#FCD306]">infinite geografie.</span></>
              ) : (
                <>One system, <span className="text-[#FCD306]">infinite geographies.</span></>
              )}
            </h2>
            <p className="text-base leading-relaxed text-[#A8A8A2] font-normal font-urbanist">
              {lang === 'it' ? (
                <>Il nuovo logo non è statico, ma un framework. L'intersezione di geometrie decise crea una griglia modulare che permette al brand di espandersi: Sicily, Tuscany, Lombardy. Il font <span className="font-semibold text-[#FCD306]">Urbanist</span> assicura un impatto crudo, tipico della street culture, ma geometricamente rigoroso.</>
              ) : (
                <>The new logo is not static, but a framework. The intersection of sharp geometries creates a modular grid that allows the brand to expand: Sicily, Tuscany, Lombardy. The <span className="font-semibold text-[#FCD306]">Urbanist</span> font ensures a raw impact, typical of street culture, but geometrically rigorous.</>
              )}
            </p>
          </div>

          {/* Interactive Region Badge Showcase */}
          <div className="bg-[#1A1A1A]/60 border border-[#2B2B2B] p-6 relative overflow-hidden flex flex-col gap-4 shadow-lg">
            <div className="absolute top-2 right-3 text-[8px] font-mono text-[#A8A8A2] uppercase">Active Matrix</div>
            <span className="text-[10px] font-mono text-[#A8A8A2] uppercase tracking-wider block">Dynamic Area Expansion</span>
            <div className="flex gap-3">
              {regions.map((region, i) => (
                <button
                  key={region}
                  onClick={() => setCurrentRegionIndex(i)}
                  className={`px-3 py-1 text-xs font-mono font-bold transition-all border ${
                    i === currentRegionIndex 
                      ? 'bg-[#FCD306] text-[#0D0D0D] border-[#FCD306] scale-105' 
                      : 'bg-[#0D0D0D] text-[#A8A8A2] border-[#2B2B2B] hover:border-[#FCD306]'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
            <div className="mt-2 p-4 bg-[#0D0D0D] border border-[#2B2B2B] font-mono text-center relative overflow-hidden">
              <span className="text-lg sm:text-2xl font-black uppercase text-white tracking-widest block font-urbanist">
                URBAN STREETART <span className="text-[#FCD306]">{regions[currentRegionIndex]}</span>
              </span>
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#FCD306]" />
            </div>
          </div>
        </div>

        {/* Right Column: Logo Exploded Blueprint */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-[#A8A8A2] uppercase tracking-widest font-urbanist">
              Logo Anatomy & Geometric System
            </span>
            <span className="text-[9px] font-mono text-[#0D0D0D] bg-[#FCD306] border border-[#FCD306]/20 px-2 py-0.5 rounded-none font-bold font-urbanist">
              GRID: 8X8 SYSTEM
            </span>
          </div>

          {/* Exploded Blueprint Interactive Card */}
          <div className="bg-[#1A1A1A] border border-[#2B2B2B] rounded-none p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between aspect-square lg:aspect-auto lg:h-[480px] group">
            {/* Technical grid overlays */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
            
            {/* Dimension lines and metadata */}
            <div className="absolute top-4 left-6 text-[8px] font-mono text-[#A8A8A2] flex flex-col font-urbanist">
              <span>COORD: ART-S90 // LAVA_FLARE</span>
              <span>ANGLE: 45.00° REGULAR</span>
            </div>
            
            <div className="absolute top-4 right-6 text-[8px] font-mono text-[#A8A8A2] text-right font-urbanist">
              <span>SCALE: 1:1.24</span>
              <span>H: 140MM / W: 140MM</span>
            </div>

            {/* Geometric Exploded Visual */}
            <div className="relative flex-1 flex items-center justify-center scale-95 md:scale-100">
              {/* Outer circular boundary */}
              <div className="absolute w-56 h-56 rounded-full border border-dashed border-white/5 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-dashed border-white/10" />
              </div>

              {/* Architectural logo building blocks */}
              <div className="relative flex items-center gap-6">
                {/* Block 'U' */}
                <div className="relative flex flex-col items-center gap-2">
                  <div className="w-16 h-24 border border-dashed border-[#FCD306]/40 flex items-end justify-center p-1.5 rounded-none">
                    <div className="w-full h-12 bg-[#F5F5F0] rounded-none relative group-hover:bg-[#FCD306] transition-colors duration-700">
                      {/* Anchor lines */}
                      <div className="absolute -left-3 top-0 w-3 h-[1px] bg-[#2B2B2B]" />
                      <div className="absolute -left-3 bottom-0 w-3 h-[1px] bg-[#2B2B2B]" />
                      <div className="absolute -left-3 top-0 bottom-0 w-[1px] bg-[#2B2B2B]/50" />
                      <span className="absolute -left-8 top-3 text-[7px] font-mono text-[#A8A8A2] font-urbanist">h: 48px</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8A8A2] font-urbanist">BLOCK_U (STEM)</span>
                </div>

                {/* Block 'S' */}
                <div className="relative flex flex-col items-center gap-2">
                  <div className="w-16 h-24 border border-dashed border-[#FCD306]/40 flex flex-col justify-between p-1.5 rounded-none">
                    {/* Top part of S */}
                    <div className="w-full h-8 bg-[#FCD306] rounded-none relative group-hover:bg-[#F5F5F0] transition-colors duration-700">
                      <div className="absolute -right-3 top-0 w-3 h-[1px] bg-[#2B2B2B]" />
                      <div className="absolute -right-3 bottom-0 w-3 h-[1px] bg-[#2B2B2B]" />
                      <div className="absolute -right-3 top-0 bottom-0 w-[1px] bg-[#2B2B2B]/50" />
                      <span className="absolute -right-8 top-2 text-[7px] font-mono text-[#A8A8A2] font-urbanist">w: 64px</span>
                    </div>
                    {/* Bottom part of S */}
                    <div className="w-full h-8 bg-[#FCD306]/30 border border-[#2B2B2B] rounded-none relative group-hover:border-[#FCD306] transition-colors duration-700" />
                  </div>
                  <span className="text-[10px] font-mono text-[#A8A8A2] font-urbanist">BLOCK_S (CURVE)</span>
                </div>
              </div>
            </div>

            {/* Bottom explanatory technical legend */}
            <div className="border-t border-[#2B2B2B] pt-4 text-left z-10">
              <span className="text-[10px] font-mono uppercase text-[#FCD306] block mb-1 font-bold font-urbanist">
                GEOMETRIC INTEGRITY
              </span>
              <p className="text-xs text-[#A8A8A2] leading-relaxed font-normal font-urbanist">
                {lang === 'it' 
                  ? "Ogni lettera è progettata su una griglia fissa 8x8 con raccordi geometrici a 45 gradi. L'equilibrio tra pieni e vuoti garantisce una leggibilità eccellente, sia stampata a piccolissime dimensioni sulle etichette delle t-shirt, sia scalata su mega-cartelloni urbani." 
                  : "Each letter is designed on a fixed 8x8 grid with 45-degree geometric connections. The balance between solid and empty spaces guarantees excellent readability, whether printed at extremely small sizes on t-shirt labels or scaled on mega urban billboards."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE SOLUTION - DIGITAL SOCIAL EXPERIENCE */}
      <section className="flex flex-col gap-10 pt-12 border-t border-[#2B2B2B]">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1 flex flex-col gap-2 text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#FCD306] font-bold font-urbanist">04 / Digital Identity</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase font-urbanist">
              {lang === 'it' ? "Il palcoscenico per l'arte." : "The stage for art."}
            </h2>
            <p className="text-base leading-relaxed text-[#A8A8A2] font-normal font-urbanist max-w-3xl">
              {lang === 'it' 
                ? "I template social e i touchpoint digitali sono stati riprogettati per dare respiro alle immagini, riducendo il rumore visivo e mettendo l'artista al centro del racconto editoriale." 
                : "The social templates and digital touchpoints have been redesigned to let the images breathe, reducing visual noise and placing the artist at the center of the editorial narrative."}
            </p>
          </div>
          <span className="text-[9px] font-mono text-[#A8A8A2] uppercase tracking-widest hidden md:block font-urbanist">
            Instagram Feed Templates
          </span>
        </div>

        {/* Centered Smartphone Mockup Showcase */}
        <div className="flex justify-center mt-4">
          
          {/* Mockup 1: Dark Mode Instagram Feed */}
          <div className="flex flex-col gap-4 items-center font-urbanist">
            <span className="text-xs font-mono text-[#A8A8A2]">
              {lang === 'it' ? "Mockup A: Grid Instagram Editoriale" : "Mockup A: Editorial Instagram Grid"}
            </span>
            
            {/* Phone Outer Frame */}
            <div className="w-[290px] sm:w-[320px] aspect-[9/19] bg-[#1A1A1A] rounded-[3rem] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-[#2B2B2B] relative overflow-hidden flex flex-col">
              {/* Speaker & Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex justify-center items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neutral-800" />
                <span className="w-10 h-1 bg-neutral-900 rounded-full" />
              </div>
              
              {/* Phone Content (Instagram Profile Page) */}
              <div className="flex-1 bg-[#0D0D0D] rounded-[2.5rem] overflow-hidden flex flex-col pt-6 text-[#F5F5F0] text-xs select-none">
                {/* Instagram Header */}
                <div className="px-4 py-3 border-b border-[#2B2B2B] flex justify-between items-center shrink-0">
                  <span className="font-bold text-[11px] font-urbanist">urbanstreetart.sicily</span>
                  <div className="flex gap-2.5 text-[#A8A8A2]">
                    <span className="w-2.5 h-2.5 border border-white rounded-sm" />
                    <span className="font-bold text-[10px]">•••</span>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="p-4 flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-4">
                    {/* Rebranded Avatar */}
                    <div className="w-12 h-12 rounded-full bg-[#FCD306] p-[1.5px] flex items-center justify-center shrink-0">
                      <div className="w-full h-full bg-[#0D0D0D] rounded-full overflow-hidden p-[1px]">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-full grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="flex-1 flex justify-around text-center text-[10px]">
                      <div className="flex flex-col"><span className="font-bold text-white">142</span><span className="text-[8px] text-[#A8A8A2] uppercase font-mono">Posts</span></div>
                      <div className="flex flex-col"><span className="font-bold text-white">48.2K</span><span className="text-[8px] text-[#A8A8A2] uppercase font-mono">Followers</span></div>
                      <div className="flex flex-col"><span className="font-bold text-white">405</span><span className="text-[8px] text-[#A8A8A2] uppercase font-mono">Following</span></div>
                    </div>
                  </div>

                  {/* Bio Description */}
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-[#F5F5F0] text-[11px] font-urbanist">Urban StreetArt Sicily</span>
                    <span className="text-[#A8A8A2] text-[10px] leading-relaxed font-urbanist">
                      {lang === 'it' 
                        ? "Ecosistema editoriale indipendente dedicato alla street art in Sicilia. Rebranding ed identità modulare." 
                        : "Independent editorial ecosystem dedicated to street art in Sicily. Rebranding and modular identity."}
                    </span>
                    <span className="text-[#FCD306] text-[9px] font-mono uppercase tracking-wider font-semibold font-urbanist">
                      linkin.bio/urbanstreetart
                    </span>
                  </div>
                </div>

                {/* Rebranded Instagram Feed Thumbnails Grid */}
                <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-none">
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { url: "https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?q=80&w=300&auto=format&fit=crop", rot: "rotate-[1deg]" },
                      { url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=300&auto=format&fit=crop", rot: "rotate-[-1.5deg]" },
                      { url: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=300&auto=format&fit=crop", rot: "rotate-[1deg]" },
                      { url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=300&auto=format&fit=crop", rot: "rotate-[-1deg]" },
                      { url: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=300&auto=format&fit=crop", rot: "rotate-[1.5deg]" },
                      { url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=300&auto=format&fit=crop", rot: "rotate-[-1deg]" }
                    ].map((item, i) => (
                      <div key={i} className={`aspect-square bg-[#1A1A1A] border border-[#2B2B2B] relative group/item overflow-hidden rounded-none ${item.rot} hover:rotate-0 hover:scale-105 hover:z-10 transition-all duration-300 shadow-sm`}>
                        <img 
                          src={item.url} 
                          alt="Streetart post" 
                          className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        {/* Custom visual geometric alignment box inside each post to show branding */}
                        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#FCD306]/60" />
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#FCD306]/60" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE SOLUTION - PHYGITAL REAL-WORLD PRODUCTS */}
      <section className="flex flex-col gap-10 pt-12 border-t border-[#2B2B2B]">
        <div className="flex flex-col gap-3 text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#FCD306] font-bold font-urbanist">05 / Phygital Monetization</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#F5F5F0] uppercase font-urbanist">
            {lang === 'it' ? "Dalla strada, per la strada." : "From the street, for the street."}
          </h2>
          <p className="text-base leading-relaxed text-[#F5F5F0] font-normal font-urbanist max-w-4xl">
            {lang === 'it' ? (
              <>Una community forte richiede simboli di appartenenza. Il rebranding ha permesso la naturale estensione del progetto in un ecosistema <span className="font-semibold text-[#FCD306]">"Phygital"</span>: un magazine stampato curato in carta premium a tiratura limitata e una linea di merchandising streetwear geometrico coerente con la nuova identità visiva.</>
            ) : (
              <>A strong community requires symbols of belonging. The rebranding allowed the natural extension of the project into a <span className="font-semibold text-[#FCD306]">"Phygital"</span> ecosystem: a printed magazine curated on premium paper in a limited edition and a line of geometric streetwear merchandising consistent with the new visual identity.</>
            )}
          </p>
        </div>

        {/* Uploadable Products Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="kinetics-products-grid">
          {[
            { id: 'prod_01', title: lang === 'it' ? '01. Copertina Magazine' : '01. Magazine Cover', layoutDesc: lang === 'it' ? 'Copertina dell\'Edizione Limitata' : 'Limited Edition Cover', height: 'h-[320px] sm:h-[360px]', rot: 'rotate-[1deg]' },
            { id: 'prod_02', title: lang === 'it' ? '02. Doppia Pagina Magazine' : '02. Double Page Magazine', layoutDesc: lang === 'it' ? 'Interno editoriale del libro d\'arte' : 'Editorial interior of the art book', height: 'h-[320px] sm:h-[360px]', rot: 'rotate-[-1deg]' },
            { id: 'prod_03', title: lang === 'it' ? '03. Felpa Streetwear' : '03. Streetwear Hoodie', layoutDesc: lang === 'it' ? 'Oversized hoodie della collezione' : 'Oversized hoodie from the collection', height: 'h-[280px] sm:h-[320px]', rot: 'rotate-[1.5deg]' },
            { id: 'prod_04', title: lang === 'it' ? '04. Cappellino Streetwear' : '04. Streetwear Cap', layoutDesc: lang === 'it' ? 'Track cap con brand geometrizzato' : 'Track cap with geometrized branding', height: 'h-[280px] sm:h-[320px]', rot: 'rotate-[-1.5deg]' }
          ].map((prod) => {
            const hasImg = !!wireframeImages[prod.id];
            return (
              <div 
                key={prod.id} 
                className="relative rounded-none bg-[#1A1A1A] border border-[#2B2B2B] hover:border-[#FCD306]/50 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col p-6 gap-4 group"
              >
                <div className="flex items-center justify-between border-b border-[#2B2B2B] pb-2 shrink-0">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FCD306] font-bold font-urbanist">{prod.title}</span>
                  </div>
                  {hasImg && (
                    <button 
                      onClick={() => handleRemoveImage(prod.id)}
                      className="text-[#A8A8A2] hover:text-[#FCD306] p-1 rounded-none transition-colors cursor-pointer"
                      title={lang === 'it' ? "Rimuovi immagine" : "Remove image"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className={`w-full ${prod.height} overflow-hidden rounded-none bg-[#0D0D0D] relative flex items-center justify-center border border-dashed border-[#2B2B2B] group-hover:border-[#FCD306]/20 transition-all duration-300`}>
                  {hasImg ? (
                    <div className={`relative w-full h-full flex items-center justify-center p-2 transition-transform duration-300 ${prod.rot} group-hover:rotate-0`}>
                      <img 
                        src={wireframeImages[prod.id]} 
                        alt={prod.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain rounded-none block shadow-md"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <label className="cursor-pointer bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] border border-[#2B2B2B] text-white rounded-none p-2.5 transition-all">
                          <Upload className="w-4 h-4" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(prod.id, e)} 
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer absolute inset-0 flex flex-col items-center justify-center p-4 text-center hover:bg-[#FCD306]/[0.02] transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(prod.id, e)} 
                      />
                      <div className="w-10 h-10 rounded-none bg-[#FCD306]/10 flex items-center justify-center text-[#FCD306] mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-[#F5F5F0] uppercase tracking-wider block font-urbanist group-hover:text-[#FCD306]">
                        {lang === 'it' ? "Carica Immagine" : "Upload Image"}
                      </span>
                      <span className="text-[10px] text-[#A8A8A2] font-mono mt-1 block leading-relaxed font-urbanist">{prod.layoutDesc}</span>
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
