/**
 * 统一 API 响应格式
 */
class Response {
  /**
   * 成功响应
   * @param {Object} data 响应数据
   * @param {string} message 响应消息
   * @returns {Object} 响应对象
   */
  static success(data = null, message = '操作成功') {
    return {
      code: 0,
      message,
      data
    };
  }

  /**
   * 错误响应
   * @param {string} message 错误消息
   * @param {number} code 错误码
   * @returns {Object} 响应对象
   */
  static error(message = '操作失败', code = 500) {
    return {
      code,
      message,
      data: null
    };
  }

  /**
   * 参数验证错误
   * @param {string} message 错误消息
   * @returns {Object} 响应对象
   */
  static validationError(message = '参数验证失败') {
    return this.error(message, 400);
  }

  /**
   * 未授权错误
   * @param {string} message 错误消息
   * @returns {Object} 响应对象
   */
  static unauthorized(message = '未授权访问') {
    return this.error(message, 401);
  }

  /**
   * 禁止访问错误
   * @param {string} message 错误消息
   * @returns {Object} 响应对象
   */
  static forbidden(message = '禁止访问') {
    return this.error(message, 403);
  }

  /**
   * 资源不存在错误
   * @param {string} message 错误消息
   * @returns {Object} 响应对象
   */
  static notFound(message = '资源不存在') {
    return this.error(message, 404);
  }
}

module.exports = Response;