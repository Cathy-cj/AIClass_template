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
      min-width: 200px;\
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
      transition: background 0.15s;\
    }\
    .kn-debug-btn--prev { background: #334155; color: #e2e8f0; }\
    .kn-debug-btn--prev:hover { background: #475569; }\
    .kn-debug-btn--next { background: #2563eb; color: #fff; }\
    .kn-debug-btn--next:hover { background: #1d4ed8; }\
    .kn-debug-btn--topic { background: #7c3aed; color: #fff; }\
    .kn-debug-btn--topic:hover { background: #6d28d9; }\
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

    // Buttons
    var btns = document.createElement('div')
    btns.className = 'kn-debug-btns'

    var prevBtn = document.createElement('button')
    prevBtn.className = 'kn-debug-btn kn-debug-btn--prev'
    prevBtn.textContent = '← 上一步'
    var self = this
    prevBtn.addEventListener('click', function () { self._prev() })

    var nextStepBtn = document.createElement('button')
    nextStepBtn.className = 'kn-debug-btn kn-debug-btn--next'
    nextStepBtn.textContent = '下一步 →'
    nextStepBtn.addEventListener('click', function () { self._nextStep() })

    var nextTopicBtn = document.createElement('button')
    nextTopicBtn.className = 'kn-debug-btn kn-debug-btn--topic'
    nextTopicBtn.textContent = '新主题 ▸'
    nextTopicBtn.addEventListener('click', function () { self._nextTopic() })

    btns.appendChild(prevBtn)
    btns.appendChild(nextStepBtn)
    btns.appendChild(nextTopicBtn)
    el.appendChild(btns)

    document.body.appendChild(el)
    this.el = el
  }

  DebugPanel.prototype._update = function () {
    var cur = this.runner.current()
    if (cur) {
      this.topicValue.textContent = cur.topic
      this.stepValue.textContent = cur.step || '—'
    } else {
      this.topicValue.textContent = '—'
      this.stepValue.textContent = '—'
    }
  }

  DebugPanel.prototype._nextTopic = function () {
    this.runner.next()
    this._update()
  }

  DebugPanel.prototype._nextStep = function () {
    this.runner.nextStep()
    this._update()
  }

  DebugPanel.prototype._prev = function () {
    this.runner.prevStep()
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
