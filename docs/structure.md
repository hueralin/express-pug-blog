# 项目目录结构

```
├── bin/                    # 应用程序启动脚本
├── config/                 # 配置文件
│   ├── database.js         # 数据库配置
│   └── logger.js           # 日志配置
├── controllers/            # 控制器层
│   ├── admin/              # 后台管理控制器
│   │   ├── article.js      # 文章管理
│   │   ├── category.js     # 分类管理
│   │   ├── tag.js          # 标签管理
│   │   ├── attachment.js   # 附件管理
│   │   └── auth.js         # 认证相关
│   └── front/              # 前台展示控制器
│       ├── article.js      # 文章相关
│       ├── category.js     # 分类相关
│       └── tag.js          # 标签相关
├── models/                 # 数据模型层
│   ├── article.js          # 文章模型
│   ├── category.js         # 分类模型
│   ├── tag.js              # 标签模型
│   ├── user.js             # 用户模型
│   └── attachment.js       # 附件模型
├── middlewares/            # 中间件
│   ├── auth.js             # 认证中间件
│   ├── error.js            # 错误处理中间件
│   └── upload.js           # 文件上传中间件
├── public/                 # 静态资源
│   ├── images/             # 图片资源
│   ├── javascripts/        # JS文件
│   └── stylesheets/        # CSS文件
├── routes/                 # 路由配置
│   ├── admin.js            # 后台路由
│   └── front.js            # 前台路由
├── services/               # 业务逻辑层
│   ├── article.js          # 文章服务
│   ├── category.js         # 分类服务
│   ├── tag.js              # 标签服务
│   └── attachment.js       # 附件服务
├── utils/                  # 工具函数
│   ├── database.js         # 数据库工具
│   ├── logger.js           # 日志工具
│   └── response.js         # 响应格式化
├── views/                  # 视图模板
│   ├── admin/              # 后台视图
│   └── front/              # 前台视图
├── app.js                  # 应用程序入口
├── package.json            # 项目配置
└── README.md              # 项目说明
```

## 目录说明

- `bin/`: 存放应用程序的启动脚本
- `config/`: 配置文件目录，包含数据库、日志等配置
- `controllers/`: 控制器层，处理请求和响应
- `models/`: 数据模型层，定义数据结构和数据库操作
- `middlewares/`: 中间件，包含认证、错误处理等
- `public/`: 静态资源目录
- `routes/`: 路由配置，定义API路由
- `services/`: 业务逻辑层，处理具体业务逻辑
- `utils/`: 工具函数，提供通用功能
- `views/`: 视图模板，使用Pug模板引擎

## 设计说明

1. 采用三层架构：控制器层（Controller）、服务层（Service）、数据访问层（Model）
2. 分离前后台代码，便于维护和管理
3. 统一的错误处理和响应格式
4. 模块化的配置管理
5. 清晰的中间件结构