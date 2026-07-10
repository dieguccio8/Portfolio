import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, DollarSign, ShieldCheck, Check } from 'lucide-react';

const phases = [
  {
    id: 'issuing',
    title: 'Issuing',
    icon: <CreditCard className="w-5 h-5 text-emerald-400" />,
    features: ['Issue any card type', 'Tokenization', 'Printing & Logistics'],
    linkText: 'Explore Issuing',
    linkHref: '#'
  },
  {
    id: 'processing',
    title: 'Processing',
    icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
    features: ['Authorization', 'Clearing', 'Settlement'],
    linkText: 'Explore Processing',
    linkHref: '#'
  },
  {
    id: 'bin-sponsorship',
    title: 'BIN Sponsorship',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    features: ['Regulatory Compliance', 'Licensing', 'Risk Management'],
    linkText: 'Explore BIN Sponsorship',
    linkHref: '#'
  }
];

export default function TimelineAccordion() {
  const [activePhase, setActivePhase] = useState<string>('issuing');

  return (
    <div className="pointer-events-auto col-span-full duration-500 ease-in-out lg:col-span-4 w-full max-w-lg font-raleway mx-auto lg:ml-12">
      {phases.map((phase, index) => {
        const isActive = activePhase === phase.id;
        
        return (
          <div 
            key={phase.id}
            role="button" 
            tabIndex={0} 
            className="phase-item py-6 relative flex cursor-pointer gap-4 outline-none group"
            onClick={() => setActivePhase(phase.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActivePhase(phase.id);
              }
            }}
            aria-expanded={isActive}
          >
            {/* Top Separator Line for inactive items (except first) */}
            {index > 0 && !isActive && (
              <span className="h-[1px] absolute top-0 left-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300"></span>
            )}
            
            <div className="phase-content relative flex lg:block flex-wrap w-full">
              {/* Vertical Connection Line */}
              <span 
                className="left-6 lg:-left-12 absolute top-0 h-[calc(100%+3rem)] w-[1px] border-l border-dashed border-white/20"
              >
                {/* Active gradient overlay line inside */}
                <motion.span 
                  initial={{ height: 0 }}
                  animate={{ height: isActive ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-emerald-400 to-[#068B35]" 
                />
              </span>
              
              {/* Circular Icon Container */}
              <div className="bg-[#121312] relative flex h-12 w-12 items-center justify-center rounded-full lg:absolute lg:-top-2 lg:-left-[4.2rem] shrink-0 border border-white/10 z-10 transition-all duration-300">
                {/* Glow effect for active state */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-[-4px] rounded-full blur-md bg-emerald-500/20 border border-emerald-400"
                    />
                  )}
                </AnimatePresence>
                
                {/* Internal Icon */}
                <div className="relative z-10">
                  {phase.icon}
                </div>
              </div>

              {/* Accordion Content */}
              <div className="relative ml-20 lg:ml-0 w-full">
                
                {/* Title */}
                <div className="flex items-center lg:min-h-12 lg:-translate-y-2">
                  <p className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                    {phase.title}
                  </p>
                </div>
                
                {/* Expandable Body */}
                <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} lg:-mt-2`}>
                  <div className="min-h-0">
                    <div className="relative space-y-4 text-white pb-4 pt-2">
                      
                      {/* Features List */}
                      <ul className="m-0 list-none space-y-2 p-0">
                        {phase.features.map((feature, idx) => (
                          <li key={idx} className="list-none">
                            <div className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                              <p className="text-sm text-white/90 font-light">{feature}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Explore Link */}
                      <a className="inline-block relative overflow-visible group/link mt-2" href={phase.linkHref}>
                        <span className="relative z-10 text-emerald-400 text-sm font-semibold border-b border-emerald-400/30 group-hover/link:border-emerald-400 transition-colors pb-[2px] uppercase tracking-wider">
                          {phase.linkText}
                        </span>
                      </a>

                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
