// AIClass_template/exercise/top-bottom_layout/core/Lesson.js
;(function () {
  function create(config) {
    var runner = new AIClassRunner(config || {})
    runner.mount()
    return runner
  }

  function bindBtns(lesson, opts) {
    opts = opts || {}
    if (!lesson) throw new Error('[Lesson.bindBtns] lesson is required')
    if (opts.map) {
      Object.keys(opts.map).forEach(function (name) {
        window[name] = function () { lesson.go(opts.map[name]) }
      })
      return
    }
    var prefix = opts.prefix || 'btn_step_'
    var count = opts.count || (lesson.steps ? lesson.steps.length : 0)
    for (var i = 1; i <= count; i++) {
      ;(function (n) {
        window[prefix + n] = function () { lesson.go(n) }
      })(i)
    }
  }

  window.Lesson = {
    __aiClassTemplateVersion: '0.1.0',
    create: create,
    bindBtns: bindBtns
  }
})()
// AIClass_template/exercise/top-bottom_layout/core/Lesson.js
;(function () {
  function create(config) {
    var runner = new AIClassRunner(config || {})
    runner.mount()
    return runner
  }

  function bindBtns(lesson, opts) {
    opts = opts || {}
    if (!lesson) throw new Error('[Lesson.bindBtns] lesson is required')
    if (opts.map) {
      Object.keys(opts.map).forEach(function (name) {
        window[name] = function () { lesson.go(opts.map[name]) }
      })
      return
    }
    var prefix = opts.prefix || 'btn_step_'
    var count = opts.count || (lesson.steps ? lesson.steps.length : 0)
    for (var i = 1; i <= count; i++) {
      ;(function (n) {
        window[prefix + n] = function () { lesson.go(n) }
      })(i)
    }
  }

  window.Lesson = {
    __aiClassTemplateVersion: '0.1.0',
    create: create,
    bindBtns: bindBtns
  }
})()
