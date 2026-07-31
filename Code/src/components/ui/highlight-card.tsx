"use client";

import React, { FC, ReactNode, useRef } from "react";
import { Card } from "@/components/ui/card";

interface ComponentProps {
  title: string;
  description?: string[];
  icon?: ReactNode;
  children?: ReactNode;
  animatedBorder?: boolean;
  className?: string;
}

const HighlightCard: FC<ComponentProps> = ({ title, description, icon, children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group cursor-pointer transform transition-all duration-700 hover:-translate-y-2 h-full ${className || ''}`}
    >
      <Card className="text-white rounded-[2rem] relative overflow-hidden w-full h-full border border-white/5 bg-[#030604] backdrop-blur-3xl flex flex-col justify-between p-8 sm:p-12 z-10 shadow-2xl">
        
        {/* Dynamic interactive mouse spotlight */}
        <div 
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6, 139, 53, 0.15), transparent 40%)`
          }}
        />

        {/* Core background glows matching the reference */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Subtle top/side inner highlight */}
          <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),_inset_0_0_20px_rgba(6,139,53,0.05)] rounded-[2rem]" />
          
          {/* Massive diffuse bottom glow */}
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[140%] h-72 bg-[#068B35]/30 blur-[90px] opacity-70 group-hover:opacity-100 group-hover:h-80 transition-all duration-1000" />
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-[#068B35]/40 blur-[60px] opacity-60 group-hover:opacity-90 transition-all duration-1000" />
          
          {/* Intense sharp bottom edge highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#068B35] to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Faint grid texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700" 
            style={{ 
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
              backgroundSize: '32px 32px' 
            }} 
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
          <div className="flex flex-col items-center w-full">
            {icon && (
              <div className="relative mb-8">
                <div className="p-5 rounded-full border border-white/5 bg-white/5 shadow-xl backdrop-blur-md transform group-hover:scale-110 transition-transform duration-700">
                  <div className="text-[#068b35] opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                    {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { className: (icon as any).props.className?.replace('text-white', '') } as any) : icon}
                  </div>
                </div>
              </div>
            )}

            <h3 className="mb-4 text-2xl font-medium tracking-tight text-white/90 group-hover:text-white transition-colors duration-700">
              {title}
            </h3>

            {description && description.length > 0 && (
              <div className="space-y-4 max-w-sm mt-2">
                {description.map((line, idx) => (
                  <p
                    key={idx}
                    className={`text-base leading-relaxed transition-colors duration-700 ${idx === description.length - 1 ? 'text-xs font-mono uppercase tracking-widest font-bold text-[#068B35] mt-6' : 'text-neutral-200'}`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}

            {children && (
              <div className="w-full mt-4 text-left">
                {children}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HighlightCard;
