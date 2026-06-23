// lessons/_template/play.js
var templateLesson = Lesson.create(TEMPLATE_LESSON_CONFIG)
Lesson.bindBtns(templateLesson, { prefix: 'btn_step_', count: TEMPLATE_LESSON_CONFIG.steps.length })
window.templateLessonTeardown = function () {
  templateLesson.teardown()
}
