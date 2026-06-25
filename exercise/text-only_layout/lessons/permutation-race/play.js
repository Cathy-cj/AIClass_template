// lessons/permutation-race/play.js
var permutationRaceLesson = Lesson.create(PERMUTATION_RACE_CONFIG)
Lesson.bindBtns(permutationRaceLesson, { prefix: 'btn_step_', count: PERMUTATION_RACE_CONFIG.steps.length })

window.permutationRaceGo = function (n) {
  permutationRaceLesson.go(n)
}

window.permutationRaceTeardown = function () {
  permutationRaceLesson.teardown()
}
