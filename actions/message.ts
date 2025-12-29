"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function getChatMessages(chatId: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Not authenticated")

  // Verify the user is a participant of this chat
  const chat = await prisma.chatRoom.findUnique({
    where: { id: chatId },
    include: { participants: true },
  })

  // Check if user is in participants list
  const isParticipant = chat?.participants.some(p => p.email === session.user?.email)
  if (!isParticipant) throw new Error("Unauthorized")

  const messages = await prisma.message.findMany({
    where: { chatRoomId: chatId },
    orderBy: { createdAt: "asc" },
    include: { user: true },
  })

  return messages
}
