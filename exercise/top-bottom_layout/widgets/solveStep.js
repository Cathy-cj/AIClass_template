// AIClass_template/exercise/top-bottom_layout/widgets/solveStep.js
;(function () {
  AIClassWidgetRegistry.register('solveStep', function (el, block) {
    var row = document.createElement('div')
    row.className = 'lf-solve-step'
    var idx = document.createElement('span')
    idx.className = 'lf-solve-index'
    idx.textContent = block.index != null ? String(block.index) : ''
    var title = document.createElement('span')
    title.className = 'lf-solve-title'
    title.textContent = block.title || ''
    row.appendChild(idx)
    row.appendChild(title)
    el.appendChild(row)
    ;(block.lines || []).forEach(function (line) {
      var p = document.createElement('p')
      p.className = 'lf-text-line'
      p.textContent = line
      el.appendChild(p)
    })
  })
})()
