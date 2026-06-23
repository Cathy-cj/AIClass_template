// lessons/demo-minimal/figure.js
var DemoMinimalFigure = {
  _slot: null,
  mount: function (slot) {
    this._slot = slot
    this.reset()
  },
  reset: function () {
    if (this._slot) this._slot.innerHTML = ''
  },
  setState: function (state, params) {
    params = params || {}
    if (!this._slot) return
    var showRadius = state === 'circle-radius' || state === 'circle-diameter' || state === 'circle-perimeter' || state === 'circle-final'
    var showDiameter = state === 'circle-diameter' || state === 'circle-perimeter' || state === 'circle-final'
    var showPerimeter = state === 'circle-perimeter' || state === 'circle-final'
    var label = params.label || 'r'
    this._slot.innerHTML = ''
      + '<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;overflow:visible">'
      + '<circle cx="130" cy="130" r="78" fill="none" stroke="' + (showPerimeter ? '#2E7D32' : '#0D315A') + '" stroke-width="' + (showPerimeter ? '6' : '4') + '"/>'
      + '<circle cx="130" cy="130" r="5" fill="#0D315A"/>'
      + (showRadius ? '<line x1="130" y1="130" x2="208" y2="130" stroke="#FF6B00" stroke-width="4" stroke-linecap="round"/><text x="170" y="119" text-anchor="middle" font-size="22" fill="#FF6B00" font-weight="700">' + label + '</text>' : '')
      + (showDiameter ? '<line x1="52" y1="130" x2="208" y2="130" stroke="#2C74F3" stroke-width="3" stroke-linecap="round"/><text x="130" y="106" text-anchor="middle" font-size="22" fill="#2C74F3" font-weight="700">2r</text>' : '')
      + (state === 'circle-final' ? '<text x="130" y="232" text-anchor="middle" font-size="18" fill="#2E7D32" font-weight="700">周长 = 2πr</text>' : '')
      + '</svg>'
  },
  teardown: function () {
    this.reset()
    this._slot = null
  }
}
