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
      title: section.title || ''
    }
  }

  function isReplaceableType(type) {
    return type === 'fill' || type === 'choice' || type === 'clickText' || type === 'dragPermutation'
  }

  function partSignature(part) {
    part = part || {}
    if (part.kind === 'blank' || part.type === 'blank') return '__blank__'
    return (part.type || 'text') + ':' + String(part.value != null ? part.value : '')
  }

  function optionSignature(option) {
    if (typeof option === 'string') return option
    option = option || {}
    return String(option.value != null ? option.value : option.text || option.label || '')
  }

  function blockSignature(block) {
    if (!block || !isReplaceableType(block.type)) return ''
    if (block.type === 'fill') return 'fill:' + (block.parts || []).map(partSignature).join('|')
    if (block.type === 'choice') return 'choice:' + (block.options || []).map(optionSignature).join('|')
    if (block.type === 'clickText') return 'clickText:' + (block.segments || []).map(optionSignature).join('|')
    if (block.type === 'dragPermutation') return 'dragPermutation:' + (block.cards || []).map(optionSignature).join('|') + '>' + (block.slots || []).map(optionSignature).join('|')
    return ''
  }

  function isRevealBlock(block) {
    return !!(block && isReplaceableType(block.type) && (block.readonly || block.revealed || block.value != null))
  }

  function registerReplaceableBlock(block, index, replaceSlots) {
    if (!block || !isReplaceableType(block.type)) return
    var key = block.id || block.target || block.replace
    var signature = blockSignature(block)
    if (key) replaceSlots.byKey[String(key)] = index
    if (signature) replaceSlots.bySignature[signature] = index
  }

  function findReplacement(block, replaceSlots) {
    if (!isRevealBlock(block)) return -1
    var key = block.target || block.replace || block.id
    var signature = blockSignature(block)
    if (key && replaceSlots.byKey[String(key)] != null) return replaceSlots.byKey[String(key)]
    if (signature && replaceSlots.bySignature[signature] != null) return replaceSlots.bySignature[signature]
    return -1
  }

  function replayAccumulate(steps, targetId) {
    var normalized = normalizeSteps(steps)
    var targetIndex = resolveIndex(normalized, targetId)
    if (targetIndex < 0) throw new Error('[AIClassTemplate] step not found: ' + targetId)

    var blocks = []
    var targetStep = normalized[targetIndex]
    var currentStart = 0
    var currentEnd = 0
    var replaceSlots = { byKey: {}, bySignature: {} }

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
        var replaceIndex = findReplacement(block, replaceSlots)
        if (replaceIndex >= 0) {
          blocks[replaceIndex] = block
          registerReplaceableBlock(block, replaceIndex, replaceSlots)
          if (i === targetIndex) currentStart = Math.min(currentStart, replaceIndex)
          return
        }
        blocks.push(block)
        registerReplaceableBlock(block, blocks.length - 1, replaceSlots)
      })
      if (i === targetIndex) currentEnd = blocks.length
    }

    return {
      steps: normalized,
      targetIndex: targetIndex,
      targetStep: targetStep,
      currentStepId: targetStep.id,
      blocks: blocks,
      currentBlockRange: {
        start: currentStart,
        end: currentEnd || blocks.length
      }
    }
  }

  window.AIClassReplay = {
    normalizeSteps: normalizeSteps,
    resolveIndex: resolveIndex,
    replayAccumulate: replayAccumulate
  }
})()
