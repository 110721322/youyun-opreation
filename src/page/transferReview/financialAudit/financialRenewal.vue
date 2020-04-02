<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">财务续费审核</span>
      </div>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <BaseCrud
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
          :header-cell-style="headerCellStyle"
          :api-service="api"
          :params="params"
          @detail="onClick_detail"
          @reject="onClick_reject"
          @adopt="onClick_adopt"
        ></BaseCrud>
      </div>

      <el-drawer :visible.sync="drawer" :with-header="false">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          :foot-btn-label="fromConfigData.footBtnLabel"
          @cancel="cancel"
        ></Form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "../formConfig/renewalForm";
import { SEARCH_CONFIG } from "../formConfig/renewalSearch";
import { TABLE_CONFIG } from "../tableConfig/renewalConfig";
import api from "@/api/api_agent.js";

export default {
  name: "Theme",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      headerCellStyle: { backgroundColor: "#FAFAFA" },
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      params: {
        agentNo: "",
        agentName: "",
        settleStatus: ""
      },
      api: api.listOperationSettle
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    search($ruleForm) {
      // eslint-disable-next-line no-console
      console.log($ruleForm);
      this.params = {
        agentNo: "",
        agentName: "",
        settleStatus: $ruleForm.status || ""
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    getTableData() {
      this.testData = [
        {
          service: "日常任务",
          amount: "商户结算失败",
          type: "4",
          status: "提醒",
          createTime: "XXXX店铺",
          operTime: "20:00:23",
          showAdopt: true,
          showReject: true
        },
        {
          service: "日常任务",
          amount: "商户结算失败",
          type: "4",
          status: "提醒",
          createTime: "XXXX店铺",
          operTime: "20:00:23",
          showReviewing: true
        }
      ];
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    onClick_detail() {
      this.$router.push({
        path: "/agentService/renewalRecord"
      });
    },
    onClick_reject() {
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },
    onClick_adopt($row) {
      this.$confirm("确定打款成功，通过吗", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .reject({
              agentNo: $row.agentNo
            })
            .then(result => {
              this.$message({
                type: "info",
                message: "已驳回"
              });
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {});
    },
    cancel() {
      this.drawer = false;
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
