# Typecho 数据库设计

## 文章表 (contents)
- cid: int, 主键, 自增, 文章ID
- title: varchar(200), 文章标题
- slug: varchar(200), 文章缩略名
- created: int, 创建时间
- modified: int, 修改时间
- text: text, 文章内容
- order: int, 排序
- authorId: int, 作者ID
- template: varchar(32), 自定义模板
- type: varchar(16), 内容类型(post/page)
- status: varchar(16), 状态(publish/hidden/private/waiting)
- password: varchar(32), 访问密码
- commentsNum: int, 评论数
- allowComment: char(1), 是否允许评论
- allowPing: char(1), 是否允许引用
- allowFeed: char(1), 是否允许订阅
- parent: int, 父级内容

## 评论表 (comments)
- coid: int, 主键, 自增, 评论ID
- cid: int, 对应文章ID
- created: int, 创建时间
- author: varchar(200), 评论作者
- authorId: int, 评论作者ID
- ownerId: int, 文章作者ID
- mail: varchar(200), 评论者邮箱
- url: varchar(200), 评论者网站
- ip: varchar(64), 评论者IP
- agent: varchar(200), 评论者UA
- text: text, 评论内容
- type: varchar(16), 评论类型
- status: varchar(16), 评论状态
- parent: int, 父级评论

## 元数据表 (metas)
- mid: int, 主键, 自增, 项目ID
- name: varchar(200), 名称
- slug: varchar(200), 缩略名
- type: varchar(32), 类型(category/tag)
- description: varchar(200), 描述
- count: int, 项目所属内容个数
- order: int, 排序
- parent: int, 父级项目

## 关系表 (relationships)
- cid: int, 内容ID
- mid: int, 项目ID

## 用户表 (users)
- uid: int, 主键, 自增, 用户ID
- name: varchar(32), 用户名
- password: varchar(64), 密码
- mail: varchar(200), 邮箱
- url: varchar(200), 用户主页
- screenName: varchar(32), 显示名称
- created: int, 创建时间
- activated: int, 最后活动时间
- logged: int, 最后登录时间
- group: varchar(16), 用户组
- authCode: varchar(64), 认证码

## 配置表 (options)
- name: varchar(32), 配置名称, 主键
- user: int, 配置所属用户
- value: text, 配置值

## 索引设计
- contents表: cid(主键), created(索引), slug(唯一索引)
- comments表: coid(主键), cid(索引), created(索引)
- metas表: mid(主键), slug(唯一索引), type(索引)
- relationships表: cid,mid(联合主键)
- users表: uid(主键), name(唯一索引), mail(唯一索引)
- options表: name(主键), user(索引)

## 外键关系
- comments.cid -> contents.cid
- comments.authorId -> users.uid
- contents.authorId -> users.uid
- relationships.cid -> contents.cid
- relationships.mid -> metas.mid
- options.user -> users.uid