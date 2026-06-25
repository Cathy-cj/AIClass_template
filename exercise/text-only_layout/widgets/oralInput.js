// AIClass_template/exercise/text-only_layout/widgets/oralInput.js
;(function () {
  function showToast(message) {
    if (window.toast && typeof window.toast.show === 'function') {
      window.toast.show(message)
    }
  }

  AIClassWidgetRegistry.register('oralInput', function (el, block, runtime, ctx) {
    if (!window.AIClassComponent || typeof window.AIClassComponent.createOralInput !== 'function') {
      throw new Error('[oralInput widget] AIClassComponent.createOralInput is required')
    }

    var enabled = AIClassInteractionGate.isInteractive(block, runtime)
    var oralInput = window.AIClassComponent.createOralInput({
      badge: block.badge || '说一说',
      question: block.question || block.text,
      placeholder: block.placeholder,
      rows: block.rows,
      value: block.value,
      interactive: enabled,
      required: block.required,
      actions: enabled ? block.actions : false,
      submitText: block.submitText || '提交',
      onInvalid: function () { showToast(block.requiredText || '请先输入你的想法') },
      onSubmit: function (value) {
        AIClassInteractionGate.submit('oralInput', value, block, ctx.config)
      }
    })

    el.appendChild(oralInput.el)
  })
})()
