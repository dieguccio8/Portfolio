"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl?: string;
  content?: React.ReactNode;
  alt?: string;
  linkUrl?: string;
}

interface CardFanCarouselProps {
  cards: CardItem[];
}

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.4;
  if (width < 640) return 0.5;
  if (width < 768) return 0.7;
  if (width < 1024) return 0.85;
  return 1.0;
}

function getHeightMultiplier(width: number) {
  return 1.0; // Keep height consistent, handle via CSS if needed
}

function getCardConfig(offset: number) {
  const absOffset = Math.abs(offset);
  const isHidden = absOffset > 1; // Show center, left (1), right (1). Hide others.
  
  return {
    rot: offset * 8, // Rotation in degrees
    scale: Math.max(0.6, 1.0 - 0.15 * absOffset),
    x: offset * 22, // X translation in rem
    y: absOffset * 2, // Y translation in rem
    zIndex: 10 - absOffset,
    opacity: isHidden ? 0 : 1,
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-white/10 bg-white/5 backdrop-blur-[16px] text-white/55 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-white/25 hover:text-white/80 active:opacity-70 transition-colors duration-300 before:content-[''] before:absolute before:inset-[3px] before:rounded-full before:border before:border-white/[0.04] before:pointer-events-none";

export default function CardFanCarousel({ cards }: CardFanCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const [centerIndex, setCenterIndex] = useState(0);

  const totalCards = cards.length;
  // Always show arrows
  const needsPagination = totalCards > 1;

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    
    setCenterIndex(prev => {
      const next = direction === "right" 
        ? (prev + 1) % totalCards 
        : (prev - 1 + totalCards) % totalCards;
      return next;
    });
  }, [totalCards, needsPagination]);

  const getOffset = (index: number, center: number, total: number) => {
    let diff = (index - center) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    // For 4 cards, total/2 is 2. Diff can be 2. Let's make it consistent.
    if (diff === 2 && center % 2 === 0) diff = 2; // Optional: stable tie-breaking
    return diff;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const multiplier = getResponsiveMultiplier(window.innerWidth);
    
    let completedCount = 0;
    const onCardDone = () => {
      completedCount++;
      if (completedCount >= totalCards) {
        isAnimating.current = false;
      }
    };

    cardElements.forEach((card, i) => {
      const offset = getOffset(i, centerIndex, totalCards);
      const config = getCardConfig(offset);
      
      const target = {
        x: `${config.x * multiplier}rem`,
        y: `${config.y}rem`,
        rotation: config.rot,
        scale: config.scale,
        opacity: config.opacity,
        zIndex: config.zIndex,
        xPercent: -50,
        yPercent: -50,
      };

      gsap.to(card, {
        ...target,
        duration: 0.6,
        ease: "power3.out",
        onComplete: onCardDone
      });
    });

  }, [centerIndex, totalCards]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg className="relative z-[2] w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <div className="flex flex-col items-center w-full py-4 lg:py-8 px-4 md:px-8 relative z-20">
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div ref={containerRef} className="fan-layout relative w-full h-[450px]">
          {cards.map((card, index) => {
            const contentNode = card.content ? (
              <div className="relative w-full h-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden p-6 md:p-8 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-colors">
                {card.content}
              </div>
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-[2rem] shadow-xl border border-white/10">
                <img src={card.imgUrl} loading="lazy" alt={card.alt || `Card ${index}`} className="absolute inset-0 w-full h-full object-cover z-10" />
              </div>
            );
            return card.linkUrl ? (
              <a key={index} href={card.linkUrl} target={card.linkUrl.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="fan-card absolute top-1/2 left-1/2 w-[280px] h-[360px] md:w-[320px] md:h-[420px] block cursor-pointer select-none">{contentNode}</a>
            ) : (
              <div key={index} className="fan-card absolute top-1/2 left-1/2 w-[280px] h-[360px] md:w-[320px] md:h-[420px] select-none">{contentNode}</div>
            );
          })}
        </div>
      </div>

      {needsPagination && (
        <div className="flex items-center justify-center gap-6 mt-12 z-30">
          <button className={`${ARROW_CLASSES} w-12 h-12`} onClick={() => cycle("left")} aria-label="Previous">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-3">
            {cards.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCenterIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === centerIndex ? "bg-white scale-[1.3]" : "bg-white/20 hover:bg-white/40"}`} 
              />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-12 h-12`} onClick={() => cycle("right")} aria-label="Next">
            {chevron("right")}
          </button>
        </div>
      )}
    </div>
  );
}
