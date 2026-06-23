# Widget 词典

所有右侧内容都通过 `push` 里的 widget 传参生成。这里记录的是 lesson 配置参数；widget 实现属于适配层，可以调用 `AIClass_template/component`，但不要写课题专用逻辑。

## heading

```js
{ type: 'heading', text: '课题标题', tag: '练习', level: 2 }
```

## section

通常由 step 的 `section` 自动生成：

```js
section: { tag: '模块1', title: '认识圆' }
```

也可作为 widget：

```js
{ type: 'section', tag: '模块1', title: '认识圆' }
```

## text

```js
{ type: 'text', lines: ['第一行说明', '第二行说明'] }
```

## oral

```js
{ type: 'oral', badge: '说一说', question: '你发现了什么？', action: '口答' }
```

## fill

```js
{ type: 'fill', interactive: true, parts: [
  { type: 'text', value: '答案 = ' },
  { type: 'blank', id: 'answer', width: 60 }
] }
```

展示态：

```js
{ type: 'fill', value: '60', readonly: true, parts: [
  { type: 'text', value: '答案 = ' },
  { type: 'blank', id: 'answer' }
] }
```

## choice

```js
{ type: 'choice', interactive: true, options: ['A. 30°', 'B. 60°'], answer: 'B' }
```

可选参数：

```js
{
  type: 'choice',
  interactive: true,
  options: ['A. 30°', 'B. 60°'],
  answer: 'B',
  actions: ['submit'],
  submitText: '提交',
  resetText: '重置',
  requiredText: '请选择答案',
  variant: 'paper'
}
```

`variant: 'paper'` 是默认纸面风格：无卡片外框，用圆形选择点、底线和淡色高亮表达状态。`variant: 'plain'` 是更轻的文字列表风格。

不传 `actions` 时默认显示提交按钮。需要重置按钮时写 `actions: ['reset', 'submit']`；不需要任何操作按钮时写 `actions: false`。

展示态：

```js
{ type: 'choice', revealed: true, value: 'B', answer: 'B', options: ['A. 30°', 'B. 60°'] }
```

选择题由 `AIClass_template/component/choice` 渲染。widget 只负责把 lesson 配置适配到组件，并把 `onSubmit(value)` 接回交互网关。

## phase

```js
{ type: 'phase', name: 'read', title: '审题' }
```

## readList

```js
{ type: 'readList', kind: 'known', items: ['① 半径 r', '② 圆内切于正方形'] }
{ type: 'readList', kind: 'ask', items: ['正方形周长'] }
```

## chain

```js
{ type: 'chain', nodes: ['半径 r', '直径', '边长', '周长'], prompt: '先求什么？' }
```

## solveStep

```js
{ type: 'solveStep', index: 1, title: '求直径', lines: ['直径 = 2r'] }
```
