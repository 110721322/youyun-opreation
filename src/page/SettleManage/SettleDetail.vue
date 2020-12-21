<template>
  <div class="m-page">
    <div class="basecrud-box">
      <div class="basecrud-title">结算总额：<span>{{ ruleForm.settleCommission || 0 }}</span>元</div>
      <yun-table
          ref="table"
          :grid-config="gridConfig"
          :grid-btn-config="gridBtnConfig"
          :grid-edit-width="200"
          :is-async="false"
          :is-select="false"
          :is-data-select="false"
          :is-table-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="true"
          :grid-data="testData"
          :params="null"
          :api-service="null"
      ></yun-table>
    </div>
    <div class="m-title">
      <span>结算信息</span>
    </div>
    <div class="m-detail">
      <yun-detail-mode
          :rule-form="ruleForm"
          :filed-config-list="basicData"
          theme="border"
          module-title="发票信息"
      >
      </yun-detail-mode>
      <yun-detail-mode
          :rule-form="ruleForm"
          :filed-config-list="bankInfoData"
          theme="border"
          module-title="账户信息"
      >
      </yun-detail-mode>
    </div>
    <div class="m-button">
      <div class="m-remark">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="审核备注:">
            <el-input v-model="form.remark" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-align-center flex-justify-center foot-btn">
        <div>
          <el-button type="primary" size="normal">通过</el-button>
          <el-button size="normal">驳回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_settleManage.js";
  import BaseCrud from "@/components/table/BaseCrud.vue";
  import DetailMode from "@/components/detailMode/detailMode4.vue";
  import { SETTLE_DETAIL_CONFIG } from "./TableConfig/SettleDetailConfig";
  import { SETTLE_CONFIG } from "./FormConfig/SettleDetailConfig";
  export default {
    name: "SettleDetail",
    components: { BaseCrud, DetailMode },
    data() {
      return {
        gridConfig: SETTLE_DETAIL_CONFIG.gridConfig,
        gridBtnConfig: false,
        testData: [],
        id: this.$route.query.id,
        basicData: SETTLE_CONFIG.basicData,
        bankInfoData: SETTLE_CONFIG.bankInfoData,
        ruleForm: {},
        form: {
          remark: ''
        }
      }
    },
    created() {
      this.getSettleDetail()
    },
    methods: {
      getSettleDetail() {
        api.queryDetail({
          id: this.id
        }).then(res => {
          if (res.status === 0) {
            this.testData = res.data.agentTradeTypeMonthList
            this.ruleForm = res.data
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .basecrud-box {
      margin: 24px;
      padding: 24px;
      background: #fff;
      .basecrud-title {
        margin-bottom: 24px;
        font-size: 16px;
        font-weight: 500;
        span {
          color: #1989FA;
        }
      }
    }
    .m-title {
      display: flex;
      justify-content: space-between;
      margin: 24px 24px 0 24px;
      padding: 0 24px;
      background: #fff;
      line-height: 54px;
      border-bottom: 1px solid #DCDFE6;
      span {
        font-size: 16px;
        color: #000;
      }
      .right {
        color: #1989FA;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .m-detail {
      margin: 0 24px;
      padding: 24px 24px;
      background: #fff;
    }
    .m-button {
      margin: 0 24px;
      padding: 24px 35%;
      background: #fff;
      .m-remark {
        margin-bottom: 24px;
      }
    }
  }
  /deep/ .m-detail-mode.s-detail-border {
    margin-bottom: 24px;
  }
</style>