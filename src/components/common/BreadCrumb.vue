<template>
  <el-breadcrumb class="breadCrumb" separator="/">
    <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.id">{{ item.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'BreadCrumb',
  props: ['breadCrumbList'],
  data() {
    return {}
  }
}

</script>
<style lang="scss" scoped>
.breadCrumb {
  height: 40px;
  background: #fbfbfb;
  padding-left: 10px;
  border-bottom: solid 1px #f2f9f9;
  .el-breadcrumb__item {
    line-height: 40px;
  }
}
</style>
