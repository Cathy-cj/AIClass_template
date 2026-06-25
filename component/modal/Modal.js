// AIClass_template/component/modal/Modal.js
;(function () {
  var ns = window.AIClassComponent = window.AIClassComponent || {}
  var dom = ns._dom

  if (!dom) throw new Error('[AIClassComponent.Modal] shared/dom.js is required')

  var STATES = { hidden: 'hidden', float: 'float', visible: 'visible' }

  function createModal(opts) {
    opts = opts || {}
    var html = opts.html || ''
    var icon = opts.icon || '互动'
    var title = opts.title || ''
    var designWidth = opts.designWidth || window.DESIGN_WIDTH || 1200
    var designHeight = opts.designHeight || window.DESIGN_HEIGHT || 680
    var panelWidth = opts.width || Math.round(designWidth * 0.8)
    var panelHeight = opts.height || Math.round(designHeight * 0.8)
    var panelX = typeof opts.x === 'number' ? opts.x : Math.round((designWidth - panelWidth) / 2)
    var panelY = typeof opts.y === 'number' ? opts.y : Math.round((designHeight - panelHeight) / 2)
    var panelScale = typeof opts.scale === 'number' ? opts.scale : 1
    var minScale = typeof opts.minScale === 'number' ? opts.minScale : 0.72
    var maxScale = typeof opts.maxScale === 'number' ? opts.maxScale : 1.28
    var state = STATES.hidden
    var destroyed = false

    var onShow = typeof opts.onShow === 'function' ? opts.onShow : null
    var onHide = typeof opts.onHide === 'function' ? opts.onHide : null
    var onClose = typeof opts.onClose === 'function' ? opts.onClose : null

    // ── Build DOM ──

    var mask = dom.create('div', { className: 'aic-modal-mask' })

    var floatBtn = dom.create('div', {
      className: 'aic-modal-float',
      attributes: {
        role: 'button',
        tabindex: '0',
        'aria-label': title || '打开弹窗'
      }
    })
    floatBtn.appendChild(dom.create('span', { className: 'aic-modal-float-icon', text: icon }))

    var closeBtn = dom.create('button', {
      className: 'aic-modal-close',
      type: 'button',
      attributes: { 'aria-label': '关闭' }
    })
    closeBtn.textContent = '×'

    var body = dom.create('div', { className: 'aic-modal-body' })
    if (html) body.innerHTML = html

    var resizeHandle = dom.create('div', {
      className: 'aic-modal-resize',
      attributes: {
        role: 'button',
        tabindex: '0',
        'aria-label': '缩放弹窗'
      }
    })

    var panel = dom.create('div', { className: 'aic-modal-panel' })
    panel.appendChild(closeBtn)
    panel.appendChild(body)
    panel.appendChild(resizeHandle)

    var root = dom.create('div', { className: 'aic-modal' })
    root.setAttribute('data-state', state)
    root.appendChild(mask)
    root.appendChild(floatBtn)
    root.appendChild(panel)

    // ── State machine ──

    function syncLayout() {
      if (destroyed) return
      var scale = Math.min(window.innerWidth / designWidth, window.innerHeight / designHeight)
      var boardLeft = Math.round((window.innerWidth - designWidth * scale) / 2)
      var boardTop = Math.round((window.innerHeight - designHeight * scale) / 2)
      var panelLeft = boardLeft + Math.round(panelX * scale)
      var panelTop = boardTop + Math.round(panelY * scale)
      var floatLeft = boardLeft + Math.round((designWidth - 16 - 36) * scale)
      var floatTop = boardTop + Math.round((designHeight * 0.25 - 42) * scale)

      root.style.setProperty('--aic-board-scale', String(scale))
      root.style.setProperty('--aic-panel-left', panelLeft + 'px')
      root.style.setProperty('--aic-panel-top', panelTop + 'px')
      root.style.setProperty('--aic-panel-width', panelWidth + 'px')
      root.style.setProperty('--aic-panel-height', panelHeight + 'px')
      root.style.setProperty('--aic-panel-scale', String(panelScale))
      root.style.setProperty('--aic-float-left', floatLeft + 'px')
      root.style.setProperty('--aic-float-top', floatTop + 'px')
    }

    function clampScale(value) {
      var verticalMaxScale = panelHeight > 0 ? (designHeight - panelY) / panelHeight : maxScale
      var effectiveMaxScale = Math.min(maxScale, verticalMaxScale)
      return Math.max(minScale, Math.min(effectiveMaxScale, value))
    }

    function setPanelScale(nextScale) {
      if (destroyed) return
      panelScale = clampScale(nextScale)
      root.style.setProperty('--aic-panel-scale', String(panelScale))
    }

    function movePanel(nextX, nextY) {
      if (destroyed) return
      panelX = nextX
      panelY = nextY
      syncLayout()
    }

    function shouldSkipDrag(target) {
      if (!target || !target.closest) return false
      return !!target.closest('.aic-modal-close, .aic-modal-resize, button, a, input, textarea, select, [data-no-drag]')
    }

    function setState(next) {
      if (destroyed) return
      if (!STATES[next]) return
      syncLayout()
      var prev = state
      state = next
      root.setAttribute('data-state', state)
      if (prev !== STATES.visible && state === STATES.visible && onShow) onShow()
      if (prev === STATES.visible && state !== STATES.visible) {
        if (onClose) onClose()
        if (onHide) onHide()
      }
    }

    function show() { setState(STATES.float) }
    function hide() { setState(STATES.hidden) }

    function syncOrigin() {
      var rect = floatBtn.getBoundingClientRect()
      var cx = rect.left + rect.width / 2
      var cy = rect.top + rect.height / 2
      panel.style.setProperty('--aic-origin-x', cx + 'px')
      panel.style.setProperty('--aic-origin-y', cy + 'px')
    }

    function expand() {
      syncOrigin()
      setState(STATES.visible)
    }

    function collapse() {
      syncOrigin()
      setState(STATES.float)
    }

    // ── Events ──

    floatBtn.addEventListener('click', function () {
      if (state === STATES.float) expand()
    })

    floatBtn.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && state === STATES.float) {
        e.preventDefault()
        expand()
      }
    })

    closeBtn.addEventListener('click', function () {
      if (state === STATES.visible) collapse()
    })

    resizeHandle.addEventListener('pointerdown', function (e) {
      if (state !== STATES.visible) return
      e.preventDefault()
      e.stopPropagation()
      var startX = e.clientX
      var startY = e.clientY
      var startScale = panelScale
      var boardScale = parseFloat(root.style.getPropertyValue('--aic-board-scale')) || 1

      function onMove(moveEvent) {
        var deltaX = moveEvent.clientX - startX
        var deltaY = moveEvent.clientY - startY
        var deltaScale = Math.max(deltaX / (panelWidth * boardScale), deltaY / (panelHeight * boardScale))
        setPanelScale(startScale + deltaScale)
      }

      function onUp() {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    })

    panel.addEventListener('pointerdown', function (e) {
      if (state !== STATES.visible) return
      if (shouldSkipDrag(e.target)) return
      e.preventDefault()
      var startX = e.clientX
      var startY = e.clientY
      var startPanelX = panelX
      var startPanelY = panelY
      var boardScale = parseFloat(root.style.getPropertyValue('--aic-board-scale')) || 1
      root.setAttribute('data-dragging', 'true')

      function onMove(moveEvent) {
        var deltaX = (moveEvent.clientX - startX) / boardScale
        var deltaY = (moveEvent.clientY - startY) / boardScale
        movePanel(startPanelX + deltaX, startPanelY + deltaY)
      }

      function onUp() {
        root.removeAttribute('data-dragging')
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    })

    window.addEventListener('resize', syncLayout)
    syncLayout()

    // ── Public API ──

    return {
      el: root,
      show: show,
      hide: hide,
      expand: expand,
      collapse: collapse,
      setState: setState,
      setScale: setPanelScale,
      moveTo: movePanel,
      getState: function () { return state },
      getScale: function () { return panelScale },
      destroy: function () {
        window.removeEventListener('resize', syncLayout)
        if (root.parentNode) root.parentNode.removeChild(root)
        destroyed = true
      }
    }
  }

  ns.createModal = createModal
})()
