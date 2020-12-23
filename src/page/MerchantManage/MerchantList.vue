<template>
  <div class="m-page">
    <yun-search
        :form-base-data="searchConfig.formData"
        @search="onClickSearch"
    />
    <div class="m-basecrud">
      <div class="m-basecrud-title">
        <div class="m-left">商户列表</div>
        <el-button type="primary">导出</el-button>
      </div>
      <div class="basecrud-box">
        <yun-table
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
            :params="params"
            :api-service="api"
            @details="onClickDetails"
            @goMerchant="onClickGoMerchant"
        ></yun-table>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api/api_merchantManage.js";
  import { SEARCH_FORM_CONFIG } from "./FormConfig/MerchantListSearch"
  import { MERCHANT_LIST_CONFIG } from "./TableConfig/ListConfig"
  export default {
    name: "MerchantList",
    data() {
      return {
        params: {},
        api: api.merchantList,
        searchConfig: SEARCH_FORM_CONFIG,
        gridConfig: MERCHANT_LIST_CONFIG.gridConfig,
        gridBtnConfig: MERCHANT_LIST_CONFIG.gridBtnConfig
      }
    },
    created() {},
    methods: {
      onClickSearch($ruleForm) {
        this.params = {
          merchantNo: $ruleForm.merchantNo ? $ruleForm.merchantNo : null,
          merchantName: $ruleForm.merchantName ? $ruleForm.merchantName : null,
          agentName: $ruleForm.agentName ? $ruleForm.agentName : null,
          isDisabled: $ruleForm.isDisabled === 1 ? 1 : $ruleForm.isDisabled === 0 ? 0 : null
        }
      },
      onClickDetails(row) {
        this.$router.push({
          name: 'MerchantDetail',
          query: {
            merchantNo: row.merchantNo,
            id: row.id
          }
        })
      },
      onClickGoMerchant(row) {}
    }
  }
</script>

<style lang="scss" scoped>
  .m-page {
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
</style>
