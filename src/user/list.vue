<template>
    <el-row class="wrap">
        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
           </el-breadcrumb>
        </el-col>

        <el-col :span="24" class="warp-min" v-loading="loading"  element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" align="left">
                   <el-input v-model="formInline.user" placeholder="请输入姓名" ref="search" class='inputBox' style="width: 10%;min-width: 240px;" clearable @clear="handleClear"></el-input>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form>
            </el-col>

             <el-table
                :data="users"
                highlight-current-row
                v-loading="loading"
                align="left">
                <el-table-column    
                        prop="name"
                        label="姓名"
                        width="200"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="nickname"
                        label="昵称"
                        width="200"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        label="城市"
                        width="200"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                        width="250"
                        sortable>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地区"
                        width="220"
                        sortable>
                    </el-table-column>
                </el-table>
        </el-col>

    </el-row>
</template>
<script>
export default {
  name: 'UserList',
  data() {
      return {
        loading: false,
        formInline: {
          user: ''
        },
        users: []
      }
    },
    mounted () {
        this.showMS();
    },
    methods: {
      showMS(){
          this.users =[{
            nickname: '小虎',
            name: '王小虎',
            city: '上海',
            email: 'chunzhou@163.com',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            nickname: '沈勇',
            name: '卢丽',
            city: '上海',
            email: 'chunzhou@163.com',
            address: '华中'
          },{
            nickname: '熊静',
            name: '董娜',
            city: '庆阳市',
            email: 'chunzhou@163.com',
            address: '西北'
          },{
            nickname: '卢丽',
            name: '叶娜',
            city: '玉林市',
            email: 'chunzhou@163.com',
            address: '华北'
          }]
      },
      handleClear () {
          this.showMS()
      },
      search() {
         this.query = this.$refs.search.value;
          if (this.query === '') {
               this.$message({
                    showClose: true,
                    message: '请输入搜索条件！',
                    type: 'warning'
                });
                this.showMS();
                // return this.users = this.user
                // this.users = this.user
                // this.users = Object.assign({},this.user)
          } else {
               this.$message({
                    showClose: true,
                    message: '符合条件的人员信息如下表：',
                    type: 'success'
                });
                let result = []
                result = this.users.filter(item => {
                    return item.name === this.query
                })
                this.users = result 
            }
      },
    //   getdata() {
    //       this.axios.get('/userlist').then(res => {
    //           this.users = res.data.Data
    //       }).catch((error) => {
    //         console.info(error);
    //     })
    //   }

    }
}
</script>
<style lang="scss">
    .demo-form-inline >>> .input-item-text, input[type=text], select{
        // height: 40px !important;
         height: calc(2.2rem + 12px) !important;
    }
    .demo-form-inline{
        margin-top: 20px;
        // .inputBox {
        //     height: 40px;
        // }
    }
    // .el-input{
        
    // }
    // .input-item-text, input[type=text], select {
    //     height: calc(2.2rem + 12px);
    // }
    // .el-button {
    //     padding-top: 10px;
    // }
</style>
