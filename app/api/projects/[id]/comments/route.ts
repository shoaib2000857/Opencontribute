import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { addComment } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const commentData = await request.json()

    // Validate required fields
    if (!commentData.content) {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 })
    }

    // Ensure the user ID matches the session user
    if (commentData.userId !== session.user.id) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 })
    }

    const result = await addComment(params.id, commentData)

    return NextResponse.json(
      {
        success: true,
        comment: {
          _id: result.insertedId,
          projectId: params.id,
          content: commentData.content,
          userId: commentData.userId,
          userName: commentData.userName,
          userImage: commentData.userImage,
          createdAt: new Date(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding comment:", error)
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 })
  }
}
