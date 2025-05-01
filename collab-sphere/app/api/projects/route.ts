import { NextResponse } from "next/server";

// Mock database (in-memory storage)
let projects = [
  {
    id: 1,
    title: "Open Source Contribution Tracker",
    description: "A tool to help students track their open-source contributions.",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Beginner-Friendly Blog Platform",
    description: "A blogging platform designed for new developers to share their journey.",
    skills: ["Next.js", "Tailwind CSS", "Firebase"],
  },
];

// Handle GET requests to fetch all projects
export async function GET() {
  return NextResponse.json(projects, { status: 200 });
}

// Handle POST requests to add a new project
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || !body.description || !body.skills) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newProject = {
    id: projects.length + 1,
    title: body.title,
    description: body.description,
    skills: body.skills,
  };

  projects.push(newProject);

  return NextResponse.json({ message: "Project added successfully", project: newProject }, { status: 201 });
}