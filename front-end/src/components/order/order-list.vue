<template>
    <div class="admin-list">
		
		
		<div style="margin-bottom:30px">	
	<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>订单管理</el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
 
</el-breadcrumb>	
		
	</div>		
		
		
<el-form :inline="true"  class="demo-form-inline">
	
	 <el-form-item label="订单状态">
    <el-select v-model="state" placeholder="请选择订单状态">
      <el-option label="加入购物车" value="0"></el-option>
      <el-option label="已付款/待发货" value="1"></el-option>
	 <el-option label="待收货" value="2"></el-option>
	 <el-option label="已完成" value="3"></el-option>
    </el-select>
  </el-form-item>
	
	
	
	
	
	
  <el-form-item >
    <el-input v-model="member_name" placeholder="筛选用户名称"></el-input>
  </el-form-item>
	  <el-form-item >
    <el-button type="primary" @click="search">查询</el-button>
  </el-form-item>
		
		
		<router-link to="/admin/order-form">
		<el-button type="success">新增订单</el-button>
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
                prop="order_id"
                label="订单号">
            </el-table-column>

			
				  <el-table-column
                prop="member_name"
                label="用户名称">
            </el-table-column>
			
			
			 <el-table-column
                prop="members_addr"
                label="收货地址">
            </el-table-column>
			
				
			 <el-table-column
                prop="goods_name"
                label="产品名称">
            </el-table-column>
			
				
		   <el-table-column
                label="产品价格">
                <template scope="scope">
                    {{ scope.row.goods_price }}元
                </template>
            </el-table-column>
			
			
			<el-table-column
                prop="purchase_quantity"
                label="购买数量">
            </el-table-column>
			
			
			
			<el-table-column
                prop="state_name"
                label="订单状态">
            </el-table-column>
			
			 
		
			
			
            <el-table-column
                width="160"
                label="添加日期">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>

         


            <el-table-column label="操作" width="300">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="editGoods(scope.row)">查看订单
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除订单
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
				state: '',
				member_name:'',
                multipleSelection: [],

                load: false, // loading
            }
        },

        methods: {
          
			fetchList() {
		
			 this.load = true;
				var reqParams ={
					state:this.state,
					member_name:this.member_name,
					cur_page :this.cur_page,
				
				};
		console.log(this.state);
            this.func.ajaxPost(this.api.orderList,reqParams,res => {
				
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
  // 删除
            handleDelete(row) {
                this.func.ajaxPost(this.api.orderDelete, {order_id: row.order_id}, res => {
                    if (res.data.code === 200) {
                        let index = this.tableData.indexOf(row);
                        this.tableData.splice(index, 1);
                        this.$message.success('删除成功');
                    }
                });
            },


            // 修改
            editGoods (row) {
                this.$router.push({path: '/admin/order-form', query: {member_id: row.member_id}});
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