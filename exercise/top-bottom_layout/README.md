# AIClass top-bottom_layout

上下结构课件模板，适合横向示意图很长的题型，例如行程问题、时间轴、线段图、指数增长图和流程图。

## 布局结构

```text
┌──────────────────────────────┐
│ top 题目区                    │
├──────────────────────────────┤
│ figure 横向示意图区            │
├──────────────────────────────┤
│ scroll / content 做题区域      │
└──────────────────────────────┘
```

## 目录职责

```text
top-bottom_layout/
  index.js                 # 上下布局入口
  core/
    LayoutStage.js         # 设计稿舞台、等比缩放、背景网格对齐
    Frame.js               # 纵向组装 top / figure / scroll
    replayAccumulate.js    # go(n) 的 1..n 逻辑重放
    Runner.js              # 对外 run/go 生命周期
    Scroll.js              # 滚动到当前步骤
    InteractionGate.js     # 仅当前步骤可交互
    Lesson.js              # Lesson.create / bindBtns
  figure/
    FigureHost.js          # figure.mount / setState / reset 适配
  widgets/
    registry.js            # widget 注册和 mountAll
    *.js                   # 下方做题区内容块
  theme/
    grid-paper.css         # 上下布局主题、横向图片区和做题区样式
  schema/
    lesson.schema.json     # config 约束
  docs/
    AUTHORING.md           # 写课规则
    WIDGET_CATALOG.md      # widget 参数说明
  lessons/
    _template/             # 新课复制骨架
    demo-minimal/          # 横向示意图 demo
```

`top-bottom_layout` 是完整独立的布局包，不依赖其他布局包的 core、figure 或 widgets。不同布局可以采用相同契约，但文件维护边界彼此独立。

## 核心约定

- `lesson.go(n)` 仍然重放 `steps[1..n]`。
- 横向示意图只通过 `figure.setState(state, params)` 改变。
- 做题区域只通过 `push: [{ type, ...props }]` 生成。
- 不要把题目专用逻辑写进 `core/` 或通用组件。

## 常用 layout 参数

```js
layout: {
  theme: 'grid-paper',
  figureHeight: 230,
  figureSvgWidth: 1040,
  edgePad: 36,
  topPadding: '0 36px 12px',
  figurePadding: '0 36px 14px',
  scrollPadding: '10px 36px 160px'
}
```
