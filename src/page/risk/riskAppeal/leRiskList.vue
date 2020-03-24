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
      <el-drawer :visible.sync="drawer" :with-header="false">
        <div class="p_head">{{ fromConfigData.title }}</div>
        <Form
          :form-base-data="fromConfigData.formData"
          :show-foot-btn="fromConfigData.showFootBtn"
          label-width="130px"
          @cancel="cancel"
        ></Form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
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
      drawer: false
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    cancel(done) {
      done();
    },
    handleDetail() {
      this.$router.push({
        path: "/risk/riskAppeal/leRiskList/detail"
      });
    },
    handlePreApprove() {},
    handlePass(data) {
      this.$confirm("确认通过吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功通过!"
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
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData() {
      this.testData = [
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showPreApprove: true
        },
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showDetail: true,
          showPass: true,
          showReject: true
        },
        {
          service: "紫菜网络科技有限公司",
          merchant: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          oper: "FFF",
          showDetail: true
        }
      ];
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
