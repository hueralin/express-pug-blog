document.addEventListener('DOMContentLoaded', function() {
  // 获取侧边栏切换按钮和侧边栏元素
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');

  // 响应式布局处理
  function handleResize() {
    if (window.innerWidth <= 768) {
      sidebar.classList.add('collapsed');
      content.classList.add('expanded');
    } else {
      sidebar.classList.remove('collapsed');
      content.classList.remove('expanded');
    }
  }

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);

  // 初始化时执行一次
  handleResize();

  // 高亮当前菜单项
  const currentPath = window.location.pathname;
  const menuItems = document.querySelectorAll('.admin-nav a');
  menuItems.forEach(item => {
    if (item.getAttribute('href') === currentPath) {
      item.classList.add('active');
    }
  });
});