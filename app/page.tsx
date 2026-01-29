import { PhoneFrame, StatusBar, AppGrid, DockBar } from "@/components/phone";

/**
 * 主页面 - 手机桌面模拟器
 * 
 * 性能优化说明 (基于 Vercel React Best Practices):
 * - 使用 Server Component 作为页面容器 (无需 "use client")
 * - Client 组件已拆分并使用 memo 优化 (rerender-memo)
 * - 静态数据已提升到组件外部 (rendering-hoist-jsx)
 * - 派生状态使用 useMemo 而非 state+effect (rerender-derived-state-no-effect)
 */
export default function Home() {
  return (
    <PhoneFrame>
        {/* 顶部状态栏 */}
        <StatusBar />
        
        {/* 主内容区域 - 可滑动的应用网格 */}
        <AppGrid />
        
        {/* 底部 Dock 栏 */}
        <DockBar />
      </PhoneFrame>
  );
}
