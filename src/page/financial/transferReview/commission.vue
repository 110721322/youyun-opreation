<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
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
import { FORM_CONFIG } from "../formConfig/orderForm";
import { SEARCH_CONFIG } from "../formConfig/orderSearch";
import { TABLE_CONFIG } from "../tableConfig/orderConfig";
import api from "@/api/api_financialAudit.js";

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
      direction: "rtl",
      params: {
        status: "",
        beginTime: "",
        endTime: ""
      },
      formStatus: null,
      api: api.deviceAuditPage
    };
  },
  mounted() {},
  methods: {
    confirm($data) {
      switch (this.formStatus) {
        case "reject":api.deviceAuditReject({
          id: this.activeRow.id,
          rejectRemark: $data.rejectRemark
        }).then(res => {
          this.$message("已驳回");
          this.drawer = false;
        }).catch(err => {
          this.$message(err);
        }); break; default:break;
      }
    },
    search($ruleForm) {
      // eslint-disable-next-line no-console
      console.log($ruleForm);
      this.params = {
        beginTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        status: $ruleForm.status || ""
      };
      this.params[$ruleForm.inputSelect] = $ruleForm.inputForm;
    },
    onClick_detail() {
      this.$router.push({
        // path: "/transferReview/financialAudit/financialSettlement/detail"
      });
    },
    onClick_reject($row) {
      this.activeRow = $row;
      this.formStatus = "reject";
      this.fromConfigData = FORM_CONFIG.rejectData;
      this.drawer = true;
    },
    onClick_adopt($row) {
      this.$confirm("确定打款成功，通过吗", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      }).then(() => {
        api.deviceAuditPass({
          id: $row.id
        }).then(result => {
          this.$message({
            type: "info",
            message: "已通过"
          });
        }).catch(err => {
          console.error(err);
        });
      }).catch(() => {});
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
