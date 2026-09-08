import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ItaloPrototypeSectionProps {
  lang: 'it' | 'en';
}

export default function ItaloPrototypeSection({ lang }: ItaloPrototypeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInSlot, setIsInSlot] = useState(false);

  useEffect(() => {
    // Check if the container is already in or near the viewport
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInSlot(true);
          observer.disconnect();
        }
      },
      { rootMargin: '1200px' }
    );
    observer.observe(containerRef.current);

    // Fallback timer: place into slot after 2.5s anyway so it's always ready in place
    const timer = setTimeout(() => {
      setIsInSlot(true);
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      className="w-full relative z-10 pt-16 md:pt-24 pb-16 px-6 sm:px-12 md:px-16 flex justify-center items-center"
      id="italo-interactive-prototypes-section"
    >
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center">

        {/* Left Column: Interactive Prototype Embed */}
        <div className="flex justify-center items-center w-full">
          {/* Prototype Container: sized precisely to the phone silhouette so all surrounding space scrolls freely */}
          <div
            ref={containerRef}
            data-hide-cursor="true"
            onMouseEnter={() => window.dispatchEvent(new CustomEvent('hide-custom-cursor'))}
            onMouseLeave={() => window.dispatchEvent(new CustomEvent('show-custom-cursor'))}
            className="relative w-[340px] sm:w-[380px] md:w-[400px] h-[650px] sm:h-[740px] lg:h-[800px] flex justify-center items-center"
          >
            <iframe
              id="italo-prototype-iframe"
              title="Italo Figma Prototype"
              style={
                isInSlot
                  ? { border: 'none', width: '100%', height: '100%', position: 'relative', backgroundColor: '#000000' }
                  : {
                      border: 'none',
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '380px',
                      height: '750px',
                      opacity: 0.001,
                      pointerEvents: 'none',
                      zIndex: -9999,
                      backgroundColor: '#000000',
                    }
              }
              width="100%"
              height="100%"
              loading="eager"
              allow="clipboard-read; clipboard-write; fullscreen"
              className="w-full h-full bg-black"
              src="https://embed.figma.com/proto/itW6BttAowSoBwLm60A802/Italo---Progetto-esame-finale?node-id=2319-5721&scaling=scale-down&content-scaling=fixed&page-id=43%3A60&starting-point-node-id=2270%3A3059&show-proto-sidebar=0&hide-ui=1&embed-host=share&bg-color=000000"
              allowFullScreen
            />
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
                href="https://www.figma.com/proto/itW6BttAowSoBwLm60A802/Italo---Progetto-esame-finale?node-id=2319-5721&scaling=scale-down&content-scaling=fixed&page-id=43%3A60&starting-point-node-id=2270%3A3059&show-proto-sidebar=1"
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
