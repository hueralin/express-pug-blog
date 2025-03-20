// 分类列表数据
let categories = [];

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 加载分类列表
  loadCategories();

  // 绑定保存按钮事件
  document.getElementById('saveCategory').addEventListener('click', saveCategory);
});

// 加载分类列表
async function loadCategories() {
  try {
    const response = await fetch('/api/admin/categories');
    const result = await response.json();
    if (result.code === 0) {
      categories = result.data;
      renderCategories();
    } else {
      alert('加载分类列表失败：' + result.message);
    }
  } catch (error) {
    console.error('加载分类列表出错：', error);
    alert('加载分类列表失败，请检查网络连接');
  }
}

// 渲染分类列表
function renderCategories() {
  const tbody = document.getElementById('categoryList');
  tbody.innerHTML = categories.map(category => `
    <tr>
      <td>${category.name}</td>
      <td>${category.description || '-'}</td>
      <td>${category.articleCount}</td>
      <td>${new Date(category.created_at).toLocaleString()}</td>
      <td>
        <button class="btn btn-sm btn-primary me-2" onclick="editCategory(${category.id})">编辑</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCategory(${category.id})">删除</button>
      </td>
    </tr>
  `).join('');
}

// 重置表单
function resetForm() {
  document.getElementById('categoryForm').reset();
  document.getElementById('categoryId').value = '';
  document.getElementById('modalTitle').textContent = '新增分类';
}

// 编辑分类
function editCategory(id) {
  const category = categories.find(c => c.id === id);
  if (category) {
    document.getElementById('categoryId').value = category.id;
    document.getElementById('name').value = category.name;
    document.getElementById('description').value = category.description || '';
    document.getElementById('modalTitle').textContent = '编辑分类';
    new bootstrap.Modal(document.getElementById('categoryModal')).show();
  }
}

// 保存分类
async function saveCategory() {
  const id = document.getElementById('categoryId').value;
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!name) {
    alert('请输入分类名称');
    return;
  }

  try {
    const url = id ? `/api/admin/categories/${id}` : '/api/admin/categories';
    const method = id ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description })
    });

    const result = await response.json();
    if (result.code === 0) {
      bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide();
      loadCategories();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('保存分类出错：', error);
    alert('保存分类失败，请检查网络连接');
  }
}

// 删除分类
async function deleteCategory(id) {
  if (!confirm('确定要删除这个分类吗？')) {
    return;
  }

  try {
    const response = await fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    if (result.code === 0) {
      loadCategories();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('删除分类出错：', error);
    alert('删除分类失败，请检查网络连接');
  }
}