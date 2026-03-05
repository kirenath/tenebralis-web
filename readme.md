# 🌌 Tenebralis Dream System 【界影浮光】

> "Echoes of the void, rendered in light."
> 虚空的回响，于光影中显现。

![System Status](https://img.shields.io/badge/System-Rebuilding-orange?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

## 📂 System Overview (系统概述)

**Tenebralis (界影浮光)** 是一个基于 Web 技术的沉浸式幻想终端系统，以 **PWA (Progressive Web App)** 形态交付。它以 **Dream OS** 手机拟态界面——三页横滑桌面、Dock 底栏、状态栏——承载小说世界观、设定集与 AI 辅助创作工具。

Web 端与 Android 端共享同一套 Supabase 后端 (Postgres + Auth + Storage + Realtime)，实现**跨平台数据同步**。用户可将 Web 端安装到桌面或手机主屏幕，获得接近原生 App 的沉浸式体验。

当前状态：`Rebuilding` 🔨

## 🛠️ Tech Stack (技术架构)

| 层次       | 技术                                                                                    | 说明                                  |
| ---------- | --------------------------------------------------------------------------------------- | ------------------------------------- |
| **框架**   | [Next.js 15](https://nextjs.org/) (App Router)                                          | React 全栈框架，SSR/SSG/ISR           |
| **语言**   | TypeScript 5                                                                            | 全项目严格类型                        |
| **UI**     | React 19 + [shadcn/ui](https://ui.shadcn.com/)                                          | 声明式 UI + Radix 可定制组件          |
| **样式**   | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Modules                                | 原子化 CSS + 组件级隔离               |
| **状态**   | [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query) | 全局状态 + 服务端缓存                 |
| **后端**   | [Supabase](https://supabase.com/)                                                       | Auth / Postgrest / Realtime / Storage |
| **表单**   | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)               | 表单状态 + Schema 校验                |
| **动画**   | [Framer Motion](https://www.framer.com/motion/)                                         | 页面过渡与交互动画                    |
| **国际化** | [next-intl](https://next-intl-docs.vercel.app/)                                         | i18n (中/英)                          |
| **包管理** | pnpm                                                                                    | 高效包管理                            |
| **部署**   | [Vercel](https://vercel.com/)                                                           | 云端实体化                            |

## �️ Dream OS (系统拟态)

```
┌─────────────────────────────────────┐
│  StatusBar: 时间 · 网络 · 电量      │  ← 装饰性状态栏
├─────────────────────────────────────┤
│                                     │
│        Desktop Pager（三页）         │  ← CSS scroll-snap 横滑
│                                     │
│   ┌─────┐  ┌─────┐  ┌─────┐        │
│   │ App │  │ App │  │ App │  ...   │  ← 图标网格
│   │ 对话 │  │ 梦境 │  │ 世界 │        │
│   └─────┘  └─────┘  └─────┘        │
│                                     │
│              · ○ ·                   │  ← 页面指示器
├─────────────────────────────────────┤
│  Dock: 🌍世界  🚪梦境  💬对话  👤档案 │  ← 固定底栏
└─────────────────────────────────────┘
```

**三页桌面布局：**

- **Page 1 — 核心功能**：好感 · 角色 · 任务 · 论坛 · 商店 · 成就
- **Page 2 — 个人工具**：备忘 · 钱包 · 相册 · 日历 · 番茄钟 · 音乐
- **Page 3 — 系统配置**：预设 · 上下文 · 自定义 · 连接 · 记忆 · 设置

## 🚀 Getting Started (启动指南)

如果你想在本地复刻这个世界：

1. **Clone the repository**

   ```bash
   git clone https://github.com/kirenath/tenebralis-web.git
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   复制 `MUST_READ_ME.env.template` 为 `.env.local` 并填入你的 Supabase 密钥：

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

4. **Ignite**
   ```bash
   pnpm dev
   ```

## 📜 Roadmap (开发计划)

### Phase 0 — 工程骨架 & PWA 基础

- [ ] Next.js 项目搭建 + Tailwind + shadcn/ui + Supabase 集成
- [ ] PWA 配置 (manifest + Service Worker + 图标)
- [ ] Auth 流程 (登录 / 注册 / 会话管理 / 路由守卫)
- [ ] Dream OS Shell (StatusBar + DockBar + DesktopPager + AppIconGrid + 壁纸层)

### Phase 1 — 核心对话链路

- [ ] 世界系统 (World CRUD + Identity + Save)
- [ ] NPC 管理 (NPC CRUD + 角色卡导入)
- [ ] 对话系统 (消息列表 + 流式 AI 回复)
- [ ] API 连接管理 (Connection CRUD + 测试)

### Phase 2 — 辅助系统

- [ ] 预设编辑器 + 世界书管理
- [ ] 上下文管理器 + 记忆管理
- [ ] 个人数据 (备忘 / 日历 / 番茄钟)
- [ ] 设置 + 个人档案

### Phase 3 — 成长与社交

- [ ] 任务 / 成就 / 好感度
- [ ] 论坛 + 商店 + 钱包
- [ ] 角色卡 PNG 导入

### Phase 4 — 增强与优化

- [ ] 离线支持增强 (Service Worker)
- [ ] 推送通知 + 性能优化
- [ ] 桌面浏览器增强

## 🔗 Cross-Platform (跨平台)

Web 端与 Android 端共享：

- ✅ 同一 Postgres 数据库 (28+ 核心表 + RLS)
- ✅ 同一 Auth 用户体系
- ✅ 同一 Storage 存储桶 (avatars / worlds / forum-images / wallpapers / assets / lorebooks)
- ✅ 同一 AI 上下文编排逻辑
- ✅ SillyTavern 预设 / 角色卡 / 世界书兼容

## ⚖️ License (协议)

本系统的源代码遵循 **GNU AGPLv3** 协议开源。

- ✅ **免费使用**：适合个人学习、开源项目或非营利性研究。
- 🔄 **强制开源**：如果你将本系统部署为网络服务供他人使用，你**必须**公开你的修改源码。

---

_Kirenath · 2026_
