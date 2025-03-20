const User = require('../../models/user');
const Auth = require('../../middlewares/auth');
const Response = require('../../utils/response');

class AuthController {
  /**
   * 用户注册
   * @param {Object} req 请求对象
   * @param {Object} res 响应对象
   */
  static async register(req, res) {
    try {
      const { username, password, email } = req.body;

      // 验证必填字段
      if (!username || !password) {
        return res.status(400).json(Response.validationError('用户名和密码不能为空'));
      }

      // 检查用户名是否已存在
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json(Response.validationError('用户名已存在'));
      }

      // 创建新用户
      const user = await User.create({ username, password, email });
      
      // 将用户信息存储到session中
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email
      };

      res.status(201).json(Response.success({ user }, '注册成功'));
    } catch (error) {
      console.error('注册失败:', error);
      res.status(500).json(Response.error('注册失败'));
    }
  }

  /**
   * 用户登录
   * @param {Object} req 请求对象
   * @param {Object} res 响应对象
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // 验证必填字段
      if (!username || !password) {
        return res.status(400).json(Response.validationError('用户名和密码不能为空'));
      }

      // 查找用户
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json(Response.unauthorized('用户不存在'));
      }

      // 验证密码
      const isValidPassword = await User.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json(Response.unauthorized('用户名或密码错误'));
      }

      // 将用户信息存储到session中
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email
      };
      req.session.user = userData;

      res.json(Response.success({ user: userData }, '登录成功'));
    } catch (error) {
      console.error('登录失败:', error);
      res.status(500).json(Response.error('登录失败'));
    }
  }

  /**
   * 用户登出
   * @param {Object} req 请求对象
   * @param {Object} res 响应对象
   */
  static async logout(req, res) {
    try {
      // 清除session
      req.session.destroy((err) => {
        if (err) {
          console.error('登出失败:', err);
          return res.status(500).json(Response.error('登出失败'));
        }
        res.redirect('/login')
      });
    } catch (error) {
      console.error('登出失败:', error);
      res.status(500).json(Response.error('登出失败'));
    }
  }
}

module.exports = AuthController;