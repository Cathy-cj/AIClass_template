// AIClass_template/exercise/knowledge/index.js
// Browser entry for the knowledge module.
;(function () {
  if (window.Knowledge && window.Knowledge.__aiClassKnowledgeVersion) return

  var script = document.currentScript
  var base = script && script.src ? script.src.replace(/\/[^\/]*$/, '/') : './'
  var files = [
    'theme/knowledge.css',
    'component/button/button.css',
    'component/choice/choice.css',
    'component/shared/dom.js',
    'component/shared/option.js',
    'component/button/Button.js',
    'component/choice/ChoiceQuestion.js',
    'lib/core/LayoutStage.js',
    'lib/replay/replayAccumulate.js',
    'lib/figure/FigureHost.js',
    'lib/widgets/registry.js',
    'lib/widgets/heading.js',
    'lib/widgets/text.js',
    'lib/widgets/oral.js',
    'lib/widgets/fill.js',
    'lib/widgets/choice.js',
    'lib/widgets/chain.js',
    'lib/widgets/phase.js',
    'lib/widgets/readList.js',
    'lib/widgets/solveStep.js',
    'component/debug-panel/DebugPanel.js',
    'core/PageScroll.js',
    'core/PageReplay.js',
    'core/PageContainer.js',
    'core/KnowledgeRunner.js',
    'core/Knowledge.js'
  ]

  function writeAsset(path) {
    var url = base + path
    if (/\.css$/.test(path)) {
      document.write('<link rel="stylesheet" href="' + url + '">')
    } else {
      document.write('<script src="' + url + '"><\/script>')
    }
  }

  if (document.readyState === 'loading') {
    files.forEach(writeAsset)
  } else {
    console.warn('[AIClass_template] knowledge/index.js should be loaded during document parsing.')
  }
})()
