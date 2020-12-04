<template>
  <div>
    <div class="tab_head">
      <span class="title">编辑按钮</span>
    </div>

    <div class="table-box">
      <div class="tabale-title-box">
        所属页面：工作台
        <el-button class="btn" type="primary" @click="clickAdd">添加按钮</el-button>
      </div>
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
        @add="clickAdd"
        @btns="onClickBtns"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { FORM_CONFIG } from "./formConfig/powerBtnDetail";
import { POWERBTNMANAGER_CONFIG } from "./tableConfig/powerBtnManagerConfig";

export default {
  name: "PowerBtnManager",
  components: { BaseCrud, Form },
  data() {
    return {
      configData: POWERBTNMANAGER_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {},

    cancel(done) {
      done();
    },

    clickAdd() {
      this.fromConfigData = FORM_CONFIG.buyData;
      this.drawer = true;
    },

    onClickBtns() {}
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

.tabale-title-box {
  height: 52px;
  width: 100%;

  .title {
    float: left;
    margin-left: 10px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    // line-height: 52px;
  }

  .btn {
    float: right;
  }
}
</style>
