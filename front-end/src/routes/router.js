import Vue from "vue";
import Router from "vue-router";
import Admin from "../components/admin.vue";
import Login from "../components/common/login.vue";

import UserForm from "../components/user/user-form.vue";
import UserList from "../components/user/user-list.vue";

import MemberForm from "../components/member/member-form.vue";
import MemberList from "../components/member/member-list.vue";

import GoodstypeForm from "../components/goodstype/goodstype-form.vue";
import GoodstypeList from "../components/goodstype/goodstype-list.vue";


import GoodsForm from "../components/goods/goods-form.vue";
import GoodsList from "../components/goods/goods-list.vue";


import orderForm from "../components/order/order-form.vue";
import orderList from "../components/order/order-list.vue";




Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/admin',
            redirect: '/admin/goods-list',
            component: Admin,
            children: [
				
				  {
                    path: '/admin/user-list',
                    component: UserList,
                },
                {
                    path: '/admin/user-form',
                    component: UserForm,
                },
				
				  {
                    path: '/admin/member-list',
                    component: MemberList,
                },
                {
                    path: '/admin/member-form',
                    component: MemberForm,
                },
				
				  {
                    path: '/admin/goodstype-list',
                    component: GoodstypeList,
                },
				
                {
                    path: '/admin/goodstype-form',
                    component: GoodstypeForm,
                },
                {
                    path: '/admin/goods-list',
                    component: GoodsList,
                },
                {
                    path: '/admin/goods-form',
                    component: GoodsForm,
                },
                {
                    path: '/admin/order-list',
                    component: orderList,
                },
                {
                    path: '/admin/order-form',
                    component: orderForm,
                }
               
              
				
            ]
        },
        {
            path: '/',
            component: Login,
        },
    ]
});