const mysql = require('mysql2/promise');
const config = require('../config/database');
const logger = require('../config/logger');

class Database {
  constructor() {
    this.pool = null;
  }

  async connect() {
    try {
      this.pool = mysql.createPool(config);
      // 测试连接
      const connection = await this.pool.getConnection();
      connection.release();
      logger.info('数据库连接成功');
    } catch (error) {
      logger.error('数据库连接失败:', error);
      throw error;
    }
  }

  async query(sql, params) {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      logger.error('SQL 执行错误:', error);
      throw error;
    }
  }

  async beginTransaction() {
    const conn = await this.pool.getConnection();
    await conn.beginTransaction();
    return conn;
  }

  async commit(conn) {
    await conn.commit();
    conn.release();
  }

  async rollback(conn) {
    await conn.rollback();
    conn.release();
  }
}

module.exports = new Database();