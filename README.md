# node-admin

- 用到的技术栈
- 数据库：mysql + NavicatPremium
- 后端：node + express + mysqljs(node 数据库模块)

- 前端: [ front-end(iview2) ] :vue2 + iview2 + axio + webpack2 +echarts
- 小程序 [ small-program ] ： 微信小程序 api + ES6-Promise
- App(跨平台) [ webapp ] ：vue-router+ vue-resource + webpack + es6-babel +HBuild 基座

## 前言

- 后端负责提供接口，操作数据库提供前端所需的数据和状态。
- 前端负责调用接口，将商品库存 用户订单 报表 展示给系统管理人员，并对商品的录入 用户购买行为进行分析 用户的订单进行处理。
- 小程序 负责 C 端的产品分类，产品展示，用户下单，实时客服， 购物车 订单详情 以及用户购买行为记录
- APP （功能同小程序版本）
- 数据库 负责存储数据啦，关于数据库，网上很多教程都是使用 mongodb，通过 mongoose 操作 mongdb 的确比 mysql 便捷很多，不过实际工作中还是使用 mysql- 的多，技术还是得回归实际应用才能体现出价值。

## 功能

- [x] ### 系统管理

        -用户管理
        -角色管理
        -菜单管理

- [x] ### 数据中心

        -数据中心

- [x] ### 订单管理

        -订单中心
        -订单报表

* [x] ### 商品管理

        -商品列表
        -商品分类
        -品牌商管理

* [x] ### 店铺管理

      -关键字设置
        -首页轮播
        -专题管理
        -运费模版
        -结算规则
        -常见问题

* [x] ### 店铺运营

       -优惠券管理
       -拼团管理
       -砍价管理
       -抽奖管理

* [x] ### 分销管理

         -分销设置
         -分销申请
         -分销用户
         -分销明细

- [x] ### 会员管理

        -会员列表
        -会员等级设置
        -会员反馈

- [x] ### 文章管理

        -新手指南
        -售后指南

## front-end(iview2)截图  

登录界面</br>
![](<https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/login.jpg>)
  商品报表</br>
![](<https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/goods.jpg>)  
 订单报表
![](<https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/oder.jpg>)
用户权限管理
![](<https://raw.githubusercontent.com/cinoliu/node-admin-/master/front-end(iview2)/Screenshot/user.jpg>)

## 小程序 截图  

![](https://raw.githubusercontent.com/cinoliu/node-admin-/master/small-program/Screenshot/1.jpg)
