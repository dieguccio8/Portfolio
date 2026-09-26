import ThreeDMarquee from './ui/3d-marquee';

export function OrtoAppShowcaseSection() {
  return (
    <section
      id="orto-app-showcase-section"
      aria-label="Schermate dell'app Orto Botanico"
      className="mt-24 md:mt-32 w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden"
    >
      <ThreeDMarquee />
    </section>
  );
}
