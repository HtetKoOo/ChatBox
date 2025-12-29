import ChatLayout from "@/components/chat/chat-layout"
import ChatInput from "@/components/chat/chat-input"
import MessageList from "@/components/chat/message-list"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

// Force dynamic rendering to always get fresh messages on initial load
export const dynamic = "force-dynamic"

import { getUsers } from "@/actions/chat"

// ... imports

export default async function Home() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const users = await getUsers() // Fetch users

  // Fetch initial messages
  const messages = await prisma.message.findMany({
    take: 50,
    orderBy: {
      createdAt: "asc",
    },
    include: {
      user: true,
    },
  })

  return (
    <ChatLayout users={users}>
      <div className="flex flex-1 flex-col overflow-hidden">
        <MessageList initialMessages={messages} />
        <ChatInput />
      </div>
    </ChatLayout>
  )
}
