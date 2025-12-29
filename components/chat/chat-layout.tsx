
import React from 'react'
import { UserButton } from "@/components/auth/user-button"
import { UserList } from "./user-list"

export default function ChatLayout({ children, users = [] }: { children: React.ReactNode, users?: any[] }) {
    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <div className="w-64 border-r bg-muted/20 p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Chat App</span>
                    <UserButton />
                </div>
                <UserList users={users} />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden p-4 sm:p-6">
                <div className="mx-auto flex h-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                    {children}
                </div>
            </main>
        </div>
    )
}
