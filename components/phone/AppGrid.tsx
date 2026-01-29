"use client";

import { memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { AppIcon, type AppIconData } from "./AppIcon";

// 导入 Swiper 样式
import "swiper/css";
import "swiper/css/pagination";

// 静态应用数据提升到组件外部 (rendering-hoist-jsx)
const ALL_APPS: AppIconData[] = [
  // 第一屏（6 个）
  { id: "affection", name: "好感度", icon: "❤️", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)" },
  { id: "identity", name: "身份卡", icon: "🎭", bgColor: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)" },
  { id: "worlds", name: "世界档案", icon: "🌀", bgColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" },
  { id: "forum", name: "论坛", icon: "🗣️", bgColor: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)" },
  { id: "shop", name: "商店", icon: "🛒", bgColor: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)" },
  { id: "achievement", name: "成就", icon: "🏆", bgColor: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)" },

  // 第二屏（6 个）
  { id: "memo", name: "备忘录", icon: "📝", bgColor: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)" },
  { id: "ledger", name: "记账", icon: "💰", bgColor: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)" },
  { id: "gallery", name: "相册", icon: "📷", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)" },
  { id: "calendar", name: "日历", icon: "📅", bgColor: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)" },
  { id: "pomodoro", name: "番茄钟", icon: "🍅", bgColor: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" },
  { id: "music", name: "音乐", icon: "🎵", bgColor: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)" },

  // 第三屏（2 个）
  { id: "archive", name: "世界档案", icon: "🌀", bgColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" },
  { id: "settings", name: "设置", icon: "⚙️", bgColor: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)" },
];

const APPS_PER_PAGE = 6; // 2行 x 3列

/**
 * 应用网格组件
 * 支持左右滑动切换页面
 */
function AppGridComponent() {
  // 将应用分成多个页面 (rerender-derived-state-no-effect - 派生状态不用 state+effect)
  const pages = useMemo(() => {
    const result: AppIconData[][] = [];
    for (let i = 0; i < ALL_APPS.length; i += APPS_PER_PAGE) {
      result.push(ALL_APPS.slice(i, i + APPS_PER_PAGE));
    }
    return result;
  }, []);

  return (
    <div className="flex-1 w-full overflow-hidden">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        className="h-full"
      >
        {pages.map((pageApps, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className="grid grid-cols-3 gap-x-6 gap-y-6 px-6">
              {pageApps.map((app) => (
                <AppIcon key={app.id} app={app} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export const AppGrid = memo(AppGridComponent);
