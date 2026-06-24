# Widget 词典

所有内容都会渲染到下方整体滚动的做题区域，仍然通过 `push` 传参生成。

## text

```js
{ type: 'text', lines: ['第一行说明', '第二行说明'] }
```

## oral

```js
{ type: 'oral', badge: '想一想', question: '这道题先求什么？', action: '口答' }
```

## fill

```js
{ type: 'fill', interactive: true, parts: [
  { type: 'text', value: '36 ÷ 4 = ' },
  { type: 'blank', id: 'answer', width: 70 },
  { type: 'text', value: ' 本' }
] }
```

展示态：

```js
{ type: 'fill', value: '9', readonly: true, parts: [
  { type: 'text', value: '36 ÷ 4 = ' },
  { type: 'blank', id: 'answer' },
  { type: 'text', value: ' 本' }
] }
```

## choice

```js
{
  type: 'choice',
  interactive: true,
  options: ['A. 36 + 4', 'B. 36 ÷ 4', 'C. 36 × 4'],
  answer: 'B',
  actions: ['submit'],
  variant: 'paper'
}
```

不传 `actions` 时默认显示提交按钮。需要重置按钮时写 `actions: ['reset', 'submit']`；不需要任何操作按钮时写 `actions: false`。

展示态：

```js
{ type: 'choice', revealed: true, value: 'B', answer: 'B', options: ['A. 36 + 4', 'B. 36 ÷ 4', 'C. 36 × 4'] }
```

## phase

```js
{ type: 'phase', name: 'read', title: '审题' }
```

## readList

```js
{ type: 'readList', kind: 'known', items: ['一共 36 本书', '平均分给 4 个小组'] }
{ type: 'readList', kind: 'ask', items: ['每组分几本'] }
```

## chain

```js
{ type: 'chain', nodes: ['总数', '份数', '每份数'], prompt: '平均分问题用哪个关系？' }
```

## solveStep

```js
{ type: 'solveStep', index: 1, title: '列式', lines: ['36 ÷ 4 = 9'] }
```
