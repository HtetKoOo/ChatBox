"use client"

import ChatInput from "./chat-input"
import MessageList from "./message-list"

// This component will manage the state for a specific chat room
export function ChatRoom({ initialMessages, chatId, currentUserId, chatName }: { initialMessages: any[], chatId: string, currentUserId: string, chatName: string }) {
    // In a real app, we would set up real-time subscriptions here using chatId

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="border-b p-4 flex justify-center md:justify-start">
                <h2 className="font-semibold">{chatName}</h2>
            </div>
            <MessageList initialMessages={initialMessages} currentUserId={currentUserId} chatId={chatId} />
            <ChatInput chatId={chatId} />
        </div>
    )
}
