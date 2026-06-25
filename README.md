# 科研 MBTI

一个娱乐向的科研人格测试 Web 应用。

你可以通过 25 道题测出自己的「科研 MBTI」，拿到一个专属于实验室场景的四字母人格代码，再和真实 MBTI 做对照，生成一份抽象、好笑、但又莫名有点准的科研人格报告。

项目的核心目标很简单：让科研人看到结果时产生一种“离谱，但这怎么这么像我”的共鸣，并愿意顺手截图发给同门。
ps：本次开发由trae帮助完成

## ✨ 亮点

- 25 道题，约 3 分钟完成，轻量、直接、适合碎片时间体验
- 基于 4 个科研维度生成 16 种科研人格
- 支持输入真实 MBTI，对比“生活人格”和“科研人格”的差异
- 自动生成结果文案，支持复制和导出海报
- 使用 `localStorage` 保存进度，中途退出后可继续测试
- 纯前端实现，无需后端，便于本地开发和静态部署

## 🧬 科研 MBTI 维度

| 维度 | 字母 | 含义 |
|------|------|------|
| 科研能量来源 | `L` / `C` | `Lone` 潜水闭关型 vs `Collaborative` 组会合体型 |
| 选题风格 | `N` / `A` | `Novel` 脑洞开坑型 vs `Archive` 文献考古型 |
| 推进方式 | `M` / `X` | `Model` 模型搭架型 vs `eXperiment` 炼丹试错型 |
| 时间管理 | `O` / `B` | `Organized` 早鸟排版型 vs `Burst` 截稿变身型 |

最终会组合出 16 种科研人格，例如 `LAMO`、`CNXB` 等。

## 🧩 功能说明

- 首页：赛博科研风视觉入口，快速开始测试
- 测试页：24 道计分题 + 1 道彩蛋题，支持逐题作答与回退
- MBTI 输入页：可手动选择四个维度，也可以直接选择 16 型 MBTI
- 结果页：展示科研人格名称、描述、超能力、副作用、生存建议，以及 MBTI 对照分析

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 18 |
| 语言 | TypeScript |
| 构建工具 | Vite 6 |
| 路由 | React Router 7 |
| 状态管理 | Zustand |
| 样式方案 | Tailwind CSS 3 |
| 动效 | Framer Motion |
| 图标 | Lucide React |
| 海报导出 | html-to-image |
| 代码检查 | ESLint 9 |

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 9+（也可使用 pnpm 或 yarn）

### 安装依赖

```bash
npm install
```

### 启动开发环境

```bash
npm run dev
```

默认访问地址为 `http://localhost:5173`。

### 常用命令

```bash
# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview

# 代码检查
npm run lint

# TypeScript 类型检查
npm run check
```

## 📁 项目结构

```text
src/
├── assets/          # 静态资源
├── components/      # 通用组件
├── data/            # 题库、人格数据、MBTI 映射
├── hooks/           # 自定义 Hooks
├── lib/             # 工具函数
├── pages/           # 页面组件
│   ├── HomePage.tsx
│   ├── TestPage.tsx
│   ├── MBTIInputPage.tsx
│   └── ResultPage.tsx
├── store/           # Zustand 状态管理
├── App.tsx          # 路由入口
├── main.tsx         # 应用入口
└── index.css        # 全局样式与 Tailwind 扩展
```

## 🗺 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 展示标题、氛围背景和开始测试入口 |
| `/test` | 测试页 | 进行 25 道题的作答 |
| `/mbti-input` | MBTI 输入页 | 输入真实 MBTI，或跳过此步骤 |
| `/result` | 结果页 | 查看科研人格报告与对照分析 |

## 🎯 适合谁玩

这个项目主要面向研究生、博士后、青年教师以及一切长期与论文、实验、组会和 deadline 共处的人。

如果你想做一个“看起来像测试，实际上是科研人类观察样本收集器”的小产品，这个项目也可以作为一个很轻的前端参考。

## ⚠️ 说明

本项目仅用于娱乐和自我调侃，不构成心理学测评或任何严肃判断依据，更不建议用于导师选择、转博决策或退学申请。

---

Made for researchers who procrastinate, but still want nice-looking results.
