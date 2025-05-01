import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function getProjects() {
  const client = await clientPromise
  const db = client.db()

  const projects = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray()

  return JSON.parse(JSON.stringify(projects))
}

export async function getProject(id: string) {
  const client = await clientPromise
  const db = client.db()

  const project = await db.collection("projects").findOne({ _id: new ObjectId(id) })

  if (!project) return null

  return JSON.parse(JSON.stringify(project))
}

export async function getUserProjects(userId: string) {
  const client = await clientPromise
  const db = client.db()

  const projects = await db.collection("projects").find({ userId }).sort({ createdAt: -1 }).toArray()

  return JSON.parse(JSON.stringify(projects))
}

export async function createProject(projectData: any) {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("projects").insertOne({
    ...projectData,
    createdAt: new Date(),
    updatedAt: new Date(),
    interestedUsers: [],
  })

  return result
}

export async function updateProject(id: string, projectData: any) {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("projects").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...projectData,
        updatedAt: new Date(),
      },
    },
  )

  return result
}

export async function deleteProject(id: string) {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("projects").deleteOne({ _id: new ObjectId(id) })

  return result
}

export async function toggleInterest(projectId: string, userId: string) {
  const client = await clientPromise
  const db = client.db()

  const project = await db.collection("projects").findOne({ _id: new ObjectId(projectId) })

  if (!project) throw new Error("Project not found")

  const interestedUsers = project.interestedUsers || []
  const isInterested = interestedUsers.includes(userId)

  const result = await db.collection("projects").updateOne(
    { _id: new ObjectId(projectId) },
    {
      [isInterested ? "$pull" : "$push"]: {
        interestedUsers: userId,
      },
      $set: {
        updatedAt: new Date(),
      },
    },
  )

  return { isInterested: !isInterested }
}

export async function addComment(projectId: string, comment: any) {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("comments").insertOne({
    ...comment,
    projectId,
    createdAt: new Date(),
  })

  return result
}

export async function getComments(projectId: string) {
  const client = await clientPromise
  const db = client.db()

  const comments = await db.collection("comments").find({ projectId }).sort({ createdAt: 1 }).toArray()

  return JSON.parse(JSON.stringify(comments))
}
