// src/components/ProjectModal.jsx
export default function ProjectModal({ project, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.7)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          margin: "5% auto",
          padding: "20px",
          width: "80%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "8px",
        }}
        onClick={(e) => e.stopPropagation()}
        className="dark:bg-slate-800 dark:text-white"
      >
        <button
          onClick={onClose}
          className="float-right mb-4 px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded"
        >
          Close
        </button>

        <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
        <img
          src={project.image || "/images/default.png"}
          width="100%"
          alt={project.name}
          className="w-full h-64 object-cover rounded mb-4"
        />

        <p className="mb-4">{project.fullDescription}</p>

        <p className="mb-4">
          <strong>Tech:</strong> {project.tech.join(", ")}
        </p>

        <div className="flex gap-4 flex-wrap">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ?? Live
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              ?? GitHub
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              ?? Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
