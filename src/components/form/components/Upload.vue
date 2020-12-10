<template>
  <div class="flex-align-center">
    <!--<el-upload
      v-loading="loading"
      action="OSSS上传图片"
      :data="urlData"
      class="avatar-uploader"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="upLoad"
      :on-preview="handlePictureCardPreview"
    >
      &lt;!&ndash;<img v-if="dialogImageUrl" :src="dialogImagePath + dialogImageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>-->
    <div>
      <el-upload
        v-loading="loading"
        action="OSSS上传图片"
        list-type="picture-card"
        class="avatar-uploader"
        :data="urlData"
        :file-list="fileList"
        :show-file-list="showFileList"
        :before-upload="beforeUpload"
        :on-remove="onRemove"
        :http-request="upLoad"
        :accept="uploadAccept"
        :on-preview="handlePictureCardPreview"
      >
        <img v-if="dialogImageUrl && !showFileList" :src="dialogImage" class="avatar" />
        <i v-else class="el-icon-plus"></i>
      </el-upload>
      <i
        v-if="dialogImageUrl && !showFileList"
        class="el-icon-plus el-icon-zoom-in"
        style="float: left; position: relative; left: -20px; top: 5px; cursor: pointer;"
        @click="onClick_preview"
      ></i>
    </div>
    <div v-if="formItem.showExample" style="font-size: 14px;color: rgb(25, 137, 250);cursor: pointer;margin-left: 12px;" @click="example_preview">查看示例</div>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[dialogImage]" />
    <el-image-viewer v-if="showExampleViewer" :on-close="closeExampleViewer" :url-list="[formItem.exampleUrl]" />
  </div>
</template>
<script>
import api from "@/api/api_common";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: { ElImageViewer },
  props: {
    ruleForm: Object,
    formItem: Object,
    remoteMethod: Function
  },
  data() {
    return {
      loading: false,
      showViewer: false,
      showExampleViewer: false,
      dialogImageUrl: "",
      dialogImageList: [], // 多图上传存储ARR
      dialogImagePath: "",
      imageList: [], // 多图上传存储ARR完整url地址
      ossData: {}, // 存签名信息
      urlData: {
        type: 'fund' || 'excel'
      },
      uploadAccept: 'image/*'
    };
  },
  computed: {
    size() {
      if (this.formItem.size) {
        return this.formItem.size
      } else {
        return 5 * 1024 * 1024
      }
    },
    showFileList() {
      let showFileList = true;
      this.formItem.showFileList ? showFileList = true : showFileList = false;
      return showFileList
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
    this.initVal();
  },

  mounted() {},
  methods: {
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
      if (file.size > this.size) {
        this.$message.warning("图片大小不能超过" + this.size / 1024 / 1024 + "MB")
        return Promise.reject("图片太大")
      }
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
    /** 移除文件 **/
    onRemove(file, fileList) {
      const index = this.fileList.findIndex(ele => {
        return ele.uid === file.uid
      });
      this.dialogImageList.splice(index, 1);
      this.imageList.splice(index, 1);
    },
    onClick_preview() {
      if (this.dialogImageUrl.indexOf(this.dialogImagePath) === -1) {
        this.dialogImageUrl = this.dialogImagePath + this.dialogImageUrl
      }
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    },
    example_preview() {
      this.showExampleViewer = true;
    },
    closeExampleViewer() {
      this.showExampleViewer = false;
    }
  }
};
</script>

<style lang="scss" scoped>

  .avatar-uploader {
    max-width: 294px;
    min-height: 100px;
    float: left;
    .avatar {
      width: 100%;
      margin: 0 auto; /* 水平居中 */
      height: 100%;
      object-fit: cover;
      /* position: relative; */

      /* top: 50%; !*偏移*! */
      //transform: translateY(-50%);
    }
    /deep/ .el-upload--picture-card {
      width: 100px;
      height: 100px;
      line-height: 100px;
      overflow: hidden;
      i{
        font-size: 12px;
      }
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
    overflow: hidden;
    cursor: pointer;
    // border: 1px dashed #ccc;
    border-radius: 6px;
  }

  .avatar-uploader .el-upload i:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    width: 178px;
    height: 178px;
    font-size: 28px;
    line-height: 178px;
    color: #8c939d;
    text-align: center;
  }

  .upload {
    /* width: 178px; */

    /* height: 89px; */
    .avatar-uploader-icon {
      width: 178px;
      height: 89px;
      font-size: 28px;
      line-height: 89px;
      color: #8c939d;
      text-align: center;
    }

    .el-icon-plus::before {
      position: absolute;
      bottom: 2px;
      left: 20px;
    }

    .textspan {
      position: absolute;
      top: 24px;
      left: 60px;
      color: #909399;
    }

    .avatar {
      display: block;
      height: 100%;
      margin: 0 auto;
      object-fit: cover;
    }
  }
</style>
