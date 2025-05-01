import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getUserProjects } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Edit, Plus, Trash } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const projects = await getUserProjects(session.user.id)

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and collaborations</p>
        </div>
        <Link href="/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="my-projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="interested">Projects I'm Interested In</TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects" className="space-y-4">
          {projects.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Projects Yet</CardTitle>
                <CardDescription>
                  You haven't created any projects yet. Create your first project to get started.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/projects/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <Card key={project._id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description.substring(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.interestedUsers?.length || 0} people interested
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/projects/${project._id}`}>
                      <Button variant="outline" size="sm">
                        View
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <div className="flex gap-2">
                      <Link href={`/projects/${project._id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/projects/${project._id}/delete`}>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="interested" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                This feature is under development. Soon you'll be able to see all the projects you've expressed interest
                in.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/projects">
                <Button>Browse Projects</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
