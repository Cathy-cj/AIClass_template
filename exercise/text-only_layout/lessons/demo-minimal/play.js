// lessons/demo-minimal/play.js
var textOnlyDemoLesson = Lesson.create(TEXT_ONLY_DEMO_CONFIG)
Lesson.bindBtns(textOnlyDemoLesson, { prefix: 'btn_step_', count: TEXT_ONLY_DEMO_CONFIG.steps.length })

window.textOnlyDemoGo = function (n) {
  textOnlyDemoLesson.go(n)
}

window.textOnlyDemoTeardown = function () {
  textOnlyDemoLesson.teardown()
}
