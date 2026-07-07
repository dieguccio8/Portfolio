import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  X,
  Copy,
  Check,
  Send,
  ChevronRight,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Info,
  Layers,
  ArrowRight,
  ArrowDown,
  Phone,
  MapPin,
  Figma,
  Sparkles,
  PenTool,
  Image,
  Menu
} from 'lucide-react';
import { PROJECTS, SKILL_GROUPS, BIOGRAPHY_TEXT } from './data.ts';
import { Project } from './types.ts';
import ProjectPage from './components/ProjectPage.tsx';
import { GlowCard } from './components/GlowCard.tsx';
import { FloatingPaths } from './components/ui/background-paths';
import { GooeyProjectsBackground } from './components/GooeyProjectsBackground.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { SmoothScroll } from './components/SmoothScroll.tsx';
import { ScrollProgress } from './components/ScrollProgress.tsx';
import { ScrollReveal } from './components/ScrollReveal.tsx';
import { CircularGalleryDemo } from './components/CircularGalleryDemo.tsx';
import { GridVignetteBackground } from './components/ui/vignette-grid-background.tsx';

const PenNibIcon = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 13l1.5-7.5L22 2l-3.5 14.5L11 18l-5-5z" />
    <circle cx="13" cy="11" r="2.5" />
    <path d="M14.768 9.232L22 2" />
    <path d="M11 18l-4 4" />
    <path d="M6 13l-4 4" />
  </svg>
);
export default function App() {
  const [lang, setLang] = useState<'it' | 'en'>('it');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation & Interactive States
  const [activeOverlay, setActiveOverlay] = useState<'none' | 'projects' | 'about' | 'contact'>('none');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectPage, setActiveProjectPage] = useState<Project | null>(null);

  // Smooth scroll to element helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Local active Catania clock
  const [timeStr, setTimeStr] = useState('');

  // Contact Form state inside single screen
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // About Me Section Custom States
  const [activeFactIdx, setActiveFactIdx] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    projectType: 'Interactive Strategy',
    urgency: 'Medium',
    date: ''
  });
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  // Contact Section (Sec 4) custom state
  const [sec4Copied, setSec4Copied] = useState(false);
  const [sec4FormSubmitted, setSec4FormSubmitted] = useState(false);
  const [sec4Form, setSec4Form] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sec4Submitting, setSec4Submitting] = useState(false);

  // Handle Copy Email inside Section 4
  const handleSec4CopyEmail = () => {
    navigator.clipboard.writeText('diegocavallaro8@gmail.com');
    setSec4Copied(true);
    setTimeout(() => setSec4Copied(false), 2000);
  };

  // Section 4 Form submission handler
  const handleSec4FormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sec4Form.name || !sec4Form.email || !sec4Form.message) return;
    setSec4Submitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/diegocavallaro8@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: sec4Form.name,
          Email: sec4Form.email,
          Message: sec4Form.message,
          _subject: `Nuovo messaggio di contatto da ${sec4Form.name}`
        })
      });

      if (response.ok) {
        setSec4FormSubmitted(true);
        setSec4Form({ name: '', email: '', message: '' });
      } else {
        alert("Si è verificato un errore durante l'invio. Riprova più tardi.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Si è verificato un errore di rete. Riprova più tardi.");
    } finally {
      setSec4Submitting(false);
    }
  };

  // Workspace facts rotation array
  const WORKSPACE_FACTS = [
    {
      id: "01/04",
      stat: "230+",
      label: "Digital Launches",
      desc: "Bespoke digital platforms successfully executed and integrated globally since 2020."
    },
    {
      id: "02/04",
      stat: "99.9%",
      label: "Fidelity Score",
      desc: "Pixel-perfect translation of design guidelines into production React architectures."
    },
    {
      id: "03/04",
      stat: "2x",
      label: "Design Awards",
      desc: "Nominated and featured on major contemporary visual galleries and CSS directories."
    },
    {
      id: "04/04",
      stat: "10+",
      label: "Studio Partners",
      desc: "Active custom engineering collaborations with international art bureaus and architectures."
    }
  ];

  // Synchronize dynamic active Catania clock (Europe/Rome timezone)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format specifically for Europe/Rome
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Rome',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      try {
        const str = new Intl.DateTimeFormat('en-GB', options).format(now);
        setTimeStr(`${str} CET`);
      } catch (e) {
        // Fallback
        setTimeStr(now.toTimeString().split(' ')[0] + ' Local');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('diegocavallaro8@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Form submission handler
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/diegocavallaro8@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formState.name,
          Email: formState.email,
          Message: formState.message,
          _subject: `Nuovo messaggio di contatto da ${formState.name}`
        })
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        alert("Si è verificato un errore durante l'invio. Riprova più tardi.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Si è verificato un errore di rete. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scheduler Form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.date) return;
    setIsBookingSubmitting(true);

    setTimeout(() => {
      setIsBookingSubmitting(false);
      setBookingSubmitted(true);
      setBookingForm({
        name: '',
        email: '',
        projectType: 'Interactive Strategy',
        urgency: 'Medium',
        date: ''
      });
    }, 1500);
  };

  // Helper to localize project fields in overlays
  const getLocalizedProjectField = (project: any, field: 'category' | 'description') => {
    if (lang === 'it') {
      return project[field] || '';
    }
    const translations: Record<string, Record<string, string>> = {
      aetheris: {
        category: "Digital ecosystem to improve the exploration of the Botanical Garden of Catania",
        description: "An immersive, typography-focused web system designed for the university Botanical Garden. Seamless navigation through rare species and ecosystems."
      },
      kinetics: {
        category: "Cultural Heritage Mapping & Branding",
        description: "Interactive mapping and visual identity for street art works in Sicily. A brutal and geometric layout to enhance contemporary urban art."
      },
      chronos: {
        category: "High-Performance Interface Concept",
        description: "Interface concept for high-speed train quick reservation. Transactional flow optimization and high visual accessibility."
      }
    };
    return translations[project.id]?.[field] || project[field] || '';
  };

  if (activeProjectPage) {
    return (
      <ProjectPage
        project={activeProjectPage}
        onClose={() => setActiveProjectPage(null)}
        onNavigateToProject={(proj) => setActiveProjectPage(proj)}
        allProjects={PROJECTS}
        lang={lang}
        setLang={setLang}
      />
    );
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <ScrollReveal />
      <div className="relative min-h-screen bg-[#050505] text-white font-sans select-none flex flex-col scroll-smooth overflow-x-hidden">

        {/* SECTION 1: HERO VIEW CONTAINER */}
        <section className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-[#050505] overflow-hidden" id="hero-section">

          {/* Background Image with high-fidelity matching portrait of Diego Cavallaro */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-75" id="hero-bg-media">
            <img
              src="/hero.jpg"
              alt="Diego Cavallaro - Junior UX/UI & Visual Designer Portrait"
              className="hero-bg-img w-full h-full object-cover scale-110 object-[65%_top] md:object-center"
              data-cursor="image"
            />
            {/* Custom dual-tone red neon studio lighting overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8302A]/25 via-transparent to-transparent mix-blend-color pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8302A]/10 via-transparent to-transparent mix-blend-screen pointer-events-none" />
            {/* Subtle dark gradient overlay for optimal text contrast and sleek fading */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-transparent to-[#050505] pointer-events-none" />
          </div>

          {/* HEADER SECTION - Floating Pill Navbar */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-4 left-0 right-0 mx-auto z-50 grid grid-cols-3 items-center justify-between text-xs uppercase tracking-widest font-normal transition-all duration-700 ease-[0.16,1,0.3,1] ${
              isScrolled 
                ? "w-[calc(100%-2rem)] max-w-5xl border border-white/10 rounded-full px-4 md:px-6 py-2.5 bg-white/[0.03] backdrop-blur-[16px] shadow-2xl shadow-black/60"
                : "w-full max-w-none border-transparent rounded-none px-6 sm:px-10 md:px-14 py-2 bg-transparent backdrop-blur-none shadow-none"
            }`}
            id="app-header"
          >
            {/* Left Area: Logo/Brand */}
            <div className="flex items-center gap-3 md:col-start-1 justify-start">
              {/* Mobile Only Language Switcher (Left Side) */}
              <button
                onClick={() => {
                  setLang(lang === 'it' ? 'en' : 'it');
                  setMobileMenuOpen(false);
                }}
                className={`items-center justify-center rounded-full border bg-white/[0.04] hover:bg-white/[0.1] active:scale-[0.95] transition-all duration-700 ease-[0.16,1,0.3,1] text-[10px] font-mono font-bold text-white select-none cursor-pointer shadow-md overflow-hidden flex shrink-0 ${!isScrolled ? 'w-0 h-0 opacity-0 border-transparent' : 'w-8 h-8 opacity-100 border-white/10 md:w-0 md:h-0 md:opacity-0 md:border-transparent md:pointer-events-none'}`}
                title={lang === 'it' ? 'Switch to English' : 'Passa in Italiano'}
              >
                {lang.toUpperCase()}
              </button>

              {/* Desktop Only Logo - Diego Cavallaro Premium Monogram with red accent */}
              <div 
                className="flex items-center gap-2.5 group/logo cursor-pointer transition-all duration-700 ease-[0.16,1,0.3,1]" 
                onClick={() => scrollToSection('hero-section')}
              >
                <div className={`items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] rounded-full flex overflow-hidden shrink-0 ${!isScrolled ? 'w-10 h-10 backdrop-blur-md bg-white/[0.05] border border-white/20 opacity-100' : 'w-0 h-0 opacity-0 border-transparent md:w-5 md:h-5 md:opacity-100'}`}>
                  <img
                    src="/logo_diego_cavallaro.png"
                    className="w-5 h-5 min-w-[20px] object-contain transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover/logo:scale-105"
                    alt="Diego Cavallaro Logo"
                    id="header-logo-img"
                  />
                </div>
                <span className={`text-white font-jakarta font-bold tracking-tight text-sm uppercase group-hover/logo:text-[#E8302A] transition-all duration-700 ease-[0.16,1,0.3,1] origin-left whitespace-nowrap overflow-hidden block ${!isScrolled ? 'max-w-0 opacity-0' : 'max-w-0 opacity-0 md:max-w-[200px] md:opacity-100'}`}>Diego Cavallaro</span>
              </div>
            </div>

            {/* Center Area: Mobile Only Logo & Desktop Center Navigation */}
            <div className={`flex justify-center items-center md:col-start-2 transition-all duration-700 ease-[0.16,1,0.3,1] ${!isScrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
              {/* Mobile Only Center Logo */}
              <div className="flex md:hidden justify-center items-center cursor-pointer" onClick={() => { scrollToSection('hero-section'); setMobileMenuOpen(false); }}>
                <img
                  src="/logo_diego_cavallaro.png"
                  className="w-5 h-5 object-contain"
                  alt="Diego Cavallaro Logo"
                />
              </div>

              {/* Desktop Only Navigation - Minimal & Elegant centered */}
              <nav className="hidden md:flex justify-center items-center gap-6 text-white/50">
                <button
                  id="nav-about-btn"
                  onClick={() => scrollToSection('about-me-section')}
                  className="transition-all duration-300 ease-[0.16,1,0.3,1] hover:text-white cursor-pointer text-white/50 flex items-center gap-1.5 font-jakarta font-medium relative group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3" />
                  {lang === 'it' ? 'Skills' : 'Skills'}
                </button>

                <button
                  id="nav-projects-btn"
                  onClick={() => scrollToSection('collaboration-section')}
                  className="transition-all duration-300 ease-[0.16,1,0.3,1] hover:text-white cursor-pointer text-white/50 flex items-center gap-1.5 font-jakarta font-medium relative group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity absolute -left-3" />
                  {lang === 'it' ? 'Progetti' : 'Projects'}
                </button>
              </nav>
            </div>

            {/* Right Area: Action buttons (desktop) & Hamburger menu toggle (mobile) */}
            <div className="flex justify-end items-center gap-2 md:col-start-3">
              {/* Desktop Only Actions */}
              <div className={`items-center gap-3 transition-all duration-700 ease-[0.16,1,0.3,1] overflow-hidden whitespace-nowrap flex ${!isScrolled ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-0 opacity-0 md:max-w-[300px] md:opacity-100'}`} id="header-cta-container">
                <button
                  id="nav-cv-btn"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.setAttribute('download', 'Diego_Cavallaro_CV.pdf');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2 rounded-full font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-[10px]"
                >
                  {lang === 'it' ? 'Download CV' : 'Download CV'}
                </button>
                <button
                  id="nav-contact-btn"
                  onClick={() => scrollToSection('direct-contact-section')}
                  className="bg-[#E8302A] hover:bg-[#c9221d] text-white px-5 py-2 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(232,48,42,0.3)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-[10px]"
                >
                  {lang === 'it' ? 'Contattami' : 'Contact Me'}
                </button>
              </div>

              {/* Language Switcher (Desktop Only on the right) */}
              <button
                onClick={() => {
                  setLang(lang === 'it' ? 'en' : 'it');
                  setMobileMenuOpen(false);
                }}
                className={`items-center justify-center rounded-full border bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/30 hover:scale-[1.05] active:scale-[0.95] transition-all duration-700 ease-[0.16,1,0.3,1] text-[10px] font-mono font-bold text-white select-none cursor-pointer shadow-md shrink-0 overflow-hidden flex ${!isScrolled ? 'w-0 h-0 opacity-0 border-transparent pointer-events-none' : 'w-0 h-0 opacity-0 md:w-8 md:h-8 md:opacity-100 md:border-white/10'}`}
                title={lang === 'it' ? 'Switch to English' : 'Passa in Italiano'}
              >
                {lang.toUpperCase()}
              </button>

              {/* Hamburger Menu - Visible on Mobile ALWAYS, Visible on Desktop ONLY when !isScrolled */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`items-center justify-center rounded-full border transition-all duration-700 ease-[0.16,1,0.3,1] text-white cursor-pointer active:scale-95 flex overflow-hidden shrink-0 ${!isScrolled ? 'w-10 h-10 border-white/10 backdrop-blur-md bg-white/[0.05] hover:bg-white/[0.1] opacity-100' : 'w-8 h-8 border-white/10 bg-white/[0.04] hover:bg-white/[0.1] md:w-0 md:h-0 md:opacity-0 md:border-transparent md:pointer-events-none'}`}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className={`transition-transform duration-700 ease-[0.16,1,0.3,1] shrink-0 ${!isScrolled ? "w-5 h-5 min-w-[20px]" : "w-4 h-4 min-w-[16px] md:min-w-0"}`} /> : <Menu className={`transition-transform duration-700 ease-[0.16,1,0.3,1] shrink-0 ${!isScrolled ? "w-5 h-5 min-w-[20px]" : "w-4 h-4 min-w-[16px] md:min-w-0"}`} />}
              </button>
            </div>
          </motion.header>

          {/* Mobile Menu Dropdown Panel */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed top-20 right-4 z-40 flex flex-col gap-4 border border-white/10 rounded-3xl p-6 bg-white/[0.03] backdrop-blur-[16px] shadow-2xl shadow-black/60 w-[calc(100%-2rem)] md:w-64 md:right-14 ${isScrolled ? 'md:hidden' : ''}`}
              >
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      scrollToSection('about-me-section');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-white font-medium transition-all text-sm uppercase tracking-wider font-sans"
                  >
                    {lang === 'it' ? 'Skills' : 'Skills'}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('collaboration-section');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-white font-medium transition-all text-sm uppercase tracking-wider font-sans"
                  >
                    {lang === 'it' ? 'Progetti' : 'Projects'}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('direct-contact-section');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-white font-medium transition-all text-sm uppercase tracking-wider font-sans"
                  >
                    {lang === 'it' ? 'Contatti' : 'Contact'}
                  </button>
                </div>

                <div className="h-[1px] bg-white/10 my-1" />

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '#';
                      link.setAttribute('download', 'Diego_Cavallaro_CV.pdf');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold text-center transition-all text-[11px] uppercase tracking-wider"
                  >
                    {lang === 'it' ? 'Download CV' : 'Download CV'}
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection('direct-contact-section');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-[#E8302A] hover:bg-[#c9221d] rounded-xl text-white font-bold text-center transition-all text-[11px] uppercase tracking-wider shadow-lg"
                  >
                    {lang === 'it' ? 'Contattami' : 'Contact Me'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>



          {/* CENTRAL HERO (The "Diego Cavallaro" Master Typography) */}
          <main className="relative flex-1 flex flex-col justify-center items-center z-10 my-12 w-full max-w-6xl mx-auto px-4 text-center" id="hero-main">

            <div className="w-full max-w-4xl md:pt-[100px] flex flex-col items-center gap-6 text-center">
              <GooeyProjectsBackground />

              {/* High-contrast elegant glass capsule for Based in Catania */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/10 px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md select-none mt-2 hover:border-white/25 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-medium">{lang === 'it' ? 'Made in Catania' : 'Based in Catania'}</span>
              </motion.div>
            </div>
          </main>

          {/* FOOTER SECTION */}
          <motion.footer
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-end text-xs tracking-wider"
            id="app-footer"
          >
            {/* Left Side: Social Icons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-6 sm:gap-10 text-white/40">
              <div className="flex flex-col gap-1">
                <span className="uppercase text-[10px] tracking-widest text-white/30">{lang === 'it' ? 'Link Social' : 'Social links'}</span>
                <div className="flex items-center gap-4 text-white/60">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors py-0.5 flex items-center gap-1"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-mono">LN</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors py-0.5 flex items-center gap-1"
                    title="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-mono">IG</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Role & Domain Description */}
            <div className="text-right flex flex-col md:items-end justify-end gap-1 font-mono text-white/40">
              <span className="text-white">{"// Junior"}</span>
              <span className="uppercase text-[10px] tracking-[0.2em] text-white/60">{lang === 'it' ? "UX/UI e Visual Designer" : "UX/UI & Visual Designer"}</span>
            </div>
          </motion.footer>
        </section>

        {/* SECTION 1.5: CIRCULAR GALLERY & TOOLS (Now acts as About Me) */}
        <section className="relative w-full bg-[#050505] text-white py-12 sm:py-16 md:py-20 border-t border-[#2A2A2A] overflow-hidden" id="about-me-section">
          <GridVignetteBackground className="opacity-100" x={50} y={50} intensity={100} horizontalVignetteSize={50} verticalVignetteSize={30} />
          <div className="relative z-10 w-full mx-auto">
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8 px-6 sm:px-10 md:px-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.06] font-jakarta" data-reveal data-delay="80">
                Skills
              </h2>
              <p className="mt-8 text-sm sm:text-base text-white/60 font-light max-w-lg mx-auto" data-reveal data-delay="120">
                {lang === 'it' ? 'Trascina le card per scorrere tra le competenze' : 'Drag the cards to scroll through the skills'}
              </p>
            </div>
            
            <div data-reveal data-delay="150" className="w-full">
              <CircularGalleryDemo />
            </div>

            {/* Software Skills Area */}
            <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-14 mt-16 sm:mt-24 mb-16 sm:mb-24 md:mb-32 flex flex-col items-center justify-center gap-12" data-reveal data-delay="200">
              <h3 className="text-base sm:text-lg text-white/60 font-light max-w-lg mx-auto text-center">
                Software Skills
              </h3>

              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 w-full">
                {/* SVG for Photoshop */}
                <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 md:w-24 md:h-24 transition-all hover:scale-105 hover:opacity-100 opacity-70 duration-300 cursor-pointer drop-shadow-xl">
                  <g clipPath="url(#clip0_379_3518)">
                  <path d="M60 0.5H196C228.861 0.5 255.5 27.1391 255.5 60V196C255.5 228.861 228.861 255.5 196 255.5H60C27.1391 255.5 0.5 228.861 0.5 196V60C0.5 27.1391 27.1391 0.5 60 0.5Z" fill="#181818" stroke="#4D4D4D"/>
                  <path d="M57.5996 178.04V68.2801C57.5996 67.5334 57.9196 67.1068 58.6663 67.1068C60.4796 67.1068 62.1863 67.1068 64.6396 67.0001C67.1996 66.8934 69.8663 66.8934 72.7463 66.7868C75.6263 66.6801 78.7196 66.6801 82.0263 66.5734C85.3329 66.4668 88.5329 66.4668 91.7329 66.4668C100.48 66.4668 107.733 67.5334 113.707 69.7734C119.04 71.5868 123.947 74.5734 128 78.5201C131.413 81.9334 134.08 86.0934 135.787 90.6801C137.387 95.1601 138.24 99.7468 138.24 104.547C138.24 113.72 136.107 121.293 131.84 127.267C127.573 133.24 121.6 137.72 114.667 140.28C107.413 142.947 99.4129 143.907 90.6663 143.907C88.1063 143.907 86.3996 143.907 85.3329 143.8C84.2663 143.693 82.7729 143.693 80.7463 143.693V177.933C80.8529 178.68 80.3196 179.32 79.5729 179.427C79.4663 179.427 79.3596 179.427 79.1463 179.427H58.8796C58.0263 179.427 57.5996 179 57.5996 178.04ZM80.8529 87.6934V123.533C82.3463 123.64 83.7329 123.747 85.0129 123.747H90.6663C94.8263 123.747 98.9863 123.107 102.933 121.827C106.347 120.867 109.333 118.84 111.68 116.173C113.92 113.507 114.987 109.88 114.987 105.187C115.093 101.88 114.24 98.5734 112.533 95.6934C110.72 92.9201 108.16 90.7868 105.067 89.6134C101.12 88.0134 96.8529 87.3734 92.4796 87.4801C89.7063 87.4801 87.2529 87.4801 85.2263 87.5868C83.0929 87.4801 81.5996 87.5868 80.8529 87.6934Z" fill="white"/>
                  <path d="M204.799 117.027C201.599 115.32 198.186 114.147 194.559 113.4C190.612 112.547 186.666 112.013 182.612 112.013C180.479 111.907 178.239 112.227 176.212 112.76C174.826 113.08 173.652 113.827 172.906 114.893C172.372 115.747 172.052 116.813 172.052 117.773C172.052 118.733 172.479 119.693 173.119 120.547C174.079 121.72 175.359 122.68 176.746 123.427C179.199 124.707 181.759 125.88 184.319 126.947C190.079 128.867 195.626 131.533 200.746 134.733C204.266 136.973 207.146 139.96 209.172 143.587C210.879 147 211.732 150.733 211.626 154.573C211.732 159.587 210.239 164.6 207.466 168.76C204.479 173.027 200.319 176.333 195.519 178.253C190.292 180.493 183.892 181.667 176.212 181.667C171.306 181.667 166.506 181.24 161.706 180.28C157.972 179.64 154.239 178.467 150.826 176.867C150.079 176.44 149.546 175.693 149.652 174.84V156.28C149.652 155.96 149.759 155.533 150.079 155.32C150.399 155.107 150.719 155.213 151.039 155.427C155.199 157.88 159.572 159.587 164.266 160.653C168.319 161.72 172.586 162.253 176.852 162.253C180.906 162.253 183.786 161.72 185.706 160.76C187.412 160.013 188.586 158.2 188.586 156.28C188.586 154.787 187.732 153.4 186.026 152.013C184.319 150.627 180.799 149.027 175.572 147C170.132 145.08 165.119 142.52 160.426 139.32C157.119 136.973 154.346 133.88 152.319 130.253C150.612 126.84 149.759 123.107 149.866 119.373C149.866 114.787 151.146 110.413 153.492 106.467C156.159 102.2 160.106 98.7866 164.692 96.6532C169.706 94.0932 175.999 92.9199 183.572 92.9199C187.946 92.9199 192.426 93.2399 196.799 93.8799C199.999 94.3066 203.092 95.1599 205.972 96.3332C206.399 96.4399 206.826 96.8666 207.039 97.2932C207.146 97.7199 207.252 98.1466 207.252 98.5732V115.96C207.252 116.387 207.039 116.813 206.719 117.027C205.759 117.24 205.226 117.24 204.799 117.027Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_379_3518">
                  <rect width="256" height="256" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>

                {/* SVG for Illustrator */}
                <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 md:w-24 md:h-24 transition-all hover:scale-105 hover:opacity-100 opacity-70 duration-300 cursor-pointer drop-shadow-xl">
                  <g clipPath="url(#clip0_379_3535)">
                  <path d="M60 0.5H196C228.861 0.5 255.5 27.1391 255.5 60V196C255.5 228.861 228.861 255.5 196 255.5H60C27.1391 255.5 0.5 228.861 0.5 196V60C0.5 27.1391 27.1391 0.5 60 0.5Z" fill="#181818" stroke="#4D4D4D"/>
                  <path d="M128.157 160.973H88.4769L80.3703 186.04C80.1569 187 79.3036 187.64 78.3436 187.533H58.2903C57.1169 187.533 56.7969 186.893 57.1169 185.613L91.4636 86.7331C91.7836 85.6664 92.1036 84.4931 92.5303 83.2132C92.9569 80.9732 93.1703 78.6264 93.1703 76.2797C93.0636 75.7464 93.4903 75.2131 94.0236 75.1064H94.3436H121.65C122.504 75.1064 122.93 75.4264 123.037 75.9597L161.97 185.827C162.29 187 161.97 187.533 160.904 187.533H138.61C137.864 187.64 137.117 187.107 136.904 186.36L128.157 160.973ZM94.6636 139.32H121.757C121.117 137.08 120.264 134.413 119.304 131.64C118.344 128.76 117.384 125.667 116.424 122.467C115.357 119.16 114.397 115.96 113.33 112.653C112.264 109.347 111.304 106.253 110.45 103.16C109.597 100.173 108.85 97.3998 108.104 94.8398H107.89C106.93 99.4265 105.757 104.013 104.264 108.6C102.664 113.72 101.064 119.053 99.3569 124.387C97.8636 129.827 96.2636 134.84 94.6636 139.32Z" fill="white"/>
                  <path d="M185.757 93.7733C182.237 93.88 178.824 92.4933 176.264 90.04C173.811 87.3733 172.531 83.8533 172.637 80.2267C172.531 76.6 173.917 73.1867 176.477 70.7333C179.037 68.28 182.451 67 185.971 67C190.131 67 193.331 68.28 195.677 70.7333C198.024 73.2933 199.304 76.7067 199.197 80.2267C199.304 83.8533 198.024 87.3733 195.464 90.04C193.011 92.6 189.384 93.9867 185.757 93.7733ZM173.811 186.36V104.227C173.811 103.16 174.237 102.733 175.197 102.733H196.317C197.277 102.733 197.704 103.267 197.704 104.227V186.36C197.704 187.533 197.277 188.067 196.317 188.067H175.411C174.344 188.067 173.811 187.427 173.811 186.36Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_379_3535">
                  <rect width="256" height="256" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>

                {/* SVG for Figma */}
                <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 md:w-24 md:h-24 transition-all hover:scale-105 hover:opacity-100 opacity-70 duration-300 cursor-pointer drop-shadow-xl">
                  <g clipPath="url(#clip0_379_3528)">
                  <path d="M60 0.5H196C228.861 0.5 255.5 27.1391 255.5 60V196C255.5 228.861 228.861 255.5 196 255.5H60C27.1391 255.5 0.5 228.861 0.5 196V60C0.5 27.1391 27.1391 0.5 60 0.5Z" fill="#181818" stroke="#4D4D4D"/>
                  <g clipPath="url(#clip1_379_3528)">
                  <path d="M105.805 61H127.522V104.751H105.805C77.1654 103.623 76.8762 62.1844 105.805 61ZM105.805 150.373H127.522V106.622H105.805C76.8762 107.807 77.1654 149.246 105.805 150.373ZM151.097 61H129.38V104.751H151.097C180.122 103.186 179.76 61.8931 151.097 61ZM127.522 174.12V152.245H105.805C88.0828 152.245 76.8762 173.174 89.2013 188.206C100.952 203.106 127.522 195.678 127.522 174.12ZM172.859 128.498C172.859 111.686 154.667 101.122 140.192 109.528C125.717 117.934 125.717 139.062 140.192 147.468C154.667 155.874 172.859 145.31 172.859 128.498Z" fill="white"/>
                  </g>
                  </g>
                  <defs>
                  <clipPath id="clip0_379_3528">
                  <rect width="256" height="256" fill="white"/>
                  </clipPath>
                  <clipPath id="clip1_379_3528">
                  <rect width="89" height="135" fill="white" transform="translate(84 61)"/>
                  </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* COMBINED WRAPPER FOR PROJECTS AND CONTACTS (To share the continuous BackgroundPaths effect) */}
        <div className="relative w-full bg-[#050505] overflow-hidden border-t border-[#2A2A2A]">
          {/* Shared Floating Paths background spanning both sections */}
          <div className="absolute inset-0 pointer-events-none opacity-40 scale-[2.2] -translate-y-[35%] md:translate-y-0 md:scale-100 origin-center">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>

          {/* SECTION 3: CREATIVE PARTNERSHIP / COLLABORATION SECTION */}
          <section className="relative w-full text-white py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-14" id="collaboration-section">


            <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-20 flex flex-col items-center text-center">

              {/* Header Block: Centered master section title */}
              <div className="flex flex-col items-center mb-16 sm:mb-24">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-mono" data-reveal data-delay="0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8302A]" />
                  <span>Portfolio</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold tracking-[-0.03em] text-white leading-[1.06] font-jakarta" data-reveal data-delay="80">
                  {lang === 'it' ? 'I miei progetti' : 'My Projects'}
                </h2>
              </div>

              {/* THE 3 STYLISH ROTATED / HOVER-EXPANDABLE CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 w-full max-w-[1440px] mb-16 sm:mb-24 justify-center items-center" id="collaboration-cards-container">

                {/* Card 1: Left Card (Slightly tilted on desktop) */}
                <GlowCard
                  id="collab-card-1"
                  customSize={true}
                  glowColor="red"
                  radius={32}
                  className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-950 ring-1 ring-[#05903C]/60 group shadow-2xl cursor-pointer md:-rotate-3 hover:rotate-0 hover:scale-105 custom-card-transition duration-500 ease-[0.16,1,0.3,1] hover:z-20 hover:ring-[#05903C]"
                  onClick={() => {
                    setActiveProjectPage(PROJECTS[0]);
                  }}
                  data-reveal
                  data-delay="0"
                >
                  <img
                    src="/project_cards_cover/orto_botanico.svg"
                    alt="Orto Botanico"
                    className="w-full h-full object-cover grayscale-0 brightness-100 md:grayscale md:brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-[0.16,1,0.3,1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <span className="text-[9px] font-mono uppercase text-[#05903C] tracking-widest block mb-1">{lang === 'it' ? 'Progetto 01' : 'Project 01'}</span>
                    <h4 className="text-sm font-bold tracking-[-0.02em] text-white uppercase font-jakarta">Orto Botanico</h4>
                  </div>
                </GlowCard>

                {/* Card 2: Center Card (Flat & Raised slightly) */}
                <GlowCard
                  id="collab-card-2"
                  customSize={true}
                  glowColor="red"
                  radius={32}
                  className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-950 ring-1 ring-[#FCD306]/60 group shadow-2xl cursor-pointer md:-translate-y-4 hover:scale-105 custom-card-transition duration-500 ease-[0.16,1,0.3,1] hover:z-20 hover:ring-[#FCD306]"
                  onClick={() => {
                    setActiveProjectPage(PROJECTS[1]);
                  }}
                  data-reveal
                  data-delay="120"
                >
                  <img
                    src="/project_cards_cover/uss.svg"
                    alt="Urban StreetArt Sicily"
                    className="w-full h-full object-cover grayscale-0 brightness-100 md:grayscale md:brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-[0.16,1,0.3,1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <span className="text-[9px] font-mono uppercase text-[#FCD306] tracking-widest block mb-1">{lang === 'it' ? 'Progetto 02' : 'Project 02'}</span>
                    <h4 className="text-sm font-bold tracking-[-0.02em] text-white uppercase font-jakarta">Urban StreetArt Sicily</h4>
                  </div>
                </GlowCard>

                {/* Card 3: Right Card (Slightly tilted opposite on desktop) */}
                <GlowCard
                  id="collab-card-3"
                  customSize={true}
                  glowColor="red"
                  radius={32}
                  className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-950 ring-1 ring-[#AA1136]/60 group shadow-2xl cursor-pointer md:rotate-3 hover:rotate-0 hover:scale-105 custom-card-transition duration-500 ease-[0.16,1,0.3,1] hover:z-20 hover:ring-[#AA1136]"
                  onClick={() => {
                    setActiveProjectPage(PROJECTS[2]);
                  }}
                  data-reveal
                  data-delay="240"
                >
                  <img
                    src="/project_cards_cover/italo.svg"
                    alt="Italo Treni"
                    className="w-full h-full object-cover grayscale-0 brightness-100 md:grayscale md:brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-[0.16,1,0.3,1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <span className="text-[9px] font-mono uppercase text-[#AA1136] tracking-widest block mb-1">{lang === 'it' ? 'Progetto 03' : 'Project 03'}</span>
                    <h4 className="text-sm font-bold tracking-[-0.02em] text-white uppercase font-jakarta">Italo Treni</h4>
                  </div>
                </GlowCard>

              </div>

              {/* LOWER HEADER CALL TO ACTION */}
              <div className="max-w-2xl px-4" id="collaboration-cta-block" data-reveal data-delay="0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.1] font-jakarta mb-10 sm:mb-12">
                  {lang === 'it' ? 'Realizziamo insieme qualcosa di unico' : "Let's Create Something Unique"}
                </h2>

                <button
                  id="collab-contact-cta"
                  onClick={() => scrollToSection('direct-contact-section')}
                  className="px-8 py-4 bg-gradient-to-r from-[#E8302A] to-red-700 text-white font-bold tracking-widest text-xs uppercase rounded-full inline-flex items-center gap-3 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-red-950/20 hover:shadow-red-600/10"
                >
                  <span>{lang === 'it' ? 'Contattami' : 'Contact me'}</span>
                  <ArrowDown className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>
          </section>

          {/* SECTION 4: INLINE CONTACT / GET IN TOUCH */}
          <section className="relative w-full text-white py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-14 border-t border-white/5" id="direct-contact-section">
            {/* Soft floating primary radial glow orbs scattered in the background with slow drifting animations */}
            <motion.div
              animate={{
                x: [0, -40, 30, 0],
                y: [0, 50, -30, 0],
                scale: [1, 1.15, 0.9, 1],
              }}
              transition={{
                duration: 23,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[5%] right-[-25%] w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(232,48,42,0.14)_0%,rgba(232,48,42,0.02)_40%,transparent_80%)] pointer-events-none z-0"
            />
            <motion.div
              animate={{
                x: [0, 30, -40, 0],
                y: [0, -30, 45, 0],
                scale: [1, 0.95, 1.05, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[45%] left-[-20%] w-[750px] h-[750px] bg-[radial-gradient(circle,rgba(232,48,42,0.10)_0%,rgba(232,48,42,0.01)_40%,transparent_80%)] pointer-events-none z-0"
            />
            <motion.div
              animate={{
                x: [0, -25, 35, 0],
                y: [0, 40, -25, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-[-15%] left-[20%] w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(232,48,42,0.12)_0%,rgba(232,48,42,0.02)_40%,transparent_80%)] pointer-events-none z-0"
            />

            <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 sm:px-12 md:px-16 lg:px-20">

              <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16 items-stretch z-10 animate-fade-in">

                {/* Left Column (Glassmorphic Contact Card Group with matching height) */}
                <div className="lg:col-span-12 xl:col-span-5 h-full flex flex-col" id="sec4-info-container" data-reveal data-delay="0">
                  <div className="bg-[#121312]/70 border border-white/10 backdrop-blur-[16px] rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between hover:border-[#E8302A]/40 hover:bg-[#151615]/80 custom-card-transition duration-500 ease-[0.16,1,0.3,1]">
                    {/* Subtle soft gradient background glow inside the box */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#E8302A]/15 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col gap-6 lg:gap-8">
                      {/* Custom capsule badge */}
                      <div className="inline-flex items-center gap-2 self-start bg-[#151615] border border-[#E8302A]/30 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8302A] font-bold">{lang === 'it' ? 'Contatti' : 'Contact'}</span>
                      </div>

                      {/* Title */}
                      <div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white font-jakarta">
                          {lang === 'it' ? 'Contattami' : 'Get in touch'}
                        </h2>
                      </div>
                    </div>

                    {/* 3 Clickable capsule lines */}
                    <div className="relative z-10 flex flex-col gap-4 mt-12">

                      {/* Line 1: Email */}
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=diegocavallaro8@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex justify-between items-center p-5 bg-[#151615]/90 border border-white/10 rounded-2xl group transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98] hover:border-[#E8302A]/50 hover:bg-[#1A1D1A]"
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-1 pr-4">
                          <div className="w-11 h-11 rounded-xl bg-[#E8302A]/10 border border-[#E8302A]/20 flex items-center justify-center text-[#E8302A] group-hover:bg-[#E8302A] group-hover:text-white group-hover:border-[#E8302A] transition-all duration-300 shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[11px] font-mono text-white/80 uppercase tracking-widest font-semibold">Email</span>
                            <span className="text-xs sm:text-sm font-semibold text-white tracking-tight break-all font-mono">
                              diegocavallaro8@gmail.com
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:bg-[#E8302A] group-hover:text-white group-hover:border-[#E8302A] transition-all duration-300 shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </a>

                      {/* Line 2: Call */}
                      <a
                        href="tel:+393515485740"
                        className="flex justify-between items-center p-5 bg-[#151615]/90 border border-white/10 rounded-2xl group transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98] hover:border-[#E8302A]/50 hover:bg-[#1A1D1A]"
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-1 pr-4">
                          <div className="w-11 h-11 rounded-xl bg-[#E8302A]/10 border border-[#E8302A]/20 flex items-center justify-center text-[#E8302A] group-hover:bg-[#E8302A] group-hover:text-white group-hover:border-[#E8302A] transition-all duration-300 shrink-0">
                            <Phone className="w-5 h-5 animate-pulse" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[11px] font-mono text-white/80 uppercase tracking-widest font-semibold">{lang === 'it' ? 'Chiamami' : 'Call me'}</span>
                            <span className="text-xs sm:text-sm font-semibold text-white tracking-tight font-mono">
                              +39 3515485740
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:bg-[#E8302A] group-hover:text-white group-hover:border-[#E8302A] transition-all duration-300 shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </a>

                      {/* Line 3: Location */}
                      <div
                        className="flex justify-between items-center p-5 bg-[#151615]/90 border border-white/10 rounded-2xl shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[#E8302A]/10 border border-[#E8302A]/20 flex items-center justify-center text-[#E8302A]">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[11px] font-mono text-white/80 uppercase tracking-widest font-semibold">{lang === 'it' ? 'La mia posizione' : 'My location'}</span>
                            <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                              {lang === 'it' ? 'Catania, Italia' : 'Catania, Italy'}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* Right Column (The Glassmorphic Contact Form) */}
                <div className="lg:col-span-12 xl:col-span-7 h-full flex flex-col" id="sec4-form-container" data-reveal data-delay="120">
                  <div className="bg-[#121312]/70 border border-white/10 backdrop-blur-[16px] rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between hover:border-[#E8302A]/40 hover:bg-[#151615]/80 custom-card-transition duration-500 ease-[0.16,1,0.3,1]">

                    {/* Subtle soft gradient background glow inside the box */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8302A]/15 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

                    {!sec4FormSubmitted ? (
                      <form onSubmit={handleSec4FormSubmit} className="flex flex-col gap-6 relative z-10 w-full text-left">

                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 pl-1 font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8302A] shrink-0 animate-pulse" />
                            <span>{lang === 'it' ? 'Nome' : 'Name'}</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={lang === 'it' ? 'Il tuo nome completo' : 'Your full name'}
                            value={sec4Form.name}
                            onChange={(e) => setSec4Form({ ...sec4Form, name: e.target.value })}
                            className="w-full bg-[#161716] text-white border border-white/10 focus:border-[#E8302A] focus:ring-1 focus:ring-[#E8302A] text-sm py-4 px-5 rounded-2xl transition-all duration-300 focus:outline-none placeholder-neutral-500 font-jakarta shadow-inner"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 pl-1 font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8302A] shrink-0 animate-pulse" />
                            <span>Email</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder={lang === 'it' ? 'latua.email@esempio.com' : 'your.email@example.com'}
                            value={sec4Form.email}
                            onChange={(e) => setSec4Form({ ...sec4Form, email: e.target.value })}
                            className="w-full bg-[#161716] text-white border border-white/10 focus:border-[#E8302A] focus:ring-1 focus:ring-[#E8302A] text-sm py-4 px-5 rounded-2xl transition-all duration-300 focus:outline-none placeholder-neutral-500 font-jakarta shadow-inner"
                          />
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 pl-1 font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8302A] shrink-0 animate-pulse" />
                            <span>{lang === 'it' ? 'Messaggio' : 'Message'}</span>
                          </label>
                          <textarea
                            required
                            rows={4}
                            placeholder={lang === 'it' ? 'Parlami del tuo progetto...' : 'Tell me about your project...'}
                            value={sec4Form.message}
                            onChange={(e) => setSec4Form({ ...sec4Form, message: e.target.value })}
                            className="w-full bg-[#161716] text-white border border-white/10 focus:border-[#E8302A] focus:ring-1 focus:ring-[#E8302A] text-sm py-4 px-5 rounded-2xl transition-all duration-300 focus:outline-none placeholder-neutral-500 font-jakarta resize-none shadow-inner"
                          />
                        </div>

                        {/* Submit Button - Copied premium gradient pill style */}
                        <button
                          type="submit"
                          disabled={sec4Submitting}
                          className="w-full mt-2 py-4 sm:py-5 bg-gradient-to-r from-[#E8302A] to-red-700 text-white font-bold tracking-widest text-xs uppercase rounded-full flex items-center justify-center gap-3 hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-red-950/20 hover:shadow-red-600/10"
                        >
                          {sec4Submitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>{lang === 'it' ? 'Invio in corso...' : 'Sending request...'}</span>
                            </>
                          ) : (
                            <>
                              <span>{lang === 'it' ? 'Invia' : 'Submit'}</span>
                              <ArrowRight className="w-4 h-4 text-white" />
                            </>
                          )}
                        </button>

                      </form>
                    ) : (
                      <div className="text-center py-10 flex flex-col items-center gap-5 relative z-10 my-auto text-center w-full">
                        <div className="w-16 h-16 rounded-full border border-[#E8302A] flex items-center justify-center text-white bg-[#E8302A] animate-bounce mb-2 mx-auto shadow-lg shadow-[#E8302A]/20">
                          <Check className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-[#E8302A] uppercase font-sans">
                          {lang === 'it' ? 'Messaggio Inviato!' : 'Message Sent!'}
                        </h3>
                        <p className="text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                          {lang === 'it'
                            ? 'Grazie. Il tuo messaggio è stato trasmesso con successo. Diego ti risponderà entro 24 ore.'
                            : 'Thank you. Your message has been transmitted successfully. Diego will get back to you within 24 hours.'}
                        </p>
                        <button
                          onClick={() => setSec4FormSubmitted(false)}
                          className="mt-4 px-8 py-3 bg-[#E8302A]/10 border border-[#E8302A]/20 hover:bg-[#E8302A] hover:text-white transition-all rounded-xl text-[10px] uppercase font-mono tracking-widest cursor-pointer mx-auto block text-white"
                        >
                          {lang === 'it' ? 'Invia un altro messaggio' : 'Send another message'}
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </div>

            </div>
          </section>
        </div>

        {/* ADDITIONAL GENERAL FOOTER AT THE VERY BOTTOM OF THE LONG SCROLL PAGE */}
        <footer className="w-full bg-black border-t border-white/5 py-8 px-6 sm:px-10 md:px-14 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/30" id="main-footer">
          <span>{lang === 'it' ? '© 2026 Diego Cavallaro. Tutti i diritti riservati.' : '© 2026 Diego Cavallaro. All rights reserved.'}</span>
          <div className="flex gap-6 items-center">
            <button onClick={() => scrollToSection('hero-section')} className="hover:text-white transition-colors cursor-pointer font-mono">{lang === 'it' ? 'Torna su' : 'Back to top'}</button>
            <button onClick={() => scrollToSection('about-me-section')} className="hover:text-white transition-colors cursor-pointer font-mono">{lang === 'it' ? 'Skills' : 'Skills'}</button>
            <button onClick={() => scrollToSection('collaboration-section')} className="hover:text-white transition-colors cursor-pointer font-mono">{lang === 'it' ? 'Progetti' : 'Projects'}</button>
            <button onClick={() => scrollToSection('direct-contact-section')} className="hover:text-white transition-colors cursor-pointer font-mono uppercase tracking-widest text-[#E8302A]">{lang === 'it' ? 'Contatti' : 'Contact'}</button>
          </div>
        </footer>

        {/* INTERACTIVE BOOKING MODAL (HIGH FI WORKSPACE DIALOG) */}
        <AnimatePresence>
          {isBookingOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="workspace-scheduler"
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                className="bg-[#141414] border border-[#2A2A2A] rounded-[2rem] p-6 sm:p-8 max-w-md w-full relative shadow-2xl"
              >
                <button
                  id="close-scheduler-btn"
                  onClick={() => setIsBookingOpen(false)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>

                {!bookingSubmitted ? (
                  <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#E8302A]" />
                      <h3 className="text-xs font-mono uppercase tracking-widest text-white">Secure Consult Scheduler</h3>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed mb-2 font-mono">
                      Schedule a synchronized workshop / brief call with Alex.
                    </p>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono uppercase text-white/40">Full Name</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        placeholder="Jennifer Lane"
                        className="w-full bg-black border border-[#2A2A2A] focus:border-[#E8302A] text-xs p-2.5 rounded-lg text-white font-mono focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-mono uppercase text-white/40">Work Email Address</label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="jJennifer@aetheris.com"
                        className="w-full bg-black border border-[#2A2A2A] focus:border-[#E8302A] text-xs p-2.5 rounded-lg text-white font-mono focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-mono uppercase text-white/40">Sector</label>
                        <select
                          value={bookingForm.projectType}
                          onChange={(e) => setBookingForm({ ...bookingForm, projectType: e.target.value })}
                          className="w-full bg-black border border-[#2A2A2A] focus:border-[#E8302A] text-[11px] p-2.5 rounded-lg text-white font-mono focus:outline-none"
                        >
                          <option value="Interactive Strategy">Interactive Strategy</option>
                          <option value="Typography Direction">Typography Direction</option>
                          <option value="Fulltime Art Director">Fulltime Art Dir.</option>
                          <option value="Engineering Consult">React Dev Consult</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-mono uppercase text-white/40">Consult Date</label>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full bg-black border border-[#2A2A2A] focus:border-[#E8302A] text-[11px] p-2 rounded-lg text-white font-mono focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isBookingSubmitting}
                      className="w-full mt-3 py-3 bg-[#E8302A] hover:bg-red-700 disabled:opacity-50 text-white font-bold tracking-widest text-xs uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      {isBookingSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Reserving slot...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Confirm Reservation</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[#E8302A] flex items-center justify-center text-[#E8302A] bg-[#E8302A]/5 mb-1">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold tracking-tight text-white uppercase font-mono">Consulate Appointed</h4>
                    <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed">
                      Consult successfully reserved inside the sandbox. Alex will receive the SSL transmission packet shortly.
                    </p>
                    <button
                      onClick={() => setIsBookingOpen(false)}
                      className="mt-2 px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-colors rounded-xl text-[10px] uppercase font-mono tracking-widest cursor-pointer"
                    >
                      Dismiss Workspace
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* INTERACTIVE FLOATING OVERLAYS (SINGLE-VIEW DRAWER SYSTEMS) */}
        <AnimatePresence>

          {/* PROJECTS OVERLAY */}
          {activeOverlay === 'projects' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-black z-30 flex flex-col p-6 sm:p-10 md:p-14 overflow-y-auto"
              id="projects-overlay"
            >
              {/* Header Mirror with Back button */}
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white" />
                  <span className="text-xs uppercase tracking-widest font-mono text-white">{lang === 'it' ? 'Lavori Selezionati' : 'Selected Works'}</span>
                </div>
                <button
                  id="close-projects-btn"
                  onClick={() => {
                    setActiveOverlay('none');
                    setSelectedProject(null);
                  }}
                  className="group flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white cursor-pointer active:scale-95 transition-all"
                >
                  <span>{lang === 'it' ? 'Torna alla Home' : 'Back to Hero'}</span>
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Split layout: Project lists Left, Project Details & Previews Right */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column - List selection (width: 7/12) */}
                <div className="lg:col-span-7 flex flex-col gap-0 w-full" id="projects-list-container">
                  {PROJECTS.map((project, index) => (
                    <div
                      key={project.id}
                      id={`project-item-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={() => setSelectedProject(project)}
                      className={`group cursor-pointer border-b border-white/10 py-5 flex items-center justify-between transition-colors duration-300 ${selectedProject?.id === project.id ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
                    >
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span className="font-mono text-[10px] text-white/30 group-hover:text-white/60 transition-colors">
                          0{index + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline font-mono text-xs text-white/40 group-hover:text-white/60">
                          {project.year}
                        </span>
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${selectedProject?.id === project.id ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Project Detail Card Panel (width: 5/12) */}
                <div className="lg:col-span-5 w-full lg:sticky lg:top-14" id="project-preview-panel">
                  <AnimatePresence mode="wait">
                    {selectedProject ? (
                      <motion.div
                        key={selectedProject.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="border border-white/10 p-6 sm:p-8 bg-neutral-950/70 rounded-md backdrop-blur-sm shadow-xl flex flex-col gap-5 text-white/80"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono tracking-wider uppercase text-white/40 block mb-1">{lang === 'it' ? 'Categoria' : 'Category'}</span>
                            <span className="text-white font-medium text-sm">{getLocalizedProjectField(selectedProject, 'category')}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-white/40 block mb-1">{lang === 'it' ? 'Anno' : 'Year'}</span>
                            <span className="text-white font-mono text-sm">{selectedProject.year}</span>
                          </div>
                        </div>

                        <div className="h-[1px] bg-white/10 my-1" />

                        <div>
                          <span className="text-[10px] font-mono tracking-wider uppercase text-white/40 block mb-2">{lang === 'it' ? 'Descrizione' : 'Description'}</span>
                          <p className="text-xs sm:text-sm leading-relaxed text-white/70 font-light">
                            {getLocalizedProjectField(selectedProject, 'description')}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono tracking-wider uppercase text-white/40 block mb-2">{lang === 'it' ? 'Tecnologie' : 'Applied Stack'}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-[9px] font-mono px-2 py-0.5 bg-white/5 text-white/80 rounded border border-white/5 uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
                          <button
                            onClick={() => alert(`Redirecting to a simulation of ${selectedProject.title} project workspace...`)}
                            className="flex-1 py-2.5 bg-white text-black hover:bg-neutral-200 transition-colors rounded text-center text-xs uppercase font-bold tracking-wider cursor-pointer flex items-center justify-center gap-1"
                          >
                            <span>{lang === 'it' ? 'Apri Progetto' : 'Launch Project'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="border border-dashed border-white/10 p-10 text-center rounded-lg text-white/30 text-xs uppercase tracking-widest font-mono">
                        {lang === 'it' ? 'Passa con il mouse su un progetto per vedere i dettagli' : 'Hover on a project to inspect details'}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Aesthetic lower footnote */}
              <div className="mt-8 border-t border-white/5 pt-4 text-[10px] font-mono text-white/20 flex flex-col sm:flex-row justify-between gap-2">
                <span>{lang === 'it' ? 'Tutti i diritti riservati © 2026' : 'All rights reserved © 2026'}</span>
                <span>{lang === 'it' ? 'Disponibile per contratti freelance e art direction full-time' : 'Available for freelance contracts & fulltime art direction'}</span>
              </div>
            </motion.div>
          )}

          {/* ABOUT / BIOGRAPHY OVERLAY */}
          {activeOverlay === 'about' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-black z-30 flex flex-col p-6 sm:p-10 md:p-14 overflow-y-auto"
              id="about-overlay"
            >
              {/* Header bar and Back button */}
              <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-5">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-white" />
                  <span className="text-xs uppercase tracking-widest font-mono text-white">{lang === 'it' ? 'Chi sono' : 'About the Artist'}</span>
                </div>
                <button
                  id="close-about-btn"
                  onClick={() => setActiveOverlay('none')}
                  className="group flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white cursor-pointer active:scale-95 transition-all"
                >
                  <span>{lang === 'it' ? 'Torna alla Home' : 'Back to Hero'}</span>
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Biography Split Grid layout */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Left Bio Section (width: 7/12) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-3">{lang === 'it' ? 'Manifesto & Missione' : 'Manifesto & Mission'}</span>
                    <p className="text-xl sm:text-2xl font-light leading-relaxed text-white">
                      {lang === 'it'
                        ? "Diego Cavallaro è un Junior UX/UI & Visual Designer con formazione in Digital Media Design. Operando nella meticolosa intersezione tra layout strutturati, tipografia pulita e interfacce interattive intuitive, Diego progetta esperienze digitali semplici, funzionali e altamente curate."
                        : BIOGRAPHY_TEXT}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-4">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-4">{lang === 'it' ? 'Filosofia Principale' : 'Core Philosophy'}</span>
                    <p className="text-sm leading-relaxed text-white/70 font-light mb-4">
                      {lang === 'it'
                        ? "Il design non riguarda la decorazione o l'aggiunta di funzioni superficiali. Il massimo dell'artigianalità si manifesta in confini eleganti, allineamenti iper-precisi, gerarchia dei contenuti e micro-transizioni fluide. Eliminare l'eccesso consente al messaggio principale e all'utilità interattiva di caricarsi istantaneamente e comunicare chiaramente."
                        : "Design is not about the decoration or adding superficial features. Peak craftsmanship manifests in elegant boundaries, hyper-precise alignments, content hierarchy, and fluid micro-transitions. Stripping away the excess lets the core message and interactive utility load instantly and communicate clearly."}
                    </p>
                  </div>
                </div>

                {/* Right Skills Grid Section (width: 5/12) */}
                <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-1">{lang === 'it' ? 'Competenze / Servizi' : 'Capabilities / Offerings'}</span>

                  <div className="flex flex-col gap-4">
                    {SKILL_GROUPS.map((group) => (
                      <div
                        key={group.category}
                        className="border border-white/10 p-5 rounded-md bg-neutral-950/40"
                      >
                        <h4 className="text-xs font-mono uppercase text-white tracking-widest mb-3 border-b border-white/5 pb-2">
                          {group.category}
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                              <span className="w-1 h-1 rounded-full bg-white/30" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column (The Glassmorphic Contact Card) has been merged/restructured */}

              </div>

              {/* Aesthetic lower footnote */}
              <div className="mt-8 border-t border-white/5 pt-4 text-[10px] font-mono text-white/20 flex flex-col sm:flex-row justify-between gap-2">
                <span>{lang === 'it' ? 'Basato a Catania / Collaborazione Remota e Ibrida' : 'Based in Catania / Remote & Hybrid Cooperation'}</span>
                <span>{lang === 'it' ? 'Disponibile a partire dal Q3 2026' : 'Available starting Q3 2026'}</span>
              </div>
            </motion.div>
          )}

          {/* CONTACT / MESSAGE OVERLAY */}
          {activeOverlay === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-black z-30 flex flex-col p-6 sm:p-10 md:p-14 overflow-y-auto"
              id="contact-overlay"
            >
              {/* Header bar and Back button */}
              <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-white" />
                  <span className="text-xs uppercase tracking-widest font-mono text-white">{lang === 'it' ? 'Connettiamoci' : "Let's Connect"}</span>
                </div>
                <button
                  id="close-contact-btn"
                  onClick={() => {
                    setActiveOverlay('none');
                    setFormSubmitted(false);
                  }}
                  className="group flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white cursor-pointer active:scale-95 transition-all"
                >
                  <span>{lang === 'it' ? 'Torna alla Home' : 'Back to Hero'}</span>
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Contact Layout Grid */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Left Column: Direct Inquiries & Quick Email Copy */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-2">{lang === 'it' ? 'Richieste Dirette' : 'Direct Inquiries'}</span>
                    <p className="text-lg font-light leading-relaxed text-white/80">
                      {lang === 'it'
                        ? "Interessato a iniziare un nuovo progetto, commissionare un layout o fare due chiacchiere? Premi qui sotto per aprire l'indirizzo diretto."
                        : "Interested in starting a new project, commissioning a layout, or having a chat? Press below to copy the direct address."}
                    </p>
                  </div>

                  {/* Micro-Interactive Email Copy Box */}
                  <a
                    id="copy-email-box-btn"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=diegocavallaro8@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between p-4 border border-white/10 rounded-md bg-neutral-950/60 hover:bg-neutral-900/60 hover:border-white/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                      <div className="p-2 bg-white/5 rounded shrink-0">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-white/30 block">{lang === 'it' ? 'INVIA EMAIL' : 'SEND EMAIL'}</span>
                        <span className="text-sm font-medium text-white font-mono break-all">diegocavallaro8@gmail.com</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-white/40 font-mono shrink-0">
                      <span className="flex items-center gap-1 hover:text-white transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        {lang === 'it' ? 'Scrivi' : 'Compose'}
                      </span>
                    </div>
                  </a>

                  <div className="border-t border-white/5 pt-6 mt-2">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 block mb-2">{lang === 'it' ? 'Orari di Servizio' : 'Service Hours'}</span>
                    <p className="text-xs font-light text-white/60 leading-relaxed font-mono">
                      {lang === 'it'
                        ? "Disponibile Lun—Ven (09:00—18:00 BST). Le risposte arrivano solitamente entro 24 ore lavorative standard."
                        : "Available Mon—Fri (09:00—18:00 BST). Responses typically land within 24 standard business hours."}
                    </p>
                  </div>
                </div>

                {/* Right Column: Simulated Contact Form */}
                <div className="lg:col-span-7 w-full border border-white/10 p-6 sm:p-8 rounded-md bg-neutral-950/40 relative">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form
                        key="contact-form"
                        onSubmit={handleSubmitForm}
                        className="flex flex-col gap-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        id="simulated-contact-form"
                      >
                        <h4 className="text-xs font-mono uppercase tracking-widest text-white border-b border-white/10 pb-3">
                          {lang === 'it' ? 'Invia Trasmissione Sicura' : 'Transmit Secured Transmission'}
                        </h4>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase text-white/40">{lang === 'it' ? 'Il Tuo Nome' : 'Your Name'}</label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder=""
                            className="w-full bg-black border border-white/10 focus:border-white text-sm p-2.5 rounded text-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase text-white/40">{lang === 'it' ? 'Il Tuo Indirizzo Email' : 'Your Email Address'}</label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder=""
                            className="w-full bg-black border border-white/10 focus:border-white text-sm p-2.5 rounded text-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono uppercase text-white/40">{lang === 'it' ? 'Contenuto del Messaggio' : 'Secure Message Payload'}</label>
                          <textarea
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            placeholder=""
                            className="w-full bg-black border border-white/10 focus:border-white text-sm p-2.5 rounded text-white focus:outline-none transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 transition-all font-bold tracking-widest text-xs uppercase rounded flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              <span>{lang === 'it' ? 'Invio Trasmissione...' : 'Sending Transmission...'}</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>{lang === 'it' ? 'Invia Trasmissione' : 'Send Transmission'}</span>
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="form-success"
                        className="text-center py-10 flex flex-col items-center gap-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white bg-white/5 mb-2">
                          <Check className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold tracking-tight text-white uppercase font-mono">{lang === 'it' ? 'Trasmissione Inviata' : 'Transmission Dispatched'}</h4>
                        <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                          {lang === 'it'
                            ? "Il tuo messaggio è stato salvato. Lo abbiamo memorizzato nel nostro ambiente locale. Ci sentiamo presto!"
                            : "Your message proposal has been saved. We've stored it inside the sandbox local environment. Talk to you soon!"}
                        </p>

                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="mt-4 px-5 py-2.5 bg-white/10 border border-white/10 hover:bg-white hover:text-black transition-colors rounded text-xs uppercase font-mono tracking-widest cursor-pointer"
                        >
                          {lang === 'it' ? 'Invia un altro messaggio' : 'Send Another Note'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Aesthetic lower footnote */}
              <div className="mt-8 border-t border-white/5 pt-4 text-[10px] font-mono text-white/20 flex flex-col sm:flex-row justify-between gap-2">
                <span>{lang === 'it' ? 'Sistema di trasmissione contatti sandbox end-to-end' : 'End-to-end sandbox contact transmission state system'}</span>
                <span>{lang === 'it' ? 'Protocollo di Copia Sicura SSL' : 'Secure Copy Protocol SSL'}</span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </SmoothScroll>
  );
}
