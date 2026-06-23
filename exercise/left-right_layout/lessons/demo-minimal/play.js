// lessons/demo-minimal/play.js
var demoMinimalLesson = Lesson.create(DEMO_MINIMAL_CONFIG)
Lesson.bindBtns(demoMinimalLesson, { prefix: 'btn_step_', count: DEMO_MINIMAL_CONFIG.steps.length })

window.demoMinimalGo = function (n) {
  demoMinimalLesson.go(n)
}

window.demoMinimalTeardown = function () {
  demoMinimalLesson.teardown()
}
