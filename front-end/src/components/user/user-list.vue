<template>
    <div class="admin-list">
		
		
<div class="crumbs">	
	<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
 
</el-breadcrumb>	
		
</div>	
		

		
<el-form :inline="true"  class="demo-form-inline">
 
		
		<router-link to="/admin/user-form">
		<el-button type="success">新增用户</el-button>
	</router-link>
			
<!--			  <el-button type="danger" @click="deleteMulti">批量删除</el-button>-->
</el-form>
		
        <el-table
            v-loading='load'
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
                type="selection">
            </el-table-column>

            <el-table-column
                prop="user_name"
                label="用户名">
            </el-table-column>

            <el-table-column
                width="160"
                label="添加日期">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
</el-table-column>

<el-table-column label="权限">
	<template scope="scope">
                    {{ scope.row.role }}
                </template>
</el-table-column>


<el-table-column label="操作">
	<template scope="scope">

                    <el-dropdown trigger="click" @command="changeRole">
                        <el-button size="small"
                                   @click='curRow = scope.row'>
                            修改权限<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for='role in roles'
                                              :key='role.val'
                                              :command="role.val"
                                              :disabled="scope.row.role == role.txt">{{ role.txt }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除用户
                    </el-button>

                </template>
</el-table-column>

</el-table>
<div class="pagination">
	
	<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="500">
	</el-pagination>
</div>
</div>

</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				tableData: [],
				cur_page: 1,
				multipleSelection: [],
				
				roles: [{
						val: '1',
						txt: '普通用户'
					},
					{
						val: '10',
						txt: '管理员'
					},
					{
						val: '100',
						txt: '超级管理员'
					},
				],

				curRow: null,

				load: false, // loading
			}
		},

		methods: {
		
			
			
		fetchList() {
		
			 this.load = true;
				var reqParams ={
					
					cur_page :this.cur_page,
				
				};
		
            this.func.ajaxPost(this.api.userList,reqParams,res => {
                this.tableData = res.data.resultList;
                this.load = false;
            });
				
		
			},
			
			

			//分页
			handleCurrentChange(val) {
				this.cur_page = val;
				this.fetchList();
			},

			// 删除
			handleDelete(row) {
				this.func.ajaxPost(this.api.userDelete, {
					id: row.id
				}, res => {
					if (res.data.code === 200) {
						let index = this.tableData.indexOf(row);
						this.tableData.splice(index, 1);
						this.$message.success('删除成功');
					}
				});
			},

			// 修改
			changeRole(val) {
				this.func.ajaxPost(this.api.userChangeRole, {
						change_role: val,
						id: this.curRow.id
					},
					res => {
						if (res.data.code === 200) {
							this.$message.success('成功');
							this.fetchList();
						}
					}
				);

			},
//
//			deleteMulti() {
//				let multi = this.multipleSelection
//				let id = multi.map(el => {
//					return el.id;
//				});
//
//				this.func.ajaxPost(this.api.userDeleteMulti, {
//					id
//				}, res => {
//					if (res.data.code === 200) {
//						this.$message.success('删除成功');
//						multi.forEach(el => {
//							let i = this.tableData.indexOf(el);
//							this.tableData.splice(i, 1);
//						});
//					}
//				});
//			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		},

		created() {
			this.fetchList();
		},


	}

</script>
