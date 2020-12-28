<template>
  <div>
    <div class="search-box">
      <yun-search :form-base-data="searchConfig.formData" @search="onClickSearch"></yun-search>
    </div>
    <div class="table-box">
      <div class="tab-title">
        <span>门店列表</span>
        <el-button type="primary" size="small">导出</el-button>
      </div>
      <yun-table
        ref="table"
        :is-async="true"
        :grid-config="tableConfig.gridConfig"
        :grid-btn-config="tableConfig.gridBtnConfig"
        :params="params"
        :api-service="api"
        @detail="onClickDetail"></yun-table>
    </div>
  </div>
</template>

<script>
import { SEARCH_CONFIG } from "../formConfig/shopListSearch";
import { TABLE_CONFIG } from "../tableConfig/shopListTable";
import api from "@/api/api_shop";
export default {
  name: "ShopList",
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      tableConfig: TABLE_CONFIG,
      api: api.shopQueryByPage,
      params: {},
      testData: []
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onClickSearch($ruleForm) {
      this.params = {
        shopNo: $ruleForm.shopNo,
        shopName: $ruleForm.shopName,
        phone: $ruleForm.phone,
        merchantNo: $ruleForm.merchantNo,
        status: $ruleForm.status,
        agentNo: $ruleForm.agentNo,
        isDisabled: $ruleForm.isDisabled
      }
    },
    onClickDetail(row) {
      this.$router.push('/shopManage/shopList/shopDetail?shopNo=' + row.shopNo)
    }
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}

.tab-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tab-title span {
  font-size: 16px;
  font-weight: 500;
}
</style>
