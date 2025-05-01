import { getProject, getComments } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Github, Users } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import InterestButton from "@/components/interest-button"
import CommentSection from "@/components/comment-section"

export const dynamic = "force-dynamic"

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)
  const comments = await getComments(params.id)

  if (!project) {
    notFound()
  }

  const formattedDate = project.createdAt
    ? formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })
    : "recently"

  return (
    <div className="container py-10">
      <Link href="/projects" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Calendar className="mr-1 h-4 w-4" />
                    Posted {formattedDate}
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <InterestButton projectId={params.id} initialInterested={project.interestedUsers || []} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="space-y-4">
                <p className="whitespace-pre-line">{project.description}</p>
                {project.repoUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Repository
                    </a>
                  </Button>
                )}
              </div>
              <Separator className="my-6" />
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={project.userImage || "/placeholder.svg"} alt={project.userName} />
                  <AvatarFallback>{project.userName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{project.userName}</p>
                  <p className="text-sm text-muted-foreground">Project Creator</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
              <CardDescription>
                Ask questions and discuss the project with the creator and other collaborators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommentSection projectId={params.id} comments={comments} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Interested Collaborators</CardTitle>
              <CardDescription>
                {project.interestedUsers?.length || 0} people interested in this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.interestedUsers?.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex -space-x-2">
                    {/* This would need to be populated with actual user data */}
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    {project.interestedUsers.length > 2 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted border-2 border-background text-xs">
                        +{project.interestedUsers.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No collaborators yet. Be the first to express interest!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How to Collaborate</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Click the "I'm Interested" button to express interest</li>
                <li>Ask questions in the discussion section</li>
                <li>Share your skills and how you can contribute</li>
                <li>The project creator will reach out to coordinate</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
