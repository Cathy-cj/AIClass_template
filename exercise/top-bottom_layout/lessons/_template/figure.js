// lessons/_template/figure.js
var TemplateTopBottomFigure = {
  svg: null,

  mount: function (slot) {
    slot.innerHTML = ''
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 1040 220')
    svg.setAttribute('role', 'img')
    svg.setAttribute('aria-label', '横向示意图')
    slot.appendChild(svg)
    this.svg = svg
    this.reset()
  },

  reset: function () {
    if (!this.svg) return
    this.svg.innerHTML = ''
  },

  setState: function (state) {
    this.reset()
    if (!this.svg) return
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', '90')
    line.setAttribute('y1', '110')
    line.setAttribute('x2', '950')
    line.setAttribute('y2', '110')
    line.setAttribute('stroke', '#0f172a')
    line.setAttribute('stroke-width', '4')
    line.setAttribute('stroke-linecap', 'round')
    this.svg.appendChild(line)

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('x', '520')
    text.setAttribute('y', '88')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('font-size', '28')
    text.setAttribute('fill', '#0f172a')
    text.textContent = state || 'intro'
    this.svg.appendChild(text)
  }
}
