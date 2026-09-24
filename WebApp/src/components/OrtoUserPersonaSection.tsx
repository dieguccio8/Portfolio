import { GridVignetteBackground } from './ui/vignette-grid-background';

type NodeAlignment = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center';

function PersonaNode({ top, left, label, content, align }: { top: string; left: string; label: string; content: string; align: NodeAlignment }) {
  const labelClasses = {
    'top-left': 'bottom-5 right-5 text-right',
    'top-right': 'bottom-5 left-5 text-left',
    'bottom-left': 'top-5 right-5 text-right',
    'bottom-right': 'top-5 left-5 text-left',
    'top-center': 'bottom-5 left-1/2 -translate-x-1/2 text-center',
  }[align];

  const boxClasses = {
    'top-left': 'bottom-3 right-3 origin-bottom-right',
    'top-right': 'bottom-3 left-3 origin-bottom-left',
    'bottom-left': 'top-3 right-3 origin-top-right',
    'bottom-right': 'top-3 left-3 origin-top-left',
    'top-center': 'bottom-3 left-1/2 -translate-x-1/2 origin-bottom',
  }[align];

  return (
    <div className="absolute z-30 flex items-center justify-center w-0 h-0 group/node" style={{ top, left }}>
      <div className="absolute w-32 h-32 rounded-full cursor-pointer z-10" />
      <div className={`absolute ${labelClasses} whitespace-nowrap transition-all duration-300 group-hover/node:opacity-0 group-hover/node:-translate-y-2 pointer-events-auto cursor-pointer`}>
        <div className="relative overflow-hidden border border-white/5 bg-[#030604] backdrop-blur-3xl px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_0_20px_rgba(6,139,53,0.05)] rounded-2xl pointer-events-none" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[140%] h-16 bg-[#068B35]/40 blur-[15px] opacity-80 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#068B35] to-transparent opacity-100 pointer-events-none" />
          <span className="relative z-10 text-xs sm:text-sm font-raleway uppercase tracking-widest text-white font-medium drop-shadow-md">{label}</span>
        </div>
      </div>
      <div className={`absolute ${boxClasses} w-48 sm:w-56 bg-[#030604] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-5 sm:p-6 opacity-0 scale-90 pointer-events-none transition-all duration-400 group-hover/node:opacity-100 group-hover/node:scale-100 group-hover/node:pointer-events-auto shadow-2xl z-20 overflow-hidden`}>
        <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_0_20px_rgba(6,139,53,0.05)] rounded-[2rem] pointer-events-none" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[140%] h-32 bg-[#068B35]/30 blur-[40px] opacity-90 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#068B35] to-transparent opacity-100 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10">
          <span className="text-[10px] font-raleway text-[#068B35] uppercase tracking-widest block mb-3 font-bold">{label}</span>
          <p className="text-sm font-light text-white leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

function PersonaPortrait() {
  return (
    <div className="relative shrink-0 group/img cursor-pointer w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
      <div className="absolute inset-0 rounded-full border-2 sm:border-[3px] border-[#068B35] bg-[#131514] overflow-hidden shadow-[0_0_50px_rgba(6,139,53,0.15)]">
        <img src="./Images/Project 01/mirella_no_bg.png" alt="Mirella Base" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] max-w-none h-auto object-contain object-bottom transition-transform duration-700 origin-bottom group-hover/img:scale-110" />
      </div>
      <img
        src="./Images/Project 01/mirella_no_bg.png"
        alt="Mirella Pop Out"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] max-w-none h-auto object-contain object-bottom z-10 pointer-events-none drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] transition-transform duration-700 origin-bottom group-hover/img:scale-110"
        style={{ clipPath: 'inset(0 0 50% 0)' }}
      />
    </div>
  );
}

export function OrtoUserPersonaSection() {
  return (
    <section id="user-persona" className="py-20 md:py-32 relative z-10 w-[100vw] ml-[calc(50%-50vw)] flex flex-col items-center overflow-hidden">
      <GridVignetteBackground className="opacity-100" horizontalVignetteSize={50} verticalVignetteSize={50} intensity={100} />

      <div className="flex flex-col items-center gap-6 w-[90vw] max-w-2xl mb-16 md:mb-24 relative z-30">
        <h3 className="text-4xl sm:text-5xl font-raleway tracking-wide drop-shadow-md leading-none text-center">
          <span className="font-black text-[#068B35]">Mirella</span>
          <span className="text-neutral-500 font-light mx-3 sm:mx-4">•</span>
          <span className="font-light text-white">L'utente Ideale</span>
        </h3>
        <p className="text-sm md:text-base italic text-neutral-200 font-light leading-relaxed text-center drop-shadow-md">
          "Voglio connettermi alla natura e approfondire la mia conoscenza scientifica senza barriere, in modo dinamico e intuitivo."
        </p>
      </div>

      <div className="relative w-full max-w-4xl aspect-square md:aspect-[4/3] flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
          <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
          <circle cx="15%" cy="15%" r="4" fill="rgba(255,255,255,0.15)" />
          <line x1="85%" y1="15%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
          <circle cx="85%" cy="15%" r="4" fill="rgba(255,255,255,0.15)" />
          <line x1="15%" y1="85%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
          <circle cx="15%" cy="85%" r="4" fill="rgba(255,255,255,0.15)" />
          <line x1="85%" y1="85%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeOpacity="1" />
          <circle cx="85%" cy="85%" r="4" fill="rgba(255,255,255,0.15)" />
        </svg>

        <PersonaNode top="15%" left="15%" label="Status" content="Nuova residente a Catania (Studentessa)." align="top-left" />
        <PersonaNode top="15%" left="85%" label="Necessità" content="Informazioni repentine tramite smartphone." align="top-right" />
        <PersonaNode top="85%" left="15%" label="Obiettivo" content="Esplorazione scientifica intuitiva." align="bottom-left" />
        <PersonaNode top="85%" left="85%" label="Origine" content="Colombia, ricca di biodiversità." align="bottom-right" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <PersonaPortrait />
        </div>
      </div>
    </section>
  );
}
