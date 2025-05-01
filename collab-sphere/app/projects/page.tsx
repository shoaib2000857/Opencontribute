"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <Link href="/projects/new">
          <button className="bg-foreground text-background rounded px-4 py-2 hover:bg-gray-700">
            Add New Project
          </button>
        </Link>
      </div>
      <p className="text-lg text-center text-gray-600 mb-12">
        Explore beginner-friendly open-source projects and start contributing today!
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <div className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}