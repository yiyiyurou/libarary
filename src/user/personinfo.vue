<template>
    <el-row class="wrap">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>首页</b></el-breadcrumb-item>
                <el-breadcrumb-item><b>设置</b></el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        
        <el-col :span="24" class="warp-main">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign">
                <el-form-item prop="account" label="账号">
                    <el-input v-model="formLabelAlign.account" clearable  :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname"
                :rules="[
                        { required: true, message: '请输入昵称', trigger: 'blur' }]">
                    <el-input v-model="formLabelAlign.nickname" clearable></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="formLabelAlign.name" clearable></el-input>
                </el-form-item>
                <el-form-item style="padding-left:20x" label="性别：" align="left"
                :rules="[{ required: true, message: '请选择性别', trigger: 'blur' }]"
                >
                    <el-radio v-model="formLabelAlign.sex" label="01">男</el-radio>
                    <el-radio v-model="formLabelAlign.sex" label="02">女</el-radio>
                     <el-radio v-model="formLabelAlign.sex" label="03">保密</el-radio>
                </el-form-item>
                <el-form-item label="邮箱" prop="email"
                :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]">
                    <el-input v-model="formLabelAlign.email" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  @click="resetForm('formLabelAlign')">重置信息</el-button>
                    <el-button size='small' type="primary" @click="submitForm('formLabelAlign')">保存并修改</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'PersonInfo',
  data () {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          account: '',
          nickname: '',
          name: '',
          sex: '',
          email: ''
        }
      }
  },
  mounted () {
      this.formLabelAlign = {
          account: '1358277',
          nickname: '小强',
          name: '张强',
          sex: '01',
          email: '1358277341@qq.com'
        }
  },
  methods: {
      resetForm (formName) {
          this.$refs[formName].resetFields()
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('提交成功!');
            } else {
                console.log('error submit!!');
                return false;
            }
          })
      }
  }
  
}
</script>

<style lang="scss">
    .el-input__inner:focus{
        border-color: rgb(159, 212, 143);
    }
</style>

<style lang="scss" scoped>
    .warp-main{
        margin-top: 10px;
        width: 30%;
    
    }
</style>