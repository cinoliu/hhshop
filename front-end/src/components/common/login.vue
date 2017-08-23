<template>
    <div class="login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-form">
            <el-form-item label="账号" prop="user_name">
                <el-input type="text" v-model="loginForm.user_name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'login',
        
        data() {
            return {
                loginForm: {
                    user_name: '',
                    pass: '',
                },
                rules: {
                    user_name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    pass: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            };
        },
        
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.func.ajaxPost(this.api.userLogin, this.loginForm, res => {

                            if (res.data.code === 200) {
                                this.$store.commit('user', res.data.user);
                                this.$message.success('登陆成功');
                                this.$router.push('/admin');

                            }

                        });

                    }
                });
            },
            
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

        created () {
            if (this.$store.state.user) {
                this.$router.push('/admin');
            }
        },

    }
</script>