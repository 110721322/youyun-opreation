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
import axios from 'axios';
export default {
  name: "UploadFile",
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean
  },
  data() {
    return {
      excelPath: "",
      excelUrl: "",
      dialogImageUrl: "",
      dialogImagePath: "",
      ossData: {},
      fileList: [],
      loading: false
    };
  },
  computed: {},

  cretae() {
  },

  methods: {
    handleRemove(file, fileList) {},
    beforeUpload(file) {
      return new Promise(resolve => {
        api
          .uploadPicExcel({})
          .then(result => {
            this.ossData = result.datas;

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
        accessToken: localStorage.getItem('accessToken'),
        // async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: () => {
          if (this.ossData.objectKeyPrefix === "excel") {
            this.excelPath = this.ossData.ossHost + "/";
            this.excelUrl = this.ossData.objectKeyPrefix + "/" + this.ossData.objectKeys[0];
            this.ruleForm[this.formItem.key] = this.excelUrl
            this.$emit('handel_execl', this.excelUrl)
          } else {
            this.ruleForm[this.formItem.key] = {
              dialogImagePath: this.dialogImagePath,
              dialogImageUrl: this.dialogImageUrl,
              formDatafile: formData.get("file")
            };
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    },
    download() {
      axios({
        method: "GET", // 如果是get方法，则写“GET”
        url: "/operation/v1/excelTemplate/download?url=" + (this.formItem.dateurl ? this.formItem.dateurl : 'excel/device_input.xlsx'),
        responseType: "blob",
        Access_token: localStorage.getItem('userToken')
      }).then(res => {
        var blob = new Blob([res.data], {
          type: "application/vnd.ms-excel" // 这里需要根据不同的文件格式写不同的参数
        });
        var eLink = document.createElement("a");
        eLink.download = "excel模板下载"; // 这里需要自己给下载的文件命名
        eLink.style.display = "none";
        eLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eLink);
        eLink.click();
        URL.revokeObjectURL(eLink.href);
        document.body.removeChild(eLink);
      }).catch(() => {});
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style lang='scss'>
</style>
