// lessons/demo-minimal/config.js
var DEMO_MINIMAL_CONFIG = {
  meta: {
    id: 'demo-minimal',
    title: '通用模板最小演示',
    tag: 'Demo',
    question: '验证 go(n) 跳步、回退、重复点击都能正常显示'
  },
  layout: {
    theme: 'grid-paper'
  },
  top: {
    tag: '演示题',
    title: '已知半径 r，观察圆中的半径、直径与周长。已知半径 r，观察圆中的半径、直径与周长',
    lines: [
      '顶部题干区高度不固定，会根据文字多少自动撑开。',
      '下方左侧图片区和右侧文字区会自动使用剩余空间。'
    ]
  },
  figure: DemoMinimalFigure,
  figureStates: {
    circle: '只画圆',
    'circle-radius': '圆上画半径',
    'circle-diameter': '圆上画直径',
    'circle-perimeter': '高亮圆周',
    'circle-final': '显示最终结论'
  },
  steps: [
    {
      id: 1,
      section: { tag: '模板验证', title: '圆的基础图形' },
      figure: { state: 'circle' },
      push: [
        { type: 'text', lines: ['左侧图槽只负责画图，右侧内容只负责文字和交互。'] }
      ]
    },
    {
      id: 2,
      figure: { state: 'circle-radius', params: { label: 'r' } },
      push: [
        { type: 'text', lines: ['现在在圆上画一条半径 r。'] },
        { type: 'oral', badge: '说一说', question: '半径是从哪里到哪里？' }
      ],
      focus: 'figure'
    },
    {
      id: 3,
      figure: { state: 'circle-diameter' },
      push: [
        { type: 'chain', nodes: ['半径 r', '直径 2r'], prompt: '直径和半径有什么关系？' }
      ]
    },
    {
      id: 4,
      push: [
        { type: 'fill', interactive: true, parts: [
          { type: 'text', value: '直径 = ' },
          { type: 'blank', id: 'demo-diam' },
          { type: 'text', value: ' r' }
        ] }
      ]
    },
    {
      id: 5,
      push: [
        { type: 'fill', value: '2', readonly: true, parts: [
          { type: 'text', value: '直径 = ' },
          { type: 'blank', id: 'demo-diam-review' },
          { type: 'text', value: ' r' }
        ] },
        { type: 'text', lines: ['跳到第 5 步时，前 1～4 步内容会自动重放出来。'] }
      ]
    },
    {
      id: 6,
      section: { tag: '解题型', title: '审题与关系链' },
      figure: { state: 'circle-perimeter' },
      push: [
        { type: 'phase', name: 'read', title: '审题' },
        { type: 'readList', kind: 'known', items: ['① 已知半径 r', '② 圆的周长要求出来'] },
        { type: 'readList', kind: 'ask', items: ['圆的周长'] }
      ]
    },
    {
      id: 7,
      push: [
        { type: 'phase', name: 'think', title: '找关系' },
        { type: 'chain', nodes: ['半径 r', '直径 2r', '圆周长'], prompt: '知道半径后，先找到直径，再想周长公式。' }
      ]
    },
    {
      id: 8,
      push: [
        { type: 'choice', interactive: true, options: [
          'A. 周长 = r × 2',
          'B. 周长 = 2πr',
          'C. 周长 = r + 2'
        ], answer: 'B' }
      ]
    },
    {
      id: 9,
      figure: { state: 'circle-final' },
      push: [
        { type: 'choice', revealed: true, value: 'B', answer: 'B', options: [
          'A. 周长 = r × 2',
          'B. 周长 = 2πr',
          'C. 周长 = r + 2'
        ] },
        { type: 'solveStep', index: 1, title: '写出公式', lines: ['圆的周长 = 2πr'] }
      ]
    },
    {
      id: 10,
      push: [
        { type: 'phase', name: 'review', title: '复盘' },
        { type: 'text', lines: [
          '第 10 步会自动重放前 1～9 步的所有内容。',
          '左图仍停在最终状态，右侧滚动到底部，适合检查模板的独立展示效果。'
        ] }
      ]
    }
  ]
}
