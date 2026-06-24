// AIClass_template/exercise/text-only_layout/widgets/oral.js
;(function () {
  AIClassWidgetRegistry.register('oral', function (el, block) {
    var wrap = document.createElement('div')
    wrap.className = 'lf-oral'

    var badge = document.createElement('span')
    badge.className = 'lf-oral-badge'
    badge.textContent = block.badge || '说一说'
    wrap.appendChild(badge)

    var question = document.createElement('span')
    question.className = 'lf-oral-question'
    question.textContent = block.question || block.text || ''
    wrap.appendChild(question)

    if (block.action) {
      var action = document.createElement('span')
      action.className = 'lf-oral-action'
      action.textContent = block.action
      wrap.appendChild(action)
    }
    el.appendChild(wrap)
  })
})()
