<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="user_name">
                    <el-input v-model="ruleForm.user_name" placeholder="user_name"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
				
				     <span style="font-size:14px;line-height:24px;color:red;">{{msg}}</span>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
           
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    user_name: '',
                    password: ''
                },
                rules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
				msg:"",
            }
        },
        methods: {
			
			   submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.func.ajaxPost(this.api.userLogin, this.ruleForm, res => {

                            if (res.data.code === 200) {
                               
                                this.$message.success('登陆成功');
								this.$router.push('/readme');

                            }else{
								
								this.msg =res.data.msg;
								
							}

                        });

                    }
                });
            }
			
			
			
			
			
			
			
//			
//			
//			
//            submitForm(formName) {
//                const self = this;
//                self.$refs[formName].validate((valid) => {
//                    if (valid) {
//                        localStorage.setItem('ms_username',self.ruleForm.username);
//                        self.$router.push('/readme');
//                    } else {
//                        console.log('error submit!!');
//                        return false;
//                    }
//                });
//            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
         width: 100%;
    height: 100%;
    background-image: url(/static/img/login_bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
 
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -150px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-50px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>