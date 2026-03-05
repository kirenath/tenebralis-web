"use client";

import { Wifi, BatteryFull, Signal } from "lucide-react";
import { useEffect, useState } from "react";

/** Decorative phone-style status bar showing time, network, and battery icons. */
export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-7 shrink-0 items-center justify-between px-5 text-xs font-medium text-foreground/80">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryFull className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}
