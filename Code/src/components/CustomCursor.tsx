import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorMode = 'default' | 'button' | 'image' | 'text';

const RING_SPRING = { stiffness: 120, damping: 18, mass: 0.8 };

export function CustomCursor({ color = '#E8302A' }: { color?: string }) {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, RING_SPRING);
  const ringY = useSpring(dotY, RING_SPRING);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const move = (e: MouseEvent) => {
      setIsVisible(true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
      });
    };

    const detectMode = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      const isBtn = el.closest('button, a, [role="button"]');
      const isImg = el.closest('img, [data-cursor="image"]');
      const isText = !isBtn && !isImg && el.closest('p, h1, h2, h3, h4, li');
      if (isBtn) setMode('button');
      else if (isImg) setMode('image');
      else if (isText) setMode('text');
      else setMode('default');
    };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mousemove', detectMode, { passive: true });
    document.addEventListener('mouseenter', () => setIsVisible(true));
    document.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousemove', detectMode);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dotX, dotY]);

  const ringSize = mode === 'button' ? 52 : mode === 'image' ? 64 : mode === 'text' ? 20 : 36;
  const dotSize = mode === 'text' ? 2 : 5;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: dotSize, height: dotSize, opacity: isVisible ? 1 : 0, backgroundColor: mode === 'image' ? '#ffffff' : color }}
        transition={{ duration: 0.12 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] flex items-center justify-center overflow-hidden"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? 1 : 0,
          borderColor: mode === 'button' ? color : mode === 'image' ? '#ffffff' : 'rgba(255,255,255,0.35)',
          backgroundColor: mode === 'button' ? `${color}12` : 'transparent',
        }}
        transition={{ duration: 0.18 }}
      >
        {mode === 'image' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[7px] font-mono uppercase tracking-[0.25em] text-white font-bold select-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
