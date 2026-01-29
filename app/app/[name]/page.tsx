import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PhoneFrame } from "@/components/phone";

// 应用名称映射（用于显示中文名）
const APP_NAMES: Record<string, string> = {
  // Dock 栏
  dream: "梦境",
  chat: "通讯",
  quest: "任务面板",
  profile: "个人资料",
  // 第一屏
  affection: "好感度",
  identity: "身份卡",
  worlds: "世界档案",
  forum: "论坛",
  shop: "商店",
  achievement: "成就",
  // 第二屏
  memo: "备忘录",
  ledger: "记账",
  gallery: "相册",
  calendar: "日历",
  pomodoro: "番茄钟",
  music: "音乐",
  // 第三屏
  archive: "世界档案",
  settings: "设置",
};

interface PageProps {
  params: { name: string };
}

/**
 * 动态路由页面 - 应用占位页
 * 复用 PhoneFrame，避免和根布局产生双重背景
 */
export default function AppPage({ params }: PageProps) {
  const { name } = params;
  const displayName = APP_NAMES[name] || name;

  return (
    <PhoneFrame>
      {/* 顶部导航栏 */}
      <div className="px-6 pt-6 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </Link>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="text-6xl mb-6">🚧</div>
        <h1 className="text-2xl font-bold text-white mb-3">{displayName}</h1>
        <p className="text-white/60 text-lg">功能开发中...</p>
        <p className="text-white/40 text-sm mt-2">敬请期待</p>
      </div>
    </PhoneFrame>
  );
}

/**
 * 生成静态参数（可选优化）
 * 如果应用列表固定，可以预生成所有页面 (server-parallel-fetching)
 */
export function generateStaticParams() {
  return Object.keys(APP_NAMES).map((name) => ({ name }));
}
