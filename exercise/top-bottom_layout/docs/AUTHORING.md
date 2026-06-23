# top-bottom_layout 写课规则

## 适用场景

这个布局用于“图很宽、文字和交互在下方”的题型，例如：

- 行程问题的路线图、时间轴、相遇追及图。
- 指数问题的增长曲线、表格轴、流程图。
- 需要横向展开的线段图或关系图。

如果图形更适合放在左侧，继续使用 `left-right_layout`。

## 核心契约

- `lesson.go(n)` 会清空做题区，逻辑重放 `steps[1..n]`，再设置横向示意图到第 n 步状态。
- 每个 step 的 `push` 只写本步新增内容。
- 交互后的展示态必须写进后续 step，例如 `value`、`revealed`、`readonly`。
- 具体课题只改 `config.js` 和 `figure.js`。

## 分层边界

- `core/Frame.js`：只管 top / figure / scroll 的纵向结构。
- `figure.js`：只管横向示意图，至少实现 `mount(slot)`、`setState(state, params)`、`reset()`。
- `widgets`：把 `push` 配置渲染为做题内容，可以调用 `AIClass_template/component`。
- `component`：通用 UI 组件，不写题目业务逻辑。

## 顶部题目区

```js
top: {
  tag: '例题',
  title: '甲、乙两人从两地同时出发，相向而行。',
  lines: ['观察路线图，先找速度、时间和路程的关系。']
}
```

## 横向示意图区

横向图建议占满可用宽度，由 `layout.figureHeight` 控制区域高度：

```js
layout: {
  figureHeight: 230,
  figureSvgWidth: 1040
}
```

`figure.js` 中的 SVG 应优先使用横向 viewBox，例如：

```js
svg.setAttribute('viewBox', '0 0 1040 220')
```

## Step 示例

```js
{
  id: 2,
  figure: { state: 'mark-speed' },
  push: [
    { type: 'phase', name: 'read', title: '审题' },
    { type: 'readList', kind: 'known', items: ['甲速度 60 km/h', '乙速度 40 km/h'] }
  ]
}
```

## 禁止事项

- 不要在 `push` 里直接塞横向大图；图统一由 `figure.js` 管理。
- 不要在单个 lesson 里手写选择题 DOM，使用 `{ type: 'choice', ... }`。
- 不要为了单题修改 `core/` 或 `component/`。
