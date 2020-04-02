<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">工单列表</span>
      </div>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <BaseCrud
          ref="table"
          :params="params"
          :api-service="api"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @detail="handleDetail"
          @distribution="handleDistribution"
          @reply="handleReply"
          @checkReply="handleCheckReply"
        ></BaseCrud>
      </div>
      <el-drawer :visible.sync="drawer" :with-header="false">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_risk";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";

import { SEARCH_CONFIG } from "../formConfig/ticketListSearch";
import { TABLE_CONFIG } from "../tableConfig/ticketListConfig";
import { FORM_CONFIG } from "../formConfig/ticketListForm";

export default {
  name: "LeRiskList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      drawer: false,
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        merchantNo: "",
        merchantName: "",
        channelMerchantNo: "",
        operateUserNo: "",
        status: "",
        currentPage: "",
        pageSize: ""
      },
      api: api.midPlatformQueryByPage
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.drawer = false;
    },
    confirm() {},
    handleDetail() {
      this.$router.push({
        path: "/agentService/ticketCenter/ticketList/detail"
      });
    },
    handleDistribution() {
      this.fromConfigData = FORM_CONFIG.distributionData;
      this.drawer = true;
    },
    handleReply() {
      this.fromConfigData = FORM_CONFIG.replyData;
      this.drawer = true;
    },
    handleCheckReply() {
      this.fromConfigData = FORM_CONFIG.checkReplyData;
      this.drawer = true;
    },
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        operateUserNo: $ruleForm.operateUserNo,
        status: $ruleForm.status
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    }
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
<style>
</style>
