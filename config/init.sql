-- 创建数据库
CREATE DATABASE IF NOT EXISTS blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE blog;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    uid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mail VARCHAR(200) NOT NULL UNIQUE,
    nickname VARCHAR(32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (username),
    INDEX idx_mail (mail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 文章表
CREATE TABLE IF NOT EXISTS contents (
    cid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    text TEXT NOT NULL,
    html_content TEXT NOT NULL,
    status ENUM('publish', 'hidden', 'private', 'draft') NOT NULL DEFAULT 'draft',
    order_num INT NOT NULL DEFAULT 0,
    view_count INT NOT NULL DEFAULT 0,
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(uid) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_author_id (author_id),
    INDEX idx_created_at (created_at),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 元数据表（统一管理分类和标签）
CREATE TABLE IF NOT EXISTS metas (
    mid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    type ENUM('category', 'tag') NOT NULL,
    description VARCHAR(200),
    count INT NOT NULL DEFAULT 0,
    order_num INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 内容和元数据关系表
CREATE TABLE IF NOT EXISTS content_meta (
    cid INT NOT NULL,
    mid INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (cid, mid),
    FOREIGN KEY (cid) REFERENCES contents(cid) ON DELETE CASCADE,
    FOREIGN KEY (mid) REFERENCES metas(mid) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 附件表
CREATE TABLE IF NOT EXISTS attachments (
    aid INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size INT NOT NULL,
    path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入默认管理员账号
-- 密码为 admin123，使用 bcrypt 加密
INSERT INTO users (username, password, mail, nickname) VALUES
('admin', '$2b$10$3diBgslVYi.tbqaiDLvS4uekhcT07h4Q.xPPi4bhfI/Xn73cmJgQS', 'admin@example.com', '管理员');