import React from 'react';

export function OrtoMobileMockupShowcaseSection() {
  const [mobileImageIndex, setMobileImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setMobileImageIndex((previousIndex) => (previousIndex === 0 ? 1 : 0));
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="mobile-mockup-showcase"
      className="relative z-30 flex flex-col justify-center items-center w-[100vw] left-1/2 -translate-x-1/2 h-[60vh] md:h-[100vh]"
    >
      <div className="relative w-full h-full">
        <img
          src="./Images/Project 01/mockup_mobile.jpg"
          alt="Bussola Verde App Preview 1"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 shadow-2xl ${mobileImageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}
        />
        <img
          src="./Images/Project 01/mockup_mobile_2.jpg"
          alt="Bussola Verde App Preview 2"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 shadow-2xl ${mobileImageIndex === 1 ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </section>
  );
}
