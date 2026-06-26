// lessons/_template/config.js
var TEMPLATE_TOP_BOTTOM_CONFIG = {
  meta: {
    id: 'top-bottom-template',
    title: '课题名称'
  },
  layout: {
    theme: 'grid-paper',
    figureHeight: 230,
    figureSvgWidth: 1040
  },
  top: {
    title: '这里写适合横向示意图的题干标题',
    lines: ['这里写题干补充说明。']
  },
  figure: TemplateTopBottomFigure,
  figureStates: {
    intro: '初始横向示意图'
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
