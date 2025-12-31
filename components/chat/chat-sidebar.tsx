"use client"

import { useState } from 'react'
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserList } from "./user-list"

interface ChatSidebarProps {
    users: any[]
    children: React.ReactNode // For UserButton
}

export function ChatSidebar({ users, children }: ChatSidebarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 bg-background border border-border rounded-full shadow-md"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Desktop & Mobile Drawer */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 border-r bg-muted/20 p-4 flex flex-col justify-between bg-background transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div>
                    <span className="font-bold text-lg">Chat App</span>
                    <UserList users={users} />
                </div>
                {children}
            </div>
        </>
    )
}
