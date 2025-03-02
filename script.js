// 初始化Swiper轮播
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// AI助手问答系统
const videoAssistant = {
    greetings: [
        "您好！我是视频制作助手，很高兴为您服务。",
        "欢迎咨询视频制作相关问题！",
        "有什么视频制作问题我可以帮您解答吗？"
    ],
    
    // 关键词匹配规则
    responses: {
        "视频拍摄": [
            "拍摄视频时，请注意以下几点：\n1. 保持画面稳定，可以使用三脚架\n2. 注意构图和取景角度\n3. 确保光线充足\n4. 注意背景音质清晰",
            "建议使用以下拍摄技巧：\n1. 运用不同的镜头语言\n2. 多角度拍摄\n3. 注意曝光参数\n4. 使用合适的对焦模式"
        ],
        "剪辑": [
            "视频剪辑的基本步骤：\n1. 导入素材\n2. 粗剪：按故事脉络组织片段\n3. 精剪：调整转场和时间\n4. 添加音乐和音效\n5. 调色",
            "常用的剪辑软件推荐：\n1. Adobe Premiere Pro\n2. Final Cut Pro X\n3. DaVinci Resolve\n4. 剪映专业版"
        ],
        "特效": [
            "常见的视频特效制作方法：\n1. 转场特效\n2. 画面叠加\n3. 色彩调整\n4. 动态文字\n5. 粒子特效",
            "特效制作软件推荐：\n1. Adobe After Effects\n2. DaVinci Fusion\n3. Nuke\n4. Blender"
        ],
        "配乐": [
            "选择配乐的注意事项：\n1. 符合视频主题和情感\n2. 注意音乐版权\n3. 控制音量平衡\n4. 注意音乐节奏与画面配合",
            "获取配乐的渠道：\n1. 版权音乐库\n2. 免费音乐素材网站\n3. 自主创作\n4. 购买商业授权"
        ]
    },

    // 默认回复
    defaultResponses: [
        "抱歉，我可能没有完全理解您的问题。您可以询问关于：\n1. 视频拍摄技巧\n2. 剪辑制作方法\n3. 特效制作建议\n4. 配乐选择方案",
        "这个问题有点复杂，您能具体描述一下您遇到的问题吗？比如是关于拍摄、剪辑、特效还是配乐？"
    ],

    // 分析消息并返回回复
    getResponse(message) {
        // 转换为小写以便匹配
        const lowerMessage = message.toLowerCase();
        
        // 检查是否包含关键词
        for (let keyword in this.responses) {
            if (lowerMessage.includes(keyword)) {
                const responses = this.responses[keyword];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // 如果没有匹配到关键词，返回默认回复
        return this.defaultResponses[Math.floor(Math.random() * this.defaultResponses.length)];
    }
};

// 模拟轮播图片数据
const slides = [
    {
        title: '视频剪辑教学',
        subtitle: '小坏吖 | 专业视频制作',
        image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&h=1080'
    },
    {
        title: '商业宣传片',
        subtitle: '小坏吖 | 品牌形象塑造',
        image: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&h=1080'
    },
    {
        title: '创意动画',
        subtitle: '小坏吖 | MG动画设计',
        image: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&h=1080'
    },
    {
        title: '特效制作',
        subtitle: '小坏吖 | 视觉特效呈现',
        image: 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&h=1080'
    },
    {
        title: '后期调色',
        subtitle: '小坏吖 | 专业视频调色',
        image: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&h=1080'
    },
    {
        title: '教学课程',
        subtitle: '小坏吖 | 视频制作培训',
        image: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&h=1080'
    }
];

// 动态添加轮播图片
function initializeSlides() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; // 清空现有内容

    slides.forEach(slide => {
        const slideHTML = `
            <div class="swiper-slide">
                <div class="slide-content">
                    <h1>${slide.title}</h1>
                    <p>${slide.subtitle}</p>
                </div>
                <img src="${slide.image}" alt="${slide.title}">
            </div>
        `;
        swiperWrapper.innerHTML += slideHTML;
    });
}

// 主题切换
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
let isDarkTheme = false;

themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    root.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.innerHTML = isDarkTheme ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
});

// 聊天界面
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.querySelector('.chat-window');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMinimize = document.getElementById('chatMinimize');

// 切换聊天窗口
chatToggle.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatToggle.style.display = 'none';
});

chatMinimize.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatToggle.style.display = 'flex';
});

// 发送消息
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'} fade-in`;
    
    // 将换行符转换为HTML换行
    const formattedContent = content.replace(/\n/g, '<br>');
    messageDiv.innerHTML = formattedContent;
    
    const timestamp = document.createElement('div');
    timestamp.className = 'message-time';
    timestamp.textContent = new Date().toLocaleTimeString();
    messageDiv.appendChild(timestamp);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 百炼API配置
