// AIClass_template/component/choice/ChoiceQuestion.js
;(function () {
  var ns = window.AIClassComponent = window.AIClassComponent || {}
  var dom = ns._dom
  var option = ns._option

  if (!dom) throw new Error('[AIClassComponent.ChoiceQuestion] shared/dom.js is required')
  if (!option) throw new Error('[AIClassComponent.ChoiceQuestion] shared/option.js is required')
  if (typeof ns.createSubmitButton !== 'function') throw new Error('[AIClassComponent.ChoiceQuestion] Button.js is required')

  function sameValue(a, b) {
    return a != null && b != null && String(a) === String(b)
  }

  function choiceVariant(opts) {
    if (opts.variant) return opts.variant
    return 'paper'
  }

  function normalizeActions(actions) {
    if (actions === false) return []
    if (Array.isArray(actions)) return actions.slice()
    return ['submit']
  }

  function createOptionButton(item, opts) {
    var variant = opts.variant || 'paper'
    var hasRadio = variant !== 'plain'
    var btn = dom.create('button', {
      type: 'button',
      className: 'aic-choice-option aic-choice-option--' + variant,
      attributes: {
        'data-value': item.value,
        'aria-pressed': 'false'
      }
    })

    if (hasRadio) {
      btn.appendChild(dom.create('span', {
        className: 'aic-choice-radio',
        attributes: { 'aria-hidden': 'true' }
      }))
      btn.appendChild(dom.create('span', {
        className: 'aic-choice-label',
        text: item.label
      }))
    } else {
      btn.textContent = item.label
    }

    return btn
  }

  function createChoiceQuestion(opts) {
    opts = opts || {}
    var items = option.normalizeAll(opts.options)
    var selected = opts.value != null ? opts.value : null
    var revealed = !!opts.revealed
    var disabled = opts.interactive === false || !!opts.disabled
    var variant = choiceVariant(opts)
    var actionNames = normalizeActions(opts.actions)
    var buttons = []

    var root = dom.create('div', {
      className: 'aic-choice aic-choice--' + variant
    })
    var grid = dom.create('div', {
      className: 'aic-choice-grid aic-choice-grid--' + variant,
      attributes: { role: 'group' }
    })
    root.appendChild(grid)

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
        dom.toggle(btn, 'is-revealed', revealed)
        btn.disabled = disabled
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false')
      })
    }

    function setValue(value, silent) {
      selected = value != null ? value : null
      updateStates()
      if (!silent && typeof opts.onChange === 'function') opts.onChange(selected)
    }

    function setDisabled(nextDisabled) {
      disabled = !!nextDisabled
      updateStates()
      if (submitBtn) submitBtn.disabled = disabled
      if (resetBtn) resetBtn.disabled = disabled
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

    items.forEach(function (item) {
      var btn = createOptionButton(item, { variant: variant })
      btn.addEventListener('click', function () {
        if (disabled) return
        setValue(item.value)
      })
      grid.appendChild(btn)
      buttons.push(btn)
    })

    var actions = dom.create('div', { className: 'aic-choice-submit-row' })
    var submitBtn = null
    var resetBtn = null

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

  ns.createChoiceQuestion = createChoiceQuestion
})()
