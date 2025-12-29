"use client"

import { useState } from "react"
import { SendIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ChatInput({ chatId }: { chatId?: string }) {
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        setIsLoading(true)
        const messageText = input
        setInput("") // Optimistic clear

        try {
            await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: messageText, chatId }),
            })
        } catch (error) {
            console.error("Failed to send message:", error)
            // Ideally revert optimistic update here or show toast
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-zinc-50 p-4 dark:bg-zinc-900/50">
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus-within:ring-zinc-100"
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border-none bg-transparent px-6 py-4 text-sm outline-none placeholder:text-zinc-500 dark:text-zinc-50 dark:placeholder:text-zinc-400"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={cn(
                        "mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
                        (!input.trim() || isLoading) && "cursor-not-allowed opacity-50"
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <SendIcon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send</span>
                </button>
            </form>
        </div>
    )
}
