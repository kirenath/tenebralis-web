"use client";

import { useState, useEffect, useRef } from "react";
import { Signal, Wifi, Battery } from "lucide-react";

/**
 * 顶部状态栏组件
 * 显示时间、信号、WiFi、电量
 */
export function StatusBar() {
  // 使用 useRef 存储 interval ID (rerender-use-ref-transient-values)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // 懒初始化时间 (rerender-lazy-state-init)
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  });

  useEffect(() => {
    // 每分钟更新时间
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    // 计算到下一分钟的延迟
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    
    // 先等到下一分钟整，再每分钟更新
    const timeout = setTimeout(() => {
      updateTime();
      intervalRef.current = setInterval(updateTime, 60000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full px-6 py-2 flex items-center justify-between text-white text-sm font-medium">
      {/* 左侧：时间 */}
      <div className="flex-1">
        <span className="font-semibold">{time}</span>
      </div>

      {/* 中间：占位（不显示灵动岛） */}
      <div className="flex-1" />

      {/* 右侧：状态图标 */}
      <div className="flex-1 flex items-center justify-end gap-1.5">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center gap-0.5">
          <Battery className="w-5 h-5" />
          <span className="text-xs">100</span>
        </div>
      </div>
    </div>
  );
}
