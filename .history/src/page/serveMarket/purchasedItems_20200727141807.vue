<template>
  <div class="main_page">
    <ul class="top-table">
      <li v-for="(item, index) in selectIndex" :key="index" class="noselect" @click="onClick_select(index)" :class="selectData===index? 'isselect': ''">{{ item.value }}</li>
    </ul>
    <div v-if="selectData===0" class="tab-list">
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
        :api-service="null"
        :hide-edit-area="true"
      >
      </BaseCrud>
    </div>
    <div v-if="selectData===1" class="tab-list">
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
        :api-service="null"
        :hide-edit-area="true"
      >
      </BaseCrud>
    </div>
    <div v-if="selectData===2" class="tab-list">
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
        :api-service="null"
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
export default {
  components: { BaseCrud },
  data() {
    return {
      selectData: 0,
      selectIndex: [
        {
          value: '业务模式',
          id: 1
        },
        {
          value: '交易通道',
          id: 2
        },
        {
          value: '品牌定制',
          id: 3
        }
      ],
      configData: BUSINESS_CONFIG,
      configData1: LS_CONFIG,
      configData2: BRAND_CONFIG,
      params: {},
      testData: [],
      testData1: [],
      testData2: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.testData = [
        {
          id: '1',
          createTime: '2020-06-12 15:04:30',
          type: '小马哥代理',
          relax: '1000',
          price: '5000',
          payWay: '微信支付',
          status: '已完成'
        }
      ]
    },
    onClick_select(index) {
      this.selectData = index
      if (index === 0) {
        this.getData()
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