const API_CONFIG = {
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'sk-8176fd08473d4a97bdf8831e263f910d',
    model: 'qwen-max',  // 使用通义千问Max模型
};

// 调用百炼API进行对话
async function chatWithAI(message) {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: API_CONFIG.model,
                messages: [
                    {
                        role: "system",
                        content: "你是一个专业的视频制作顾问，可以为用户提供视频拍摄、剪辑、特效和配乐等方面的专业建议。请用简洁专业的语言回答用户的问题。"
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });

        if (!response.ok) {
            throw new Error('API请求失败');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('API调用错误:', error);
        return videoAssistant.getResponse(message); // 如果API调用失败，使用本地回复
    }
}

// 更新发送消息处理
chatSend.addEventListener('click', async () => {
    const message = chatInput.value.trim();
    if (message) {
        // 添加用户消息
        addMessage(message, true);
        chatInput.value = '';
        
        // 显示加载状态
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai-message loading fade-in';
        loadingDiv.textContent = '正在思考...';
        chatMessages.appendChild(loadingDiv);
        
        try {
            // 调用AI获取回复
            const response = await chatWithAI(message);
            // 移除加载状态
            chatMessages.removeChild(loadingDiv);
            // 添加AI回复
            addMessage(response);
        } catch (error) {
            // 移除加载状态
            chatMessages.removeChild(loadingDiv);
            // 使用本地回复
            const fallbackResponse = videoAssistant.getResponse(message);
            addMessage(fallbackResponse);
        }
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatSend.click();
    }
});

// 页面滚动效果
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = getComputedStyle(root).getPropertyValue('--nav-bg');
    } else {
        navbar.style.background = 'transparent';
    }
}

window.addEventListener('scroll', handleScroll);

// 作品集筛选功能
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 更新按钮状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // 获取筛选类别
        const filter = button.getAttribute('data-filter');
        
        // 筛选作品
        workItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 0);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 语言切换功能
const langSwitcher = document.querySelector('.lang-switcher');
const langToggle = document.getElementById('langToggle');
const currentLang = langToggle.querySelector('.current-lang');
const langDropdown = document.querySelector('.lang-dropdown');
const langOptions = langDropdown.querySelectorAll('a');

// 切换语言下拉菜单
langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    langSwitcher.classList.toggle('active');
});

// 点击其他地方关闭下拉菜单
document.addEventListener('click', (e) => {
    if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('active');
    }
});

// 语言切换处理
langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.dataset.lang;
        
        // 更新当前语言显示
        currentLang.textContent = option.textContent;
        
        // 更新活动状态
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // 关闭下拉菜单
        langSwitcher.classList.remove('active');
        
        // 切换网站语言
        changeLanguage(lang);
    });
});

// 语言文本配置
const translations = {
    zh: {
        nav: {
            works: '作品集',
            contact: '联系我',
            about: '个人简介',
            help: '需求帮助'
        },
        hero: {
            title: '视频剪辑教学 2024',
            subtitle: '专业的视频制作指导'
        },
        about: {
            title: '个人简介',
            greeting: '你好，我是小坏吖',
            description: '一名专业的视频制作者，专注于视频剪辑教学。致力于帮助更多人掌握视频制作技巧，实现创意想法。'
        }
        // 可以继续添加更多翻译内容
    },
    en: {
        nav: {
            works: 'Portfolio',
            contact: 'Contact',
            about: 'About',
            help: 'Help'
        },
        hero: {
            title: 'Video Editing Tutorial 2024',
            subtitle: 'Professional Video Production Guidance'
        },
        about: {
            title: 'About Me',
            greeting: 'Hi, I\'m XiaoHuai',
            description: 'A professional video producer focused on video editing tutorials. Dedicated to helping more people master video production skills and realize creative ideas.'
        }
    },
    fr: {
        nav: {
            works: 'Portfolio',
            contact: 'Contact',
            about: 'À propos',
            help: 'Aide'
        },
        hero: {
            title: 'Tutoriel de Montage Vidéo 2024',
            subtitle: 'Guide Professionnel de Production Vidéo'
        },
        about: {
            title: 'À propos de moi',
            greeting: 'Bonjour, je suis XiaoHuai',
            description: 'Un producteur vidéo professionnel spécialisé dans les tutoriels de montage vidéo. Dédié à aider plus de personnes à maîtriser les techniques de production vidéo et à réaliser des idées créatives.'
        }
    }
};

