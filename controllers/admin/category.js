const Category = require('../../models/category');
const Response = require('../../utils/response');

class CategoryController {
  /**
   * 获取所有分类
   */
  static async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      // 获取每个分类下的文章数量
      for (const category of categories) {
        category.articleCount = await Category.getArticleCount(category.id);
      }
      res.json(Response.success(categories));
    } catch (error) {
      res.status(500).json(Response.error('获取分类列表失败'));
    }
  }

  /**
   * 获取单个分类
   */
  static async getOne(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json(Response.error('分类不存在'));
      }
      category.articleCount = await Category.getArticleCount(category.id);
      res.json(Response.success(category));
    } catch (error) {
      res.status(500).json(Response.error('获取分类信息失败'));
    }
  }

  /**
   * 创建分类
   */
  static async create(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json(Response.error('分类名称不能为空'));
      }
      const id = await Category.create({ name, description });
      res.json(Response.success({ id, name, description }));
    } catch (error) {
      res.status(500).json(Response.error('创建分类失败'));
    }
  }

  /**
   * 更新分类
   */
  static async update(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json(Response.error('分类名称不能为空'));
      }
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json(Response.error('分类不存在'));
      }
      await Category.update(req.params.id, { name, description });
      res.json(Response.success({ id: req.params.id, name, description }));
    } catch (error) {
      res.status(500).json(Response.error('更新分类失败'));
    }
  }

  /**
   * 删除分类
   */
  static async delete(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json(Response.error('分类不存在'));
      }
      const articleCount = await Category.getArticleCount(req.params.id);
      if (articleCount > 0) {
        return res.status(400).json(Response.error('该分类下还有文章，无法删除'));
      }
      await Category.delete(req.params.id);
      res.json(Response.success(null, '删除成功'));
    } catch (error) {
      res.status(500).json(Response.error('删除分类失败'));
    }
  }
}

module.exports = CategoryController;