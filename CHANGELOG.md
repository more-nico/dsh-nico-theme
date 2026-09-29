# Changelog

## 0.3.3 (2026-09-29)

- 子智能体数量入口恢复原生按钮，不挂玻璃；展开的子智能体树列表独立接入 kit 玻璃，并去掉面板原生伪元素的实色磨砂底板
- 右侧文件标签栏释放父面板的阴影裁切；标签统一 32px 高，关闭按钮恢复为居中的 20px 控件，文件名预留关闭区域，当前标签始终显示 X。挂载玻璃前固定工具栏尺寸，避免选中标签滚动后 X 又被挤出可视区，并移除遮淡 X 的边缘遮罩
- 右侧整块玻璃的中性 tint 从 kit 默认 20% 增至 35%，随深浅色适配，提高文件预览的文字可读性，不额外叠加底板
- 顶栏右侧侧栏按钮移除原生 -16px 负外边距，保留 16px 卡片内边距，避免玻璃与弹性位移贴到顶栏边缘
- 顶栏打开文件夹、下拉与更多操作统一为 32px 控件，修复原生 24px 分体容器造成的图标下沉和悬停底色裁切；三个入口等距居中，共用一条玻璃胶囊
- 修复收起侧栏弹性位移时原位裁切轮廓像多一层底板：侧栏裁切框、玻璃与内容整体位移，圆角统一为与顶栏一致的 32px；内部弹窗打开时暂停侧栏整体位移，保留弹窗定位
- 收起侧栏的品牌、新会话、插件、添加工作区、搜索与设置统一使用独立 36px 圆形玻璃，清除展开工具组残留的底板和内边距，沿侧栏中心线对齐
- 修复侧栏收起按钮右侧阴影被品牌栏裁成直线：展开时释放品牌栏溢出，保留收起侧栏的裁切
- 轨迹“时长 / 轮次 / 调用”工具栏恢复 DSH 默认样式，不再套用主题玻璃胶囊、按钮圆角或配色
- 轨迹内容区改用阅读垫层，沿用垫层透明度、模糊度与深浅色材质，移除整块轨迹折射玻璃和弹性位移；保留工具栏控件及详情面板的玻璃
- 修复圆形按钮和统计胶囊触发弹性时 SVG 图标停在原位的问题：图标、文字与玻璃使用相同位移，卸载时一并清理
- 按 Playground 的胶囊条与圆形图标按钮整理工作区工具、会话导航及顶栏操作；一组操作共用玻璃底座，保留原生按钮与键盘交互
- 输入框左下角的“＋”改成独立 32px 圆形按钮，权限选择改成独立下拉胶囊，两者之间留 12px；移除共用的小长条玻璃，直接铺在输入卡片上。玻璃按钮不再叠加原生输入栏的阴影，已在 Codex 内置浏览器检查权限菜单和添加菜单可正常打开
- 输入框底部仅保留性能、Token 用量、上下文三个独立玻璃胶囊，移除统计行的整条玻璃及覆盖统计行的输入框底板；三个胶囊整体居中，两处间距统一为 12px。恢复统计布局的间距，并在 Codex 内置浏览器检查三个详情面板仍可展开
- 回复底部的复制、反馈、分支、用量入口与时间使用完全圆角的胶囊垫层，取消原生图标行的负边距，与回复垫层左边缘对齐；读取相同的垫层透明度与模糊度，不挂折射玻璃，不单独给用量入口加玻璃。展开的“本轮用量”面板继续使用 kit 玻璃，已在 18765 的 Codex 内置浏览器检查收起与展开两种状态
- 修复快速拖动侧栏时旧尺寸折射贴图造成的黑条：拖动中使用同参数磨砂，贴图尺寸匹配后恢复折射，结束监听时取消待处理帧
- 右侧栏采用与左侧一致的整块玻璃、32px 圆角与 12px 外边距；分栏共用底板，全屏保持可用。限制窄会话区的输入框宽度，避免被右栏遮住
- 设置窗口固定玻璃底板、导航和内容区的位置，取消整窗弹性位移与缩放 / 淡入动画，避免裁剪滚动区和嵌套玻璃控件在合成层切换时闪烁；窗口内控件继续使用设置的材质和弹性。在 18765 的 Codex 内置浏览器验证打开、页面切换、滚动及调节模糊度，调节后恢复原值；构建、类型检查和尺寸保护测试通过
- 验证：使用 README 的 `nico-theme-test` / `18765` 在 Codex 内置浏览器检查深浅色、搜索、左右拖宽、右栏分栏及全屏；`pnpm bundle`、`pnpm typecheck`、`node --test tests/lens-resize-guard.test.mjs` 通过。未运行全套 `pnpm visual`

