// 登录表单处理
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // 表单验证
  if (!username || !password) {
    showMessage('用户名和密码不能为空', 'error');
    return;
  }

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // 登录成功，保存token
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      showMessage('登录成功，正在跳转...', 'success');
      // 跳转到后台首页
      setTimeout(() => {
        window.location.href = '/admin';
      }, 1000);
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    console.error('登录请求失败:', error);
    showMessage('登录失败，请稍后重试', 'error');
  }
});

// 显示消息提示
function showMessage(message, type) {
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  // 3 秒后自动隐藏消息
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}