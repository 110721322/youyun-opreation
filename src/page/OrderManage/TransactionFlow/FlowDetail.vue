<template>
  <div>
    <div class="content">
      <div class="tab-box">
        <el-tabs v-model="activeName" class="tab-out">
          <el-tab-pane style="font-size:16px;" label="订单详情" name="0"></el-tab-pane>
          <el-tab-pane style="font-size:16px;" label="流水详情" name="1"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="activeName==='0'" class="info-box">
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="orderInfoConfig"
            module-title="订单信息"
            theme="border"
          >  
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="moneyInfoConfig"
            module-title="收款信息"
            theme="border"
          >  
          </yun-detail-mode>
        </div>
        <div class="detail-mode-box">
          <yun-detail-mode
            :rule-form="ruleForm"
            :filed-config-list="payInfoConfig"
            module-title="付款信息"
            theme="border"
          >  
          </yun-detail-mode>
        </div>
      </div>
      <div v-show="activeName==='1'">
        <div class="table-box">
          <div class="tab-title">
            <span>流水记录列表</span>
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
  import { FORM_CONFIG } from "../formConfig/flowDetailConfig";
  import { TABLE_CONFIG } from "../tableConfig/flowDetailTableConfig";
  import api from "@/api/api_order";
  export default {
    data() {
      return {
        orderInfoConfig: FORM_CONFIG.orderInfoData,
        moneyInfoConfig: FORM_CONFIG.moneyInfoData,
        payInfoConfig: FORM_CONFIG.payInfoData,
        tableConfig: TABLE_CONFIG,
        activeName: '0',
        ruleForm: {},
        api: api.selectOrderWater,
        dialogVisible: false,
        params: {}
      }
    },
    created() {
      this.params = {
        merchantNo: this.$route.query.merchantNo,
        shopNo: this.$route.query.shopNo,
        orderNo: this.$route.query.orderNo
      }
      this.selectOrderDetails()
    },
    mounted() {
    },
    methods: {
      selectOrderDetails() {
        const params = {
          refundOrderNo: this.$route.query.refundOrderNo,
          merchantNo: this.$route.query.merchantNo,
          shopNo: this.$route.query.shopNo,
          orderNo: this.$route.query.orderNo
        }
        api.selectOrderDetails(params).then(res => {
          if (res.status === 0) {
            this.ruleForm = res.data
          }
        })
      },
      handleClose() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    margin: 24px;
    background: white;
    .tab-box {
      padding: 24px;
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
