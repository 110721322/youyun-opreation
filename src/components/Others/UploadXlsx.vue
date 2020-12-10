<template>
  <el-dialog
      class="g-upload-xlsx-dialog"
      :visible.sync="dialoger"
      width="489px"
      @closed="cancel"
  >
    <div v-if="content.title" slot="title" class="s-title">{{ content.title }}</div>
    <div class="m-content">
      <p class="f-fz-14 f-fc-606266 m-desc">
        点击下方按钮上传填写好的模版内容，单个文件大小限制{{ fileSizeDesc }}以内。 如无模版，请先下载模版。
        <el-button type="text" class="f-text-underline" @click="download">下载导入模板</el-button>
      </p>
      <el-upload
          class="upload-demo"
          action="#"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :http-request="upLoad"
      >
        <el-button class="g-btn s-btn-height-32 s-btn-plain-theme" style="margin-bottom: 11px;" :loading="loading">上传文件</el-button>
      </el-upload>
    </div>
    <div slot="footer" class="s-footer">
      <el-button type="primary" class="g-btn s-btn-height-32" @click="cancel">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api_common from "@/api/api_common";
import { mapActions } from "vuex";
export default {
  name: "UploadXlsx",
  props: {
    dialoger: {
      type: Boolean,
      default() {
        return false
      }
    },
    fileSize: {
      type: Number,
      default() {
        return 5 * 1024 * 1024
      }
    },
    content: {
      type: Object,
      default() {
        return {};
      }
    },
    xlsxTempUrl: {
      type: String,
      default() {
        return ""
      }
    },
    apiService: Function,
    ossType: String // excel导入类型 supplierInput 供应商导入 shopInput 门店导入 purchaseOrderInput 采购单导入
  },
  data() {
    return {
      fileList: [],
      file: null,
      tableData: [],
      loading: false,
      ossData: {}
    }
  },
  computed: {
    fileSizeDesc() {
      if (this.fileSize < 1024 * 1024) {
        return this.$g.utils.AccDiv(this.fileSize, 1024) + 'K'
      } else {
        return this.$g.utils.AccDiv(this.fileSize, 1024 * 1024) + 'M'
      }
    }
  },
  methods: {
    ...mapActions(['createTask']),
    download() {
      if (!this.xlsxTempUrl) return;
      window.location.href = this.xlsxTempUrl
    },

    beforeUpload(file, fileList) {
      if (file.name.indexOf('xls') === -1) {
        this.$message({
          type: "warning",
          message: "请上传excel文件"
        })
        this.fileList = [];
        return Promise.reject(false);
      } else if (file.size > this.fileSize) {
        this.$message({
          type: "warning",
          message: `上传文件大小不能超过${this.fileSizeDesc}`
        })
        this.fileList = [];
        return Promise.reject(false);
      }
      return new Promise(resolve => {
        api_common
          .uploadPicExcel({})
          .then(result => {
            this.ossData = result.data;

            resolve(true);
          })
      });
    },
    upLoad(file) {
      this.loading = true;
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
      // eslint-disable-next-line no-undef
      jquery.ajax({
        url: this.ossData.ossHost,
        type: "POST",
        data: formData,
        timeout: 30000,
        // async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: () => {
          this.submitOss(file.file.name);
        },
        error: () => {
          this.loading = false;
        }
      });
    },
    cancel() {
      this.$emit('cancel')
    },
    submitOss($fileName) {
      const params = {
        url: this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0],
        type: this.ossType
      };
      api_common.uploadExcel(params).then(res => {
        if (this.$g.utils.isString(res.data)) {
          const task = {
            fileName: $fileName,
            taskKey: res.data,
            type: this.ossType,
            date: this.$g.utils.getTime(0)
          }
          this.createTask(task)
          this.$message({
            type: "success",
            message: "已上传，请查看审核进度",
            duration: 2500
          })
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    confirm() {
      if (!this.$g.utils.isFunction(this.apiService)) return;
      const formData = new FormData();
      formData.append('file', this.file)
      this.apiService(formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        this.$emit('confirm')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/variables.scss";
  .g-upload-xlsx-dialog {
    /deep/ .el-dialog {
      border-radius: 5px;
      overflow: hidden;
      top: 100px;
      /deep/ .el-dialog__body {
        padding: 16px 32px;
      }
      /deep/ .el-dialog__header,.el-dialog__footer{
        padding: 16px 26px;
        background-color: #FAFAFA;
        border-bottom: 1px solid rgba(235,238,245,1);;
      }
      /deep/ .el-dialog__footer {
        padding: 16px 24px;
        background-color: #FAFAFA;
        border-top: 1px solid rgba(235,238,245,1);;
      }
    }
    .s-title {
      color: #606266;
      font-size: 16px;
    }
    .s-footer {
      display: flex;
      justify-content: flex-end;
    }
    .m-content {
      .m-desc {
        line-height: 22px;
        margin-bottom: 16px;
      }
    }
  }
</style>
