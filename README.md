# Vibe Check：职场人格盲盒

一个移动端优先的 Web 应用，通过 10 道有趣的职场情景选择题，为用户生成个性化岗位推荐和毒舌 AI 评价。

网页link:https://workplace-personality-box.vercel.app/

## 功能特点

- 🎯 **移动端优先设计**：针对移动设备优化的交互体验
- 🃏 **卡片流模式**：深色背景 + 亮色渐变按钮的视觉风格
- ✨ **丝滑动画**：使用 Framer Motion 实现卡片向左滑出/进入的过渡效果
- 🧠 **智能推荐**：根据用户选择计算性格特质，技术能力类型享有1.5倍权重，优先推荐匹配的岗位
- 🧩 **MBTI维度判定**：展示详细的MBTI四个维度得分对比，帮助用户深入了解性格倾向
- 😈 **毒舌 AI 评价**：幽默风趣但一针见血的岗位评价
- 📱 **响应式设计**：适配各种屏幕尺寸

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - 动画库
- **Vite** - 构建工具

## 项目结构

```
├── src/
│   ├── components/      # React 组件
│   ├── types/          # TypeScript 类型定义
│   ├── hooks/          # 自定义 Hooks
│   ├── App.tsx         # 主应用组件
│   └── index.tsx       # 应用入口
├── questions.json      # 10 道职场情景题
├── results.ts          # 岗位推荐逻辑
├── tailwind.config.js  # Tailwind 配置
└── vite.config.ts      # Vite 配置
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建产物位于 `dist` 目录。

### 4. 预览生产版本

```bash
npm run preview
```

## Vercel 部署

### 方法一：通过 Vercel CLI（推荐）

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 登录 Vercel：
```bash
vercel login
```

3. 部署项目：
```bash
vercel
```

4. 生产环境部署：
```bash
vercel --prod
```

### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project"，导入你的 GitHub 仓库
4. Vercel 会自动检测并配置项目
5. 每次推送到 main 分支会自动部署

### 方法三：通过网页直接上传

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project" > "Import Git Repository"
3. 或者直接拖拽项目文件夹到网页

### 部署配置

- 项目已包含 `vercel.json` 配置文件
- 构建命令：`npm run build`
- 输出目录：`dist`
- 路由配置：单页应用（SPA）友好

部署完成后，你会获得一个类似 `https://workplace-personality-box.vercel.app` 的永久链接。

## 设计特点

### 交互设计
- 每答完一题，当前卡片向左滑出，下一题从右侧进入
- 支持返回上一题修改答案
- 进度条实时显示答题进度

### 视觉设计
- 深色背景 (`from-gray-900 to-black`)
- 渐变按钮 (`from-cyan-500 to-purple-600`)
- 毛玻璃效果卡片
- 圆角设计 + 阴影层次

### 动画效果
- 使用 Framer Motion 的 `AnimatePresence` 管理组件过渡
- 弹簧物理动画提供自然感
- 悬停状态微交互

## 性格评估逻辑

应用包含 10 道职场情景题，每道题有 4 个选项，对应不同的性格特质：

1. **支配型** (dominant, leader, assertive) - 项目管理、领导岗位
2. **严谨型** (conscientious, analytical, thorough) - 数据分析、质量管控
3. **亲和型** (agreeable, mediator, collaborative) - HR、客户关系
4. **创意型** (creative, expressive, flexible) - 产品、市场、创意岗位
5. **规划型** (organizer, planner, strategic) - 运营、项目管理
6. **社交型** (networker, connector, social) - 商务拓展、公关
7. **独立型** (reserved, focused, independent) - 技术研发、自由职业

系统统计用户选择的性格特质，推荐出现频率最高的类型对应的岗位。

**技术能力权重优化**：为了更准确地反映技术背景对职业选择的影响，系统对11种技术相关类型（如 `competent`、`expert`、`reserved` 等）赋予1.5倍权重。当用户的技术能力倾向明显时，系统会优先推荐技术相关岗位（如全栈工程师、首席技术官、技术研发等）。

**MBTI人格维度判定**：系统基于用户的选项计算MBTI四个维度的得分，并在结果页面展示详细的维度对比（外向(E) vs 内向(I)、感觉(S) vs 直觉(N)、思考(T) vs 情感(F)、判断(J) vs 感知(P)）。每个维度显示具体得分比例，帮助用户更深入地了解自己的性格倾向。

## 定制开发

### 修改题目
编辑 `questions.json` 文件：
- 修改现有题目内容
- 添加/删除题目（需同步调整类型映射）
- 调整选项对应的性格特质

### 修改岗位推荐
编辑 `results.ts` 文件：
- 调整 `personalityResults` 映射中的岗位名称和描述
- 修改 `recommendPosition` 函数中的推荐逻辑
- 添加新的性格类型和对应岗位
- 调整技术类型权重（`technicalTypes` 数组和 `TECHNICAL_WEIGHT` 常量）
- 修改MBTI维度映射（`mbtiDimensionMapping` 对象）

### 修改样式
- 颜色主题：修改 `tailwind.config.js` 中的渐变色值
- 布局调整：直接编辑 `App.tsx` 中的 Tailwind 类名
- 动画参数：调整 `cardVariants` 和 `resultVariants` 中的动画参数

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！