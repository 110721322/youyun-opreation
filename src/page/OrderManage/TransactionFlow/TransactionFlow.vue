<template>
  <div>
    <div class="search-box">
      <yun-search :form-base-data="searchConfig.formData" @search="onClickSearch"></yun-search>
    </div>
    <div class="table-box">
      <div class="tab-title">
        <span>交易流水列表</span>
        <el-button type="primary" size="small">导出</el-button>
      </div>
      <yun-table
        ref="table"
        :grid-config="tableConfig.gridConfig"
        :grid-btn-config="tableConfig.gridBtnConfig"
        :form-config="tableConfig.formConfig"
        :form-data="tableConfig.formModel"
        :grid-edit-width="250"
        :is-async="true"
        :is-data-select="false"
        :is-table-expand="false"
        :row-key="'id'"
        :params="params"
        grid-operation-name="交易流水列表"
        :default-expand-all="false"
        :hide-edit-area="tableConfig.hideEditArea"
        :api-service="api"
        @detail="onClickDetail"
      ></yun-table>
    </div>
  </div>
</template>

<script>
import { SEARCH_CONFIG } from "../formConfig/flowFormConfig";
import { TABLE_CONFIG } from "../tableConfig/flowTableConfig";
import api from "@/api/api_order";
export default {
  name: "TransactionFlow",
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      tableConfig: TABLE_CONFIG,
      api: api.orderSelectByPage,
      testData: [],
      params: {}
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onClickSearch($ruleForm) {
      this.params = {
        orderNo: $ruleForm.orderNo,
        shopNo: $ruleForm.shopNo,
        queryBeginPayTime: $ruleForm.date[0],
        queryEndPayTime: $ruleForm.date[1],
        tradeType: $ruleForm.tradeType,
        payWay: $ruleForm.payWay,
        agentNo: $ruleForm.agentNo,
        merchantNo: $ruleForm.merchantNo,
        orderStatus: $ruleForm.orderStatus,
        deviceType: $ruleForm.deviceType
      }
    },
    onClickDetail(row) {
      this.$router.push('/orderManage/transactionFlow/flowDetail?merchantNo=' + row.merchantNo + '&shopNo=' + row.shopNo + '&orderNo=' + row.orderNo).catch(() => {})
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
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
</style>
