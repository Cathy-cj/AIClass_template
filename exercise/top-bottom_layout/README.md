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
    Frame.js               # 纵向组装 top / figure / scroll
  theme/
    grid-paper.css         # 上下布局主题、横向图片区和做题区样式
  docs/
    AUTHORING.md           # 写课规则
    WIDGET_CATALOG.md      # widget 参数说明
  lessons/
    _template/             # 新课复制骨架
    demo-minimal/          # 横向示意图 demo
```

`Runner`、`Scroll`、`InteractionGate`、`widgets` 等运行件先复用现有通用契约；本布局只重写和空间结构有关的 `Frame`、主题、文档与示例。

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
