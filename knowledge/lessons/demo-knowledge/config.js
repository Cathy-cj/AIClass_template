// lessons/demo-knowledge/config.js
var DEMO_KNOWLEDGE_CONFIG = {
  meta: { id: 'demo-knowledge', title: '圆的认识 — 知识点', tag: '知识点' },
  layout: { designWidth: 1200, designHeight: 680 },
  topics: [
    {
      id: 1,
      layout: 'figure-text',
      figure: DemoKnowledgeFigure,
      steps: [
        {
          id: 1,
          figure: { state: 'circle' },
          push: [
            { type: 'heading', text: '什么是圆' },
            { type: 'text', lines: ['圆是平面上到一个定点距离等于定长的所有点组成的图形。'] }
          ]
        },
        {
          id: 2,
          figure: { state: 'circle-radius', params: { label: 'r' } },
          push: [
            { type: 'text', lines: ['这个定点叫做圆心（用 O 表示），定长叫做半径（用 r 表示）。'] },
            { type: 'oral', badge: '想一想', question: '为什么车轮要做成圆形？' }
          ]
        },
        {
          id: 3,
          figure: { state: 'circle-diameter' },
          push: [
            { type: 'text', lines: ['经过圆心且两端都在圆上的线段叫做直径（用 d 表示）。'] },
            { type: 'chain', nodes: ['半径 r', '直径 d = 2r'], prompt: '直径和半径有什么关系？' }
          ]
        }
      ]
    },
    {
      id: 2,
      layout: 'text-only',
      steps: [
        {
          id: 1,
          push: [
            { type: 'heading', text: '圆的公式' },
            { type: 'text', lines: ['圆的周长：C = 2πr = πd'] },
            { type: 'text', lines: ['圆的面积：S = πr²'] }
          ]
        },
        {
          id: 2,
          push: [
            { type: 'phase', name: '理解', title: '公式中各部分的含义' },
            { type: 'text', lines: ['C 表示周长，即圆一周的长度。'] },
            { type: 'text', lines: ['S 表示面积，即圆所占平面的大小。'] },
            { type: 'text', lines: ['π（读作 pai）是一个常数，约等于 3.14。'] }
          ]
        },
        {
          id: 3,
          push: [
            { type: 'phase', name: '推导', title: '周长公式的来源' },
            { type: 'text', lines: ['古人发现，任意圆的周长与直径的比值是一个固定的数。'] },
            { type: 'text', lines: ['这个比值就是 π ≈ 3.14159265...'] },
            { type: 'text', lines: ['所以周长 C = πd = 2πr。'] }
          ]
        }
      ]
    },
    {
      id: 3,
      layout: 'figure-text',
      figure: { ...DemoKnowledgeFigure, states: { 'radius-equal': '半径相等' } },
      steps: [
        {
          id: 1,
          figure: { state: 'radius-equal' },
          push: [
            { type: 'heading', text: '圆的基本性质' },
            { type: 'text', lines: ['在同一个圆中，所有的半径都相等，所有的直径也都相等。'] }
          ]
        },
        {
          id: 2,
          figure: { state: 'radius-equal' },
          push: [
            { type: 'text', lines: ['直径是圆中最长的线段，且半径和直径都有无数条。'] },
            { type: 'readList', kind: 'known', items: ['半径都相等', '直径都相等', '直径是最长的弦'] }
          ]
        }
      ]
    },
    {
      id: 4,
      layout: 'text-only',
      steps: [
        {
          id: 1,
          push: [
            { type: 'heading', text: '圆的对称性' },
            { type: 'text', lines: ['圆是轴对称图形。'] },
            { type: 'text', lines: ['圆的每一条直径所在的直线都是圆的对称轴。'] }
          ]
        },
        {
          id: 2,
          push: [
            { type: 'text', lines: ['圆有无数条对称轴。'] },
            { type: 'text', lines: ['这使得圆具有高度的对称性和美观性。'] },
            { type: 'oral', badge: '观察', question: '生活中哪些物体利用了圆的对称性？' }
          ]
        }
      ]
    },
    {
      id: 5,
      layout: 'text-only',
      steps: [
        {
          id: 1,
          push: [
            { type: 'heading', text: '圆与其他图形的关系' },
            { type: 'text', lines: ['圆内接正多边形：正多边形的顶点都在圆上。'] },
            { type: 'text', lines: ['正多边形的边数越多，越接近圆。'] }
          ]
        },
        {
          id: 2,
          push: [
            { type: 'text', lines: ['古人用"割圆术"计算圆周率：'] },
            { type: 'text', lines: ['在圆内作正六边形，再作正十二边形……'] },
            { type: 'text', lines: ['边数越多，周长越接近圆的周长。'] }
          ]
        },
        {
          id: 3,
          push: [
            { type: 'text', lines: ['刘徽用正 3072 边形算出 π ≈ 3.1416。'] },
            { type: 'text', lines: ['祖冲之算出 π 在 3.1415926 和 3.1415927 之间。'] },
            { type: 'text', lines: ['这是中国古代数学的伟大成就。'] }
          ]
        }
      ]
    }
  ]
}
