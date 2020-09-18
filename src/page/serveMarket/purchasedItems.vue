<template>
  <div>
    <ul class="top-table">
      <li v-for="(item, index) in selectData" :key="index" class="noselect" :class="selectIndex===index? 'isselect': ''" @click="onClick_select(item.value,index)">{{ item.label }}</li>
    </ul>
    <div v-if="selectIndex===0" class="tab-list">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        :hide-edit-area="true"
      >
      </BaseCrud>
    </div>
    <div v-if="selectIndex===1" class="tab-list">
      <BaseCrud
        ref="table"
        :grid-config="configData1.gridConfig"
        :grid-btn-config="configData1.gridBtnConfig"
        :grid-data="testData1"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        :hide-edit-area="true"
      >
      </BaseCrud>
    </div>
    <div v-if="selectIndex===2" class="tab-list">
      <BaseCrud
        ref="table"
        :grid-config="configData2.gridConfig"
        :grid-btn-config="configData2.gridBtnConfig"
        :grid-data="testData2"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="api"
        :hide-edit-area="true"
      >
      </BaseCrud>
    </div>
  </div>
</template>

<script>
import BaseCrud from "@/components/table/BaseCrud.vue";
import {BUSINESS_CONFIG} from "../serveMarket/tableConfig/businessModelConfig";
import {LS_CONFIG} from "../serveMarket/tableConfig/lsConfig";
import {BRAND_CONFIG} from "../serveMarket/tableConfig/brandConfig";
import api from "@/api/api_serveMarket";
export default {
  name: "PurchasedItems",
  components: { BaseCrud },
  data() {
    return {
      selectIndex: 0,
      selectData: [
        {
          value: 'businessMode',
          label: '业务模式'
        },
        {
          value: 'payChannel',
          label: '交易通道'
        },
        {
          value: 'brandCustom',
          label: '品牌定制'
        }
      ],
      configData: BUSINESS_CONFIG,
      configData1: LS_CONFIG,
      configData2: BRAND_CONFIG,
      params: {},
      testData: [],
      testData1: [],
      testData2: [],
      api: api.selectTopAgentOrder
    }
  },
  mounted() {
    this.params = {
      moduleCode: this.selectData[this.selectIndex].value
    }
  },
  methods: {
    onClick_select(data, index) {
      this.selectIndex = index
      this.params = {
        moduleCode: this.selectData[this.selectIndex].value
      }
    }
  }
}
</script>

<style scoped>
  .top-table {
    width: 100%;
    background: #ffffff;
    height: 52px;
    padding-left: 16px;
    display: flex;
    line-height: 52px;
  }
  .top-table .noselect {
    width: 92px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
  }
  .top-table .noselect.isselect {
    color: #1989FA;
    border-bottom: 2px solid #1989FA;
  }
  .tab-list {
    width: 100%;
    margin-top: 24px;
    padding: 0 24px;
  }
</style>
