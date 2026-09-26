import { useEffect, useState } from 'react';

const mockups = [
  { src: './Images/Project 02/Mockup/mockup_tshirt.jpg', alt: 'Urban StreetArt Sicily Mockup T-Shirt', position: '' },
  { src: './Images/Project 02/Mockup/mockup_cappello.jpg', alt: 'Urban StreetArt Sicily Mockup Cappello', position: '' },
  { src: './Images/Project 02/Mockup/mockup_totebag.jpg', alt: 'Urban StreetArt Sicily Mockup Tote Bag', position: 'object-[center_75%]' },
];

export function UrbanStreetArtMockupShowcaseSection() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((previous) => (previous + 1) % mockups.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="urban-streetart-mockup-showcase"
      data-project-section="05-mockup-showcase"
      aria-label="Mockup Urban StreetArt Sicily"
      className="relative z-10 flex flex-col justify-center items-center w-[100vw] left-1/2 -translate-x-1/2 h-[60vh] md:h-[100vh] mt-0"
    >
      <div className="relative w-full h-full">
        {mockups.map((mockup, index) => (
          <img
            key={mockup.src}
            src={mockup.src}
            alt={mockup.alt}
            className={`absolute inset-0 w-full h-full object-cover ${mockup.position} transition-opacity duration-1000 shadow-2xl ${activeImage === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </section>
  );
}
