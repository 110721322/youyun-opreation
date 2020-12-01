<template>
  <div>
    <div class="tab_head">
      <span class="title">广告权限</span>
    </div>
    <Search
      :open-height="searchHeight"
      :form-base-data="searchConfig.formData"
      @search="search"
    />
    <div class="table-box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="250"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        :params="params"
        :api-service="api"
        @editAuth="onClickEditAuth"
      ></BaseCrud>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" size="500px">
      <div class="p_head">{{ fromConfigData.title }}</div>
      <Form
        v-if="drawer"
        :form-base-data="fromConfigData.formData"
        :show-foot-btn="fromConfigData.showFootBtn"
        label-width="130px"
        @confirm="onClickConfirm"
        @cancel="onClickCancel"
      ></Form>
    </el-drawer>
  </div>
</template>
<script>

import apiAgent from "@/api/api_agent.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import Form from "@/components/form/index.vue";
import { SEARCH_CONFIG } from "../formConfig/adAuthSearch";
import { FORM_CONFIG } from "../formConfig/adAuthForm";
import { TABLE_CONFIG } from "../tableConfig/adAuthTable";

export default {
  name: "AdAuth",
  components: { Search, BaseCrud, Form },
  data() {
    return {
      searchConfig: SEARCH_CONFIG, // 搜索项的参数
      configData: TABLE_CONFIG, // 列表展示参数
      drawer: false, // 控制弹窗的显示与隐藏
      searchHeight: "200", // 搜索项展开的高度
      rowAgentNo: "", // 服务商编号
      fromConfigData: {},
      params: {
        agentNo: "",
        agentName: "",
        cityCode: "",
        provinceCode: "",
        operationId: null,
        privilege: null
      },
      api: apiAgent.advertPrivilege
    };
  },
  mounted() {},
  methods: {
    // 编辑前的赋值
    onClickEditAuth($row) {
      this.rowAgentNo = $row.agentNo;
      // 编辑前重赋值
      FORM_CONFIG.formData.formData.forEach((item, index) => {
        item.initVal = $row.privilege;
      });
      this.fromConfigData = FORM_CONFIG.formData;
      this.drawer = true;
    },

    // 确认
    onClickConfirm($ruleForm) {
      apiAgent.advertPrivilegeUpdate({
        agentNo: this.rowAgentNo,
        privilegeList: $ruleForm.baseData
      }).then(res => {
        if (res.data) {
          this.$refs.table.getData();
          this.drawer = false;
        }
      });
    },

    // 点击取消关闭弹窗
    onClickCancel() {
      this.drawer = false;
    },

    search($ruleForm) {
      this.params = {
        cityCode: $ruleForm.area ? $ruleForm.area[1] : '',
        provinceCode: $ruleForm.area ? $ruleForm.area[0] : '',
        operationId: $ruleForm.operationId,
        privilege: $ruleForm.privilege
      }
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
</style>
