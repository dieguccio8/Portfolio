"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ComponentProps {
  title: string;
  description?: string[];
  icon?: ReactNode;
  children?: ReactNode;
}

const HighlightCard: FC<ComponentProps> = ({ title, description, icon, children }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1 h-full">
      <Card className="text-white rounded-2xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-[#068B35]/40 hover:shadow-[#068B35]/10 hover:shadow-3xl w-full h-full">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#068B35]/5 to-[#068B35]/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-[#068B35]/15 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#068B35]/10 blur-xl animate-ping"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-[#068B35]/10 blur-lg animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#068B35]/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>

        <div className="p-8 relative z-10 flex flex-col items-center text-center h-full justify-between">
          <div className="flex flex-col items-center w-full">
            {icon && (
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-[#068B35]/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border border-[#068B35]/20 animate-pulse"></div>

                <div className="p-6 rounded-full backdrop-blur-lg border border-[#068B35]/30 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-[#068B35]/20">
                  <div className="transform group-hover:rotate-180 transition-transform duration-700">
                    {icon}
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
                    className={`text-sm leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300 ${idx === description.length - 1 ? 'text-[9px] font-mono uppercase tracking-widest font-bold text-neutral-400 mt-4' : 'text-gray-300 italic font-light'}`}
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

            <div className="flex space-x-2 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 bg-[#068B35] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#068B35] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-[#068B35] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#068B35]/15 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#068B35]/15 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  );
};

export default HighlightCard;
