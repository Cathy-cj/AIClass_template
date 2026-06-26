// AIClass_template/core/PageContainer.js
;(function () {
  function PageContainer(topicConfig, options) {
    this.config = topicConfig || {}
    this.options = options || {}
    this.topicEl = null
    this._scrollEl = null
    this.figureHost = null
    this.replay = new AIClassKnowledgePageReplay(this.config)
    this.currentStepId = null
    this._disposers = []
  }

  PageContainer.prototype._cleanupBlocks = function () {
    this._disposers.forEach(function (dispose) {
      try {
        dispose()
      } catch (e) {
        console.warn('[KnowledgePageContainer] block cleanup failed:', e)
      }
    })
    this._disposers = []
  }

  PageContainer.prototype.render = function () {
    var cfg = this.config
    var layout = cfg.layout || 'text-only'

    var topic = document.createElement('div')
    topic.className = 'kn-topic'
    topic.setAttribute('data-topic-id', cfg.id)
    topic.setAttribute('data-layout', layout)
    topic.setAttribute('data-hidden', '')

    // Content
    var content = document.createElement('div')
    content.className = 'kn-topic-content'

    if (layout === 'figure-text') {
      var figSlot = document.createElement('div')
      figSlot.className = 'kn-topic-figure'
      content.appendChild(figSlot)

      var figureDef = cfg.figure || this.options.figure
      if (figureDef) {
        this.figureHost = new AIClassFigureHost(figSlot, figureDef, {
          defaults: this.options.figureDefaults || {}
        })
        this.figureHost.mount()
      }
    }

    var scroll = document.createElement('div')
    scroll.className = 'kn-topic-scroll'
    content.appendChild(scroll)
    topic.appendChild(content)

    this.topicEl = topic
    this._scrollEl = scroll
    return topic
  }

  PageContainer.prototype.go = function (stepId) {
    if (!this.topicEl || !this._scrollEl) return

    var acc = this.replay.go(stepId)
    if (!acc) return

    // Clear and replay
    this._cleanupBlocks()
    this._scrollEl.innerHTML = ''
    var self = this
    var fragment = AIClassWidgetRegistry.mountAll(acc.blocks, {
      config: this.config,
      instant: false,
      runner: null,
      registerCleanup: function (dispose) {
        if (typeof dispose === 'function') self._disposers.push(dispose)
      }
    })
    this._scrollEl.appendChild(fragment)

    // Update figure
    if (this.figureHost && acc.figure) {
      this.figureHost.setState(acc.figure, {
        stepId: acc.currentStepId,
        stepIndex: acc.targetIndex,
        instant: false
      })
    }

    this.currentStepId = acc.currentStepId

    return acc
  }

  PageContainer.prototype.teardown = function () {
    this._cleanupBlocks()
    if (this.figureHost) this.figureHost.teardown()
    if (this.topicEl && this.topicEl.parentNode) {
      this.topicEl.parentNode.removeChild(this.topicEl)
    }
    this.topicEl = null
    this._scrollEl = null
    this.currentStepId = null
  }

  window.AIClassKnowledgePageContainer = PageContainer
})()
