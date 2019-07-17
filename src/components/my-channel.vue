<template>
  <el-select :value="value" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  channelOptions: [],
  created () {
    // 获取频道数据
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      // res为响应的内容===>{data:{data:{channels:[id,name]}}}
      // 解构赋值
      const {
        data: { data }
      } = await this.axios.get('channels')
      this.channelOptions = data.channels
    },
    fn (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="less">
</style>
