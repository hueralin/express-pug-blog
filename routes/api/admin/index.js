const express = require('express');
const router = express.Router();
const Auth = require('../../../middlewares/auth');
const AuthController = require('../../../controllers/admin/auth');

// 登录注册相关，不需要验证

// 用户登录
router.post('/login', AuthController.login);

// 用户登出
router.get('/logout', AuthController.logout);

// 验证用户是否登录
router.use(Auth.verifySession);

// 附件管理
router.use('/attachments', require('./attachment'));

module.exports = router;