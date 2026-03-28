// CelestialMy作品集 - JavaScript功能实现

document.addEventListener('DOMContentLoaded', function() {
    // 初始化应用
    initApp();
});

// 应用状态管理
const AppState = {
    photos: [],
    currentCategory: 'all',
    editingPhotoId: null,
    isLoggedIn: false,
    aboutData: {
        title: "时光的捕手",
        paragraph1: "摄影对我而言，不仅仅是记录瞬间，更是捕捉时光流逝的痕迹。每一张照片都是一段故事，每一次快门都是与世界的对话。",
        paragraph2: "我偏爱胶片摄影的质感，那种等待冲洗的期待，那种不可预知的结果，让每一张照片都变得独一无二。数码时代给了我们便利，但胶片给了我们温度。",
        paragraph3: "在这个空间里，我分享我的视觉日记，记录那些触动心灵的瞬间。希望这些影像能唤起你心中的共鸣，让你感受到时光的美好。",
        contactText: "欢迎交流摄影心得，分享视觉故事",
        contactEmail: "contact@vintageframes.com",
        imageUrl: "https://images.unsplash.com/photo-1514888286974-6d03bde4ba42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    isEditingAbout: false,
    originalAboutData: null
};

// 默认管理员凭据
const ADMIN_CREDENTIALS = {
    username: "Wangmy",
    password: "Th2020wang@"
};

// 初始化应用
function initApp() {
    // 检查登录状态
    checkLoginStatus();
    
    // 加载数据
    loadData();
    
    // 初始化事件监听器
    initEventListeners();
    
    // 渲染内容
    renderPhotoGrid();
    renderAboutContent();
    updateUIForLoginStatus();
}

// 检查登录状态
function checkLoginStatus() {
    const savedLogin = localStorage.getItem('vintageLoggedIn');
    if (savedLogin === 'true') {
        AppState.isLoggedIn = true;
    }
}

// 加载数据
function loadData() {
    // 加载照片数据
    const savedPhotos = getPhotosFromStorage();
    if (savedPhotos.length > 0) {
        AppState.photos = savedPhotos;
    } else {
        loadSamplePhotos();
        savePhotosToStorage();
    }
    
    // 加载关于页面数据
    const savedAboutData = getAboutDataFromStorage();
    if (savedAboutData) {
        AppState.aboutData = savedAboutData;
    } else {
        saveAboutDataToStorage();
    }
}

// 加载示例照片数据
function loadSamplePhotos() {
    AppState.photos = [
        {
            id: 1,
            title: "晨雾中的小巷",
            category: "street",
            description: "清晨的雾气还未散去，石板路上映着微弱的光。这条小巷见证了无数个这样的早晨。",
            date: "2024-03-15",
            imageUrl: "https://images.unsplash.com/photo-1518495978942-83cdb633d6d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            title: "秋日肖像",
            category: "portrait",
            description: "秋日的阳光透过树叶，在脸上投下斑驳的光影。这一刻的宁静，仿佛时间都停止了。",
            date: "2024-03-10",
            imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "山间日出",
            category: "landscape",
            description: "等待了三个小时，终于捕捉到太阳跃出山脊的瞬间。金色的光芒洒满山谷，新的一天开始了。",
            date: "2024-03-05",
            imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "咖啡馆的角落",
            category: "still",
            description: "午后的咖啡馆，阳光斜射进来，照在旧书和咖啡杯上。这是属于一个人的安静时光。",
            date: "2024-03-01",
            imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            title: "城市夜色",
            category: "street",
            description: "雨后的街道反射着霓虹灯光，行人的倒影在水中摇曳。城市的夜晚总是充满故事。",
            date: "2024-02-28",
            imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 6,
            title: "海边日落",
            category: "landscape",
            description: "夕阳把海面染成金色，海浪轻轻拍打着沙滩。这是大自然最壮丽的谢幕。",
            date: "2024-02-25",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];
}

// 初始化事件监听器
function initEventListeners() {
    // 登录相关
    document.getElementById('loginBtn').addEventListener('click', openLoginModal);
    document.getElementById('loginModalClose').addEventListener('click', closeLoginModal);
    document.getElementById('cancelLogin').addEventListener('click', closeLoginModal);
    document.getElementById('submitLogin').addEventListener('click', handleLogin);
    
    // 关于页面编辑
    document.getElementById('editAboutBtn').addEventListener('click', startAboutEditing);
    document.getElementById('cancelAboutEdit').addEventListener('click', cancelAboutEditing);
    document.getElementById('saveAboutEdit').addEventListener('click', saveAboutEditing);
    
    // 图片上传
    document.getElementById('imageUploadOverlay').addEventListener('click', () => {
        document.getElementById('aboutImageInput').click();
    });
    document.getElementById('aboutImageInput').addEventListener('change', handleAboutImageUpload);
    
    // 照片相关
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // 上传功能
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    uploadArea.addEventListener('click', () => {
        if (AppState.isLoggedIn) {
            fileInput.click();
        } else {
            showMessage('请先登录以上传照片', 'error');
        }
    });
    
    fileInput.addEventListener('change', handleFileSelect);
    document.getElementById('uploadBtn').addEventListener('click', handleUpload);
    document.getElementById('clearForm').addEventListener('click', clearUploadForm);
    
    // 模态框
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('saveEdit').addEventListener('click', savePhotoDescription);
    document.getElementById('cancelEdit').addEventListener('click', closeModal);
    
    document.getElementById('photoModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    document.getElementById('loginModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLoginModal();
        }
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // 拖放上传
    initDragAndDrop();
}

// 处理键盘快捷键
function handleKeyboardShortcuts(e) {
    // ESC键关闭模态框
    if (e.key === 'Escape') {
        if (document.getElementById('photoModal').style.display === 'flex') {
            closeModal();
        }
        if (document.getElementById('loginModal').style.display === 'flex') {
            closeLoginModal();
        }
        if (AppState.isEditingAbout) {
            cancelAboutEditing();
        }
    }
    
    // Ctrl+S保存编辑
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (AppState.editingPhotoId) {
            savePhotoDescription();
        }
        if (AppState.isEditingAbout) {
            saveAboutEditing();
        }
    }
}

// 初始化拖放上传
function initDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        if (AppState.isLoggedIn) {
            this.style.borderColor = 'var(--vintage-gold)';
            this.style.backgroundColor = 'var(--vintage-cream)';
        }
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--vintage-brown)';
        this.style.backgroundColor = '';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--vintage-brown)';
        this.style.backgroundColor = '';
        
        if (!AppState.isLoggedIn) {
            showMessage('请先登录以上传照片', 'error');
            return;
        }
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const fileInput = document.getElementById('fileInput');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(files[0]);
            fileInput.files = dataTransfer.files;
            
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
            
            const uploadText = document.querySelector('.upload-text');
            uploadText.textContent = `已拖放: ${files[0].name}`;
        }
    });
}

