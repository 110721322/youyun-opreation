<template>
  <div class>
    <router-view
      v-if="this.$route.path.indexOf('/detail') !== -1||this.$route.path.indexOf('/recordDetail') !== -1"
    />
    <div v-else>
      <div class="tab_head">
        <span class="title">商户支付宝直连审核</span>
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
          :grid-edit-width="250"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @detail="handleDetail"
          @preApprove="handlePreApprove"
          @record="handleRecord"
          @pass="handlePass"
          @reject="handleReject"
        ></BaseCrud>
      </div>
      <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
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
import api from "@/api/api_merchantAudit";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";

import { SEARCH_CONFIG } from "./../formConfig/aliDirectListSearch";
import { FORM_CONFIG } from "./../formConfig/aliDirectListConfig";
import { ALIDIRECTLIST_CONFIG } from "./../tableConfig/aliDirectListConfig";

export default {
  name: "AliDirectList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: ALIDIRECTLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      drawer: false,
      formStatus: "",
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        agentNo: "rn4",
        agentName: "5ff",
        pageSize: 0,
        channelStatus: "u22",
        operationUserNo: "mef",
        currentPage: 0,
        merchantNo: "iy7",
        merchantName: "y6a"
      },
      api: api.queryAlipayAuditPageByCondition
    };
  },
  mounted() {},
  methods: {
    confirm($data) {
      console.log($data);
      if (this.formStatus === "reject") {
        api
          .merchantUpdateAuditStatusOfReject({
            merchantNo: "",
            reason: $data["reason"],
            channelCode: this.channelCode
          })
          .then(res => {
            this.$message("已驳回");
            this.drawer = false;
          })
          .catch(err => {
            this.$message(err);
          });
      }
      if (this.formStatus === "pass") {
        api
          .updateOthersInfo({
            merchantNo: $data["merchantNo"],
            channelCode: $data["channelCode"],
            rate: $data["rate"],
            appid: $data["appid"],
            pid: $data["pid"]
          })
          .then(res => {
            this.$message("已通过");
          })
          .catch(err => {
            this.$message(err);
          });
      }
    },
    cancel() {
      this.drawer = false;
    },
    handleDetail() {
      this.$router.push({
        path: "/approval/checkMerchant/aliDirectList/detail"
      });
    },
    handlePreApprove() {
      this.$router.push({
        path: "/approval/checkMerchant/aliDirectList/detail"
      });
    },
    handleRecord() {
      this.$router.push({
        path: "/approval/checkMerchant/aliDirectList/recordDetail"
      });
    },
    handlePass(data) {
      this.drawer = true;
      this.formStatus = "pass";
      this.fromConfigData = FORM_CONFIG.passData;
    },
    handleReject() {
      this.drawer = true;
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
    },
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        channelStatus: $ruleForm.channelStatus,
        operationUserNo: $ruleForm.operationUserNo
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
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
}
</style>
<style>
</style>
