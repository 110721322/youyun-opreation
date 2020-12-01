<template>
  <div class>
    <div class="tab_head">
      <span class="title">广告权限</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table-box">
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
        @editAuth="handleEditAuth"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="clickCancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";

import { SEARCH_CONFIG } from "../formConfig/adAuthSearch";
import { FORM_CONFIG } from "../formConfig/adAuthForm";
import { TABLE_CONFIG } from "../tableConfig/adAuthConfig";

export default {
  name: "AdAuth",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      fromConfigData: {}, // 表单项数据
      searchConfig: SEARCH_CONFIG, // 搜索项数据
      configData: TABLE_CONFIG, // 列表展示数据
      searchHeight: "260", // 搜索项展开高度
      drawer: false // 控制侧边弹窗的显示与隐藏
    };
  },
  mounted() {
  },
  methods: {
    // 点击编辑按钮展示侧边编辑抽屉
    handleEditAuth() {
      this.drawer = true;
      this.fromConfigData = FORM_CONFIG.formData;
    },

    // 点击取消按钮
    clickCancel(done) {
      done();
    },

    // 点击搜索
    search() {}
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
