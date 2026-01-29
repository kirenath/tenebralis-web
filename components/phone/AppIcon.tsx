"use client";

import { memo } from "react";
import Link from "next/link";

export interface AppIconData {
  id: string;
  name: string;
  icon: string | React.ReactNode;
  bgColor?: string;
}

interface AppIconProps {
  app: AppIconData;
  size?: "normal" | "dock";
}

/**
 * 单个应用图标组件
 * 使用 memo 优化重渲染 (rerender-memo)
 * 使用 Next.js Link 实现客户端导航 (bundle-preload)
 */
function AppIconComponent({ app, size = "normal" }: AppIconProps) {
  const iconSize = size === "dock" ? "w-14 h-14" : "w-16 h-16";
  const fontSize = size === "dock" ? "text-2xl" : "text-3xl";
  const labelSize = size === "dock" ? "text-[10px]" : "text-xs";

  return (
    <Link
      href={`/app/${app.id}`}
      className="app-icon-wrapper flex flex-col items-center gap-1 focus:outline-none"
      prefetch={false} // 按需预加载，避免不必要的预取 (bundle-conditional)
    >
      <div
        className={`${iconSize} rounded-[22%] flex items-center justify-center ${fontSize} shadow-lg`}
        style={{
          background: app.bgColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {typeof app.icon === "string" ? (
          <span>{app.icon}</span>
        ) : (
          app.icon
        )}
      </div>
      {size === "normal" && (
        <span className={`${labelSize} text-white/90 font-medium truncate max-w-[70px]`}>
          {app.name}
        </span>
      )}
    </Link>
  );
}

// memo 包裹以允许 React 跳过不必要的重渲染 (rerender-memo)
export const AppIcon = memo(AppIconComponent);
