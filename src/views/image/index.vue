<template>
  <div class="container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>{{aticleId?'修改':'发布'}}管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          @click="dialogVisible = true"
          size="small"
          style="float:right"
          type="success"
        >添加素材</el-button>
      </div>
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span
              @click="toggleFav(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="400px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      loading: false,
      total: null,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 删除
    delImage (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
      })
    },
    // 收藏
    async toggleFav (item) {
      const {
        data: { data }
      } = await this.axios.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 成功提示
      this.$message.success('操作成功')
      // 把当前图片的状态改为后台给的状态
      item.is_collected = data.collect
    },
    handleSuccess (res) {
      console.log(res)
      // 预览2s，提示上传成功
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 隐藏对话框
        this.dialogVisible = false
        this.getImages()
        // 再次打开时，清空对话框的图片
        this.imageUrl = null
      }, 2000)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    float: left;
    margin-left: 50px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
