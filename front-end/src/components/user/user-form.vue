<template>
 <div class="admin-list">
	 <div style="margin-top:30px">	
	</div>
    <el-form ref="form" :model="form" label-width="80px" class="form-contain">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="form.pass"></el-input>
        </el-form-item>

        <el-form-item label="用户权限">
            <el-radio-group v-model="form.role">
                <el-radio :label="1">普通用户</el-radio>
                <el-radio :label="10">管理员</el-radio>
                <el-radio :label="100">超级管理员</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">添加用户</el-button>
            <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
	</div>
</template>

<script>

    export default {
        name: 'form',
        data() {
            return {
                form: {
                    name: '',
                    pass: '',
                    role: '',
                }
            }
        },
        methods: {
            onSubmit () {
                if (!this.form.name) {
                    this.$message.warning('请填写完整信息');
                    return;
                }

                this.func.ajaxPost(this.api.userAdd, this.form, res => {
                    if (res.data.code === 200) {
                        this.$message.success('操作成功');
                        this.$router.push('/admin/user-list');
                    }
                });
            },

            onCancel () {
                this.$router.push('/admin/user-list');
            },

        },

    }
</script>