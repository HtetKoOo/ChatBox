
import { signIn } from "@/auth"
import Link from "next/link"

export function SignIn() {
    return (
        <div className="w-full max-w-sm space-y-4">
            <form
                action={async (formData) => {
                    "use server"
                    await signIn("credentials", { 
                        email: formData.get("email"), 
                        password: formData.get("password"),
                        redirectTo: "/" 
                    })
                }}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Email</label>
                    <input name="email" type="email" required className="border p-2 rounded" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Password</label>
                    <input name="password" type="password" required className="border p-2 rounded" />
                </div>
                <button type="submit" className="bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90">
                    Sign In
                </button>
            </form>
            <div className="text-sm text-center">
                Don&apos;t have an account? <Link href="/register" className="underline">Sign Up</Link>
            </div>
        </div >
    )
}
