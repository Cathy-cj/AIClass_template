// AIClass_template/index.js
// Browser entry for the generic lesson template.
;(function () {
  if (window.Lesson && window.Lesson.__aiClassTemplateVersion) return

  var script = document.currentScript
  var base = script && script.src ? script.src.replace(/\/[^\/]*$/, '/') : './'
  var files = [
    'theme/grid-paper.css',
    'core/LayoutStage.js',
    'core/Frame.js',
    'figure/FigureHost.js',
    'core/replayAccumulate.js',
    'core/Scroll.js',
    'core/InteractionGate.js',
    'widgets/registry.js',
    'widgets/heading.js',
    'widgets/text.js',
    'widgets/oral.js',
    'widgets/fill.js',
    'widgets/choice.js',
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
    console.warn('[AIClass_template] index.js should be loaded during document parsing. Load core files manually when injecting after page load.')
  }
})()
