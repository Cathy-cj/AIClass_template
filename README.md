# AIClass_template

通用数学课件模板包 — 零依赖、浏览器原生的交互式课件框架。

## 项目结构

```text
AIClass_template/
├── component/                # 通用 UI 组件库
├── exercise/                 # 习题模块
│   ├── left-right_layout/    # 左图右文布局
│   └── top-bottom_layout/    # 上图下文布局
├── knowledge/                # 知识点讲解模块
├── CLAUDE.md
└── README.md
```

## 包说明

| 包 | 说明 |
|---|---|
| `component/` | 通用 UI 组件库，可被 exercise/ 和 knowledge/ 引用 |
| `exercise/` | 习题模块，包含两种布局引擎 |
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
