"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "../../lib/utils";

export interface CardData {
  id: number | string;
  image: string;
  alt?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef(null);
  const stickyRef = useRef(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const imageElements = imageRefs.current.slice(0, cards.length);
      const totalCards = imageElements.length;

      if (!imageElements[0] || totalCards === 0) return;

      // Initialize positions
      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });
      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      // Create timeline mapped to the scrolling of the container
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom", // Finishes when the wrapper reaches its end
          scrub: 1,
          pin: false, // NO PINNING! Handled by CSS sticky natively
        },
      });

      // Add an initial dedicated pause for the first image so it stays still longer
      scrollTimeline.to({}, { duration: 1.5 });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        if (!currentImage || !nextImage) continue;

        // Transition out current
        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1.5,
            ease: "power2.inOut",
          },
          ">"
        );

        // Transition in next
        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<"
        );

        // Pause to view the newly arrived image
        scrollTimeline.to({}, { duration: 1.5 });
      }
    },
    { scope: container }
  );

  return (
    <div 
      className={cn("w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]", className)} 
      ref={container}
      style={{ height: `${cards.length * 150}vh` }} // Set the height based on card count (increased for slower scroll)
    >
      {/* NATIVE STICKY WRAPPER */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden p-3 lg:p-8"
      >
        <div
          className={cn(
            "relative h-[90%] w-full max-w-3xl overflow-hidden rounded-[2rem] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[85vw]",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt || ""}
              className={cn(
                "rounded-[2rem] absolute inset-0 h-full w-full object-cover shadow-2xl",
                imageClassName,
              )}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { StickyCard002 };
