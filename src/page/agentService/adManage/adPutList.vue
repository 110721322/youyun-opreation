<template>
  <div>
    <div class="tab-head">
      <span class="title">平台广告投放列表</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table-box">
      <div class="tabale-title-box">
        <div class="title">广告投放列表</div>
        <el-button class="btn" type="primary" @click="clickAddAd">新增投放</el-button>
      </div>
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
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
        @remove="onClickRemove"
        @edit="onClickEdit"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import apiAgent from "@/api/api_agent.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/adPutListSearch";
import { TABLE_CONFIG } from "../tableConfig/adPutListTable";

export default {
  name: "AdPutList",
  components: { Search, BaseCrud },
  data() {
    return {
      searchHeight: "200", // 搜索展开项高度
      searchConfig: SEARCH_CONFIG, // 搜索展开项高度
      configData: TABLE_CONFIG, // 列表数据
      fromConfigData: {},
      params: {}, // 搜索参数
      api: apiAgent.putList // 接口调用
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      this.params = {
        advertType: $ruleForm.advertType,
        distributeType: $ruleForm.distributeType,
        operationId: $ruleForm.operationId,
        status: $ruleForm.status
      };
    },

    // 点击删除按钮删除广告投放
    onClickRemove(row) {
      this.$confirm("确认删除该广告投放吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        apiAgent.advertDistribute({
          id: row.id
        }).then(res => {
          if (res.status === 0) {
            this.$refs.table.getData();
            this.$message({ type: "success", message: "删除成功!"});
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '取消操作' })
      })
    },

    // 点击编辑按钮进入详情页面
    onClickEdit($row) {
      this.$router.push({
        name: "adPutDetail",
        query: { id: $row.id }
      });
    },

    // 点击广告投放按钮跳转至投放页面
    clickAddAd() {
      this.$router.push({ name: "adPutDetail" });
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
    font-size: 16px;
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
