<template>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">

        <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商品价格">
            <el-input placeholder="请输入内容" v-model="form.price" type='number'>
                <template slot="append">元</template>
</el-input>
</el-form-item>


<el-form-item label="商品库存">
	<el-input-number v-model="form.inventory" :min="0"></el-input-number>
</el-form-item>

<el-form-item label="商品上架">
	<el-switch v-model="form.onsale"></el-switch>
</el-form-item>



 <el-form-item label="商品属性">
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="推荐" name="type"></el-checkbox>
      <el-checkbox label="优选" name="type"></el-checkbox>
      <el-checkbox label="折扣" name="type"></el-checkbox>
      <el-checkbox label="热门" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>



<el-form-item>
	<el-button type="primary" @click="onSubmit">{{isNew ? '添加商品' : '修改商品'}}</el-button>
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
					id: undefined,
					name: '',
					onsale: 0,
					inventory: 0,
					price: 0,
					category: [],
					imgs: [],
					type: [],

				}
			}
		},
		methods: {
			onSubmit() {
				if (!this.form.name) {
					this.$message.warning('请填写完整信息');
					return;
				}

				this.func.ajaxPost(this.api.goodsAdd, this.form, res => {
					if (res.data.code === 200) {
						this.$message.success('操作成功');
						this.$router.push('/admin/goods-list');
					}
				});
			},

			onCancel() {
				this.$router.push('/admin/goods-list');
			},

		},

		created() {
			let id = this.$route.query.id;

			if (id) {
				this.isNew = 0;

				this.func.ajaxPost(this.api.goodsDetail, {
					id
				}, res => {
					this.form = res.data.goods;
					this.form.id = res.data.goods.id;
				});
			}
		},

	}

</script>
