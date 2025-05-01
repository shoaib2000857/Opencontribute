import { notFound } from "next/navigation";
import CommentsSection from "./CommentsSection";

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const projects = await res.json();
  const project = projects.find((p: any) => p.id === parseInt(params.id));

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{project.description}</p>
      <h2 className="text-2xl font-semibold mb-4">Skills Required</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.skills.map((skill: string, index: number) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Comments Section */}
      <CommentsSection projectId={project.id} />
    </div>
  );
}