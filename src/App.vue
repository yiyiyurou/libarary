<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
 
  created () {
    var style = localStorage.getItem("style");
    if(style){
      $("#style").attr("href",style); //实现将主题保存在内存中刷新浏览器不改变
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  margin:0;
  padding: 0;
}
a{
  text-decoration: none;
}
</style>
