import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Import Variants type from framer-motion.
import { motion, useMotionValue, useSpring, AnimatePresence, Variants } from 'framer-motion';

// --- TYPES ---
interface Socials {
  github: string;
  linkedin: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
}

interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  socials: Socials;
  summary: string;
  skills: string[];
  projects: Project[];
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
}

// --- DATA ---
const portfolioData: PortfolioData = {
  name: "Perika Suvisesh",
  title: "AI & Application Development Enthusiast",
  tagline: "Building intelligent solutions for complex problems.",
  email: "p.suvisesh77@gmail.com",
  socials: {
    github: "https://github.com/Suvisesh",
    linkedin: "https://www.linkedin.com/in/perika-suvisesh-338a06287/"
  },
  summary: "A passionate Computer Science undergraduate specializing in Artificial Intelligence. I am fascinated by how intelligent systems can simplify real-world challenges through automation and smart design. My goal is to build practical, hands-on projects that merge creativity with robust technical skills.",
  skills: ["Python", "Java", "Flutter", "Firebase", "Docker", "Google Cloud (GCP)", "Data Visualization", "AI/ML", "Team Collaboration", "UI/UX Design"],
  projects: [
    {
      title: "Smart Civic Complaint System",
      description: "A mobile app built with Flutter and Firebase for efficient civic issue reporting. Features role-based access for citizens and admins, with a complaint heatmap for quick problem identification and real-time tracking.",
      technologies: ["Flutter", "Firebase", "Dart", "UI/UX Design"],
      repoUrl: "https://github.com/Suvisesh",
    },
    {
      title: "AI Portfolio Website",
      description: "This portfolio, built with React, Tailwind CSS, and Framer Motion. Features a custom cursor, light/dark modes, project filtering, and smooth, professional animations.",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      repoUrl: "https://github.com/Suvisesh",
      liveUrl: "#"
    }
  ],
  experience: [
    {
      role: "Cybersecurity Virtual Intern",
      company: "Palo Alto Networks",
      period: "Jan 2025 – Mar 2025",
      description: "Engaged in a virtual internship focusing on cybersecurity principles and practices within the Palo Alto Networks ecosystem."
    },
    {
      role: "AI Intern",
      company: "EduTantr",
      period: "Aug 2025 – Oct 2025",
      description: "Developed and implemented AI models, contributing to projects that leverage machine learning for innovative solutions."
    }
  ],
};


// --- ICONS ---
const IconGitHub: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const IconLinkedin: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const IconExternalLink: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);
const IconSun: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const IconMoon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

// --- HOOKS & UTILS ---
const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [x, y]);

  return { x, y };
};

// --- ANIMATION VARIANTS ---
// Fix: Explicitly type animation variants with `Variants` to fix TypeScript errors.
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemFadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- COMPONENTS ---
const AnimatedSection: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => (
  <motion.section 
    id={id} 
    className="min-h-[50vh] py-20"
    initial="hidden"
    whileInView="show"
    variants={staggerContainer}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.section>
);

const CustomCursor: React.FC<{ cursorVariant: string }> = ({ cursorVariant }) => {
    const { x, y } = useMousePosition();
    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
    const smoothMouse = {
      x: useSpring(x, smoothOptions),
      y: useSpring(y, smoothOptions),
    };

    const variants: Variants = {
      default: {
        height: 20,
        width: 20,
        backgroundColor: "var(--accent)",
        mixBlendMode: 'difference' as const,
      },
      text: {
        height: 80,
        width: 80,
        backgroundColor: "#fff",
        mixBlendMode: 'difference' as const,
      },
      link: {
        height: 40,
        width: 40,
        backgroundColor: "var(--accent)",
        mixBlendMode: 'normal' as const,
        opacity: 0.2
      }
    };

    return (
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full z-[9999] pointer-events-none"
        style={{ translateX: smoothMouse.x, translateY: smoothMouse.y }}
        variants={variants}
        animate={cursorVariant}
      />
    );
};

