<template>
  <div class="m-page">
    <div class="m-data"></div>
    <Search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">商户列表</div>
        <el-button type="primary">导出</el-button>
      </div>
      <div class="basecrud-box">
        <BaseCrud
            ref="table"
            :grid-config="gridConfig"
            :grid-btn-config="gridBtnConfig"
            :grid-edit-width="200"
            :is-async="true"
            :is-select="false"
            :is-data-select="false"
            :is-table-expand="false"
            :row-key="'id'"
            :default-expand-all="false"
            :hide-edit-area="false"
            :grid-data="testData"
            :params="params"
            :api-service="api"
            @details="onClickDetails"
            @goMerchant="onClickGoMerchant"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from "@/components/search/search.vue";
  import BaseCrud from "@/components/table/BaseCrud.vue";
  import { SEARCH_FORM_CONFIG } from "./FormConfig/MerchantListSearch"
  import { MERCHANT_LIST_CONFIG } from "./TableConfig/ListConfig"
  export default {
    name: "MerchantList",
    components: { Search, BaseCrud },
    data() {
      return {
        params: {},
        api: '',
        testData: [],
        searchConfig: SEARCH_FORM_CONFIG,
        gridConfig: MERCHANT_LIST_CONFIG.gridConfig,
        gridBtnConfig: MERCHANT_LIST_CONFIG.gridBtnConfig
      }
    },
    created() {
      this.testData = [
        {
          merchantNo: 225555,
          agentName: 'haha',
          merchantName: '水果店',
          phone: '11225444',
          merchantNum: 111,
          status: 0
        }
      ]
    },
    methods: {
      onClickSearch() {},
      onClickDetails(row) {
        this.$router.push({
          name: 'MerchantDetail',
          query: {
            merchantNo: row.merchantNo
          }
        })
      },
      onClickGoAgent(row) {},
      onClickGoMerchant(row) {}
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
    .m-data {
      width: 100%;
      height: 100px;
      background: #fff;
    }
    .m-basecrud {
      padding: 24px 24px;
      .m-basecrud-title {
        display: flex;
        justify-content: space-between;
        padding: 24px 24px;
        background: #fff;
      }
      .basecrud-box {
        padding: 0 24px 24px;
        background: #fff;
      }
    }
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
  /deep/ .tab-disabled {
    color: #F5222D;
  }
</style>