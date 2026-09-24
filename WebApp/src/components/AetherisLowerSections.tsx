import InteractiveBentoSection from './InteractiveBentoSection';
import { OrtoResearchMethodologySection } from './OrtoResearchMethodologySection';
import { OrtoMobileMockupShowcaseSection } from './OrtoMobileMockupShowcaseSection';
import { OrtoUserPersonaSection } from './OrtoUserPersonaSection';
import { OrtoTotemShowcaseSection } from './OrtoTotemShowcaseSection';
import { OrtoInteractivePhoneSection } from './OrtoInteractivePhoneSection';


interface Props {
  project: any;
  activeResearchTab: string;
  setActiveResearchTab: (tab: string) => void;
  lang: string;
}

export function AetherisLowerSections({
  activeResearchTab,
  setActiveResearchTab,
}: Props) {
  return (
    <div className="flex flex-col gap-24 sm:gap-32 w-full">

      <OrtoResearchMethodologySection
        activeResearchTab={activeResearchTab}
        setActiveResearchTab={setActiveResearchTab}
      />

      {/* 02 / ANALYSIS & STRATEGY: PROBLEMS VS SOLUTIONS */}
      <section id="problems-solutions" className="relative z-20 w-full -mt-[10vh] md:-mt-[25vh]">
        <InteractiveBentoSection />
      </section>

      <OrtoMobileMockupShowcaseSection />

      <OrtoUserPersonaSection />

      <OrtoTotemShowcaseSection />

      <OrtoInteractivePhoneSection />
    </div>
  );
}
