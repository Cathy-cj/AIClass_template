// AIClass_template/core/Knowledge.js
;(function () {
  function create(config) {
    var runner = new AIClassKnowledgeRunner(config || {})
    runner.mount()
    return runner
  }

  window.Knowledge = {
    __aiClassKnowledgeVersion: '0.3.0',
    create: create
  }
})()
