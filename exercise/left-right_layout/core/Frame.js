// AIClass_template/core/Frame.js
;(function () {
  function setCssVar(el, name, value) {
    if (value != null) el.style.setProperty(name, AIClassLayoutStage.toCssSize(value))
  }

  function applyLayoutVars(sheet, layout) {
    layout = layout || {}
    var size = AIClassLayoutStage.designSize(layout)
    setCssVar(sheet, '--lf-left', layout.left != null ? layout.left : 0)
    setCssVar(sheet, '--lf-top', layout.top != null ? layout.top : 0)
    setCssVar(sheet, '--lf-width', layout.width != null ? layout.width : size.width)
    setCssVar(sheet, '--lf-height', layout.height != null ? layout.height : size.height)

    setCssVar(sheet, '--lf-figure-width', layout.figureWidth)
    setCssVar(sheet, '--lf-figure-max-width', layout.figureMaxWidth)
    setCssVar(sheet, '--lf-figure-svg-width', layout.figureSvgWidth)
    setCssVar(sheet, '--lf-gap', layout.gap)
    setCssVar(sheet, '--lf-edge-pad', layout.edgePad)
    setCssVar(sheet, '--lf-main-padding', layout.mainPadding)
    setCssVar(sheet, '--lf-scroll-padding', layout.scrollPadding)
  }

  function AIClassFrame(config) {
    this.config = config || {}
    this.meta = this.config.meta || {}
    this.layout = this.config.layout || {}
    this.root = null
    this.board = null
    this.stage = null
    this.ownsStage = false
    this.resizeHandler = null
    this.background = null
    this.sheet = null
    this.header = null
    this.top = null
    this.figureMountEl = null
    this.scroll = null
  }

  AIClassFrame.prototype.mount = function () {
    var id = this.layout.id || 'ai-lesson-frame'

    AIClassLayoutStage.removeById(document.body, id + '-bg')

    var bg = document.createElement('div')
    bg.id = id + '-bg'
    bg.className = 'lf-viewport-bg'
    document.body.insertBefore(bg, document.body.firstChild)

    var mountRoot = AIClassLayoutStage.resolveMountRoot(this.config, id, bg)
    this.root = mountRoot.root
    this.board = mountRoot.board
    this.stage = mountRoot.stage
    this.ownsStage = mountRoot.ownsStage
    this.resizeHandler = mountRoot.resizeHandler
    if (!this.root) throw new Error('[AIClassFrame] mount root not found')

    AIClassLayoutStage.removeById(this.root, id)

    var sheet = document.createElement('div')
    sheet.id = id
    sheet.className = 'lf-sheet'
    applyLayoutVars(sheet, this.layout)

    var header = document.createElement('header')
    header.className = 'lf-header'
    if (this.layout.header !== true) header.classList.add('is-hidden')
    sheet.appendChild(header)

    var topArea = document.createElement('div')
    topArea.className = 'lf-top is-hidden'
    sheet.appendChild(topArea)

    var main = document.createElement('div')
    main.className = 'lf-main'

    var figure = document.createElement('aside')
    figure.className = 'lf-figure'

    var scroll = document.createElement('div')
    scroll.className = 'lf-scroll'

    main.appendChild(figure)
    main.appendChild(scroll)
    sheet.appendChild(main)
    this.root.appendChild(sheet)

    this.background = bg
    this.sheet = sheet
    this.header = header
    this.top = topArea
    this.figureMountEl = figure
    this.scroll = scroll
    this.renderHeader(this.meta)
    this.renderTop(this.config.top)
    return this
  }

  AIClassFrame.prototype.renderHeader = function (meta) {
    if (!this.header) return
    meta = meta || {}
    this.header.innerHTML = ''
    if (this.layout.header !== true) return
    var row = document.createElement('div')
    row.className = 'lf-header-row'
    var title = document.createElement('div')
    title.className = 'lf-header-title'
    title.textContent = meta.title || ''
    row.appendChild(title)
    this.header.appendChild(row)
    if (meta.question) {
      var q = document.createElement('div')
      q.className = 'lf-header-question'
      q.textContent = meta.question
      this.header.appendChild(q)
    }
  }

  AIClassFrame.prototype.renderTop = function (topConfig) {
    if (!this.top) return
    this.top.innerHTML = ''
    if (!topConfig) {
      this.top.classList.add('is-hidden')
      return
    }
    this.top.classList.remove('is-hidden')

    var head = null
    if (topConfig.title) {
      head = head || document.createElement('div')
      head.className = 'lf-top-head'
      var title = document.createElement('span')
      title.className = 'lf-top-title'
      title.textContent = topConfig.title
      head.appendChild(title)
    }
    if (head) this.top.appendChild(head)
    ;(topConfig.lines || []).forEach(function (line) {
      var p = document.createElement('p')
      p.className = 'lf-top-line'
      p.textContent = line
      this.top.appendChild(p)
    }, this)
  }

  AIClassFrame.prototype.clearContent = function () {
    if (this.scroll) this.scroll.innerHTML = ''
  }

  AIClassFrame.prototype.appendBlocks = function (fragment) {
    if (this.scroll && fragment) this.scroll.appendChild(fragment)
  }

  AIClassFrame.prototype.setFocus = function (focus) {
    if (!this.sheet) return
    this.sheet.classList.remove('lf-focus-figure', 'lf-focus-content')
    if (focus === 'figure') this.sheet.classList.add('lf-focus-figure')
    if (focus === 'content') this.sheet.classList.add('lf-focus-content')
  }

  AIClassFrame.prototype.teardown = function () {
    if (this.sheet && this.sheet.parentNode) this.sheet.parentNode.removeChild(this.sheet)
    if (this.background && this.background.parentNode) this.background.parentNode.removeChild(this.background)
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler)
    if (this.ownsStage && this.board && this.board.parentNode) this.board.parentNode.removeChild(this.board)
    this.board = null
    this.stage = null
    this.ownsStage = false
    this.resizeHandler = null
    this.background = null
    this.sheet = null
    this.header = null
    this.top = null
    this.figureMountEl = null
    this.scroll = null
  }

  window.AIClassFrame = AIClassFrame
})()
