import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../types';

interface ProjectFooterProps {
  currentProjectId: string;
  projects: Project[];
  lang: string;
  onNavigateToProject: (project: Project) => void;
  onBackToHome: () => void;
}

const projectCardStyles: Record<string, { asset: string; color: string; glow: string }> = {
  aetheris: {
    asset: 'Images/Project Cards/cards_footer_01.svg',
    color: '#068B35',
    glow: 'rgba(6, 139, 53, 0.28)',
  },
  kinetics: {
    asset: 'Images/Project Cards/cards_footer_02.svg',
    color: '#FED402',
    glow: 'rgba(254, 212, 2, 0.25)',
  },
  chronos: {
    asset: 'Images/Project Cards/cards_footer_03.svg',
    color: '#B40839',
    glow: 'rgba(180, 8, 57, 0.28)',
  },
};

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function ProjectFooter({
  currentProjectId,
  projects,
  lang,
  onNavigateToProject,
  onBackToHome,
}: ProjectFooterProps) {
  const visibleProjects = projects.filter(({ id }) => id !== currentProjectId);

  return (
    <footer className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 mt-20 border-t border-white/5 pt-16">
      <h3 className="mb-10 text-center text-2xl sm:text-3xl font-bold tracking-tight text-white">
        {lang === 'it' ? 'Esplora altri progetti' : 'Explore other projects'}
      </h3>

      <nav
        aria-label={lang === 'it' ? 'Altri progetti' : 'Other projects'}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        {visibleProjects.map((project) => {
          const cardStyle = projectCardStyles[project.id];
          if (!cardStyle) return null;

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onNavigateToProject(project)}
              aria-label={`${lang === 'it' ? 'Apri il progetto' : 'Open project'} ${project.title}`}
              className="project-footer-card group relative aspect-[562/190] w-full overflow-hidden rounded-[1.5rem] border bg-[#070707] cursor-pointer focus-visible:outline-none"
              style={{
                '--project-card-color': cardStyle.color,
                '--project-card-glow': cardStyle.glow,
              } as React.CSSProperties}
            >
              <img
                src={assetUrl(cardStyle.asset)}
                alt=""
                aria-hidden="true"
                className="project-footer-card__art absolute inset-0 h-full w-full object-cover"
              />
            </button>
          );
        })}
      </nav>

      <div className="mt-16 text-center">
        <button
          type="button"
          onClick={onBackToHome}
          className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full inline-flex items-center gap-2 hover:scale-105 active:scale-95 hover:bg-neutral-100 transition-all cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'it' ? 'Torna alla Home' : 'Back to Home'}</span>
        </button>
      </div>
    </footer>
  );
}
