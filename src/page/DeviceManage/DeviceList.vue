<template>
  <div>
    <yun-search
      :form-base-data="searchConfig.formData"
      @search="onClickSearch"
    />
    <div class="m-table">
      <div class="m-table-head">
        <div class="m-table-left-title">设备列表</div>
        <div class="m-table-right-btn">
          <el-button @click="clickBind">批量划拨</el-button>
          <el-button type="primary" @click="clickExport">导出</el-button>
        </div>
      </div>
      <div class="m-basecrud">
        <yun-table
          ref="table"
          :grid-config="gridConfig"
          :grid-btn-config="gridBtnConfig"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="true"
          :is-data-select="false"
          :is-table-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="false"
          :params="params"
          :api-service="api"
          @unBind="onClickUnbind"
          @callBind="onClickCallBind"
          @details="onClickDetails"
          @selectionChange="selectionChange"
        ></yun-table>
      </div>
    </div>
    <yun-dialog
      title="设备划拨"
      :dialoger="drawer"
      width="488px"
      @confirm="clickSubmit"
      @cancel="drawer = false"
    >
      <div class="m-select-baseCrud" slot="body">
        <yun-form
          v-if="drawer"
          ref="deviceModelInfo"
          :form-base-data="fromConfigData"
          :show-foot-btn="fromConfigData.showFootBtn === false"
          label-width="130px"
        ></yun-form>
      </div>
    </yun-dialog>
  </div>
</template>

<script>
import api from '@/api/api_deviceManage'
import { DEVICE_CALL } from './FormConfig/DeviceCall'
import { SEARCH_FORM_CONFIG } from './FormConfig/DeviceListSearch'
import { DEVICE_LIST_CONFIG } from './TableConfig/DeviceListConfig'
export default {
  name: "DeviceList",
  data() {
    return {
      searchConfig: SEARCH_FORM_CONFIG,
      params: {},
      api: api.queryDeviceList,
      gridConfig: DEVICE_LIST_CONFIG.gridConfig,
      drawer: false,
      fromConfigData: DEVICE_CALL.deviceData.formData,
      gridBtnConfig: DEVICE_LIST_CONFIG.gridBtnConfig,
      deviceNos: []
    }
  },
  methods: {
    onClickSearch($ruleForm) {
      this.params = {
        deviceNo: $ruleForm.deviceNo ? $ruleForm.deviceNo : null,
        deviceType: $ruleForm.deviceType ? $ruleForm.deviceType : null,
        deviceModel: $ruleForm.deviceModel ? $ruleForm.deviceModel : null,
        deviceSn: $ruleForm.deviceSn ? $ruleForm.deviceSn : null,
        bindDate: $ruleForm.bindDate ? $ruleForm.bindDate : null,
        merchantNo: $ruleForm.merchantNo ? $ruleForm.merchantNo : null,
        shopNo: $ruleForm.shopNo ? $ruleForm.shopNo: null,
        agentNo: $ruleForm.agentNo ? $ruleForm.agentNo : null,
        currentStatus: $ruleForm.currentStatus ? $ruleForm.currentStatus : null
      }
    },
    clickBind() {
      if(this.deviceNos.length === 0) {
        this.$message({
          message: '请选择设备',
          type: 'info'
        })
        return
      }
      this.drawer = true
    },
    clickSubmit() {
      const checkDeviceForm = this.$refs['deviceModelInfo'].clickFootBtn();
      if (!checkDeviceForm) {
        this.$message('请选择服务商');
        return
      }
      const deviceData = this.$refs['deviceModelInfo'].ruleForm
      api.flowService({
        toOperator: deviceData.toOperator,
        deviceNos: this.deviceNos
      }).then(res => {
        if (res.status === 0) {
          this.$message({message: '划拨成功', type: 'success'})
          this.drawer = false
          this.$refs.table.getData()
          this.deviceNos = []
        }
      })
    },
    clickExport() {},
    
    // 解绑设备
    onClickUnbind($row) {
      this.$confirm('是否确定解绑该设备', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.unbindDevice({
          deviceNo: $row.deviceNo
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '解绑成功',
              type: 'success'
            })
            this.$refs.table.getData()
          }
        })
      }).catch(() => {
        this.$message('取消操作')
      })
    },
    
    // 回拨设备
    onClickCallBind($row) {
      this.$confirm('是否确定回拨该设备', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.recallDevice({
          deviceNo: $row.deviceNo
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              message: '回拨成功',
              type: 'success'
            })
            this.$refs.table.getData()
          }
        })
      }).catch(() => {
        this.$message('取消操作')
      })
    },
    onClickDetails($row) {
      this.$router.push({
        name: 'DeviceDetail',
        query: {
          deviceNo: $row.deviceNo
        }
      })
    },
    selectionChange($row) {
      const deviceNos = []
      $row.forEach((item) => {
        deviceNos.push(item.deviceNo)
      })
      this.deviceNos = deviceNos
    }
  }
}
</script>

<style scoped lang="scss">
  .m-table {
    padding: 24px 24px 0;
    width: 100%;
    .m-table-head {
      display: flex;
      justify-content: space-between;
      padding: 24px 24px 0;
      width: 100%;
      background: #fff;
      .m-table-left-title {
        font-size: 16px;
        font-weight: 400;
        color: #000;
      }
      .m-table-right-btn {
        display: flex;
        justify-content: space-between;
        button {
          margin: 0;
          padding: 9px 15px;
          font-size: 14px;
        }
        button:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
    .m-basecrud {
      padding: 24px 24px;
      background: #fff;
    }
  }
  .dot.disabled {
    color: #F5222D !important;
  }
  .m-select-baseCrud {
    padding: 24px;
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
  /deep/ .el-form-item__error {
    white-space: nowrap;
  }
</style>