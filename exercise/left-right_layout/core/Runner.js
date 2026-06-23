// AIClass_template/core/Runner.js
;(function () {
  function AIClassRunner(config) {
    this.config = config || {}
    this.steps = AIClassReplay.normalizeSteps(this.config.steps || [])
    this.frame = new AIClassFrame(this.config)
    this.figureHost = null
    this.currentStepId = null
  }

  AIClassRunner.prototype.mount = function () {
    this.frame.mount()
    this.figureHost = new AIClassFigureHost(this.frame.figureMountEl, this.config.figure, {
      defaults: this.config.figureDefaults || {}
    })
    this.figureHost.mount()
    return this
  }

  AIClassRunner.prototype.go = function (stepId, opts) {
    opts = opts || {}
    if (!this.frame.sheet) this.mount()
    var acc = AIClassReplay.replayAccumulate(this.steps, stepId)

    this.frame.clearContent()
    this.figureHost.reset()

    var fragment = AIClassWidgetRegistry.mountAll(acc.blocks, {
      config: this.config,
      instant: opts.instant === true || opts.animate === false,
      runner: this
    })
    this.frame.appendBlocks(fragment)
    this.figureHost.setState(acc.figure, {
      stepId: acc.currentStepId,
      stepIndex: acc.targetIndex,
      instant: opts.instant === true || opts.animate === false
    })
    this.frame.setFocus(acc.targetStep.focus || '')
    AIClassScroll.toCurrent(this.frame, acc.currentBlockRange, {
      instant: opts.instant === true
    })
    this.currentStepId = acc.currentStepId
    return acc
  }

  AIClassRunner.prototype.current = function () {
    return this.currentStepId
  }

  AIClassRunner.prototype.teardown = function () {
    if (this.figureHost) this.figureHost.teardown()
    this.frame.teardown()
    this.currentStepId = null
  }

  AIClassRunner.prototype.bridgeEnter = function (cb) {
    if (!this.frame.sheet) this.mount()
    if (typeof cb === 'function') cb()
  }

  window.AIClassRunner = AIClassRunner
})()