- 小面板补齐菜单、模型列表、指令菜单和提示气泡玻璃；新版右侧栏接入材质。弹窗、待办、审批等按全部实例挂载，不再只处理同类第一个面板。短生命周期面板关闭后释放尺寸监听
- 缩短玻璃挂载等待：面板发现后同步提交并在 layout effect 中插入材质，打开时先有磨砂底，再过渡到 kit 折射。kit 自身约 100ms 的折射图准备过程仍保留；材质参数按值稳定，避免其他面板打开时重新生成已有折射图
- 小弹层与下拉触发按钮接入 kit，材质和悬停参数与大面板共用设置，不额外着色、不覆盖模糊度或透明度，也不按面板另设弹性。移除遮住 kit 材质的宿主底层和重复 backdrop-filter；指令菜单内部列表不再重复挂玻璃
- 设置页的 kit 滑杆、输入框、分段选择、开关和按钮也读取同一组材质 / 高光 / 弹性参数，不再沿用独立默认值；按钮不额外叠加悬停亮度
- 按本机 nico-glass-kit 0.3.2 playground 的 GlassSelect 对齐下拉栏：列表间距 2px、内缩 5px、同心圆角、hover 与 selected 完全读取 kit 的状态色，不自定透明度。下拉选中态和侧栏选中对话使用同一高亮语言及勾选标记；“对话 / 轨迹”使用分段胶囊。面板材质保持设置值，状态高亮与材质分离
- 修复新版轨迹页内层实色表格遮挡玻璃：表格及布局容器背景透明，输入栏可继续采样玻璃后的背景
- 验证：实际 Chromium 中操作并截图检查顶栏菜单、模型菜单及列表、权限菜单、上下文、用量、轨迹与设置；类型检查和构建通过。未运行脚本式视觉断言。待审批、提问、计划确认和后台任务等未在当前会话触发，未声称实测

## 0.3.2

- 适配 **DSH 0.1.7-rc.2**：全部 DSH peer / dev 依赖同步更新，最低宿主版本升到 `0.1.7-rc.2`，Cordis / Schemastery 对齐新版宿主的 `~4.0.4` / `~3.18.4`
- 插件开关卡片迁移到 **设置 → 内置插件 → Nico 主题**（`settings.plugins.tab`）；独立 Nico 设置页保留。移除已删除的 `settings.register` 和旧本地类型补全，改用宿主 `settings.configure({ auto: false })` 避免生成无效的宿主配置页；主题偏好仍保存在浏览器
- 图标迁移到新版 Regular API，修复旧图标导出移除导致的客户端加载失败
- **nico-glass-kit 升到 0.3.2**，更新内联材质与控件构建产物
- 修复新版设置窗口通过 portal 挂在 `#root` 外时漏挂玻璃：面板监听覆盖 body，同时排除 kit 滤镜注册表与材质内部更新
- 修复壁纸模式启动时隐藏的流体画布产生零尺寸 WebGL 错误；画布隐藏期间暂停绘制，切回流体时恢复
- 验证：类型检查、双端构建通过；使用实际 Chromium 浏览器操作并检查设置窗口、材质滑杆、双模式切换、插件开关、会话页和侧栏收起。未运行全套 `pnpm visual`

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
