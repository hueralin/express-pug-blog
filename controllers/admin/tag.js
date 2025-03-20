const Tag = require('../../models/tag');
const Response = require('../../utils/response');

class TagController {
  /**
   * 获取所有标签
   */
  static async getAll(req, res) {
    try {
      const tags = await Tag.findAll();
      // 获取每个标签下的文章数量
      for (const tag of tags) {
        tag.articleCount = await Tag.getArticleCount(tag.id);
      }
      res.json(Response.success(tags));
    } catch (error) {
      res.status(500).json(Response.error('获取标签列表失败'));
    }
  }

  /**
   * 获取单个标签
   */
  static async getOne(req, res) {
    try {
      const tag = await Tag.findById(req.params.id);
      if (!tag) {
        return res.status(404).json(Response.error('标签不存在'));
      }
      tag.articleCount = await Tag.getArticleCount(tag.id);
      res.json(Response.success(tag));
    } catch (error) {
      res.status(500).json(Response.error('获取标签信息失败'));
    }
  }

  /**
   * 创建标签
   */
  static async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json(Response.error('标签名称不能为空'));
      }
      const id = await Tag.create({ name });
      res.json(Response.success({ id, name }));
    } catch (error) {
      res.status(500).json(Response.error('创建标签失败'));
    }
  }

  /**
   * 更新标签
   */
  static async update(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json(Response.error('标签名称不能为空'));
      }
      const tag = await Tag.findById(req.params.id);
      if (!tag) {
        return res.status(404).json(Response.error('标签不存在'));
      }
      await Tag.update(req.params.id, { name });
      res.json(Response.success({ id: req.params.id, name }));
    } catch (error) {
      res.status(500).json(Response.error('更新标签失败'));
    }
  }

  /**
   * 删除标签
   */
  static async delete(req, res) {
    try {
      const tag = await Tag.findById(req.params.id);
      if (!tag) {
        return res.status(404).json(Response.error('标签不存在'));
      }
      const articleCount = await Tag.getArticleCount(req.params.id);
      if (articleCount > 0) {
        return res.status(400).json(Response.error('该标签下还有文章，无法删除'));
      }
      await Tag.delete(req.params.id);
      res.json(Response.success(null, '删除成功'));
    } catch (error) {
      res.status(500).json(Response.error('删除标签失败'));
    }
  }
}

module.exports = TagController;