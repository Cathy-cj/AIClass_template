# AIClass_template

通用数学课件模板包。`left-right_layout` 只负责左右布局、步骤重放、右侧 widget 适配和左图挂载契约；具体课题只写 `config.js` 与 `figure.js`。

## 目录职责

```text
AIClass_template/
  component/               # 可复用 UI 组件；不依赖 lesson / widget / 交互网关
    button/                # 提交、重置等通用按钮
    choice/                # 选择题通用组件
    shared/                # 组件内部共享工具
  exercise/
    left-right_layout/
      index.js             # 左右布局入口，按顺序加载组件、核心、widgets
      core/
        LayoutStage.js     # 设计稿舞台、等比缩放、背景网格对齐
        Frame.js           # 组装 top / main / figure / scroll 区域
        replayAccumulate.js # go(n) 的 1..n 逻辑重放
        Runner.js          # 对外 run/go 生命周期
        Scroll.js          # 滚动到当前步骤
        InteractionGate.js # 仅当前步骤可交互
        Lesson.js          # Lesson.create / bindBtns
      figure/
        FigureHost.js      # figure.mount / setState / reset 适配
      widgets/
        registry.js        # widget 注册和 mountAll
        *.js               # widget 适配层：把 config 转成组件或 DOM
      theme/
        grid-paper.css     # 默认方格纸主题和布局变量
      schema/
        lesson.schema.json # config 约束
      docs/
        AUTHORING.md       # 写课规则
        WIDGET_CATALOG.md  # widget 词典
      lessons/
        _template/         # 新课复制骨架
        demo-minimal/      # 模板能力演示
```

## 核心约定

- `lesson.go(n)` 会重放 `steps[1..n]`，跳步、回退、重复点击必须得到一致画面。
- 左图只通过 `figure.setState(state, params)` 改变。
- 右侧内容只通过 `push: [{ type, ...props }]` 生成。
- 顶部题干使用 `top`，高度自适应，不传则不占位。
- 不要在 `core/` 写课题业务逻辑。
- `widgets/` 是适配层：可以调用 `component/`，但不要沉淀课题专用逻辑。
- `component/` 是通用 UI 层：不依赖 lesson、step、widget registry 或交互网关。

## 常用 layout 参数

```js
layout: {
  theme: 'grid-paper',
  figureWidth: 360,
  figureSvgWidth: 300,
  gap: 32,
  edgePad: 32,
  mainPadding: '0 32px',
  scrollPadding: '0 0 160px 0'
}
```
