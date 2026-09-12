"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/lib/projects";
import { Pencil, Trash2, Save, X, ExternalLink } from "lucide-react";

const INITIAL_FORM = {
  title: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  technologies: "",
  completionDate: "",
};

export default function AdminProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch {
      setMessage({ type: "error", text: "Failed to load projects" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("admin_auth");
    if (stored === "true") {
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (password === "Muhammedbinkhaled*77&*") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      fetchProjects();
    } else {
      setPasswordError("Invalid password");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      liveUrl: project.liveUrl || "",
      technologies: project.technologies.join(", "),
      completionDate: project.completionDate,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancel() {
    setEditingId(null);
    setForm(INITIAL_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          ...form,
          technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: editingId ? "Project updated" : "Project added" });
        setEditingId(null);
        setForm(INITIAL_FORM);
        fetchProjects();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save project" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save project" });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Project deleted" });
        fetchProjects();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to delete project" });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to delete project" });
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
    setProjects([]);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">Admin Access</h1>
            <p className="text-sm text-gray-500">Enter password to manage projects</p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-primary text-sm font-mono focus:outline-none focus:border-primary transition-colors"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary text-white text-sm font-mono uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary">Manage Projects</h1>
            <p className="text-sm text-gray-500 mt-1">{projects.length} project(s) total</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-primary transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 px-4 py-3 text-sm font-mono ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <div className="bg-white border border-gray-100 p-6 md:p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-bold text-primary">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
            {editingId && (
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-primary transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-gray-200 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Completion Date */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Completion Date *
                </label>
                <input
                  type="date"
                  name="completionDate"
                  value={form.completionDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-gray-200 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-background border border-gray-200 text-primary text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image URL */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-gray-200 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Live URL */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-2">
                  Live URL (optional)
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={form.liveUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-gray-200 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-2">
                Technologies (comma-separated) *
              </label>
              <input
                type="text"
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React, Next.js, TypeScript, Tailwind"
                className="w-full px-4 py-3 bg-background border border-gray-200 text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-mono uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {submitting ? "Saving..." : editingId ? "Update Project" : "Add Project"}
            </button>
          </form>
        </div>

        {/* Projects List */}
        <div className="bg-white border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-heading font-bold text-primary">Existing Projects</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm font-mono">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm font-mono">No projects yet</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {projects.map((project) => (
                <div key={project.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-heading font-bold text-primary truncate">
                        {project.title}
                      </h3>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                        {new Date(project.completionDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[10px] font-mono text-gray-300">
                        {project.technologies.slice(0, 3).join(", ")}
                        {project.technologies.length > 3 && ` +${project.technologies.length - 3}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
