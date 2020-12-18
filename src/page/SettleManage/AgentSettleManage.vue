<template>
  <div class="m-page">
    <Search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">结算记录列表</div>
        <el-button type="primary">导出</el-button>
      </div>
      <div class="basecrud-box">
        <BaseCrud
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
            :grid-data="testData"
            :params="params"
            :api-service="api"
            @details="onClickDetails"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_settleManage.js";
  import Search from "@/components/search/search.vue";
  import BaseCrud from "@/components/table/BaseCrud.vue";
  import { REJECT_CONFIG } from "./FormConfig/AgentRejectConfig"
  import { SEARCH_FORM_CONFIG } from "./FormConfig/AgentSettleSearch"
  import { AGENT_SETTLE_CONFIG } from "./TableConfig/AgentSettleConfig"
  export default {
    name: "AgentSettleManage",
    components: { Search, BaseCrud },
    data() {
      return {
        params: {},
        api: api.settleList,
        testData: [],
        drawer: false,
        searchConfig: SEARCH_FORM_CONFIG,
        fromConfigData: REJECT_CONFIG.formData,
        gridConfig: AGENT_SETTLE_CONFIG.gridConfig,
        gridBtnConfig: AGENT_SETTLE_CONFIG.gridBtnConfig
      }
    },
    created() {
      this.testData = [
        {
          id: 225555,
          createTime: '2020-12-12',
          agentNo: '2587755',
          actualAmount: '135',
          agentName: 'haha',
          updateTime: '2020-12-12',
          remark: '图片模糊',
          operationer: '知道',
          settleStatus: 0
        },
        {
          id: 2255,
          createTime: '2020-12-12',
          agentNo: '2587755',
          actualAmount: '135',
          agentName: 'haha',
          updateTime: '2020-12-12',
          remark: '图片模糊',
          operationer: '知道',
          settleStatus: 1
        }
      ]
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
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .m-data {
      width: 100%;
      height: 100px;
      background: #fff;
    }
    .m-basecrud {
      padding: 24px 24px;
      .m-basecrud-title {
        display: flex;
        justify-content: space-between;
        padding: 24px 24px;
        background: #fff;
      }
      .basecrud-box {
        padding: 0 24px 24px;
        background: #fff;
      }
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