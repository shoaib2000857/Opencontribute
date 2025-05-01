"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skillArray = skills.split(",").map((skill) => skill.trim());

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        skills: skillArray,
      }),
    });

    if (res.ok) {
      router.push("/projects");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center mb-8">Add a New Project</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded p-2"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="border border-gray-300 rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-foreground text-background rounded p-2 hover:bg-gray-700"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
}