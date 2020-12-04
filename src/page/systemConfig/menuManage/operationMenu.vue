<template>
  <div>
    <div class="tab_head">
      <span class="title">运营后台菜单</span>
    </div>

    <div class="table-box">
      <div class="tabale-title-box">
        <el-button v-has="'待开发'" class="btn" type="primary" @click="clickAdd">添加一级菜单</el-button>
      </div>
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :api-service="api"
        :params="params"
        :children-key="configData.childrenKey"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="200"
        :is-async="false"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @addSubMenu="onClickAddSubMenu"
        @edit="onClickEdit"
      ></BaseCrud>
    </div>

    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="100px"
        @cancel="cancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>
import Form from "@/components/form/index.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import api from "@/api/api_systemConfig"

import { FORM_CONFIG } from "../formConfig/operationMenuDetail";
import { MENU_CONFIG } from "../tableConfig/operationMenuConfig";

export default {
  name: "OperationMenu",
  components: { BaseCrud, Form },
  data() {
    return {
      searchMaxHeight: "340",
      configData: MENU_CONFIG,
      fromConfigData: {},
      drawer: false,
      api: api.getSystemMenuTemplate,
      params: {
        system: 'operation'
      }
    };
  },
  mounted() {},
  methods: {
    clickAdd() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },

    onClickAddSubMenu() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },

    onClickEdit() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },

    cancel(done) {
      done();
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
  width: 100%;

  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
    margin-left: 10px;
    // line-height: 52px;
  }

  .btn {
    float: right;
  }
}
</style>
