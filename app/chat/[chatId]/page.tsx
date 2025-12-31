
import ChatLayout from "@/components/chat/chat-layout"
import { ChatRoom } from "@/components/chat/chat-room"
import { getChatMessages } from "@/actions/message"
import { getUsers, getChatRoom } from "@/actions/chat"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
    const session = await auth()
    if (!session?.user) redirect("/login")

    const { chatId } = await params

    // Parallel data fetching

    const [messages, users, chatRoom] = await Promise.all([
        getChatMessages(chatId),
        getUsers(),
        getChatRoom(chatId)
    ])

    if (!chatRoom) redirect("/")

    const otherParticipant = chatRoom.participants.find((p) => p.email !== session.user?.email)
    const chatName = chatRoom.name || otherParticipant?.name || "Chat"

    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email! },
        select: { id: true }
    })

    if (!currentUser) redirect("/login")

    return (
        <ChatLayout users={users}>
            <ChatRoom
                initialMessages={messages}
                chatId={chatId}
                currentUserId={currentUser.id}
                chatName={chatName}
            />
        </ChatLayout>
    )
}
