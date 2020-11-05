<template>
  <div>
    <div class="p_head">分润总览</div>
    <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
    />
    <div class="data-list">
      <data-mode :config-data="overviewData" class="data-item"></data-mode>
      <data-mode :config-data="overviewData2" class="data-item2"></data-mode>
    </div>
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
          :params="params"
          :api-service="api"
          @detail="handleDetail"
      />
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import dataMode from "@/components/dataMode/dataMode.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { USER_CONFIG } from "./tableConfig/dividedOverviewConfig";
import { FORM_CONFIG } from "./formConfig/dividedOverviewSearch";
import api from "@/api/api_agent.js"

export default {
  name: "DividedOverview",
  components: { search, BaseCrud, dataMode },
  // components: {  dataMode, BaseCrud },

  data() {
    return {
      searchMaxHeight: "200",
      configData: USER_CONFIG,
      searchConfig: FORM_CONFIG,
      testData: [],
      overviewData: [
        {
          title: "订单分润总额",
          data: "2202604.25元"
        },
        {
          title: "服务商订单分润",
          data: "2201604.25元"
        },
        {
          title: "平台订单分润",
          data: "1000.00元"
        }
      ],
      overviewData2: [
        {
          title: "官方活动奖励",
          data: "1000000.00元"
        },
        {
          title: "平台活动奖励",
          data: "10000.00元"
        }
      ],
      tradeMonth: '',
      params: {},
      api: api.agentCommission
    };
  },
  created() {
    this.params = {}
  },
  mounted() {
    // this.getData();
    this.getTotalCommission();
  },
  methods: {
    handleDetail() {
      this.$router.push({ name: "dividedOverviewDetail" });
    },
    getTotalCommission() {
      api.totalCommission({
        tradeMonth: this.tradeMonth
      }).then(res => {
        this.overviewData = [
          {
            title: "订单分润总额",
            data: res.data.officeCommission + '元'
          },
          {
            title: "服务商订单分润",
            data: res.data.agentCommission + '元'
          },
          {
            title: "平台订单分润",
            data: res.data.platformCommission + '元'
          }
        ]
        this.overviewData2 = [
          {
            title: "官方活动奖励",
            data: res.data.officeActivityCommission + '元'
          },
          {
            title: "平台活动奖励",
            data: res.data.platformActivityCommission + '元'
          }
        ]
      })
    },
    search($form) {
      this.params = {
        [$form.search]: $form.searchVal
      }
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
.data-list {
  display: flex;
  margin: 24px;
}
.data-item {
  margin: 0;
  width: 54%;
  flex-grow: 1;
}
.data-item2 {
  margin: 0;
  width: 44%;
  margin-left: 24px;
  flex-grow: 1;
}
</style>
