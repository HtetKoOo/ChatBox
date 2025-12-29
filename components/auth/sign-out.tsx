
import { signOut } from "@/auth"

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit" className="text-sm text-red-500 hover:text-red-700 w-full text-left">
                Sign Out
            </button>
        </form>
    )
}
