<template>
  <div>
    <div class="search-box">
      <div class="tab-box">
        <el-tabs v-model="activeName" class="tab-out"  @tab-click="clickTabs">
          <el-tab-pane style="font-size:16px;" label="订单流水" name="0">
            <yun-search v-if="activeName==='0'" ref="searchForm" :form-base-data="searchConfig.formData" @search="onClickSearch"></yun-search>
            <div class="table-box" v-if="activeName==='0'">
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
          </el-tab-pane>
          <el-tab-pane style="font-size:16px;" label="退单流水" name="1">
            <yun-search v-if="activeName==='1'" ref="refundSearchForm" :form-base-data="refundSearchConfig.formData" @search="onClickSearch"></yun-search>
            <div class="table-box" v-if="activeName==='1'">
              <div class="tab-title">
                <span>退单流水列表</span>
                <el-button type="primary" size="small">导出</el-button>
              </div>
              <yun-table
                ref="refundTable"
                :grid-config="refundTableConfig.gridConfig"
                :grid-btn-config="refundTableConfig.gridBtnConfig"
                :form-config="refundTableConfig.formConfig"
                :form-data="refundTableConfig.formModel"
                :grid-edit-width="250"
                :is-async="true"
                :is-data-select="false"
                :is-table-expand="false"
                :row-key="'id'"
                :params="refundParams"
                grid-operation-name="交易流水列表"
                :default-expand-all="false"
                :hide-edit-area="refundTableConfig.hideEditArea"
                :api-service="refundApi"
                @detail="onClickDetail"
              ></yun-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { SEARCH_CONFIG, REFUND_SEARCH_CONFIG } from "../formConfig/flowFormConfig";
import { TABLE_CONFIG, REFUND_TABLE_CONFIG } from "../tableConfig/flowTableConfig";
import api from "@/api/api_order";
export default {
  name: "TransactionFlow",
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      refundSearchConfig: REFUND_SEARCH_CONFIG,
      tableConfig: TABLE_CONFIG,
      refundTableConfig: REFUND_TABLE_CONFIG,
      api: api.orderSelectByPage,
      refundApi: api.selectPageRefundOrder,
      params: {},
      refundParams: {},
      activeName: '0',
      testData: []
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.$EventBus.$on('handleAgentChange', this.handleAgentChange)
  },
  destroyed() { // 销毁EventBus事件
    this.$EventBus.$off('handleAgentChange', this.handleAgentChange)
  },
  methods: {
    handleAgentChange($val) {
      this.searchConfig.formData[6].urlOptions.params["agentNo"] = $val.agentNo;
    },
    onClickSearch($ruleForm) {
      if (this.activeName === '0') {
        this.params = {
          orderNo: $ruleForm.orderNo,
          shopNo: $ruleForm.shopNo,
          queryBeginPayTime: $ruleForm.date?$ruleForm.date[0]:'',
          queryEndPayTime: $ruleForm.date?$ruleForm.date[1]:'',
          tradeType: $ruleForm.tradeType,
          payWay: $ruleForm.payWay,
          agentNo: $ruleForm.agentNo,
          merchantNo: $ruleForm.merchantNo,
          orderStatus: $ruleForm.orderStatus,
          deviceType: $ruleForm.deviceType
        }  
      } else {
        this.params = {
          refundOrderNo: $ruleForm.refundOrderNo,
          shopNo: $ruleForm.shopNo,
          queryBeginPayTime: $ruleForm.date?$ruleForm.date[0]:'',
          queryEndPayTime: $ruleForm.date?$ruleForm.date[1]:'',
          refundChannel: $ruleForm.refundChannel,
          refundStatus: $ruleForm.refundStatus,
          agentNo: $ruleForm.agentNo,
          merchantNo: $ruleForm.merchantNo
        }
      }
    },
    onClickDetail(row) {
      this.$router.push('/orderManage/transactionFlow/flowDetail?merchantNo=' + row.merchantNo + '&shopNo=' + row.shopNo + '&orderNo=' + row.orderNo).catch(() => {})
    },
    clickTabs(tab) {
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
.tab-box {
  margin: 24px 24px 0;
  padding: 24px 24px 0;
  background: white;
}
.g-search-container {
  margin-top: 0;
}
.tab-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.tab-title span {
  font-size: 16px;
  font-weight: 500;
}
</style>
