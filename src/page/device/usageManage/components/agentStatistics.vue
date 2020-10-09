<template>
  <!--  服务商统计数据-->
  <div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />

    <div class="table_box">
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="200"
        :is-async="true"
        :hide-edit-area="configData.hideEditArea"
      ></BaseCrud>
    </div>
  <!--    服务商统计数据-->
  </div>
</template>
<script>
import api from "@/api/api_device";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./../../formConfig/agentStatisticsSearch";
import { AGENTSTA_CONFIG } from "./../../tableConfig/agentStatisticsConfig";

export default {
  name: "AgentStatistics",
  components: { Search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "320",
      searchConfig: SEARCH_CONFIG,
      configData: AGENTSTA_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        agentNo: "",
        cityCode: "",
        currentPage: 1,
        deviceId: '',
        pageSize: 10,
        provinceCode: "",
        regionCode: ""
      },
      api: api.deviceDataQueryByPage
    };
  },
  created() {
    this.search()
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        regionCode: $ruleForm.regionCode,
        city: $ruleForm.city,
        deviceId: $ruleForm.deviceId
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    selectionChange($val) {},
    cancel(done) {
      done();
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