// 登录相关功能
function openLoginModal() {
    if (AppState.isLoggedIn) {
        handleLogout();
    } else {
        document.getElementById('loginModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.getElementById('username').focus();
    }
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        showMessage('请输入账号和密码', 'error');
        return;
    }
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        AppState.isLoggedIn = true;
        localStorage.setItem('vintageLoggedIn', 'true');
        updateUIForLoginStatus();
        closeLoginModal();
        showMessage('登录成功！您现在可以编辑内容', 'success');
    } else {
        showMessage('账号或密码错误', 'error');
    }
}

function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
        AppState.isLoggedIn = false;
        localStorage.removeItem('vintageLoggedIn');
        
        // 如果正在编辑关于页面，取消编辑
        if (AppState.isEditingAbout) {
            cancelAboutEditing();
        }
        
        updateUIForLoginStatus();
        showMessage('已退出登录', 'success');
    }
}

// 更新UI根据登录状态
function updateUIForLoginStatus() {
    const loginBtn = document.getElementById('loginBtn');
    const editAboutBtn = document.getElementById('editAboutBtn');
    const uploadSection = document.querySelector('.upload-section');
    
    if (AppState.isLoggedIn) {
        loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> 退出登录';
        loginBtn.classList.remove('btn-login');
        loginBtn.classList.add('btn-logout');
        editAboutBtn.style.display = 'inline-block';
        uploadSection.style.display = 'block';
        
        // 显示编辑模式指示器
        document.querySelector('.edit-mode').classList.add('show');
    } else {
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> 管理员登录';
        loginBtn.classList.remove('btn-logout');
        loginBtn.classList.add('btn-login');
        editAboutBtn.style.display = 'none';
        uploadSection.style.display = 'none';
        
        // 隐藏编辑模式指示器
        document.querySelector('.edit-mode').classList.remove('show');
    }
}

