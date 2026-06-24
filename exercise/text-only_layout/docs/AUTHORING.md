# text-only_layout 写课规则

## 适用场景

这个布局用于“只有题目和文字解题过程”的题型，例如：

- 应用题、巧算题、文字推理题。
- 不需要单独示意图区域的选择、填空、分步讲解。
- 题干固定在顶部，下面解题过程需要整体滚动。

## 核心契约

- `lesson.go(n)` 会清空做题区，逻辑重放 `steps[1..n]`。
- 每个 step 的 `push` 只写本步新增内容。
- 交互后的展示态必须写进后续 step，例如 `value`、`revealed`、`readonly`。
- 具体课题只改 `config.js`；本布局没有 `figure.js`。

## 分层边界

- `core/Frame.js`：只管固定题目区和滚动做题区。
- `widgets/`：把 `push` 配置渲染为做题内容，可以调用 `AIClass_template/component`。
- `component/`：提交按钮、选择题等可复用 UI 组件，不写题目业务逻辑。

## 顶部题目区

```js
top: {
  tag: '应用题',
  title: '学校买来 36 本书，平均分给 4 个小组，每组分几本？',
  lines: ['先读清楚已知条件，再列式计算。']
}
```

## Step 示例

```js
{
  id: 2,
  push: [
    { type: 'phase', name: 'read', title: '审题' },
    { type: 'readList', kind: 'known', items: ['一共 36 本书', '平均分给 4 个小组'] },
    { type: 'readList', kind: 'ask', items: ['每组分几本'] }
  ]
}
```

## 禁止事项

- 不要在本布局配置里写 `figure`。
- 不要把 SVG 或大图塞进 `push`。
- 不要在单个 lesson 里手写选择题 DOM，使用 `{ type: 'choice', ... }`。
- 不要为了单题修改 `core/` 或 `component/`。
