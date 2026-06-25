// AIClass_template/component/index.js
// Browser entry for reusable AIClass UI components.
;(function () {
  var ns = window.AIClassComponent || {}
  if (ns.__aiClassComponentVersion) return

  ns.__aiClassComponentVersion = '0.1.0'
  window.AIClassComponent = ns

  var script = document.currentScript
  var base = script && script.src ? script.src.replace(/\/[^\/]*$/, '/') : './'
  var files = [
    'button/button.css',
    'choice/choice.css',
    'shared/dom.js',
    'shared/option.js',
    'button/Button.js',
    'choice/ChoiceQuestion.js',
    'modal/modal.css',
    'modal/Modal.js'
  ]

  function writeAsset(path) {
    var url = base + path
    if (/\.css$/.test(path)) {
      document.write('<link rel="stylesheet" href="' + url + '">')
    } else {
      document.write('<script src="' + url + '"><\/script>')
    }
  }

  if (document.readyState === 'loading') {
    files.forEach(writeAsset)
  } else {
    console.warn('[AIClassComponent] index.js should be loaded during document parsing. Load component files manually when injecting after page load.')
  }
})()
