// lessons/demo-minimal/config.js
var TEXT_ONLY_DEMO_CONFIG = {
  meta: {
    id: 'text-only-demo',
    title: '纯文字布局最小演示',
    question: '验证固定题目区 + 下方整体滚动做题区'
  },
  layout: {
    theme: 'grid-paper'
  },
  top: {
    title: '学校买来 36 本书，平均分给 4 个小组，每组分几本？',
    lines: ['先读清楚已知条件，再选择关系并列式计算。']
  },
  steps: [
    {
      id: 1,
      section: { title: '读题：理解题意' },
      push: [
        { type: 'text', lines: ['这是一道平均分问题，顶部题目固定，下方步骤内容会整体滚动。'] }
      ]
    },
    {
      id: 2,
      push: [
        { type: 'phase', name: 'read', title: '审题' },
        { type: 'readList', kind: 'known', items: ['一共 36 本书', '平均分给 4 个小组'] },
        { type: 'readList', kind: 'ask', items: ['每组分几本'] }
      ]
    },
    {
      id: 3,
      push: [
        { type: 'chain', nodes: ['总数', '份数', '每份数'], prompt: '平均分问题：总数 ÷ 份数 = 每份数。' }
      ]
    },
    {
      id: 4,
      push: [
        { type: 'choice', interactive: true, options: [
          'A. 36 + 4',
          'B. 36 ÷ 4',
          'C. 36 × 4'
        ], answer: 'B', actions: ['reset', 'submit'], requiredText: '先选择一个算式' }
      ]
    },
    {
      id: 5,
      push: [
        { type: 'choice', revealed: true, value: 'B', answer: 'B', options: [
          'A. 36 + 4',
          'B. 36 ÷ 4',
          'C. 36 × 4'
        ] },
        { type: 'fill', interactive: true, parts: [
          { type: 'text', value: '36 ÷ 4 = ' },
          { type: 'blank', id: 'books-answer', width: 70 },
          { type: 'text', value: ' 本' }
        ] }
      ]
    },
    {
      id: 6,
      push: [
        { type: 'fill', value: '9', readonly: true, parts: [
          { type: 'text', value: '36 ÷ 4 = ' },
          { type: 'blank', id: 'books-answer-review' },
          { type: 'text', value: ' 本' }
        ] },
        { type: 'solveStep', index: 1, title: '答题', lines: ['答：每组分 9 本。'] }
      ]
    }
  ]
}
