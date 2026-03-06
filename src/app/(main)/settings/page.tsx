"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, Loader2, User } from "lucide-react";
import { createClient } from "@/services/supabase/client";
import { useAuthStore } from "@/features/auth/stores/authStore";

export default function SettingsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

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
        <h1 className="text-base font-semibold">设置</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* User Info Section */}
        <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted-foreground">当前账号</p>
              <p className="truncate text-sm font-semibold">
                {user?.email ?? "未知用户"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="rounded-2xl border bg-card/50 backdrop-blur-sm">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loggingOut ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">
              {loggingOut ? "正在退出..." : "退出登录"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
