import { StickyCard002 } from './ui/sticky-card';

const totemShowcaseCards = [
  { id: 1, image: './Images/Project 01/mockup_totem_3.jpg', alt: 'Totem Mockup 3' },
  { id: 2, image: './Images/Project 01/mockup_totem.jpg', alt: 'Totem Mockup' },
  { id: 3, image: './Images/Project 01/mockup_cartello_zone_2.jpeg', alt: 'Cartello Zone Mockup' },
  { id: 4, image: './Images/Project 01/mockup_cartello_pianta_2.jpg', alt: 'Cartello Pianta Mockup 2' },
];

export function OrtoTotemShowcaseSection() {
  return (
    <section id="totem-showcase" className="relative z-10 w-full shrink-0 block">
      <StickyCard002 cards={totemShowcaseCards} />
    </section>
  );
}
