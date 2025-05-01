"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"
import { Loader2 } from "lucide-react"

interface Comment {
  _id: string
  content: string
  userId: string
  userName: string
  userImage: string
  createdAt: string
}

interface CommentSectionProps {
  projectId: string
  comments: Comment[]
}

export default function CommentSection({ projectId, comments: initialComments }: CommentSectionProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/projects/${projectId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          userId: session.user.id,
          userName: session.user.name,
          userImage: session.user.image,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to post comment")
      }

      const data = await response.json()

      // Add the new comment to the list
      setComments([...comments, data.comment])
      setNewComment("")

      toast({
        title: "Comment Posted",
        description: "Your comment has been posted successfully",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {comments.length > 0 ? (
        <div className="space-y-6 mb-6">
          {comments.map((comment) => (
            <div key={comment._id} className="space-y-2">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.userImage || "/placeholder.svg"} alt={comment.userName} />
                  <AvatarFallback>{comment.userName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{comment.userName}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-1">{comment.content}</p>
                </div>
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 mb-6">
          <p className="text-muted-foreground">No comments yet. Be the first to start the discussion!</p>
        </div>
      )}

      {status === "authenticated" ? (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
              <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Comment"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 border rounded-md">
          <p className="text-muted-foreground mb-2">Sign in to join the discussion</p>
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
        </div>
      )}
    </div>
  )
}
