// AIClass_template/exercise/text-only_layout/widgets/clickText.js
;(function () {
  function showToast(message) {
    if (window.toast && typeof window.toast.show === 'function') {
      window.toast.show(message)
    }
  }

  AIClassWidgetRegistry.register('clickText', function (el, block, runtime, ctx) {
    if (!window.AIClassComponent || typeof window.AIClassComponent.createClickText !== 'function') {
      throw new Error('[clickText widget] AIClassComponent.createClickText is required')
    }

    var enabled = AIClassInteractionGate.isInteractive(block, runtime)
    var clickText = window.AIClassComponent.createClickText({
      prompt: block.prompt,
      segments: block.segments || [],
      value: block.value,
      answer: block.answer,
      revealed: !!block.revealed,
      interactive: enabled,
      required: block.required,
      actions: enabled ? block.actions : false,
      submitText: block.submitText || '提交',
      resetText: block.resetText || '重置',
      onInvalid: function () { showToast(block.requiredText || '请先点击一个答案') },
      onSubmit: function (value) {
        AIClassInteractionGate.submit('clickText', value, block, ctx.config)
      }
    })

    el.appendChild(clickText.el)
  })
})()
