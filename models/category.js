const database = require('../utils/database');

class Category {
  static async findAll() {
    const sql = 'SELECT * FROM categories ORDER BY created_at DESC';
    return await database.query(sql);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM categories WHERE id = ?';
    const results = await database.query(sql, [id]);
    return results[0];
  }

  static async create(data) {
    const sql = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    const result = await database.query(sql, [data.name, data.description]);
    return result.insertId;
  }

  static async update(id, data) {
    const sql = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
    await database.query(sql, [data.name, data.description, id]);
    return id;
  }

  static async delete(id) {
    const sql = 'DELETE FROM categories WHERE id = ?';
    await database.query(sql, [id]);
    return id;
  }

  static async getArticleCount(id) {
    const sql = 'SELECT COUNT(*) as count FROM article_category WHERE category_id = ?';
    const results = await database.query(sql, [id]);
    return results[0].count;
  }
}

module.exports = Category;