<template>
  <div class>
    <router-view
      v-if="this.$route.path.indexOf('/detail') !== -1||this.$route.path.indexOf('/recordDetail') !== -1"
    />
    <div v-else>
      <div class="tab_head">
        <span class="title">商户微信直连审核</span>
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
          @record="handleRecord"
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

import { SEARCH_CONFIG } from "./../formConfig/wxDirectListSearch";
import { FORM_CONFIG } from "./../formConfig/wxDirectListConfig";
import { WXDIRECTLIST_CONFIG } from "./../tableConfig/wxDirectListConfig";

export default {
  name: "WXDirectList",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      fromConfigData: {},
      searchConfig: SEARCH_CONFIG,
      configData: WXDIRECTLIST_CONFIG,
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
        path: "/approval/checkMerchant/wxDirectList/detail"
      });
    },
    handlePreApprove() {
      this.$router.push({
        path: "/approval/checkMerchant/wxDirectList/detail"
      });
    },
    handleRecord() {
      this.$router.push({
        path: "/approval/checkMerchant/wxDirectList/recordDetail"
      });
    },
    handlePass(data) {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.passData;
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
          merchantName: "紫菜网络科技有限公司,ID: 13293127119831938",
          oper: "AA",
          status: "待签约",
          time: "2019/9/23 16:23:22",
          showPreApprove: true
        },
        {
          merchantName: "紫菜网络科技有限公司,ID: 13293127119831938",
          oper: "AA",
          status: "签约审核中",
          time: "2019/9/23 16:23:22",
          showDetail: true,
          showPass: true,
          showReject: true
        },
        {
          merchantName: "紫菜网络科技有限公司,ID: 13293127119831938",
          oper: "AA",
          status: "签约审核中",
          time: "2019/9/23 16:23:22",
          showDetail: true
        }
      ];
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
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
