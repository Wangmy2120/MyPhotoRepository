# GitHub Pages 设置指南

你的网站代码已经成功推送到 GitHub 仓库：https://github.com/Wangmy2120/MyPhotoRepository

## 最后一步：启用 GitHub Pages

请按照以下步骤启用网站：

### 步骤1：访问仓库设置
1. 打开 https://github.com/Wangmy2120/MyPhotoRepository
2. 点击顶部的 "Settings"（设置）选项卡

### 步骤2：配置 Pages
1. 在左侧菜单中找到 "Pages"（页面）
2. 在 "Build and deployment"（构建和部署）部分：
   - **Source**（源）：选择 "Deploy from a branch"（从分支部署）
   - **Branch**（分支）：选择 "main"（主分支）
   - **Folder**（文件夹）：选择 "/ (root)"（根目录）
3. 点击 "Save"（保存）

### 步骤3：等待部署完成
- GitHub 会自动构建和部署你的网站
- 这个过程通常需要 1-2 分钟
- 部署完成后，你会看到一个绿色的勾和你的网站 URL

### 步骤4：访问你的网站
网站 URL 将是：**https://wangmy2120.github.io/MyPhotoRepository/**

## 网站功能说明

### 浏览模式（默认）
- 查看照片画廊
- 按分类筛选照片
- 查看关于页面
- 所有内容只读

### 编辑模式（管理员登录）
1. 点击 "管理员登录" 按钮
2. 输入：
   - **账号**: `Wangmy`
   - **密码**: `Th2020wang@`
3. 登录后可：
   - 上传新照片
   - 编辑照片描述
   - 编辑关于页面所有文字
   - 更换个人照片

## 后续更新

如果你需要更新网站内容：

### 方法1：使用部署脚本
- **Windows**: 运行 `deploy.bat`
- **Mac/Linux**: 运行 `./deploy.sh`

### 方法2：手动更新
```bash
# 添加更改的文件
git add .

# 提交更改
git commit -m "更新描述"

# 推送到 GitHub
git push origin main
```

## 注意事项

1. **数据存储**：所有照片和编辑内容都保存在浏览器的本地存储中
2. **浏览器兼容性**：建议使用 Chrome、Firefox 或 Edge 最新版本
3. **移动设备**：网站已适配移动设备，可在手机和平板上正常使用
4. **图片大小**：上传图片建议不超过 10MB

## 技术支持

如果遇到任何问题：
1. 检查 GitHub Pages 部署状态
2. 清除浏览器缓存后重试
3. 确保使用正确的登录凭据

恭喜！你的个人摄影作品集网站现在已经上线了！🎉