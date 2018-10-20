<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" 
            label-position="left" label-width="0px" class="login-form">
            <el-form-item prop="name">
                <el-input name="name" type="text" v-model="loginForm.name" autoComplete="on" placeholder="用户名" clearable>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on" placeholder="密码" clearable>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.stop.prevent="handleLogin">
                  登 录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        const validateUsername = (rule, value, callback) => {
            if (value.trim().length < 1) {
                callback(new Error('用户名不能为空'))
            } else {
                callback();
            }
        };
        const validatePass =(rule, value, callback) => {
            if (value.trim().length < 1) {
                callback(new Error('密码不能为空'))
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                name: '',
                password: ''
            },
            loginRules: {
                name: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePass}]
            },
            loading: false,
            pwdType: 'password'
        }
    },
    methods: {
        handleLogin (loginForm) {
            console.log(this.loginForm.name)
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if(this.loginForm.name === 'zc' && this.loginForm.password === '123'){
                        console.log("yes")
                       this.$router.push({path: '/Home'});
                    }
                } else {
                    this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>
<style lang="scss">
    html,body{
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        .login-container {
            position:fixed;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            background: url(../assets/images/auth-bg.jpg) no-repeat;
            background-size: 100% 100%;
            background-attachment: fixed;
            .login-form {
                width: 300px;
                margin: 400px auto;
                height: 20%;
                top: calc(50% - 15px);
            }
        }
    }
</style>
