// AIClass_template/widgets/phase.js
;(function () {
  AIClassWidgetRegistry.register('phase', function (el, block) {
    el.classList.add('lf-phase', 'lf-phase-' + (block.name || 'default'))
    var title = document.createElement('span')
    title.className = 'lf-phase-title'
    title.textContent = block.title || block.name || ''
    el.appendChild(title)
  })
})()
