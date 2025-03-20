const express = require('express');
const router = express.Router();
const CategoryController = require('../../../controllers/admin/category');

// 获取所有分类
router.get('/', CategoryController.getAll);

// 获取单个分类
router.get('/:id', CategoryController.getOne);

// 创建分类
router.post('/', CategoryController.create);

// 更新分类
router.put('/:id', CategoryController.update);

// 删除分类
router.delete('/:id', CategoryController.delete);

module.exports = router;