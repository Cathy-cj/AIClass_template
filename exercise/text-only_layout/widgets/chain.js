// AIClass_template/exercise/text-only_layout/widgets/chain.js
;(function () {
  AIClassWidgetRegistry.register('chain', function (el, block) {
    var row = document.createElement('div')
    row.className = 'lf-chain'
    ;(block.nodes || []).forEach(function (node, i) {
      if (i > 0) {
        var arrow = document.createElement('span')
        arrow.className = 'lf-chain-arrow'
        arrow.textContent = block.reverse ? '←' : '→'
        row.appendChild(arrow)
      }
      var span = document.createElement('span')
      span.className = 'lf-chain-node'
      span.textContent = typeof node === 'string' ? node : (node.text || node.label || '')
      if (node && node.highlight) span.classList.add('is-highlight')
      row.appendChild(span)
    })
    el.appendChild(row)
    if (block.prompt) {
      var prompt = document.createElement('p')
      prompt.className = 'lf-text-line'
      prompt.textContent = block.prompt
      el.appendChild(prompt)
    }
  })
})()
