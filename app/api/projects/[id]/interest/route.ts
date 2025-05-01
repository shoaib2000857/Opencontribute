import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { toggleInterest } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { userId } = await request.json()

    // Ensure the user ID matches the session user
    if (userId !== session.user.id) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 })
    }

    const result = await toggleInterest(params.id, userId)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error toggling interest:", error)
    return NextResponse.json({ error: "Failed to update interest" }, { status: 500 })
  }
}
