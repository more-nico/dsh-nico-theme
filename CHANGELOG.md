# Changelog

## 0.3.1

- **peer 依赖的预发布范围改为显式 `||` 分支**：`^0.1.2-rc.1` 这类范围按 node-semver 的规则只会放行 `0.1.2` 元组上的预发布版本，装 DSH `0.1.3` / `0.1.5` / `0.1.6` 的预发布构建时会静默失败并报 `ERESOLVE`；现在写成 `^0.1.2-rc.1 || ^0.1.3-alpha.2 || ^0.1.5-rc.1 || ^0.1.6-alpha.1`（与市场内其他插件的写法一致），devDependencies 仍钉在实测过的 `0.1.2-rc.1`
- 新增 `screenshots.json`：声明 `assets/hero-dark.png` / `chat-dark.png` / `rail-dark.png`，插件市场详情页按此顺序展示（不再从 README 自动抽取）

## 0.3.0

- **面板玻璃改为由 [nico-glass-kit](https://github.com/more-nico/nico-glass-kit) `^0.3.0` 渲染**：header / 侧栏 / 作曲器 / 各 dock / 弹窗 / 后台任务 popover / 新建会话胶囊等 14 个面板统一注入 underlay 并 portal `GlassSurface`，圆角统一 32px；自绘玻璃配方与自研 SDF 折射（`refract.ts`）、鼠标辉光/压下（`spotlight.ts` / `spot-core.ts`）、鼠标描边（`rim.ts`）、粒子鲸鱼（`whale.ts`）、网状交互（`mesh.ts`）全部删除
- **材质参数换成 kit 刻度**：玻璃模糊度 0-64px / 亮度 0-2 / 折射强度 0-100% / 折射深度 0-40px / 边缘曲率 0-1 / 边缘色散 0-100% / 边缘高光 0-2，默认值 = playground 默认（blur 3、brightness 1.1、refraction 100%、depth 8、curvature 0.2、dispersion 10%、highlight 1）；旧项 磨砂度 / 边缘光泽 / 折射开关 删除（kit 无对应语义）
- **「悬停效果」改为 kit 弹性**（开关 + 强度 0-0.5，默认开）、删除「环境装饰」整组与鼠标辉光 / 鼠标描边 / 悬停下压；悬停时玻璃与其上的面板内容一起倾斜（指针转发 + `.ngs-motion` 位移镜像），裁剪自身溢出的宿主保持刚性，`prefers-reduced-motion` 下整体停用
- 修复弹性倾斜时的分层：kit 只位移内层 `.ngs-motion`，外壳（`.ngs-surface`）连同它画的投影会留在宿主原位，露出「原位置的阴影弧 + 一条没磨砂的背景带」。现在样式表中和内层位移、由外壳承载偏移（`glass-panes.tsx`），玻璃、外壳投影与面板内容三者同偏移，面板整体倾斜
- 修复设置浮层打开后背后的面板玻璃仍随鼠标滑动：浮层是宿主（侧栏列）的 fixed DOM 后代，鼠标在浮层上的 `pointermove` 冒泡进宿主，而指针远在面板盒之外、kit 的位移映射又不钳制，玻璃会被屏幕另一侧的指针拖走；现在只有真正落在面板盒内、且不来自宿主内部浮层的 move 才喂给 kit，其余按 `pointerleave` 处理，弹簧立即回正
- 设置页控件全部换成 kit 组件（`GlassSlider` / `GlassInput` / `GlassSwitch` / `GlassSegmentedControl` / `GlassButton`），页面用 `GlassProvider` 包裹；模式 / 背景选择器沿用 playground device 底栏的胶囊语言：外胶囊内嵌、槽位同内边距内缩成胶囊（圆角同心）、选中态就是 kit 的 active 胶囊填充
- 首帧兜底：surface 就绪前由宿主 `::before` 画与 kit low tier 逐项一致的 CSS 磨砂，交接不跳变
- 关掉插件或切换到兼容模式后不残留 underlay 与宿主钩子；兼容模式仍为 token 级半透明玻璃，不建 pane
- 构建：`dsh-css-global-inline` 支持裸说明符 CSS（`nico-glass-kit/style.css` 内联）；新增 `@types/react-dom`、`react-dom` peer
- `tests/visual.mjs` 仍断言旧的 refract / spot / press 实现，本次未更新（会失败，重写留待后续）；本轮验证用临时探针脚本完成

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
