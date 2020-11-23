<template>
  <div>
    <el-upload
      v-loading="loading"
      action="OSS上传图片"
      list-type="picture-card"
      class="avatar-uploader"
      :data="urlData"
      :file-list="fileList"
      :show-file-list="showFileList"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-remove="onRemove"
      :http-request="upLoad"
      :limit="showFileList ? maxNum : 0"
      :accept="formItem.fileAccept ? formItem.fileAccept : 'image/*'"
      :on-exceed="fileOver"
      :on-preview="handlePictureCardPreview"
    >
      <video v-if="dialogImageUrl && !showFileList&&(formItem.key==='video')" :src="dialogImage" class="avatar" />
      <img v-else-if="dialogImageUrl && !showFileList" :src="dialogImage" class="avatar" />
      <i v-else class="el-icon-plus s-icon"></i>
    </el-upload>
    <!-- <div v-if="maxNum">最多上传{{ maxNum }}张图片</div> -->
    <i
      v-if="dialogImageUrl && !showFileList"
      class="el-icon-plus el-icon-zoom-in"
      style="float: left; position: relative; left: -20px; top: 5px; cursor: pointer;"
      @click="onClick_preview"
    ></i>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[dialogImage]" />
  </div>
</template>
<script>
import api from "@/api/api_common";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: { ElImageViewer },
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {
      loading: false,
      showViewer: false,
      dialogImageUrl: "",
      dialogImageList: [], // 多图上传存储ARR
      dialogImagePath: "",
      imageList: [], // 多图上传存储ARR完整url地址
      ossData: {}, // 存签名信息
      urlData: {
        type: 'common'
      },
      maxNum: 1
    };
  },
  computed: {
    showFileList() {
      return !!this.formItem.showFileList;
    },
    fileList() {
      return this.imageList.map(item => {
        return {
          url: item
        }
      })
    },
    dialogImage() {
      return this.dialogImagePath + this.dialogImageUrl;
    }
  },
  watch: {
    /** 监听图片列表变化拼接url字符串 **/
    dialogImageList() {
      this.dialogImageUrl = this.dialogImageList.join(',');
      this.ruleForm[this.formItem.key] = this.dialogImageUrl
    }
  },
  created() {
    if (this.formItem.maxNum) {
      this.maxNum = this.formItem.maxNum
    }
    this.initVal();
  },

  mounted() {},
  methods: {
    fileOver(files, fileList) {
      if (fileList.length > this.maxNum) {
        this.$message(`最多上传${this.maxNum}张图片`)
      }
    },
    /**
     * 初始化表单项目
     */
    initVal() {
      if (this.formItem.initVal) {
        if (this.showFileList) {
          this.imageList = this.formItem.initVal.split(',');
          this.dialogImageList = this.formItem.initVal.split(',');
          this.dialogImageList = this.dialogImageList.map(item => {
            return item.split('.com/')[1] // 修改图片时去掉阿里云根路径
          })
          this.ruleForm[this.formItem.key] = this.dialogImageList.join(",");
        } else {
          const imageSplit = this.formItem.initVal.split(".com/");
          this.dialogImagePath = imageSplit[0] + ".com/";
          this.dialogImageUrl = imageSplit[1];
          this.ruleForm[this.formItem.key] = this.dialogImageUrl
        }
      } else {
        this.dialogImageUrl = "";
        this.dialogImageList = []; // 多图上传存储ARR
        this.dialogImagePath = "";
        this.imageList = []; // 多图上传存储ARR完整url地址
        this.ossData = {}; // 存签名信息
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.showViewer = true;
    },

    beforeUpload(file) {
      return new Promise(resolve => {
        if (this.type === "entry") {
          api
            .EntryUploadPic({ count: 1 })
            .then(result => {
              this.ossData = result.data;
              resolve(true);
            })
            .catch();
        } else {
          api
            .uploadPic({})
            .then(result => {
              this.ossData = result.data;
              resolve(true);
            })
            .catch();
        }
      });
    },

    upLoad(file) {
      const formData = new FormData();
      formData.append(
        "key",
        this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0]
      ); // 存储在oss的文件路径
      formData.append("OSSAccessKeyId", this.ossData.accessKeyId); // accessKeyId
      formData.append("policy", this.ossData.policy); // policy
      formData.append("signature", this.ossData.signature); // 签名
      formData.append("file", file.file);
      formData.append("success_action_status", 200); // 成功后返回的操作码
      this.loading = true;
      // eslint-disable-next-line no-undef
      jquery.ajax({
        url: this.ossData.ossHost,
        type: "POST",
        data: formData,
        // async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: () => {
          this.dialogImagePath = this.ossData.ossHost + "/";
          if (this.showFileList) {
            this.uploadMultiple();
          } else {
            this.uploadSingle();
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    },
    /** 单图上传回调 */
    uploadSingle() {
      this.dialogImageUrl = this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0];
      this.ruleForm[this.formItem.key] = this.dialogImageUrl;
      this.ruleForm['ossHost'] = this.ossData.ossHost;
    },
    /** 多图上传回调 */
    uploadMultiple() {
      const imageUrl = this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0];
      this.dialogImageList.push(imageUrl);
      this.imageList.push(this.dialogImagePath + imageUrl);
      this.ruleForm[this.formItem.key] = this.dialogImageList.join(",");
    },
    beforeRemove() {
      return this.$confirm("确认删除该广告图片吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
    },
    /** 移除文件 **/
    onRemove(file, fileList) {
      const index = this.fileList.findIndex(ele => {
        return ele.uid === file.uid
      });
      this.dialogImageList.splice(index, 1);
      this.imageList.splice(index, 1);
    },
    onClick_preview() {
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    }
  }
};
</script>

<style lang="scss" scoped>

  .avatar-uploader {
    display: flex;
    flex-wrap: wrap;
    max-width: 294px;
    min-height: 100px;
    float: left;
    .avatar {
      width: 100%;
      margin: 0 auto; /* 水平居中 */

      /* position: relative; */

      /* top: 50%; !*偏移*! */
      //transform: translateY(-50%);
    }
  }

  .el-upload img {
    max-width: 294px;
  }
  .el-upload {
    /deep/ .el-upload--picture-card {
      overflow: hidden;
    }
  }
  .el-upload i {
    position: relative;
    top: -15px;
    overflow: hidden;
    cursor: pointer;
    // border: 1px dashed #ccc;
    border-radius: 6px;
  }
  .avatar-uploader .el-upload i:hover {
    border-color: #409eff;
  }
  .avatar-uploader {
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
  }
  .avatar-uploader {
    /deep/ .el-upload-list--picture-card {
      display: flex;
      /deep/ .el-upload-list__item {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
      }
    }
  }

  .avatar-uploader-icon {
    width: 178px;
    height: 178px;
    font-size: 28px;
    line-height: 178px;
    color: #8c939d;
    text-align: center;
  }
</style>
