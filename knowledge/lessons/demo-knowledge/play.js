// lessons/demo-knowledge/play.js
var demoKnowledge = Knowledge.create(DEMO_KNOWLEDGE_CONFIG)
demoKnowledge.next()  // 自动展示第一个主题

// Debug panel (?t)
var debugPanel = new AIClassKnowledgeDebugPanel(demoKnowledge)

window.demoNext = function () { return demoKnowledge.next() }
window.demoGo = function (stepId) { return demoKnowledge.go(stepId) }
window.demoNextStep = function () { return demoKnowledge.nextStep() }
window.demoScrollTo = function (topicId) { return demoKnowledge.scrollTo(topicId) }
window.demoCurrent = function () { return demoKnowledge.current() }
