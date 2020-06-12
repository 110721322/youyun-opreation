<template>
  <div class="order-page">
    <div class="p_head">订购记录</div>
    <search
      :open-height="searchMaxHeight"
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="search"
    />
    <div class="table_box">
      <BaseCrud
        ref="table"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :is-async="true"
        :is-select="false"
        :params="params"
        :api-service="null"
        @selectionChange="selectionChange"
        @detail="go_detail"
      >
      </BaseCrud>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import {FORM_CONFIG} from "../serveMarket/formConfig/equipmentOrderSearch";
import { USER_CONFIG } from "../serveMarket/tableConfig/equipmentOrderConfig";
export default {
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: "380",
      searchConfig: FORM_CONFIG,
      configData: USER_CONFIG,
      params: {},
      testData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    search() {},
    selectionChange() {},
    go_detail() {
      this.$router.push({
        path: '/serveMarket/equipmentMall/equimentOrderDetail'
      })
    },
    openAgentManager() {},
    openMerchantManager() {},
    getData() {
      this.testData = [
        {
          id: '1',
          orderId: '111',
          createTime: '2020-06-12',
          orderPrice: '200',
          orderStatus: 0,
          callUser: '张三'
        }
      ]
    }
  }
}
</script>

<style>
  .p_head {
    margin-bottom: 24px;
  }
  .s_box[data-v-19c2e88f] {
    margin: 0 0;
  }
  .table_box {
    margin-top: 24px;
  }
</style>
