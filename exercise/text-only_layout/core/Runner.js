// AIClass_template/exercise/text-only_layout/core/Runner.js
;(function () {
  function AIClassRunner(config) {
    this.config = config || {}
    this.steps = AIClassReplay.normalizeSteps(this.config.steps || [])
    this.frame = new AIClassFrame(this.config)
    this.currentStepId = null
  }

  AIClassRunner.prototype.mount = function () {
    this.frame.mount()
    return this
  }

  AIClassRunner.prototype.go = function (stepId, opts) {
    opts = opts || {}
    if (!this.frame.sheet) this.mount()
    var acc = AIClassReplay.replayAccumulate(this.steps, stepId)

    this.frame.clearContent()
    var fragment = AIClassWidgetRegistry.mountAll(acc.blocks, {
      config: this.config,
      instant: opts.instant === true || opts.animate === false,
      runner: this
    })
    this.frame.appendBlocks(fragment)
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
    this.frame.teardown()
    this.currentStepId = null
  }

  AIClassRunner.prototype.bridgeEnter = function (cb) {
    if (!this.frame.sheet) this.mount()
    if (typeof cb === 'function') cb()
  }

  window.AIClassRunner = AIClassRunner
})()
