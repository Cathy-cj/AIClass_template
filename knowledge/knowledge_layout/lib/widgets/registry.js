// AIClass_template/widgets/registry.js
;(function () {
  var renderers = {}

  function register(type, render) {
    if (!type || typeof render !== 'function') throw new Error('[AIClassWidgetRegistry] invalid renderer')
    renderers[type] = render
  }

  function text(value) {
    return value == null ? '' : String(value)
  }

  function blockEl(block, runtime) {
    var el = document.createElement('div')
    el.className = 'lf-block lf-block-' + (block.type || 'unknown')
    el.setAttribute('data-step-id', block.__stepId)
    el.setAttribute('data-block-type', block.type || 'unknown')
    if (runtime && runtime.isCurrentStep && !runtime.instant) {
      el.classList.add('lf-enter')
      // Staggered entrance: 100ms delay per block within the step
      var delay = (block.__localIndex || 0) * 100
      el.style.animationDelay = delay + 'ms'
    }
    return el
  }

  function mountAll(blocks, ctx) {
    var frag = document.createDocumentFragment()
    blocks.forEach(function (block, index) {
      var type = block.type || 'text'
      var render = renderers[type]
      if (!render) render = renderers.text
      var runtime = {
        blockIndex: index,
        stepId: block.__stepId,
        stepIndex: block.__stepIndex,
        isCurrentStep: !!block.__isCurrentStep,
        instant: !!(ctx && ctx.instant),
        lessonMeta: ctx && ctx.config ? ctx.config.meta : {}
      }
      var el = blockEl(block, runtime)
      render(el, block, runtime, ctx || {})
      frag.appendChild(el)
    })
    return frag
  }

  window.AIClassWidgetRegistry = {
    register: register,
    mountAll: mountAll,
    text: text
  }
})()
