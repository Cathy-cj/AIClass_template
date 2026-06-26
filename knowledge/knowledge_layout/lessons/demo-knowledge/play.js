// lessons/demo-knowledge/play.js
var demoKnowledge = Knowledge.create(DEMO_KNOWLEDGE_CONFIG)

// Debug panel (?t) — controls all navigation when active
var debugPanel = new AIClassKnowledgeDebugPanel(demoKnowledge)

// Without debug panel: auto-reveal first topic
if (!debugPanel.runner) {
  demoKnowledge.next()
}

// Expose for console testing
window.demoNext = function () { return demoKnowledge.next() }
window.demoGo = function (stepId) { return demoKnowledge.go(stepId) }
window.demoNextStep = function () { return demoKnowledge.nextStep() }
window.demoGoToLinear = function (i) { return demoKnowledge.goToLinear(i) }
window.demoLinearSteps = function () { return demoKnowledge.linearSteps() }
window.demoScrollTo = function (topicId) { return demoKnowledge.scrollTo(topicId) }
window.demoCurrent = function () { return demoKnowledge.current() }
