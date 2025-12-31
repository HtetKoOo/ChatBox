"use client"

import { deleteAccount } from "@/actions/user"
import { Trash2 } from "lucide-react"

export function DeleteAccountButton() {
    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            await deleteAccount()
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
        >
            <Trash2 className="h-3 w-3" />
            Delete Account
        </button>
    )
}
