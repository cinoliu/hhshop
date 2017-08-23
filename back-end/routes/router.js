let express = require('express');

let user = require('../controls/user');
let goods = require('../controls/goods');
let member =require('../controls/member');
let api = require('../api');
let upload = require('../utils/upload');


let router = express.Router();



// user
router.get(api.userList, user.fetchAll);
router.get(api.userLogout, user.logout);
router.get(api.userAutoLogin, user.autoLogin); // 自动登录

router.post(api.userAdd, user.addOne);
router.post(api.userDelete, user.deleteOne);
router.post(api.userDeleteMulti, user.deleteMulti);
router.post(api.userLogin, user.login); // 登录
router.post(api.userChangeRole, user.controlVisit, user.changeRole); // 更改权限




// members
router.get(api.memberList, member.fetchAll);
router.post(api.memberDetail, member.fetchById);
router.post(api.memberAdd, member.addOne);
router.post(api.memberDelete, member.deleteOne);
router.post(api.memberDeleteMulti, member.deleteMulti);

router.post(api.memberChangeRole,  member.changeRole); // 更改会员等级





// goods
router.get(api.goodsList, goods.fetchAll);

router.post(api.goodsDetail, goods.fetchById);
router.post(api.goodsAdd, goods.addOne);
router.post(api.goodsDelete, goods.deleteOne);
router.post(api.goodsDeleteMulti, goods.deleteMulti);
router.post(api.goodsUploadImg, upload.single('avatar'),goods.uploadGoodsImg); // 图片上传

module.exports = router;