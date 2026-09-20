# 知识配置平台 - 设计规范（Design Spec）

本文档定义中后台前端的视觉设计令牌与组件规范。实现必须以 CSS Variables 与 Tailwind 配置中的同名令牌为单一来源，页面不得直接写死会随主题变化的配色、圆角或阴影。

---

## 1. 主题机制

### 1.1 两套主题

| 主题 | `data-theme` | 根节点类名 | 说明 |
|------|--------------|------------|------|
| 浅色 | `light` | 无 `dark` 类 | 默认风格，保持现有 VOYAGE 展示效果 |
| 深色 | `dark` | `dark` | 在保持同一布局与层级的前提下切换深色表面、文字、边框与阴影 |

- 主题在页面样式加载前由 `js/theme.js` 写入 `<html data-theme="...">`，避免刷新闪屏。
- 用户选择持久化在 `localStorage.knowledge_platform_theme`。
- 未保存或值非法时默认使用 `light`。
- 切换主题时派发 `themechange` 事件，图表等无法仅依靠 CSS 变量完成刷新的内容监听该事件更新。

### 1.2 切换入口

- 已登录页面：主题切换按钮位于顶栏右侧。
- 登录页：主题切换按钮固定在页面右上角。
- 按钮必须包含可更新的 `aria-label` 与 `aria-pressed`。

---

## 2. 色彩令牌

### 2.1 语义色

| Token | 浅色 | 深色 | 用途 |
|-------|------|------|------|
| `--color-canvas` | `#f8fafc` | `#0b1120` | 页面背景 |
| `--color-sidebar` | `rgba(255,255,255,.85)` | `rgba(15,23,42,.86)` | 侧栏背景 |
| `--color-header` | `#ffffff` | `#0f172a` | 顶栏背景 |
| `--color-surface` | `#ffffff` | `#111c2e` | 卡片、表格、弹层、Toast |
| `--color-surface-muted` | `#f1f5f9` | `#17243a` | 次级表面、悬停表面 |
| `--color-border` | `#e2e8f0` | `#2a3850` | 主要边框 |
| `--color-border-light` | `#f1f5f9` | `#202d43` | 卡片、表格的弱分割线 |
| `--color-text-strong` | `#0f172a` | `#f8fafc` | 标题、主要数据、强文字 |
| `--color-text-base` | `#334155` | `#cbd5e1` | 正文 |
| `--color-text-muted` | `#64748b` | `#94a3b8` | 辅助文字、空状态 |
| `--color-text-subtle` | `#94a3b8` | `#64748b` | 占位符与弱提示 |
| `--color-primary` | `#0f172a` | `#f8fafc` | 主按钮、品牌底色 |
| `--color-on-primary` | `#ffffff` | `#0f172a` | 主按钮与品牌底色上的文字 |
| `--color-accent` | `#059669` | `#34d399` | 品牌强调色、当前导航 |

### 2.2 Slate 映射

Tailwind 的 `slate-*` 颜色不直接使用固定色板，而映射到主题变量，保证同一个 `text-slate-*` / `bg-slate-*` / `border-slate-*` 类在两套主题下都可读。

| Tailwind 色阶 | 浅色 | 深色 |
|---------------|------|------|
| 50 | `#f8fafc` | `#17243a` |
| 100 | `#f1f5f9` | `#1e2c42` |
| 200 | `#e2e8f0` | `#334155` |
| 400 | `#94a3b8` | `#64748b` |
| 500 | `#64748b` | `#94a3b8` |
| 600 | `#475569` | `#94a3b8` |
| 700 | `#334155` | `#cbd5e1` |
| 800 | `#1e293b` | `#e2e8f0` |
| 900 | `#0f172a` | `#f8fafc` |

### 2.3 状态色

成功、警告、错误与重复数据状态必须使用 `--color-emerald-*`、`--color-amber-*`、`--color-rose-*`、`--color-red-*` 或对应语义别名，不得在页面中写死浅色状态底色。

深色主题中的状态色应降低背景亮度、提高文字亮度，保证表格与弹层中的对比度。

---

## 3. 圆角令牌

所有界面圆角必须来自下表或 Tailwind 映射类，不允许新增孤立数值。

| Token | 值 | Tailwind 类 | 用途 |
|-------|----|-------------|------|
| `--radius-sm` | `0.375rem`（6px） | `rounded-sm` / `rounded-md` | 滚动条、图表柱子、统计小标签 |
| `--radius-md` | `0.5rem`（8px） | `rounded-lg` | 图标底、行内按钮、Tab、按钮 |
| `--radius-lg` | `0.75rem`（12px） | `rounded-xl` | 输入框、表格容器、空状态、Toast |
| `--radius-xl` | `1rem`（16px） | `rounded-2xl` | 卡片、弹层、统计容器、登录卡片 |
| `--radius-2xl` | `1.25rem`（20px） | `rounded-3xl` | 兼容扩展与大号品牌图形 |
| `--radius-full` | `9999px` | `rounded-full` | 状态徽标 |

