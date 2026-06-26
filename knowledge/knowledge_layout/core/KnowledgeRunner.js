// AIClass_template/core/KnowledgeRunner.js
;(function () {
  function KnowledgeRunner(config) {
    this.config = config || {}
    this.topics = this.config.topics || []
    this.topicContainers = []
    this.topicsEl = null
    this.scroll = null
    this.revealedCount = 0
    this.currentTopicIndex = -1
    this.board = null
    this.stage = null
    this.headerEl = null
    this.resizeHandler = null
    this._topicIndex = null
    this._linearIndex = -1
    this._linearSteps = null
  }

  KnowledgeRunner.prototype.mount = function () {
    var layout = this.config.layout || {}
    var designWidth = layout.designWidth || 1200
    var designHeight = layout.designHeight || 680

    // Board: fixed full-viewport overlay
    var board = document.createElement('div')
    board.className = 'lf-board'

    // Stage: fixed design size, scaled to fit
    var stage = document.createElement('div')
    stage.className = 'lf-stage'
    stage.style.position = 'absolute'
    stage.style.transformOrigin = 'top left'
    stage.style.overflow = 'auto'
    stage.style.width = designWidth + 'px'
    stage.style.height = designHeight + 'px'
    board.appendChild(stage)
    document.body.appendChild(board)

    // Header: page-level title
    var meta = this.config.meta || {}
    var header = document.createElement('div')
    header.className = 'kn-header'
    if (meta.tag) {
      var tag = document.createElement('span')
      tag.className = 'kn-header-tag'
      tag.textContent = meta.tag
      header.appendChild(tag)
    }
    if (meta.title) {
      var title = document.createElement('span')
      title.className = 'kn-header-title'
      title.textContent = meta.title
      header.appendChild(title)
    }
    stage.appendChild(header)
    this.headerEl = header

    // Topics
    var topicsWrap = document.createElement('div')
    topicsWrap.className = 'kn-topics'

    var self = this
    this.topics.forEach(function (topicCfg, index) {
      var container = new AIClassKnowledgePageContainer(topicCfg, {
        figure: topicCfg.figure,
        figureDefaults: self.config.figureDefaults || {}
      })
      var topicEl = container.render()
      topicsWrap.appendChild(topicEl)
      self.topicContainers.push(container)
    })

    stage.appendChild(topicsWrap)
    this.topicsEl = topicsWrap
    this.board = board
    this.stage = stage

    // Build topic index for O(1) lookup
    this._topicIndex = {}
    this.topics.forEach(function (t, i) {
      self._topicIndex[String(t.id)] = i
    })

    // Scale stage to fit viewport
    this._syncLayout()
    this.resizeHandler = function () { self._syncLayout() }
    window.addEventListener('resize', this.resizeHandler)

    // Scroll helper (scrolls within stage)
    this.scroll = new AIClassKnowledgePageScroll(stage)

    return this
  }

  KnowledgeRunner.prototype._syncLayout = function () {
    if (!this.stage) return
    AIClassLayoutStage.sync(this.stage, null, this.config.layout || {})
  }

  KnowledgeRunner.prototype._deferScrollTo = function (el) {
    var self = this
    requestAnimationFrame(function () {
      self.scroll.scrollTo(el)
    })
  }

  // ─── Linear step list ───

  KnowledgeRunner.prototype.linearSteps = function () {
    if (this._linearSteps) return this._linearSteps
    var result = []
    for (var i = 0; i < this.topics.length; i++) {
      var container = this.topicContainers[i]
      var steps = container.replay.steps()
      for (var j = 0; j < steps.length; j++) {
        result.push({
          topicIndex: i,
          topicId: this.topics[i].id,
          stepId: steps[j].id,
          stepIndex: j,
          totalSteps: steps.length
        })
      }
    }
    this._linearSteps = result
    return result
  }

  // ─── Idempotent linear navigation ───

  KnowledgeRunner.prototype.goToLinear = function (flatIndex) {
    var all = this.linearSteps()
    if (flatIndex < 0 || flatIndex >= all.length) return null

    var target = all[flatIndex]

    // 1. Topics AFTER target: hide them, reset their step state
    for (var i = target.topicIndex + 1; i < this.topics.length; i++) {
      var c = this.topicContainers[i]
      if (c.topicEl) c.topicEl.setAttribute('data-hidden', '')
      c.currentStepId = null
    }

    // 2. Topics BEFORE target: reveal and advance to their last step
    for (var i = 0; i < target.topicIndex; i++) {
      var c = this.topicContainers[i]
      if (c.topicEl) c.topicEl.removeAttribute('data-hidden')
      var steps = c.replay.steps()
      if (steps.length > 0) {
        var lastStepId = steps[steps.length - 1].id
        // Skip if already at the correct step
        if (c.currentStepId !== lastStepId) {
          try { c.go(lastStepId) } catch (e) { /* skip */ }
        }
      }
    }

    // 3. Target topic: reveal and go to target step
    var tc = this.topicContainers[target.topicIndex]
    if (tc.topicEl) tc.topicEl.removeAttribute('data-hidden')
    // Skip if already at the correct step
    if (tc.currentStepId !== target.stepId) {
      try { tc.go(target.stepId) } catch (e) { /* skip */ }
    }

    // 4. Update runner state
    this.revealedCount = target.topicIndex + 1
    this.currentTopicIndex = target.topicIndex
    this._linearIndex = flatIndex

    // 5. Scroll to target topic
    this._deferScrollTo(tc.topicEl)

    return { topic: target.topicId, step: target.stepId, flatIndex: flatIndex }
  }

  // ─── Legacy API (kept for backward compatibility) ───

  KnowledgeRunner.prototype.next = function () {
    var nextIndex = this.revealedCount
    if (nextIndex >= this.topics.length) return null

    var container = this.topicContainers[nextIndex]
    var topicEl = container.topicEl

    topicEl.removeAttribute('data-hidden')

    var steps = container.replay.steps()
    if (steps.length > 0) {
      try {
        container.go(steps[0].id)
      } catch (e) {
        console.error('[KnowledgeRunner] Failed to replay topic steps:', e)
      }
    }

    this.revealedCount = nextIndex + 1
    this.currentTopicIndex = nextIndex

    this._deferScrollTo(topicEl)

    return { topic: this.topics[nextIndex].id, step: steps.length > 0 ? steps[0].id : null }
  }

  KnowledgeRunner.prototype.go = function (stepId) {
    if (this.currentTopicIndex < 0) return null
    var container = this.topicContainers[this.currentTopicIndex]
    var acc = container.go(stepId)
    if (!acc) return null

    this._deferScrollTo(container.topicEl)

    return { topic: this.topics[this.currentTopicIndex].id, step: acc.currentStepId }
  }

  KnowledgeRunner.prototype.nextStep = function () {
    if (this.currentTopicIndex < 0) return null
    var container = this.topicContainers[this.currentTopicIndex]
    var steps = container.replay.steps()
    var currentStepId = container.currentStepId

    if (currentStepId == null) {
      return this.go(steps[0].id)
    }

    var currentIndex = container.replay.indexOfStep(currentStepId)
    if (currentIndex < 0 || currentIndex >= steps.length - 1) return null
    return this.go(steps[currentIndex + 1].id)
  }

  KnowledgeRunner.prototype.prevStep = function () {
    if (this.currentTopicIndex < 0) return null
    var container = this.topicContainers[this.currentTopicIndex]
    var steps = container.replay.steps()
    var currentStepId = container.currentStepId

    if (currentStepId == null) return null

    var currentIndex = container.replay.indexOfStep(currentStepId)
    if (currentIndex > 0) {
      return this.go(steps[currentIndex - 1].id)
    }

    // At first step of current topic, go to previous topic's last step
    if (this.currentTopicIndex > 0) {
      var prevIndex = this.currentTopicIndex - 1
      var prevContainer = this.topicContainers[prevIndex]
      var prevSteps = prevContainer.replay.steps()
      if (prevSteps.length > 0) {
        this.currentTopicIndex = prevIndex
        return this.go(prevSteps[prevSteps.length - 1].id)
      }
    }

    return null
  }

  KnowledgeRunner.prototype.scrollTo = function (topicId) {
    var index = this._topicIndex ? this._topicIndex[String(topicId)] : -1
    if (index == null || index < 0) return false
    if (index >= this.revealedCount) return false
    this.currentTopicIndex = index
    this.scroll.scrollTo(this.topicContainers[index].topicEl)
    return true
  }

  KnowledgeRunner.prototype.current = function () {
    if (this.currentTopicIndex < 0) return null
    return {
      topic: this.topics[this.currentTopicIndex].id,
      step: this.topicContainers[this.currentTopicIndex].currentStepId
    }
  }

  KnowledgeRunner.prototype.teardown = function () {
    this.topicContainers.forEach(function (c) { c.teardown() })
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }
    if (this.board && this.board.parentNode) {
      this.board.parentNode.removeChild(this.board)
    }
    this.topicContainers = []
    this.headerEl = null
    this.topicsEl = null
    this.board = null
    this.stage = null
    this.scroll = null
    this.resizeHandler = null
    this._topicIndex = null
    this._linearSteps = null
    this._linearIndex = -1
    this.revealedCount = 0
    this.currentTopicIndex = -1
  }

  window.AIClassKnowledgeRunner = KnowledgeRunner
})()
