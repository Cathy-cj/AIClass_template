// AIClass_template/core/LayoutStage.js
;(function () {
  function toCssSize(value) {
    if (value == null) return ''
    return typeof value === 'number' ? value + 'px' : String(value)
  }

  function removeById(root, id) {
    if (!root || !id) return
    var existing = root.querySelector('#' + id)
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing)
  }

  function designSize(layout) {
    layout = layout || {}
    return {
      width: layout.designWidth || window.DESIGN_WIDTH || 1200,
      height: layout.designHeight || window.DESIGN_HEIGHT || 680
    }
  }

  function sync(stage, bg, layout) {
    if (!stage) return
    var size = designSize(layout)
    var scale = Math.min(window.innerWidth / size.width, window.innerHeight / size.height)
    var left = Math.round((window.innerWidth - size.width * scale) / 2)
    var top = Math.round((window.innerHeight - size.height * scale) / 2)

    stage.style.width = size.width + 'px'
    stage.style.height = size.height + 'px'
    stage.style.left = left + 'px'
    stage.style.top = top + 'px'
    stage.style.transform = 'scale(' + scale + ')'

    document.documentElement.style.setProperty('--lf-board-scale', String(scale))
    document.documentElement.style.setProperty('--lf-board-offset-x', left + 'px')
    document.documentElement.style.setProperty('--lf-board-offset-y', top + 'px')

    if (bg) {
      var unit = 20 * scale
      bg.style.backgroundSize = unit + 'px ' + unit + 'px, ' + unit + 'px ' + unit + 'px, ' + (unit * 5) + 'px ' + (unit * 5) + 'px, ' + (unit * 5) + 'px ' + (unit * 5) + 'px'
      bg.style.backgroundPosition = left + 'px ' + top + 'px'
    }
  }

  function resolveMountRoot(config, id, bg, onResize) {
    config = config || {}
    var explicitRoot = config.root ? (typeof config.root === 'string' ? document.querySelector(config.root) : config.root) : null
    var hostRoot = explicitRoot || document.getElementById(window.CONTENT_ID || 'matrix-content')
    if (hostRoot) {
      return {
        root: hostRoot,
        board: null,
        stage: null,
        ownsStage: false,
        resizeHandler: null
      }
    }

    removeById(document.body, id + '-board')
    var board = document.createElement('div')
    board.id = id + '-board'
    board.className = 'lf-board'

    var stage = document.createElement('div')
    stage.id = id + '-stage'
    stage.className = 'lf-stage'
    board.appendChild(stage)
    document.body.appendChild(board)

    sync(stage, bg, config.layout || {})
    var resizeHandler = function () {
      sync(stage, bg, config.layout || {})
      if (typeof onResize === 'function') onResize()
    }
    window.addEventListener('resize', resizeHandler)

    return {
      root: stage,
      board: board,
      stage: stage,
      ownsStage: true,
      resizeHandler: resizeHandler
    }
  }

  window.AIClassLayoutStage = {
    toCssSize: toCssSize,
    removeById: removeById,
    designSize: designSize,
    sync: sync,
    resolveMountRoot: resolveMountRoot
  }
})()
