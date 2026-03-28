# CelestialMy 作品集 - 复古摄影网站

一个具有复古怀旧风格的个人摄影作品集网站，支持照片上传、分类浏览、在线编辑和管理员权限控制。

## 功能特点

- 🎨 **复古怀旧设计** - 独特的胶片摄影风格界面
- 🔐 **管理员权限控制** - 需要登录才能编辑内容
- 📸 **照片分类浏览** - 按人像、风景、街头、静物分类筛选
- 📤 **在线照片上传** - 拖放或点击上传照片
- ✏️ **在线编辑功能** - 可编辑关于页面所有内容和照片描述
- 🖼️ **图片更换** - 可在线更换个人照片
- 💾 **本地存储** - 使用浏览器本地存储保存所有数据
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🎯 **用户体验优化** - 平滑动画和交互反馈

## 技术栈

- HTML5
- CSS3 (CSS Grid, Flexbox, CSS Variables)
- JavaScript (ES6+)
- 本地存储 API
- Google Fonts
- Font Awesome 图标

## 使用方法

### 浏览模式（未登录）
1. **浏览照片**：点击导航栏的"作品集"查看所有照片
2. **分类筛选**：使用分类按钮筛选特定类型的照片
3. **查看关于页面**：了解摄影师信息和联系方式

### 编辑模式（管理员登录）
1. **登录**：点击"管理员登录"按钮，输入账号密码
   - 账号：`Wangmy`
   - 密码：`Th2020wang@`
2. **上传照片**：
   - 点击"上传"区域或拖放照片
   - 填写照片标题、分类和描述
   - 点击"上传照片"按钮
3. **编辑照片描述**：
   - 点击任意照片卡片
   - 在模态框中编辑照片描述
   - 点击"保存"保存更改
4. **编辑关于页面**：
   - 点击关于页面的"编辑"按钮
   - 直接编辑所有文字内容
   - 鼠标悬停个人照片可点击更换
   - 点击"保存更改"保存所有修改

## 部署到 GitHub Pages

### 方法一：使用 GitHub Web 界面

1. 在 GitHub 上创建新仓库
2. 上传所有文件到仓库
3. 进入仓库设置 → Pages
4. 选择分支（通常是 main）和根目录
5. 点击保存，等待部署完成

### 方法二：使用 Git 命令行

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Vintage photography website"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

然后在 GitHub 仓库设置中启用 GitHub Pages。

## 文件结构

```
vintage-photography-website/
├── index.html          # 主页面
├── style.css          # 样式文件
├── script.js          # JavaScript 功能
├── README.md          # 项目说明
└── .gitignore         # Git 忽略文件
```

## 自定义配置

### 修改颜色主题
在 `style.css` 文件的 `:root` 部分修改 CSS 变量：

```css
:root {
    --vintage-cream: #f5f1e8;
    --vintage-brown: #8b7355;
    --vintage-gold: #d4af37;
    /* ... 其他颜色变量 */
}
```

### 添加新照片分类
在 `script.js` 文件中：

1. 在 `categoryNames` 对象中添加新分类
2. 在 HTML 中添加对应的筛选按钮
3. 在表单选择框中添加新选项

### 修改字体
在 `index.html` 中修改 Google Fonts 链接：

```html
<link href="https://fonts.googleapis.com/css2?family=New+Font:wght@400;700&display=swap" rel="stylesheet">
```

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 注意事项

1. **本地存储限制**：照片数据存储在浏览器本地存储中，有大小限制（通常 5-10MB）
2. **图片URL**：上传的图片使用 `URL.createObjectURL()` 生成临时URL，页面刷新后可能失效
3. **生产环境**：如需长期存储，建议集成后端服务或云存储

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 联系

如有问题或建议，请通过以下方式联系：
- 邮箱：contact@vintageframes.com
- GitHub Issues

---

**用镜头记录时光，用代码保存记忆**