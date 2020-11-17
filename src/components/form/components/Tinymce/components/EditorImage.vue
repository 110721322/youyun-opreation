<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        v-loading="loading"
        action="OSS上传图片"
        list-type="picture-card"
        class="avatar-uploader"
        :file-list="fileList"
        :data="urlData"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :on-remove="onRemove"
        :http-request="upLoad"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <div style="margin-top:24px">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import api from "@/api/api_common";
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      loading: false,
      urlData: {
        type: 'common' || 'excel'
      },
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    // checkAllSuccess() {
    //   return Object.keys(this.listObj).every(
    //     item => this.listObj[item].hasSuccess
    //   )
    // },
    handleSubmit() {
      // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      // if (!this.checkAllSuccess()) {
      //   this.$message(
      //     'Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!'
      //   )
      //   return
      // }
      this.$emit('successCBK', this.fileList)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    // handleSuccess(response, file) {
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       this.listObj[objKeyArr[i]].url = response.files.file
    //       this.listObj[objKeyArr[i]].hasSuccess = true
    //       return
    //     }
    //   }
    // },
    // handleRemove(file) {
    //   const uid = file.uid
    //   const objKeyArr = Object.keys(this.listObj)
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       delete this.listObj[objKeyArr[i]]
    //       return
    //     }
    //   }
    // },
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
          // if (this.showFileList) {
          //   this.uploadMultiple();
          // } else {
          this.uploadSingle();
          // }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    },
    /** 单图上传回调 */
    uploadSingle() {
      const dialogImageUrl = this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0];
      this.fileList.push({url: this.dialogImagePath + dialogImageUrl, hasSuccess: true})
    },
    /** 多图上传回调 */
    uploadMultiple() {
      const imageUrl = this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0];
      this.fileList.push({url: this.dialogImagePath + imageUrl})
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
      this.fileList.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
