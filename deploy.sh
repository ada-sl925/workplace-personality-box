#!/bin/bash

# Vibe Check：职场人格盲盒 - 一键部署脚本
# 支持 GitHub + Vercel 部署流程

set -e

echo "🚀 Vibe Check：职场人格盲盒 - 一键部署助手"
echo "======================================"

# 检查必要的工具
check_requirements() {
    echo "📋 检查系统要求..."

    # 检查 Git
    if ! command -v git &> /dev/null; then
        echo "❌ Git 未安装。请先安装 Git。"
        exit 1
    fi
    echo "✅ Git 已安装"

    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装。请先安装 Node.js。"
        exit 1
    fi
    echo "✅ Node.js 已安装"

    # 检查 npm
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安装。请先安装 npm。"
        exit 1
    fi
    echo "✅ npm 已安装"

    echo ""
}

# 显示菜单
show_menu() {
    echo "请选择部署方案："
    echo "1) GitHub + Vercel 网站部署（推荐）"
    echo "2) Vercel CLI 命令行部署"
    echo "3) 直接上传到 Vercel"
    echo "4) 退出"
    echo ""
    read -p "请输入选项 [1-4]: " choice
    echo ""
}

# 方案1：GitHub + Vercel 网站
option1() {
    echo "📦 方案1：GitHub + Vercel 网站部署"
    echo "--------------------------------------"

    # 检查是否已设置远程仓库
    if git remote -v | grep -q "origin"; then
        echo "✅ 已配置远程仓库"
        git remote -v
    else
        echo "❓ 尚未设置远程仓库"
        read -p "请输入你的 GitHub 用户名: " github_username
        read -p "请输入仓库名称 [默认: workplace-personality-box]: " repo_name
        repo_name=${repo_name:-workplace-personality-box}

        echo ""
        echo "📝 请在 GitHub 网站创建仓库："
        echo "1. 访问 https://github.com/new"
        echo "2. 创建仓库: $repo_name"
        echo "3. 不要初始化 README"
        echo ""
        read -p "仓库创建完成后按 Enter 继续..." </dev/tty

        # 添加远程仓库
        echo "🔗 添加远程仓库..."
        git remote add origin "https://github.com/$github_username/$repo_name.git"
        echo "✅ 远程仓库已添加"
    fi

    # 推送代码
    echo "📤 推送代码到 GitHub..."
    git push -u origin main

    if [ $? -eq 0 ]; then
        echo "✅ 代码推送成功！"
        echo ""
        echo "🎉 接下来："
        echo "1. 访问 https://vercel.com/new"
        echo "2. 点击 'Import Git Repository'"
        echo "3. 选择你的仓库 '$repo_name'"
        echo "4. 点击 'Deploy'"
        echo ""
        echo "部署完成后，你将获得一个类似 https://$repo_name.vercel.app 的链接"
    else
        echo "❌ 代码推送失败，请检查网络或权限"
    fi
}

# 方案2：Vercel CLI
option2() {
    echo "💻 方案2：Vercel CLI 部署"
    echo "--------------------------------------"

    # 检查 Vercel CLI
    if ! command -v vercel &> /dev/null; then
        echo "📦 安装 Vercel CLI..."
        npm install -g vercel
    fi

    echo "🔑 登录 Vercel..."
    echo "注意：这会打开浏览器进行登录"
    read -p "按 Enter 继续..." </dev/tty

    vercel login

    echo "🚀 开始部署..."
    echo "选择默认选项即可："
    echo "- 保留项目名称"
    echo "- 选择当前目录"
    echo "- 选择不关联 Git 仓库"
    echo ""

    vercel

    echo ""
    echo "🌐 生产环境部署..."
    read -p "是否部署到生产环境？(y/N): " deploy_prod </dev/tty

    if [[ $deploy_prod =~ ^[Yy]$ ]]; then
        vercel --prod
    fi

    echo "✅ 部署完成！"
}

# 方案3：直接上传
option3() {
    echo "📁 方案3：直接上传到 Vercel"
    echo "--------------------------------------"

    # 创建压缩包
    echo "📦 创建项目压缩包..."
    zip_file="workplace-personality-box.zip"

    # 排除不需要的文件
    zip -r "$zip_file" . \
        -x "node_modules/*" \
        -x ".git/*" \
        -x "*.zip" \
        -x "dist/*"

    if [ $? -eq 0 ]; then
        echo "✅ 压缩包创建成功: $zip_file"
        echo ""
        echo "🎯 下一步："
        echo "1. 访问 https://vercel.com/new"
        echo "2. 选择 'Deploy from a Git Repository'"
        echo "3. 点击 'Import third-party Git Repository'"
        echo "4. 选择 'Drag & Drop'"
        echo "5. 拖拽 '$zip_file' 到上传区域"
        echo ""
        echo "📏 压缩包大小: $(du -h "$zip_file" | cut -f1)"
    else
        echo "❌ 压缩包创建失败"
    fi
}

# 主函数
main() {
    check_requirements

    while true; do
        show_menu

        case $choice in
            1)
                option1
                break
                ;;
            2)
                option2
                break
                ;;
            3)
                option3
                break
                ;;
            4)
                echo "👋 退出部署助手"
                exit 0
                ;;
            *)
                echo "❌ 无效选项，请重新选择"
                ;;
        esac
    done

    echo ""
    echo "======================================"
    echo "🎊 部署流程完成！"
    echo ""
    echo "💡 更多信息请查看："
    echo "- DEPLOY_GUIDE.md - 详细部署指南"
    echo "- README.md - 项目文档"
    echo ""
    echo "🔗 你的应用将很快上线！"
}

# 执行主函数
main "$@"