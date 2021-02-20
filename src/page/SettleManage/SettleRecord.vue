<template>
  <div class="m-page">
    <div class="settle-data">
      <!--数据统计开始-->
      <el-row>
        <el-col :span="item.span" v-for="(item, index) in infoList" :key="index">
          <yun-card-first
            :style="item.style"
            :label="item.label"
            :icon="item.icon"
            :icon-style="item.iconStyle"
            :tooltip="item.tooltip"
            :value="item.value"
            :children="item.children"
          >
          </yun-card-first>
        </el-col>
      </el-row>
    </div>
    <yun-search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">结算记录列表</div>
        <el-button type="primary">导出</el-button>
      </div>
      <div class="basecrud-box">
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
            :hide-edit-area="true"
            :grid-data="testData"
            :params="params"
            :api-service="api"
        ></yun-table>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_settleManage.js";
  import { SEARCH_FORM_CONFIG } from "./FormConfig/SettleRecordSearch"
  import { SETTLE_RECORD_CONFIG, INFO_LIST } from "./TableConfig/SettleRecordConfig"
  export default {
    name: "SettleRecord",
    data() {
      return {
        params: {},
        api: api.queryShopSettle,
        testData: [],
        searchConfig: SEARCH_FORM_CONFIG,
        gridConfig: SETTLE_RECORD_CONFIG.gridConfig,
        gridBtnConfig: SETTLE_RECORD_CONFIG.gridBtnConfig,
        infoList: []
      }
    },
    created() {
      this.infoList = this.$g.utils.deepClone(INFO_LIST)
      this.getCunt(this.params)
    },
    mounted() {
      this.$EventBus.$on('handleAgentChange', this.handleAgentChange)
    },
    destroyed() { // 销毁EventBus事件
      this.$EventBus.$off('handleAgentChange', this.handleAgentChange)
    },
    methods: {
      handleAgentChange($val) {
        this.searchConfig.formData[7].urlOptions.params["agentNo"] = $val.agentNo;
      },
      onClickSearch($ruleForm) {
        // TODO review: 无意义的判断语句请简化
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
        this.getCunt(this.params)
      },
      getCunt(params) {
        api.shopSettleTotalData(params).then(res => {
          if (res.status === 0) {
            this.infoList.forEach((item,index) => {
              if (item.key === 'totalSettleAmount') {
                item.value = (Number(res.data['unSettleAmount']||0) + Number(res.data['settledAmount']||0))+''
              } else {
                item.value = String(res.data[item.key])
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .settle-data {
      margin: 24px 24px 0;
      /deep/ .m-card .m-top {
        border: 0;
      }
    }
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
