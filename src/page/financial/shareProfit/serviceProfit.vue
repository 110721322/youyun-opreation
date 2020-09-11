<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/serviceProfitDetail') !== -1 || this.$route.path.indexOf('/interconnection') !== -1" />
    <div v-else>
      <div class="main-top">
        <div v-for="(item, index) in mainData" :key="index" class="main-item" :class="mainIndex===index? 'isSelect': ''" @click="onClick_main(index)">{{ item.value }}</div>
      </div>
      <Search
        :open-height="searchHeight"
        :form-base-data="searchConfig.formData"
        :is-show-all="true"
        @search="search"
      />
      <div class="select">
        <div class="select-top">
          <div v-for="(item, index) in selectData" :key="index" class="select-item" :class="selectIndex===index? 'isSelect': ''" @click="onClick_select(index)">{{ item.value }}</div>
        </div>
        <div class="table_box">
          <BaseCrud
            v-if="selectIndex===0"
            ref="table"
            :params="params"
            :api-service="api"
            :grid-config="configData.gridConfig"
            :grid-btn-config="configData.gridBtnConfig"
            :grid-data="testData"
            :form-config="configData.formConfig"
            :form-data="configData.formModel"
            :grid-edit-width="100"
            :is-async="true"
            :is-select="false"
            :is-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            @detail="handleDetail"
          ></BaseCrud>
          <BaseCrud
            v-if="selectIndex===1"
            ref="table"
            :params="params"
            :api-service="api"
            :grid-config="configData1.gridConfig"
            :grid-btn-config="configData1.gridBtnConfig"
            :grid-data="testData"
            :form-config="configData1.formConfig"
            :form-data="configData1.formModel"
            :grid-edit-width="100"
            :is-async="true"
            :is-select="false"
            :is-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            @detail="handleDetail"
          ></BaseCrud>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/serviceSearch";
import { SERVICE_CONFIG } from "../tableConfig/serviceConfig";
import { SERVICE_CONFIG1 } from "../tableConfig/serviceJianConfig";
import { TOPVICE_CONFIG1 } from "../tableConfig/TopAgentData";
import { TOPERVICE_CONFIG } from "../tableConfig/TopConfig";
import api_statistice from "@/api/api_statistice"
export default {
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      configData1: SERVICE_CONFIG1,
      testData: [],
      searchHeight: '300',
      agendoquery: '',
      params: {
        tradeMonth: '',
        channelAgentCode: '',
        agentNo: ''
      },
      selectData: [
        {
          value: '按支付方式',
          id: 1
        },
        {
          value: '按通道',
          id: 2
        }
      ],
      mainData: [
        {
          value: '顶级服务商',
          id: 1
        },
        {
          value: '服务商',
          id: 2
        }
      ],
      selectIndex: 0,
      mainIndex: 0
    }
  },
  computed: {
    api() {
      if (this.mainIndex === 0) {
        return api_statistice.selectTopAgentDataByPage
      } else {
        return api_statistice.selectAgentDataByPage
      }
    }
  },
  mounted() {},
  created() {
    var myDate = new Date()
    const m = myDate.getMonth() + 1
    if (myDate.getMonth() < 10) {
      this.tradeMonth = myDate.getFullYear() + "-" + "0" + m + "-" + "01"
    } else {
      this.tradeMonth = myDate.getFullYear() + "-" + m + "-" + "01"
    }
    if (this.mainIndex === 0) {
      this.configData = TOPERVICE_CONFIG
      this.configData1 = TOPVICE_CONFIG1
    }
    this.params = {
      tradeMonth: this.tradeMonth
    }
    this.api = api_statistice.selectTopAgentDataByPage
    // this.search()
  },
  methods: {
    onClick_select(index) {
      this.selectIndex = index
    },
    onClick_main(index) {
      this.mainIndex = index
      this.params = {
        tradeMonth: this.tradeMonth
      }
      if (this.mainIndex === 0) {
        this.configData = TOPERVICE_CONFIG
        this.configData1 = TOPVICE_CONFIG1
      } else if (this.mainIndex === 1) {
        this.configData = SERVICE_CONFIG
        this.configData1 = SERVICE_CONFIG1
      }
    },
    search($ruleform) {
      this.params = {
        tradeMonth: $ruleform.date ? $ruleform.date + "-" + "01" : this.tradeMonth
      }
      this.tradeMonth = $ruleform.date ? $ruleform.date + "-" + "01" : this.tradeMonth
    },
    handleDetail($row) {
      if (this.mainIndex === 0) {
        this.$router.push({
          path: '/financial/shareProfit/serviceProfit/serviceProfitDetail',
          query: {
            enterType: 0,
            agentNo: $row.channelAgentCode,
            tradeMonth: this.tradeMonth,
            mainIndex: this.mainIndex
          }
        })
      }
      if (this.mainIndex === 1) {
        this.$router.push({
          path: '/financial/shareProfit/serviceProfit/serviceProfitDetail',
          query: {
            enterType: 1,
            agentNo: $row.agentNo,
            tradeMonth: this.tradeMonth,
            mainIndex: this.mainIndex
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .main_page {
    .main-top {
        width: 100%;
        display: flex;
        padding: 0 0 26px 32px;
        background: #ffffff;
        .main-item {
          height: 56px;
          line-height: 56px;
          color: #606266;
          font-size: 16px;
          margin-right: 44px;
          padding: 0 20px;
          cursor: pointer;
        }
        .main-item.isSelect {
          color: #1989FA;
          border-bottom: 1px solid #1989FA;
          font-weight: 500;
        }
      }
    .select {
      width: 100%;
      margin-top: 24px;
      padding: 0 24px;
      .select-top {
        width: 100%;
        display: flex;
        padding: 0 0 26px 32px;
        background: #ffffff;
        .select-item {
          height: 56px;
          line-height: 56px;
          color: #606266;
          font-size: 16px;
          margin-right: 44px;
          padding: 0 20px;
          cursor: pointer;
        }
        .select-item.isSelect {
          color: #1989FA;
          border-bottom: 1px solid #1989FA;
          font-weight: 500;
        }
      }
    }
  }

</style>
