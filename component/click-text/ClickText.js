// AIClass_template/component/click-text/ClickText.js
;(function () {
  var ns = window.AIClassComponent = window.AIClassComponent || {}
  var dom = ns._dom

  if (!dom) throw new Error('[AIClassComponent.ClickText] shared/dom.js is required')
  if (typeof ns.createSubmitButton !== 'function') throw new Error('[AIClassComponent.ClickText] Button.js is required')

  function sameValue(a, b) {
    return a != null && b != null && String(a) === String(b)
  }

  function normalizeSegments(segments) {
    return (segments || []).map(function (segment) {
      if (typeof segment === 'string') return { text: segment }
      return segment || {}
    })
  }

  function createClickText(opts) {
    opts = opts || {}
    var segments = normalizeSegments(opts.segments)
    var selected = opts.value != null ? opts.value : null
    var revealed = !!opts.revealed
    var disabled = opts.interactive === false || !!opts.disabled
    var buttons = []

    var root = dom.create('div', { className: 'aic-click-text' })
    if (opts.prompt) {
      root.appendChild(dom.create('p', {
        className: 'aic-click-text-prompt',
        text: opts.prompt
      }))
    }

    var sentence = dom.create('div', {
      className: 'aic-click-text-sentence',
      attributes: { role: 'group' }
    })
    root.appendChild(sentence)

    function updateStates() {
      buttons.forEach(function (btn) {
        var value = btn.getAttribute('data-value')
        var isSelected = sameValue(selected, value)
        var isCorrect = revealed && opts.answer != null && sameValue(opts.answer, value)
        var isWrong = revealed && isSelected && opts.answer != null && !sameValue(opts.answer, value)

        dom.toggle(btn, 'is-selected', isSelected)
        dom.toggle(btn, 'is-correct', isCorrect)
        dom.toggle(btn, 'is-wrong', isWrong)
        dom.toggle(btn, 'is-disabled', disabled)
        btn.disabled = disabled
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false')
      })
      if (submitBtn) submitBtn.disabled = disabled
      if (resetBtn) resetBtn.disabled = disabled
    }

    function setValue(value, silent) {
      selected = value != null ? value : null
      updateStates()
      if (!silent && typeof opts.onChange === 'function') opts.onChange(selected)
    }

    function setDisabled(nextDisabled) {
      disabled = !!nextDisabled
      updateStates()
    }

    function reveal(answer) {
      if (answer != null) opts.answer = answer
      revealed = true
      updateStates()
    }

    function reset() {
      revealed = false
      setValue(null)
      if (typeof opts.onReset === 'function') opts.onReset()
    }

    segments.forEach(function (segment) {
      var text = segment.text != null ? String(segment.text) : ''
      if (segment.clickable || segment.value != null) {
        var value = segment.value != null ? segment.value : text
        var btn = dom.create('button', {
          type: 'button',
          className: 'aic-click-text-token',
          text: text,
          attributes: {
            'data-value': value,
            'aria-pressed': 'false'
          },
          on: {
            click: function () {
              if (disabled) return
              setValue(value)
            }
          }
        })
        sentence.appendChild(btn)
        buttons.push(btn)
      } else {
        sentence.appendChild(dom.create('span', {
          className: 'aic-click-text-text',
          text: text
        }))
      }
    })

    var actions = dom.create('div', { className: 'aic-click-text-actions' })
    var resetBtn = null
    var submitBtn = null
    var actionNames = opts.actions === false ? [] : (Array.isArray(opts.actions) ? opts.actions : ['submit'])

    actionNames.forEach(function (name) {
      if (name === 'reset') {
        resetBtn = ns.createResetButton({
          text: opts.resetText || '重置',
          disabled: disabled,
          onClick: reset
        })
        actions.appendChild(resetBtn)
      }
      if (name === 'submit') {
        submitBtn = ns.createSubmitButton({
          text: opts.submitText || '提交',
          disabled: disabled,
          onClick: function () {
            if (selected == null && opts.required !== false) {
              if (typeof opts.onInvalid === 'function') opts.onInvalid()
              return
            }
            if (typeof opts.onSubmit === 'function') opts.onSubmit(selected)
          }
        })
        actions.appendChild(submitBtn)
      }
    })

    if (actions.childNodes.length) root.appendChild(actions)
    updateStates()

    return {
      el: root,
      getValue: function () { return selected },
      setValue: setValue,
      setDisabled: setDisabled,
      reveal: reveal,
      reset: reset
    }
  }

  ns.createClickText = createClickText
})()
