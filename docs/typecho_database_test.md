# Typecho 数据库设计

## 文章表 (contents)
- cid: int, 主键, 自增, 文章ID
- title: varchar(200), 文章标题
- slug: varchar(200), 文章缩略名
- text: text, 文章内容
- order: int, 排序
- authorId: int, 作者ID
- status: varchar(16), 状态(publish/hidden/private/waiting)
- created: int, 创建时间
- updated: int, 修改时间

## 元数据表 (metas)
- mid: int, 主键, 自增, 项目ID
- name: varchar(200), 名称
- slug: varchar(200), 缩略名
- type: varchar(32), 类型(category/tag)
- description: varchar(200), 描述
- count: int, 项目所属内容个数
- order: int, 排序
- created: int, 创建时间
- updated: int, 修改时间

## 关系表 (content_meta)
- cid: int, 内容ID
- mid: int, 项目ID
- created: int, 创建时间
- updated: int, 修改时间

## 用户表 (users)
- uid: int, 主键, 自增, 用户ID
- name: varchar(32), 用户名
- password: varchar(64), 密码
- mail: varchar(200), 邮箱
- nickName: varchar(32), 显示名称
- created: int, 创建时间
- updated: int, 修改时间

## 索引设计
- contents表: cid(主键), created(索引), slug(唯一索引)
- metas表: mid(主键), slug(唯一索引), type(索引)
- content_meta表: cid,mid(联合主键)
- users表: uid(主键), name(唯一索引), mail(唯一索引)

## 外键关系
- contents.authorId -> users.uid
- content_meta.cid -> contents.cid
- content_meta.mid -> metas.mid