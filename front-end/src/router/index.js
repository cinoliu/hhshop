import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/user-list',
                    component: resolve => require(['../components/page/user/user-list.vue'], resolve)
                },
                {
                    path: '/user-form',
                    component: resolve => require(['../components/page/user/user-form.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/member-list',
                    component: resolve => require(['../components/page/member/member-list.vue'], resolve)
                },
                {
                    path: '/member-form',
                    component: resolve => require(['../components/page/member/member-form.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/goods-list',
                    component: resolve => require(['../components/page/goods/goods-list.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/goods-form',
                    component: resolve => require(['../components/page/goods//goods-form.vue'], resolve)       // Vue-Core-
                }
				
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
