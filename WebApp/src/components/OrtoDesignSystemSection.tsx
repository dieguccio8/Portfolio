import React from 'react';

type OrtoDesignSystemSectionProps = {
  lang: string;
  copiedColor: string | null;
  onCopyHex: (hex: string) => void;
};

const getAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const categoryColors = [
  { labelIt: 'Orto Generale', labelEn: 'General Garden', bg: '#0054F0' },
  { labelIt: 'Tropicale', labelEn: 'Tropical', bg: '#EEBE00' },
  { labelIt: 'Orto Siculo', labelEn: 'Sicilian Garden', bg: '#28BF31' },
  { labelIt: 'Arido', labelEn: 'Arid', bg: '#CE2B37' },
  { labelIt: 'Mediterraneo', labelEn: 'Mediterranean', bg: '#6B4FD4' },
  { labelIt: 'Fontanella', labelEn: 'Water Fountain', bg: '#39A1F6' },
  { labelIt: 'Bagni', labelEn: 'Restrooms', bg: '#00025D' },
];

const mapCategories = ['Arido', 'Bagni', 'Fontanella', 'Mediterraneo', 'Orto Generale', 'Orto Siculo', 'Tropicale', 'Tu sei qui'];

export function OrtoDesignSystemSection({ lang, copiedColor, onCopyHex }: OrtoDesignSystemSectionProps) {
  const palette = ['#068B35', '#FFFFFF', '#EBEBEB'];

  return (
    <section className="flex flex-col gap-6 text-left" id="orto-design-system-section" aria-label="Design system Orto Botanico">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        <div className="md:col-span-3 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-sm font-raleway uppercase tracking-widest text-neutral-400 font-bold mb-8 relative z-10 text-center">Color Palette</h3>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            {palette.map((color) => (
              <button key={color} onClick={() => onCopyHex(color)} className="group/btn flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-14 h-14 rounded-full shadow-lg border border-white/10 shrink-0 transition-transform group-hover/btn:scale-110" style={{ backgroundColor: color }} />
                <div className="text-center">
                  <span className="text-[11px] font-raleway text-neutral-500 group-hover/btn:text-white transition-colors">{copiedColor === color ? 'Copied' : color}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-9 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 relative z-10 w-full" id="orto-categories-row">
            {categoryColors.map((item, index) => (
              <button key={item.bg} onClick={() => onCopyHex(item.bg)} className="flex items-center gap-3 group/pill cursor-pointer" id={`category-pill-${index}`}>
                <div className="w-6 h-6 rounded-full shadow-md border border-white/10 shrink-0 transition-transform group-hover/pill:scale-110" style={{ backgroundColor: item.bg }} />
                <div className="text-left">
                  <span className="font-semibold text-sm text-white/90 block">{lang === 'it' ? item.labelIt : item.labelEn}</span>
                  <span className="font-raleway text-[11px] text-neutral-500 group-hover/pill:text-white transition-colors">{copiedColor === item.bg ? 'Copied!' : item.bg}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 shadow-2xl relative overflow-hidden group flex flex-col gap-12" id="orto-block-components">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-10 relative z-10 w-full items-start">
            <div className="flex flex-col gap-6 w-full lg:w-auto lg:min-w-[320px] xl:min-w-[380px]">
              <img src="./Images/Project 01/design_system/searchbar/State=Default.svg" alt="Search Default" className="w-full max-w-[380px] h-auto object-contain drop-shadow-lg hover:-translate-y-1 transition-transform" />
              <img src="./Images/Project 01/design_system/searchbar/State=Typing.svg" alt="Search Typing" className="w-full max-w-[380px] h-auto object-contain drop-shadow-lg hover:-translate-y-1 transition-transform" />
              <img src="./Images/Project 01/design_system/searchbar/State=Suggestions.svg" alt="Search Suggestions" className="w-full max-w-[380px] h-auto object-contain drop-shadow-lg hover:-translate-y-1 transition-transform" />
              <div className="mt-8">
                <img src="./Images/Project 01/design_system/button_primary.svg" alt="Button Primary" className="w-full max-w-[240px] h-auto object-contain drop-shadow-md hover:scale-105 transition-transform origin-left" />
              </div>
            </div>
            <div className="flex flex-col gap-8 items-start w-full lg:w-auto">
              <img src="./Images/Project 01/design_system/card_pianta.svg" alt="Card Pianta" className="w-full max-w-[240px] h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300" />
              <img src="./Images/Project 01/design_system/tag.svg" alt="Tag" className="h-10 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform origin-left" />
              <div className="flex items-center gap-8">
                <img src="./Images/Project 01/design_system/language.svg" alt="Language" className="h-28 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform" />
                <img src="./Images/Project 01/design_system/button_scopri_piante.svg" alt="Button Scopri Piante" className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform" onError={(event) => { event.currentTarget.src = './Images/Project 01/design_system/button_scopri_pianta.png'; }} />
              </div>
              <div className="mt-4 -ml-12 lg:-ml-20 xl:-ml-36">
                <img src="./Images/Project 01/design_system/button_percorso.png" alt="Button Percorso" className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform origin-left" />
              </div>
            </div>
          </div>
          <div className="w-full relative z-10 pt-8 lg:pt-12 border-t border-white/5 mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 w-full mx-auto">
              {mapCategories.map((variant) => (
                <img key={variant} src={getAssetUrl(`Images/Project 01/design_system/button_categorie/State=Unselected, Variant=${variant}, Size=Large.svg`)} alt={`Categoria ${variant}`} className="w-full h-auto max-h-10 lg:max-h-12 object-contain drop-shadow-sm hover:scale-105 transition-transform" />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
            <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex flex-col gap-2 relative z-10">
              <span className="font-raleway text-[11px] text-[#068B35] font-bold uppercase tracking-wider mb-2">Body / Raleway, Regular, 28px</span>
              <p style={{ fontFamily: "'Raleway', sans-serif" }} className="text-[#EBEBEB] text-xl md:text-2xl leading-relaxed font-light">
                {lang === 'it' ? 'Esplora la ricca biodiversità della nostra collezione di piante tropicali, progettata per stupire e ispirare.' : 'Explore the rich biodiversity of our tropical plant collection, designed to amaze and inspire.'}
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex flex-col gap-2 relative z-10 w-full">
              <span className="font-raleway text-[11px] text-[#068B35] font-bold uppercase tracking-wider mb-2">H1 / Raleway, Semibold, 62px</span>
              <div style={{ fontFamily: "'Raleway', sans-serif" }} className="text-white text-4xl md:text-[56px] lg:text-[62px] font-semibold leading-tight tracking-tight">
                {lang === 'it' ? 'Scegli il percorso' : 'Choose the path'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
