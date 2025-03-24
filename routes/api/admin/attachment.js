const express = require('express');
const router = express.Router();
const AttachmentController = require('../../../controllers/admin/attachment');
const { upload, handleUploadError } = require('../../../middlewares/upload');

// 获取附件列表
router.get('/', AttachmentController.list);

// 上传附件
router.post('/', upload.single('file'), handleUploadError, AttachmentController.upload);

// 删除附件
router.delete('/:id', AttachmentController.delete);

module.exports = router;