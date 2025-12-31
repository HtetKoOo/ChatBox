"use server"

import { auth, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function deleteAccount() {
    const session = await auth()
    if (!session?.user?.email) throw new Error("Not authenticated")

    await prisma.user.delete({
        where: { email: session.user.email }
    })

    await signOut({ redirectTo: "/" })
}
