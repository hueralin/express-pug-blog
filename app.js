const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const database = require('./utils/database');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin/index');
const apiRouter = require('./routes/api/index');
const adminApiRouter = require('./routes/api/admin/index');

const app = express();

// 初始化数据库连接
database.connect().catch(err => {
  console.error('无法连接到数据库:', err);
  process.exit(1);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置 session 中间件
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24小时
  }
}));

// 启用 CORS
app.use(cors());

// 前台页面路由
app.use('/', indexRouter);
// 管理后台页面路由
app.use('/admin', adminRouter);
// 前台 API 路由
app.use('/api', apiRouter);
// 管理后台 API 路由
app.use('/api/admin', adminApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