// --- MAIN APP ---
const App: React.FC = () => {
    const [cursorVariant, setCursorVariant] = useState('default');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const allTechs = useMemo(() => ['All', ...new Set(portfolioData.projects.flatMap(p => p.technologies))], []);
    const filteredProjects = useMemo(() => 
        activeFilter === 'All' 
            ? portfolioData.projects 
            : portfolioData.projects.filter(p => p.technologies.includes(activeFilter)),
        [activeFilter]
    );

    const textEnter = () => setCursorVariant('text');
    const textLeave = () => setCursorVariant('default');
    const linkEnter = () => setCursorVariant('link');

    const handleScrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <>
        <CustomCursor cursorVariant={cursorVariant} />
        
        <div className="fixed top-4 right-4 z-50">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-var(--card-bg) text-var(--text-tertiary) hover:text-var(--accent) transition-colors" onMouseEnter={linkEnter} onMouseLeave={textLeave}>
                {theme === 'dark' ? <IconSun className="w-6 h-6"/> : <IconMoon className="w-6 h-6"/>}
            </button>
        </div>

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24">
          <div className="lg:flex lg:justify-between lg:gap-16">
            
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <div>
                <motion.h1 
                  className="text-4xl font-bold tracking-tight text-[--text-primary] sm:text-5xl" 
                  initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                  onMouseEnter={textEnter} onMouseLeave={textLeave}
                >
                  {portfolioData.name}
                </motion.h1>
                <motion.h2 
                  className="mt-3 text-lg font-medium tracking-tight text-[--text-primary] sm:text-xl"
                  initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                  onMouseEnter={textEnter} onMouseLeave={textLeave}
                >
                  {portfolioData.title}
                </motion.h2>
                <motion.p 
                  className="mt-4 max-w-xs leading-normal text-[--text-tertiary]"
                  initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                  onMouseEnter={textEnter} onMouseLeave={textLeave}
                >
                  {portfolioData.tagline}
                </motion.p>
                
                <nav className="hidden lg:block mt-16">
                  <ul className="w-max">
                    {['about', 'experience', 'projects', 'contact'].map((item, i) => (
                      <motion.li key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}>
                        <a onClick={() => handleScrollTo(item)} className="group flex items-center py-3 cursor-pointer" onMouseEnter={linkEnter} onMouseLeave={textLeave}>
                          <span className="nav-indicator mr-4 h-px w-8 bg-[--text-tertiary] transition-all group-hover:w-16 group-hover:bg-[--nav-hover]"></span>
                          <span className="nav-text text-xs font-bold uppercase tracking-widest text-[--text-tertiary] group-hover:text-[--nav-hover]">{item}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>
              <motion.div className="mt-8 flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
                <a href={portfolioData.socials.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" onMouseEnter={linkEnter} onMouseLeave={textLeave} className="text-[--text-tertiary] hover:text-[--accent] transition-colors"><IconGitHub className="h-6 w-6" /></a>
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" onMouseEnter={linkEnter} onMouseLeave={textLeave} className="text-[--text-tertiary] hover:text-[--accent] transition-colors"><IconLinkedin className="h-6 w-6" /></a>
              </motion.div>
            </header>
            
            <main className="pt-24 lg:w-1/2 lg:py-24">
              <AnimatedSection id="about">
                <motion.h2 variants={itemFadeInUp} className="text-sm font-bold uppercase tracking-widest text-[--text-primary] mb-8 lg:sr-only">About</motion.h2>
                <motion.p variants={itemFadeInUp} className="mb-8" onMouseEnter={textEnter} onMouseLeave={textLeave}>{portfolioData.summary}</motion.p>
                <motion.div variants={itemFadeInUp} className="flex flex-wrap gap-2">
                    {portfolioData.skills.map(skill => (
                        <div key={skill} onMouseEnter={linkEnter} onMouseLeave={textLeave} className="flex items-center rounded-full bg-[--accent-dark] px-3 py-1 text-xs font-medium text-[--accent]">
                            {skill}
                        </div>
                    ))}
                </motion.div>
              </AnimatedSection>
              
              <AnimatedSection id="experience">
                <motion.h2 variants={itemFadeInUp} className="text-sm font-bold uppercase tracking-widest text-[--text-primary] mb-12 lg:sr-only">Experience</motion.h2>
                <motion.div variants={staggerContainer} initial="hidden" animate="show">
                  {portfolioData.experience.map((exp, i) => (
                    <motion.div variants={itemFadeInUp} key={i} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 mb-12"
                      onMouseEnter={linkEnter} onMouseLeave={textLeave}
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[--card-bg]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[--text-tertiary] sm:col-span-2">{exp.period}</header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-[--text-primary]">
                            <span className="inline-block font-semibold text-[--text-primary] group-hover:text-[--accent] transition-colors">{exp.role} · {exp.company}</span>
                        </h3>
                        <p className="mt-2 text-sm leading-normal text-[--text-secondary]">{exp.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>

              <AnimatedSection id="projects">
                <motion.h2 variants={itemFadeInUp} className="text-sm font-bold uppercase tracking-widest text-[--text-primary] mb-8 lg:sr-only">Projects</motion.h2>
                <motion.div variants={itemFadeInUp} className="flex flex-wrap gap-2 mb-8">
                  {allTechs.map(tech => (
                    <button 
                      key={tech} 
                      onClick={() => setActiveFilter(tech)} 
                      className={`flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${activeFilter === tech ? 'bg-[--accent] text-[--background]' : 'bg-[--accent-dark] text-[--accent] hover:bg-[--accent]/20'}`}
                      onMouseEnter={linkEnter} onMouseLeave={textLeave}
                    >
                      {tech}
                    </button>
                  ))}
                </motion.div>
                <motion.div layout className="space-y-12">
                  <AnimatePresence>
                    {filteredProjects.map((project) => (
                      <motion.div 
                        key={project.title}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px -5px var(--shadow)" }}
                        className="group relative grid gap-4 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 p-4 rounded-md lg:-ml-4"
                        onMouseEnter={linkEnter} onMouseLeave={textLeave}
                      >
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-[--card-bg]/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                        <div className="z-10 sm:col-span-8">
                          <h3 className="font-semibold leading-snug text-[--text-primary] group-hover:text-[--accent] transition-colors">
                              {project.title}
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-[--text-secondary]">{project.description}</p>
                           <div className="mt-3 flex items-center gap-4 text-sm text-[--text-tertiary]">
                            {project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noreferrer noopener" className="flex items-center gap-1 hover:text-[--accent] transition-colors" aria-label="GitHub repository">
                                    <IconGitHub className="h-4 w-4" /> Code
                                </a>
                            )}
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="flex items-center gap-1 hover:text-[--accent] transition-colors" aria-label="Live demo">
                                    <IconExternalLink className="h-4 w-4" /> Live Demo
                                </a>
                            )}
                           </div>
                          <ul className="mt-3 flex flex-wrap">
                            {project.technologies.map((tech) => (
                              <li key={tech} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-[--accent-dark] px-3 py-1 text-xs font-medium leading-5 text-[--accent]">{tech}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </AnimatedSection>
              
              <AnimatedSection id="contact">
                 <motion.h2 variants={itemFadeInUp} className="text-sm font-bold uppercase tracking-widest text-[--text-primary] mb-8 lg:sr-only">Contact</motion.h2>
                 <motion.div variants={itemFadeInUp} onMouseEnter={textEnter} onMouseLeave={textLeave}>
                  <h3 className="text-3xl font-bold text-[--text-primary] mb-2">Get In Touch</h3>
                  <p className="max-w-lg text-[--text-secondary]">
                    I'm currently seeking new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll do my best to get back to you!
                  </p>
                  <a href={`mailto:${portfolioData.email}`} className="inline-block mt-8 bg-[--accent] text-white font-semibold py-3 px-6 rounded-md hover:opacity-90 transition-opacity" onMouseEnter={linkEnter} onMouseLeave={textLeave}>
                    Say Hello
                  </a>
                </motion.div>
              </AnimatedSection>
              
              <footer className="py-12 text-center text-xs text-[--text-tertiary]" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                  <p>Designed & Built by Perika Suvisesh. Inspired by modern web design trends.</p>
              </footer>

            </main>
          </div>
        </div>
      </>
    );
};


// --- RENDER APP ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// --- CLEANUP ---
// Remove deleted files from the virtual file system
const unusedFiles = [
  './App.tsx',
  './types.ts',
  './constants.ts',
  './components/Section.tsx',
  './components/Icons.tsx',
  './components/Header.tsx',
  './components/About.tsx',
  './components/Skills.tsx',
  './components/Projects.tsx',
  './components/Experience.tsx',
  './components/Education.tsx',
  './components/Certifications.tsx',
  './components/Footer.tsx'
];
// This is a conceptual cleanup. In a real environment, you'd delete the files.
// For this simulation, we'll just acknowledge they are no longer part of the app.