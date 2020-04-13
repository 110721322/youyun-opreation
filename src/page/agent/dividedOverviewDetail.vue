<template>
  <div class="main_page">
    <div class="p_head">商户分润明细</div>
    <search
      :is-show-all="true"
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table_box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="50"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :hide-edit-area="true"
        :params="params"
        :api-service="api"
      />
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/dividedOverviewDetailConfig";
import { FORM_CONFIG } from "./formConfig/dividedOverviewDetailSearch";
import api from "@/api/api_agent.js"

export default {
  name: "Theme",
  components: { search, BaseCrud },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "120",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      params: {
        "merchantName": "7小02猪",
        "merchantNo": "小王5冬3小冬a",
        "tradeMonth": "2020-03-17"
      },
      api: api.merchantCommission
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.testData = [
        {
          merchantName: "岳阳楼区戴斯酒店",
          id: "岳阳楼区戴斯酒店",
          totalCommission: "10000.00",
          officeReward: "998.00",
          platformReward: "998.00",
          aliDivided: "1000.00",
          wxDivided: "1000.00",
          yunDivided: "1000.00",
          yinDivided: "1000.00"
        },
        {
          merchantName: "岳阳楼区戴斯酒店",
          id: "岳阳楼区戴斯酒店",
          totalCommission: "10000.00",
          officeReward: "998.00",
          platformReward: "998.00",
          aliDivided: "1000.00",
          wxDivided: "1000.00",
          yunDivided: "1000.00",
          yinDivided: "1000.00"
        },
        {
          merchantName: "岳阳楼区戴斯酒店",
          id: "岳阳楼区戴斯酒店",
          totalCommission: "10000.00",
          officeReward: "998.00",
          platformReward: "998.00",
          aliDivided: "1000.00",
          wxDivided: "1000.00",
          yunDivided: "1000.00",
          yinDivided: "1000.00"
        }
      ];
    },
    search($form) {
      this.params = {
        "agentName": "008小老猪",
        "agentNo": "王哈小5f",
        "tradeMonth": "2020-03-17"
      }
      this.params[$form.inputSelect] = $form.inputForm
    }
  }
};
</script>

<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
</style>
