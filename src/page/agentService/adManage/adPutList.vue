<template>
  <div class>
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">平台广告投放列表</span>
      </div>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

      <div class="table_box">
        <div class="tabale_title_box">
          <div class="title">广告投放列表</div>
          <el-button class="btn" type="primary" @click="onClick_addAd">新增投放</el-button>
        </div>
        <BaseCrud
          ref="table"
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
          :params="params"
          :api-service="api"
          @remove="onClick_remove"
          @edit="onClick_edit"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/adPutListSearch";
import { TABLE_CONFIG } from "../tableConfig/adPutListConfig";
import api from "@/api/api_agent.js";

export default {
  name: "Theme",
  components: { Search, BaseCrud },
  data() {
    return {
      searchHeight: "200",
      searchConfig: SEARCH_CONFIG,
      configData: TABLE_CONFIG,
      fromConfigData: {},
      testData: [],
      direction: "rtl",
      params: {
        advertType: 0,
        distributeType: 0,
        operationId: 0,
        status: 0
      },
      api: api.putList
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      // eslint-disable-next-line no-console
      console.log($ruleForm);
      this.params = {
        advertType: $ruleForm.advertType || 0,
        distributeType: $ruleForm.distributeType || 0,
        operationId: $ruleForm.operationId || 0,
        status: $ruleForm.status || 0
      };
    },
    onClick_remove(row) {
      this.$confirm("确认删除该广告投放吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          api
            .advertDistribute({
              id: row.id
            })
            .then(res => {
              this.$refs.table.getData();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    onClick_edit($row) {
      this.$router.push({
        path: "/agentService/adManage/adPutList/detail",
        query: { id: $row.advertId }
      });
    },
    onClick_addAd() {
      this.$router.push({ path: "/agentService/adManage/adPutList/detail" });
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
    &.btn {
      margin-left: 10px;
    }
  }
}
</style>
