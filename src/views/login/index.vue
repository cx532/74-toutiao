<template>
  <div class="login-container">
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <!-- 表单每一项的容器 label="活动名称" 文字说明-->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 表单元素 -->
          <el-input style="width:200px" v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 检验手机号
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      checked: true,
      loginForm: {
        mobile: '15237920003',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
        //   // 提交登录请求
        //   this.axios
        //     .post(
        //       'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        //       this.loginForm
        //     )
        //     .then(res => {
        //       // 保存用户信息，来判断登陆状态
        //       // sessionStorage BOM对象  全局对象 作用是保存数据
        //       // 是有有效期，当你关闭浏览后就失效
        //       // sessionStorage.setItem(key,value) 存储数据 value字符串
        //       // sessionStorage.getItem(key) 获取数据
        //       // sessionStorage.removeItem(key) 删除数据
        //       // sessionStorage.clear() 清空所有的数据
        //       window.sessionStorage.setItem('toutiao', JSON.stringify(res.data.data))
        //       this.$router.push('/')
        //     })
        //     // 此处err无用可以不写
        //     .catch(() => {
        //       this.$message.error('手机号或验证码错误')
        //     })
          try {
            const res = await this.axios.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    widows: 450px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .img {
    display: block;
    width: 150px;
    margin: 10px auto;
  }
}
</style>
