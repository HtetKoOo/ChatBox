import ChatLayout from "@/components/chat/chat-layout"
import ChatInput from "@/components/chat/chat-input"
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


  return (
    <ChatLayout users={users}>
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <h3 className="text-xl font-semibold">Select a conversation</h3>
        <p className="text-muted-foreground">Choose a user from the sidebar to start chatting.</p>
      </div>
    </ChatLayout>
  )
}
