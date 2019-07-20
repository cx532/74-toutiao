<template>
  <div class="setting-container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updataUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="myUpload"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventbus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    myUpload (data) {
      // 获取图片对象
      const fd = new FormData()
      fd.append('photo', data.file)
      this.axios.patch('user/photo', fd).then(res => {
        const url = res.data.data.photo
        this.$message.success('修改头像成功')
        this.userForm.photo = url
        eventBus.$emit('updateHeaderPhoto', url)
        const userInfo = JSON.parse(window.sessionStorage.getItem('toutiao'))
        userInfo.photo = url
        window.sessionStorage.setItem('toutiao', JSON.stringify(userInfo))
      })
    },
    async updataUserInfo () {
      const { data: { data } } = await this.axios.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        mobile: this.userForm.mobile
      })
      this.$message.success('修改信息成功')
      // 非父子之间传参
      // 1.传当前修改的用户名称给home组件，修改home组件的数据
      eventBus.$emit('updateHeaderName', data.name)
      // 2.更新本地存储数据的用户名
      const userInfo = JSON.parse(window.sessionStorage.getItem('toutiao'))
      userInfo.name = data.name
      window.sessionStorage.setItem('toutiao', JSON.stringify(userInfo))
    },
    async getUserInfo () {
      const {
        data: { data }
      } = await this.axios.get('user/profile')
      this.userForm = data
    }
  }
}
</script>

<style scoped lang='less'></style>
