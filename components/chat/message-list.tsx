"use client"

import { Trash2 } from "lucide-react"
import { deleteMessage } from "@/actions/message"

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
            setMessages((prev) => [...prev, data])

            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" })
            }, 100)
        })

        channel.bind("message-deleted", (messageId: string) => {
            setMessages((prev) => prev.filter(m => m.id !== messageId))
        })

        return () => {
            pusherClient.unsubscribe(channelName)
            channel.unbind_all()
        }
    }, [chatId])

    const handleDelete = async (messageId: string) => {
        try {
            // Optimistic update
            setMessages(prev => prev.filter(m => m.id !== messageId))
            await deleteMessage(messageId)
        } catch (error) {
            console.error("Failed to delete message", error)
            // Revert on error? For now, we rely on refresh or ignoring.
        }
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => {
                const isCurrentUser = message.userId === currentUserId

                return (
                    <div
                        key={message.id}
                        className={cn(
                            "group flex w-full flex-col gap-1",
                            isCurrentUser ? "items-end" : "items-start"
                        )}
                    >
                        {!isCurrentUser && (
                            <span className="text-xs text-muted-foreground ml-1">
                                {message.user.name || "Unknown"}
                            </span>
                        )}
                        <div className="flex items-center gap-2 max-w-[80%]">
                            {isCurrentUser && (
                                <button
                                    onClick={() => handleDelete(message.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-muted-foreground hover:text-red-500"
                                    title="Delete message"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                            <div
                                className={cn(
                                    "flex flex-col gap-1 rounded-2xl px-4 py-2 shadow-sm",
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
                    </div>
                )
            })}
            <div ref={bottomRef} className="h-1" />
        </div>
    )
}
