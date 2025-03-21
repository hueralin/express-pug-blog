class Confirm {
  constructor() {
    this.createContainer();
  }

  createContainer() {
    if (!document.querySelector('.confirm-container')) {
      const container = document.createElement('div');
      container.className = 'confirm-container';
      document.body.appendChild(container);
    }
  }

  show(options = {}) {
    const defaultOptions = {
      title: '确认',
      content: '确定要执行此操作吗？',
      confirmText: '确定',
      cancelText: '取消',
      confirmClass: 'primary',
      cancelClass: 'default'
    };

    const finalOptions = { ...defaultOptions, ...options };

    return new Promise((resolve, reject) => {
      const modal = document.createElement('div');
      modal.className = 'confirm-modal';
      modal.innerHTML = `
        <div class="confirm-dialog">
          <div class="confirm-header">
            <h3>${finalOptions.title}</h3>
          </div>
          <div class="confirm-content">
            <p>${finalOptions.content}</p>
          </div>
          <div class="confirm-footer">
            <button class="btn btn-${finalOptions.cancelClass} cancel-btn">${finalOptions.cancelText}</button>
            <button class="btn btn-${finalOptions.confirmClass} confirm-btn">${finalOptions.confirmText}</button>
          </div>
        </div>
      `;

      const container = document.querySelector('.confirm-container');
      container.appendChild(modal);

      // 添加动画类
      setTimeout(() => modal.classList.add('show'), 50);

      const confirmBtn = modal.querySelector('.confirm-btn');
      const cancelBtn = modal.querySelector('.cancel-btn');
      const closeModal = (confirmed) => {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.remove();
          if (confirmed) {
            resolve('confirmed');
          } else {
            reject('cancel');
          }
        }, 300);
      };

      confirmBtn.onclick = () => closeModal(true);
      cancelBtn.onclick = () => closeModal(false);

      // 点击遮罩层关闭
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(false);
        }
      });

      // ESC 键关闭
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          closeModal(false);
          document.removeEventListener('keydown', handleEsc);
        }
      };
      document.addEventListener('keydown', handleEsc);
    });
  }

  success(content, options = {}) {
    return this.show({
      title: '成功',
      content,
      confirmClass: 'success',
      ...options
    });
  }

  warning(content, options = {}) {
    return this.show({
      title: '警告',
      content,
      confirmClass: 'warning',
      ...options
    });
  }

  error(content, options = {}) {
    return this.show({
      title: '错误',
      content,
      confirmClass: 'danger',
      ...options
    });
  }
}

// 创建全局单例
window.$confirm = new Confirm();