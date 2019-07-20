<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">

        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">配置管理</el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'></style>
