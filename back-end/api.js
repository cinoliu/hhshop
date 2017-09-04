let path = '/api';

module.exports = {
   

    // user
    userList: path + '/user/list',
    userDelete: path + '/user/delete',
    userAdd: path + '/user/add',
    userDeleteMulti: path + '/user/delete-multi',
    userLogin: path + '/user/login',
    userLogout: path + '/user/logout',
    userAutoLogin: path + '/user/auto-login',
    userChangeRole: path + '/user/change-role',
	
	
	
 // member
    memberList: path + '/member/list',
    memberDetail: path + '/member/detail',
    memberDelete: path + '/member/delete',
    memberAdd: path + '/member/add',
    memberDeleteMulti: path + '/member/delete-multi',
    memberChangeRole: path + '/member/change-role',

	
	 // goodstype
    goodstypeList: path + '/goodstype/list',
    goodstypeDetail: path + '/goodstype/detail',
   	goodstypeDelete: path + '/goodstype/delete',
    goodstypeAdd: path + '/goodstype/add',
    goodstypeDeleteMulti: path + '/goodstype/delete-multi',
   
	

	
	 // goods
    goodsList: path + '/goods/list',
	goodsType:path + '/goods/fetchType',	
    goodsDetail: path + '/goods/detail',
    goodsDelete: path + '/goods/delete',
    goodsAdd: path + '/goods/add',
    goodsDeleteMulti: path + '/goods/delete-multi',
    goodsUploadImg: path + '/goods/upload-img',
	
	
	
	
		
	 // order
   	orderList: path + '/order/list',
	orderType:path + '/order/fetchType',	
    orderDetail: path + '/order/detail',
    orderDelete: path + '/order/delete',
    orderAdd: path + '/order/add',
    orderDeleteMulti: path + '/order/delete-multi',

	
	
	
	
	
	
	
	
	
};