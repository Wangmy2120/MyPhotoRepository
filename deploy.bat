@echo off
chcp 65001 >nul
echo === CelestialMy作品集部署脚本 ===
echo.

REM 检查是否在Git仓库中
if not exist ".git" (
    echo 错误：当前目录不是Git仓库
    echo 请先运行: git init
    pause
    exit /b 1
)

REM 添加所有文件
echo 1. 添加文件到Git...
git add .

REM 提交更改
echo 2. 提交更改...
set /p commit_msg="请输入提交信息（默认: Update website）: "
if "%commit_msg%"=="" set commit_msg="Update website"
git commit -m "%commit_msg%"

REM 检查远程仓库
echo 3. 检查远程仓库配置...
git remote | findstr "origin" >nul
if errorlevel 1 (
    echo 未配置远程仓库，请先配置：
    echo git remote add origin https://github.com/你的用户名/仓库名.git
    echo 然后重新运行此脚本
    pause
    exit /b 1
)

REM 推送到GitHub
echo 4. 推送到GitHub...
git push -u origin main

echo.
echo === 部署完成 ===
echo.
echo 接下来需要：
echo 1. 访问你的GitHub仓库
echo 2. 进入 Settings → Pages
echo 3. 选择 Source: GitHub Actions
echo 4. 等待工作流完成（约1-2分钟）
echo 5. 访问生成的URL查看网站
echo.
echo 或者使用传统方法：
echo 1. 进入 Settings → Pages
echo 2. 选择 Source: Deploy from a branch
echo 3. 选择 Branch: main, Folder: / (root)
echo 4. 点击 Save
echo.
echo 网站URL格式：https://你的用户名.github.io/仓库名/
pause