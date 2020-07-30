<template>
  <div>
    <el-upload
      v-loading="loading"
      action="OSS上传路径，必填"
      class="upload-demo"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :http-request="upLoad"
      multiple
      :limit="1"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">
        导入文件
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <div slot="tip" class="el-upload__tip">只能导入excel文件，点击
        <el-button type="text" @click="download">下载模版</el-button>
      </div>
    </el-upload>
  </div>
</template>
<script type="text/ecmascript-6">
import api from "@/api/api_common";
import * as g from '@/libs/global';

export default {
  name: "UploadFile",
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogImagePath: "",
      ossData: {},
      fileList: [],
      loading: false
    };
  },
  computed: {},

  cretae() {},

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeUpload(file) {
      return new Promise(resolve => {
        api
          .uploadPicExcel({})
          .then(result => {
            this.ossData = result.object;

            resolve(true);
          })
          .catch();
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
          this.dialogImageUrl =
          this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0];
          this.ruleForm[this.formItem.key] = {
            dialogImagePath: this.dialogImagePath,
            dialogImageUrl: this.dialogImageUrl
          };
          console.log(11111, this.ruleForm[this.formItem.key])
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    },
    download() {
      window.location.href = g.config.server + "operation/v1/excelTemplate/download?url=excel/device_input.xlsx";
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang='scss'>
</style>
