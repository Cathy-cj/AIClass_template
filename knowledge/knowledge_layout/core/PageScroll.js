// AIClass_template/core/PageScroll.js
;(function () {
  function PageScroll(containerEl) {
    this.container = containerEl
  }

  PageScroll.prototype.scrollTo = function (el, opts) {
    opts = opts || {}
    if (!el || !this.container) return

    // Use getBoundingClientRect for accurate position under transform: scale()
    var containerRect = this.container.getBoundingClientRect()
    var elRect = el.getBoundingClientRect()

    // Element's position relative to container's current scroll state
    var relativeTop = elRect.top - containerRect.top + this.container.scrollTop

    if (opts.instant) {
      this.container.scrollTop = relativeTop
    } else {
      this.container.scrollTo({ top: relativeTop, behavior: 'smooth' })
    }
  }

  PageScroll.prototype.scrollToBottom = function (opts) {
    opts = opts || {}
    if (!this.container) return
    if (opts.instant) {
      this.container.scrollTop = this.container.scrollHeight
    } else {
      this.container.scrollTo({ top: this.container.scrollHeight, behavior: 'smooth' })
    }
  }

  window.AIClassKnowledgePageScroll = PageScroll
})()
