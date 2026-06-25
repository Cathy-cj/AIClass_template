// AIClass_template/component/drag-permutation/DragPermutation.js
;(function () {
  var ns = window.AIClassComponent = window.AIClassComponent || {}
  var dom = ns._dom

  if (!dom) throw new Error('[AIClassComponent.DragPermutation] shared/dom.js is required')
  if (typeof ns.createSubmitButton !== 'function') throw new Error('[AIClassComponent.DragPermutation] Button.js is required')

  function normalizeCards(cards) {
    return (cards || []).map(function (card) {
      if (typeof card === 'string' || typeof card === 'number') {
        return { value: String(card), label: String(card) }
      }
      card = card || {}
      var value = card.value != null ? card.value : card.id
      return {
        value: String(value),
        label: card.label != null ? String(card.label) : String(value)
      }
    })
  }

  function normalizeSlots(slots) {
    return (slots || []).map(function (slot) {
      slot = slot || {}
      return {
        id: String(slot.id || ''),
        label: slot.label || '',
        answer: slot.answer != null ? String(slot.answer) : null
      }
    }).filter(function (slot) { return slot.id })
  }

  function createDragPermutation(opts) {
    opts = opts || {}
    var cards = normalizeCards(opts.cards)
    var slots = normalizeSlots(opts.slots)
    var value = {}
    var selectedCard = null
    var revealed = !!opts.revealed
    var disabled = opts.interactive === false || !!opts.disabled
    var cardButtons = {}
    var slotButtons = {}

    function seedValue(initialValue) {
      value = {}
      Object.keys(initialValue || {}).forEach(function (slotId) {
        if (initialValue[slotId] != null) value[slotId] = String(initialValue[slotId])
      })
    }

    seedValue(opts.value)

    var root = dom.create('div', { className: 'aic-drag-permutation' })
    if (opts.prompt) {
      root.appendChild(dom.create('p', {
        className: 'aic-drag-permutation-prompt',
        text: opts.prompt
      }))
    }

    var board = dom.create('div', { className: 'aic-drag-permutation-board' })
    var bank = dom.create('div', {
      className: 'aic-drag-permutation-bank',
      attributes: { role: 'group', 'aria-label': opts.bankLabel || '数字卡片' }
    })
    var expression = dom.create('div', {
      className: 'aic-drag-permutation-expression',
      attributes: { role: 'group', 'aria-label': opts.expressionLabel || '排列符号' }
    })
    board.appendChild(bank)
    board.appendChild(expression)
    root.appendChild(board)

    function cardByValue(cardValue) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].value === String(cardValue)) return cards[i]
      }
      return null
    }

    function slotByValue(cardValue) {
      var found = null
      Object.keys(value).forEach(function (slotId) {
        if (value[slotId] === String(cardValue)) found = slotId
      })
      return found
    }

    function isCardAssigned(cardValue) {
      return !!slotByValue(cardValue)
    }

    function assign(slotId, cardValue) {
      if (!slotId || cardValue == null) return
      var currentSlot = slotByValue(cardValue)
      if (currentSlot) delete value[currentSlot]
      value[slotId] = String(cardValue)
      selectedCard = null
      updateStates()
      if (typeof opts.onChange === 'function') opts.onChange(getValue())
    }

    function clearSlot(slotId) {
      delete value[slotId]
      updateStates()
      if (typeof opts.onChange === 'function') opts.onChange(getValue())
    }

    function getValue() {
      var copy = {}
      Object.keys(value).forEach(function (slotId) {
        copy[slotId] = value[slotId]
      })
      return copy
    }

    function setValue(nextValue, silent) {
      seedValue(nextValue)
      selectedCard = null
      updateStates()
      if (!silent && typeof opts.onChange === 'function') opts.onChange(getValue())
    }

    function setDisabled(nextDisabled) {
      disabled = !!nextDisabled
      updateStates()
    }

    function reveal() {
      revealed = true
      updateStates()
    }

    function reset() {
      seedValue({})
      selectedCard = null
      revealed = false
      updateStates()
      if (typeof opts.onReset === 'function') opts.onReset()
    }

    function allSlotsFilled() {
      return slots.every(function (slot) { return value[slot.id] != null })
    }

    function updateStates() {
      cards.forEach(function (card) {
        var btn = cardButtons[card.value]
        if (!btn) return
        var assigned = isCardAssigned(card.value)
        dom.toggle(btn, 'is-selected', selectedCard === card.value)
        dom.toggle(btn, 'is-assigned', assigned)
        dom.toggle(btn, 'is-disabled', disabled || assigned)
        btn.disabled = disabled || assigned
        btn.draggable = !disabled && !assigned
        btn.setAttribute('aria-pressed', selectedCard === card.value ? 'true' : 'false')
      })

      slots.forEach(function (slot) {
        var btn = slotButtons[slot.id]
        if (!btn) return
        var cardValue = value[slot.id]
        var card = cardByValue(cardValue)
        var filled = !!card
        var correct = revealed && slot.answer != null && cardValue === slot.answer
        var wrong = revealed && filled && slot.answer != null && cardValue !== slot.answer
        btn.querySelector('.aic-drag-permutation-slot-value').textContent = filled ? card.label : ''
        dom.toggle(btn, 'is-filled', filled)
        dom.toggle(btn, 'is-correct', correct)
        dom.toggle(btn, 'is-wrong', wrong)
        dom.toggle(btn, 'is-disabled', disabled)
        btn.disabled = disabled
      })

      if (submitBtn) submitBtn.disabled = disabled
      if (resetBtn) resetBtn.disabled = disabled
    }

    cards.forEach(function (card) {
      var btn = dom.create('button', {
        type: 'button',
        className: 'aic-drag-permutation-card',
        text: card.label,
        attributes: {
          'data-value': card.value,
          draggable: 'true',
          'aria-pressed': 'false'
        },
        on: {
          click: function () {
            if (disabled || isCardAssigned(card.value)) return
            selectedCard = selectedCard === card.value ? null : card.value
            updateStates()
          },
          dragstart: function (event) {
            if (disabled || isCardAssigned(card.value)) {
              event.preventDefault()
              return
            }
            event.dataTransfer.setData('text/plain', card.value)
            event.dataTransfer.effectAllowed = 'move'
          }
        }
      })
      bank.appendChild(btn)
      cardButtons[card.value] = btn
    })

    var upperSlot = slots[0]
    var lowerSlot = slots[1]
    var symbol = dom.create('div', {
      className: 'aic-drag-permutation-symbol',
      text: opts.symbol || 'A'
    })

    function createSlot(slot, className) {
      var btn = dom.create('button', {
        type: 'button',
        className: 'aic-drag-permutation-slot ' + className,
        attributes: {
          'data-slot-id': slot.id,
          'aria-label': slot.label || slot.id
        },
        on: {
          click: function () {
            if (disabled) return
            if (selectedCard) {
              assign(slot.id, selectedCard)
              return
            }
            if (value[slot.id]) clearSlot(slot.id)
          },
          dragover: function (event) {
            if (disabled) return
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
          },
          drop: function (event) {
            if (disabled) return
            event.preventDefault()
            var cardValue = event.dataTransfer.getData('text/plain')
            if (cardValue) assign(slot.id, cardValue)
          }
        }
      }, [
        dom.create('span', { className: 'aic-drag-permutation-slot-label', text: slot.label }),
        dom.create('span', { className: 'aic-drag-permutation-slot-value' })
      ])
      slotButtons[slot.id] = btn
      return btn
    }

    if (upperSlot) expression.appendChild(createSlot(upperSlot, 'aic-drag-permutation-slot-upper'))
    expression.appendChild(symbol)
    if (lowerSlot) expression.appendChild(createSlot(lowerSlot, 'aic-drag-permutation-slot-lower'))

    var actions = dom.create('div', { className: 'aic-drag-permutation-actions' })
    var resetBtn = null
    var submitBtn = null
    var actionNames = opts.actions === false ? [] : (Array.isArray(opts.actions) ? opts.actions : ['reset', 'submit'])

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
            if (opts.required !== false && !allSlotsFilled()) {
              if (typeof opts.onInvalid === 'function') opts.onInvalid()
              return
            }
            if (typeof opts.onSubmit === 'function') opts.onSubmit(getValue())
          }
        })
        actions.appendChild(submitBtn)
      }
    })

    if (actions.childNodes.length) root.appendChild(actions)
    updateStates()

    return {
      el: root,
      getValue: getValue,
      setValue: setValue,
      setDisabled: setDisabled,
      reveal: reveal,
      reset: reset
    }
  }

  ns.createDragPermutation = createDragPermutation
})()
