<template>
  <div class="m-page">
    <div class="basecrud-box">
      <div class="basecrud-title">结算总额：<span>{{ ruleForm.settleCommission || 0 }}</span>元</div>
      <BaseCrud
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
      ></BaseCrud>
    </div>
    <DetailMode :rule-form="ruleForm" :config-data="configData"></DetailMode>
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
  import { SETTLE_DETAIL_CONFIG } from "./TableConfig/SettleDetailConfig";
  import { SETTLE_CONFIG } from "./FormConfig/SettleDetailConfig";
  export default {
    name: "SettleDetail",
    data() {
      return {
        gridConfig: SETTLE_DETAIL_CONFIG.gridConfig,
        gridBtnConfig: false,
        testData: [],
        id: this.$route.query.id,
        configData: SETTLE_CONFIG.configData,
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
    .m-button {
      margin: 0 24px;
      padding: 24px 35%;
      background: #fff;
      .m-remark {
        margin-bottom: 24px;
      }
    }
  }
</style>
