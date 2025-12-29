
import { auth } from "@/auth"
import { SignIn } from "./sign-in"
import { SignOut } from "./sign-out"
import Image from "next/image"

export async function UserButton() {
    const session = await auth()

    if (!session?.user) return <SignIn />

    return (
        <div className="flex items-center gap-2">
            {session.user.image && (
                <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User Avatar"}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            )}
            <div className="flex flex-col">
                <span className="text-sm font-medium">{session.user.name}</span>
                <span className="text-xs text-muted-foreground">
                    <SignOut />
                </span>
            </div>
        </div>
    )
}
