// AIClass_template/exercise/text-only_layout/core/replayAccumulate.js
;(function () {
  function normalizeSteps(steps) {
    if (Array.isArray(steps)) return steps.slice()
    if (!steps) return []
    return Object.keys(steps).sort(function (a, b) {
      var na = Number(a)
      var nb = Number(b)
      if (!isNaN(na) && !isNaN(nb)) return na - nb
      return String(a).localeCompare(String(b))
    }).map(function (key) {
      var step = steps[key] || {}
      if (step.id == null) step.id = isNaN(Number(key)) ? key : Number(key)
      return step
    })
  }

  function resolveIndex(normalized, stepId) {
    if (!normalized.length) return -1
    for (var i = 0; i < normalized.length; i++) {
      if (normalized[i].id === stepId || String(normalized[i].id) === String(stepId)) return i
    }
    if (typeof stepId === 'number' && normalized[stepId - 1]) return stepId - 1
    return -1
  }

  function cloneBlock(block) {
    var copy = {}
    Object.keys(block || {}).forEach(function (key) {
      copy[key] = block[key]
    })
    return copy
  }

  function sectionToBlock(section) {
    if (!section) return null
    return {
      type: 'section',
      title: section.title || '',
      tag: section.tag || ''
    }
  }

  function replayAccumulate(steps, targetId) {
    var normalized = normalizeSteps(steps)
    var targetIndex = resolveIndex(normalized, targetId)
    if (targetIndex < 0) throw new Error('[AIClassTemplate] step not found: ' + targetId)

    var blocks = []
    var targetStep = normalized[targetIndex]
    var currentStart = 0

    for (var i = 0; i <= targetIndex; i++) {
      var step = normalized[i] || {}
      var stepBlocks = []
      if (step.section) {
        var sec = sectionToBlock(step.section)
        if (sec) stepBlocks.push(sec)
      }
      ;(step.push || []).forEach(function (block) {
        stepBlocks.push(cloneBlock(block))
      })
      if (i === targetIndex) currentStart = blocks.length
      stepBlocks.forEach(function (block, localIndex) {
        block.__stepId = step.id
        block.__stepIndex = i
        block.__localIndex = localIndex
        block.__isCurrentStep = i === targetIndex
        blocks.push(block)
      })
    }

    return {
      steps: normalized,
      targetIndex: targetIndex,
      targetStep: targetStep,
      currentStepId: targetStep.id,
      blocks: blocks,
      currentBlockRange: {
        start: currentStart,
        end: blocks.length
      }
    }
  }

  window.AIClassReplay = {
    normalizeSteps: normalizeSteps,
    resolveIndex: resolveIndex,
    replayAccumulate: replayAccumulate
  }
})()
