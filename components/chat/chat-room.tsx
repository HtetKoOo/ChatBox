"use client"

import ChatInput from "./chat-input"
import MessageList from "./message-list"

// This component will manage the state for a specific chat room
export function ChatRoom({ initialMessages, chatId, currentUserId }: { initialMessages: any[], chatId: string, currentUserId: string }) {
    // In a real app, we would set up real-time subscriptions here using chatId

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <MessageList initialMessages={initialMessages} currentUserId={currentUserId} chatId={chatId} />
            <ChatInput chatId={chatId} />
        </div>
    )
}
