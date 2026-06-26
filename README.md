# AIClass_template

零依赖、浏览器原生的交互式数学课件框架。

## 项目结构

```text
AIClass_template/
├── component/                # 通用 UI 组件库（共享）
├── exercise/                 # 习题模块（三种布局）
│   ├── left-right_layout/    #   左图右文布局
│   ├── top-bottom_layout/    #   上图下文布局
│   └── text-only_layout/     #   纯文本布局
├── knowledge/                # 知识点讲解模块
│   ├── core/                 #   核心引擎（Runner、Replay、Debug）
│   ├── lib/                  #   本地副本（独立维护）
│   ├── theme/                #   主题样式
│   └── lessons/              #   课程内容
├── CLAUDE.md                 # AI 助手指令
└── README.md                 # 本文件
```

## 包说明

| 包 | 说明 |
|---|---|
| `component/` | 通用 UI 组件库，可被 exercise/ 和 knowledge/ 引用 |
| `exercise/` | 习题模块，包含三种布局引擎 |
| `knowledge/` | 知识点讲解模块，独立维护 |

## 依赖方向

```text
component/  ←  exercise/
            ←  knowledge/
```

## 开发方式

无构建工具，无 npm 依赖。直接用浏览器打开或本地服务器：

```bash
npx serve .
# 然后打开 lessons/*/index.html
```

所有代码通过 `<script>` 和 `<link>` 标签加载，使用 `window.*` 全局命名空间。

## 调试模式

在 URL 中添加 `?t` 参数启用调试面板（线性步骤导航）。
