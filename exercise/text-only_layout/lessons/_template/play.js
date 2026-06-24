// lessons/_template/play.js
var templateTextOnlyLesson = Lesson.create(TEMPLATE_TEXT_ONLY_CONFIG)
Lesson.bindBtns(templateTextOnlyLesson, { prefix: 'btn_step_', count: TEMPLATE_TEXT_ONLY_CONFIG.steps.length })
