// AIClass_template/knowledge/core/DebugPanel.js
;(function () {
  var STYLE = '\
    .kn-debug-panel {\
      position: fixed;\
      bottom: 16px;\
      right: 16px;\
      z-index: 9999;\
      background: rgba(15, 23, 42, 0.92);\
      color: #e2e8f0;\
      border-radius: 10px;\
      padding: 12px 16px;\
      font: 600 14px/1.4 "Inter", "Microsoft YaHei", sans-serif;\
      box-shadow: 0 4px 24px rgba(0,0,0,0.3);\
      display: flex;\
      flex-direction: column;\
      gap: 8px;\
      min-width: 220px;\
      user-select: none;\
    }\
    .kn-debug-row {\
      display: flex;\
      align-items: center;\
      gap: 8px;\
    }\
    .kn-debug-label {\
      color: #94a3b8;\
      font-size: 12px;\
      min-width: 36px;\
    }\
    .kn-debug-value {\
      color: #38bdf8;\
      font-weight: 700;\
      font-size: 15px;\
    }\
    .kn-debug-progress {\
      color: #64748b;\
      font-size: 12px;\
    }\
    .kn-debug-btns {\
      display: flex;\
      gap: 6px;\
      margin-top: 4px;\
    }\
    .kn-debug-btn {\
      appearance: none;\
      border: none;\
      border-radius: 6px;\
      padding: 6px 14px;\
      font: 600 13px/1 inherit;\
      cursor: pointer;\
      transition: background 0.15s, opacity 0.15s;\
    }\
    .kn-debug-btn:disabled {\
      opacity: 0.35;\
      cursor: not-allowed;\
    }\
    .kn-debug-btn--prev { background: #334155; color: #e2e8f0; }\
    .kn-debug-btn--prev:hover:not(:disabled) { background: #475569; }\
    .kn-debug-btn--next { background: #2563eb; color: #fff; }\
    .kn-debug-btn--next:hover:not(:disabled) { background: #1d4ed8; }\
  '

  function injectStyle() {
    if (document.getElementById('kn-debug-style')) return
    var style = document.createElement('style')
    style.id = 'kn-debug-style'
    style.textContent = STYLE
    document.head.appendChild(style)
  }

  function hasDebugParam() {
    return /[?&]t(?:&|=|$)/.test(window.location.search)
  }

  function DebugPanel(runner) {
    if (!hasDebugParam()) return

    this.runner = runner
    this.el = null
    this.topicValue = null
    this.stepValue = null
    this.progressValue = null
    this.prevBtn = null
    this.nextBtn = null
    this.flatIndex = -1

    injectStyle()
    this._render()
    this._update()
  }

  DebugPanel.prototype._render = function () {
    var el = document.createElement('div')
    el.className = 'kn-debug-panel'

    // Topic row
    var topicRow = document.createElement('div')
    topicRow.className = 'kn-debug-row'
    var topicLabel = document.createElement('span')
    topicLabel.className = 'kn-debug-label'
    topicLabel.textContent = '主题'
    this.topicValue = document.createElement('span')
    this.topicValue.className = 'kn-debug-value'
    topicRow.appendChild(topicLabel)
    topicRow.appendChild(this.topicValue)
    el.appendChild(topicRow)

    // Step row
    var stepRow = document.createElement('div')
    stepRow.className = 'kn-debug-row'
    var stepLabel = document.createElement('span')
    stepLabel.className = 'kn-debug-label'
    stepLabel.textContent = '步骤'
    this.stepValue = document.createElement('span')
    this.stepValue.className = 'kn-debug-value'
    stepRow.appendChild(stepLabel)
    stepRow.appendChild(this.stepValue)
    el.appendChild(stepRow)

    // Progress row
    var progressRow = document.createElement('div')
    progressRow.className = 'kn-debug-row'
    this.progressValue = document.createElement('span')
    this.progressValue.className = 'kn-debug-progress'
    progressRow.appendChild(this.progressValue)
    el.appendChild(progressRow)

    // Buttons
    var btns = document.createElement('div')
    btns.className = 'kn-debug-btns'

    var self = this

    this.prevBtn = document.createElement('button')
    this.prevBtn.className = 'kn-debug-btn kn-debug-btn--prev'
    this.prevBtn.textContent = '← 上一步'
    this.prevBtn.addEventListener('click', function () { self._prev() })

    this.nextBtn = document.createElement('button')
    this.nextBtn.className = 'kn-debug-btn kn-debug-btn--next'
    this.nextBtn.textContent = '下一步 →'
    this.nextBtn.addEventListener('click', function () { self._next() })

    btns.appendChild(this.prevBtn)
    btns.appendChild(this.nextBtn)
    el.appendChild(btns)

    document.body.appendChild(el)
    this.el = el
  }

  DebugPanel.prototype._update = function () {
    var all = this.runner.linearSteps()
    var total = all.length

    if (this.flatIndex < 0 || this.flatIndex >= total) {
      this.topicValue.textContent = '—'
      this.stepValue.textContent = '—'
      this.progressValue.textContent = '0 / ' + total
      this.prevBtn.disabled = true
      this.nextBtn.disabled = total === 0
      return
    }

    var cur = all[this.flatIndex]
    this.topicValue.textContent = cur.topicId
    this.stepValue.textContent = cur.stepId
    this.progressValue.textContent = (this.flatIndex + 1) + ' / ' + total

    this.prevBtn.disabled = this.flatIndex <= 0
    this.nextBtn.disabled = this.flatIndex >= total - 1
  }

  DebugPanel.prototype._next = function () {
    var all = this.runner.linearSteps()
    if (this.flatIndex >= all.length - 1) return

    var nextIndex = this.flatIndex + 1
    var result = this.runner.goToLinear(nextIndex)
    if (result) {
      this.flatIndex = nextIndex
    }
    this._update()
  }

  DebugPanel.prototype._prev = function () {
    if (this.flatIndex <= 0) return

    var prevIndex = this.flatIndex - 1
    var result = this.runner.goToLinear(prevIndex)
    if (result) {
      this.flatIndex = prevIndex
    }
    this._update()
  }

  DebugPanel.prototype.destroy = function () {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el)
    }
    this.el = null
  }

  window.AIClassKnowledgeDebugPanel = DebugPanel
})()
