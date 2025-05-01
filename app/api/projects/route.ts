import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { createProject } from "@/lib/db"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const projectData = await request.json()

    // Validate required fields
    if (!projectData.title || !projectData.description || !projectData.skills || projectData.skills.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Ensure the user ID matches the session user
    if (projectData.userId !== session.user.id) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 })
    }

    const result = await createProject(projectData)

    return NextResponse.json({ success: true, projectId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
