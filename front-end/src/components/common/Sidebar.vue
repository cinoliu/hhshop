<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                   
                    {
                        icon: 'el-icon-menu',
                        index: '1',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'user-list',
                                title: '用户列表'
                            },
                            {
                                index: 'user-form',
                                title: '用户新增'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '会员管理',
                        subs: [
                            {
                                index: 'member-list',
                                title: '会员列表'
                            },
                            {
                                index: 'member-form',
                                title: '会员新增'
							}
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '3',
                        title: '商品管理', 
						subs: [
                            {
                                index: 'goods-list',
                                title: '商品列表'
                            },
                            {
                                index: 'goods-form',
                                title: '商品新增'
                            }
                           
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
				
				
			
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
