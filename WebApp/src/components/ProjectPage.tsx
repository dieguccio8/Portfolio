import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  User,
  Briefcase,
  Compass,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  Info,
  MapPin,
  ExternalLink,
  RefreshCw,
  Clock,
  Heart,
  QrCode,
  AlertTriangle,
  Smartphone,
  Target,
  Globe,
  BookOpen,
  Trash2,
  Upload,
  Image,
  MessageSquare,
  Menu,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Project } from '../types';
import UserJourney from './UserJourney';
import ProjectRightColumn from './ProjectRightColumn';
import InteractiveBentoSection from './InteractiveBentoSection';
import KineticsLowerSections from './KineticsLowerSections';
import ChronosLowerSections from './ChronosLowerSections';
import { AetherisLowerSections } from './AetherisLowerSections';
import { LogoMorph } from './LogoMorph';
import IphoneMockup3D from './IphoneMockup3D';
import { CustomCursor } from './CustomCursor';
import { SmoothScroll } from './SmoothScroll';
import { ScrollProgress } from './ScrollProgress';
import { ScrollReveal } from './ScrollReveal';
import { FloatingPaths } from './ui/background-paths';

import HighlightCard from './ui/highlight-card';
import AuroraBackground from './ui/aurora-background';
import { Button3D } from './ui/3d-button';


function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button clicked or dragged
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={(e) => handleMove(e.clientX)}
      className="absolute inset-0 z-20 select-none cursor-ew-resize overflow-hidden"
    >
      {/* After Image (Controlled by clipping path) */}
      <div
        className="absolute inset-0 bg-[#0D0D0D] pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <div className="absolute inset-0 bg-black/10 z-10" />
        <img
          src="https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?q=80&w=800&auto=format&fit=crop"
          alt="After Rebrand"
          className="w-full h-full object-cover brightness-100 contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 right-6 z-20 px-4 py-1.5 bg-[#FCD306] border border-[#0D0D0D]/10 text-sm font-raleway text-[#0D0D0D] font-bold uppercase tracking-wider rounded-none">
          AFTER: Ecosistema Editoriale Culturale
        </div>
      </div>

      {/* Slider Line Divider */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-[#FCD306] z-30 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-none bg-[#FCD306] border-2 border-[#0D0D0D] shadow-[3px_3px_0px_#2B2B2B] flex items-center justify-center text-[#0D0D0D] font-black text-sm pointer-events-none font-urbanist">
          <span>↔</span>
        </div>
      </div>
    </div>
  );
}

interface ProjectPageProps {
  project: Project;
  onClose: () => void;
  onNavigateToProject: (project: Project) => void;
  allProjects: Project[];
  lang?: 'it' | 'en';
  setLang?: (lang: 'it' | 'en') => void;
}