// 关于页面编辑功能
function startAboutEditing() {
    if (!AppState.isLoggedIn) {
        showMessage('请先登录以编辑内容', 'error');
        return;
    }
    
    AppState.isEditingAbout = true;
    AppState.originalAboutData = { ...AppState.aboutData };
    
    // 启用内容可编辑
    document.getElementById('aboutTitle').contentEditable = true;
    document.getElementById('aboutPara1').contentEditable = true;
    document.getElementById('aboutPara2').contentEditable = true;
    document.getElementById('aboutPara3').contentEditable = true;
    document.getElementById('contactText').contentEditable = true;
    document.getElementById('contactEmail').contentEditable = true;
    
    // 显示图片上传覆盖层
    document.getElementById('imageUploadOverlay').style.display = 'flex';
    
    // 显示保存/取消按钮
    document.getElementById('aboutActions').style.display = 'flex';
    
    // 隐藏编辑按钮
    document.getElementById('editAboutBtn').style.display = 'none';
    
    // 添加编辑样式
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.classList.add('editing');
    });
}

function cancelAboutEditing() {
    AppState.isEditingAbout = false;
    
    // 恢复原始数据
    if (AppState.originalAboutData) {
        AppState.aboutData = { ...AppState.originalAboutData };
        renderAboutContent();
    }
    
    // 禁用内容可编辑
    document.getElementById('aboutTitle').contentEditable = false;
    document.getElementById('aboutPara1').contentEditable = false;
    document.getElementById('aboutPara2').contentEditable = false;
    document.getElementById('aboutPara3').contentEditable = false;
    document.getElementById('contactText').contentEditable = false;
    document.getElementById('contactEmail').contentEditable = false;
    
    // 隐藏图片上传覆盖层
    document.getElementById('imageUploadOverlay').style.display = 'none';
    
    // 隐藏保存/取消按钮
    document.getElementById('aboutActions').style.display = 'none';
    
    // 显示编辑按钮
    document.getElementById('editAboutBtn').style.display = 'inline-block';
    
    // 移除编辑样式
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.classList.remove('editing');
    });
    
    showMessage('编辑已取消', 'info');
}

function saveAboutEditing() {
    // 获取编辑后的内容
    AppState.aboutData.title = document.getElementById('aboutTitle').textContent;
    AppState.aboutData.paragraph1 = document.getElementById('aboutPara1').textContent;
    AppState.aboutData.paragraph2 = document.getElementById('aboutPara2').textContent;
    AppState.aboutData.paragraph3 = document.getElementById('aboutPara3').textContent;
    AppState.aboutData.contactText = document.getElementById('contactText').textContent;
    AppState.aboutData.contactEmail = document.getElementById('contactEmail').textContent;
    
    // 保存到本地存储
    saveAboutDataToStorage();
    
    // 退出编辑模式
    AppState.isEditingAbout = false;
    AppState.originalAboutData = null;
    
    // 禁用内容可编辑
    document.getElementById('aboutTitle').contentEditable = false;
    document.getElementById('aboutPara1').contentEditable = false;
    document.getElementById('aboutPara2').contentEditable = false;
    document.getElementById('aboutPara3').contentEditable = false;
    document.getElementById('contactText').contentEditable = false;
    document.getElementById('contactEmail').contentEditable = false;
    
    // 隐藏图片上传覆盖层
    document.getElementById('imageUploadOverlay').style.display = 'none';
    
    // 隐藏保存/取消按钮
    document.getElementById('aboutActions').style.display = 'none';
    
    // 显示编辑按钮
    document.getElementById('editAboutBtn').style.display = 'inline-block';
    
    // 移除编辑样式
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.classList.remove('editing');
    });
    
    showMessage('关于页面已保存', 'success');
}

function handleAboutImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showMessage('请选择图片文件', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showMessage('图片大小不能超过10MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        AppState.aboutData.imageUrl = e.target.result;
        document.getElementById('aboutImage').src = e.target.result;
        saveAboutDataToStorage();
        showMessage('个人照片已更新', 'success');
    };
    reader.readAsDataURL(file);
}

// 渲染关于页面内容
function renderAboutContent() {
    document.getElementById('aboutTitle').textContent = AppState.aboutData.title;
    document.getElementById('aboutPara1').textContent = AppState.aboutData.paragraph1;
    document.getElementById('aboutPara2').textContent = AppState.aboutData.paragraph2;
    document.getElementById('aboutPara3').textContent = AppState.aboutData.paragraph3;
    document.getElementById('contactText').textContent = AppState.aboutData.contactText;
    document.getElementById('contactEmail').textContent = AppState.aboutData.contactEmail;
    document.getElementById('aboutImage').src = AppState.aboutData.imageUrl;
}

// 照片相关功能
function renderPhotoGrid() {
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = '';
    
    const filteredPhotos = AppState.currentCategory === 'all' 
        ? AppState.photos 
        : AppState.photos.filter(photo => photo.category === AppState.currentCategory);
    
    if (filteredPhotos.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-camera"></i>
                <p>暂无照片</p>
            </div>
        `;
        return;
    }
    
    filteredPhotos.forEach(photo => {
        const photoCard = createPhotoCard(photo);
        grid.appendChild(photoCard);
    });
}

function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.dataset.id = photo.id;
    
    const categoryNames = {
        'portrait': '人像摄影',
        'landscape': '风景摄影',
        'street': '街头纪实',
        'still': '静物摄影'
    };
    
    card.innerHTML = `
        <img src="${photo.imageUrl}" alt="${photo.title}" class="photo-image">
        <div class="photo-overlay">
            <div class="photo-info">
                <h4 class="photo-title">${photo.title}</h4>
                <p class="photo-category">${categoryNames[photo.category] || photo.category}</p>
                <p class="photo-date">${formatDate(photo.date)}</p>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openPhotoModal(photo.id));
    return card;
}

function handleCategoryFilter(e) {
    const button = e.currentTarget;
    const category = button.dataset.category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    AppState.currentCategory = category;
    renderPhotoGrid();
}

function handleNavClick(e) {
    e.preventDefault();
    
    const link = e.currentTarget;
    const targetId = link.getAttribute('href').substring(1);
    
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
    });
    link.classList.add('active');
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// 上传功能
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        const fileName = files[0].name;
        const uploadText = document.querySelector('.upload-text');
        uploadText.textContent = `已选择: ${fileName}`;
        
        previewImage(files[0]);
    }
}

