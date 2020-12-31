<template>
  <div class="m-page">
    <yun-search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-table">
      <div class="m-table-head">
        <div class="m-table-left-title">结算记录列表</div>
        <div class="m-table-right-btn">
          <el-button type="primary">导出</el-button>
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
            @details="onClickDetails"
        ></yun-table>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_settleManage.js";
  import { REJECT_CONFIG } from "./FormConfig/AgentRejectConfig"
  import { SEARCH_FORM_CONFIG } from "./FormConfig/AgentSettleSearch"
  import { AGENT_SETTLE_CONFIG } from "./TableConfig/AgentSettleConfig"
  export default {
    name: "AgentSettleManage",
    data() {
      return {
        params: {},
        api: api.settleList,
        drawer: false,
        searchConfig: SEARCH_FORM_CONFIG,
        fromConfigData: REJECT_CONFIG.formData,
        gridConfig: AGENT_SETTLE_CONFIG.gridConfig,
        gridBtnConfig: AGENT_SETTLE_CONFIG.gridBtnConfig
      }
    },
    created() {
    },
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          settleNo: $ruleForm.settleNo,
          agentNo: $ruleForm.agentNo,
          settleStatus: $ruleForm.settleStatus,
          beginTime: $ruleForm.date && $ruleForm.date[1]  ? $ruleForm.date[0] : null,
          endTime: $ruleForm.date && $ruleForm.date[1]  ? $ruleForm.date[1] : null
        }
      },
      onClickDetails(row) {
        this.$router.push({
          name: 'SettleDetail',
          query: {
            id: row.id
          }
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    }
    .m-basecrud {
      padding: 24px 24px;
      background: #fff;
    }
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
  /deep/ .tab-disabled {
    color: #F5222D;
  }
  /deep/ .el-dialog__body {
    padding: 0 0 24px 0;
  }

  /deep/ .el-dialog__header {
    padding: 16px 24px;
    background: #FAFAFA;
    font-size: 16px;
    color: #606266;
    border-bottom: 1px solid #EBEEF5;
  }

  /deep/ .el-dialog__footer {
    padding-top: 20px;
    border-top: 1px solid #EBEEF5;
  }
</style>
