const express = require('express');
const router = express.Router();
const TagController = require('../../../controllers/admin/tag');

// 获取所有标签
router.get('/', TagController.getAll);

// 获取单个标签
router.get('/:id', TagController.getOne);

// 创建标签
router.post('/', TagController.create);

// 更新标签
router.put('/:id', TagController.update);

// 删除标签
router.delete('/:id', TagController.delete);

module.exports = router;