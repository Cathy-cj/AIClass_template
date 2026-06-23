# Widget 词典

所有右侧内容都通过 `push` 里的 widget 传参生成。

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

展示态：

```js
{ type: 'choice', revealed: true, value: 'B', answer: 'B', options: ['A. 30°', 'B. 60°'] }
```

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
