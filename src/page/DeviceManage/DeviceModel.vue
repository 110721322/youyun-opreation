<template>
  <div>
    <yun-search
      :form-base-data="searchConfig.formData"
      @search="onClickSearch"
    />
    <div class="m-table">
      <div class="m-table-head">
        <div class="m-table-left-title">型号列表</div>
        <div class="m-table-right-btn">
          <el-button @click="clickModel">新增型号</el-button>
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
          :is-select="false"
          :is-data-select="false"
          :is-table-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="false"
          :params="params"
          :api-service="api"
          @edit="onClickEdit"
        ></yun-table>
      </div>
    </div>
    <yun-dialog
      :title="title"
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
  import { SEARCH_FORM_CONFIG } from './FormConfig/DeviceModelSearch'
  import { ADD_DEVICE_MODEL } from './FormConfig/AddDeviceModel'
  import { DEVICE_MODEL_CONFIG } from './TableConfig/DeviceModelConfig'
  export default {
    name: "DeviceModel",
    data() {
      return {
        searchConfig: SEARCH_FORM_CONFIG,
        params: {},
        type: '',
        title: '',
        api: api.queryDeviceModelPage,
        gridConfig: DEVICE_MODEL_CONFIG.gridConfig,
        gridBtnConfig: DEVICE_MODEL_CONFIG.gridBtnConfig,
        fromConfigData: ADD_DEVICE_MODEL.deviceData.formData,
        drawer: false
      }
    },
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          deviceType: $ruleForm.deviceType ? $ruleForm.deviceType : null,
          deviceModel: $ruleForm.deviceModel ? $ruleForm.deviceModel : null,
          createTime: $ruleForm.createTime ? $ruleForm.createTime : null
        }
      },
      clickModel() {
        this.type = 'add'
        this.title = '新增型号'
        this.drawer = true
      },
      clickExport() {},
      onClickEdit($row) {
        this.id = $row.id
        this.type = 'edit'
        this.title = '编辑型号'
        this.fromConfigData[0].initVal = $row.deviceType
        this.fromConfigData[1].initVal = $row.deviceModel
        this.drawer = true
      },
      clickSubmit() {
        const checkDerviceForm = this.$refs['deviceModelInfo'].clickFootBtn();
        if (!checkDerviceForm) {
          this.$message('请完善设备信息');
          return
        }
        const deviceData = this.$refs['deviceModelInfo'].ruleForm
        const params = {
          deviceType: deviceData.deviceType,
          deviceModel: deviceData.deviceModel,
          deviceImg: deviceData.deviceImg
        }
        switch(this.type) {
          case "add":
            api.addDeviceModel(params).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.drawer = false
                this.$refs.table.getData()
              }
            })
            break;
          case "edit":
            params.id = this.id
            api.updateDeviceModel(params).then(res => {
              if (res.status === 0) {
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.drawer = false
                this.$refs.table.getData()
              }
            })
            break;
        }
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
      /deep/ .el-image {
        width: 72px;
        height: 72px;
        /deep/ img {
          object-fit: contain;
        }
      }
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
</style>