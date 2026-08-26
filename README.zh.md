# dsh-nico-theme

[English](README.md) | 中文

给 [DeepSeek Harness](https://github.com/deepseek-ai/DeepSeek-Harness) 网页端用的可开关 **液态玻璃** 主题。顶栏、侧栏、发送框、各类停靠条和会话垫层变成磨砂玻璃，底下是可调的流体背景（也可换图片 / 视频壁纸）。关掉插件即回到原生界面，不改 DSH 源码。

与 DeepSeek 官方无关。

<p>
  <img src="assets/hero-dark.png" alt="深色模式起始页：流体背景与玻璃发送框" width="100%">
</p>

<p>
  <img src="assets/chat-dark.png" alt="深色模式会话：玻璃顶栏、待办条与阅读垫层" width="49%">
  <img src="assets/rail-dark.png" alt="深色模式收起侧栏，流体铺满主栏" width="49%">
</p>

## 来源

本仓库是 [WYH66666666/DSH-Transparent-UI-Plugin](https://github.com/WYH66666666/DSH-Transparent-UI-Plugin) 的 **fork**（MIT，© 2026 John Wu），适配 **DSH 0.1.1-rc.2**。

圆角 SDF 位移图 → SVG `feDisplacementMap` → 叠在 `backdrop-filter` 模糊上的折射，沿用 [shuding/liquid-glass](https://github.com/shuding/liquid-glass)（MIT，© Shu Ding）里的液态玻璃着色方式。

## 功能

- **云母** 浮动玻璃卡片，或 **兼容** 模式（原生布局 + 磨砂材质）
- 流体背景（色调 / 深浅可调）；可选图片或视频壁纸
- 顶栏、侧栏、发送框、停靠条、接管卡、后台任务下拉的液态折射
- 会话阅读垫层（只垫用户气泡和 AI 主正文）
- 鼠标辉光、悬停下压、1px 描边（均可关）
- 不含自适应字色

## 环境

- `@deepseek-ai/dsh@0.1.1-rc.2`（或 0.1.1 更新的 rc）
- Node.js 22+

## 安装

尚未发 npm，从仓库安装：

```sh
git clone https://github.com/more-nico/dsh-nico-theme.git
cd dsh-nico-theme
pnpm install
pnpm bundle
dsh plugin --profile web add .
```

重启 `dsh web`。在 **设置 → 插件** 打开 **Nico 玻璃主题**。旋钮在 **设置 → 通用设置 → 外观**。

想单独试、不动日常 `web` profile：

```sh
dsh plugin --profile nico-theme-test add .
dsh --profile nico-theme-test --host 127.0.0.1 --port 18765 --no-open
```

## 开发

```sh
pnpm install
pnpm bundle
pnpm visual          # 对测试 profile 跑 Playwright
pnpm readme-shots    # 刷新 assets/ 里的深色流体截图
```

## 许可

[MIT](LICENSE)

- Fork 自 [DSH-Transparent-UI-Plugin](https://github.com/WYH66666666/DSH-Transparent-UI-Plugin)（MIT）
- 液态玻璃折射手法来自 [shuding/liquid-glass](https://github.com/shuding/liquid-glass)（MIT）
