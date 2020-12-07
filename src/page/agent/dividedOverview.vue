<template>
  <div>
    <div class="p-head">分润总览</div>
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
    <div class="table-box">
      <BaseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="50"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        @detail="onClickDetail"
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
  data() {
    return {
      searchMaxHeight: "200", // 搜索项展开参数
      configData: USER_CONFIG, // 列表展示参数
      searchConfig: FORM_CONFIG, // 搜索项的参数
      overviewData: [],
      overviewData2: [],
      tradeMonth: '', // 月份
      params: {}, // 搜索参数
      api: api.agentCommission // 查询分润列表
    };
  },
  created() {
  },
  mounted() {
    this.getTotalCommission();
  },
  methods: {
    // 点击进入详情页面
    onClickDetail() {
      this.$router.push({ name: "dividedOverviewDetail" });
    },

    // 获取分润的总数据
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
.table-box {
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
  flex-grow: 1;
  width: 54%;
}

.data-item2 {
  margin: 0;
  margin-left: 24px;
  flex-grow: 1;
  width: 44%;
}
</style>
