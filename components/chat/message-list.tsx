"use client"

import { useEffect, useState, useRef } from "react"
import { pusherClient } from "@/lib/pusher"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    text: string
    createdAt: Date
    userId: string
    user: {
        name: string | null
        image: string | null
    }
}

interface MessageListProps {
    initialMessages: Message[]
    currentUserId: string
    chatId: string
}

export default function MessageList({ initialMessages, currentUserId, chatId }: MessageListProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Scroll to bottom on mount
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    useEffect(() => {
        const channelName = `chat-room-${chatId}`
        const channel = pusherClient.subscribe(channelName)

        channel.bind("upcoming-message", (data: Message) => {
            // Need to convert string date back to Date object if needed, 
            // but rendering usually handles strings fine or we parse it
            setMessages((prev) => [...prev, data])

            // Scroll to bottom on new message
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" })
            }, 100)
        })

        return () => {
            pusherClient.unsubscribe(channelName)
            channel.unbind_all()
        }
    }, [chatId])

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => {
                const isCurrentUser = message.userId === currentUserId

                return (
                    <div
                        key={message.id}
                        className={cn(
                            "flex w-full flex-col gap-1",
                            isCurrentUser ? "items-end" : "items-start"
                        )}
                    >
                        {!isCurrentUser && (
                            <span className="text-xs text-muted-foreground ml-1">
                                {message.user.name || "Unknown"}
                            </span>
                        )}
                        <div
                            className={cn(
                                "flex max-w-[80%] flex-col gap-1 rounded-2xl px-4 py-2 shadow-sm",
                                isCurrentUser
                                    ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                                    : "bg-white border border-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50"
                            )}
                        >
                            <p className="text-sm">{message.text}</p>
                            <span suppressHydrationWarning className="text-[10px] opacity-50 self-end">
                                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                )
            })}
            <div ref={bottomRef} className="h-1" />
        </div>
    )
}
