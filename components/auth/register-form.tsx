"use client"

import { register } from "@/actions/register"
import { useActionState } from "react"
import Link from "next/link"

export function RegisterForm() {
    const [state, action, pending] = useActionState(register, null)

    return (
        <form action={action} className="w-full max-w-sm flex flex-col gap-4">
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            {state?.success && <p className="text-green-500 text-sm">{state.success}</p>}

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Name</label>
                <input name="name" type="text" required className="border p-2 rounded" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input name="email" type="email" required className="border p-2 rounded" />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Password</label>
                <input name="password" type="password" required className="border p-2 rounded" />
            </div>

            <button
                type="submit"
                disabled={pending}
                className="bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90 disabled:opacity-50"
            >
                {pending ? "Creating account..." : "Sign Up"}
            </button>

            <div className="text-sm text-center">
                Already have an account? <Link href="/api/auth/signin" className="underline">Sign In</Link>
            </div>
        </form>
    )
}
