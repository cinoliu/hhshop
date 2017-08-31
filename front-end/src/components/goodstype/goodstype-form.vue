<template>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">

        <el-form-item label="类型名称">
            <el-input v-model="form.goods_typename"></el-input>
        </el-form-item>



		 <el-form-item label="备注">
         		<el-input type="textarea" :rows="3"  placeholder="请输入内容" v-model="form.remarks">
				</el-input>
		
        </el-form-item>


<el-form-item>
	<el-button type="primary" @click="onSubmit">{{isNew ? '添加类型' : '修改类型'}}</el-button>
	<el-button @click="onCancel">取消</el-button>
</el-form-item>

</el-form>
</template>

<script>
	export default {
		name: 'form',

		data() {
			return {
				isNew: 1, // 是否是添加
				form: {
					goods_type: undefined,
					goods_typename: '',
					remarks:'',
					
				}
			}
		},
		methods: {
			onSubmit() {
				if (!this.form.goods_typename) {
					this.$message.warning('请填写完整信息');
					return;
				}

				this.func.ajaxPost(this.api.goodstypeAdd, this.form, res => {
					if (res.data.code === 200) {
						this.$message.success('操作成功');
						this.$router.push('/admin/goodstype-list');
					}
				});
			},

			onCancel() {
				this.$router.push('/admin/goodstype-list');
			},

		},

		created() {
			let goods_type = this.$route.query.goods_type;

			if (goods_type) {
				this.isNew = 0;

				this.func.ajaxPost(this.api.goodsDetail, {
					goods_type
				}, res => {
					this.form = res.data.resultList;
					this.form.goods_type = res.data.resultList.goods_type;
				});
			}
		},

	}

</script>
