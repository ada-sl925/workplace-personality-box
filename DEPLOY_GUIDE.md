# 🚀 职场性格盲盒 - 一键部署指南

本指南将帮助你快速将应用部署到 Vercel，获得永久在线的公开访问链接。

## 📋 部署前准备

确保你已完成以下准备：
- ✅ 拥有 GitHub 账号（已登录）
- ✅ 拥有 Vercel 账号（可免费注册）
- ✅ 项目代码已准备好（当前目录）

## 🔧 方案一：GitHub + Vercel网站（推荐）

### 步骤1：创建 GitHub 仓库

#### 方法A：使用 GitHub 网站（最简单）
1. 访问 [github.com/new](https://github.com/new)
2. 填写仓库信息：
   - **Repository name**: `workplace-personality-box`（或自定义名称）
   - **Description**: 职场性格盲盒 - 移动端优先的Web应用
   - 选择 **Public**（公开）
   - 不勾选"Initialize this repository with a README"（项目已有README）
3. 点击 **Create repository**

#### 方法B：使用 GitHub CLI（需要安装）
```bash
# 1. 安装 GitHub CLI（如果未安装）
# macOS: brew install gh
# 其他：访问 https://cli.github.com

# 2. 登录 GitHub
gh auth login

# 3. 创建仓库
gh repo create workplace-personality-box --public --source=. --remote=origin --push
```

### 步骤2：推送代码到 GitHub

如果你使用方法A（网站创建），运行以下命令：

```bash
# 1. 添加远程仓库（替换 YOUR_USERNAME 为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/workplace-personality-box.git

# 2. 推送代码到 GitHub
git push -u origin main
```

如果你使用方法B，代码已自动推送。

### 步骤3：在 Vercel 部署

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 点击 **Import Git Repository**
3. 选择你刚创建的 `workplace-personality-box` 仓库
4. Vercel 会自动检测项目配置：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - 框架：Vite
5. 点击 **Deploy**

### 步骤4：获取访问链接

部署完成后，你会看到：
```
✅ Deployment complete!
Visit: https://workplace-personality-box.vercel.app
```

这个链接是永久的，任何人都可以访问。

## 🖥️ 方案二：Vercel CLI命令行

### 步骤1：安装 Vercel CLI
```bash
npm i -g vercel
```

### 步骤2：登录 Vercel
```bash
vercel login
```
这会打开浏览器，完成登录授权。

### 步骤3：部署项目
```bash
# 开发环境部署（预览）
vercel

# 生产环境部署（正式）
vercel --prod
```

## 📁 方案三：直接上传到 Vercel

### 步骤1：压缩项目
```bash
# 在项目根目录执行
zip -r workplace-personality-box.zip . -x "node_modules/*" ".git/*"
```

### 步骤2：上传到 Vercel
1. 访问 [vercel.com/new](https://vercel.com/new)
2. 选择 **Deploy from a Git Repository**
3. 点击 **Import third-party Git Repository**
4. 选择 **Drag & Drop** 选项
5. 拖拽 `workplace-personality-box.zip` 文件到上传区域

## ⚙️ 自动化部署脚本

我为你创建了一个自动化脚本，简化部署流程：

```bash
# 1. 运行部署助手
bash deploy.sh
```

脚本会指导你完成所有步骤。

## 🔗 部署后操作

### 自定义域名（可选）
1. 在 Vercel 项目控制台点击 **Domains**
2. 输入你的域名（如 `personality.yourdomain.com`）
3. 按照指引配置 DNS 记录

### 自动部署
- 每次推送到 `main` 分支，Vercel 会自动重新部署
- 支持预览环境（每次PR创建预览部署）

### 环境变量
如果需要添加环境变量：
1. 在 Vercel 项目控制台点击 **Environment Variables**
2. 添加需要的变量

## 🛠️ 故障排除

### 常见问题

**Q: 部署失败，显示构建错误**
```
A: 检查是否安装了所有依赖：
   npm ci
   或删除 node_modules 重新安装：
   rm -rf node_modules package-lock.json
   npm install
```

**Q: 访问页面显示空白**
```
A: 检查路由配置，确保 vercel.json 中的路由规则正确
```

**Q: GitHub 仓库无法导入**
```
A: 确保仓库是公开的，或你有访问权限
```

**Q: 样式或动画不生效**
```
A: 确保构建时 Tailwind CSS 和 Framer Motion 正确打包
```

### 验证部署
部署成功后，访问你的 Vercel 链接，完成以下测试：
1. ✅ 页面正常加载
2. ✅ 响应式布局正常
3. ✅ 题目切换动画流畅
4. ✅ 选择答案后能进入下一题
5. ✅ 完成所有题目后显示结果页
6. ✅ "再测一次"功能正常

## 📞 技术支持

如果遇到问题：
1. 检查 [Vercel 文档](https://vercel.com/docs)
2. 查看项目 [README.md](README.md)
3. 或在 GitHub 创建 Issue

---

部署完成后，你的应用将拥有：
- 🌐 永久在线访问链接
- 🔒 自动 HTTPS 加密
- 🚀 全球 CDN 加速
- 📊 访问统计和分析
- 🔄 自动持续部署

开始部署吧！ 🚀