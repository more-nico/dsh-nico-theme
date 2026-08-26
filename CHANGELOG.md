# Changelog

## 0.2.0

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
