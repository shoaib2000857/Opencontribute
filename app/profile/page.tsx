import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
              <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{session.user.name}</h2>
            <p className="text-muted-foreground">{session.user.email}</p>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Github className="mr-1 h-4 w-4" />
              GitHub Connected
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Edit Profile (Coming Soon)
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your activity on COLLAB-SPHERE</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-muted-foreground">Projects Created</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-muted-foreground">Projects Joined</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold">0</h3>
                <p className="text-muted-foreground">Comments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Skills & Interests</CardTitle>
            <CardDescription>Add your skills to help match you with relevant projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-6 text-muted-foreground">
              This feature is coming soon. You'll be able to add your skills and interests to help match you with
              relevant projects.
            </p>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">
              Add Skills (Coming Soon)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
