
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-muted-foreground">Enter your details specifically.</p>
            </div>
            <RegisterForm />
        </div>
    )
}
