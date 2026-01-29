"use client";

import { memo } from "react";
import { AppIcon, type AppIconData } from "./AppIcon";

// 静态数据提升到组件外部 (rendering-hoist-jsx)
const DOCK_APPS: AppIconData[] = [
  {
    id: "dream",
    name: "梦境",
    icon: "🌙",
    bgColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  },
  {
    id: "chat",
    name: "通讯",
    icon: "💬",
    bgColor: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
  },
  {
    id: "quest",
    name: "任务面板",
    icon: "📋",
    bgColor: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
  },
  {
    id: "profile",
    name: "个人资料",
    icon: "👤",
    bgColor: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
  },
];

/**
 * 底部 Dock 栏组件
 * 固定在底部，滑动时不移动
 */
function DockBarComponent() {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] z-50">
      <div className="bg-white/20 backdrop-blur-xl rounded-[28px] px-4 py-3 flex items-center justify-around">
        {DOCK_APPS.map((app) => (
          <AppIcon key={app.id} app={app} size="dock" />
        ))}
      </div>
    </div>
  );
}

export const DockBar = memo(DockBarComponent);
