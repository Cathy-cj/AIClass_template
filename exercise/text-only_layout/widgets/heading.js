// AIClass_template/exercise/text-only_layout/widgets/heading.js
;(function () {
  AIClassWidgetRegistry.register('heading', function (el, block) {
    var level = Math.max(1, Math.min(3, Number(block.level || 2)))
    var h = document.createElement('h' + level)
    h.className = 'lf-heading-title'
    h.textContent = block.text || block.title || ''
    el.appendChild(h)
  })
})()
