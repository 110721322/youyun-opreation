<template>
  <div>
    <div class="p-head">佣金明细</div>
    <div class="content">
      <ul class="top-content">
        <li>
          <p>总佣金(元)</p>
          <p>{{commission.totalCommission}}</p>
        </li>
        <li>
          <p><img src="../../assets/img/wx_pay.png" alt="">微信佣金（元）</p>
          <p>{{commission.wechatCommission}}</p>
        </li>
        <li>
          <p><img src="../../assets/img/apply_pay.png" alt="">支付宝佣金(元)</p>
          <p>{{commission.alipayCommission}}</p>
        </li>
        <li>
          <p><img src="../../assets/img/yun_pay.png" alt="">云闪付佣金(元)</p>
          <p>{{commission.cloudPayCommission}}</p>
        </li>
      </ul>
      <Search
        :is-show-all="true"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search" />
      <div class="tabform">
        <div class="table-title">商户佣金列表</div>
        <BaseCrud
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
          :default-expand-all="false"
          :hide-edit-area="true"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api_comSettlement"
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import {SEARCH_CONFIG} from "./formConfig/comsetDetailSearch";
import {SERVICE_CONFIG} from "./tableConfig/comsetDetailConfig";
export default {
  name: "ComsetDetail",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      configData: SERVICE_CONFIG,
      params: {},
      testData: [],
      tradeMonth: '',
      commission: {},
      api: ''
    }
  },
  created() {
    this.tradeMonth = this.$route.query.tradeMonth
    this.params = {
      tradeMonth: this.tradeMonth
    }
    this.api = api.queryCommissionByPage
    this.getTotal()
  },
  methods: {
    getTotal() {
      api.queryCommission({
        tradeMonth: this.tradeMonth
      }).then(res => {
        this.commission = res.data
      })
    },
    search($form) {
      this.params = {
        tradeMonth: this.tradeMonth,
        [$form.search]: $form.searchVal
      }
    }
  }
}
</script>

<style scoped>
  .content {
    width: 100%;
    padding: 24px 24px;
    box-sizing: border-box;
  }
  .top-content {
    width: 100%;
    padding: 40px 0;
    background: #ffffff;
    display: flex;
    margin-bottom: 24px;
  }
  .top-content li {
    width: 25%;
    text-align: center;
  }
  .top-content li:nth-child(1) {
    border-right: 1px solid #E8E8E8;
  }
  .top-content li p:nth-child(1) {
    color: #909399;
    font-size: 14px;
    line-height: 22px;
  }
  .top-content li p:nth-child(2) {
    color: #262626;
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
    margin-top: 4px;
  }
  .top-content li p:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .top-content li p:nth-child(1) img {
    width: 20px;
    height: 20px;
    display: block;
    margin-right: 6px;
  }
  .s_box[data-v-19c2e88f] {
    margin: 0 0;
  }
  .tabform {
    margin-top: 24px;
  }
  .table-title {
    width: 100%;
    height: 68px;
    padding-left: 24px;
    line-height: 68px;
    font-size: 16px;
    font-weight: 500;
    background: #ffffff;
    border-bottom: 1px solid #EBEEF5;
  }
</style>
