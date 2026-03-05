"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, DoorOpen, MessageCircle, User } from "lucide-react";

const DOCK_ITEMS = [
  { href: "/world", icon: Globe, label: "世界" },
  { href: "/dream", icon: DoorOpen, label: "梦境" },
  { href: "/chat", icon: MessageCircle, label: "对话" },
  { href: "/profile", icon: User, label: "档案" },
] as const;

/** Fixed bottom dock bar with 4 quick-access entries. */
export function DockBar() {
  const pathname = usePathname();

  return (
    <div className="flex h-16 shrink-0 items-center justify-around border-t border-white/10 bg-white/30 backdrop-blur-xl dark:bg-white/5">
      {DOCK_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-colors ${
              active
                ? "text-[var(--dream-primary)]"
                : "text-foreground/60 hover:text-foreground/90"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
