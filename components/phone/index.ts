// 统一导出 phone 组件
// 注意：虽然 barrel 文件可能影响 tree-shaking (bundle-barrel-imports)
// 但 Next.js 的 optimizePackageImports 配置可以优化这个问题
// 对于项目内部组件，保持开发体验的便利性

export { PhoneFrame } from "./PhoneFrame";
export { StatusBar } from "./StatusBar";
export { AppGrid } from "./AppGrid";
export { DockBar } from "./DockBar";
export { AppIcon } from "./AppIcon";
export type { AppIconData } from "./AppIcon";
