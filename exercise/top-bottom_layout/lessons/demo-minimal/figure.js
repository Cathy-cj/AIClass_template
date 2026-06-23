// lessons/demo-minimal/figure.js
var TopBottomDemoFigure = {
  svg: null,

  mount: function (slot) {
    slot.innerHTML = ''
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 1040 220')
    svg.setAttribute('role', 'img')
    svg.setAttribute('aria-label', '两车相向而行路线图')
    slot.appendChild(svg)
    this.svg = svg
    this.reset()
  },

  reset: function () {
    if (!this.svg) return
    this.svg.innerHTML = ''
  },

  el: function (tag, attrs, text) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', tag)
    Object.keys(attrs || {}).forEach(function (key) {
      node.setAttribute(key, attrs[key])
    })
    if (text != null) node.textContent = text
    this.svg.appendChild(node)
    return node
  },

  drawBase: function () {
    this.el('line', { x1: 90, y1: 118, x2: 950, y2: 118, stroke: '#0f172a', 'stroke-width': 4, 'stroke-linecap': 'round' })
    this.el('circle', { cx: 90, cy: 118, r: 9, fill: '#fffefb', stroke: '#0f172a', 'stroke-width': 3 })
    this.el('circle', { cx: 950, cy: 118, r: 9, fill: '#fffefb', stroke: '#0f172a', 'stroke-width': 3 })
    this.el('text', { x: 90, y: 86, 'text-anchor': 'middle', 'font-size': 30, fill: '#0f172a', 'font-weight': 700 }, 'A')
    this.el('text', { x: 950, y: 86, 'text-anchor': 'middle', 'font-size': 30, fill: '#0f172a', 'font-weight': 700 }, 'B')
    this.el('text', { x: 520, y: 154, 'text-anchor': 'middle', 'font-size': 24, fill: '#64748b' }, '总路程')
  },

  drawArrow: function (x1, x2, y, label, color) {
    this.el('line', { x1: x1, y1: y, x2: x2, y2: y, stroke: color, 'stroke-width': 3, 'stroke-linecap': 'round' })
    var head = x2 > x1 ? x2 - 12 : x2 + 12
    this.el('path', { d: 'M ' + x2 + ' ' + y + ' L ' + head + ' ' + (y - 7) + ' L ' + head + ' ' + (y + 7) + ' Z', fill: color })
    this.el('text', { x: (x1 + x2) / 2, y: y - 12, 'text-anchor': 'middle', 'font-size': 24, fill: color }, label)
  },

  setState: function (state) {
    this.reset()
    if (!this.svg) return
    this.drawBase()

    if (state === 'speed' || state === 'meet' || state === 'final') {
      this.drawArrow(135, 420, 70, '甲 60 km/h', '#2c74f3')
      this.drawArrow(905, 620, 70, '乙 40 km/h', '#ff6b00')
    }

    if (state === 'meet' || state === 'final') {
      this.el('circle', { cx: 520, cy: 118, r: 11, fill: '#ffd64c', stroke: '#0f172a', 'stroke-width': 2 })
      this.el('text', { x: 520, y: 98, 'text-anchor': 'middle', 'font-size': 24, fill: '#0f172a' }, '相遇')
    }

    if (state === 'final') {
      this.el('rect', { x: 330, y: 166, width: 380, height: 38, rx: 8, fill: 'rgba(96, 210, 165, 0.28)' })
      this.el('text', { x: 520, y: 193, 'text-anchor': 'middle', 'font-size': 24, fill: '#0f172a' }, '总路程 = (60 + 40) × t')
    }
  }
}
