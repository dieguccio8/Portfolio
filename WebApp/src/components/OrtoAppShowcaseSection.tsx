import ThreeDMarquee from './ui/3d-marquee';

export function OrtoAppShowcaseSection() {
  return (
    <section
      id="orto-app-showcase-section"
      aria-label="Schermate dell'app Orto Botanico"
      className="pt-16 pb-16 md:pb-24 lg:pb-32 w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden"
    >
      <ThreeDMarquee />
    </section>
  );
}
