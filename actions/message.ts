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
  const isParticipant = chat?.participants.some((p: { email: string | null }) => p.email === session.user?.email)
  if (!isParticipant) throw new Error("Unauthorized")

  const messages = await prisma.message.findMany({
    where: { chatRoomId: chatId },
    orderBy: { createdAt: "asc" },
    include: { user: true },
  })

  return messages
}

import { pusherServer } from "@/lib/pusher"

export async function deleteMessage(messageId: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Not authenticated")

    const message = await prisma.message.findUnique({
        where: { id: messageId },
        select: { userId: true, chatRoomId: true }
    })

    if (!message) throw new Error("Message not found")

    // Ensure the user is the author of the message
    if (message.userId !== session.user.id) {
        throw new Error("Unauthorized to delete this message")
    }

    await prisma.message.delete({
        where: { id: messageId }
    })

    // Trigger Pusher event
    await pusherServer.trigger(
        `chat-room-${message.chatRoomId}`,
        "message-deleted",
        messageId
    )
}
