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

    var panel = dom.create('div', { className: 'aic-modal-panel' })
    panel.appendChild(closeBtn)
    panel.appendChild(body)

    var root = dom.create('div', { className: 'aic-modal' })
    root.setAttribute('data-state', state)
    root.appendChild(mask)
    root.appendChild(floatBtn)
    root.appendChild(panel)

    // ── State machine ──

    function setState(next) {
      if (destroyed) return
      if (!STATES[next]) return
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

    // ── Public API ──

    return {
      el: root,
      show: show,
      hide: hide,
      expand: expand,
      collapse: collapse,
      setState: setState,
      getState: function () { return state },
      destroy: function () {
        if (root.parentNode) root.parentNode.removeChild(root)
        destroyed = true
      }
    }
  }

  ns.createModal = createModal
})()
