<template>
  <div class="m-page">
    <div class="m-data"></div>
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
            :hide-edit-area="true"
            :grid-data="testData"
            :params="params"
            :api-service="api"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from "@/components/search/search.vue";
  import BaseCrud from "@/components/table/BaseCrud.vue";
  import { SEARCH_FORM_CONFIG } from "./FormConfig/SettleRecordSearch"
  import { SETTLE_RECORD_CONFIG } from "./TableConfig/SettleRecordConfig"
  export default {
    name: "SettleRecord",
    components: { Search, BaseCrud },
    data() {
      return {
        params: {},
        api: '',
        testData: [],
        searchConfig: SEARCH_FORM_CONFIG,
        gridConfig: SETTLE_RECORD_CONFIG.gridConfig,
        gridBtnConfig: SETTLE_RECORD_CONFIG.gridBtnConfig
      }
    },
    created() {
      this.testData = [
        {
          settleNo: 225555,
          createTime: '2020-12-12',
          agentName: 'haha',
          merchantName: '水果店',
          shopName: '先锋水果店',
          settleChannel: '乐刷',
          settleAmount: '100',
          name: '张三',
          bankName: '杭州银行',
          bankNo: '22545872595841548',
          settleTime: '2020-12-12',
          remark: '图片模糊',
          status: 0
        }
      ]
    },
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          settleNo: $ruleForm.settleNo ? $ruleForm.settleNo : null,
          settleMerchantName: $ruleForm.settleMerchantName ? $ruleForm.settleMerchantName : null,
          name: $ruleForm.name ? $ruleForm.name : null,
          bankName: $ruleForm.bankName ? $ruleForm.bankName : null,
          bankNo: $ruleForm.bankNo ? $ruleForm.bankNo : null,
          createTime: $ruleForm.createTime ? $ruleForm.createTime : null,
          receiveTime: $ruleForm.receiveTime ? $ruleForm.receiveTime : null,
          agent: $ruleForm.agent ? $ruleForm.agent : null,
          merchant: $ruleForm.merchant ? $ruleForm.merchant : null
        }
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
</style>