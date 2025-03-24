// 前台路由
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const Attachment = require('../models/attachment');
  try {
    const attachments = await Attachment.findAll();
    res.render('index', { title: '我的世界', attachments });
  } catch (error) {
    res.render('index', { title: '我的世界', attachments: [] });
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '后台登录' });
});

module.exports = router;
