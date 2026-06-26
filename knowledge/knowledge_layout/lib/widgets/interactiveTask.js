// AIClass_template/widgets/interactiveTask.js
;(function () {
  function text(value) {
    return value == null ? '' : String(value)
  }

  function escapeHtml(value) {
    return text(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  function normalizeAnswer(value) {
    return text(value).trim().replace(/\s+/g, ' ').toLowerCase()
  }

  function isCorrect(value, answer) {
    if (answer == null) return false
    if (Array.isArray(answer)) {
      return answer.some(function (item) {
        return normalizeAnswer(value) === normalizeAnswer(item)
      })
    }
    return normalizeAnswer(value) === normalizeAnswer(answer)
  }

  function buildModalHtml(block) {
    var task = block.task || {}
    var title = task.questionLabel || '题目'
    var question = task.question || block.question || ''
    var answerText = task.placeholder || '请输入答案'
    var feedback = task.initialFeedback || task.wrongHint || '作答后查看反馈。'
    var history = task.history || ''

    return ''
      + '<section class="aic-interaction-card" data-role="interactive-task">'
      + '  <div class="aic-interaction-kicker">' + escapeHtml((block.modal && block.modal.title) || block.title || '互动题 · 口答') + '</div>'
      + '  <p class="aic-interaction-question" data-question-label="' + escapeHtml(title) + '">' + escapeHtml(question) + '</p>'
      + '  <div class="aic-interaction-answer">'
      + '    <input class="aic-interaction-input" data-role="answer" type="text" autocomplete="off" placeholder="' + escapeHtml(answerText) + '">'
      + '    <button class="aic-interaction-submit" data-role="submit" type="button">' + escapeHtml(task.submitText || '判定') + '</button>'
      + '  </div>'
      + '  <div class="aic-interaction-feedback" data-role="feedback">' + escapeHtml(feedback) + '</div>'
      + (history ? '  <div class="aic-interaction-history"><strong>历史记录：</strong>' + escapeHtml(history) + '</div>' : '')
      + '</section>'
  }

  function attachModalEvents(modal, block) {
    var task = block.task || {}
    var input = modal.el.querySelector('[data-role="answer"]')
    var submit = modal.el.querySelector('[data-role="submit"]')
    var feedback = modal.el.querySelector('[data-role="feedback"]')
    if (!input || !submit || !feedback) return

    function setFeedback(correct) {
      feedback.classList.toggle('is-correct', correct)
      feedback.classList.toggle('is-wrong', !correct)
      feedback.innerHTML = '<strong>' + (correct ? '正确反馈：' : '错误提示：') + '</strong>'
        + escapeHtml(correct ? (task.correctFeedback || '回答正确。') : (task.wrongHint || '再想一想。'))
    }

    function submitAnswer() {
      setFeedback(isCorrect(input.value, task.answer))
    }

    submit.addEventListener('click', submitAnswer)
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') submitAnswer()
    })
  }

  function buildModalOptions(block) {
    var modalOpts = block.modal || {}
    return {
      title: modalOpts.title || block.title || '互动题',
      width: modalOpts.width || 500,
      height: modalOpts.height || 'fill',
      x: typeof modalOpts.x === 'number' ? modalOpts.x : 660,
      y: typeof modalOpts.y === 'number' ? modalOpts.y : 30,
      maxScale: typeof modalOpts.maxScale === 'number' ? modalOpts.maxScale : 1.28,
      html: buildModalHtml(block)
    }
  }

  AIClassWidgetRegistry.register('interactiveTask', function (el, block, runtime, ctx) {
    if (!window.AIClassComponent || typeof window.AIClassComponent.createModal !== 'function') {
      throw new Error('[interactiveTask widget] AIClassComponent.createModal is required')
    }

    var wrap = document.createElement('div')
    wrap.className = 'kn-interactive-task'

    var button = document.createElement('button')
    button.className = 'kn-interactive-task-button'
    button.type = 'button'
    button.textContent = block.buttonText || block.label || '互动题'
    wrap.appendChild(button)
    el.appendChild(wrap)

    var modal = null
    function ensureModal() {
      if (modal) return modal
      modal = window.AIClassComponent.createModal(buildModalOptions(block))
      document.body.appendChild(modal.el)
      attachModalEvents(modal, block)
      return modal
    }

    button.addEventListener('click', function () {
      ensureModal().expand()
    })

    if (ctx && typeof ctx.registerCleanup === 'function') {
      ctx.registerCleanup(function () {
        if (modal) {
          modal.destroy()
          modal = null
        }
      })
    }
  })
})()