export default function ProjectPage({ project, onClose, onNavigateToProject, allProjects, lang = 'it', setLang }: ProjectPageProps) {
  // Back to top on mount or project change
  useEffect(() => {
    // Prevent browser native scroll restoration from jumping down
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force native scroll to top
    window.scrollTo(0, 0);

    // If Lenis is active (SmoothScroll), force it to top immediately
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
  }, [project.id]);

  // Localization dictionary for project data
  const getLocalizedField = (field: 'category' | 'description' | 'longDescription' | 'challenge' | 'solution' | 'typography') => {
    if (lang === 'it') {
      return project[field] || '';
    }

    // English translations
    const translations: Record<string, Record<string, string>> = {
      aetheris: {
        category: "Digital ecosystem to improve the exploration of the Botanical Garden of Catania",
        description: "An immersive, typography-focused web system designed for the university Botanical Garden. Seamless navigation through rare species and ecosystems.",
        longDescription: "The Botanical Garden project was born with the intent of digitizing the immense historical botanical heritage, transforming it into an interactive web experience accessible both remotely and on-site via QR codes. We designed a living archive, where visual fluidity meets scientific rigor, offering visitors an immersive journey through secular plants, hot greenhouses, and vintage herbaria.",
        challenge: "The main challenge lay in making a huge scientific database accessible and attractive to a heterogeneous audience (students, tourists, enthusiasts). It was essential to avoid the typical heavy feel of academic portals, while ensuring maximum taxonomic accuracy and flawless performance even on mobile devices within the garden.",
        solution: "We developed an 'organic fluid' interface dominated by elegant typography and micro-animations inspired by the cycles of nature. Navigation is divided into 'Greenhouses', 'Ecosystems', and 'Rare Species'. Thanks to an interactive georeferenced map and themed guided tours (e.g. Succulent Plants, Medicinal Plants), users can explore the park dynamically.",
        typography: "Playfair Display (Impactful Serif for headings) & Inter (Scientific readability for body text)"
      },
      kinetics: {
        category: "Cultural Heritage Mapping & Branding",
        description: "Interactive mapping and visual identity for street art works in Sicily. A brutal and geometric layout to enhance contemporary urban art.",
        longDescription: "Urban StreetArt Sicily is a digital platform and visual identity dedicated to cataloging, locating, and promoting contemporary muralism in Sicily. From the silos of the port of Catania to the alleys of Palermo, the application serves as an open-air museum, guiding users through urban itineraries and exclusive interviews with international artists.",
        challenge: "Uniting the spontaneous and 'rough' soul of street art with a solid, geometric, and highly navigable design system. The system had to support rapid loading of high-resolution photographs and allow users to easily find their way through popular Sicilian neighborhoods.",
        solution: "A design system inspired by brutalist and industrial aesthetics, featuring marked geometric grids, high contrasts, and real geographical coordinates. We integrated a live geolocation system that generates personalized artistic itineraries and a high-resolution photographic archive with dedicated info cards.",
        typography: "Space Grotesk (Geometric brutalism) & JetBrains Mono (Coordinates and metadata)"
      },
      chronos: {
        category: "High-Performance Interface Concept",
        description: "Interface concept for high-speed train quick reservation. Transactional flow optimization and high visual accessibility.",
        longDescription: "A radical conceptual redesign of the digital ticketing experience for Italo Treni. The primary focus is the drastic reduction of steps required to purchase a high-speed ticket, eliminating visual noise in favor of optimal fluidity and a highly inclusive and accessible design system.",
        challenge: "Traditional travel portals are often crowded with promotions, popups, and unnecessary steps that confuse the user. The challenge was to condense the travel search, seat selection, additional services, and payment into a single linear and friction-free flow.",
        solution: "An ultra-linear 'Single-Stream' interface flow. Through the use of flexible cards and optimistic transitions, the user completes the booking in just 3 clicks. We introduced a high-contrast palette compliant with WCAG AAA guidelines, predictive smart filters based on passenger habits, and an offline system for instant ticket retrieval.",
        typography: "Outfit (Modern and clean for UI) & Fira Code (Time metadata and emissions)"
      }
    };

    return translations[project.id]?.[field] || project[field] || '';
  };

  // General States
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const [activeResearchTab, setActiveResearchTab] = useState<'desk' | 'sondaggi' | 'interviste'>('desk');
  const [activeProtoTab, setActiveProtoTab] = useState<'mobile' | 'totem'>('mobile');
  const [copiedLink, setCopiedLink] = useState(false);
  const [wireframeImages, setWireframeImages] = useState<{ [key: string]: string }>(() => {
    try {
      const saved = localStorage.getItem('aetheris_wireframes');
      const parsed = saved ? JSON.parse(saved) : {};

      const defaultImages: { [key: string]: string } = {
        hero_aetheris: '/Images/Project 01/hero.jpg',
        hero_kinetics: '/Images/Project 02/Mockup/mockup_desktop_2.jpg',
        hero_chronos: '/Images/Project 03/hero.jpg',
        totem_1: '/Images/Project 01/mockup_totem.jpg',
        totem_2: '/Images/Project 01/mockup_totem_2.jpeg',
        totem_3: '/Images/Project 01/mockup_totem_3.jpg',
        totem_4: '/Images/Project 01/mockup_cartello_pianta_2.jpg',
        mobile_1: '/Images/Project 01/mockup_mobile.jpg',
        mobile_2: '/Images/Project 01/mockup_mobile_2.jpg',
        mobile_3: '/Images/Project 01/mockup_cartello_zone_2.jpeg',
        mobile_4: '/Images/Project 01/mockup_cartello_pianta.jpg',
        prod_01: '/Images/Project 02/Mockup/mockup_magazine.jpg',
        prod_02: '/Images/Project 02/Mockup/mockup_desktop.jpg',
        prod_03: '/Images/Project 02/Mockup/mockup_tshirt.jpg',
        prod_04: '/Images/Project 02/Mockup/mockup_cappello.jpg',
      };

      const finalImages = { ...defaultImages };
      for (const key in parsed) {
        if (parsed[key] && parsed[key].length > 0) {
          finalImages[key] = parsed[key];
        }
      }
      return finalImages;
    } catch {
      return {};
    }
  });

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImages = { ...wireframeImages, [id]: event.target.result as string };
          setWireframeImages(newImages);
          localStorage.setItem('aetheris_wireframes', JSON.stringify(newImages));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (id: string) => {
    const newImages = { ...wireframeImages };
    delete newImages[id];
    setWireframeImages(newImages);
    localStorage.setItem('aetheris_wireframes', JSON.stringify(newImages));
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const otherProjects = allProjects.filter(p => p.id !== project.id);

  const isAetheris = project.id === 'aetheris';
  const isKinetics = project.id === 'kinetics';
  const isChronos = project.id === 'chronos';
  const isDetailed = isAetheris || isKinetics || isChronos;

  const primaryColor = isAetheris ? '#068B35' : isKinetics ? '#FCD306' : isChronos ? '#9E1C1F' : '#E8302A';

  return (
    <SmoothScroll>
      <CustomCursor color={primaryColor} />
      <ScrollProgress color={primaryColor} />
      <ScrollReveal />
      <div id="project-page-root" className={`min-h-screen pb-24 relative ${isKinetics ? 'font-urbanist bg-[#0D0D0D] text-[#F5F5F0] selection:bg-[#FCD306] selection:text-[#0D0D0D]' : isAetheris ? 'font-raleway bg-[#050505] text-white selection:bg-[#068B35] selection:text-white' : isChronos ? 'font-sans bg-black text-white selection:bg-[#9E1C1F] selection:text-white' : 'font-sans bg-black text-white selection:bg-[#E8302A] selection:text-white'}`}>



        {/* 1. FIXED TOP HEADER (Hamburger Menu) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-6 left-6 z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:scale-105 transition-transform duration-300"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Orto Botanico Logo Card */}
        {isAetheris && (
          <div className="fixed top-6 right-6 z-[100] h-16 md:h-20 px-8 md:px-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <img src="./Images/Project 01/logo_orto_botanico_testo_bianco.png" alt="Orto Botanico Logo" className="h-10 md:h-12 w-auto object-contain" />
          </div>
        )}

        {/* Kinetics Logo Card */}
        {isKinetics && (
          <div className="fixed top-6 right-6 z-[100] h-16 md:h-20 px-8 md:px-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
            <img src="./Images/Project 02/Logo/logo_uss.png" alt="Urban StreetArt Sicily Logo" className="h-10 md:h-12 w-auto object-contain rounded-md" />
          </div>
        )}

        {/* Hamburger Menu Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-[#050505]/95 backdrop-blur-3xl z-[150] border-r border-white/10 flex flex-col p-8 shadow-[30px_0_50px_rgba(0,0,0,0.5)] overflow-y-auto"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col items-center justify-center gap-10 w-full h-full my-auto pt-8 pb-4">
                {/* TOP: HOME */}
                <div
                  onClick={() => { setIsMenuOpen(false); onClose(); }}
                  className="cursor-pointer group flex flex-col items-center hover:scale-105 transition-transform duration-300 mb-12"
                  title="Torna alla Home"
                >
                  <img src="./Images/Home/logo_diego_cavallaro.png" alt="Home" className="w-8 h-8 object-contain" />
                </div>

                {/* MIDDLE: PROJECTS CAROUSEL LIST */}
                <div className="flex flex-col items-center gap-8 w-full max-w-sm relative">
                  <div 
                    className="p-2 cursor-pointer group"
                    onClick={() => { setIsMenuOpen(false); onNavigateToProject(prevProject); }}
                  >
                    <ChevronUp className="w-8 h-8 text-white/30 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  
                  {/* Orto Botanico */}
                  <div 
                    onClick={() => { setIsMenuOpen(false); onNavigateToProject(allProjects[0]); }}
                    className={`cursor-pointer transition-all duration-500 hover:scale-105 flex justify-center items-center h-14 w-full ${project.id === 'aetheris' ? 'opacity-100 scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'opacity-20 hover:opacity-100 grayscale hover:grayscale-0'}`}
                  >
                    <img src="./Images/Project 01/logo_orto_botanico_testo_bianco.png" alt="Orto Botanico" className="max-h-full max-w-[180px] object-contain" />
                  </div>

                  {/* Urban StreetArt Sicily */}
                  <div 
                    onClick={() => { setIsMenuOpen(false); onNavigateToProject(allProjects[1]); }}
                    className={`cursor-pointer transition-all duration-500 hover:scale-105 flex justify-center items-center h-14 w-full ${project.id === 'kinetics' ? 'opacity-100 scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'opacity-20 hover:opacity-100 grayscale hover:grayscale-0'}`}
                  >
                    <img src="./Images/Project 02/Logo/logo_uss.png" alt="Urban StreetArt Sicily" className="max-h-full max-w-[180px] object-contain rounded-md" />
                  </div>

                  {/* Italo Treni / Chronos */}
                  <div 
                    onClick={() => { setIsMenuOpen(false); onNavigateToProject(allProjects[2]); }}
                    className={`cursor-pointer transition-all duration-500 hover:scale-105 flex justify-center items-center h-14 w-full ${project.id === 'chronos' ? 'opacity-100 scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'opacity-20 hover:opacity-100 grayscale hover:grayscale-0'}`}
                  >
                    <span className="text-xl sm:text-2xl font-black tracking-[0.2em] uppercase font-sans text-white text-center">Italo<br/><span className="text-lg sm:text-xl text-[#9E1C1F]">Treni</span></span>
                  </div>

                  <div 
                    className="p-2 cursor-pointer group"
                    onClick={() => { setIsMenuOpen(false); onNavigateToProject(nextProject); }}
                  >
                    <ChevronDown className="w-8 h-8 text-white/30 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                </div>

                {/* BOTTOM: CONTATTI and LANG */}
                <div className="flex flex-col items-center gap-4 mt-auto w-full px-2">
                  <button
                    onClick={() => { 
                      setIsMenuOpen(false); 
                      onClose(); 
                      setTimeout(() => document.getElementById('direct-contact-section')?.scrollIntoView({behavior: 'smooth'}), 300); 
                    }}
                    className="w-full py-3.5 bg-[#E8302A] hover:bg-[#c9221d] rounded-xl text-white font-bold text-center transition-all text-sm uppercase tracking-wider shadow-lg"
                  >
                    {lang === 'it' ? 'Contattami' : 'Contact me'}
                  </button>

                  <button
                    onClick={() => {
                      if (setLang) {
                        setLang(lang === 'it' ? 'en' : 'it');
                        setIsMenuOpen(false);
                      }
                    }}
                    className="w-full py-3.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-white font-bold text-center transition-all text-sm uppercase tracking-wider mt-2"
                  >
                    {lang === 'it' ? 'Lingua: IT' : 'Language: EN'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay to close when clicking outside */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140]"
            />
          )}
        </AnimatePresence>
        {isChronos ? (
          <section className="relative w-full pt-20 h-auto min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center overflow-hidden bg-black border-b border-white/5">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#9E1C1F]/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 sm:px-12 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Brand Info */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-left">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-raleway tracking-widest text-[#9E1C1F] uppercase font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#9E1C1F] animate-pulse" />
                    <span>2025 / Concept Redesign, UX/UI & System Architecture</span>
                  </div>
                  <span className="text-sm font-raleway uppercase tracking-[0.2em] text-neutral-400 font-bold">
                    Italo Treni
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase font-sans text-white leading-[1.05] max-w-xl">
                  L'Alta Velocità Inizia Prima di Salire a Bordo.
                </h1>

                <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light max-w-lg">
                  Restyling UX/UI dell'App Italo Treno: come ho trasformato un'esperienza di acquisto macchinosa in un flusso di navigazione fluido, migliorando l'esperienza utente a 300 km/h.
                </p>

                {/* Sleek Horizontal Project Ledger */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 mt-2 border-t border-white/5 max-w-xl">
                  <div>
                    <span className="text-xs font-raleway uppercase text-neutral-500 tracking-wider block mb-1">Client</span>
                    <span className="text-sm sm:text-sm font-semibold text-neutral-300">{project.client}</span>
                  </div>
                  <div>
                    <span className="text-xs font-raleway uppercase text-neutral-500 tracking-wider block mb-1">Year</span>
                    <span className="text-sm sm:text-sm font-semibold text-neutral-300">{project.year}</span>
                  </div>
                  <div>
                    <span className="text-xs font-raleway uppercase text-neutral-500 tracking-wider block mb-1">My Role</span>
                    <span className="text-sm sm:text-sm font-semibold text-neutral-300">{project.role}</span>
                  </div>
                  <div>
                    <span className="text-xs font-raleway uppercase text-neutral-500 tracking-wider block mb-1">Applied Stack</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[8px] font-raleway px-1.5 py-0.5 bg-white/5 text-neutral-300 rounded border border-white/10 uppercase font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[1px] w-12 bg-[#9E1C1F]" />
                  <span className="text-sm font-raleway text-neutral-500 uppercase tracking-wider">
                    Case Study UX/UI Restyling
                  </span>
                </div>
              </div>

              {/* Right Column: iPhone 15 Pro Mockup with speed motion blur background */}
              <div className="lg:col-span-6 flex items-center justify-center relative py-12">
                {/* Speed motion blur background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-black to-red-950/10 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(158,28,31,0.12)_0%,transparent_70%)] pointer-events-none" />

                {/* Animated motion blur speed-line accents behind the phone */}
                <div className="absolute inset-x-0 top-[30%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[1px] animate-pulse" />
                <div className="absolute inset-x-0 top-[60%] h-[1.5px] bg-gradient-to-r from-transparent via-[#9E1C1F]/30 to-transparent blur-[1.5px] animate-pulse delay-500" />

                {/* iPhone 15 Pro slightly tilted container */}
                <div className="relative w-[280px] sm:w-[310px] aspect-[9/19] bg-neutral-900 rounded-[3rem] p-3 shadow-[0_35px_80px_-20px_rgba(0,0,0,0.9)] border-4 border-neutral-800 transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-[0.16,1,0.3,1] overflow-hidden flex flex-col z-10 group">

                  {/* Dynamic Notch / Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex justify-center items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <span className="w-8 h-1 bg-neutral-900 rounded-full" />
                  </div>

                  {/* Screen Content */}
                  <div className="flex-1 bg-[#090909] rounded-[2.5rem] overflow-hidden flex flex-col pt-7 text-white relative">
                    {/* Glowing background in app */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#9E1C1F]/25 blur-3xl" />

                    {/* App Header */}
                    <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center z-10 shrink-0">
                      <span className="font-sans font-black tracking-tight text-sm text-[#9E1C1F]">italo.</span>
                      <span className="text-xs font-raleway text-neutral-400">BIGLIETTERIA RAPIDA</span>
                    </div>

                    {/* App Home View */}
                    <div className="p-4 flex-1 flex flex-col gap-4 text-left justify-between z-10">
                      <div className="flex flex-col gap-1 mt-2">
                        <span className="text-sm font-raleway text-[#9E1C1F] uppercase font-bold tracking-wider">Benvenuto a bordo</span>
                        <h4 className="text-sm font-sans font-bold leading-tight">Dove desideri viaggiare oggi?</h4>
                      </div>

                      {/* Booking Panel Component */}
                      <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-3 flex flex-col gap-2.5 shadow-lg">
                        {/* From/To Stations */}
                        <div className="flex flex-col gap-1 bg-black/40 p-2 rounded-xl border border-white/5">
                          <div className="flex justify-between items-center text-sm font-sans font-medium text-neutral-400">
                            <span>DA</span>
                            <span>A</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-white font-sans">Catania C.le</span>
                            <span className="text-[#9E1C1F] font-bold text-sm font-raleway">➔</span>
                            <span className="text-sm font-bold text-white font-sans">Milano Centrale</span>
                          </div>
                        </div>

                        {/* Date & Passenger Selection */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                            <span className="text-neutral-500 block uppercase font-raleway mb-0.5">Andata</span>
                            <span className="font-sans font-bold text-white">08 Luglio, 2026</span>
                          </div>
                          <div className="bg-black/40 p-2 rounded-xl border border-white/5">
                            <span className="text-neutral-500 block uppercase font-raleway mb-0.5">Passeggeri</span>
                            <span className="font-sans font-bold text-white">1 Adulto</span>
                          </div>
                        </div>

                        {/* Search Button */}
                        <div className="w-full py-2.5 bg-[#9E1C1F] hover:bg-red-700 transition-colors rounded-xl text-sm font-raleway text-white uppercase tracking-widest font-bold text-center">
                          Cerca Soluzioni
                        </div>
                      </div>

                      {/* Recent Trips Shortcuts */}
                      <div className="flex flex-col gap-1.5 mt-auto mb-2">
                        <span className="text-[8px] font-raleway text-neutral-500 uppercase tracking-wider">Tratte Recenti</span>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-neutral-900 border border-white/5 rounded text-xs font-sans font-medium text-neutral-300">Catania ➔ Palermo</span>
                          <span className="px-2 py-1 bg-neutral-900 border border-white/5 rounded text-xs font-sans font-medium text-neutral-300">Roma ➔ Milano</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className={`relative w-full pt-20 min-h-[100svh] flex flex-col justify-end p-6 sm:p-12 md:p-16 overflow-hidden ${isKinetics ? 'bg-[#0D0D0D]' : ''}`}>
            <div className="absolute inset-0 z-0">
              {isAetheris ? (
                <video
                  src="./Video/Project 01/hero_video.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-all duration-1000 ease-[0.16,1,0.3,1]"
                />
              ) : isKinetics ? (
                <video
                  src="./Video/Project 02/hero_video_02_wide.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ imageRendering: 'pixelated' }}
                  className="w-full h-full object-cover transition-all duration-1000 ease-[0.16,1,0.3,1] [image-rendering:pixelated]"
                />
              ) : (
                <img
                  src={wireframeImages[`hero_${project.id}`] || project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-1000 ease-[0.16,1,0.3,1] ${isKinetics ? 'grayscale brightness-[0.3] contrast-[1.15] hover:grayscale-0' : 'grayscale brightness-[0.4] hover:grayscale-0'}`}
                />
              )}
              <div className={`absolute inset-0 pointer-events-none ${isKinetics ? 'bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(13,13,13,0.85)_100%)]' : isAetheris ? 'bg-gradient-to-t from-[#050505] from-10% via-[#050505]/50 to-transparent' : 'bg-gradient-to-t from-black via-black/40 to-transparent'}`} />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col gap-3">
              {!(isAetheris || isKinetics) && (
                <span className="text-sm font-raleway uppercase tracking-[0.25em] text-[#E8302A]">
                  {getLocalizedField('category')}
                </span>
              )}
              {!isKinetics && (
                <h1 className={`font-black tracking-tighter uppercase mb-2 ${isAetheris ? 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-raleway font-bold text-white' : 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans text-white'}`}>
                  {!isAetheris ? project.title : null}
                </h1>
              )}
              {(isAetheris || isKinetics) && (
                <div className="flex flex-col gap-1 w-full items-center justify-center mb-4">
                  {/* Sleek Horizontal Project Ledger for Aetheris (Pills) */}
                  <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 w-full">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm">
                      <span className={`text-sm font-raleway uppercase tracking-wider ${isKinetics ? 'text-[#FCD306]' : 'text-[#068B35]'}`}>Year:</span>
                      <span className="text-sm sm:text-sm font-semibold text-white">{project.year}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm">
                      <span className={`text-sm font-raleway uppercase tracking-wider ${isKinetics ? 'text-[#FCD306]' : 'text-[#068B35]'}`}>Role:</span>
                      <span className="text-sm sm:text-sm font-semibold text-white">{project.role}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm">
                      <span className={`text-sm font-raleway uppercase tracking-wider ${isKinetics ? 'text-[#FCD306]' : 'text-[#068B35]'}`}>Type:</span>
                      <span className="text-sm sm:text-sm font-semibold text-white">Team Project</span>
                    </div>
                  </div>
                </div>
              )}
              {!(isAetheris || isKinetics) && <div className="w-12 h-1 bg-[#E8302A]" />}
            </div>
          </section>
        )}

        {/* Marquee Introduzione per Project 02 (Kinetics) */}
        {isKinetics && (
          <div className="relative left-1/2 -translate-x-1/2 w-[100vw] overflow-hidden border-b-2 border-[#0D0D0D] py-2 sm:py-3 z-20 flex items-center bg-[#FCD306]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex whitespace-nowrap gap-8 text-[#0D0D0D] font-urbanist font-black text-xl sm:text-2xl uppercase tracking-widest"
            >
              {[...Array(20)].map((_, i) => (
                <React.Fragment key={i}>
                  <span>INTRODUZIONE</span>
                  <span className="text-[#0D0D0D] text-lg sm:text-xl">✦</span>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        )}

        {/* Nuova sezione: Logo Prima/Dopo o Problem Statement */}
        {isKinetics && (
          <section className="w-full relative z-20 flex flex-col items-center justify-center min-h-screen py-20 px-6 sm:px-12 md:px-16 max-w-[1600px] mx-auto">
            <div className="w-full max-w-5xl p-10 md:p-16 lg:p-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="flex flex-col items-center justify-center gap-8">
                <LogoMorph />
              </div>
              <div className="flex items-center">
                <p className="text-white font-urbanist text-xl md:text-2xl lg:text-[28px] leading-[1.4] font-light tracking-tight">
                  <span className="font-semibold text-[#FCD306]">Rebranding dell'identità visiva di Urban StreetArt Sicily:</span> pagina Instagram dedicata alla diffusione dell'arte urbana in Sicilia, con l'obiettivo di trasformarla in un vero e proprio portale digitale.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 3. CASE STUDY GRID */}
        {!(isAetheris || isKinetics) && (
          <section className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Core Narrative (Column span 7, or 12 if kinetics to take full space) */}
            <div className={`${isKinetics ? 'lg:col-span-12' : 'lg:col-span-7'} flex flex-col gap-10`}>

              {isDetailed ? (
                isKinetics ? (
                  <div className="bg-[#FCD306] text-[#0D0D0D] p-6 sm:p-10 md:p-14 border-4 border-[#0D0D0D] relative overflow-hidden flex flex-col md:flex-row gap-10 items-center shadow-[12px_12px_0px_#1A1A1A] font-urbanist">
                    {/* Subtle scribble texture overlay inside yellow section */}
                    <div className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none z-0">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="scribble-pattern-section" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                          <path d="M10,15 Q30,10 40,25" fill="none" stroke="#000" strokeWidth="0.8" strokeLinecap="round" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#scribble-pattern-section)" />
                      </svg>
                    </div>

                    {/* Left part inside the yellow block: texts */}
                    <div className="flex-1 flex flex-col gap-4 relative z-10 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-raleway uppercase tracking-[0.18em] text-[#0D0D0D] font-bold block">02 / Context & Challenge</span>
                        <div className="h-[2px] flex-1 bg-[#0D0D0D]/30" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0D0D0D] uppercase leading-none">
                        Oltre la griglia.
                      </h2>
                      <p className="text-base sm:text-lg leading-relaxed text-[#0D0D0D] font-medium">
                        Urban StreetArt Sicily aveva una community attiva, ma un'identità frammentata. La sfida: elevare il posizionamento della pagina, trasformandola da semplice aggregatore di foto a testata editoriale autorevole, pronta per scalare a livello nazionale e lanciare prodotti fisici.
                      </p>
                    </div>

                    {/* Right part: Before/After Interactive Slider (Pop of dark high contrast) */}
                    <div className="w-full md:w-[450px] shrink-0 flex flex-col gap-3 relative z-10">
                      <span className="text-sm font-raleway uppercase tracking-widest text-[#0D0D0D] font-bold">
                        Trascina o clicca per confrontare l'identità visiva
                      </span>

                      <div className="relative w-full h-80 sm:h-96 rounded-none overflow-hidden border-4 border-[#0D0D0D] select-none cursor-ew-resize bg-[#0D0D0D] group shadow-[6px_6px_0px_#0D0D0D]">
                        {/* Before Image */}
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-black/50 z-10" />
                          <img
                            src="https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=600&auto=format&fit=crop"
                            alt="Before Rebrand"
                            className="w-full h-full object-cover grayscale brightness-50 contrast-75 blur-[1px]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-[#0D0D0D] border border-[#2B2B2B] rounded-none text-sm font-raleway text-[#A8A8A2] uppercase tracking-wider">
                            BEFORE: Aggregatore Instagram
                          </div>
                        </div>

                        {/* After Image */}
                        <BeforeAfterSlider />
                      </div>
                    </div>
                  </div>
                ) : isChronos ? (
                  <div className="flex flex-col gap-10">
                    {/* Intro with high speed train image */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-7 flex flex-col gap-4">
                        <span className="text-sm font-raleway uppercase tracking-widest text-[#9E1C1F] font-bold">01 / Introduzione</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                          Un'esperienza di acquisto biglietti che viaggia alla velocità del brand.
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-neutral-400 font-light">
                          Il redesign dell'applicazione di Italo Treno si concentra sull'abbattimento del carico cognitivo durante la ricerca, selezione e pagamento delle tratte ad alta velocità.
                        </p>
                      </div>
                      <div className="md:col-span-5 h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-xl relative group bg-[#111]">
                        <img
                          src="https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=600&auto=format&fit=crop"
                          alt="Italo Treno ad Alta Velocità"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Context & Challenge */}
                    <div className="flex flex-col gap-4 pt-10 border-t border-white/5">
                      <span className="text-sm font-raleway uppercase tracking-widest text-[#9E1C1F] font-bold">02 / Context & Challenge</span>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
                        L'Attrito Invisibile.
                      </h2>
                      <p className="text-base leading-relaxed text-neutral-300 font-light">
                        Italo è sinonimo di viaggi rapidi e premium. Ma una grande promessa brand perde valore se l'app frena gli utenti proprio al momento dell'acquisto. La vera sfida? Non si trattava di "fare un restyling estetico", ma di abbattere i muri cognitivi e risolvere un problema strutturale di navigazione. Obiettivo: eliminare ogni frizione nel funnel di acquisto.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-16 w-full">
                    {/* Visual Intro Grid for Orto Botanico */}
                    <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center ${isAetheris ? 'pb-0' : 'pb-16'}`}>
                      <div className="md:col-span-5 flex flex-col gap-8">
                        <span className="text-sm font-raleway uppercase tracking-widest text-[#068B35] font-bold">01 / Introduzione</span>

                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-1 border-l-2 border-[#068B35]/30 pl-4 transition-colors hover:border-[#068B35]">
                            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">Cuore di Catania</h3>
                            <p className="text-sm leading-relaxed text-neutral-400 font-light">Architettura dell'Ottocento immersa nel verde urbano.</p>
                          </div>

                          <div className="flex flex-col gap-1 border-l-2 border-[#068B35]/30 pl-4 transition-colors hover:border-[#068B35]">
                            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">Biodiversità</h3>
                            <p className="text-sm leading-relaxed text-neutral-400 font-light">Collezioni di flora siciliana e specie tropicali.</p>
                          </div>

                          <div className="flex flex-col gap-1 border-l-2 border-[#068B35]/30 pl-4 transition-colors hover:border-[#068B35]">
                            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">Ricerca</h3>
                            <p className="text-sm leading-relaxed text-neutral-400 font-light">La tradizione universitaria incontra la meraviglia botanica.</p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-7 h-64 sm:h-80 md:h-[400px] rounded-[2rem] overflow-hidden border border-[#068B35]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group bg-[#1A1A1A]">
                        <img
                          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop"
                          alt="Orto Botanico Catania"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col gap-10">
                  {/* Section: Descrizione */}
                  <div className="flex flex-col gap-3">
                    <span className="text-sm font-raleway uppercase tracking-widest text-[#E8302A]">{lang === 'it' ? '01 / Il Progetto' : '01 / The Project'}</span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{lang === 'it' ? 'Esplorazione Concettuale' : 'Conceptual Exploration'}</h2>
                    <p className="text-base leading-relaxed text-white/80 font-light mt-1">
                      {getLocalizedField('longDescription')}
                    </p>
                  </div>

                  {/* Section: Sfida & Soluzione side-by-side/stacked */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-raleway uppercase tracking-widest text-white/40">{lang === 'it' ? '02 / La Sfida' : '02 / The Challenge'}</span>
                      <h3 className="text-lg font-bold text-white uppercase">{lang === 'it' ? 'Il Problema' : 'The Problem'}</h3>
                      <p className="text-sm leading-relaxed text-white/70 font-light">
                        {getLocalizedField('challenge')}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-raleway uppercase tracking-widest text-white/40">{lang === 'it' ? '03 / La Soluzione' : '03 / The Solution'}</span>
                      <h3 className="text-lg font-bold text-white uppercase">{lang === 'it' ? 'La Risoluzione' : 'The Resolution'}</h3>
                      <p className="text-sm leading-relaxed text-white/70 font-light">
                        {getLocalizedField('solution')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column with sticky Project Ledger and Interactive widgets */}
            {!isKinetics && (
              <div className="lg:col-span-5 flex flex-col gap-8 w-full lg:sticky lg:top-24">
                <ProjectRightColumn project={project} />
              </div>
            )}

          </section>
        )}

        {/* 4. FULL-WIDTH LOWER CASE STUDY SECTIONS */}
        <div className={`max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 flex flex-col gap-16 w-full pb-12 ${(isAetheris || isKinetics) ? '' : 'mt-16'}`}>
          {isKinetics ? (
            <KineticsLowerSections
              project={project}
              activeResearchTab={activeResearchTab}
              setActiveResearchTab={setActiveResearchTab}
              wireframeImages={wireframeImages}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
              copiedColor={copiedColor}
              handleCopyHex={handleCopyHex}
            />
          ) : isChronos ? (
            <ChronosLowerSections
              copiedColor={copiedColor}
              handleCopyHex={handleCopyHex}
            />
          ) : isAetheris ? (
            <AetherisLowerSections
              project={project}
              activeResearchTab={activeResearchTab}
              setActiveResearchTab={(val) => setActiveResearchTab(val as any)}
              lang={lang}
            />
          ) : (
            isDetailed && (
              <div className="flex flex-col gap-16">
                {/* Sezione Tipologie di Ricerca */}
                <div className="pt-32 pb-32 flex flex-col gap-6 relative">
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[100vw]">
                    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24" style={{ background: `radial-gradient(125% 125% at 50% 10%, #000 40%, ${isAetheris ? '#068b35' : primaryColor} 100%)` }}></div>
                  </div>
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <span className={`text-sm font-raleway uppercase tracking-widest ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'} font-bold`}>
                        {lang === 'it'
                          ? (isAetheris ? '01 / Ricerca ed Analisi' : '02 / Ricerca ed Analisi')
                          : (isAetheris ? '01 / Research & Analysis' : '02 / Research & Analysis')
                        }
                      </span>
                      <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight text-white ${isAetheris ? 'font-raleway' : 'font-sans'}`}>
                        {lang === 'it'
                          ? (isAetheris ? "Metodologia e Fasi di Ricerca" : "Fasi di Analisi & Ricerca Artistica")
                          : (isAetheris ? "Research Methodology & Phases" : "Analysis Phases & Artistic Research")
                        }
                      </h2>
                      <p className="text-sm leading-relaxed text-neutral-400 font-light">
                        {lang === 'it' ? (
                          isAetheris
                            ? "Per approfondire il legame tra visitatore e giardino botanico, abbiamo strutturato l'analisi su three direttrici complementari. Utilizza il menu interattivo orizzontale sottostante per esplorare i risultati di ciascuna fase."
                            : "Per catturare le dinamiche di fruizione dell'arte urbana e mappare i bisogni di appassionati e turisti, abbiamo strutturato una ricerca multi-metodo. Esplora le scoperte di ogni fase tramite il menu."
                        ) : (
                          isAetheris
                            ? "To deepen the bond between visitor and botanical garden, we structured our analysis across three complementary directions. Use the horizontal interactive menu below to explore the results of each phase."
                            : "To capture the usage dynamics of urban art and map the needs of enthusiasts and tourists, we structured a multi-method research. Explore the findings of each phase using the menu."
                        )}
                      </p>
                    </div>

                    {/* Menù orizzontale per cambiare tipologia di ricerca */}
                    <div className={`flex bg-[#131514] border border-white/5 p-1 ${isAetheris ? 'rounded-full' : 'rounded-2xl'} shrink-0 self-start shadow-inner relative w-fit max-w-full overflow-x-auto scrollbar-none`}>
                      <button
                        onClick={() => setActiveResearchTab('desk')}
                        className={`flex items-center gap-2 px-4 py-2 ${isAetheris ? 'rounded-full' : 'rounded-xl'} text-sm sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 whitespace-nowrap uppercase font-raleway ${activeResearchTab === 'desk' ? 'text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                      >
                        {activeResearchTab === 'desk' && (
                          <motion.div
                            layoutId="active-research-bg"
                            className={`absolute inset-0 ${isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'} ${isAetheris ? 'rounded-full' : 'rounded-xl'}`}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative">{lang === 'it' ? 'Ricerca Desk' : 'Desk Research'}</span>
                      </button>
                      <button
                        onClick={() => setActiveResearchTab('sondaggi')}
                        className={`flex items-center gap-2 px-4 py-2 ${isAetheris ? 'rounded-full' : 'rounded-xl'} text-sm sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 whitespace-nowrap uppercase font-raleway ${activeResearchTab === 'sondaggi' ? 'text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                      >
                        {activeResearchTab === 'sondaggi' && (
                          <motion.div
                            layoutId="active-research-bg"
                            className={`absolute inset-0 ${isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'} ${isAetheris ? 'rounded-full' : 'rounded-xl'}`}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative">{lang === 'it' ? 'Sondaggi' : 'Surveys'}</span>
                      </button>
                      <button
                        onClick={() => setActiveResearchTab('interviste')}
                        className={`flex items-center gap-2 px-4 py-2 ${isAetheris ? 'rounded-full' : 'rounded-xl'} text-sm sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 whitespace-nowrap uppercase font-raleway ${activeResearchTab === 'interviste' ? 'text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                      >
                        {activeResearchTab === 'interviste' && (
                          <motion.div
                            layoutId="active-research-bg"
                            className={`absolute inset-0 ${isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'} ${isAetheris ? 'rounded-full' : 'rounded-xl'}`}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative">{lang === 'it' ? 'Interviste' : 'Interviews'}</span>
                      </button>
                    </div>              {/* Contenuto Dinamico delle Ricerche */}
                    <AnimatePresence mode="wait">
                      {activeResearchTab === 'desk' && (
                        <motion.div
                          key="desk-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col gap-6"
                        >
                          <p className="text-sm leading-relaxed text-neutral-400">
                            {lang === 'it' ? (
                              isAetheris
                                ? "Abbiamo analizzato il sito ufficiale, articoli e recensioni online per comprendere il contesto dell’Orto Botanico e individuare le principali criticità dell’esperienza di visita."
                                : "Abbiamo analizzato cataloghi d'arte, portali di turismo urbano e recensioni social per comprendere lo stato della street art in Sicilia e le problematiche di tracciamento delle opere."
                            ) : (
                              isAetheris
                                ? "We analyzed the official website, articles, and online reviews to understand the context of the Botanical Garden and identify key issues in the visitor experience."
                                : "We analyzed art catalogs, urban tourism portals, and social reviews to understand the status of street art in Sicily and the challenges of tracking the artworks."
                            )}
                          </p>

                          {/* 3 card con opinioni utenti */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <HighlightCard animatedBorder={isAetheris}
                              title={lang === 'it' ? 'Recensione 1' : 'Review 1'}
                              description={[
                                lang === 'it' ? (
                                  isAetheris
                                    ? "“Difficile per chi non conosce il mondo della botanica destreggiarsi fra le piante. Nessuna guida né spiegazione”"
                                    : "“Ci sono murales incredibili a Catania e Palermo, ma non si trova mezza riga su chi li abbia dipinti o cosa vogliano dire.”"
                                ) : (
                                  isAetheris
                                    ? "“Hard for those who do not know the world of botany to navigate among the plants. No guide or explanation”"
                                    : "“There are incredible murals in Catania and Palermo, but you can't find a single line about who painted them or what they mean.”"
                                ),
                                lang === 'it' ? 'Criticità: Informazioni' : 'Issue: Information'
                              ]}
                              icon={<MessageSquare className="w-8 h-8 text-white" />}
                            />
                            <HighlightCard animatedBorder={isAetheris}
                              title={lang === 'it' ? 'Recensione 2' : 'Review 2'}
                              description={[
                                lang === 'it' ? (
                                  isAetheris
                                    ? "“L’ho visitato da solo. E’ bello da vedere, si visita in 5 minuti ma non presenta nulla di particolare, forse necessitavo di una guida.”"
                                    : "“Ho provato a fare un giro per vedere la street art a San Berillo, ma molte opere sono nei vicoli ciechi e senza una mappa è facilissimo perdersi.”"
                                ) : (
                                  isAetheris
                                    ? "“I visited it alone. It's nice to look at, takes 5 minutes, but doesn't offer anything special, maybe I needed a guide.”"
                                    : "“I tried walking around to see street art in San Berillo, but many works are in dead ends and without a map it's very easy to get lost.”"
                                ),
                                lang === 'it'
                                  ? (isAetheris ? "Criticità: Coinvolgimento" : "Criticità: Navigazione")
                                  : (isAetheris ? "Issue: Engagement" : "Issue: Navigation")
                              ]}
                              icon={<MessageSquare className="w-8 h-8 text-white" />}
                            />
                            <HighlightCard animatedBorder={isAetheris}
                              title={lang === 'it' ? 'Recensione 3' : 'Review 3'}
                              description={[
                                lang === 'it' ? (
                                  isAetheris
                                    ? "“Bello, ma manca di spiegazioni riguardo le piante... oltre al nome scientifico nient’altro!”"
                                    : "“Molti murales storici vengono coperti o vandalizzati senza che nessuno li documenti. Manca un archivio storico digitale.”"
                                ) : (
                                  isAetheris
                                    ? "“Beautiful, but lacks explanations about the plants... other than the scientific name there's nothing else!”"
                                    : "“Many historical murals are covered up or vandalized without anyone documenting them. A digital historical archive is missing.”"
                                ),
                                lang === 'it'
                                  ? (isAetheris ? "Criticità: Informazioni" : "Criticità: Conservazione")
                                  : (isAetheris ? "Issue: Information" : "Issue: Preservation")
                              ]}
                              icon={<MessageSquare className="w-8 h-8 text-white" />}
                            />
                          </div>
                        </motion.div>
                      )}

                      {activeResearchTab === 'sondaggi' && (
                        <motion.div
                          key="sondaggi-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col gap-6"
                        >
                          <p className="text-sm leading-relaxed text-neutral-400">
                            {lang === 'it' ? (
                              isAetheris
                                ? "Abbiamo raccolto dati tramite un sondaggio per capire come i visitatori si orientano all’interno dell’orto e il loro interesse verso strumenti digitali come QR code o app."
                                : "Abbiamo interrogato un campione di turisti e appassionati sull'abitudine di cercare arte urbana e sull'efficacia delle mappe geolocalizzate durante i loro viaggi."
                            ) : (
                              isAetheris
                                ? "We collected data through a survey to understand how visitors navigate the garden and their interest in digital tools like QR codes or apps."
                                : "We surveyed a sample of tourists and enthusiasts about their habits when searching for urban art and the effectiveness of geolocation maps during their travels."
                            )}
                          </p>

                          {/* Grafici risposte dei sondaggi */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2 h-full">
                            {/* Domanda 1 */}
                            <HighlightCard animatedBorder={isAetheris}
                              title={lang === 'it' ? (
                                isAetheris
                                  ? "“Come ti stai orientando nell’orto?”"
                                  : "“Come scopri le opere di street art in una nuova città?”"
                              ) : (
                                isAetheris
                                  ? "“How do you orient yourself in the garden?”"
                                  : "“How do you discover street art in a new city?”"
                              )}
                            >
                              <div className="flex flex-col gap-3 pt-2">
                                {/* Prima Opzione */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-sm font-raleway text-neutral-400">
                                    <span>
                                      {lang === 'it'
                                        ? (isAetheris ? "In modo casuale" : "Camminando in modo casuale")
                                        : (isAetheris ? "Randomly" : "Walking around randomly")
                                      }
                                    </span>
                                    <span className={`font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                                      {isAetheris ? "70%" : "65%"}
                                    </span>
                                  </div>
                                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'}`} style={{ width: isAetheris ? '70%' : '65%' }} />
                                  </div>
                                </div>

                                {/* Seconda Opzione */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-sm font-raleway text-neutral-400">
                                    <span>
                                      {lang === 'it'
                                        ? (isAetheris ? "Segnaletica fisica" : "Social media & Blog d'arte")
                                        : (isAetheris ? "Physical signage" : "Social media & Art blogs")
                                      }
                                    </span>
                                    <span className="font-bold text-white">
                                      {isAetheris ? "20%" : "25%"}
                                    </span>
                                  </div>
                                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-neutral-500 h-full rounded-full" style={{ width: isAetheris ? '20%' : '25%' }} />
                                  </div>
                                </div>

                                {/* Terza Opzione */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-sm font-raleway text-neutral-400">
                                    <span>
                                      {lang === 'it'
                                        ? (isAetheris ? "Mappa cartacea" : "Guide turistiche ufficiali")
                                        : (isAetheris ? "Paper map" : "Official tour guides")
                                      }
                                    </span>
                                    <span className="font-bold text-neutral-400">10%</span>
                                  </div>
                                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-neutral-700 h-full rounded-full" style={{ width: '10%' }} />
                                  </div>
                                </div>
                              </div>
                            </HighlightCard>

                            {/* Domanda 2 */}
                            <HighlightCard animatedBorder={isAetheris}
                              title={lang === 'it' ? (
                                isAetheris
                                  ? "“Useresti il tuo smartphone per approfondire tramite QR code?”"
                                  : "“Useresti un’app dedicata per fare tour autoguidati di street art?”"
                              ) : (
                                isAetheris
                                  ? "“Would you use your smartphone to learn more via QR codes?”"
                                  : "“Would you use a dedicated app to take self-guided street art tours?”"
                              )}
                            >
                              <div className="flex flex-col gap-3 pt-2">
                                {/* Opzione Sì */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-sm font-raleway text-neutral-400">
                                    <span>{lang === 'it' ? 'Sì' : 'Yes'}</span>
                                    <span className={`font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                                      {isAetheris ? "75%" : "80%"}
                                    </span>
                                  </div>
                                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'}`} style={{ width: isAetheris ? '75%' : '80%' }} />
                                  </div>
                                </div>

                                {/* Opzione Forse */}
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-sm font-raleway text-neutral-400">
                                    <span>
                                      {lang === 'it'
                                        ? (isAetheris ? "Forse" : "Forse / Dipende")
                                        : (isAetheris ? "Maybe" : "Maybe / Depends")
                                      }
                                    </span>
                                    <span className="font-bold text-neutral-300">
                                      {isAetheris ? "25%" : "20%"}
                                    </span>
                                  </div>
                                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-neutral-500 h-full rounded-full" style={{ width: isAetheris ? '25%' : '20%' }} />
                                  </div>
                                </div>
                              </div>
                            </HighlightCard>
                          </div>
                        </motion.div>
                      )}

                      {activeResearchTab === 'interviste' && (
                        <motion.div
                          key="interviste-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-col gap-5"
                        >
                          <p className="text-sm leading-relaxed text-neutral-400">
                            {lang === 'it' ? (
                              isAetheris
                                ? "Abbiamo intervistato alcuni visitatori per approfondire la loro esperienza e identificare bisogni, difficoltà e aspettative durante la visita."
                                : "Abbiamo intervistato artisti locali e guide turistiche per capire come valorizzare al meglio le opere senza snaturarne lo spirito urbano."
                            ) : (
                              isAetheris
                                ? "We interviewed several visitors to delve into their experience and identify needs, challenges, and expectations during their visit."
                                : "We interviewed local artists and tour guides to understand how to best promote the artworks without altering their urban spirit."
                            )}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 h-full">
                            {/* Domanda 1 Interviste */}
                            <HighlightCard animatedBorder={isAetheris}
                              title={lang === 'it' ? (
                                isAetheris
                                  ? "Pensi che creare un totem digitale per aiutarti in un percorso all'interno di qui possa migliorare la tua esperienza?"
                                  : "Qual è la sfida maggiore nel fare conoscere le tue opere al pubblico di passaggio?"
                              ) : (
                                isAetheris
                                  ? "Do you think creating a digital kiosk to guide you through a path inside could improve your experience?"
                                  : "What is the biggest challenge in making your artworks known to the passing public?"
                              )}
                            >
                              <div className="flex gap-3 items-start mt-4">
                                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 font-raleway text-sm font-bold">{lang === 'it' ? 'R1' : 'A1'}</span>
                                <div className="flex flex-col gap-1 text-left">
                                  <span className="text-sm font-raleway text-neutral-400 uppercase font-semibold">{lang === 'it' ? 'Risposta' : 'Answer'}</span>
                                  <p className="text-sm sm:text-sm italic text-neutral-300 leading-relaxed font-light">
                                    {lang === 'it' ? (
                                      isAetheris
                                        ? "“Un totem digitale potrebbe migliorare l’esperienza di visita, permettendo di informarsi e orientarsi meglio prima e durante la visita.”"
                                        : "“La street art nasce per essere pubblica ma spesso rimane muta. Un supporto digitale che colleghi il muro alla nostra voce o a video del backstage sarebbe straordinario.”"
                                    ) : (
                                      isAetheris
                                        ? "“A digital kiosk could improve the visitor experience, allowing them to gather information and navigate better before and during the visit.”"
                                        : "“Street art is born to be public but often remains silent. A digital support linking the wall to our voice or backstage videos would be extraordinary.”"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </HighlightCard>

                            {/* Domanda 2 Interviste */}
                            <HighlightCard animatedBorder={isAetheris}
                              title={lang === 'it' ? (
                                isAetheris
                                  ? "C'è qualcosa che volevi sapere ma non hai trovato l'informazione adatta qui?"
                                  : "Quali difficoltà incontrano i turisti che vogliono esplorare l'arte urbana?"
                              ) : (
                                isAetheris
                                  ? "Is there anything you wanted to know but couldn't find the right information for here?"
                                  : "What challenges do tourists face when they want to explore urban art?"
                              )}
                            >
                              <div className="flex gap-3 items-start mt-4">
                                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 font-raleway text-sm font-bold">{lang === 'it' ? 'R2' : 'A2'}</span>
                                <div className="flex flex-col gap-1 text-left">
                                  <span className="text-sm font-raleway text-neutral-400 uppercase font-semibold">{lang === 'it' ? 'Risposta' : 'Answer'}</span>
                                  <p className="text-sm sm:text-sm italic text-neutral-300 leading-relaxed font-light">
                                    {lang === 'it' ? (
                                      isAetheris
                                        ? "“Le informazioni disponibili online sull’orto botanico non sono complete, soprattutto per chi non conosce il luogo o viene da fuori città.”"
                                        : "“Manca del tutto il contesto. Molti murales contengono messaggi sociali e politici legati alla storia del quartiere che un esterno non può cogliere senza una guida.”"
                                    ) : (
                                      isAetheris
                                        ? "“The information available online about the botanical garden is incomplete, especially for those who do not know the place or come from out of town.”"
                                        : "“Context is entirely missing. Many murals contain social and political messages linked to the neighborhood's history that an outsider cannot grasp without a guide.”"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </HighlightCard>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Sezione Problemi Riscontrati e Soluzioni Adottate */}
                <div className="-mt-16 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    {!isAetheris && (
                      <span className={`text-sm font-raleway uppercase tracking-widest text-[#E8302A] font-bold`}>
                        {lang === 'it' ? '03 / Analisi e Strategia' : '03 / Analysis & Strategy'}
                      </span>
                    )}
                    <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight text-white ${isAetheris ? 'font-raleway' : 'font-sans'}`}>
                      {lang === 'it' ? 'Problemi Riscontrati & Soluzioni Adottate' : 'Problems Identified & Solutions Adopted'}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-2">
                    {/* Problemi (5/12 width) */}
                    <div className="md:col-span-5 p-6 bg-rose-950/15 border border-rose-900/30 rounded-2xl flex flex-col gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-950/30 border border-rose-900/40 flex items-center justify-center shrink-0 text-rose-400">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-rose-400 uppercase text-sm tracking-wider font-raleway">
                          {lang === 'it' ? 'I Problemi Riscontrati' : 'Problems Identified'}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-rose-200/80 font-light">
                        {lang === 'it' ? (
                          isAetheris
                            ? "Dalle ricerche è emerso che molti visitatori incontrano difficoltà nell’orientarsi all’interno dell’Orto Botanico e nel trovare informazioni chiare sulle piante e sui percorsi."
                            : "Dalle ricerche sul campo è emerso che i turisti e gli amanti della street art faticano a individuare la posizione esatta delle opere e a reperire informazioni sugli autori."
                        ) : (
                          isAetheris
                            ? "Research shows that many visitors face difficulties in navigating inside the Botanical Garden and finding clear information about plants and pathways."
                            : "Field research revealed that tourists and street art lovers struggle to pinpoint the exact location of the artworks and to obtain information about the authors."
                        )}
                      </p>
                      <p className="text-sm leading-relaxed text-rose-200/80 font-light">
                        {lang === 'it' ? (
                          isAetheris
                            ? "La segnaletica esistente risulta limitata e le informazioni disponibili online non sono sempre complete, rendendo l’esperienza di visita meno interattiva e informativa di quanto potrebbe essere."
                            : "Molti quartieri d'arte mancano di una segnaletica o di itinerari stradali dedicati, e le opere rischiano la degradazione fisica senza un archivio storico digitale organizzato."
                        ) : (
                          isAetheris
                            ? "Existing physical signage is limited and online information is not always complete, making the visiting experience less interactive and informative than it could be."
                            : "Many art neighborhoods lack signage or dedicated road itineraries, and the artworks risk physical degradation without an organized digital historic archive."
                        )}
                      </p>
                    </div>

                    {/* Soluzioni (7/12 width) */}
                    <div className="md:col-span-7 flex flex-col gap-4">
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${isAetheris ? 'bg-[#068B35]/10 border-[#068B35]/30 text-emerald-400' : 'bg-[#E8302A]/10 border-[#E8302A]/30 text-rose-400'
                          }`}>
                          <Check className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-white uppercase text-sm tracking-wider font-raleway">
                          {lang === 'it' ? 'Le Soluzioni Adottate' : 'Solutions Adopted'}
                        </h4>
                      </div>

                      <div className="flex flex-col gap-4">
                        {/* Soluzione 1 */}
                        <div className="p-4 bg-[#131514] rounded-xl border border-[#068B35]/20 hover:border-[#068B35]/40 transition-all flex gap-4 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-[#068B35]/20 text-emerald-300 border border-[#068B35]/30 flex items-center justify-center shrink-0 text-sm font-raleway mt-0.5">1</div>
                          <p className="text-sm sm:text-sm text-neutral-300 leading-relaxed">
                            {lang === 'it' ? (
                              isAetheris
                                ? "Per facilitare l’orientamento, sono stati introdotti totem interattivi che permettono ai visitatori di consultare una mappa dell’orto e scegliere diversi percorsi di esplorazione."
                                : "Per facilitare la localizzazione, abbiamo integrato una mappa interattiva georeferenziata con tracciamento GPS live per guidare gli utenti direttamente di fronte alle opere d'arte."
                            ) : (
                              isAetheris
                                ? "To facilitate navigation, interactive kiosks were introduced to allow visitors to consult a garden map and choose different exploration routes."
                                : "To facilitate mapping, we integrated a georeferenced interactive map with live GPS tracking to guide users directly in front of the artworks."
                            )}
                          </p>
                        </div>

                        {/* Soluzione 2 */}
                        <div className="p-4 bg-[#131514] rounded-xl border border-[#068B35]/20 hover:border-[#068B35]/40 transition-all flex gap-4 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-[#068B35]/20 text-emerald-300 border border-[#068B35]/30 flex items-center justify-center shrink-0 text-sm font-raleway mt-0.5">2</div>
                          <p className="text-sm sm:text-sm text-neutral-300 leading-relaxed">
                            {lang === 'it' ? (
                              isAetheris
                                ? "Per arricchire le informazioni disponibili sulle piante, il progetto integra QR code posizionati accanto alla segnaletica, che consentono di accedere tramite smartphone a contenuti aggiuntivi e approfondimenti."
                                : "Per divulgare la storia delle opere, l'applicazione integra QR code fisici posizionati vicino ai murales e schede di approfondimento contenenti interviste video esclusive con gli artisti locali."
                            ) : (
                              isAetheris
                                ? "To enrich plant information, the project integrates QR codes positioned next to signage, allowing smartphone access to additional contents and details."
                                : "To share the history of the works, the app integrates physical QR codes near the murals and detailed profile sheets containing exclusive video interviews with local artists."
                            )}
                          </p>
                        </div>

                        {/* Soluzione 3 */}
                        <div className="p-4 bg-[#131514] rounded-xl border border-[#068B35]/20 hover:border-[#068B35]/40 transition-all flex gap-4 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-[#068B35]/20 text-emerald-300 border border-[#068B35]/30 flex items-center justify-center shrink-0 text-sm font-raleway mt-0.5">3</div>
                          <p className="text-sm sm:text-sm text-neutral-300 leading-relaxed">
                            {lang === 'it' ? (
                              isAetheris
                                ? "Infine, una web-app mobile accompagna l’utente durante la visita, offrendo mappe, schede informative e strumenti di ricerca che rendono l’esperienza più accessibile, interattiva e informativa."
                                : "Un design system brutalista e un archivio digitale ad alte prestazioni che fungono da catalogo e museo virtuale a cielo aperto, preservando l'eredità artistica siciliana."
                            ) : (
                              isAetheris
                                ? "Finally, a mobile web app accompanies the user during their visit, offering maps, info sheets, and search tools to make the experience more accessible, interactive, and informative."
                                : "A brutalist design system and high-performance digital archive that act as a catalog and open-air virtual museum, preserving Sicilian artistic heritage."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Sezione User Persona */}
                <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <span className={`text-sm font-raleway uppercase tracking-widest ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'} font-bold`}>
                      {lang === 'it'
                        ? (isAetheris ? '04 / Target User' : '05 / Target User')
                        : (isAetheris ? '04 / Target User' : '05 / Target User')
                      }
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">User Persona</h2>
                    <p className="text-sm leading-relaxed text-neutral-300 font-light">
                      {lang === 'it' ? (
                        isAetheris
                          ? "Per guidare le scelte di design e architettura dell'informazione di “Bussola Verde”, abbiamo delineato il profilo dell'utente ideale basandoci sui dati raccolti nelle fasi di ricerca."
                          : "Per definire l'esperienza utente e l'approccio visivo di “Urban StreetArt Sicily”, abbiamo creato una user persona specifica fondata sulle risposte dei nostri intervistati."
                      ) : (
                        isAetheris
                          ? "To guide the design and information architecture choices of “Bussola Verde”, we outlined the ideal user profile based on the data gathered during the research phases."
                          : "To define the user experience and visual approach of “Urban StreetArt Sicily”, we created a specific user persona based on the feedback from our interviewees."
                      )}
                    </p>
                  </div>

                  <div className={`bg-[#131514] border rounded-[2.5rem] overflow-hidden p-6 sm:p-8 md:p-10 flex flex-col gap-8 relative mt-2 shadow-xl ${isAetheris ? 'border-[#068B35]/20' : 'border-[#E8302A]/20'
                    }`}>
                    {/* Top Header Row: Image on the left, Name & Info on the right */}
                    <div className="flex flex-col sm:flex-row gap-6 items-center justify-between border-b border-white/5 pb-6">
                      <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                        <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 shadow-md shrink-0 ${isAetheris ? 'border-[#068B35]/50' : 'border-[#E8302A]/50'
                          }`}>
                          <img
                            src={isAetheris
                              ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
                              : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
                            }
                            alt={isAetheris ? "Mirella - User Persona" : "Matteo - User Persona"}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale contrast-110 brightness-95"
                          />
                        </div>
                        <div className="flex flex-col text-center sm:text-left">
                          <h3 className={`text-3xl sm:text-4xl font-bold text-white tracking-tight ${isAetheris ? 'font-raleway' : 'font-sans'}`}>
                            {isAetheris ? "Mirella" : "Matteo"}
                          </h3>
                        </div>
                      </div>
                      <div className="flex shrink-0 justify-center">
                        <span className={`border text-sm uppercase font-raleway tracking-widest font-bold rounded-full py-1.5 px-4 ${isAetheris
                          ? 'bg-[#068B35]/15 text-emerald-300 border-[#068B35]/30'
                          : 'bg-[#E8302A]/15 text-rose-300 border-[#E8302A]/30'
                          }`}>
                          {lang === 'it' ? (
                            isAetheris ? "Profilo Accademico" : "Profilo Esploratore"
                          ) : (
                            isAetheris ? "Academic Profile" : "Explorer Profile"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Quote & Bio Row: side-by-side with equal height */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      {/* Left Quote */}
                      <div className="bg-[#1A1D1B]/40 border border-white/5 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-center relative">
                        <div className={`text-3xl font-serif leading-none mb-1 ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>“</div>
                        <p className="text-sm sm:text-sm italic text-neutral-200 leading-relaxed font-light">
                          {lang === 'it' ? (
                            isAetheris
                              ? "Voglio connettermi attivamente alla natura e approfondire la mia conoscenza scientifica senza barriere, in modo dinamico e intuitivo."
                              : "Voglio scoprire le storie e le voci degli artisti di strada e navigare le opere urbane in modo fluido direttamente sul posto."
                          ) : (
                            isAetheris
                              ? "I want to actively connect with nature and deepen my scientific knowledge without barriers, in a dynamic and intuitive way."
                              : "I want to discover the stories and voices of street artists and navigate urban artworks smoothly right on site."
                          )}
                        </p>
                        <div className={`text-3xl font-serif leading-none text-right mt-1 ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>”</div>
                      </div>

                      {/* Right Bio & Contesto */}
                      <div className="bg-[#1A1D1B]/40 border border-white/5 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-2.5 justify-center">
                        <span className={`text-sm font-raleway uppercase tracking-widest font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                          {lang === 'it' ? "Bio & Contesto" : "Bio & Context"}
                        </span>
                        <p className="text-sm sm:text-sm leading-relaxed text-neutral-300 font-light">
                          {lang === 'it' ? (
                            isAetheris
                              ? "Mirella si è trasferita a Catania da poco. Originaria della Colombia, terra di immensa biodiversità, ha sviluppato un occhio critico e ben allenato verso il mondo vegetale. Non frequenta l'Orto Botanico come una semplice turista, bensì come studentessa: per lei è un'oasi di pace lontana dal caos cittadino, dove può al contempo approfondire le sue competenze scientifiche."
                              : "Matteo è un graphic designer milanese appassionato di arte contemporanea e culture alternative. Viaggia spesso in Sicilia per riscoprire il territorio attraverso itinerari d'arte urbana insoliti ed eventi indipendenti. Per lui la street art è un linguaggio vivo e sociale che racconta l'anima e la storia recente dei quartieri periferici."
                          ) : (
                            isAetheris
                              ? "Mirella recently moved to Catania. Originally from Colombia, a land of immense biodiversity, she has developed a critical and well-trained eye for the plant world. She doesn't visit the Botanical Garden simply as a tourist, but as a student: for her, it is an oasis of peace far from city chaos where she can deepen her scientific studies."
                              : "Matteo is a graphic designer from Milan with a passion for contemporary art and alternative cultures. He frequently travels to Sicily to rediscover the territory through unusual urban art itineraries and independent events. For him, street art is a living, social language telling the story of peripheral neighborhoods."
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Demographics Row (under Quote and Bio, spacious and not truncated) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      <div className="p-4 bg-[#1A1D1B]/40 rounded-xl border border-white/5 flex flex-col gap-1.5 shadow-sm">
                        <span className="block text-xs font-raleway text-neutral-400 uppercase tracking-wider mb-0.5">
                          {lang === 'it' ? "Età" : "Age"}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          {lang === 'it' ? (
                            isAetheris ? "25 Anni" : "28 Anni"
                          ) : (
                            isAetheris ? "25 Years" : "28 Years"
                          )}
                        </span>
                      </div>
                      <div className="p-4 bg-[#1A1D1B]/40 rounded-xl border border-white/5 flex flex-col gap-1.5 shadow-sm">
                        <span className="block text-xs font-raleway text-neutral-400 uppercase tracking-wider mb-0.5">
                          {lang === 'it' ? "Nazionalità" : "Nationality"}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          {lang === 'it' ? (
                            isAetheris ? "Colombiana" : "Italiana (MI)"
                          ) : (
                            isAetheris ? "Colombian" : "Italian (Milan)"
                          )}
                        </span>
                      </div>
                      <div className="p-4 bg-[#1A1D1B]/40 rounded-xl border border-white/5 flex flex-col gap-1.5 shadow-sm">
                        <span className="block text-xs font-raleway text-neutral-400 uppercase tracking-wider mb-0.5">
                          {lang === 'it' ? "Occupazione" : "Occupation"}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          {lang === 'it' ? (
                            isAetheris ? "Studentessa" : "Art Director"
                          ) : (
                            isAetheris ? "Student" : "Art Director"
                          )}
                        </span>
                      </div>
                      <div className="p-4 bg-[#1A1D1B]/40 rounded-xl border border-white/5 flex flex-col gap-1.5 shadow-sm">
                        <span className="block text-xs font-raleway text-neutral-400 uppercase tracking-wider mb-0.5">
                          {lang === 'it' ? "Carattere" : "Personality"}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white">
                          {lang === 'it' ? (
                            isAetheris ? "Curiosa" : "Esplorativo"
                          ) : (
                            isAetheris ? "Curious" : "Exploratory"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Comportamento e Abitudini */}
                    <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                      <span className={`text-sm font-raleway uppercase tracking-widest font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                        {lang === 'it' ? "Comportamento & Abitudini" : "Behaviors & Habits"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-[#1A1D1B]/40 rounded-xl border border-white/5 flex flex-col gap-1.5 shadow-sm">
                          <span className={`text-xs font-raleway uppercase font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                            {lang === 'it' ? "Pianificazione" : "Planning"}
                          </span>
                          <p className="text-sm leading-relaxed text-neutral-300 font-light">
                            {lang === 'it' ? (
                              isAetheris
                                ? "È una persona che si informa molto prima di muoversi. Usa internet per decidere cosa fare e dove andare."
                                : "Cerca costantemente blog indipendenti e canali d'arte contemporanea. Ama pianificare percorsi autonomi e autogestiti."
                            ) : (
                              isAetheris
                                ? "She is a person who researches extensively before traveling. She uses the internet to plan activities and destinations."
                                : "Constantly searches independent blogs and contemporary art channels. Loves planning autonomous, self-guided paths."
                            )}
                          </p>
                        </div>
                        <div className="p-4 bg-[#1A1D1B]/40 rounded-xl border border-white/5 flex flex-col gap-1.5 shadow-sm">
                          <span className={`text-xs font-raleway uppercase font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                            {lang === 'it' ? "Orientamento" : "Navigation"}
                          </span>
                          <p className="text-sm leading-relaxed text-neutral-300 font-light">
                            {lang === 'it' ? (
                              isAetheris
                                ? "Si affida alla tecnologia per muoversi in città, ma nell'orto adotta un'esplorazione libera e intuitiva, supportata da ricerche preliminari online."
                                : "Usa intensivamente smartphone e mappe per tracciare murales remoti, preferendo perdersi nei quartieri storici per trovare le opere nascoste."
                            ) : (
                              isAetheris
                                ? "She relies on technology to move around the city, but inside the garden prefers intuitive exploring, backed by preliminary online research."
                                : "Intensively uses smartphones and maps to track down remote murals, preferring to lose himself in historic districts to find hidden works."
                            )}
                          </p>
                        </div>
                        <div className="p-4 bg-[#1A1D1B]/40 rounded-xl border border-white/5 flex flex-col gap-1.5 shadow-sm">
                          <span className={`text-xs font-raleway uppercase font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                            {lang === 'it' ? "Socialità" : "Social Habits"}
                          </span>
                          <p className="text-sm leading-relaxed text-neutral-300 font-light">
                            {lang === 'it' ? (
                              isAetheris
                                ? "È solita frequentare il luogo sia in solitudine, che in compagnia."
                                : "Partecipa attivamente a community artistiche, scatta fotografie professionali e condivide i retroscena degli artisti."
                            ) : (
                              isAetheris
                                ? "She usually visits the place both alone and in company."
                                : "Actively participates in art communities, takes professional photographs, and shares artist backstages."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Obiettivi & Frustrazioni */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                      <div className="flex flex-col gap-2">
                        <span className={`text-sm font-raleway uppercase tracking-widest font-bold flex items-center gap-1.5 ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'
                          }`}>
                          <Target className="w-3.5 h-3.5" />
                          {lang === 'it' ? "Obiettivi e Motivazioni" : "Goals & Motivations"}
                        </span>
                        <ul className="flex flex-col gap-2">
                          <li className={`p-3 bg-[#1A1D1B]/40 rounded-xl border flex gap-2.5 items-start shadow-sm ${isAetheris ? 'border-[#068B35]/15' : 'border-[#E8302A]/15'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'}`} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white">
                                {lang === 'it' ? (
                                  isAetheris ? "Ricerca di Benessere" : "Esplorazione Dinamica"
                                ) : (
                                  isAetheris ? "Wellness & Peace" : "Dynamic Exploration"
                                )}
                              </span>
                              <span className="text-sm leading-relaxed text-neutral-300 font-light">
                                {lang === 'it' ? (
                                  isAetheris
                                    ? "Trovare un rifugio silenzioso lontano dal caos urbano per rigenerarsi e favorire la concentrazione."
                                    : "Localizzare le opere murali e gli itinerari storici d'arte urbana senza dipendere da tour commerciali."
                                ) : (
                                  isAetheris
                                    ? "Find a silent shelter far from urban chaos to recharge and improve focus."
                                    : "Locate murals and historic urban art pathways independently without depending on commercial tours."
                                )}
                              </span>
                            </div>
                          </li>
                          <li className={`p-3 bg-[#1A1D1B]/40 rounded-xl border flex gap-2.5 items-start shadow-sm ${isAetheris ? 'border-[#068B35]/15' : 'border-[#E8302A]/15'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'}`} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white">
                                {lang === 'it' ? (
                                  isAetheris ? "Apprendimento" : "Approfondimento Culturale"
                                ) : (
                                  isAetheris ? "Scientific Learning" : "Cultural Insight"
                                )}
                              </span>
                              <span className="text-sm leading-relaxed text-neutral-300 font-light">
                                {lang === 'it' ? (
                                  isAetheris
                                    ? "Soddisfare la curiosità scientifica esplorando specie vegetali che ancora non ha avuto modo di studiare."
                                    : "Accedere ai retroscena storici delle opere, ai significati nascosti e alle biografie originali dei creatori."
                                ) : (
                                  isAetheris
                                    ? "Satisfy scientific curiosity by exploring plant species she hasn't had the chance to study yet."
                                    : "Access historical backstories of artworks, hidden meanings, and original creator biographies."
                                )}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* Frustrazioni */}
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-raleway uppercase tracking-widest text-rose-400 font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {lang === 'it' ? "Frustrazioni e Ostacoli" : "Frustrations & Obstacles"}
                        </span>
                        <ul className="flex flex-col gap-2">
                          <li className="p-3 bg-rose-950/10 rounded-xl border border-rose-900/20 flex gap-2.5 items-start shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-rose-200">
                                {lang === 'it' ? (
                                  isAetheris ? "Assenza di Supporti Digitali" : "Mancanza di Informazioni"
                                ) : (
                                  isAetheris ? "Lack of Digital Tools" : "Lack of Information"
                                )}
                              </span>
                              <span className="text-sm leading-relaxed text-rose-300/80 font-light">
                                {lang === 'it' ? (
                                  isAetheris
                                    ? "L'impossibilità di usare il telefono per accedere a mappe interattive o localizzare specie specifiche rende l'esperienza 'vecchia' e poco fruibile."
                                    : "Spesso i murales mancano di targa o nome d'autore, rendendo impossibile capirne l'origine o il messaggio."
                                ) : (
                                  isAetheris
                                    ? "Unable to use mobile phones to access interactive maps or locate specific species makes the experience feel dated."
                                    : "Often murals lack markers or the author's name, making it impossible to understand their origin or message."
                                )}
                              </span>
                            </div>
                          </li>
                          <li className="p-3 bg-rose-950/10 rounded-xl border border-rose-900/20 flex gap-2.5 items-start shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-rose-200">
                                {lang === 'it' ? (
                                  isAetheris ? "Carenza di Dati Scientifici" : "Localizzazione Approssimativa"
                                ) : (
                                  isAetheris ? "Insufficient Scientific Data" : "Vague Locations"
                                )}
                              </span>
                              <span className="text-sm leading-relaxed text-rose-300/80 font-light">
                                {lang === 'it' ? (
                                  isAetheris
                                    ? "La mancanza di cartellini chiari, aggiornati o dettagliati per approfondire lo studio attivo."
                                    : "Perdere tempo prezioso sul posto per via di coordinate GPS errate o blog con informazioni obsolete."
                                ) : (
                                  isAetheris
                                    ? "The lack of clear, updated, or detailed plant labels limits active, deep research."
                                    : "Wasting precious time on-site due to inaccurate GPS coordinates or obsolete blog posts."
                                )}
                              </span>
                            </div>
                          </li>
                          <li className="p-3 bg-rose-950/10 rounded-xl border border-rose-900/20 flex gap-2.5 items-start shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-rose-200">
                                {lang === 'it' ? (
                                  isAetheris ? "Barriere Linguistiche" : "Esperienza Frammentata"
                                ) : (
                                  isAetheris ? "Language Barriers" : "Fragmented Experience"
                                )}
                              </span>
                              <span className="text-sm leading-relaxed text-rose-300/80 font-light">
                                {lang === 'it' ? (
                                  isAetheris
                                    ? "Le informazioni non sono pensate o accessibili per chi non è del luogo, le informazioni sono presenti solo in inglese e italiano."
                                    : "Dover raccogliere informazioni frammentate tra decine di profili Instagram, blog storici e app slegate."
                                ) : (
                                  isAetheris
                                    ? "Information is not designed for or accessible to non-natives; details are only in English and Italian."
                                    : "Having to gather scattered information across dozens of Instagram profiles, old blogs, and unrelated apps."
                                )}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sezione User Journey */}
                <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                  <UserJourney projectId={project.id} />
                </div>

                {/* Sezione Wireframe */}
                <div className={`pt-10 border-t flex flex-col gap-6 ${isAetheris ? 'border-white/5' : 'border-neutral-100'}`}>
                  <div className="flex flex-col gap-3">
                    <span className={`text-sm font-raleway uppercase tracking-widest font-bold ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                      {lang === 'it'
                        ? (isAetheris ? '05 / Architettura ed Ergonomia' : '06 / Architettura ed Ergonomia')
                        : (isAetheris ? '05 / Architecture & Ergonomics' : '06 / Architecture & Ergonomics')
                      }
                    </span>
                    <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isAetheris ? 'text-white font-raleway' : 'text-[#1A1A1A]'}`}>
                      {lang === 'it' ? 'Wireframe di Progetto' : 'Project Wireframes'}
                    </h2>
                    <p className={`text-sm leading-relaxed font-light ${isAetheris ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {lang === 'it' ? (
                        "Per visualizzare la disposizione dei contenuti e la struttura delle interfacce, abbiamo sviluppato i wireframe del sistema. Esplora le specifiche per il totem interattivo e l’applicazione mobile. Puoi caricare le tue immagini personalizzate cliccando sui relativi placeholder."
                      ) : (
                        "To visualize content placement and interface structures, we developed the system wireframes. Explore specs for the interactive kiosk and mobile app. You can upload custom images by clicking on the placeholders."
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col gap-12 mt-4">
                    {/* Totem Wireframes */}
                    <div className={`flex flex-col gap-6 p-6 sm:p-8 rounded-[2rem] border shadow-sm ${isAetheris
                      ? 'bg-[#131514] border-[#068B35]/25'
                      : 'bg-white border-[#D0D0D0]'
                      }`}>
                      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${isAetheris ? 'border-white/5' : 'border-neutral-100'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-raleway text-sm font-bold ${isAetheris
                            ? 'bg-[#068B35]/20 border border-[#068B35]/30 text-emerald-400'
                            : 'bg-[#FEECEB] border border-[#E8302A]/20 text-[#E8302A]'
                            }`}>
                            <span>01</span>
                          </div>
                          <h3 className={`text-lg sm:text-xl font-bold ${isAetheris ? 'text-white font-raleway' : 'font-sans text-[#1A1A1A]'}`}>
                            {lang === 'it' ? (
                              isAetheris ? "Totem Interattivo (Ingresso)" : "Totem Interattivo"
                            ) : (
                              isAetheris ? "Interactive Kiosk (Entrance)" : "Interactive Kiosk"
                            )}
                          </h3>
                        </div>
                        <span className={`text-sm font-raleway uppercase tracking-widest rounded-full px-3 py-1 font-bold self-start md:self-auto ${isAetheris
                          ? 'bg-[#068B35]/15 border border-[#068B35]/35 text-emerald-300'
                          : 'bg-[#FEECEB] border border-[#E8302A]/20 text-[#E8302A]'
                          }`}>
                          {lang === 'it' ? "Layout Fisico" : "Physical Layout"}
                        </span>
                      </div>

                      <p className={`text-sm sm:text-sm leading-relaxed font-light ${isAetheris ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {lang === 'it' ? (
                          isAetheris
                            ? "Il wireframe del totem definisce la struttura e l’organizzazione delle principali funzionalità disponibili per il visitatore all’ingresso dell’Orto Botanico. L’interfaccia è pensata per essere semplice e intuitiva, permettendo all’utente di orientarsi rapidamente e scegliere il percorso più adatto ai propri interessi."
                            : "Il wireframe del totem definisce l'interfaccia interattiva dell'installazione urbana per la consultazione della mappa dei quartieri artistici della città."
                        ) : (
                          isAetheris
                            ? "The kiosk wireframe defines the structure and layout of the main features available at the entrance of the Botanical Garden. The interface is designed to be simple and intuitive, allowing users to quickly orient themselves and choose the best route."
                            : "The kiosk wireframe defines the interactive interface of the urban installation for consulting the map of the city's artistic neighborhoods."
                        )}
                      </p>
                      <p className={`text-sm sm:text-sm leading-relaxed font-light ${isAetheris ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {lang === 'it' ? (
                          isAetheris
                            ? "Attraverso il totem è possibile consultare la mappa dell’orto, esplorare le diverse specie vegetali e selezionare uno dei percorsi disponibili. Una volta scelto il percorso, il visitatore può avviare l’esperienza e continuare l’esplorazione tramite QR code sul proprio smartphone."
                            : "Attraverso il totem gli utenti possono navigare tra i murales, leggere biografie ed approfondimenti e inquadrare codici per caricare i percorsi sui propri smartphone."
                        ) : (
                          isAetheris
                            ? "Through the kiosk, it is possible to consult the garden's map, explore different plant species, and select one of the available pathways. Once chosen, the visitor scans a QR code to continue on their smartphone."
                            : "Through the kiosk, users can navigate murals, read biographies and historical notes, and scan codes to load the itineraries onto their smartphones."
                        )}
                      </p>

                      {/* 4 Cards for Totem */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {['totem_1', 'totem_2', 'totem_3', 'totem_4'].map((id, index) => {
                          const hasImg = !!wireframeImages[id];
                          return (
                            <div
                              key={id}
                              className={`group relative aspect-[3/4] rounded-2xl border overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 ${isAetheris
                                ? 'bg-[#0C0D0C]/40 border-white/5 hover:border-[#068B35]/40'
                                : 'bg-[#F9FBF9] border-[#D0D0D0] hover:border-[#068B35]/30'
                                }`}
                            >
                              {hasImg ? (
                                <div className="absolute inset-0">
                                  <img
                                    src={wireframeImages[id]}
                                    alt={`Wireframe Totem ${index + 1}`}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                    <label className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-lg p-2 transition-all">
                                      <Upload className="w-4 h-4" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(id, e)}
                                      />
                                    </label>
                                    <button
                                      onClick={() => handleRemoveImage(id)}
                                      className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-400 rounded-lg p-2 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {/* Background Blueprint Vector graphic */}
                                  <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 flex flex-col justify-center items-center pointer-events-none p-6">
                                    <div className="w-full h-full border border-dashed border-[#068B35] flex flex-col justify-between p-2">
                                      <div className="border border-[#068B35] h-8 flex items-center justify-center text-[8px] font-raleway text-[#068B35]">HEADER</div>
                                      <div className="border border-dashed border-[#068B35] flex-1 my-2 flex items-center justify-center text-[8px] font-raleway text-[#068B35]">BODY GRAPHIC</div>
                                      <div className="border border-[#068B35] h-6 flex items-center justify-center text-[8px] font-raleway text-[#068B35]">FOOTER</div>
                                    </div>
                                  </div>

                                  <div className="z-10 flex justify-between items-start">
                                    <span className="text-sm font-raleway text-neutral-400 font-bold uppercase">Totem {index + 1}</span>
                                    <label className={`cursor-pointer p-1.5 rounded-lg border transition-all ${isAetheris
                                      ? 'bg-[#1A1D1B] border-white/5 hover:border-[#068B35]/40 hover:bg-[#068B35]/10 text-neutral-300 hover:text-emerald-400'
                                      : 'bg-white border-[#D0D0D0] hover:border-[#068B35]/30 hover:bg-[#EAF4EC] text-neutral-400 hover:text-[#068B35]'
                                      }`}>
                                      <Upload className="w-3.5 h-3.5" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(id, e)}
                                      />
                                    </label>
                                  </div>

                                  <div className="z-10 flex flex-col gap-2 mt-auto">
                                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${isAetheris
                                      ? 'bg-[#1A1D1B] border-white/5 text-neutral-400 group-hover:text-emerald-400 group-hover:border-[#068B35]/30'
                                      : 'bg-white border-[#D0D0D0] text-neutral-300 group-hover:text-[#068B35] group-hover:border-[#068B35]/30'
                                      }`}>
                                      <Image className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-raleway text-neutral-400 uppercase tracking-wider block">Carica Wireframe</span>
                                      <span className={`text-xs font-raleway uppercase mt-0.5 block ${isAetheris ? 'text-emerald-400/80' : 'text-[#068B35]/60'}`}>Clicca per selezionare</span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mobile Wireframes */}
                    <div className={`flex flex-col gap-6 p-6 sm:p-8 rounded-[2rem] border shadow-sm ${isAetheris
                      ? 'bg-[#131514] border-[#068B35]/25'
                      : 'bg-white border-[#D0D0D0]'
                      }`}>
                      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${isAetheris ? 'border-white/5' : 'border-neutral-100'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-raleway text-sm font-bold ${isAetheris
                            ? 'bg-[#068B35]/20 border border-[#068B35]/30 text-emerald-400'
                            : 'bg-[#EAF4EC] border border-[#068B35]/20 text-[#068B35]'
                            }`}>
                            <span>02</span>
                          </div>
                          <h3 className={`text-lg sm:text-xl font-bold ${isAetheris ? 'text-white font-raleway' : 'font-sans text-[#1A1A1A]'}`}>Web-App Mobile</h3>
                        </div>
                        <span className={`text-sm font-raleway uppercase tracking-widest rounded-full px-3 py-1 font-bold self-start md:self-auto ${isAetheris
                          ? 'bg-[#068B35]/15 border border-[#068B35]/35 text-emerald-300'
                          : 'bg-[#EAF4EC] border border-[#068B35]/10 text-[#068B35]'
                          }`}>
                          Layout Mobile
                        </span>
                      </div>

                      <p className={`text-sm sm:text-sm leading-relaxed font-light ${isAetheris ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        Il wireframe della web-app mobile definisce la struttura delle principali funzionalità che accompagnano il visitatore durante la visita. L’interfaccia permette di consultare la mappa dell’orto, cercare le piante tramite filtri e accedere alle schede informative attraverso la scansione dei QR code presenti nel percorso.
                      </p>
                      <p className={`text-sm sm:text-sm leading-relaxed font-light ${isAetheris ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        Questo sistema consente all’utente di esplorare il giardino in modo autonomo, accedendo facilmente a informazioni aggiuntive sulle specie vegetali.
                      </p>

                      {/* 5 Cards for Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                        {['mobile_1', 'mobile_2', 'mobile_3', 'mobile_4', 'mobile_5'].map((id, index) => {
                          const hasImg = !!wireframeImages[id];
                          return (
                            <div
                              key={id}
                              className={`group relative aspect-[9/16] rounded-2xl border overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 ${isAetheris
                                ? 'bg-[#0C0D0C]/40 border-white/5 hover:border-[#068B35]/40'
                                : 'bg-[#F9FBF9] border-[#D0D0D0] hover:border-[#068B35]/30'
                                }`}
                            >
                              {hasImg ? (
                                <div className="absolute inset-0">
                                  <img
                                    src={wireframeImages[id]}
                                    alt={`Wireframe Mobile ${index + 1}`}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                    <label className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-lg p-2 transition-all">
                                      <Upload className="w-4 h-4" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(id, e)}
                                      />
                                    </label>
                                    <button
                                      onClick={() => handleRemoveImage(id)}
                                      className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-400 rounded-lg p-2 transition-all cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {/* Background Blueprint Vector graphic */}
                                  <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 flex flex-col justify-center items-center pointer-events-none p-6">
                                    <div className="w-full h-full border border-dashed border-[#068B35] flex flex-col justify-between p-2 rounded-lg">
                                      <div className="border border-[#068B35] h-4 flex items-center justify-center text-[7px] font-raleway text-[#068B35]">NAV BAR</div>
                                      <div className="border border-dashed border-[#068B35] flex-1 my-2 flex items-center justify-center text-[7px] font-raleway text-[#068B35]">MOBILE CONTENT</div>
                                      <div className="border border-[#068B35] h-4 flex items-center justify-center text-[7px] font-raleway text-[#068B35]">TAB BAR</div>
                                    </div>
                                  </div>

                                  <div className="z-10 flex justify-between items-start">
                                    <span className="text-sm font-raleway text-neutral-400 font-bold uppercase">Mobile {index + 1}</span>
                                    <label className={`cursor-pointer p-1.5 rounded-lg border transition-all ${isAetheris
                                      ? 'bg-[#1A1D1B] border-white/5 hover:border-[#068B35]/40 hover:bg-[#068B35]/10 text-neutral-300 hover:text-emerald-400'
                                      : 'bg-white border-[#D0D0D0] hover:border-[#068B35]/30 hover:bg-[#EAF4EC] text-neutral-400 hover:text-[#068B35]'
                                      }`}>
                                      <Upload className="w-3.5 h-3.5" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(id, e)}
                                      />
                                    </label>
                                  </div>

                                  <div className="z-10 flex flex-col gap-2 mt-auto">
                                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${isAetheris
                                      ? 'bg-[#1A1D1B] border-white/5 text-neutral-400 group-hover:text-emerald-400 group-hover:border-[#068B35]/30'
                                      : 'bg-white border-[#D0D0D0] text-neutral-300 group-hover:text-[#068B35] group-hover:border-[#068B35]/30'
                                      }`}>
                                      <Smartphone className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <span className="text-sm font-raleway text-neutral-400 uppercase tracking-wider block">
                                        {lang === 'it' ? "Carica Wireframe" : "Upload Wireframe"}
                                      </span>
                                      <span className={`text-xs font-raleway uppercase mt-0.5 block ${isAetheris ? 'text-emerald-400/80' : 'text-[#068B35]/60'}`}>
                                        {lang === 'it' ? "Clicca per selezionare" : "Click to select"}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

        </div>
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 w-full relative z-10 pt-8">

          {/* COLOR PALETTE & TYPOGRAPHY STYLE GUIDE */}
          {isAetheris ? (
            <div className="flex flex-col gap-6 text-left" id="orto-design-system-section">
              {/* Header section removed per request */}

              {/* Design System Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

                {/* Top Left: Color palette principale */}
                <div className="md:col-span-3 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-sm font-raleway uppercase tracking-widest text-neutral-400 font-bold mb-8 relative z-10 text-center">Color Palette</h3>

                  <div className="flex flex-wrap justify-center gap-6 relative z-10">
                    {/* Verde Primario */}
                    <button onClick={() => handleCopyHex('#068B35')} className="group/btn flex flex-col items-center gap-3 cursor-pointer">
                      <div className="w-14 h-14 rounded-full shadow-lg border border-white/10 shrink-0 transition-transform group-hover/btn:scale-110" style={{ backgroundColor: '#068B35' }} />
                      <div className="text-center">
                        <span className="text-[11px] font-raleway text-neutral-500 group-hover/btn:text-white transition-colors">{copiedColor === '#068B35' ? 'Copied' : '#068B35'}</span>
                      </div>
                    </button>

                    {/* Bianco */}
                    <button onClick={() => handleCopyHex('#FFFFFF')} className="group/btn flex flex-col items-center gap-3 cursor-pointer">
                      <div className="w-14 h-14 rounded-full shadow-lg border border-white/10 shrink-0 bg-white transition-transform group-hover/btn:scale-110" />
                      <div className="text-center">
                        <span className="text-[11px] font-raleway text-neutral-500 group-hover/btn:text-white transition-colors">{copiedColor === '#FFFFFF' ? 'Copied' : '#FFFFFF'}</span>
                      </div>
                    </button>

                    {/* Grigio Chiaro */}
                    <button onClick={() => handleCopyHex('#EBEBEB')} className="group/btn flex flex-col items-center gap-3 cursor-pointer">
                      <div className="w-14 h-14 rounded-full shadow-lg border border-white/10 shrink-0 transition-transform group-hover/btn:scale-110" style={{ backgroundColor: '#EBEBEB' }} />
                      <div className="text-center">
                        <span className="text-[11px] font-raleway text-neutral-500 group-hover/btn:text-white transition-colors">{copiedColor === '#EBEBEB' ? 'Copied' : '#EBEBEB'}</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Top Right: Colori pillole categoria */}
                <div className="md:col-span-9 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 relative z-10 w-full" id="orto-categories-row">
                    {[
                      { labelIt: 'Orto Generale', labelEn: 'General Garden', bg: '#0054F0', text: '#FFFFFF' },
                      { labelIt: 'Tropicale', labelEn: 'Tropical', bg: '#EEBE00', text: '#0A0A0A' },
                      { labelIt: 'Orto Siculo', labelEn: 'Sicilian Garden', bg: '#28BF31', text: '#FFFFFF' },
                      { labelIt: 'Arido', labelEn: 'Arid', bg: '#CE2B37', text: '#FFFFFF' },
                      { labelIt: 'Mediterraneo', labelEn: 'Mediterranean', bg: '#6B4FD4', text: '#FFFFFF' },
                      { labelIt: 'Fontanella', labelEn: 'Water Fountain', bg: '#39A1F6', text: '#FFFFFF' },
                      { labelIt: 'Bagni', labelEn: 'Restrooms', bg: '#00025D', text: '#FFFFFF' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleCopyHex(item.bg)}
                        className="flex items-center gap-3 group/pill cursor-pointer"
                        id={`category-pill-${index}`}
                      >
                        <div className="w-6 h-6 rounded-full shadow-md border border-white/10 shrink-0 transition-transform group-hover/pill:scale-110" style={{ backgroundColor: item.bg }} />
                        <div className="text-left">
                          <span className="font-semibold text-sm text-white/90 block">
                            {lang === 'it' ? item.labelIt : item.labelEn}
                          </span>
                          <span className="font-raleway text-[11px] text-neutral-500 group-hover/pill:text-white transition-colors">
                            {copiedColor === item.bg ? 'Copied!' : item.bg}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Left: Componenti Core */}
                <div className="md:col-span-7 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 shadow-2xl relative overflow-hidden group flex flex-col gap-12" id="orto-block-components">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Section: Card Pianta + Searchbars + Buttons + Controls */}
                  <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-10 relative z-10 w-full items-start">

                    {/* Left Column */}
                    <div className="flex flex-col gap-6 w-full lg:w-auto lg:min-w-[320px] xl:min-w-[380px]">
                      <img src="./design_system/searchbar/State=Default.svg" alt="Search Default" className="w-full max-w-[380px] h-auto object-contain drop-shadow-lg hover:-translate-y-1 transition-transform" />
                      <img src="./design_system/searchbar/State=Typing.svg" alt="Search Typing" className="w-full max-w-[380px] h-auto object-contain drop-shadow-lg hover:-translate-y-1 transition-transform" />
                      <img src="./design_system/searchbar/State=Suggestions.svg" alt="Search Suggestions" className="w-full max-w-[380px] h-auto object-contain drop-shadow-lg hover:-translate-y-1 transition-transform" />

                      <div className="mt-8">
                        <img src="./design_system/button_primary.svg" alt="Button Primary" className="w-full max-w-[240px] h-auto object-contain drop-shadow-md hover:scale-105 transition-transform origin-left" />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-8 items-start w-full lg:w-auto">
                      {/* Pianta Card - reduced size */}
                      <img src="./design_system/card_pianta.svg" alt="Card Pianta" className="w-full max-w-[240px] h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300" />

                      {/* Tags */}
                      <img src="./design_system/tag.svg" alt="Tag" className="h-10 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform origin-left" />

                      {/* Language and Scopri Pianta */}
                      <div className="flex items-center gap-8">
                        <img src="./design_system/language.svg" alt="Language" className="h-28 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform" />
                        <img src="./design_system/button_scopri_piante.svg" alt="Button Scopri Piante" className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform" onError={(e) => e.currentTarget.src = '/design_system/button_scopri_pianta.png'} />
                      </div>

                      {/* Percorso */}
                      <div className="mt-4 -ml-12 lg:-ml-20 xl:-ml-36">
                        <img src="./design_system/button_percorso.png" alt="Button Percorso" className="h-14 sm:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform origin-left" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Pillole Categorie Mappa */}
                  <div className="w-full relative z-10 pt-8 lg:pt-12 border-t border-white/5 mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 w-full mx-auto">
                      {["Arido", "Bagni", "Fontanella", "Mediterraneo", "Orto Generale", "Orto Siculo", "Tropicale", "Tu sei qui"].map((variant) => (
                        <img
                          key={variant}
                          src={`/design_system/button_categorie/State=Unselected, Variant=${variant}, Size=Large.svg`}
                          alt={`Categoria ${variant}`}
                          className="w-full h-auto max-h-10 lg:max-h-12 object-contain drop-shadow-sm hover:scale-105 transition-transform"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Right: Body and H1 */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Body Text Demo */}
                  <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex flex-col gap-2 relative z-10">
                      <span className="font-raleway text-[11px] text-[#068B35] font-bold uppercase tracking-wider mb-2">Body / Raleway, Regular, 28px</span>
                      <p style={{ fontFamily: "'Raleway', sans-serif" }} className="text-[#EBEBEB] text-xl md:text-2xl leading-relaxed font-light">
                        {lang === 'it' ? (
                          "Esplora la ricca biodiversità della nostra collezione di piante tropicali, progettata per stupire e ispirare."
                        ) : (
                          "Explore the rich biodiversity of our tropical plant collection, designed to amaze and inspire."
                        )}
                      </p>
                    </div>
                  </div>

                  {/* H1 Demo */}
                  <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center items-start shadow-2xl relative overflow-hidden group flex-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex flex-col gap-2 relative z-10 w-full">
                      <span className="font-raleway text-[11px] text-[#068B35] font-bold uppercase tracking-wider mb-2">H1 / Raleway, Semibold, 62px</span>
                      <h1 style={{ fontFamily: "'Raleway', sans-serif" }} className="text-white text-4xl md:text-[56px] lg:text-[62px] font-semibold leading-tight tracking-tight">
                        {lang === 'it' ? "Scegli il percorso" : "Choose the path"}
                      </h1>
                    </div>
                  </div>
                </div>

              </div>


            </div>
          ) : (
            !isKinetics && (
              <div className={`flex flex-col gap-6 pt-10 border-t ${isAetheris ? 'border-white/5' : 'border-neutral-100'}`}>
                <span className={`text-sm font-raleway uppercase tracking-widest ${isAetheris ? 'text-[#2E8B3A] font-bold' : 'text-[#E8302A]'}`}>{isAetheris ? '06 / Design System Spec' : '04 / Design System Spec'}</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Palette */}
                <div className="flex flex-col gap-3">
                  <h4 className={`text-sm uppercase tracking-widest font-raleway ${isAetheris ? 'text-neutral-400' : 'text-white/60'}`}>Color Palette</h4>
                  <div className="flex flex-col gap-2">
                    {project.colorPalette?.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCopyHex(color.hex)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group text-left w-full ${isAetheris
                          ? 'bg-[#131514] border-white/5 hover:border-[#2E8B3A]/40 hover:bg-[#2E8B3A]/10'
                          : 'bg-neutral-950/60 border-white/5 hover:border-white/20 hover:bg-neutral-900/60'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg border shrink-0 ${isAetheris ? 'border-white/10' : 'border-white/10'}`}
                            style={{ backgroundColor: color.hex }}
                          />
                          <div>
                            <span className={`text-sm font-bold block ${isAetheris ? 'text-white' : 'text-white'}`}>{color.name}</span>
                            <span className={`text-sm font-raleway block ${isAetheris ? 'text-neutral-400' : 'text-white/40'}`}>{color.hex}</span>
                          </div>
                        </div>
                        <div className={`text-sm font-raleway transition-colors shrink-0 ${isAetheris
                          ? 'text-neutral-400 group-hover:text-emerald-400'
                          : 'text-white/30 group-hover:text-[#E8302A]'
                          }`}>
                          {copiedColor === color.hex ? 'Copied!' : 'Copy Hex'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="flex flex-col gap-3">
                  <h4 className={`text-sm uppercase tracking-widest font-raleway ${isAetheris ? 'text-neutral-400' : 'text-white/60'}`}>Typography Spec</h4>
                  <div className={`p-4 rounded-xl border ${isAetheris ? 'bg-[#131514] border-white/5' : 'bg-neutral-950/60 border-white/5'
                    }`}>
                    <span className={`text-sm font-raleway block mb-1 ${isAetheris ? 'text-neutral-500' : 'text-white/30'}`}>Font Pairings</span>
                    <span className={`text-sm leading-relaxed font-raleway block ${isAetheris ? 'text-white' : 'text-white'}`}>
                      {getLocalizedField('typography')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 w-full relative z-10 pt-8 md:pt-12">
          {/* SEZIONE PROVALO (Sperimenta l’Esperienza) */}
          {isAetheris && (
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16 w-full" id="orto-interactive-prototypes-section">

              {/* Left Column: Prototypes */}
              <div className="lg:col-span-5 flex flex-col gap-6 items-center w-full">
                {/* Menu Orizzontale Capsule */}
                <div className="flex justify-center w-full">
                  <div className="flex bg-[#131514] border border-white/5 p-1 rounded-2xl shrink-0 shadow-inner relative w-fit max-w-full overflow-x-auto scrollbar-none">
                    <button
                      onClick={() => setActiveProtoTab('mobile')}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 whitespace-nowrap uppercase font-raleway cursor-pointer ${activeProtoTab === 'mobile' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                      {activeProtoTab === 'mobile' && (
                        <motion.div
                          layoutId="active-proto-tab-bg"
                          className="absolute inset-0 bg-[#068B35] rounded-xl"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" />
                        {lang === 'it' ? 'Versione Mobile' : 'Mobile Version'}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveProtoTab('totem')}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm sm:text-sm font-semibold tracking-wide transition-all duration-300 relative z-10 whitespace-nowrap uppercase font-raleway cursor-pointer ${activeProtoTab === 'totem' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                      {activeProtoTab === 'totem' && (
                        <motion.div
                          layoutId="active-proto-tab-bg"
                          className="absolute inset-0 bg-[#068B35] rounded-xl"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        {lang === 'it' ? 'Versione Totem' : 'Totem Version'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Prototype Containers */}
                <div className="relative w-full h-[550px] sm:h-[700px] lg:h-[800px] mt-2 flex justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: activeProtoTab === 'totem' ? 1 : 0,
                      y: activeProtoTab === 'totem' ? 0 : 15
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full flex justify-center items-center"
                    style={{
                      pointerEvents: activeProtoTab === 'totem' ? 'auto' : 'none',
                      zIndex: activeProtoTab === 'totem' ? 10 : 1
                    }}
                  >
                    <iframe
                      id="totem-prototype-iframe"
                      style={{ border: 'none', width: '100%', height: '100%' }}
                      width="100%"
                      height="100%"
                      src="https://embed.figma.com/proto/gnhkgpC09NhaH8PuuA87HM/UI-UX-Orto-Botanico?node-id=1509-1744&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&show-proto-sidebar=0&hide-ui=1&embed-host=share&bg-color=050505"
                      allowFullScreen
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: activeProtoTab === 'mobile' ? 1 : 0,
                      y: activeProtoTab === 'mobile' ? 0 : 15
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full flex justify-center items-center"
                    style={{
                      pointerEvents: activeProtoTab === 'mobile' ? 'auto' : 'none',
                      zIndex: activeProtoTab === 'mobile' ? 10 : 1
                    }}
                  >
                    <iframe
                      id="mobile-prototype-iframe"
                      style={{ border: 'none', width: '100%', height: '100%' }}
                      width="100%"
                      height="100%"
                      src="https://embed.figma.com/proto/gnhkgpC09NhaH8PuuA87HM/UI-UX-Orto-Botanico?node-id=154-6774&t=TiqHn75nSyihqQRA-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=154%3A6774&show-proto-sidebar=1&hide-ui=1&embed-host=share&bg-color=050505"
                      allowFullScreen
                    />
                  </motion.div>
                </div>
              </div>

              {/* Right Column: Text & Button */}
              <div className="lg:col-span-7 flex flex-col justify-center items-start gap-6 lg:gap-8 px-4 lg:px-8">
                <h2 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-[#068B35] font-raleway leading-none">
                  Provalo
                </h2>
                <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-[1.3] max-w-xl font-raleway">
                  {lang === 'it'
                    ? "Puoi provare il prototipo dall'anteprima a sinistra o cliccando sul pulsante qui sotto"
                    : "You can test the prototype from the preview on the left or by clicking the button below"}
                </p>
                <div className="mt-8 flex flex-col gap-8 w-full max-w-sm">
                  <a href="https://www.figma.com/proto/gnhkgpC09NhaH8PuuA87HM/UI-UX-Orto-Botanico?node-id=154-6774&t=TiqHn75nSyihqQRA-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=154%3A6774&show-proto-sidebar=1" target="_blank" rel="noopener noreferrer" className="block w-fit group">
                    <motion.button
                      animate={{
                        boxShadow: [
                          "0px 0px 15px rgba(6,139,53,0.1)",
                          "0px 0px 35px rgba(6,139,53,0.4)",
                          "0px 0px 15px rgba(6,139,53,0.1)"
                        ],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative flex items-center gap-3 px-8 py-4 bg-[#068B35] hover:bg-[#057A2E] text-white rounded-full transition-colors duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative font-raleway font-semibold tracking-wide text-sm md:text-base">
                        {lang === 'it' ? "Prova il Prototipo" : "Try the Prototype"}
                      </span>
                      <ArrowUpRight className="relative w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    </motion.button>
                  </a>
                </div>
              </div>

            </div>
          )}
        </div>


        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 w-full">

        </div>

        {/* 4. OTHER PROJECTS NAVIGATOR (Bottom hopper) */}
        <section className={`max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 mt-20 border-t pt-16 ${isAetheris ? 'border-white/5' : 'border-white/5'}`}>
          <span className={`text-sm font-raleway uppercase tracking-[0.25em] block mb-4 text-center ${isAetheris ? 'text-[#068B35] font-bold' : 'text-[#E8302A]'}`}>
            {lang === 'it' ? 'Prossima Esplorazione' : 'Next Project Exploration'}
          </span>
          <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10 ${isAetheris ? 'text-white font-raleway' : 'text-white'}`}>
            {lang === 'it' ? 'Esplora altre opere' : 'Explore other works'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {otherProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigateToProject(p)}
                className={`group relative h-48 rounded-[1.5rem] overflow-hidden border cursor-pointer shadow-xl hover:scale-[1.02] transition-all duration-300 ${isAetheris
                  ? 'border-[#068B35]/15 bg-[#131514] hover:border-[#068B35]/40'
                  : 'border-white/10 bg-neutral-950 hover:border-white/30'
                  }`}
              >
                <img
                  src={p.heroImage}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-[0.3] group-hover:grayscale-0 group-hover:brightness-50 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <span className={`text-xs font-raleway uppercase tracking-widest block mb-1 ${isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'}`}>
                      {p.year} / {p.category}
                    </span>
                    <h4 className="text-lg font-bold text-white uppercase">{p.title}</h4>
                  </div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isAetheris
                    ? 'bg-white/5 border-[#068B35]/30 text-emerald-400 group-hover:bg-[#068B35] group-hover:text-white'
                    : 'bg-white/5 border-white/10 text-white/60 group-hover:bg-white group-hover:text-black'
                    }`}>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. BACK TO HOME CTA */}
        <section className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 mt-16 text-center">
          <button
            onClick={onClose}
            className={`px-8 py-3 font-bold uppercase tracking-widest text-sm rounded-full inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg ${isAetheris
              ? 'bg-[#131514] text-[#068B35] border border-[#068B35]/30 hover:bg-[#068B35]/10 hover:border-[#068B35]/55 hover:text-emerald-400 shadow-xl'
              : 'bg-white text-black hover:bg-neutral-100'
              }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'it' ? 'Torna alla Home' : 'Back to Home'}</span>
          </button>
        </section>

      </div>
    </SmoothScroll>
  );
}
