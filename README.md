# node-admin #
- 用到的技术栈
- 数据库：mysql + NavicatPremium
- 后端：node + express + mysqljs(node数据库模块)
- 前端: [ front-end ]: vue+ elment-ui + axios + webpack
- 前端: [ front-end(iview2) ] :vue2  + iview2 + axio + webpack2 +echarts
- 小程序 [ small-program ] ： 微信小程序api + ES6-Promise（目前不开源）
- App(跨平台)  [ webapp ] ：vue-router+ vue-resource + webpack + es6-babel +HBuild基座 （目前不开源）

## 前言 ##
- 后端负责提供接口，操作数据库提供前端所需的数据和状态。
- 前端负责调用接口，将商品库存 用户订单 报表 展示给系统管理人员，并对商品的录入 用户购买行为进行分析  用户的订单进行处理。
- 小程序 负责C端的产品分类，产品展示，用户下单，实时客服， 购物车 订单详情 以及用户购买行为记录
- APP  （功能同小程序版本）
- 数据库 负责存储数据啦，关于数据库，网上很多教程都是使用mongodb，通过mongoose操作mongdb的确比mysql便捷很多，不过实际工作中还是使用mysql- 的多，技术还是得回归实际应用才能体现出价值。


## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 用户管理
- [x] 会员管理
- [x] 商品管理
- [x] 订单管理
- [x] 跨域
- [x] 数据管理 



## front-end(iview2)截图 
  登录界面</br>
![](https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/login.jpg) 
  商品报表</br>
![](https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/goods.jpg)   
 订单报表
![](https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/oder.jpg) 
 用户权限管理
![](https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/user.jpg)   


## 小程序 截图 

![](https://raw.githubusercontent.com/cinoliu/node-admin-/master/small-program/Screenshot/1.jpg) 





## 项目运行 ##

```bash
# front-end
npm install
npm run dev
npm run build (需要改 webpage.config.js  下 publicPath: '/' 为   publicPath: './')

localhost:8888

# back-end
npm install
node  app.js
localhost:9999/api/


