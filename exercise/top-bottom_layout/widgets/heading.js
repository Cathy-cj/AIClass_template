// AIClass_template/exercise/top-bottom_layout/widgets/heading.js
;(function () {
  AIClassWidgetRegistry.register('heading', function (el, block) {
    var level = Math.max(1, Math.min(3, Number(block.level || 2)))
    var h = document.createElement('h' + level)
    h.className = 'lf-heading-title'
    if (block.tag) {
      var tag = document.createElement('span')
      tag.className = 'lf-section-tag'
      tag.textContent = block.tag
      el.appendChild(tag)
    }
    h.textContent = block.text || block.title || ''
    el.appendChild(h)
  })
})()
