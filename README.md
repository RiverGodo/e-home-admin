# E-Home Admin

一个基于 Node.js 和 Express 的后台管理系统，用于管理新闻、分类、轮播图和管理员用户。

## 项目简介

E-Home Admin 是一个内容管理系统（CMS），提供了完整的后台管理功能，包括管理员认证、新闻管理、分类管理和轮播图管理等功能。

## 技术栈

- **运行环境**: Node.js
- **Web 框架**: Express 4.16.0
- **数据库**: MongoDB
- **ODM**: Mongoose 5.3.7
- **模板引擎**: EJS 2.5.7
- **会话管理**: express-session + connect-mongo
- **其他依赖**:
  - cookie-parser: Cookie 解析
  - morgan: HTTP 请求日志
  - debug: 调试工具

## 项目结构

```
e-home-admin/
├── bin/                    # 启动脚本
│   └── www                 # 服务器启动入口
├── controller/             # 控制器层
│   ├── adminUser.js        # 管理员用户控制器
│   ├── auth.js             # 认证中间件
│   ├── category.js         # 分类控制器
│   ├── news.js             # 新闻控制器
│   └── swiper.js           # 轮播图控制器
├── model/                  # 数据模型层
│   ├── adminUser.js        # 管理员用户模型
│   ├── category.js         # 分类模型
│   ├── config.js           # MongoDB 连接配置
│   ├── news.js             # 新闻模型
│   └── swiper.js           # 轮播图模型
├── routes/                 # 路由配置
│   └── index.js            # 路由入口
├── views/                  # 视图模板
│   ├── error.ejs           # 错误页面
│   └── index.ejs           # 首页
├── public/                 # 静态资源
│   └── stylesheets/        # 样式文件
├── app.js                  # Express 应用主文件
└── package.json            # 项目依赖配置
```

## 功能模块

### 1. 管理员用户管理 (`/admin/adminUser`)

- **POST /** - 创建管理员（需要认证）
- **POST /login** - 管理员登录
- **GET /** - 获取管理员列表（需要认证，支持分页）

### 2. 新闻管理 (`/admin/news`)

- **POST /** - 创建新闻（需要认证）
- **GET /** - 获取新闻列表（支持分页）
- **GET /:id** - 获取新闻详情
- **DELETE /:id** - 删除新闻

### 3. 分类管理 (`/admin/category`)

- **GET /** - 获取分类列表

### 4. 轮播图管理 (`/admin/swiper`)

- **POST /** - 创建轮播图（需要认证）
- **GET /** - 获取轮播图列表（支持分页）
- **GET /:id** - 获取轮播图详情
- **PATCH /:id** - 更新轮播图（需要认证）
- **DELETE /:id** - 删除轮播图（需要认证）

## 安装与运行

### 环境要求

- Node.js (建议 v12 或更高版本)
- MongoDB (需要本地运行 MongoDB 服务)

### 安装步骤

1. 克隆项目到本地
```bash
git clone <repository-url>
cd e-home-admin
```

2. 安装依赖
```bash
npm install
```

3. 配置 MongoDB

确保 MongoDB 服务已启动，数据库连接配置在 `model/config.js` 中：
```javascript
mongoose.connect('mongodb://localhost/ehome', { useNewUrlParser: true })
```

如需修改数据库连接，请编辑 `model/config.js` 文件。

4. 启动项目

**生产环境**:
```bash
npm start
```

**开发环境** (使用 node-dev 自动重启):
```bash
npm run dev
```

5. 访问应用

服务器默认运行在 `http://localhost:3008`

可以通过环境变量 `PORT` 修改端口号。

## 数据模型

### 管理员用户 (admin_user)
- `username`: 用户名（必填，唯一）
- `nickname`: 昵称
- `avatar`: 头像
- `password`: 密码（必填）
- `desc`: 描述
- `job`: 职位
- `phone`: 电话
- `sex`: 性别
- `create_time`: 创建时间
- `update_time`: 更新时间

### 新闻 (news)
- `title`: 标题
- `content`: 内容
- `contentText`: 纯文本内容
- `img`: 图片
- `author`: 作者（关联 admin_user）
- `type`: 分类（关联 category）
- `look_num`: 浏览次数（默认 0）
- `create_time`: 创建时间
- `update_time`: 更新时间

### 分类 (category)
- `title`: 分类名称
- `icon`: 图标
- `create_time`: 创建时间
- `update_time`: 更新时间

### 轮播图 (swiper)
- `title`: 标题
- `img`: 图片
- `newsId`: 关联的新闻（关联 news）
- `status`: 显示状态（默认 1）
- `sort`: 排序号（默认 1）
- `create_time`: 创建时间
- `update_time`: 更新时间

## 认证机制

项目使用基于 Session 的认证机制：

1. 用户通过 `/admin/adminUser/login` 接口登录
2. 登录成功后，用户信息存储在 `req.session.user` 中
3. 需要认证的接口通过 `auth` 中间件进行验证
4. Session 存储在 MongoDB 中（使用 connect-mongo）
5. Session 过期时间为 2 小时

## API 响应格式

所有 API 接口统一返回 JSON 格式：

**成功响应**:
```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {}
}
```

**错误响应**:
```json
{
  "code": 400/401/403/500,
  "msg": "错误信息"
}
```

## 开发说明

### 添加新功能

1. 在 `model/` 目录下创建数据模型
2. 在 `controller/` 目录下创建控制器
3. 在 `routes/index.js` 中注册路由

### 认证中间件

使用 `auth` 中间件保护需要登录的接口：
```javascript
const auth = require('./auth');
router.post('/', auth, async (req, res, next) => {
  // 需要认证的接口逻辑
});
```

## 注意事项

1. 确保 MongoDB 服务已启动并运行在默认端口（27017）
2. Session 密钥配置在 `app.js` 中，生产环境请修改 `secret` 值
3. 密码目前以明文存储，生产环境建议加密处理
4. 建议在生产环境中配置 HTTPS 和更严格的安全策略

## 许可证

Private Project

## 版本

v0.0.0

## ☕ 请作者喝杯奶茶

如果这个项目对你有帮助，欢迎请作者喝杯奶茶 🥤

<div align="center">
  <img src="https://raw.githubusercontent.com/RiverGodo/gallery/main/pay.png" alt="请作者喝杯奶茶" width="400">
</div>

---

