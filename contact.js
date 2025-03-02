// 留言表单处理
const API_CONFIG = {
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'sk-8176fd08473d4a97bdf8831e263f910d',
};

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    async handleSubmit() {
        try {
            // 获取表单数据
            const formData = {
                name: this.form.querySelector('input[placeholder="您的姓名"]').value,
                email: this.form.querySelector('input[placeholder="您的邮箱"]').value,
                subject: this.form.querySelector('input[placeholder="主题"]').value,
                message: this.form.querySelector('textarea[placeholder="您的留言"]').value,
                timestamp: new Date().toISOString()
            };

            // 验证表单数据
            if (!this.validateForm(formData)) {
                return;
            }

            // 更新按钮状态
            this.submitButton.disabled = true;
            this.submitButton.textContent = '发送中...';

            // 发送留言
            const response = await this.sendMessage(formData);

            if (response.success) {
                this.showNotification('留言发送成功！我们会尽快回复您。', 'success');
                this.form.reset();
            } else {
                throw new Error('留言发送失败');
            }

        } catch (error) {
            console.error('提交表单错误:', error);
            this.showNotification('抱歉，留言发送失败，请稍后重试。', 'error');
        } finally {
            // 恢复按钮状态
            this.submitButton.disabled = false;
            this.submitButton.textContent = '发送留言';
        }
    }

    validateForm(formData) {
        // 验证姓名
        if (!formData.name || formData.name.length < 2) {
            this.showNotification('请输入有效的姓名（至少2个字符）', 'error');
            return false;
        }

        // 验证邮箱
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            this.showNotification('请输入有效的邮箱地址', 'error');
            return false;
        }

        // 验证留言内容
        if (!formData.message || formData.message.length < 10) {
            this.showNotification('留言内容至少需要10个字符', 'error');
            return false;
        }

        return true;
    }

    async sendMessage(formData) {
        try {
            const response = await fetch(`${API_CONFIG.baseURL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_CONFIG.apiKey}`
                },
                body: JSON.stringify({
                    messages: [{
                        role: "system",
                        content: "保存用户留言信息"
                    }, {
                        role: "user",
                        content: JSON.stringify(formData)
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('API请求失败');
            }

            return { success: true };
        } catch (error) {
            console.error('API调用错误:', error);
            throw error;
        }
    }

    showNotification(message, type) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // 添加到页面
        document.body.appendChild(notification);

        // 添加动画类
        setTimeout(() => notification.classList.add('show'), 100);

        // 3秒后移除通知
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// 初始化表单处理
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
}); 