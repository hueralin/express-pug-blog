const express = require('express');
const router = express.Router();
const Auth = require('../../middlewares/auth');

// 验证用户是否登录
router.use(Auth.verifySession);

// 后台首页
router.get('/', (req, res) => {
  res.render('admin/index', { title: '管理后台', user: req.user });
});

// 分类管理页面
router.get('/categories', (req, res) => {
  res.render('admin/category', { title: '分类管理', user: req.user });
});

// 标签管理页面
router.get('/tags', (req, res) => {
  res.render('admin/tag', { title: '标签管理', user: req.user });
});

module.exports = router;