// lessons/demo-minimal/play.js
var topBottomDemoLesson = Lesson.create(TOP_BOTTOM_DEMO_CONFIG)
Lesson.bindBtns(topBottomDemoLesson, { prefix: 'btn_step_', count: TOP_BOTTOM_DEMO_CONFIG.steps.length })

window.topBottomDemoGo = function (n) {
  topBottomDemoLesson.go(n)
}

window.topBottomDemoTeardown = function () {
  topBottomDemoLesson.teardown()
}
