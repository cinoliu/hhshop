<template>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">
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


<el-table-column prop="purchase_quantity" label="购买数量">
</el-table-column>



<el-table-column prop="state_name" label="订单状态">
</el-table-column>





<el-table-column width="160" label="添加日期">
	<template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
</el-table-column>




<el-table-column label="操作" width="300">
	<template scope="scope">
                    <el-button
                        size="small"
                        @click="editGoods(scope.row)">修改订单
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除订单
                    </el-button>
                </template>
</el-table-column>

</el-table>



<el-form-item>
	<el-button type="primary" @click="onSubmit">{{isNew ? '添加商品' : '修改商品'}}</el-button>
	<el-button @click="onCancel">取消</el-button>
</el-form-item>

</el-form>
</template>

<script>
	export default {
		    name: 'list',

		data() {
			return {
				isNew: 1, // 是否是添加
				tableData: [],
				multipleSelection: [],
				load: false, // loading

			}
		},



		methods: {



			onCancel() {
				this.$router.push('/admin/order-list');
			},



		
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}

		},




		created() {
			let member_id = this.$route.query.member_id;

			if (member_id) {
				this.isNew = 0;

				this.func.ajaxPost(this.api.orderDetail, {
					member_id
				}, res => {

					this.tableData = res.data.resultList;
					this.load = false;


				});
			}


		},

	}

</script>
