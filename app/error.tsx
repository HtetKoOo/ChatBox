"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background p-4 text-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-bold">Something went wrong!</h2>
                <p className="max-w-[500px] text-muted-foreground">
                    {error.message || "An unexpected error occurred. Please try again later."}
                </p>
            </div>
            <button
                onClick={() => reset()}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
                Try again
            </button>
        </div>
    );
}
