import { useState } from "react";

const initial = {
  name: "",
  description: "",
  fullDescription: "",
  category: "Web",
  tech: "",
  status: "In Development",
};

export default function AdminPage() {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      tech: form.tech.split(",").map((item) => item.trim()),
    };
    const response = await fetch("http://localhost:5000/api/portfolio/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": "demo-admin-key",
      },
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "Project saved." : "Failed to save project.");
    if (response.ok) setForm(initial);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-white/5 p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="mb-4 mt-2 text-sm text-slate-400">
          Add or edit portfolio projects.
        </p>
        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full rounded-lg border border-white/20 bg-transparent p-3"
            placeholder="Project title"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <textarea
            className="w-full rounded-lg border border-white/20 bg-transparent p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <textarea
            className="w-full rounded-lg border border-white/20 bg-transparent p-3"
            placeholder="Full project description"
            value={form.fullDescription}
            onChange={(e) =>
              setForm({ ...form, fullDescription: e.target.value })
            }
          />
          <input
            className="w-full rounded-lg border border-white/20 bg-transparent p-3"
            placeholder="Tech stack comma separated"
            value={form.tech}
            onChange={(e) => setForm({ ...form, tech: e.target.value })}
          />
          <button className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950">
            Save Project
          </button>
        </form>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>
    </main>
  );
}
