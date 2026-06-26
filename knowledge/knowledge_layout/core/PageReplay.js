// AIClass_template/core/PageReplay.js
;(function () {
  function PageReplay(topicConfig) {
    var cfg = topicConfig || {}
    this._steps = AIClassReplay.normalizeSteps(cfg.steps || [])
  }

  PageReplay.prototype.steps = function () {
    return this._steps
  }

  PageReplay.prototype.indexOfStep = function (stepId) {
    return AIClassReplay.resolveIndex(this._steps, stepId)
  }

  PageReplay.prototype.go = function (stepId) {
    if (!this._steps.length) return null
    return AIClassReplay.replayAccumulate(this._steps, stepId)
  }

  window.AIClassKnowledgePageReplay = PageReplay
})()
