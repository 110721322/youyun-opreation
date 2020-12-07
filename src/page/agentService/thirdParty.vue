<template>
  <div>
    <div class="tab-head">
      <span class="title">第三方对接列表</span>
    </div>
    <Search
      :is-show-all="false"
      :form-base-data="searchConfig.formData"
      @search="search"
    />

    <div class="table-box">
      <div class="tabale-title-box">
        <el-button class="btn" type="primary" @click="clickAddDocker">新增对接商</el-button>
      </div>
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        @detail="onClickDetail"
        @freeze="onClickFreeze"
        @unfreeze="onClickUnfreeze"
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
      searchMaxHeight: "200", // 搜索项展开高度
      searchConfig: SEARCH_CONFIG, // 搜索参数
      configData: TABLE_CONFIG, // 列表参数
      params: {}, // 页面传参
      api: api.getOpenOperatorPageList // 获取第三方对接的列表
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      this.params = {
        beginDate: $ruleForm.date[0] ? $ruleForm.date[0] : "",
        endDate: $ruleForm.date[0] ? $ruleForm.date[1] : "",
        [$ruleForm.search]: $ruleForm.searchVal
      }
    },

    // 点击解冻代理商
    onClickUnfreeze(row) {
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
      })
    },

    // 点击冻结代理商
    onClickFreeze(row) {
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
      })
    },

    // 点击进入第三方的详情页面
    onClickDetail($row) {
      this.$router.push({
        name: "thirdPartyDetail",
        query: { id: $row.id }
      });
    },

    // 点击新增对接商跳转至第三方对接商页面
    clickAddDocker() {
      this.$router.push({
        name: "thirdPartyAdd"
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
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
  }

  .btn {
    float: right;
  }
}
</style>
