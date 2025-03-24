const { upload, handleUploadError } = require('../../middlewares/upload');
const Attachment = require('../../models/attachment');
const Response = require('../../utils/response');
const path = require('path');
const fs = require('fs');

class AttachmentController {
  /**
   * 获取附件列表
   */
  static async list(req, res) {
    try {
      const attachments = await Attachment.findAll();
      res.json(Response.success(attachments));
    } catch (error) {
      console.error('获取附件列表失败:', error);
      res.json(Response.error('获取附件列表失败'));
    }
  }

  /**
   * 上传附件
   */
  static async upload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: '请选择要上传的文件' });
      }

      const attachmentData = {
        filename: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      };

      const attachmentId = await Attachment.create(attachmentData);
      const attachment = await Attachment.findById(attachmentId);

      res.json(Response.success(attachment, '文件上传成功'));
    } catch (error) {
      console.error('文件上传失败:', error);
      // 删除已上传的文件
      if (req.file) {
        const filePath = path.join(__dirname, '../../public', req.file.path);
        fs.unlink(filePath, (err) => {
          if (err) console.error('删除文件失败:', err);
        });
      }
      res.json(Response.error('文件上传失败'));
    }
  }

  /**
   * 删除附件
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const attachment = await Attachment.findById(id);

      if (!attachment) {
        return res.json(Response.error('附件不存在', 404));
      }

      // 删除文件
      const filePath = path.join(__dirname, '../../public', attachment.path);
      fs.unlink(filePath, (err) => {
        if (err) console.error('删除文件失败:', err);
      });

      // 删除数据库记录
      await Attachment.delete(id);

      res.json(Response.success(null, '附件删除成功'));
    } catch (error) {
      console.error('删除附件失败:', error);
      res.json(Response.error('删除附件失败'));
    }
  }
}

module.exports = AttachmentController;