<template>
  <div>
    <div class="search-box">
      <yun-search :form-base-data="searchConfig.formData"></yun-search>
    </div>
    <!-- <Search
      :form-base-data="searchConfig.formData"
      :show-foot-btn="searchConfig.showFootBtn"
      @search="onClickSearch"
    /> -->
    <div class="table-box">
      <div class="tab-title">
        <span>门店列表</span>
        <el-button type="primary" size="small">导出</el-button>
      </div>
      <BaseCrud
        ref="table"
        :grid-config="tableConfig.gridConfig"
        :grid-btn-config="tableConfig.gridBtnConfig"
        :grid-data="testData"
        :form-config="tableConfig.formConfig"
        :form-data="tableConfig.formModel"
        :grid-edit-width="250"
        :is-async="true"
        :is-data-select="false"
        :is-table-expand="false"
        :row-key="'id'"
        grid-operation-name="添加门店"
        :default-expand-all="false"
        :hide-edit-area="tableConfig.hideEditArea"
        :api-service="api"
        @detail="onClickDetail"
      ></BaseCrud>
    </div>
  </div>
</template>

<script>
import { SEARCH_CONFIG } from "../formConfig/shopListSearch";
import { TABLE_CONFIG } from "../tableConfig/shopListTable";
export default {
  name: "ShopList",
  data() {
    return {
      searchConfig: SEARCH_CONFIG,
      tableConfig: TABLE_CONFIG,
      api: '',
      testData: [{
        shopNo: '1111'
      }]
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onClickSearch() {

    },
    onClickDetail() {
      this.$router.push('/shopManage/shopList/shopDetail')
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
