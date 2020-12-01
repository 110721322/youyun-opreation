<template>
  <div>
    <div class="tab_head">
      <span class="title">平台广告列表</span>
    </div>
    <Search
      :is-show-all="true"
      :open-height="searchHeight"
      :form-base-data="searchConfig.formData"
      @search="search"
    />
    <div class="table-box">
      <div class="tabale-title-box">
        <div class="title">广告列表</div>
        <el-button class="btn" type="primary" @click="clickAddAd">新增广告</el-button>
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
import api from "@/api/api_agent.js";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/platformAdListSearch";
import { TABLE_CONFIG } from "../tableConfig/platformAdListTable";

export default {
  name: "PlatformAdList",
  components: { Search, BaseCrud },
  data() {
    return {
      searchHeight: "200", // 搜索展开项高度
      searchConfig: SEARCH_CONFIG, // 搜索项数据
      configData: TABLE_CONFIG, // 列表数据
      fromConfigData: {},
      params: {
        advertType: null
      }, // 搜索项参数
      api: api.advertList // 查询广告列表参数
    };
  },
  methods: {
    search($ruleForm) {
      this.params = {
        advertType: $ruleForm.advertType
      };
    },

    // 点击删除广告按钮
    onClickRemove(row) {
      this.$confirm("确认删除该广告吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        api.advertDelete({
          id: row.id
        }).then(res => {
          this.$refs.table.getData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },

    // 点击编辑按钮进入详情页
    onClickEdit(row) {
      this.$router.push({
        name: "platformAdDetail",
        query: {
          id: row.id
        }
      });
    },

    // 点击添加按钮跳转至添加广告页
    clickAddAd() {
      this.$router.push({
        name: "platformAdDetail"
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
    margin-left: 10px;
    float: left;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
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
