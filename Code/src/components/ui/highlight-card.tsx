"use client";

import React, { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { BorderRotate } from "@/components/ui/animated-gradient-border";

interface ComponentProps {
  title: string;
  description?: string[];
  icon?: ReactNode;
  children?: ReactNode;
  animatedBorder?: boolean;
}

const HighlightCard: FC<ComponentProps> = ({ title, description, icon, children, animatedBorder }) => {
  const cardContent = (
    <Card className={`text-white rounded-2xl shadow-2xl relative backdrop-blur-xl overflow-hidden hover:shadow-[#068B35]/10 hover:shadow-3xl w-full h-full ${animatedBorder ? 'border-0 bg-transparent' : 'border border-white/10 bg-black hover:border-[#068B35]/40'}`}>
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#068B35]/5 to-[#068B35]/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-[#068B35]/15 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#068B35]/10 blur-xl animate-ping"></div>
        <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-[#068B35]/10 blur-lg animate-ping"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#068B35]/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
      </div>

      <div className="p-12 relative z-10 flex flex-col items-center text-center h-full justify-between">
        <div className="flex flex-col items-center w-full">
          {icon && (
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-[#068B35]/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-[#068B35]/20 animate-pulse"></div>

              <div className="p-6 rounded-full backdrop-blur-lg border border-[#068B35]/30 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl transform group-hover:scale-110 transition-all duration-500 hover:shadow-[#068B35]/20">
                <style>{`
                  @keyframes pulseIconColor {
                    0% { opacity: 1; filter: drop-shadow(0 0 10px rgba(6,139,53,0.8)); }
                    50% { opacity: 0.5; filter: drop-shadow(0 0 2px rgba(6,139,53,0.2)); }
                    100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(6,139,53,0.8)); }
                  }
                `}</style>
                <div 
                  className="transform transition-transform duration-700 text-[#068b35]"
                  style={{ animation: 'pulseIconColor 3s infinite' }}
                >
                  {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { className: (icon as any).props.className?.replace('text-white', '') }) : icon}
                </div>
              </div>
            </div>
          )}

          <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse transform group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>

          {description && description.length > 0 && (
            <div className="space-y-4 max-w-sm">
              {description.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-sm leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300 ${idx === description.length - 1 ? 'text-xs font-mono uppercase tracking-widest font-bold text-neutral-400 mt-4' : 'text-gray-300 italic font-light'}`}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {children && (
            <div className="w-full mt-6 text-left">
              {children}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mt-6 w-full">
          <div className="w-1/3 h-0.5 bg-gradient-to-r from-transparent via-[#068B35] to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse"></div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#068B35]/15 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#068B35]/15 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  );

  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1 h-full">
      {animatedBorder ? (
        <BorderRotate
          animationSpeed={8}
          gradientColors={{
            primary: '#068b35',
            secondary: '#023011', // Very dark green, almost black
            accent: '#068b35'
          }}
          backgroundColor="#000000"
          borderWidth={1.5}
          borderRadius={16}
          className="w-full h-full"
        >
          {cardContent}
        </BorderRotate>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default HighlightCard;
