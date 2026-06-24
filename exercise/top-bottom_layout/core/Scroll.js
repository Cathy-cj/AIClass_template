// AIClass_template/exercise/top-bottom_layout/core/Scroll.js
;(function () {
  function scrollToElement(scroll, el, opts) {
    if (!scroll || !el) return
    opts = opts || {}
    var scrollRect = scroll.getBoundingClientRect()
    var elRect = el.getBoundingClientRect()
    var top = scroll.scrollTop + (elRect.bottom - scrollRect.bottom) + (opts.offset != null ? opts.offset : 18)
    top = Math.max(0, Math.min(top, scroll.scrollHeight - scroll.clientHeight))
    if (opts.instant || opts.smooth === false) {
      scroll.scrollTop = top
      return
    }
    scroll.scrollTo({ top: top, behavior: 'smooth' })
  }

  function scrollToCurrent(frame, range, opts) {
    if (!frame || !frame.scroll) return
    var blocks = frame.scroll.querySelectorAll('.lf-block')
    var target = blocks[Math.max(0, (range && range.end ? range.end : blocks.length) - 1)]
    if (!target && blocks.length) target = blocks[blocks.length - 1]
    scrollToElement(frame.scroll, target, opts)
  }

  window.AIClassScroll = {
    toElement: scrollToElement,
    toCurrent: scrollToCurrent
  }
})()
