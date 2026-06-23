// AIClass_template/component/shared/option.js
;(function () {
  var ns = window.AIClassComponent = window.AIClassComponent || {}

  function optionLabel(opt) {
    if (typeof opt === 'string') return opt
    if (!opt) return ''
    return opt.label || opt.text || ''
  }

  function optionValue(opt, index) {
    if (typeof opt === 'string') {
      var match = opt.match(/^([A-D])[\.\s、]/)
      return match ? match[1] : String(index + 1)
    }
    if (opt && opt.value != null) return opt.value
    return String(index + 1)
  }

  function normalizeOption(opt, index) {
    return {
      raw: opt,
      label: optionLabel(opt),
      value: optionValue(opt, index)
    }
  }

  function normalizeOptions(options) {
    return (options || []).map(normalizeOption)
  }

  ns._option = {
    label: optionLabel,
    value: optionValue,
    normalize: normalizeOption,
    normalizeAll: normalizeOptions
  }
})()
