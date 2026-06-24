# AIClass text-only_layout

纯文字课件模板，适合应用题、巧算题、文字推理题等不需要独立示意图区的题型。

## 布局结构

```text
┌──────────────────────────────┐
│ top 固定题目区                │
├──────────────────────────────┤
│ scroll 整体滚动做题区          │
└──────────────────────────────┘
```

## 目录职责

```text
text-only_layout/
  index.js                 # 纯文字布局入口
  core/
    LayoutStage.js         # 设计稿舞台、等比缩放、背景网格对齐
    Frame.js               # 组装 top / scroll
    replayAccumulate.js    # go(n) 的 1..n 逻辑重放
    Runner.js              # 对外 run/go 生命周期
    Scroll.js              # 滚动到当前步骤
    InteractionGate.js     # 仅当前步骤可交互
    Lesson.js              # Lesson.create / bindBtns
  widgets/
    registry.js            # widget 注册和 mountAll
    *.js                   # 做题区内容块
  theme/
    grid-paper.css         # 纯文字主题和滚动区样式
  schema/
    lesson.schema.json     # config 约束
  docs/
    AUTHORING.md           # 写课规则
    WIDGET_CATALOG.md      # widget 参数说明
  lessons/
    _template/             # 新课复制骨架
    demo-minimal/          # 纯文字 demo
```

`text-only_layout` 是完整独立的布局包，不依赖其他布局包的 core、figure 或 widgets。

## 核心约定

- 顶部题目区使用 `top`，固定在上方，不跟随做题内容滚动。
- 下方做题区是一个整体滚动区域，只通过 `push: [{ type, ...props }]` 生成。
- 本布局没有 `figure` 契约，不写 `figure.js`，也不在配置里写 `figure` 状态。

## 常用 layout 参数

```js
layout: {
  theme: 'grid-paper',
  edgePad: 56,
  topPadding: '0 56px 14px',
  scrollPadding: '10px 56px 160px'
}
```
