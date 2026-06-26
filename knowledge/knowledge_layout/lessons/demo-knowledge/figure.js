// lessons/demo-knowledge/figure.js
var DemoKnowledgeFigure = {
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
    var svg = ''
    if (state === 'radius-equal') {
      svg = ''
        + '<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;overflow:visible">'
        + '<circle cx="130" cy="130" r="78" fill="none" stroke="#0D315A" stroke-width="4"/>'
        + '<circle cx="130" cy="130" r="5" fill="#0D315A"/>'
        + '<line x1="130" y1="130" x2="208" y2="130" stroke="#FF6B00" stroke-width="3.5" stroke-linecap="round"/>'
        + '<text x="172" y="119" text-anchor="middle" font-size="20" fill="#FF6B00" font-weight="700">r₁</text>'
        + '<line x1="130" y1="130" x2="90" y2="60" stroke="#2C74F3" stroke-width="3.5" stroke-linecap="round"/>'
        + '<text x="102" y="82" text-anchor="middle" font-size="20" fill="#2C74F3" font-weight="700">r₂</text>'
        + '</svg>'
    } else {
      var showRadius = state === 'circle-radius' || state === 'circle-diameter'
      var showDiameter = state === 'circle-diameter'
      var label = params.label || 'r'
      svg = ''
        + '<svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;overflow:visible">'
        + '<circle cx="130" cy="130" r="78" fill="none" stroke="#0D315A" stroke-width="4"/>'
        + '<circle cx="130" cy="130" r="5" fill="#0D315A"/>'
        + (showRadius ? '<line x1="130" y1="130" x2="208" y2="130" stroke="#FF6B00" stroke-width="4" stroke-linecap="round"/><text x="170" y="119" text-anchor="middle" font-size="22" fill="#FF6B00" font-weight="700">' + label + '</text>' : '')
        + (showDiameter ? '<line x1="52" y1="130" x2="208" y2="130" stroke="#2C74F3" stroke-width="3" stroke-linecap="round"/><text x="130" y="106" text-anchor="middle" font-size="22" fill="#2C74F3" font-weight="700">2r</text>' : '')
        + '</svg>'
    }
    this._slot.innerHTML = svg
  },
  teardown: function () {
    this.reset()
    this._slot = null
  }
}
