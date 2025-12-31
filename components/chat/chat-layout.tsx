import React from 'react'
import { UserButton } from "@/components/auth/user-button"
import { ChatSidebar } from "./chat-sidebar"

export default function ChatLayout({ children, users = [] }: { children: React.ReactNode, users?: any[] }) {
    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <ChatSidebar users={users}>
                <UserButton />
            </ChatSidebar>

            {/* Main Content */}
            <main className="flex-1 w-full overflow-hidden p-2 sm:p-6 md:pl-0">
                <div className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                    {children}
                </div>
            </main>
        </div>
    )
}
