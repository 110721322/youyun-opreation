<template>
  <div>
    <div class="tab_head">
      <span class="title">第三方对接列表</span>
    </div>
    <Search
        :is-show-all="false"
        :form-base-data="searchConfig.formData"
        @search="search"
    />

    <div class="table_box">
      <div class="tabale_title_box">
        <el-button class="btn" type="primary" @click="onClick_addDocker">新增对接商</el-button>
      </div>
      <BaseCrud
          ref="table"
          :params="params"
          :api-service="api"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="150"
          :is-async="true"
          :is-select="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          @detail="handleDetail"
          @freeze="handleFreeze"
          @unfreeze="handleUnfreeze"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_agent.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./formConfig/thirdPartySearch";
import { TABLE_CONFIG } from "./tableConfig/thirdPartyConfig";

export default {
  name: "ThirdParty",
  components: { Search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "200",
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      params: {},
      api: api.getOpenOperatorPageList
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      const params = {};
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    handleUnfreeze(row) {
      this.$confirm("是否要解冻该代理商？", "解冻代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认解冻",
        cancelButtonText: "取消"
      }).then(() => {
        api.blocking({
          id: row.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已解冻"
            });
            this.$refs.table.getData()
          }
        });
      }).catch(() => {});
    },
    handleFreeze(row) {
      this.$confirm("是否要冻结该代理商？冻结后不能添加新设备", "冻结代理商", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认冻结",
        cancelButtonText: "取消"
      }).then(() => {
        api.blocking({
          id: row.id
        }).then(res => {
          if (res.status === 0) {
            this.$message({
              type: "success",
              message: "已冻结"
            });
            this.$refs.table.getData()
          }
        });
      }).catch(() => {});
    },
    handleDetail($row) {
      this.$router.push({
        name: "thirdPartyDetail",
        query: { id: $row.id }
      });
    },
    onClick_addDocker() {
      this.$router.push({
        name: "thirdPartyDetail"
      });
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
