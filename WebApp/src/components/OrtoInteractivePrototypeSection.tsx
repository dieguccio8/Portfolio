import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Compass, Smartphone } from 'lucide-react';

type PrototypeTab = 'mobile' | 'totem';

export function OrtoInteractivePrototypeSection({ lang }: { lang: string }) {
  const [activeTab, setActiveTab] = useState<PrototypeTab>('mobile');
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center mt-8 md:mt-12 mb-16 w-full" id="orto-interactive-prototypes-section" aria-label="Prototipo interattivo Orto Botanico">
      <div className="flex flex-col gap-6 items-center justify-center w-full">
        <div className="flex justify-center w-full">
          <div className="flex bg-[#131514] border border-white/5 p-1 rounded-2xl shrink-0 shadow-inner relative w-fit max-w-full overflow-x-auto scrollbar-none">
            {(['mobile', 'totem'] as const).map((tab) => {
              const isActive = activeTab === tab;
              const Icon = tab === 'mobile' ? Smartphone : Compass;
              return (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 whitespace-nowrap uppercase font-raleway cursor-pointer ${isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="active-proto-tab-bg" className="absolute inset-0 bg-[#068B35] rounded-xl" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                  <span className="relative flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {tab === 'mobile' ? (lang === 'it' ? 'Versione Mobile' : 'Mobile Version') : (lang === 'it' ? 'Versione Totem' : 'Totem Version')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div data-hide-cursor="true" onMouseEnter={() => window.dispatchEvent(new CustomEvent('hide-custom-cursor'))} onMouseLeave={() => window.dispatchEvent(new CustomEvent('show-custom-cursor'))} className="relative w-[340px] sm:w-[380px] md:w-[400px] h-[650px] sm:h-[740px] lg:h-[800px] mt-2 flex justify-center items-center overflow-hidden">
          <AnimatePresence>
            {!isLoaded && (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
                    {activeTab === 'totem' ? <Compass className="w-7 h-7 text-[#068B35]" /> : <Smartphone className="w-7 h-7 text-[#068B35]" />}
                  </div>
                </div>
                <span className="text-sm font-raleway font-medium text-white/80 tracking-wide mb-1">{lang === 'it' ? 'Caricamento prototipo Figma...' : 'Loading Figma prototype...'}</span>
                <span className="text-xs font-raleway text-white/40">{lang === 'it' ? 'Ottimizzazione del flusso interattivo' : 'Optimizing interactive flow'}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: activeTab === 'totem' ? 1 : 0, y: activeTab === 'totem' ? 0 : 15 }} transition={{ duration: 0.3 }} className="absolute inset-0 w-full h-full flex justify-center items-center" style={{ pointerEvents: activeTab === 'totem' ? 'auto' : 'none', zIndex: activeTab === 'totem' ? 10 : 1 }}>
            <iframe id="totem-prototype-iframe" title="Prototipo totem Orto Botanico" style={{ border: 'none', width: '100%', height: '100%' }} width="100%" height="100%" loading="eager" allow="clipboard-read; clipboard-write; fullscreen" onLoad={() => setIsLoaded(true)} className={`transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} src="https://embed.figma.com/proto/gnhkgpC09NhaH8PuuA87HM/UI-UX-Orto-Botanico?node-id=1509-1744&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&show-proto-sidebar=0&hide-ui=1&embed-host=share&bg-color=050505" allowFullScreen />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: activeTab === 'mobile' ? 1 : 0, y: activeTab === 'mobile' ? 0 : 15 }} transition={{ duration: 0.3 }} className="absolute inset-0 w-full h-full flex justify-center items-center" style={{ pointerEvents: activeTab === 'mobile' ? 'auto' : 'none', zIndex: activeTab === 'mobile' ? 10 : 1 }}>
            <iframe id="mobile-prototype-iframe" title="Prototipo mobile Orto Botanico" style={{ border: 'none', width: '100%', height: '100%' }} width="100%" height="100%" loading="eager" allow="clipboard-read; clipboard-write; fullscreen" onLoad={() => setIsLoaded(true)} className={`orto-mobile-prototype-crop transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} src="https://embed.figma.com/proto/mI6bKgIz6OfwPeo7GeoaDK/ORTO-BOTANICO?node-id=154-6774&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=154%3A6774&show-proto-sidebar=0&hide-ui=1&embed-host=share&bg-color=050505" allowFullScreen />
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col items-start text-left gap-6 lg:gap-8 max-w-[420px] w-full">
          <h2 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-[#068B35] font-raleway leading-none uppercase text-left">Provalo</h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed font-raleway text-left">
            {lang === 'it' ? "Puoi provare il prototipo dall'anteprima a sinistra o cliccando sul pulsante qui sotto" : 'You can test the prototype from the preview on the left or by clicking the button below'}
          </p>
          <div className="mt-2 flex items-start">
            <a href={activeTab === 'totem' ? 'https://www.figma.com/proto/gnhkgpC09NhaH8PuuA87HM/UI-UX-Orto-Botanico?node-id=1509-1744&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&show-proto-sidebar=1' : 'https://www.figma.com/proto/mI6bKgIz6OfwPeo7GeoaDK/ORTO-BOTANICO?node-id=154-6774&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=154%3A6774'} target="_blank" rel="noopener noreferrer" className="block w-fit group">
              <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative flex items-center gap-3 px-8 py-4 bg-[#068B35] hover:bg-[#057A2E] text-white rounded-full shadow-[0_0_20px_rgba(6,139,53,0.35)] transition-colors duration-300 overflow-hidden cursor-pointer">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative font-raleway font-semibold tracking-wide text-sm md:text-base">{lang === 'it' ? 'Prova il Prototipo' : 'Try the Prototype'}</span>
                <ArrowUpRight className="relative w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
              </motion.span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
