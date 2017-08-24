<template>
    <div class="admin-list">
		
		
		<div style="margin-bottom:30px">	
	<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
 
</el-breadcrumb>	
		
	</div>		
		
		
<el-form :inline="true"  class="demo-form-inline">
  <el-form-item >
    <el-input v-model="name" placeholder="筛选商品名称"></el-input>
  </el-form-item>
    <el-button type="primary" @click="search">查询</el-button>
  </el-form-item>
		
		
		<router-link to="/admin/goods-form">
		<el-button type="success">新增商品</el-button>
	</router-link>
		
		
	<el-button type="success">批量上架</el-button>
            <el-button type="danger" @click="deleteMulti">批量删除</el-button>
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
                prop="name"
                label="商品名">
            </el-table-column>

            <el-table-column
                width="160"
                label="添加日期">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="价格">
                <template scope="scope">
                    {{ scope.row.price }}元
                </template>
            </el-table-column>


            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="editGoods(scope.row)">修改商品
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.row)">删除商品
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
				name: '',
				is_search: false,

                multipleSelection: [],

                load: false, // loading
            }
        },

        methods: {
          
			fetchList() {
		
			 this.load = true;
				var reqParams ={
					name:this.name,
					cur_page :this.cur_page,
				
				};
		
            this.func.ajaxPost(this.api.goodsList,reqParams,res => {
                this.tableData = res.data.goods;
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
                this.func.ajaxPost(this.api.goodsDelete, {id: row.id}, res => {
                    if (res.data.code === 200) {
                        let index = this.tableData.indexOf(row);
                        this.tableData.splice(index, 1);
                        this.$message.success('删除成功');
                    }
                });
            },


            // 修改
            editGoods (row) {
                this.$router.push({path: '/admin/goods-form', query: {id: row.id}});
            },

            deleteMulti () {
                let multi = this.multipleSelection
                let id = multi.map(el => {
                    return el.id;
                });

                this.func.ajaxPost(this.api.deleteMulti, {id}, res => {
                    if (res.data.code === 200) {
                        this.$message.success('删除成功');
                        multi.forEach(el => {
                            let i = this.tableData.indexOf(el);
                            this.tableData.splice(i, 1);
                        });
                    }
                });
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