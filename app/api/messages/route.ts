import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { pusherServer } from "@/lib/pusher"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { text, chatId } = await req.json()

    if (!text || !chatId) {
      return new NextResponse("Missing text or chatId", { status: 400 })
    }

    // Get current user
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) return new NextResponse("User not found", { status: 404 })

    // Create message linked to the specific chat room
    const message = await prisma.message.create({
      data: {
        text,
        userId: user.id,
        chatRoomId: chatId,
      },
      include: {
        user: true,
      },
    })

    // Trigger Pusher event for this specific chat room
    await pusherServer.trigger(`chat-room-${chatId}`, "upcoming-message", message)

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error creating message:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
