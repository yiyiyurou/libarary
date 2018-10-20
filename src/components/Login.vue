<template>
    <el-form v-model="user" :rules="rules" ref="login" label-position="center" label-width="60px" class="loginForm">
        <h2 class="title">管理员登录</h2>
        <el-form-item label="账户:" props="name">
            <el-input type="text" v-model="user.name" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码:" props="pwd">
            <el-input type="password" v-model="user.pwd" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('login')" style="width: 45%;">登录</el-button>
            <el-button type="primary" @click="look()" style="width: 45%;">重置</el-button>
        </el-form-item>
        <star-flow></star-flow>
    </el-form>
</template>
<script>
import StarFlow from './StarFlow'
export default {
    name: 'Login',
    components: { StarFlow },
    data () {
        return {
            user: {
                name: 'admin',
                pwd: '123456'
            },
            rules: {
                name: [
                   {required: true,message:'账户不能为空', trigger: 'blur'}
                ],
                pwd:[
                    {required: true,message:'密码不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let that=this;
                    let loginParams={name: this.user.name, pwd: user.pwd};
                    this.$axios.get('msg').then(res => {
                        this.data=res.data;
                        console.log(res)
                    })
                    // API.login(loginParams).then(function(result){
                    //     if(result && result.id){
                    //         localStorage.setItem('access-user', JSON.stringify(result));
                    //         that.$router.push({path: '/'});
                    //     } else {
                    //         this.$message.error({showClose: true, message: result.errmsg || '登录失败', duration: 2000})
                    //     }
                    // },function(err){
                    //     this.$message.error({showClose: true, message: err.toString(), duration: 2000})
                    // }).catch(function(error){
                    //     this.$message.error({showClose: true, message: '请求出错异常', duration: 2000})
                    // })
                }
            })
        },
        resetForm(formName) {
            this.$nextTick(function() {
                this.$refs[formName].resetFields();
            })
        },
        look(){
            axios.post("/user/query").then(res=>{
            console.log(res);
            }).catch(res=>{
            console.log("err")
            });
        }
    }

}
</script>
<style>
    body{
        background: #DFE9F8;
    }
</style>
<style lang="scss" scoped>
    .loginForm{
        width: 450px;
        margin: 160px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

    
        .title{
            margin: 0 auto 40px auto;
            text-align: center;
            color: #505458;
        }
    }
</style>
