// 标签列表数据
let tags = [];

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 加载标签列表
  loadTags();

  // 绑定保存按钮事件
  document.getElementById('saveTag').addEventListener('click', saveTag);
});

// 加载标签列表
async function loadTags() {
  try {
    const response = await fetch('/api/admin/tags');
    const result = await response.json();
    if (result.code === 0) {
      tags = result.data;
      renderTags();
    } else {
      alert('加载标签列表失败：' + result.message);
    }
  } catch (error) {
    console.error('加载标签列表出错：', error);
    alert('加载标签列表失败，请检查网络连接');
  }
}

// 渲染标签列表
function renderTags() {
  const tbody = document.getElementById('tagList');
  tbody.innerHTML = tags.map(tag => `
    <tr>
      <td>${tag.name}</td>
      <td>${tag.articleCount}</td>
      <td>${new Date(tag.created_at).toLocaleString()}</td>
      <td>
        <button class="btn btn-edit" onclick="editTag(${tag.id})">编辑</button>
        <button class="btn btn-delete" onclick="deleteTag(${tag.id})">删除</button>
      </td>
    </tr>
  `).join('');
}

// 重置表单
function resetForm() {
  document.getElementById('tagForm').reset();
  document.getElementById('tagId').value = '';
  document.getElementById('modalTitle').textContent = '新增标签';
}

// 显示模态框
function showModal() {
  resetForm();
  document.getElementById('tagModal').classList.add('show');
}

// 隐藏模态框
function hideModal() {
  document.getElementById('tagModal').classList.remove('show');
}

// 编辑标签
function editTag(id) {
  const tag = tags.find(t => t.id === id);
  if (tag) {
    document.getElementById('tagId').value = tag.id;
    document.getElementById('name').value = tag.name;
    document.getElementById('modalTitle').textContent = '编辑标签';
    showModal();
  }
}

// 保存标签
async function saveTag(event) {
  event.preventDefault();
  const id = document.getElementById('tagId').value;
  const name = document.getElementById('name').value.trim();

  if (!name) {
    alert('请输入标签名称');
    return;
  }

  try {
    const url = id ? `/api/admin/tags/${id}` : '/api/admin/tags';
    const method = id ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    const result = await response.json();
    if (result.code === 0) {
      hideModal();
      loadTags();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('保存标签出错：', error);
    alert('保存标签失败，请检查网络连接');
  }
}

// 删除标签
async function deleteTag(id) {
  if (!confirm('确定要删除这个标签吗？')) {
    return;
  }

  try {
    const response = await fetch(`/api/admin/tags/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    if (result.code === 0) {
      loadTags();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('删除标签出错：', error);
    alert('删除标签失败，请检查网络连接');
  }
}