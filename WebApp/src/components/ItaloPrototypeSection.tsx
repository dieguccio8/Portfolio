import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Smartphone } from 'lucide-react';

interface ItaloPrototypeSectionProps {
  lang: 'it' | 'en';
}

export default function ItaloPrototypeSection({ lang }: ItaloPrototypeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Defer mounting heavy WebGL Figma iframe until the user scrolls within range
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative z-10 pt-16 md:pt-24 pb-16 px-6 sm:px-12 md:px-16 flex justify-center items-center"
      id="italo-interactive-prototypes-section"
    >
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center">

        {/* Left Column: Interactive Prototype Embed */}
        <div className="flex justify-center items-center w-full">
          {/* Prototype Container: sized precisely to the phone silhouette so all surrounding space scrolls freely */}
          <div
            data-hide-cursor="true"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('hide-custom-cursor'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('show-custom-cursor'))}
            className="relative w-[340px] sm:w-[380px] md:w-[400px] h-[650px] sm:h-[740px] lg:h-[800px] flex justify-center items-center"
          >
            {/* Elegant Preloader Skeleton while Figma loads in the background */}
            <AnimatePresence>
              {!isLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
                      <Smartphone className="w-7 h-7 text-[#B50D3A]" />
                    </div>
                  </div>
                  <span className="text-sm font-sans font-medium text-white/80 tracking-wide mb-1">
                    {lang === 'it' ? 'Caricamento prototipo Figma...' : 'Loading Figma prototype...'}
                  </span>
                  <span className="text-xs font-urbanist text-white/40">
                    {lang === 'it' ? 'Ottimizzazione del flusso interattivo' : 'Optimizing interactive flow'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {shouldLoadIframe ? (
              <iframe
                id="italo-prototype-iframe"
                style={{ border: 'none', width: '100%', height: '100%' }}
                width="100%"
                height="100%"
                loading="lazy"
                allow="clipboard-read; clipboard-write; fullscreen"
                onLoad={() => setIsLoaded(true)}
                className={`transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                src="https://embed.figma.com/proto/itW6BttAowSoBwLm60A802/Italo---Progetto-esame-finale?node-id=2191-3062&scaling=scale-down&content-scaling=fixed&page-id=115%3A361&starting-point-node-id=2191%3A3062&show-proto-sidebar=0&hide-ui=1&embed-host=share&bg-color=050505"
                allowFullScreen
              />
            ) : null}
          </div>
        </div>

        {/* Right Column: Text & CTA Button (Centered in its half, text naturally left-aligned) */}
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col items-start text-left gap-6 lg:gap-8 max-w-[420px] w-full">
            <h2 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-[#B50D3A] font-sans leading-none uppercase text-left">
              Provalo
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed font-urbanist text-left">
              {lang === 'it'
                ? "Puoi provare il prototipo dall'anteprima a sinistra o cliccando sul pulsante qui sotto"
                : "You can test the prototype from the preview on the left or by clicking the button below"}
            </p>
            <div className="mt-2 flex items-start">
              <a
                href="https://www.figma.com/proto/itW6BttAowSoBwLm60A802/Italo---Progetto-esame-finale?node-id=2191-3062&t=vFdln4F78kMVfDKX-1&scaling=scale-down&content-scaling=fixed&page-id=115%3A361&starting-point-node-id=2191%3A3062&show-proto-sidebar=1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit group"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center gap-3 px-8 py-4 bg-[#B50D3A] hover:bg-[#9E1C1F] text-white rounded-full shadow-[0_0_20px_rgba(181,13,58,0.35)] transition-colors duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative font-sans font-semibold tracking-wide text-sm md:text-base">
                    {lang === 'it' ? "Prova il Prototipo" : "Try the Prototype"}
                  </span>
                  <ArrowUpRight className="relative w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                </motion.button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
