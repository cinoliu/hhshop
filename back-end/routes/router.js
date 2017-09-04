let express = require('express');

let user = require('../controls/user');
let member =require('../controls/member');
let goodstype = require('../controls/goodstype');
let goods = require('../controls/goods');
let order = require('../controls/order');

let api = require('../api');
let upload = require('../utils/upload');


let router = express.Router();



// user
router.post(api.userList, user.fetchAll);
router.get(api.userLogout, user.logout);
router.get(api.userAutoLogin, user.autoLogin); // 自动登录

router.post(api.userAdd, user.addOne);
router.post(api.userDelete, user.deleteOne);
router.post(api.userDeleteMulti, user.deleteMulti);
router.post(api.userLogin, user.login); // 登录
router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限




// members
router.post(api.memberList, member.fetchAll);
router.post(api.memberDetail, member.fetchById);
router.post(api.memberAdd, member.addOne);
router.post(api.memberDelete, member.deleteOne);
router.post(api.memberDeleteMulti, member.deleteMulti);
router.post(api.memberChangeRole,  member.changeRole); // 更改会员等级






// goodstype
router.post(api.goodstypeList, goodstype.fetchAll);
router.post(api.goodstypeDetail, goodstype.fetchById);
router.post(api.goodstypeAdd, goodstype.addOne);
router.post(api.goodstypeDelete, goodstype.deleteOne);





// goods
router.post(api.goodsList, goods.fetchAll);
router.post(api.goodsType, goods.fetchType);
router.post(api.goodsDetail, goods.fetchById);
router.post(api.goodsAdd, goods.addOne);
router.post(api.goodsDelete, goods.deleteOne);
router.post(api.goodsDeleteMulti, goods.deleteMulti);
router.post(api.goodsUploadImg, upload.single('avatar'),goods.uploadGoodsImg); // 图片上传





// goods
router.post(api.orderList, order.fetchAll);

router.post(api.orderDetail, order.fetchById);
router.post(api.orderAdd, order.addOne);
router.post(api.orderDelete, order.deleteOne);







module.exports = router;