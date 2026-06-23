# AIClass_template 写课规则

## 核心契约

模板采用方案 A：`lesson.go(n)` 会清空内容区，逻辑重放 `steps[1..n]`，一次性挂载右侧块，再把左图设置为第 n 步应有的最终状态。

因此：

- 每个 step 的 `push` 只写本步新增内容。
- 不要在配置里写“如果前面没出现过就补 UI”。
- 跳到任意一步、回退、重复点击同一步，画面都应一致。
- 交互后的展示态必须写进后续 step 的配置，例如 `value`、`revealed`、`readonly`。

## 每题只改两个文件

- `config.js`：课程元信息、layout、steps。
- `figure.js`：左图状态机，至少实现 `mount(slot)`、`setState(state, params)`、`reset()`。

`AIClass_template/core` 是模板核心，写题时不要改。

## 布局参数

大多数题目不需要传 layout，直接使用模板默认比例。确实需要调整时，只改这些字段：

```js
layout: {
  figureWidth: 360,     // 左侧图片区宽度
  figureSvgWidth: 300,  // 图本身最大宽度
  gap: 32,              // 图文间距
  edgePad: 32,          // 舞台左右安全边距
  mainPadding: '0 32px',
  scrollPadding: '0 0 160px 0'
}
```

不要在单个 widget 内写布局宽度；区域比例应由 layout 和主题变量统一控制。

## 顶部题干区

如果题目需要顶部说明，使用 `top`。它是自适应高度，不写固定高度；内容越多，下方左右图文区自动使用剩余高度。

```js
top: {
  tag: '例题',
  title: '用量角器测量下面角的度数',
  lines: ['∠ABC——顶点 B，边 BA 和 BC，度数未知。']
}
```

不传 `top` 时，顶部题干区完全不占位。

## Step 示例

```js
{
  id: 2,
  figure: { state: 'circle-radius', params: { label: 'r' } },
  push: [
    { type: 'text', lines: ['圆心到圆上一点的线段叫半径。'] },
    { type: 'oral', badge: '说一说', question: '半径有什么特点？' }
  ],
  focus: 'figure'
}
```

## 交互展示态

```js
{
  id: 4,
  push: [
    { type: 'fill', interactive: true, parts: [
      { type: 'text', value: '直径 = ' },
      { type: 'blank', id: 'diam' },
      { type: 'text', value: ' r' }
    ] }
  ]
}
```

下一步如果需要显示已经填写：

```js
{
  id: 5,
  push: [
    { type: 'fill', value: '2', readonly: true, parts: [
      { type: 'text', value: '直径 = ' },
      { type: 'blank', id: 'diam' },
      { type: 'text', value: ' r' }
    ] }
  ]
}
```

## 禁止事项

- 不要把 SVG 或大图放进 `push`。
- 不要在 widget 里写课题专用逻辑。
- 不要用 `right/add` 双语义；统一使用 `push`，新模块第一步加 `section`。
