<template>
  <div class="main_page">
    <router-view v-if="this.$route.path.indexOf('/serviceProfitDetail') !== -1 || this.$route.path.indexOf('/interconnection') !== -1" />
    <div v-else>
      <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" is_show_all="true" @search="search" />
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
import api_statistice from "@/api/api_statistice"
export default {
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      configData1: SERVICE_CONFIG1,
      api: api_statistice.selectAgentDataByPage,
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
      selectIndex: 0
    }
  },
  mounted() {
    this.getData()
  },
  created() {
    this.getDate();
    this.search()
  },
  methods: {
    getDate() {
      api_statistice.selectAgentDataByPage({
      }).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // console.log(this.configData)
    },
    onClick_select(index) {
      this.selectIndex = index
    },
    search($ruleform) {
      this.params = {
        tradeMonth: $ruleform.date
        // agentNo: $ruleform.inputSelect === 'merchantNo' ? $ruleform.inputForm : "",
        // channelAgentCode: $ruleform.inputSelect === 'merchantName' ? $ruleform.inputForm : ""
      }
      console.log(this.params)
    },
    handleDetail($row) {
      this.$router.push({
        path: '/financial/shareProfit/serviceProfit/serviceProfitDetail',
        query: {
          agentNo: $row.agentNo,
          tradeMonth: this.params.tradeMonth
        }
      })
      // this.params.tradeMonth
      // console.log(this.query.tradeMonth)
    }
  }
}
</script>

<style scoped lang="scss">
  .main_page {
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
