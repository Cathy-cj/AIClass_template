// AIClass_template/widgets/choice.js
;(function () {
  function showToast(message) {
    if (window.toast && typeof window.toast.show === 'function') {
      window.toast.show(message)
    }
  }

  AIClassWidgetRegistry.register('choice', function (el, block, runtime, ctx) {
    if (!window.AIClassComponent || typeof window.AIClassComponent.createChoiceQuestion !== 'function') {
      throw new Error('[choice widget] AIClassComponent.createChoiceQuestion is required')
    }

    var enabled = AIClassInteractionGate.isInteractive(block, runtime)

    var choice = window.AIClassComponent.createChoiceQuestion({
      options: block.options || [],
      value: block.value,
      answer: block.answer,
      revealed: !!block.revealed,
      interactive: enabled,
      required: block.required,
      variant: block.variant,
      actions: enabled ? block.actions : false,
      submitText: block.submitText || '提交',
      resetText: block.resetText || '重置',
      onInvalid: function () { showToast(block.requiredText || '请选择答案') },
      onSubmit: function (value) {
        AIClassInteractionGate.submit('choice', value, block, ctx.config)
      }
    })

    el.appendChild(choice.el)
  })
})()
