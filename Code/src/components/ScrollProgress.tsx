import { useScroll, useSpring, motion } from 'motion/react';

export function ScrollProgress({ color = '#E8302A' }: { color?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1.5px] origin-left z-[999] pointer-events-none"
      style={{ scaleX, backgroundColor: color }}
    />
  );
}
