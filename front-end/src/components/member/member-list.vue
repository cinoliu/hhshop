<template>

    <div class="admin-list">
<div style="margin-bottom:30px">	
	<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>会员管理</el-breadcrumb-item>
  <el-breadcrumb-item>会员列表</el-breadcrumb-item>
 
</el-breadcrumb>	
		
	</div>		

		
<el-form :inline="true"  class="demo-form-inline">
  <el-form-item >
    <el-input v-model="member_phone" placeholder="筛选手机号码"></el-input>
    </el-form-item>
	    <el-form-item >
    <el-button type="primary" @click="search">查询</el-button>
  </el-form-item>	
		<router-link to="/admin/member-form">
		<el-button type="success">新增会员</el-button>
	</router-link>
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
                prop="member_name"
                label="会员名称">
            </el-table-column>
	
	       <el-table-column
                prop="member_phone"
                label="手机号码">
            </el-table-column>
			
			   <el-table-column
                prop="recommendation_code"
                label="推荐码">
            </el-table-column>
			

	<el-table-column prop="membership_level" label="等级"  :formatter="formatLevel" sortable>
			</el-table-column>
            <el-table-column sortable
                width="160"
                label="添加日期">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
</el-table-column>




<el-table-column label="操作" width="300">
	<template scope="scope">
     <el-dropdown trigger="click" @command="changeRole">
                        <el-button size="small"
                                   @click='curRow = scope.row'>
                            变更等级<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for='membership_level in membership_levels'
                                              :key='membership_level.val'
                                              :command="membership_level.val"
                                              :disabled="scope.row.membership_level == membership_level.txt">{{ membership_level.txt }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

 <el-button
                        size="small"
                        @click="editMember(scope.row)">修改会员
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除
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
				member_phone: '',
				multipleSelection: [],

				membership_levels: [{
						val: '1',
						txt: '普通会员'
					},
					{
						val: '10',
						txt: '金牌会员'
					},
					{
						val: '100',
						txt: 'VIP会员'
					},
				],

				curRow: null,

				load: false, // loading
			}
		},

		methods: {

			//会员转换
			formatLevel: function(row, column) {
				return row.membership_level == 1 ? '普通会员' : row.membership_level == 10 ? '金牌会员' : row.membership_level == 100 ? 'VIP会员' : '未知';
			},

			//列表数据
				
			fetchList() {
		
			 this.load = true;
				var reqParams ={

					member_phone:this.member_phone,
					cur_page :this.cur_page,
				
				};
		
            this.func.ajaxPost(this.api.memberList,reqParams,res => {
                this.tableData = res.data.resultList;
                this.load = false;
            });
				
		
			},	
			
			
			
			

			//分页
			handleCurrentChange(val) {
				this.cur_page = val;
				this.fetchList();
			},

			//搜索
			search() {
			
				this.fetchList();
			},


			// 修改
			editMember(row) {
				console.log(row);
				this.$router.push({
					path: '/admin/member-form',
					query: {
						member_id: row.member_id
					}
				});
			},



			// 删除
			handleDelete(row) {
				this.func.ajaxPost(this.api.memberDelete, {
					member_id: row.member_id
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
				this.func.ajaxPost(this.api.memberChangeRole, {
						change_role: val,
						member_id: this.curRow.member_id
					},
					res => {
						if (res.data.code === 200) {
							this.$message.success('成功');
							this.fetchList();
						}
					}
				);

			},

	

			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		},

		created() {
			this.fetchList();
		},


	}

</script>
