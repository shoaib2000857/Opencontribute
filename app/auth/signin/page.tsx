"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function SignIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    await signIn("github", { callbackUrl: "/" })
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Sign in to COLLAB-SPHERE to start collaborating on projects</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" onClick={handleSignIn} disabled={isLoading} className="w-full">
            <Github className="mr-2 h-4 w-4" />
            {isLoading ? "Signing in..." : "Sign in with GitHub"}
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
