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

// 分类管理路由
router.use('/categories', require('./category'));

// 标签管理路由
router.use('/tags', require('./tag'));

module.exports = router;