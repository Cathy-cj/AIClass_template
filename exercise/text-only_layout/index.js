// AIClass_template/exercise/text-only_layout/index.js
// Browser entry for the text-only exercise layout.
;(function () {
  if (window.Lesson && window.Lesson.__aiClassTemplateVersion) return

  var script = document.currentScript
  var base = script && script.src ? script.src.replace(/\/[^\/]*$/, '/') : './'
  var files = [
    'theme/grid-paper.css',
    '../../component/index.js',
    'core/LayoutStage.js',
    'core/Frame.js',
    'core/replayAccumulate.js',
    'core/Scroll.js',
    'core/InteractionGate.js',
    'widgets/registry.js',
    'widgets/heading.js',
    'widgets/text.js',
    'widgets/oral.js',
    'widgets/fill.js',
    'widgets/choice.js',
    'widgets/clickText.js',
    'widgets/dragPermutation.js',
    'widgets/oralInput.js',
    'widgets/chain.js',
    'widgets/phase.js',
    'widgets/readList.js',
    'widgets/solveStep.js',
    'core/Runner.js',
    'core/Lesson.js'
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
    console.warn('[AIClass_template] text-only_layout/index.js should be loaded during document parsing. Load files manually when injecting after page load.')
  }
})()
