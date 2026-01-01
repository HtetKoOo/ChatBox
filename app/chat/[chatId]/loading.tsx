import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* We reuse the sidebar structure but passed empty users or skeletons ideally */}
            {/* Since fetching users is fast, we might not have them yet. 
            For better UX, we can just show the layout skeleton. */}

            <div className="hidden border-r bg-muted/20 p-4 flex-col justify-between md:flex w-64">
                {/* Sidebar Skeleton */}
                <div className="space-y-4">
                    <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
                    <div className="space-y-2 mt-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                                <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
            </div>

            <main className="flex-1 w-full overflow-hidden p-2 sm:p-6 md:pl-0">
                <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </main>
        </div>
    );
}
