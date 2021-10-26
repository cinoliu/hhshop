## 项目线上地址

- [x] [管理系统](http://1.12.231.13/hhshop-mgr/index.html)

        -不同账户权限不一样
        -账户 admin 密码 123456
        -账户 admin1 密码 123456

## 前言

- [x] 后端 (hhshop-api)

        - 负责提供接口，操作数据库提供前端所需的数据和状态。

- [x] 管理系统 (hhshop-mgr)

        - 负责调用接口，将商品库存 用户订单 报表 展示给系统管理人员，并对商品的录入 用户购买行为进行分析 用户的订单进行处理。

- [x] 小程序 (hhshop-mini-app)

        - 负责 C 端的产品分类，产品展示，用户下单，实时客服， 购物车 订单详情
        - 以及用户购买行为记录 优惠券、积分、秒杀、拼团、砍价、分销、会员等级

- [x] 小程序版管理系统 (hhshop-mini-admin)

        - （功能同 PC 版管理系统）

- [x] APP

        - （功能同小程序版本）

- [x] 数据库

        -  负责存储数据啦，关于数据库，网上很多教程都是使用 mongodb，通过 mongoose 操作 mongdb 的确比 mysql 便捷很多，
        - 不过实际工作中还是使用 mysql 的多，技术还是得回归实际应用才能体现出价值。

# hhshop

- 用到的技术栈
- 数据库：mysql + NavicatPremium
- 后端[ hhshop-api ]：node + express + mysqljs(node 数据库模块)
- 管理系统 [ hhshop-mgr ] :vue2 + iview2 + axio + webpack2 +echarts
- 小程序 [ hhshop-mini-app ] ： 微信小程序 api + ES6-Promise
- 小程序版管理系统 [ hhshop-mini-admin ] ： 微信小程序 api + ES6-Promise
- App(跨平台) [ webapp ] ：vue-router+ vue-resource + webpack + es6-babel +HBuild 基座

## 功能详情

- 1.商品:  能够对商品的状态分类管理 (出售中、待上架、库存中、已售馨、库存警戒、回收站)、添加产品、添加商品分类等功能

- 2.会员:站内会员的管理 (会员等级、发放优惠劵、发通知、发图文消息、增加余额、会员行为详情) 等功能

- 3.营销:能够管理优惠的发放和制作、用户积分的统计使用情况、秒杀产品的管理等

- 4.财务:能够对用户的消费、充值、返佣的记录

- 5.订单:能够完成用户的订单管理(发货、订单详情、修改订单、订单备注、订单记录、订单退款) 、售后服务 (评论的回复与删除)

- 6.分销:后台有分销统计管理，分销可以设置人人分销和指定人分销，也可以自己稍微开发一下修改规

- 7.数据统计图表统计分析(财务统计、产品统计、会员统计、营销统计、分销统计、交易统计等)

- 8.设置:能够完成管理员对网站的商品资料（添加大类、添加小类、商品添加、属性快速生成、商品审查）、商品交易（外理订单、发货查询）、会员管理（会员审查）、操作管理（管理员添加、管理员审查、管理员退出）、系统配置、后台通知等功能

- 9.内容:管理文章分类 (添加分类、删除分类、修改分类) 、 管理文章

- 10.维护:查看系统日志、文件变动效验、刷新网站缓存、在线更新系统、清除数据、文件管理等功能

- 11.权限管理：可以创建不同身份，不同管理员，同一个管理员可以拥有多重身份，权限可以控制到每一个控制器函数，例如：张三 1.可以控制他可以查看产品，但不能编辑产品； 2.可以添加产品，但不能删除产品； 3.可以查看用户但不能给用户发信息、加积分、开通分销等等； 。。。灵活应用，权限想怎么配就怎么配

## hhshop-mini-app 截图  

![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mini-app/1.png)

## hhshop-mini-admin 截图  

![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mini-admin/1.png)



## hhshop-mgr 截图  

![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/1.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/2.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/3.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/4.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/5.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/6.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/7.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/8.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/9.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/10.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/11.png)
![](https://raw.githubusercontent.com/cinoliu/hhshop/master/hhshop-mgr/12.png)
