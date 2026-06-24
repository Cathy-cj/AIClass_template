// AIClass_template/exercise/top-bottom_layout/core/InteractionGate.js
;(function () {
  function defaultSubmit(type, value, block, config) {
    if (config && config.handlers && block.onSubmit && typeof config.handlers[block.onSubmit] === 'function') {
      config.handlers[block.onSubmit](value, block)
      return
    }
    if (typeof CoursewareSubmitHandler !== 'undefined') {
      if (type === 'fill' && typeof CoursewareSubmitHandler.submitFillBlank === 'function') {
        CoursewareSubmitHandler.submitFillBlank({
          answer: [{ value: String(value), input_type: 'TEXT' }]
        })
      }
      if (type === 'choice' && typeof CoursewareSubmitHandler.submitSingleChoice === 'function') {
        CoursewareSubmitHandler.submitSingleChoice({ option: String(value) })
      }
    }
  }

  function isInteractive(block, runtime) {
    return !!(runtime && runtime.isCurrentStep && block && block.interactive !== false && !block.readonly && !block.revealed && block.value == null)
  }

  window.AIClassInteractionGate = {
    submit: defaultSubmit,
    isInteractive: isInteractive
  }
})()
