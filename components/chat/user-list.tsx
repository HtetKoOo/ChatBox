"use client"

import { createOrGetChat } from "@/actions/chat"
import { useRouter } from "next/navigation"

export function UserList({ users }: { users: any[] }) {
    const router = useRouter()

    const handleUserClick = async (userId: string) => {
        try {
            const chatId = await createOrGetChat(userId)
            router.push(`/chat/${chatId}`)
        } catch (error) {
            console.error("Failed to start chat", error)
        }
    }

    return (
        <div className="flex flex-col gap-2 mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground px-2">People</h3>
            {users.map((user) => (
                <button
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 text-left transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                        {user.name?.[0] || user.email?.[0] || "?"}
                    </div>
                    <span className="text-sm font-medium truncate">{user.name || user.email}</span>
                </button>
            ))}
        </div>
    )
}
