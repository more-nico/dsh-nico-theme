# Changelog

## 0.2.0

- 适配 DSH **0.1.2-rc.1**（客户端模块表变更）：`@deepseek-ai/dsh-client-runtime` 已拆包，`defineStore` / `EngineStoreHandle` / `BoundActions` 改从 `@deepseek-ai/dsh-client-store` 导入；`ClientContext` 改用 `@deepseek-ai/cordis` 的 `Context`；`ctx.slots` 的类型改由 `@deepseek-ai/dsh-client-ui-renderer/client` 提供。旧版 bundle 在 0.1.2 上会直接报 `require("@deepseek-ai/dsh-client-runtime/client") missed the module table` 而整块主题不加载
- 适配 DSH **0.1.2-rc.1** 宿主侧：`settingsNamespace()` 已移除，改为 `settings.register('nico', schema)`
- `dsh.client.inject` 去掉已删除的 `dsh-client-runtime`，补上 `dsh-client-ui-renderer`；peer / dev 依赖与 `dsh.engines.dsh` 全部升到 `0.1.2-rc.1`
- `lib/types/*.d.ts` 重新生成（原文件是上游 fork 遗留的 aqua 命名，且引用已删除的包）；新增 `pnpm typecheck`，`pnpm bundle` 现在同时产出声明
- 补上 `ctx.settings` 与 File System Access 权限方法（`queryPermission` / `requestPermission`）的本地类型声明，并修正 picker 在 async 闭包内丢失的窄化 —— `pnpm typecheck` 现在为 0 错误
- 修复 `src/client/AquaAppearanceRow.tsx` 里被截断重复的接口块（该行自「独立设置页」提交后已不再注册）
- `tests/visual.mjs` 改为断言独立设置页（`settings.section` → `[data-dsh-nico-page]`），不再是已移除的「通用设置 → 外观」行
- 从 more-nico/dshLiquidTheme 接入液态折射玻璃（SDF 置换 + SVG feDisplacementMap，可开关）
- 对话阅读垫层：只垫用户气泡和 AI 主正文；Think/工具折叠时不垫
- 鼠标描边（与片内辉光分开，可关）
- 不包含自适应字色

## 0.1.0

- 本地 fork：包名 `dsh-nico-theme`，cordis id `ui-nico`，设置命名空间 / keyed slot `nico`
- 适配 DSH **0.1.1-rc.2**：`dsh.client.inject` 去掉已不再是 client 插件的 slots/primitives；peer 升到 `^0.1.1-rc.2`
- 自带 tsdown 构建（lazy-CJS + CSS modules），不再依赖 DSH monorepo 的 `tsdown.client.ts`
- 视觉层仍基于上游 Aqua v1.3.0 / 非官方 fork v1.4.1（玻璃、流体、壁纸、粒子鲸鱼）

上游与非官方 fork 的历史见原仓库 CHANGELOG。
