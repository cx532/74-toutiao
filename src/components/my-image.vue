<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value||dafaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div style="margin-bottom:10px">
            <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
              <el-radio-button label="false">全部</el-radio-button>
              <el-radio-button label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
            class="img-item"
            v-for="item in images"
            :key="item.id"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selectedImage(item.url)"
          >
            <img :src="item.url" alt />
          </div>
          <el-pagination
            v-if="total>reqParams.per_page"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="pager"
            background
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dafaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      uploadImageUrl: null,
      images: [],
      total: 0,
      selectedImageUrl: null,
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
      },
      dafaultImage
    }
  },
  props: ['value'],
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      // 把上次选择的图片清除选择
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.image-container{
  display: inline-block;
  margin-right: 20px;
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    // 属性的作用：图片填充的规则，等比例缩放 完整显示在容器内
    object-fit: contain;
  }
}
</style>
