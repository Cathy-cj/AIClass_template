// lessons/_template/config.js
var TEMPLATE_LESSON_CONFIG = {
  meta: {
    id: 'template-lesson',
    title: '课题名称'
  },
  layout: {
    theme: 'grid-paper'
  },
  top: {
    title: '这里写题干标题',
    lines: ['这里写题干内容。题干高度会自动撑开，下方图文区域使用剩余高度。']
  },
  figure: TemplateFigure,
  figureStates: {
    intro: '初始画面'
  },
  steps: [
    {
      id: 1,
      section: { title: '模块标题' },
      figure: { state: 'intro' },
      push: [
        { type: 'text', lines: ['这里写本步新增说明。'] }
      ]
    }
  ]
}
