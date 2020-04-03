<template>
  <div class>
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
        :custom-is-expand="true"
        :row-key="'id'"
        :is-expand="true"
        :hide-edit-area="configData.hideEditArea"
        :ref-name="'deviceDetailTable'"
        :hide-expend-column="true"
        @showLife="onClick_showLife"
      >
        <template v-slot="{ row }">
          <deviceDetailProcess :row="row"></deviceDetailProcess>
        </template>
      </BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_device";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";

import { SEARCH_CONFIG } from "./../../formConfig/deviceDetailSearch-usage";
import { DEVICEDETAIL_CONFIG } from "./../../tableConfig/deviceDetailConfig-usage";

import deviceDetailProcess from "./deviceDetailProcess.vue";

export default {
  name: "Theme",
  components: { Search, BaseCrud, deviceDetailProcess },
  data() {
    return {
      searchMaxHeight: "320",
      searchConfig: SEARCH_CONFIG,
      configData: DEVICEDETAIL_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      params: {
        agentName: "",
        beginDate: this.$g.utils.getToday(),
        deviceId: 4199,
        deviceIdentifier: "g拉哈侠",
        endDate: this.$g.utils.getToday(),
        merchantName: "72测豆8g2美"
      },
      api: api.queryDetail
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        operateUserNo: $ruleForm.operateUserNo,
        status: $ruleForm.status
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },

    cancel(done) {
      done();
    },
    onClick_showLife($item, $table) {
      api
        .queryProcessLife({
          deviceIdentifier: $item.deviceIdentifier
        })
        .then(res => {
          this.$set($item, "processList", res.object);
        })
        .catch(err => {
          this.$message(err);
        });
      $table.toggleRowExpansion($item);
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
