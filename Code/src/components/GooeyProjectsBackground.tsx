import React, { useEffect, useRef } from "react";

export const GooeyProjectsBackground: React.FC = () => {
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (!text1 || !text2) return;

    const texts = ["Diego Cavallaro", "Portfolio"];
    const morphTime = 1;
    const cooldownTime = 3;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    text1.textContent = texts[textIndex % texts.length];
    text2.textContent = texts[(textIndex + 1) % texts.length];

    let animationFrameId: number;

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;
      
      let fraction = morph / morphTime;
      
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      
      setMorph(fraction);
    }

    function setMorph(fraction: number) {
      text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2.style.opacity = `${Math.pow(fraction, 0.4)}`;
      
      fraction = 1 - fraction;
      text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text1.style.opacity = `${Math.pow(fraction, 0.4)}`;
      
      text1.textContent = texts[textIndex % texts.length];
      text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;
      
      text2.style.filter = "";
      text2.style.opacity = "1";
      
      text1.style.filter = "";
      text1.style.opacity = "0";
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      
      cooldown -= dt;
      
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[30vh] min-h-[200px] flex items-center justify-center overflow-visible pointer-events-none select-none z-10 my-4">
      
      <svg id="filters" style={{ width: 0, height: 0, position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        id="container"
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{ filter: "url(#threshold)" }}
      >
        <h1
          id="text1"
          ref={text1Ref}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-kreatives font-normal pointer-events-none select-none m-0 text-white w-max"
          style={{
            whiteSpace: "nowrap",
            lineHeight: "0.95",
            fontSize: "clamp(3rem, 14vw, 16rem)",
          }}
        />
        <h1
          id="text2"
          ref={text2Ref}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-kreatives font-normal pointer-events-none select-none m-0 text-white w-max"
          style={{
            whiteSpace: "nowrap",
            lineHeight: "0.95",
            fontSize: "clamp(3rem, 14vw, 16rem)",
          }}
        />
      </div>
    </div>
  );
};
