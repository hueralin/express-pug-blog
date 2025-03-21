class Toast {
  constructor() {
    this.position = 'top';
    this.createContainer();
  }

  createContainer() {
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = `toast-container ${this.position}`;
      document.body.appendChild(container);
    }
  }

  setPosition(position) {
    const validPositions = ['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
    if (validPositions.includes(position)) {
      this.position = position;
      const container = document.querySelector('.toast-container');
      if (container) {
        container.className = `toast-container ${position}`;
      }
    }
  }

  show(message, options = {}) {
    const defaultOptions = {
      type: 'info',
      duration: 3000,
      position: this.position
    };
    const { type, duration, position } = { ...defaultOptions, ...options };
    
    // 确保在创建新 toast 前更新 container 位置
    this.setPosition(position);
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'toast-close';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => this.close(toast);
    
    toast.appendChild(messageSpan);
    toast.appendChild(closeButton);
    
    const container = document.querySelector('.toast-container');
    container.appendChild(toast);
    
    if (duration > 0) {
      setTimeout(() => this.close(toast), duration);
    }
    
    return toast;
  }

  close(toast) {
    if (toast && toast.parentElement) {
      toast.remove();
    }
  }

  success(message, options = {}) {
    return this.show(message, { type: 'success', ...options });
  }

  error(message, options = {}) {
    return this.show(message, { type: 'error', ...options });
  }

  warning(message, options = {}) {
    return this.show(message, { type: 'warning', ...options });
  }

  info(message, options = {}) {
    return this.show(message, { type: 'info', ...options });
  }
}

// 创建全局单例
window.$toast = new Toast();