# AIClass Component

`component` 是可复用 UI 组件层，只负责 DOM 结构、样式状态和基础交互回调。它不认识 lesson、step、widget registry，也不直接调用提交网关。

## 目录职责

```text
component/
  index.js
  button/
    Button.js
    button.css
  choice/
    ChoiceQuestion.js
    choice.css
  shared/
    dom.js
    option.js
```

- `button/`：提交、重置等按钮组件。
- `choice/`：选择题组件，包含选项网格、选中态、揭示态和操作区。
- `shared/`：组件内部共享的小工具，不放业务逻辑。

## 依赖方向

- `exercise` 可以调用 `component`。
- `component` 不能依赖 `exercise`、`AIClassWidgetRegistry`、`AIClassInteractionGate` 或 lesson config。
- 组件通过 `onSubmit(value)`、`onChange(value)`、`onReset()` 等回调把事件交给外层。

## 命名规范

- 全局命名空间：`window.AIClassComponent`。
- CSS 前缀：`aic-`。
- 状态 class：`is-selected`、`is-correct`、`is-wrong`、`is-disabled`、`is-revealed`。

## API 示例

```js
var submit = AIClassComponent.createSubmitButton({
  text: '提交',
  onClick: function () {}
})
```

```js
var choice = AIClassComponent.createChoiceQuestion({
  options: ['A. 30°', 'B. 60°'],
  answer: 'B',
  variant: 'paper',
  actions: ['submit'],
  interactive: true,
  onSubmit: function (value) {}
})

host.appendChild(choice.el)
```

`createChoiceQuestion` 返回：

- `el`：组件根节点。
- `getValue()`：读取当前选中值。
- `setValue(value)`：设置选中值。
- `setDisabled(disabled)`：禁用或启用交互。
- `reveal(answer)`：显示正确答案。
- `reset()`：清空选中与展示态。

## 选择题风格

- `variant: 'paper'`：默认风格，像在方格纸上作答；没有卡片外框，用圆形选择点、底线和淡色笔迹高亮表达状态。
- `variant: 'plain'`：更轻的文字列表风格，适合不需要 radio 视觉的场景。

## 选择题操作按钮

- 不传 `actions`：默认显示 `['submit']`。
- `actions: ['reset', 'submit']`：显示重置和提交。
- `actions: false`：不显示操作按钮。

按钮文案通过 `submitText`、`resetText` 覆盖。
