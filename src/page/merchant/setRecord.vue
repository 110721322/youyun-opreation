<template>
  <div class="main_page">
    <div class="tab_head">
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
        <div class="table_box">
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
  name: "Theme",
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
      modeConfigData: [
        {
          title: "商家数量",
          data: "555个"
        },
        {
          title: "交易金额",
          data: "555个"
        },
        {
          title: "手续费",
          data: "555个"
        },
        {
          title: "结算金额",
          data: "555个"
        }
      ],
      params: {},
      api: api.queryPageMerchantSettleByCondition
    };
  },
  beforeCreate() {
    this.params = {
      beginDate: "2020-03-17",
      offset: 0,
      endDate: "2020-03-17",
      channelMerchantNo: "li7",
      channel: "vhu",
      merchantNoList: [],
      pageSize: 0,
      currentPage: 0,
      settleType: "yjh",
      merchantNo: "1i2",
      merchantName: "fa9"
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        channel: $ruleForm.channel
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
      this.$refs.table.getData();
    },
    selectionChange($val) {},
    go_detail() {
      // eslint-disable-next-line no-console
      this.$router.push("/agent/list/detail");
    },
    handleSelect($item) {
      // eslint-disable-next-line no-console
      this.activeIndex = $item;
      switch ($item) {
        case "1":
          this.configData = ERR_CONFIG;
          break;
        case "2":
          this.configData = UNEWTTLED_CONFIG;
          break;
        case "3":
          this.configData = SUCCESS_CONFIG;
          break;
      }
      this.isChangeMode = false;
      setTimeout(() => {
        this.isChangeMode = true;
      }, 500);
      // 模拟获取数据
      setTimeout(() => {
        this.$refs.table.getData();
      }, 1000);
    }
  }
};
</script>

<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
