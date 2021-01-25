<template>
  <div class="m-page">
    <div class="m-content">
      <div class="m-title">新增设备</div>
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
  </div>
</template>

<script>
import api from "@/api/api_deviceManage";
import { ADD_DEVICE } from "./FormConfig/AddDevice";

export default {
  name: "Device",
  data() {
    return {
      formConfigData: null,
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
    },
    handleDeviceType($ruleForm) {
      this.formConfigData.deviceData.formData[1].urlOptions.params = {
        deviceType: $ruleForm.deviceType
      }
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
        padding-left: 24px;
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
</style>
