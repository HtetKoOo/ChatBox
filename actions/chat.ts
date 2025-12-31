"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function getUsers() {
  const session = await auth()
  if (!session?.user?.email) return []

  const users = await prisma.user.findMany({
    where: {
      email: {
        not: session.user.email, // Exclude current user
      },
    },
  })

  return users
}

export async function createOrGetChat(otherUserId: string) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  })
  
  if (!currentUser) throw new Error("User not found")

  // Check if a chat room already exists between these two users
  const existingChat = await prisma.chatRoom.findFirst({
    where: {
      AND: [
        { participants: { some: { id: currentUser.id } } },
        { participants: { some: { id: otherUserId } } },
      ],
    },
  })

  if (existingChat) {
    return existingChat.id
  }

  // Create new chat room
  const newChat = await prisma.chatRoom.create({
    data: {
      participants: {
        connect: [{ id: currentUser.id }, { id: otherUserId }],
      },
    },
  })

  return newChat.id
}

export async function getChatRoom(chatId: string) {
  const session = await auth()
  if (!session?.user?.email) return null

  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id: chatId },
    include: { participants: true }
  })

  if (!chatRoom) return null

  // Verify user is a participant
  const isParticipant = chatRoom.participants.some(p => p.email === session.user?.email)
  if (!isParticipant) return null

  return chatRoom
}
