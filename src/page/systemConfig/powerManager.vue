<template>
  <div>
    <div class="tab_head">
      <span class="title">权限管理</span>
    </div>

    <div class="table-box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :children-key="configData.childrenKey"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :api-service="configData.api"
        :params="params"
        :grid-edit-width="200"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @add="onClickAdd"
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

import { FORM_CONFIG } from "./formConfig/powerDetail";
import { POWERMANAGER_CONFIG } from "./tableConfig/powerManagerConfig";

export default {
  name: "PowerManager",
  components: { BaseCrud, Form },
  data() {
    return {
      configData: POWERMANAGER_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      params: {
        system: 'operation'
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.testData = [];
    },

    cancel(done) {
      done();
    },

    onClickAdd() {
      this.fromConfigData = FORM_CONFIG.buyData;
      this.drawer = true;
    },

    onClickBtns() {
      this.$router.push({
        name: "powerBtnManager"
      });
    }
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
    color: rgba(51, 51, 53, 1);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    // line-height: 52px;
  }

  .btn {
    float: right;
  }
}
</style>
