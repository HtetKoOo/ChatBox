
import { SignIn } from "@/components/auth/sign-in"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your account to continue.</p>
            </div>
            <SignIn />
        </div>
    )
}