---

## 4. 阴影与层级

阴影统一表达组件层级。深色主题中使用更强的黑色阴影，而不是照搬浅色阴影。

| Token | 浅色用途 |
|-------|----------|
| `--shadow-xs` | 主题切换等小型控件 |
| `--shadow-sm` / `--shadow-card` | 常规卡片、表格卡片 |
| `--shadow-card-hover` | 卡片悬停 |
| `--shadow-button` | 主按钮默认 |
| `--shadow-button-hover` | 主按钮悬停、登录按钮悬停 |
| `--shadow-lg` | 登录品牌图形 |
| `--shadow-xl` | 登录卡片 |
| `--shadow-toast` | Toast |
| `--shadow-overlay` | Modal、Confirm 弹层 |
| `--shadow-focus` | 绿色输入焦点环 |
| `--shadow-focus-control` | Select 等控件焦点环 |
| `--shadow-focus-login` | 登录输入框焦点环 |

弹层层级：普通控件 < 卡片 < 悬浮主题按钮（z-index 40）< Modal（z-index 50）< Confirm（z-index 60）< Toast（z-index 9999）。

---

## 5. 核心组件规范

### 5.1 卡片

- 使用 `premium-card` 或 Tailwind 的 `rounded-xl`（12px 容器）/ `rounded-2xl`（16px 卡片）配合卡片阴影。
- 背景：`--color-surface`。
- 边框：`1px var(--color-border-light)`。
- 阴影：默认 `--shadow-card`，悬停 `--shadow-card-hover`。

### 5.2 表格与空状态

- 表格必须放在卡片内，容器圆角使用 `rounded-lg/xl`，避免子元素溢出。
- 表头使用 `--color-slate-50`，行悬停使用 `--color-slate-100`。
- 单元格正文使用 `--color-text-base`，辅助列使用 `--color-text-muted`。
- 空状态使用 `empty-state`，背景为表面色、文字为辅助色，并保留垂直留白；深色主题下不得只显示一条深色文字。

### 5.3 弹层

- 遮罩：`--color-overlay` + 4px 背景模糊。
- 弹层：`--color-surface`、`--color-border`、`--radius-xl`、`--shadow-overlay`。
- 标题使用 `--color-text-strong`，表单标签使用 `--color-text-base`。
- 弹层最大高度受视口限制，内容区可滚动。

### 5.4 表单

- 普通输入框默认使用 `--color-slate-100` 作为填充表面，聚焦后切换为 `--color-surface`。
- Select 使用表面色、主题边框和随主题切换的箭头 SVG。
- 焦点环必须使用焦点阴影令牌。
- `option` 也必须设置深色背景与文字，避免系统弹层仍为白底深字但与页面风格割裂。

### 5.5 按钮

- 主按钮使用 `--color-primary` 与 `--color-on-primary`；深色主题下是浅底深字，不再固定黑底白字。
- 次按钮使用表面色、主题边框和正文色。
- 危险链接使用 `--color-red-600`，悬停背景使用 `--color-danger-soft`。

### 5.6 批量导入

- 上传区域使用 `--color-slate-50` 与虚线边框，拖入时使用绿色描边和 `--color-file-zone-active`。
- 预览表格沿用卡片、表格和边框令牌。
- “新增 / 已有重复 / 同批重复”徽标必须使用对应的 emerald、amber、rose 状态令牌。

### 5.7 图表

- 坐标轴、刻度、网格、图例、Tooltip 与系列色使用 `--chart-*` 变量。
- 饼图分割线使用 `--color-surface`。
- 切换主题后通过 `themechange` 更新 Chart.js 配置并调用 `chart.update('none')`。

### 5.8 登录页

- 背景渐变使用 `--login-gradient`。
- 登录卡片沿用卡片圆角与阴影令牌。
- Logo 与登录按钮使用品牌主色令牌，不允许固定黑底白字。

---

## 6. 兼容性要求

- 浅色主题为默认主题，现有页面布局、间距、字号和视觉层级不得走样。
- 深浅色切换只替换设计令牌和必要的图表配置，不改变信息结构与操作路径。
- 弹层、表格、空状态、表单、Toast、批量导入预览在深色主题下必须保持可读。
- 所有新增组件优先使用语义令牌；只有设计稿确认的新令牌才能加入本规范。

---

**文档版本**：v2.0
**状态**：已纳入浅色 / 深色双主题、配色、圆角、阴影与持久化规范。
