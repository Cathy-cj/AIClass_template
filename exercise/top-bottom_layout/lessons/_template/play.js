// lessons/_template/play.js
var templateTopBottomLesson = Lesson.create(TEMPLATE_TOP_BOTTOM_CONFIG)
Lesson.bindBtns(templateTopBottomLesson, { prefix: 'btn_step_', count: TEMPLATE_TOP_BOTTOM_CONFIG.steps.length })
