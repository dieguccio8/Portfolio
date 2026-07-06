import { useEffect } from 'react';

/**
 * ScrollReveal — CSS IntersectionObserver approach.
 * Elements with [data-reveal] start hidden via CSS and get class "revealed" when they enter viewport.
 * NO dependency on GSAP ScrollTrigger or Lenis internals — zero conflict.
 */
export function ScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Hero parallax — pure rAF, no GSAP needed
    const heroBg = document.querySelector('.hero-bg-img') as HTMLElement;
    let rafId = 0;
    
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = document.getElementById('hero-section')?.offsetHeight ?? window.innerHeight;
        if (scrollY <= heroHeight && heroBg) {
          heroBg.style.transform = `translateZ(0) translateY(${scrollY * 0.22}px)`;
        }
      });
    };

    if (heroBg) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // IntersectionObserver for all [data-reveal] elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-revealed');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    // Small timeout to let React finish painting
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll as EventListener);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
