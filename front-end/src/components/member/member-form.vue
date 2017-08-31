<template>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">
        <el-form-item label="会员名称">
            <el-input v-model="form.member_name"></el-input>
        </el-form-item>

        <el-form-item label="手机号码">
            <el-input v-model="form.member_phone"></el-input>
        </el-form-item>

		 <el-form-item label="推荐码">
            <el-input v-model="form.recommendation_code"></el-input>
        </el-form-item>
		
			<el-form-item label="会员等级">
			<el-radio-group v-model="form.membership_level">
				<el-radio class="radio" :label="1">普通会员</el-radio>
				<el-radio class="radio" :label="10">金牌会员</el-radio>
				<el-radio class="radio" :label="100">VIP会员</el-radio>
			</el-radio-group>
		</el-form-item>
		
		  <el-form-item label="收货地址1">
    <el-input v-model="form.member_address1"></el-input>
  </el-form-item>
		
		
			  <el-form-item label="收货地址2">
    <el-input v-model="form.member_address2"></el-input>
  </el-form-item>
		
			  <el-form-item label="收货地址3">
    <el-input v-model="form.member_address3"></el-input>
  </el-form-item>
		
		 <el-form-item label="备注">
         		<el-input type="textarea" :rows="3"  placeholder="请输入内容" v-model="form.remarks">
				</el-input>
		
        </el-form-item>
		
		
        <el-form-item>
            <el-button type="primary" @click="onSubmit">添加会员</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
	export default {
		name: 'form',
		data() {
			return {
				form: {
					member_name: '',
					member_phone: '',
					remarks: '',
					recommendation_code: '',
					membership_level: '',
					member_address1:'',
					member_address2:'',
					member_address3:'',
				}
			}
		},
		methods: {
			onSubmit() {
				if (!this.form.member_name) {
					this.$message.warning('请填写完整信息');
					return;
				}

				console.log(this.form);
				
				this.func.ajaxPost(this.api.memberAdd, this.form, res => {

					if (res.data.code === 200) {
						this.$message.success('操作成功');
						this.$router.push('/admin/member-list');
					}
				});
			},

			onCancel() {
				this.$router.push('/admin/member-list');
			},

		},


		created() {
			let member_id = this.$route.query.member_id;

			if (member_id) {
				this.isNew = 0;

				this.func.ajaxPost(this.api.memberDetail, {
					member_id
				}, res => {
					this.form = res.data.resultList;
					this.form.member_id = res.data.resultList.member_id;
				});
			}
		},


	}

</script>
