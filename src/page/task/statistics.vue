<template>
  <div>
    <div class="tab-head">
      <span class="title">任务统计详情</span>
    </div>
    <div>
      <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
      />
      <div class="table-box">
        <div class="table-title">统计列表</div>
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
          @detail="onClickDetail"
        >
        </BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_task";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { UNFINISH_CONFIG } from "./tableConfig/listConfig";
import { FORM_CONFIG } from "./formConfig/staticSearch";

export default {
  name: "Statistics",
  components: { Search, BaseCrud },
  // components: { dataMode, BaseCrud },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      modeConfigData: [],
      searchMaxHeight: "200",
      configData: UNFINISH_CONFIG,
      testData: [],
      params: {},
      api: ''
    }
  },
  created() {
    var result = this.$g.utils.getToday1();
    var startTime = result + ' ' + '00' + ':' + '00' + ':' + '00';
    var endTime = result + ' ' + '23' + ':' + '59' + ':' + '59';
    this.params = {
      startTime: startTime,
      endTime: endTime
    };
    this.api = api.statisticsList
  },
  mounted() {
  },
  methods: {
    search($ruleForm) {
      this.params = {
        startTime: $ruleForm.date ? $ruleForm.date[0] : null,
        endTime: $ruleForm.date ? $ruleForm.date[1] : null,
        recevierId: $ruleForm.recevierId
      };
    },

    onClickDetail($row) {
      this.$router.push({
        name: 'statisticsDetail',
        query: {
          receiverId: $row.receiverId
        }
      })
    }
  }
};
</script>

<style scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.table-title {
  margin-bottom: 34px;
  width: 100%;
  font-size: 16px;
}
</style>

