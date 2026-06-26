// AIClass_template/exercise/text-only_layout/widgets/dragPermutation.js
;(function () {
  function showToast(message) {
    if (window.toast && typeof window.toast.show === 'function') {
      window.toast.show(message)
    }
  }

  AIClassWidgetRegistry.register('dragPermutation', function (el, block, runtime, ctx) {
    if (!window.AIClassComponent || typeof window.AIClassComponent.createDragPermutation !== 'function') {
      throw new Error('[dragPermutation widget] AIClassComponent.createDragPermutation is required')
    }

    var enabled = AIClassInteractionGate.isInteractive(block, runtime)
    var dragPermutation = window.AIClassComponent.createDragPermutation({
      prompt: block.prompt,
      cards: block.cards || [],
      slots: block.slots || [],
      symbol: block.symbol || 'A',
      value: block.value,
      revealed: !!block.revealed,
      interactive: enabled,
      required: block.required,
      actions: enabled ? block.actions : false,
      submitText: block.submitText || '提交',
      resetText: block.resetText || '重置',
      onInvalid: function () { showToast(block.requiredText || '请把数字拖到对应位置') },
      onSubmit: function (value) {
        AIClassInteractionGate.submit('dragPermutation', value, block, ctx.config)
      }
    })

    el.appendChild(dragPermutation.el)
  })
})()
