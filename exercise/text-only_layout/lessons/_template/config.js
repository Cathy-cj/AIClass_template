// lessons/_template/config.js
var TEMPLATE_TEXT_ONLY_CONFIG = {
  meta: {
    id: 'text-only-template',
    title: '课题名称',
    tag: '模板'
  },
  layout: {
    theme: 'grid-paper'
  },
  top: {
    tag: '题目',
    title: '这里写题干标题',
    lines: ['这里写题干补充说明。顶部题目区固定，下方做题区整体滚动。']
  },
  steps: [
    {
      id: 1,
      section: { tag: '模块1', title: '模块标题' },
      push: [
        { type: 'text', lines: ['这里写本步新增说明。'] }
      ]
    }
  ]
}
