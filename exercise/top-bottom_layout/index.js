// AIClass_template/exercise/top-bottom_layout/index.js
// Browser entry for the top-bottom exercise layout.
;(function () {
  if (window.Lesson && window.Lesson.__aiClassTemplateVersion) return

  var script = document.currentScript
  var base = script && script.src ? script.src.replace(/\/[^\/]*$/, '/') : './'
  var shared = '../left-right_layout/'
  var files = [
    'theme/grid-paper.css',
    '../../component/index.js',
    shared + 'core/LayoutStage.js',
    'core/Frame.js',
    shared + 'figure/FigureHost.js',
    shared + 'core/replayAccumulate.js',
    shared + 'core/Scroll.js',
    shared + 'core/InteractionGate.js',
    shared + 'widgets/registry.js',
    shared + 'widgets/heading.js',
    shared + 'widgets/text.js',
    shared + 'widgets/oral.js',
    shared + 'widgets/fill.js',
    shared + 'widgets/choice.js',
    shared + 'widgets/chain.js',
    shared + 'widgets/phase.js',
    shared + 'widgets/readList.js',
    shared + 'widgets/solveStep.js',
    shared + 'core/Runner.js',
    shared + 'core/Lesson.js'
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
    console.warn('[AIClass_template] top-bottom_layout/index.js should be loaded during document parsing. Load files manually when injecting after page load.')
  }
})()
