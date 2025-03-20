const Response = require('../utils/response');

class Auth {
  /**
   * 验证用户是否登录的中间件
   */
  static verifySession(req, res, next) {
    if (!req.session.user) {
      // 检查请求是否为API请求
      const isApiRequest = req.path.startsWith('/api/');
      if (isApiRequest) {
        return res.status(401).json(Response.unauthorized('未登录或会话已过期'));
      } else {
        // 非 API 请求重定向到登录页面
        return res.redirect('/login');
      }
    }
    req.user = req.session.user;
    next();
  }

  /**
   * 可选的会话验证中间件
   * 如果用户已登录，加载用户信息；如果未登录，继续处理请求
   */
  static optionalSession(req, res, next) {
    if (req.session.user) {
      req.user = req.session.user;
    }
    next();
  }
}

module.exports = Auth;