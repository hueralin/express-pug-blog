const database = require('../utils/database');

class Tag {
  static async findAll() {
    const sql = 'SELECT * FROM tags ORDER BY created_at DESC';
    return await database.query(sql);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM tags WHERE id = ?';
    const results = await database.query(sql, [id]);
    return results[0];
  }

  static async create(data) {
    const sql = 'INSERT INTO tags (name) VALUES (?)';
    const result = await database.query(sql, [data.name]);
    return result.insertId;
  }

  static async update(id, data) {
    const sql = 'UPDATE tags SET name = ? WHERE id = ?';
    await database.query(sql, [data.name, id]);
    return id;
  }

  static async delete(id) {
    const sql = 'DELETE FROM tags WHERE id = ?';
    await database.query(sql, [id]);
    return id;
  }

  static async getArticleCount(id) {
    const sql = 'SELECT COUNT(*) as count FROM article_tag WHERE tag_id = ?';
    const results = await database.query(sql, [id]);
    return results[0].count;
  }

  static async findByArticleId(articleId) {
    const sql = 'SELECT t.* FROM tags t INNER JOIN article_tag at ON t.id = at.tag_id WHERE at.article_id = ?';
    return await database.query(sql, [articleId]);
  }
}

module.exports = Tag;