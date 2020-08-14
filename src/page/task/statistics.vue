<template>
  <div class="main_page">
    <div class="tab_head">
      <span class="title">任务统计详情</span>
    </div>
    <transition name="fade">
      <div>
        <search
            :open-height="searchMaxHeight"
            :form-base-data="searchConfig.formData"
            :show-foot-btn="searchConfig.showFootBtn"
            @search="search"
        />
        <div class="table_box">
          <div class="table_title">统计列表</div>
          <BaseCrud
              ref="table"
              :params="params"
              :api-service="api"
              :grid-config="configData.gridConfig"
              :grid-btn-config="configData.gridBtnConfig"
              :grid-data="testData"
              :form-config="configData.formConfig"
              :form-data="configData.formModel"
              :grid-edit-width="300"
              :is-async="true"
              :is-select="false"
              :is-expand="false"
              :row-key="'id'"
              :default-expand-all="false"
              :hide-edit-area="configData.hideEditArea"
              @detail="handle_detail"
          >
          </BaseCrud>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import api from "@/api/api_task";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { UNFINISH_CONFIG } from "./tableConfig/unfinishConfig";
import { FORM_CONFIG } from "./formConfig/staticSearch";

export default {
  name: "Theme",
  components: { Search, BaseCrud },
  // components: { dataMode, BaseCrud },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      modeConfigData: [],
      searchMaxHeight: "200",
      configData: UNFINISH_CONFIG,
      testData: [],
      isChangeMode: true,
      params: {},
      api: ''
    }
  },
  created() {
    var result = this.$g.utils.getToday1()
    console.log(result)
    var startTime = result + ' ' + '00' + ':' + '00' + ':' + '00'
    var endTime = result + ' ' + '23' + ':' + '59' + ':' + '59'
    this.params = {
      startTime: startTime,
      endTime: endTime
    }
    this.api = api.statisticsList
  },
  mounted() {
  },
  methods: {
    search($ruleForm) {
      const params = {
        startTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        recevierId: $ruleForm.recevierId
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    handle_detail($row) {
      // this.$router.push({
      //   path: '/task/statistics/statisticsDetail',
      //   query: {
      //     recevierId: $row.recevierId
      //   }
      // })
    }
  }
};
</script>

<style scoped>
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.table_title {
  width: 100%;
  margin-bottom: 34px;
  font-size: 16px;
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
</style>

