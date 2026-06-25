// AIClass_template/widgets/fill.js
;(function () {
  function renderPart(container, part, block, runtime, ctx) {
    part = part || {}
    if (part.kind === 'blank' || part.type === 'blank') {
      var input = document.createElement('input')
      input.type = 'text'
      input.className = 'lf-fill-input'
      input.id = part.id || block.id || ''
      input.autocomplete = 'off'
      input.placeholder = part.placeholder || ''
      if (part.width) input.style.width = typeof part.width === 'number' ? part.width + 'px' : String(part.width)
      var displayValue = part.value != null ? part.value : block.value
      if (displayValue != null) input.value = displayValue
      var enabled = AIClassInteractionGate.isInteractive(block, runtime)
      input.readOnly = !enabled
      input.disabled = !enabled
      container.appendChild(input)
      return input
    }
    var span = document.createElement('span')
    span.textContent = part.value != null ? String(part.value) : ''
    container.appendChild(span)
    return null
  }

  AIClassWidgetRegistry.register('fill', function (el, block, runtime, ctx) {
    var row = document.createElement('div')
    row.className = 'lf-fill-line'
    var inputs = []
    ;(block.parts || []).forEach(function (part) {
      var input = renderPart(row, part, block, runtime, ctx)
      if (input) inputs.push(input)
    })

    var enabled = AIClassInteractionGate.isInteractive(block, runtime)
    if (enabled) {
      if (!window.AIClassComponent || typeof window.AIClassComponent.createSubmitButton !== 'function') {
        throw new Error('[fill widget] AIClassComponent.createSubmitButton is required')
      }
      var btn = window.AIClassComponent.createSubmitButton({
        text: block.submitText || '提交',
        onClick: function () {
          var values = inputs.map(function (input) { return input.value.trim() })
          if (block.required !== false && values.some(function (v) { return !v })) {
            if (window.toast && typeof window.toast.show === 'function') window.toast.show('请填写答案')
            return
          }
          AIClassInteractionGate.submit('fill', values.length === 1 ? values[0] : values, block, ctx.config)
        }
      })
      row.appendChild(btn)
      setTimeout(function () {
        if (inputs[0] && typeof inputs[0].focus === 'function') inputs[0].focus()
      }, 0)
    }
    el.appendChild(row)
  })
})()
