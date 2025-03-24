const express = require('express');
const router = express.Router();
const Auth = require('../../middlewares/auth');

// 验证用户是否登录
router.use(Auth.verifySession);

// 后台首页
router.get('/', (req, res) => {
  res.render('admin/index', { title: '管理后台', user: req.user });
});

// 附件管理
router.get('/attachments', (req, res) => {
  res.render('admin/attachment', { title: '附件管理', user: req.user });
});

module.exports = router;