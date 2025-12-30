// 用户名密码登录功能
class UserLogin {
    constructor() {
        this.init();
    }

    init() {
        const loginForm = document.getElementById('loginForm');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        // 默认填充 admin/admin
        usernameInput.value = 'admin';
        passwordInput.value = 'admin';
        
        // 表单提交事件
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // 支持回车键登录
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                passwordInput.focus();
            }
        });
        
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });
        
        // 页面加载后自动登录（因为已经填充了默认值）
        // 延迟一点执行，让用户看到表单
        setTimeout(() => {
            this.handleLogin();
        }, 500);
    }

    // 处理登录
    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const loginBtn = document.getElementById('loginBtn');
        const loginStatus = document.getElementById('loginStatus');
        
        // 验证输入
        if (!username) {
            this.showError('请输入用户名');
            return;
        }
        
        if (!password) {
            this.showError('请输入密码');
            return;
        }
        
        // 禁用按钮，显示加载状态
        loginBtn.disabled = true;
        loginBtn.textContent = '登录中...';
        
        // 模拟登录请求（实际应用中应该调用后端API）
        setTimeout(() => {
            // 这里可以添加实际的登录验证逻辑
            // 目前默认admin/admin可以直接登录
            if (username === 'admin' && password === 'admin') {
                this.showSuccess('登录成功！');
                // 可以在这里保存登录状态或跳转页面
                console.log('登录成功，用户名:', username);
            } else {
                this.showError('用户名或密码错误');
                loginBtn.disabled = false;
                loginBtn.textContent = '登录';
            }
        }, 800);
    }

    // 显示成功消息
    showSuccess(message) {
        const loginStatus = document.getElementById('loginStatus');
        const statusText = loginStatus.querySelector('.toast-text');
        const statusIcon = loginStatus.querySelector('.toast-icon');
        
        // 移除之前的类，添加成功类
        loginStatus.classList.remove('hidden', 'error');
        loginStatus.classList.add('success');
        statusText.textContent = message;
        statusIcon.textContent = '✓';
        
        // 显示弹窗
        loginStatus.classList.remove('hidden', 'fade-out');
        
        // 恢复按钮状态
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.disabled = false;
        loginBtn.textContent = '登录';
        
        // 3秒后自动关闭
        setTimeout(() => {
            loginStatus.classList.add('fade-out');
            setTimeout(() => {
                loginStatus.classList.add('hidden');
            }, 300);
        }, 3000);
    }

    // 显示错误消息
    showError(message) {
        const loginStatus = document.getElementById('loginStatus');
        const statusText = loginStatus.querySelector('.toast-text');
        const statusIcon = loginStatus.querySelector('.toast-icon');
        
        // 移除之前的类，添加错误类
        loginStatus.classList.remove('hidden', 'success');
        loginStatus.classList.add('error');
        statusText.textContent = message;
        statusIcon.textContent = '✗';
        
        // 显示弹窗
        loginStatus.classList.remove('hidden', 'fade-out');
        
        // 3秒后自动关闭
        setTimeout(() => {
            loginStatus.classList.add('fade-out');
            setTimeout(() => {
                loginStatus.classList.add('hidden');
            }, 300);
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new UserLogin();
});
