# 数据库设计

## 用户表 (users)
- id: int, 主键, 自增
- username: varchar(50), 用户名, 唯一
- password: varchar(255), 密码（加密存储）
- email: varchar(100), 邮箱
- created_at: timestamp, 创建时间
- updated_at: timestamp, 更新时间

## 文章表 (articles)
- id: int, 主键, 自增
- title: varchar(255), 文章标题
- content: text, 文章内容（Markdown格式）
- html_content: text, 转换后的HTML内容
- status: enum('draft', 'published', 'hidden'), 文章状态
- view_count: int, 浏览次数
- user_id: int, 外键关联users表
- created_at: timestamp, 创建时间
- updated_at: timestamp, 更新时间

## 分类表 (categories)
- id: int, 主键, 自增
- name: varchar(50), 分类名称
- description: varchar(255), 分类描述
- created_at: timestamp, 创建时间
- updated_at: timestamp, 更新时间

## 标签表 (tags)
- id: int, 主键, 自增
- name: varchar(50), 标签名称
- created_at: timestamp, 创建时间
- updated_at: timestamp, 更新时间

## 文章分类关联表 (article_category)
- article_id: int, 外键关联articles表
- category_id: int, 外键关联categories表
- PRIMARY KEY (article_id, category_id)

## 文章标签关联表 (article_tag)
- article_id: int, 外键关联articles表
- tag_id: int, 外键关联tags表
- PRIMARY KEY (article_id, tag_id)

## 附件表 (attachments)
- id: int, 主键, 自增
- filename: varchar(255), 文件名
- original_name: varchar(255), 原始文件名
- mime_type: varchar(100), 文件类型
- size: int, 文件大小（字节）
- path: varchar(255), 存储路径
- article_id: int, 外键关联articles表（可为null）
- user_id: int, 外键关联users表
- created_at: timestamp, 创建时间
- updated_at: timestamp, 更新时间