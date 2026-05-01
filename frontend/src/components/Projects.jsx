import { useState } from "react";
import { Code, ExternalLink } from "lucide-react";
import ProjectModal from "./ProjectModal";

export default function Projects({ data }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const projects = data?.projects || [];
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const filteredProjects =
    filter === "All" ? projects : projects.filter((project) => project.category === filter);
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Featured Projects</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id || project.name} project={project} onSelect={setSelected} />
        ))}
      </div>

      <h2 className="mb-6 text-2xl font-bold">All Projects</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`rounded px-4 py-2 ${
              filter === category
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id || project.name} project={project} onSelect={setSelected} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ProjectCard({ project, onSelect }) {
  const links = project.links || {};

  return (
    <article
      className="project-card mx-auto flex h-full w-full max-w-sm cursor-pointer flex-col rounded-lg bg-white p-3 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
      onClick={() => onSelect(project)}
    >
      <img
        src={project.image || "/images/default.png"}
        alt={project.name}
        className="mb-3 h-32 w-full rounded-md object-cover"
      />
      <h3 className="text-lg font-semibold leading-tight text-slate-950 dark:text-white">
        {project.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {project.description}
      </p>

      {project.tech?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto grid gap-2 pt-4 sm:grid-cols-2">
        {links.github && (
          <div>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:text-blue-300 dark:hover:text-white"
            >
              <Code size={15} />
              GitHub
            </a>
          </div>
        )}
        {links.live && (
          <div>
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white dark:text-emerald-300 dark:hover:text-white"
            >
              <ExternalLink size={15} />
              Live
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
