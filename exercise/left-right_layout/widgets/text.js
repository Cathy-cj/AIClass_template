// AIClass_template/widgets/text.js
;(function () {
  function renderLine(el, value) {
    var p = document.createElement('p')
    p.className = 'lf-text-line'
    p.textContent = AIClassWidgetRegistry.text(value)
    el.appendChild(p)
  }

  AIClassWidgetRegistry.register('text', function (el, block) {
    var lines = block.lines || (block.text ? [block.text] : [])
    lines.forEach(function (line) { renderLine(el, line) })
  })

  AIClassWidgetRegistry.register('section', function (el, block) {
    el.classList.add('lf-section')
    var title = document.createElement('span')
    title.className = 'lf-section-title'
    title.textContent = block.title || block.text || ''
    el.appendChild(title)
  })
})()
