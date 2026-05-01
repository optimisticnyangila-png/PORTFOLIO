import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Coffee, Download, Menu, Moon, Sun, X } from "lucide-react";
import SEO from "../components/SEO";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";
import { useThemeContext } from "../hooks/useThemeContext";
import apiService from "../services/apiService";

const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "timeline", label: "Timeline", path: "/timeline" },
  { id: "skills", label: "Skills", path: "/skills" },
  { id: "contact", label: "Contact", path: "/contact" },
];
const kofiUrl =
  "https://ko-fi.com/kevinenyangila?utm_medium=email&utm_source=onboarding&utm_campaign=SharePage";

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
      {title && <h2 className="mb-6 text-2xl font-bold md:text-3xl">{title}</h2>}
      {children}
    </section>
  );
}

export default function PortfolioPage() {
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const data = await apiService.fetchPortfolioData();
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-500" />
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <p className="mb-4 text-red-400">Failed to load portfolio data</p>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return null;
  }

  const bgClass =
    theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900";
  const cardClass = "glass-card";
  const activePage = navItems.find((item) => item.path === location.pathname)?.id || "home";

  const navLinkClass = (path) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      location.pathname === path ? "bg-cyan-500/15 text-cyan-300" : "hover:text-cyan-400"
    }`;

  const renderHome = () => (
    <Section id="home">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 text-center"
      >
        <img
          src={portfolioData.profileImage || "/images/default.png"}
          alt={`${portfolioData.name} profile`}
          onError={(event) => {
            event.currentTarget.src = "/images/default.png";
          }}
          className="mx-auto mb-5 h-32 w-32 rounded-full border-4 border-cyan-400/40 object-cover shadow-lg"
        />
        <p className="mb-2 text-cyan-400">{portfolioData.title}</p>
        <h1 className="text-center text-4xl font-extrabold md:text-6xl">{portfolioData.name}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-400">
          {portfolioData.tagline}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/projects" className="btn">
            View Projects
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact Me
          </Link>
          <a href={portfolioData.cv || "#"} target="_blank" rel="noreferrer" className="btn">
            <Download className="mr-2 inline" size={16} />
            Download CV
          </a>
          <a href={kofiUrl} target="_blank" rel="noreferrer" className="btn-outline">
            <Coffee className="mr-2 inline" size={16} />
            Support on Ko-fi
          </a>
        </div>
      </motion.div>
    </Section>
  );

  const renderPage = () => {
    if (activePage === "about") {
      return (
        <Section id="about" title="About Me">
          <div className={`${cardClass} rounded-2xl p-6`}>
            <p className="text-slate-300">{portfolioData.bio}</p>
          </div>
        </Section>
      );
    }

    if (activePage === "projects") {
      return (
        <Section id="projects" title="Projects">
          <Projects data={portfolioData} />
        </Section>
      );
    }

    if (activePage === "timeline") {
      return (
        <Section id="timeline" title="Experience and Timeline">
          <div className="space-y-4 border-l border-cyan-500/40 pl-5">
            {(portfolioData.experience || []).map((item) => (
              <article key={item.title} className={`${cardClass} rounded-2xl p-4`}>
                <p className="text-sm text-cyan-400">{item.period}</p>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-slate-400">{item.details}</p>
              </article>
            ))}
          </div>
        </Section>
      );
    }

    if (activePage === "skills") {
      return (
        <Section id="skills" title="Skills">
          <div className="grid gap-3 md:grid-cols-2">
            {(portfolioData.skills || []).map((skill) => (
              <div key={skill.name} className={`${cardClass} rounded-xl p-4`}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-cyan-400">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div className="h-full rounded-full bg-cyan-500" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      );
    }

    if (activePage === "contact") {
      return (
        <Section id="contact" title="Contact">
          <div className="grid gap-8 md:grid-cols-2">
            <div className={`${cardClass} rounded-2xl p-6`}>
              <h3 className="mb-4 text-xl font-semibold">Get In Touch</h3>
              <p className="mb-6 text-slate-400">
                I&apos;m always open to discussing new opportunities and interesting projects.
              </p>
              <SocialLinks social={portfolioData.social} />
            </div>
            <ContactForm data={portfolioData} />
          </div>
        </Section>
      );
    }

    return renderHome();
  };

  return (
    <div className={`${bgClass} min-h-screen`}>
      <SEO />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.2),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_35%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="font-semibold">
            {portfolioData.name}
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={navLinkClass(item.path)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="rounded-lg border border-white/20 p-2"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
              className="rounded-lg border border-white/20 p-2 md:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950/95 px-4 py-3 shadow-lg md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={navLinkClass(item.path)}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {renderPage()}
    </div>
  );
}
