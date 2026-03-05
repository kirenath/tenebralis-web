"use client";

import Link from "next/link";
import {
  Heart,
  Users,
  ListChecks,
  MessagesSquare,
  Store,
  Trophy,
  StickyNote,
  Wallet,
  Image as ImageIcon,
  CalendarDays,
  Timer,
  Music,
  Sliders,
  BarChart3,
  Palette,
  Plug,
  Brain,
  Settings,
} from "lucide-react";

export interface AppIconItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  emoji?: string;
}

/** Icon config for the three desktop pages. */
export const DESKTOP_PAGES: AppIconItem[][] = [
  // Page 1 — Core
  [
    { href: "/affinity", icon: Heart, label: "好感" },
    { href: "/npc", icon: Users, label: "角色" },
    { href: "/task", icon: ListChecks, label: "任务" },
    { href: "/forum", icon: MessagesSquare, label: "论坛" },
    { href: "/shop", icon: Store, label: "商店" },
    { href: "/achievement", icon: Trophy, label: "成就" },
  ],
  // Page 2 — Tools
  [
    { href: "/notes", icon: StickyNote, label: "备忘" },
    { href: "/wallet", icon: Wallet, label: "钱包" },
    { href: "/gallery", icon: ImageIcon, label: "相册" },
    { href: "/calendar", icon: CalendarDays, label: "日历" },
    { href: "/pomodoro", icon: Timer, label: "番茄钟" },
    { href: "/music", icon: Music, label: "音乐" },
  ],
  // Page 3 — System
  [
    { href: "/preset", icon: Sliders, label: "预设" },
    { href: "/context", icon: BarChart3, label: "上下文" },
    { href: "/customize", icon: Palette, label: "自定义" },
    { href: "/connection", icon: Plug, label: "连接" },
    { href: "/memory", icon: Brain, label: "记忆" },
    { href: "/settings", icon: Settings, label: "设置" },
  ],
];

interface AppIconGridProps {
  items: AppIconItem[];
}

/** 3×2 grid of app icons for one desktop page. */
export function AppIconGrid({ items }: AppIconGridProps) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-6 place-items-center px-6 py-4">
      {items.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-1.5 group"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-transform group-hover:scale-110 group-active:scale-95 dark:bg-white/10 dark:ring-white/10">
            <Icon className="h-6 w-6 text-[var(--dream-primary)]" />
          </div>
          <span className="text-[11px] font-medium text-foreground/80 drop-shadow-sm">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}