// 切换语言函数
function changeLanguage(lang) {
    const elements = {
        nav: document.querySelectorAll('.nav-menu a'),
        heroTitle: document.querySelector('.slide-content h1'),
        heroSubtitle: document.querySelector('.slide-content p'),
        aboutTitle: document.querySelector('.about-section .section-title'),
        aboutGreeting: document.querySelector('.about-text h3'),
        aboutDescription: document.querySelector('.about-description')
    };

    const t = translations[lang];

    // 更新导航菜单
    elements.nav.forEach((link, index) => {
        const key = Object.keys(t.nav)[index];
        link.textContent = t.nav[key];
    });

    // 更新首页标题
    if (elements.heroTitle) elements.heroTitle.textContent = t.hero.title;
    if (elements.heroSubtitle) elements.heroSubtitle.textContent = t.hero.subtitle;

    // 更新关于部分
    if (elements.aboutTitle) elements.aboutTitle.textContent = t.about.title;
    if (elements.aboutGreeting) elements.aboutGreeting.textContent = t.about.greeting;
    if (elements.aboutDescription) elements.aboutDescription.textContent = t.about.description;

    // 保存语言选择
    localStorage.setItem('preferred-language', lang);
}

// 初始化语言
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'zh';
    const langOption = document.querySelector(`[data-lang="${savedLang}"]`);
    if (langOption) {
        currentLang.textContent = langOption.textContent;
        langOptions.forEach(opt => opt.classList.remove('active'));
        langOption.classList.add('active');
        changeLanguage(savedLang);
    }

    // 先初始化轮播内容
    initializeSlides();
    
    // 然后初始化Swiper
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    handleScroll();
    
    // 初始显示所有作品
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }

    // 添加AI助手欢迎语
    setTimeout(() => {
        const greeting = videoAssistant.greetings[Math.floor(Math.random() * videoAssistant.greetings.length)];
        addMessage(greeting);
    }, 1000);
});

// 作品数据
const worksData = {
    video1: {
        title: '商业宣传片',
        description: '为知名品牌打造的形象宣传片，展现品牌价值和企业文化。采用现代摄影技术和创新剪辑手法，突出品牌特色。',
        media: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg',
        tools: 'Premiere Pro, After Effects',
        duration: '2周',
        type: '商业宣传'
    },
    video2: {
        title: '旅行视频',
        description: '记录世界各地的美景和人文风情，通过独特的视角和叙事方式，带观众感受不同文化的魅力。',
        media: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg',
        tools: 'Final Cut Pro, DaVinci Resolve',
        duration: '3周',
        type: '旅行纪录'
    },
    motion1: {
        title: 'MG动画',
        description: '创意动态图形设计，用简洁的视觉语言诠释复杂的概念，适用于产品介绍和教育培训。',
        media: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg',
        tools: 'After Effects, Illustrator',
        duration: '1周',
        type: '动画设计'
    },
    motion2: {
        title: '角色动画',
        description: '原创角色动画设计，通过生动的人物形象和流畅的动作，讲述引人入胜的故事。',
        media: 'https://images.pexels.com/photos/5473960/pexels-photo-5473960.jpeg',
        tools: 'Character Animator, After Effects',
        duration: '4周',
        type: '角色动画'
    },
    effects1: {
        title: '视觉特效',
        description: '高质量视觉特效制作，包含复杂的合成效果和场景重建，为影视作品增添视觉冲击力。',
        media: 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg',
        tools: 'After Effects, Nuke',
        duration: '3周',
        type: '特效制作'
    },
    effects2: {
        title: '转场效果',
        description: '创意转场效果设计，实现流畅自然的画面过渡，提升视频观感和叙事连贯性。',
        media: 'https://images.pexels.com/photos/5473947/pexels-photo-5473947.jpeg',
        tools: 'Premiere Pro, After Effects',
        duration: '1周',
        type: '转场设计'
    }
};

// 打开预览模态框
function openPreview(workId) {
    const modal = document.getElementById('previewModal');
    const work = worksData[workId];
    
    if (!work) return;
    
    // 更新模态框内容
    const mediaContainer = modal.querySelector('.preview-media');
    const title = modal.querySelector('.preview-title');
    const description = modal.querySelector('.preview-description');
    const tools = modal.querySelector('.tools');
    const duration = modal.querySelector('.duration');
    const type = modal.querySelector('.type');
    
    // 清空之前的内容
    mediaContainer.innerHTML = '';
    
    // 添加占位内容
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <i class="bi bi-camera-reels"></i>
            <div>视频内容准备中</div>
            <div style="font-size: 1rem; opacity: 0.7;">敬请期待博主更新...</div>
        </div>
    `;
    mediaContainer.appendChild(placeholder);
    
    // 更新作品信息
    title.textContent = work.title;
    description.textContent = work.description;
    tools.textContent = work.tools;
    duration.textContent = work.duration;
    type.textContent = work.type;
    
    // 显示模态框
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

// 关闭预览模态框
document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // 恢复背景滚动
});

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// 视频号二维码弹窗控制
function showQRCode() {
    const modal = document.getElementById('qrcodeModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeQRCode() {
    const modal = document.getElementById('qrcodeModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    const modal = document.getElementById('qrcodeModal');
    if (event.target === modal) {
        closeQRCode();
    }
}); 