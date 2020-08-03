<template>
  <div class>
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">乐刷风控</span>
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
import api from "@/api/api_risk";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";

import { SEARCH_CONFIG } from "../formConfig/leRiskListSearch";
import { FORM_CONFIG } from "../formConfig/leRiskListConfig";
import { LERISKLIST_CONFIG } from "../tableConfig/leRiskListConfig";

export default {
  name: "LeRiskList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: LERISKLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "260",
      drawer: false,
      params: {},
      api: api.leshuaQueryByPage
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.drawer = false;
    },
    handleDetail(row) {
      this.$router.push({
        path: "/risk/riskAppeal/leRiskList/detail",
        query: {
          id: row.id
        }
      });
    },
    handlePreApprove() {},
    confirm($data) {
      api
        .leshuaUpdateOfReject({
          id: 1,
          reason: $data["reason"]
        })
        .then(res => {
          this.$message("已驳回");
        })
        .catch(err => {
          this.$message(err);
        });
    },
    handlePass(data) {
      this.$confirm("确认通过吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .leshuaUpdateOfPass({
              id: 1
            })
            .then(res => {
              this.$message("成功通过!");
            })
            .catch(err => {
              this.$message(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleReject() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.rejectData;
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
