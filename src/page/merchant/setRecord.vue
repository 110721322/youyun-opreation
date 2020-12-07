<template>
  <div>
    <div class="tab-head">
      <span class="title">商户结算记录</span>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">结算失败</el-menu-item>
        <el-menu-item index="2">未结算</el-menu-item>
        <el-menu-item index="3">已结算</el-menu-item>
      </el-menu>
    </div>

    <transition name="fade">
      <div v-if="isChangeMode">
        <search
          :open-height="searchMaxHeight"
          :form-base-data="searchConfig.formData"
          :show-foot-btn="searchConfig.showFootBtn"
          @search="search"
        />
        <data-mode :config-data="modeConfigData" />
        <div class="table-box">
          <BaseCrud
            ref="table"
            :grid-config="configData.gridConfig"
            :grid-btn-config="configData.gridBtnConfig"
            :grid-data="testData"
            :form-config="configData.formConfig"
            :form-data="configData.formModel"
            :grid-edit-width="300"
            form-title="用户"
            :is-async="true"
            :is-select="false"
            :hide-edit-area="true"
            :params="params"
            :api-service="api"
            @selectionChange="selectionChange"
            @detail="go_detail"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from "@/api/api_merchant";
import search from "@/components/search/search.vue";
import dataMode from "@/components/dataMode/dataMode.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { ERR_CONFIG } from "./tableConfig/errRecordConfig";
import { SUCCESS_CONFIG } from "./tableConfig/successRecordConfig";
import { UNEWTTLED_CONFIG } from "./tableConfig/unsettledRecordConfig";
import { FORM_CONFIG } from "./formConfig/setRecordSearch";

export default {
  name: "SetRecord",
  components: { search, BaseCrud, dataMode },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "240",
      activeIndex: "1",
      configData: ERR_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      isChangeMode: true,
      modeConfigData: [],
      params: {},
      api: api.querySettleList
    };
  },
  created() {
    var settleStatus = this.activeIndex
    this.params = {
      beginDate: this.$g.utils.getToday(-7),
      endDate: this.$g.utils.getToday(-1),
      settleStatus: settleStatus === "1" ? "settleFail" : settleStatus === "2" ? "noSettle" : "finishSettle"
    }
    var merchantNo = ''
    var merchantName = ''
    var channelMerchantNo = ''
    var channel = ''
    this.getSettle(this.$g.utils.getToday(-6), this.$g.utils.getToday(0), merchantNo, merchantName, channelMerchantNo, channel)
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      var settleStatus = this.activeIndex
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : this.$g.utils.getToday(-7),
        endDate: $ruleForm.date ? $ruleForm.date[1] : this.$g.utils.getToday(-1),
        channel: $ruleForm.channel,
        channelMerchantNo: $ruleForm.channelMerchantNo,
        settleStatus: settleStatus === "1" ? "settleFail" : settleStatus === "2" ? "noSettle" : "finishSettle",
        [$ruleForm.search]: $ruleForm.searchVal
      };
      this.params = params;
      this.getSettle(params.beginDate, params.endDate, $ruleForm.inputForm, $ruleForm.inputForm, $ruleForm.channelMerchantNo, $ruleForm.channel)
    },
    getSettle(beginDate, endDate, merchantNo, merchantName, channelMerchantNo, channel) {
      api.getSettleByCondition({
        beginDate: beginDate,
        endDate: endDate,
        merchantNo: merchantNo || null,
        merchantName: merchantName || null,
        channelMerchantNo: channelMerchantNo || null,
        channel: channel || null,
        settleStatus: this.params.settleStatus,
        settleType: this.params.settleType,
        merchantNoList: this.params.merchantNoList || []
      }).then(res => {
        this.modeConfigData = [
          {
            title: "商家数量",
            data: res.data.merchantCount
          },
          {
            title: "交易金额",
            data: res.data.totalActualAmount
          },
          {
            title: "手续费",
            data: res.data.totalServiceFee
          },
          {
            title: "结算金额",
            data: res.data.totalSettleAmount
          }
        ]
      })
    },
    selectionChange($val) {},
    go_detail() {
      // eslint-disable-next-line no-console
      this.$router.push("/agent/list/detail");
    },
    handleSelect($item) {
      // eslint-disable-next-line no-console
      this.activeIndex = $item;
      this.params.beginDate = this.$g.utils.getToday(-7)
      this.params.endDate = this.$g.utils.getToday(-1)
      switch ($item) {
        case "1":
          this.params.settleStatus = 'settleFail'
          this.configData = ERR_CONFIG;
          break;
        case "2":
          this.params.settleStatus = 'noSettle'
          this.configData = UNEWTTLED_CONFIG;
          break;
        case "3":
          this.params.settleStatus = 'finishSettle'
          this.configData = SUCCESS_CONFIG;
          break;
      }
      this.getSettle(this.$g.utils.getToday(-7), this.$g.utils.getToday(-1), this.params.merchantNo, this.params.merchantName, this.params.channelMerchantNo, this.params.channel)
      this.isChangeMode = false;
      setTimeout(() => {
        this.isChangeMode = true;
      }, 500);
      // 模拟获取数据
      // setTimeout(() => {
      //   this.$refs.table.getData();
      // }, 1000);
    }
  }
};
</script>

<style scoped>
.table-box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.d-box {
  height: 106px;
  margin: 24px 24px 24px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
}

.item-box {
  text-align: center;
  height: 58px;
  border-right: 1px solid #e8e8e8;
  margin-top: 24px;
  overflow: hidden;
  width: 50%;
  .title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 3px;
  }
  .data {
    font-size: 24px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    margin-top: 10px;
  }
  &:last-child {
    border: none;
  }
}
</style>
