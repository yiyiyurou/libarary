<template>
   <div>
    <el-row class="container">
      <el-col :span="24" class="topbar-wrap">
        <div class="topbar-logo topbar-btn">
          <a href="/"><img src="../assets/logo.png"></a>
        </div>
        <div class="topbar-logos">
            <a href="/"><img src="../assets/logotxt.png"></a>
        </div>
        <div class="topbar-title">
          <span>后台管理系统</span>
        </div>
        <div class="userCenter">
          <el-button class="changeTheme" type="text" @click="changeThemeHandler">换肤</el-button>
          <img class="user-imgIn" src="@/assets/images/people.jpg">
          <el-dropdown class="dropdown">
            <span class="el-dropdown-link">
              管理员<i class="iconfont">&#xe649;</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/set/personinfo">个人信息</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/set/changepwd">修改密码</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/">退出登录</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="24" class="main">
         <el-menu
         router
      :default-active="this.$router.path"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF">
      <el-menu-item index="/dashboard">
        <i class="iconfont">&#xe681;</i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/user/userlist">
          <i class="iconfont">&#xe60a;</i>
          <span slot="title">用户列表</span>
      </el-menu-item>
      <el-submenu index="/book">
        <template slot="title" class="hoverColor">
          <i class="iconfont white">&#xe62a;</i>
          <span slot="title">图书管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/book/list">图书列表</el-menu-item>
          <el-menu-item index="/book/category">图书分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/rule/borrowRlue">
        <i class="iconfont">&#xe681;</i>
        <span slot="title">借阅规则</span>
      </el-menu-item>
      <el-submenu index="/set">
        <template slot="title">
          <i class="iconfont">&#xe62b;</i>
          <span slot="title" class="white">设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/set/personinfo">个人信息</el-menu-item>
          <el-menu-item index="/set/changepwd">修改密码</el-menu-item>
          <el-menu-item index="/set/map">map展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <!-- <dash-board></dash-board> -->
            <router-view class="mt"></router-view> 
          </transition>
        </el-col>
      </el-col>
    </el-row>

    <el-dialog
      class="changeThemDialog"
      title="更换皮肤"
      :visible.sync="dialogThemeVisible"
      width="40%"
      @open="handleThemeDialogOpen">
      <div class="themeList">
        <span>选择皮肤: </span>
        <span style="margin-left: 30px;">
          <el-radio v-for="item in themeArr" :key="item.key" v-model="radio" :label="item.key">
            {{item.name}}
          </el-radio>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogThemeVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleThemeSave">确 定</el-button>
      </span>
   </el-dialog>
   </div>
</template>
<script>
import DashBoard from '@/components/DashBoard'
import { changeTheme } from '@/utils/global.js'
export default {
  name: 'Home',
  data () {
    return {
      themeArr: [{
        name: '默认',
        color: '#409eff',
        key: 'chalk',
        assets: 'chalk-index.css'
      },{
        name: '黄色',
        color: 'yellow',
        key: 'yellow',
        assets: 'yellow-index.css'
      },{
        name: '靛蓝',
        color: '#3B58E9',
        key: 'blue',
        assets: 'blue-index.css'
      },{
        name: '墨绿色',
        color: '#036a67',
        key: 'green',
        assets: 'green-index.css'
      }],
      dialogThemeVisible: false,
      radio: 'blue',
      redioNormal: 'blue'
    }
  },
  components: {
    DashBoard
  },
  methods: {
    changeThemeHandler () {
      this.dialogThemeVisible = true
    },
    handleThemeSave () {
      this.dialogThemeVisible = false
      const theme = this.themeArr.filter(x => x.key === this.radio)
      changeTheme(theme[0].assets)
      this.redioNormal = this.radio
    },
    handleThemeDialogOpen () {
      this.radio = this.redioNormal
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .topbar-wrap{
      height: 55px;
      line-height: 55px;
      background: #373d41;
      padding: 0;

      .topbar-btn{
          color: #fff;
      }
      .topbar-logo{
          float: left;
          width: 59px;
          line-height: 26px;
      }
      .topbar-logos{
          float: left;
          width: 120px;
          line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img{
          height: 40px;
          margin-top: 5px;
          margin-left: 2px;
      }
      .topbar-title{
          float: left;
          text-align: left;
          width: 200px;
          padding-left: 10px;
          border-left: 1px solid #000;
          color: #fff;
          font-size: 18px;
      }
      .userCenter{
        float: right;
        padding-right: 30px;
        .user-imgIn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 20px;
          cursor: pointer;
          vertical-align:top;
          display:inline-block;
          margin-top: 10px;
        }
        .dropdown{
          color: #fff;
          vertical-align:middle;
          display:inline-block;
        }
        .changeTheme {
          margin-right: 10px;
          vertical-align:middle;
          display:inline-block;
          margin-right: 20px;
        }
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 55px;
      bottom: 0;
      overflow: hidden;
    }
    .el-menu{
      // height: 100%;
      background: #333744;
      color: white !important;
    }
    .el-submenu__title:hover{
      background-color: #7ed2df;
    }
    .el-menu-item-group{
       background: #333744;
    }
    .el-submenu, .el-menu-item {
      min-width: 60px;
       color:white;
    }
    .el-menu-item:hover, .el-submenu:hover, .el-submenu__title:hover, .el-submenu>.el-menu-item:hover{
      background-color: #7ed2df;
    }
    .el-menu-item:visited, .el-submenu:visited, .el-submenu__title:visited, .el-submenu>.el-menu-item:visited{
      background-color: #538e97;
    }
    .el-menu {
      width: 195px;
      font-size: 16px;
      text-align: left;
    }
    .el-menu.is-active {
      background-color: rgb(231, 235, 240) !important;
    }
    .el-menu-item.is-active {
      background-color: rgb(231, 235, 240) !important;
    }
    .el-submenu>.el-menu-item{
      margin-left: 20px;
    }
    .white{
      color:white;
    }
    .hoverColor:hover {
      color: #7ed2df;
    }
    .content-wrapper{
      flex:1;
      overflow-y: auto;
    }
    .mt{
      margin-top: 15px;
      margin-left: 10px;
    }
  }
</style>
<style>
   a:-webkit-any-link {
     color: #333;
   }
</style>

