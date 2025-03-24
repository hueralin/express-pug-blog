const database = require('../utils/database');

class Attachment {
  /**
   * 创建附件记录
   * @param {Object} data 附件数据
   * @returns {Promise<number>} 创建的附件ID
   */
  static async create(data) {
    const sql = 'INSERT INTO attachments (filename, mime_type, size, path) VALUES (?, ?, ?, ?)';
    const result = await database.query(sql, [data.filename, data.mimeType, data.size, data.path]);
    return result.insertId;
  }

  /**
   * 获取所有附件
   * @returns {Promise<Array>} 附件列表
   */
  static async findAll() {
    const sql = 'SELECT * FROM attachments ORDER BY created_at DESC';
    return await database.query(sql);
  }

  /**
   * 通过ID获取附件
   * @param {number} id 附件ID
   * @returns {Promise<Object|null>} 附件对象
   */
  static async findById(id) {
    const sql = 'SELECT * FROM attachments WHERE aid = ?';
    const results = await database.query(sql, [id]);
    return results[0] || null;
  }

  /**
   * 删除附件
   * @param {number} id 附件ID
   * @returns {Promise<boolean>} 删除结果
   */
  static async delete(id) {
    const sql = 'DELETE FROM attachments WHERE aid = ?';
    const result = await database.query(sql, [id]);
    return result.affectedRows > 0;
  }

  /**
   * 更新附件信息
   * @param {number} id 附件ID
   * @param {Object} data 更新数据
   * @returns {Promise<boolean>} 更新结果
   */
  static async update(id, data) {
    const sql = 'UPDATE attachments SET filename = ?, mime_type = ?, size = ?, path = ? WHERE aid = ?';
    const result = await database.query(sql, [data.filename, data.mimeType, data.size, data.path, id]);
    return result.affectedRows > 0;
  }
}

module.exports = Attachment;