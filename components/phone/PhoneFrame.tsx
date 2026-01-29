"use client";

import { memo, type ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

/**
 * 手机外框组件
 * 提供手机边框视觉效果和整体布局
 */
function PhoneFrameComponent({ children }: PhoneFrameProps) {
  return (
    <div className="relative">
      {/* 手机外框 */}
      <div
        className="relative w-[375px] h-[812px] bg-phone-bg rounded-[45px] overflow-hidden shadow-2xl"
        style={{
          // 模拟手机边框（更细）
          boxShadow: `
            0 0 0 4px #1a1a1a,
            0 0 0 5px #333,
            0 25px 50px -12px rgba(0, 0, 0, 0.5)
          `,
        }}
      >
        {/* 顶部居中打孔摄像头（Galaxy 风格） */}
        <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-30">
          <div className="h-[12px] w-[12px] rounded-full bg-black/90 ring-2 ring-black/60 shadow-[0_2px_6px_rgba(0,0,0,0.35)]" />
        </div>

        {/* 内部内容区域 */}
        <div className="relative w-full h-full flex flex-col">
          {children}
        </div>
      </div>

      {/* 侧边按钮装饰 - 右侧电源键 */}
      <div
        className="absolute right-[-7px] top-[180px] w-[2px] h-[60px] bg-[#333] rounded-r-sm"
      />
      
      {/* 侧边按钮装饰 - 左侧音量键 */}
      <div
        className="absolute left-[-7px] top-[140px] w-[2px] h-[25px] bg-[#333] rounded-l-sm"
      />
      <div
        className="absolute left-[-7px] top-[175px] w-[2px] h-[45px] bg-[#333] rounded-l-sm"
      />
      <div
        className="absolute left-[-7px] top-[230px] w-[2px] h-[45px] bg-[#333] rounded-l-sm"
      />
    </div>
  );
}

export const PhoneFrame = memo(PhoneFrameComponent);
