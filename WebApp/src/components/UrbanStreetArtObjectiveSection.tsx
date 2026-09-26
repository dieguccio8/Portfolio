export function UrbanStreetArtObjectiveSection() {
  return (
    <section
      id="urban-streetart-objective"
      data-project-section="03-objective"
      aria-label="Obiettivo Urban StreetArt Sicily"
      className="relative w-[100vw] left-1/2 -translate-x-1/2 bg-[#FCD306] z-10 mt-12 -mb-4 sm:-mb-8 min-h-screen py-20 flex flex-col items-center justify-center text-[#111111] px-6 overflow-hidden"
    >
      <svg viewBox="0 0 230 208" className="absolute top-0 right-0 w-64 md:w-[600px] h-auto opacity-[0.05] translate-x-1/4 pointer-events-none" aria-hidden="true">
        <path d="M229.9 0L229.8 208L0 0Z" fill="#111111" />
      </svg>
      <svg viewBox="0 0 230 208" className="absolute bottom-0 left-0 w-48 md:w-[400px] h-auto opacity-[0.1] -translate-x-1/4 translate-y-1/4 pointer-events-none" aria-hidden="true">
        <path d="M229.9 0L229.8 208L0 0Z" fill="#ffffff" />
      </svg>
      <svg viewBox="0 0 230 208" className="absolute top-1/4 left-[8%] w-12 md:w-20 h-auto opacity-40 pointer-events-none" aria-hidden="true">
        <path d="M229.9 0L229.8 208L0 0Z" fill="#111111" />
      </svg>
      <svg viewBox="0 0 230 208" className="absolute bottom-1/4 right-[10%] w-10 md:w-16 h-auto opacity-50 pointer-events-none hidden md:block" aria-hidden="true">
        <path d="M229.9 0L229.8 208L0 0Z" fill="#ffffff" />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-7xl sm:text-[100px] md:text-[140px] font-urbanist font-black tracking-tighter leading-none mb-6 sm:mb-8 text-center uppercase">
          Obiettivo
        </h2>
        <p className="max-w-4xl text-center text-lg sm:text-xl md:text-3xl font-light leading-[1.4] tracking-tight text-[#111111]/90">
          Creare un’identità visiva forte, contemporanea e coerente, capace di rappresentare l’energia dell’arte urbana e rendere il progetto riconoscibile su tutti i canali digitali.
        </p>
      </div>
    </section>
  );
}
