// lessons/demo-minimal/config.js
var TOP_BOTTOM_DEMO_CONFIG = {
  meta: {
    id: 'top-bottom-demo',
    title: '上下布局最小演示',
    question: '验证横向示意图 + 下方做题区域'
  },
  layout: {
    theme: 'grid-paper',
    figureHeight: 230,
    figureSvgWidth: 1040,
    scrollPadding: '8px 36px 160px'
  },
  top: {
    title: '甲、乙两车从 A、B 两地同时出发，相向而行。',
    lines: ['观察横向路线图，先找速度和，再列相遇关系。']
  },
  figure: TopBottomDemoFigure,
  figureStates: {
    route: '只显示 A、B 两地',
    speed: '标出两车速度',
    meet: '标出相遇点',
    final: '显示关系式'
  },
  steps: [
    {
      id: 1,
      section: { title: '读图：横向路线图' },
      figure: { state: 'route' },
      push: [
        { type: 'text', lines: ['这类图横向很长，适合放在题目下方整行展示。'] }
      ]
    },
    {
      id: 2,
      figure: { state: 'speed' },
      push: [
        { type: 'phase', name: 'read', title: '审题' },
        { type: 'readList', kind: 'known', items: ['甲车速度 60 km/h', '乙车速度 40 km/h'] },
        { type: 'readList', kind: 'ask', items: ['相遇时间 t'] }
      ]
    },
    {
      id: 3,
      push: [
        { type: 'chain', nodes: ['甲速度', '乙速度', '速度和', '时间', '总路程'], prompt: '相向而行时，先找什么？' }
      ]
    },
    {
      id: 4,
      figure: { state: 'meet' },
      push: [
        { type: 'choice', interactive: true, options: [
          'A. 60t',
          'B. 40t',
          'C. (60 + 40)t'
        ], answer: 'C', actions: ['reset', 'submit'], requiredText: '先选择一个关系式' }
      ]
    },
    {
      id: 5,
      figure: { state: 'final' },
      push: [
        { type: 'choice', revealed: true, value: 'C', answer: 'C', options: [
          'A. 60t',
          'B. 40t',
          'C. (60 + 40)t'
        ] },
        { type: 'solveStep', index: 1, title: '列关系式', lines: ['总路程 = (60 + 40) × t'] }
      ]
    }
  ]
}