function previewImage(file) {
    if (!file.type.match('image.*')) {
        showMessage('请选择图片文件', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showMessage('图片大小不能超过10MB', 'error');
        return;
    }
}

function handleUpload() {
    if (!AppState.isLoggedIn) {
        showMessage('请先登录以上传照片', 'error');
        return;
    }
    
    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('photoTitle');
    const categorySelect = document.getElementById('photoCategory');
    const descriptionTextarea = document.getElementById('photoDescription');
    
    if (fileInput.files.length === 0) {
        showMessage('请选择要上传的图片', 'error');
        return;
    }
    
    if (!titleInput.value.trim()) {
        showMessage('请输入照片标题', 'error');
        titleInput.focus();
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const newPhoto = {
            id: Date.now(),
            title: titleInput.value.trim(),
            category: categorySelect.value,
            description: descriptionTextarea.value.trim(),
            date: new Date().toISOString().split('T')[0],
            imageUrl: e.target.result
        };
        
        AppState.photos.unshift(newPhoto);
        savePhotosToStorage();
        renderPhotoGrid();
        
        showMessage('照片上传成功！', 'success');
        clearUploadForm();
        
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    };
    
    reader.readAsDataURL(file);
}

function clearUploadForm() {
    document.getElementById('fileInput').value = '';
    document.getElementById('photoTitle').value = '';
    document.getElementById('photoDescription').value = '';
    document.querySelector('.upload-text').textContent = '拖放照片到这里，或点击选择文件';
}

// 照片模态框功能
function openPhotoModal(photoId) {
    const photo = AppState.photos.find(p => p.id === photoId);
    if (!photo) return;
    
    AppState.editingPhotoId = photoId;
    
    const categoryNames = {
        'portrait': '人像摄影',
        'landscape': '风景摄影',
        'street': '街头纪实',
        'still': '静物摄影'
    };
    
    document.getElementById('modalPhoto').src = photo.imageUrl;
    document.getElementById('modalPhoto').alt = photo.title;
    document.getElementById('modalTitle').textContent = photo.title;
    document.getElementById('modalCategory').textContent = categoryNames[photo.category] || photo.category;
    document.getElementById('modalDate').textContent = formatDate(photo.date);
    document.getElementById('modalDescription').value = photo.description || '';
    
    // 根据登录状态控制编辑功能
    const textEditor = document.querySelector('.text-editor');
    if (AppState.isLoggedIn) {
        textEditor.style.display = 'block';
    } else {
        textEditor.style.display = 'none';
    }
    
    document.getElementById('photoModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('photoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    AppState.editingPhotoId = null;
}

function savePhotoDescription() {
    if (!AppState.editingPhotoId) return;
    
    const description = document.getElementById('modalDescription').value.trim();
    const photoIndex = AppState.photos.findIndex(p => p.id === AppState.editingPhotoId);
    
    if (photoIndex !== -1) {
        AppState.photos[photoIndex].description = description;
        savePhotosToStorage();
        showMessage('描述已保存', 'success');
        setTimeout(closeModal, 1000);
    }
}

// 本地存储功能
function getPhotosFromStorage() {
    try {
        const photos = localStorage.getItem('vintagePhotos');
        return photos ? JSON.parse(photos) : [];
    } catch (error) {
        console.error('读取照片数据失败:', error);
        return [];
    }
}

function savePhotosToStorage() {
    try {
        localStorage.setItem('vintagePhotos', JSON.stringify(AppState.photos));
    } catch (error) {
        console.error('保存照片数据失败:', error);
        showMessage('保存失败，请检查浏览器存储权限', 'error');
    }
}

function getAboutDataFromStorage() {
    try {
        const aboutData = localStorage.getItem('vintageAboutData');
        return aboutData ? JSON.parse(aboutData) : null;
    } catch (error) {
        console.error('读取关于页面数据失败:', error);
        return null;
    }
}

function saveAboutDataToStorage() {
    try {
        localStorage.setItem('vintageAboutData', JSON.stringify(AppState.aboutData));
    } catch (error) {
        console.error('保存关于页面数据失败:', error);
        showMessage('保存失败，请检查浏览器存储权限', 'error');
    }
}

// 工具函数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showMessage(text, type = 'info') {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message message-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    message.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${text}</span>
    `;
    
    const uploadSection = document.querySelector('.upload-section');
    if (uploadSection) {
        uploadSection.insertBefore(message, uploadSection.firstChild);
    } else {
        document.body.appendChild(message);
    }
    
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 导出/导入功能（可选）
function exportData() {
    const data = {
        photos: AppState.photos,
        aboutData: AppState.aboutData
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'celestialmy-portfolio-backup.json');
    linkElement.click();
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData.photos && importedData.aboutData) {
                AppState.photos = importedData.photos;
                AppState.aboutData = importedData.aboutData;
                
                savePhotosToStorage();
                saveAboutDataToStorage();
                
                renderPhotoGrid();
                renderAboutContent();
                
                showMessage('数据导入成功！', 'success');
            } else {
                showMessage('导入文件格式不正确', 'error');
            }
        } catch (error) {
            showMessage('导入失败：' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}