"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Heart } from "lucide-react"

interface InterestButtonProps {
  projectId: string
  initialInterested: string[]
}

export default function InterestButton({ projectId, initialInterested }: InterestButtonProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [interested, setInterested] = useState(session?.user?.id ? initialInterested.includes(session.user.id) : false)
  const [interestCount, setInterestCount] = useState(initialInterested.length)

  const handleToggleInterest = async () => {
    if (status !== "authenticated") {
      router.push("/auth/signin")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/projects/${projectId}/interest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update interest")
      }

      const data = await response.json()
      setInterested(data.isInterested)
      setInterestCount(data.isInterested ? interestCount + 1 : interestCount - 1)

      toast({
        title: data.isInterested ? "Interest Added" : "Interest Removed",
        description: data.isInterested
          ? "You've expressed interest in this project"
          : "You've removed your interest from this project",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update interest. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={interested ? "default" : "outline"}
      size="sm"
      onClick={handleToggleInterest}
      disabled={isLoading}
      className={interested ? "bg-rose-500 hover:bg-rose-600" : ""}
    >
      <Heart className={`mr-1 h-4 w-4 ${interested ? "fill-current" : ""}`} />
      {interested ? "Interested" : "I'm Interested"} ({interestCount})
    </Button>
  )
}
