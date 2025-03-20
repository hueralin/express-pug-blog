const bcrypt = require('bcryptjs');
const database = require('../utils/database');

class User {
  /**
   * 创建用户
   * @param {Object} userData 用户数据
   * @returns {Promise<Object>} 创建的用户对象
   */
  static async create(userData) {
    const { username, password, email } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    const result = await database.query(sql, [username, hashedPassword, email]);
    return { id: result.insertId, username, email };
  }

  /**
   * 通过用户名查找用户
   * @param {string} username 用户名
   * @returns {Promise<Object|null>} 用户对象
   */
  static async findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const users = await database.query(sql, [username]);
    return users.length ? users[0] : null;
  }

  /**
   * 验证用户密码
   * @param {string} password 明文密码
   * @param {string} hashedPassword 加密后的密码
   * @returns {Promise<boolean>} 验证结果
   */
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * 更新用户信息
   * @param {number} id 用户ID
   * @param {Object} userData 用户数据
   * @returns {Promise<boolean>} 更新结果
   */
  static async update(id, userData) {
    const { email } = userData;
    const sql = 'UPDATE users SET email = ?, updated_at = NOW() WHERE id = ?';
    const result = await database.query(sql, [email, id]);
    return result.affectedRows > 0;
  }

  /**
   * 更新用户密码
   * @param {number} id 用户ID
   * @param {string} newPassword 新密码
   * @returns {Promise<boolean>} 更新结果
   */
  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = 'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?';
    const result = await database.query(sql, [hashedPassword, id]);
    return result.affectedRows > 0;
  }
}

module.exports = User;