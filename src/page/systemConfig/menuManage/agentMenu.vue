<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">服务商后台菜单</span>
    </div>

    <div class="table_box">
      <div class="tabale_title_box">
        <el-button v-has="'待开发'" class="btn" type="primary" @click="onClick_add">添加一级菜单</el-button>
      </div>
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :children-key="configData.childrenKey"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :api-service="api"
        :params="params"
        :grid-edit-width="200"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @addSubMenu="onClick_addSubMenu"
        @edit="onClick_edit"
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
import api from "@/api/api_systemConfig";

import { FORM_CONFIG } from "../formConfig/agentMenuDetail";
import { MENU_CONFIG } from "../tableConfig/agentMenuConfig";

export default {
  name: "Theme",
  components: { BaseCrud, Form },
  data() {
    return {
      searchMaxHeight: "340",
      configData: MENU_CONFIG,
      fromConfigData: {},
      api: api.getSystemMenuTemplate,
      testData: [],
      drawer: false,
      params: {
        system: 'agent'
      }
    };
  },
  mounted() {
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      // console.log(this.ruleForm);
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    onClick_add() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },
    onClick_addSubMenu() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },
    onClick_edit() {
      this.fromConfigData = FORM_CONFIG.deviceData;
      this.drawer = true;
    },
    cancel(done) {
      done();
    },
    onClick_buy() {
      this.fromConfigData = FORM_CONFIG.buyData;
      this.drawer = true;
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

.tabale_title_box {
  height: 52px;
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
