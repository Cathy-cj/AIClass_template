# Widget 词典

所有右侧内容在本布局中都会渲染到下方做题区域，仍然通过 `push` 传参生成。

## text

```js
{ type: 'text', lines: ['第一行说明', '第二行说明'] }
```

## oral

```js
{ type: 'oral', badge: '说一说', question: '从图上你发现了什么？', action: '口答' }
```

## fill

```js
{ type: 'fill', interactive: true, parts: [
  { type: 'text', value: '总路程 = ' },
  { type: 'blank', id: 'distance', width: 80 },
  { type: 'text', value: ' km' }
] }
```

展示态：

```js
{ type: 'fill', value: '300', readonly: true, parts: [
  { type: 'text', value: '总路程 = ' },
  { type: 'blank', id: 'distance' },
  { type: 'text', value: ' km' }
] }
```

## choice

```js
{
  type: 'choice',
  interactive: true,
  options: ['A. 60t', 'B. 40t', 'C. (60+40)t'],
  answer: 'C',
  actions: ['submit'],
  variant: 'paper'
}
```

不传 `actions` 时默认显示提交按钮。需要重置按钮时写 `actions: ['reset', 'submit']`；不需要任何操作按钮时写 `actions: false`。

展示态：

```js
{ type: 'choice', revealed: true, value: 'C', answer: 'C', options: ['A. 60t', 'B. 40t', 'C. (60+40)t'] }
```

## phase

```js
{ type: 'phase', name: 'read', title: '审题' }
```

## readList

```js
{ type: 'readList', kind: 'known', items: ['甲速度 60 km/h', '乙速度 40 km/h'] }
{ type: 'readList', kind: 'ask', items: ['相遇时间'] }
```

## chain

```js
{ type: 'chain', nodes: ['速度和', '时间', '总路程'], prompt: '先找什么关系？' }
```

## solveStep

```js
{ type: 'solveStep', index: 1, title: '列关系式', lines: ['总路程 = (60 + 40) × 时间'] }
```
