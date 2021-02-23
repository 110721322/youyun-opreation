<template>
  <div>
    <div class="content">
      <div class="tab-box">
        <el-tabs v-model="activeName" class="tab-out">
          <el-tab-pane style="font-size:16px;" label="设备详情" name="0"></el-tab-pane>
          <el-tab-pane style="font-size:16px;" label="操作记录" name="1"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName==='0'" class="info-box">
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="deviceInfo"
            module-title="设备信息"
            theme="border"
          >
          </yun-detail-mode>
        </div>
      </div>
      <div v-show="activeName==='1'">
        <div class="table-box">
          <div class="tab-title">
            <span>操作记录列表</span>
          </div>
          <!--TODO review: 请勿书写无用属性或与默认值相同的属性-->
          <yun-table
            ref="table"
            :grid-config="tableConfig.gridConfig"
            :grid-btn-config="tableConfig.gridBtnConfig"
            :grid-edit-width="250"
            :is-async="true"
            :params="params"
            grid-operation-name="流水记录列表"
            :default-expand-all="false"
            :hide-edit-area="tableConfig.hideEditArea"
            :api-service="api"
          ></yun-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_deviceManage";
  import { DEVICE_FORM_CONFIG } from "./FormConfig/DeviceDetailConfig";
  import { RECORD_CONFIG } from "./TableConfig/RecordConfig";
  export default {
    data() {
      return {
        deviceInfo: DEVICE_FORM_CONFIG.deviceInfoData,
        tableConfig: RECORD_CONFIG,
        activeName: '0',
        ruleForm: {},
        api: api.queryOperlog,
        dialogVisible: false,
        params: {}
      }
    },
    created() {
      this.getDevice()
      this.params = {
        deviceNo: this.$route.query.deviceNo
      }
    },
    mounted() {
    },
    methods: {
      getDevice() {
        const params = {
          deviceNo: this.$route.query.deviceNo
        }
        api.deviceDetail(params).then(res => {
          if (res.status === 0) {
            const ruleForm = res.data
            if (ruleForm.currentStatus === 1) {
              ruleForm.currentStatusCn = '未划拨'
            } else if (ruleForm.currentStatus === 2) {
              ruleForm.currentStatusCn = '未绑定'
            } else {
              ruleForm.currentStatusCn = '已绑定'
            }
            this.ruleForm = ruleForm
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
    background: white;
    .tab-box {
      padding: 12px 24px 24px;
      width: 100%;
      /deep/ .el-tabs__header{
        margin: 0px;
      }
    }
  }
  .tab-out {
    flex-shrink: 1;
    width: 100%;
  }
  .info-box {
    margin: 0 24px;
    padding-bottom: 24px;
  }
  .pay-box, .open-box {
    margin-top: 24px;
  }
  .table-box {
    position: relative;
    margin: 24px;
    margin-top: 0;
    padding-bottom: 24px;
    overflow: hidden;
    background: #fff;
  }

  .tab-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .tab-title span {
    font-size: 16px;
    font-weight: 500;
  }
  .detail-mode-box {
    margin-bottom: 24px;
  }
</style>
