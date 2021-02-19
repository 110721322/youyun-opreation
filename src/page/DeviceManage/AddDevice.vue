<template>
  <div class="m-page">
    <div class="m-content">
      <div class="m-title">
        <div class="left-title">新增设备</div>
        <el-button type="primary" @click="clickImport">批量导入</el-button>
      </div>
      <div class="m-service">
        <div class="m-service-title">设备信息</div>
        <div class="m-box">
          <yun-form
            ref="deviceInfo"
            :form-base-data="formConfigData.deviceData.formData"
            :show-foot-btn="formConfigData.showFootBtn"
            label-width="130px"
          ></yun-form>
        </div>
      </div>
    </div>
    <div class="m-btn">
      <el-button type="primary" @click="clickSubmit">提交</el-button>
    </div>
    <yun-upload-xlsx
      v-if="drawer"
      :content="xlsxContent"
      :ossApiService="ossApiService"
      :dialoger="drawer"
      @upload="onClickUpload"
      @cancel="onClickCancel"
      title="批量导入设备">
      <div slot="bottom" class="dialog-content">
        <span>点击下方按钮上传填写好的模版内容，单个文件大小限制20M以内。 如无模版，请先下载模版。</span>
        <span @click="clickDown">下载导入模版</span>
      </div>
    </yun-upload-xlsx>
  </div>
</template>

<script>
import api from "@/api/api_deviceManage";
import commonApi from '@/api/api_common'
import axios from "axios"
import { ADD_DEVICE, IMPORT_DEVICE } from "./FormConfig/AddDevice";

export default {
  name: "Device",
  data() {
    return {
      formConfigData: null,
      drawer: false,
      excleConfigData: null,
      xlsxContent: {
        title: '批量导入设备'
      },
      xlsxTempUrl: '/operation/v1/excelTemplate/download?url=excel/device_template20210129.xlsx',
      ossApiService: commonApi.queryOssExlToken
    }
  },
  created() {
    this.initImport()
  },
  mounted() {
    this.$EventBus.$on('handleDeviceType', this.handleDeviceType)
  },
  destroyed() { // 销毁EventBus事件
    this.$EventBus.$off('handleDeviceType', this.handleDeviceType)
  },
  methods: {
    initImport() {
      this.formConfigData = this.$g.utils.deepClone(ADD_DEVICE)
      this.excleConfigData = this.$g.utils.deepClone(IMPORT_DEVICE)
    },
    handleDeviceType($ruleForm) {
      this.formConfigData.deviceData.formData[1].urlOptions.params = {
        deviceType: $ruleForm.deviceType
      }
    },
    clickImport() {
      this.drawer = true
    },
    clickDown() {
      axios({
        method: "GET", // 如果是get方法，则写“GET”
        url: '/operation/v1/excelTemplate/download?url=excel/device_template20210129.xlsx',
        responseType: "blob",
        Access_token: localStorage.getItem('userToken')
      }).then(res => {
        var blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" // 这里需要根据不同的文件格式写不同的参数
        });
        var eLink = document.createElement("a");
        eLink.download = "设备模板下载"; // 这里需要自己给下载的文件命名
        eLink.style.display = "none";
        eLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eLink);
        eLink.click();
        URL.revokeObjectURL(eLink.href);
        document.body.removeChild(eLink);
      }).catch(() => {});
    },
    
    // 设备模板的导入功能
    onClickUpload($fileName, ossData) {
      api.excelTemplate({
        type: 'deviceInfoInput',
        url: `excel/${ossData.objectKeys[0]}`
      }).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
    },
    onClickCancel() {
      this.drawer = false
    },
    clickSubmit() {
      const checkDerviceForm = this.$refs['deviceInfo'].clickFootBtn();
      if (!checkDerviceForm) {
        this.$message('请完善设备信息');
        return
      }
      const deviceData = this.$refs['deviceInfo'].ruleForm
      const params = {
        ...deviceData
      }
      api.addDevice(params).then(res => {
        if (res.status === 0) {
          this.$message({
            message: '添加设备成功',
            type: 'success'
          })
        }
        this.$router.replace({
          name: 'DeviceList'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-page {
    padding: 32px;
    .m-content {
      margin-bottom: 24px;
      background: #fff;
      .m-title {
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #000;
        line-height: 54px;
        border-bottom: 1px solid #DCDFE6;
      }
      .m-service {
        padding: 24px 24px 16px;
        .m-box {
          margin-bottom: 24px;
          border-bottom: 1px solid #e5e5e5;
          .m-service-title {
            margin-bottom: 24px;
            font-size: 14px;
            font-weight: 500;
          }
        }
        .m-box.m-nobord {
          border-bottom: 0;
        }
      }
    }
    .m-btn {
      display: flex;
      justify-content: center;
      button {
        height: 40px;
        line-height: 20px;
        font-size: 14px;
        padding: 10px 20px;
        margin-left: 16px;
      }
    }
  }
  .dialog-content {
    span:nth-child(1) {
      color: #606266;
      font-size: 14px;
      line-height: 22px;
    }
    span:nth-child(2) {
      color: #1989FA;
      font-size: 14px;
      line-height: 22px;
      border-bottom: 1px solid #1989FA;
      cursor: pointer;
    }
  }
</style>
