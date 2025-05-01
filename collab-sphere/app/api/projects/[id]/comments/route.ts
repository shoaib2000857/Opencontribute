import { NextResponse } from "next/server";

// Mock database for comments
const commentsDB: { [key: number]: { text: string }[] } = {};

// Handle GET requests to fetch comments for a project
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  const comments = commentsDB[projectId] || []; // Ensure it returns an array
  return NextResponse.json(comments);
}

// Handle POST requests to add a comment to a project
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const projectId = parseInt(params.id);
  const body = await req.json();

  if (!body.text) {
    return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
  }

  if (!commentsDB[projectId]) {
    commentsDB[projectId] = [];
  }

  commentsDB[projectId].push({ text: body.text });
  return NextResponse.json(commentsDB[projectId]); // Return the updated comments array
}