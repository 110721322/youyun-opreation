<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1 || this.$route.path.indexOf('/publicTransfer') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">佣金结算审核</span>
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
          :api-service="null"
          :params="params"
          @detail="onClick_detail"
          @reject="onClick_reject"
          @adopt="onClick_adopt"
        ></BaseCrud>
      </div>

      <el-drawer :visible.sync="drawer" :with-header="false" size="40%">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          :foot-btn-label="fromConfigData.footBtnLabel"
          @cancel="cancel"
          @confirm="confirm"
        ></Form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { FORM_CONFIG } from "../formConfig/commission";
import { SEARCH_CONFIG } from "../formConfig/commissionSearch";
import { TABLE_CONFIG } from "../tableConfig/commissionConfig";
// import api from "@/api/api_financialAudit.js";
import api_statistice from "@/api/api_statistice";

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
      params: {},
      api: api_statistice.listFinanceSettle,
      activeRow: null
    };
  },
  mounted() {},
  methods: {
    confirm($ruleForm) {
      api_statistice
        .listFinanceSettle({
          id: this.activeRow.id,
          reason: $ruleForm.reason
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
    },
    search($ruleForm) {
      this.params = {
        auditStatus: $ruleForm.auditStatus
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    onClick_detail($row) {
      this.$router.push({
        path: "/agentService/renewalRecord",
        query: { id: $row.id }
      });
    },
    onClick_reject($row) {
      this.activeRow = $row;
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
          api_statistice
            .listFinanceSettle({
              id: $row.id
            })
            .then(result => {
              this.$message({
                type: "info",
                message: "已通过"
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
