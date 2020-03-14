<template>
  <div class>
    <router-view
      v-if="this.$route.path.indexOf('/detail') !== -1||this.$route.path.indexOf('/recordDetail') !== -1"
    />
    <div v-else>
      <div class="tab_head">
        <span class="title">商户间连审核</span>
      </div>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="150"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @detail="handleDetail"
          @preApprove="handlePreApprove"
          @record="handleRecord"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./../formConfig/indirectListSearch";
import { INDIRECTLIST_CONFIG } from "./../tableConfig/indirectListConfig";

export default {
  name: "IndirectList",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: INDIRECTLIST_CONFIG,
      testData: [],
      direction: "rtl",
      searchHeight: "320"
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleDetail() {
      this.$router.push({
        path: "/approval/checkMerchant/indirectList/detail"
      });
    },
    handlePreApprove() {
      this.$router.push({
        path: "/approval/checkMerchant/indirectList/detail"
      });
    },
    handleRecord() {
      this.$router.push({
        path: "/approval/checkMerchant/indirectList/recordDetail"
      });
    },
    search() {
      // eslint-disable-next-line no-console
      console.log(this.ruleForm);
    },
    getTableData() {
      this.testData = [
        {
          merchantName: "紫菜网络科技有限公司,ID: 13293127119831938",
          serviceName: "紫菜网络科技有限公司,ID: 13293127119831938",
          status: ["乐刷", "新大陆", "网商"],
          time: "2014-02-15 16:00:23",
          showDetail: true
        },
        {
          merchantName: "紫菜网络科技有限公司,ID: 13293127119831938",
          serviceName: "紫菜网络科技有限公司,ID: 13293127119831938",
          status: ["乐刷", "新大陆", "网商"],
          time: "2014-02-15 16:00:23",
          showPreApprove: true
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
