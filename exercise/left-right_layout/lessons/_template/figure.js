// lessons/_template/figure.js
var TemplateFigure = {
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
    this._slot.innerHTML = ''
      + '<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">'
      + '<rect x="12" y="12" width="196" height="196" rx="18" fill="#F8FAFC" stroke="#CBD5E1"/>'
      + '<text x="110" y="106" text-anchor="middle" font-size="20" fill="#0D315A">' + (params.label || state || 'intro') + '</text>'
      + '</svg>'
  },
  teardown: function () {
    this.reset()
    this._slot = null
  }
}
