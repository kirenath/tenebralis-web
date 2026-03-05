"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface StubPageProps {
  title: string;
  icon?: React.ReactNode;
}

/** Placeholder page for modules not yet implemented. */
export function StubPage({ title, icon }: StubPageProps) {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-dvh max-w-[480px] flex-col bg-background/80 backdrop-blur-xl">
      {/* Top bar */}
      <div className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
        <button
          onClick={() => router.push("/")}
          className="rounded-lg p-1.5 hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold">{title}</h1>
      </div>

      {/* Content placeholder */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
        {icon && <div className="text-4xl">{icon}</div>}
        <p className="text-lg font-medium">Coming Soon</p>
        <p className="text-sm">此功能将在后续版本中上线</p>
      </div>
    </div>
  );
}
