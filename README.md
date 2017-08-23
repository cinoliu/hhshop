# node-admin #
- 用到的技术栈
- 数据库：mysql NavicatPremium
- 后端：node express mysqljs(node数据库模块)
- 前端: vue(mvvm框架) elment-ui(快速搭建前端页面) axios(ajax) webpack(构建工具)


## 前言 ##
后端负责提供接口，操作数据库提供前端所需的数据和状态。
前端负责调用接口，将数据展示给用户，并对用户的一些操作转发给后端处理。
数据库当然是负责存储数据啦，关于数据库，网上很多教程都是使用mongodb，通过mongoose操作mongdb的确比mysql便捷很多，不过实际工作中还是使用mysql的多，技术还是得回归实际应用才能体现出价值。


## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 用户管理
- [x] 会员管理
- [x] 商品管理
- [x] 图片拖拽/裁剪上传
- [x] axios跨域



## 项目运行 ##

```bash
# front-end
npm run dev
npm run build

localhost:8888

# back-end
node  app.js
localhost:9999/api/


