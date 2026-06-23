// AIClass_template/widgets/choice.js
;(function () {
  function optionLabel(opt) {
    return typeof opt === 'string' ? opt : (opt.label || opt.text || '')
  }

  function optionValue(opt, i) {
    if (typeof opt === 'string') {
      var m = opt.match(/^([A-D])[\.\s、]/)
      return m ? m[1] : String(i + 1)
    }
    return opt.value != null ? opt.value : String(i + 1)
  }

  AIClassWidgetRegistry.register('choice', function (el, block, runtime, ctx) {
    var grid = document.createElement('div')
    grid.className = 'lf-choice-grid'
    if (block.card === false) grid.classList.add('lf-choice-grid-plain')
    var enabled = AIClassInteractionGate.isInteractive(block, runtime)
    var selected = block.value != null ? block.value : null

    ;(block.options || []).forEach(function (opt, i) {
      var value = optionValue(opt, i)
      var btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'lf-choice-option'
      btn.textContent = optionLabel(opt)
      btn.setAttribute('data-value', value)
      if (String(selected) === String(value)) btn.classList.add('is-selected')
      if (block.revealed && block.answer != null && String(block.answer) === String(value)) btn.classList.add('is-correct')
      btn.disabled = !enabled
      if (enabled) {
        btn.addEventListener('click', function () {
          selected = value
          grid.querySelectorAll('.lf-choice-option').forEach(function (n) { n.classList.remove('is-selected') })
          btn.classList.add('is-selected')
        })
      }
      grid.appendChild(btn)
    })
    el.appendChild(grid)

    if (enabled) {
      var submit = document.createElement('button')
      submit.type = 'button'
      submit.className = 'lf-submit'
      submit.textContent = block.submitText || '提交'
      submit.addEventListener('click', function () {
        if (selected == null && block.required !== false) {
          if (window.toast && typeof window.toast.show === 'function') window.toast.show('请选择答案')
          return
        }
        AIClassInteractionGate.submit('choice', selected, block, ctx.config)
      })
      el.appendChild(submit)
    }
  })
})()
