<template>
  <div>
    <div class="p_head">结算记录</div>
    <search
        :open-height="searchMaxHeight"
        :form-base-data="searchConfig.formData"
        :show-foot-btn="searchConfig.showFootBtn"
        @search="search"
    />
    <div class="table_head">
      <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :params="params"
          :default-expand-all="false"
          :hide-edit-area="true"
          :api-service="api"
      ></BaseCrud>
    </div>
<!--    <el-drawer-->
<!--      :visible.sync="drawer"-->
<!--      direction="rtl"-->
<!--      :before-close="handleClose">-->
<!--      <div slot="title" class="drawer-contenttitle">-->
<!--        <span>结算明细</span>-->
<!--      </div>-->
<!--    </el-drawer>-->
  </div>
</template>

<script>
import api from "@/api/api_comSettlement"
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "./formConfig/comsetRecordSearch"
import { RECORD_CONFIG } from "./tableConfig/comsetRecordConfig"
import search from "@/components/search/search.vue";
export default {
  name: "ComsetRecord",
  components: { search, BaseCrud },
  data() {
    return {
      searchMaxHeight: '200',
      searchConfig: SEARCH_CONFIG,
      configData: RECORD_CONFIG,
      testData: [],
      params: {},
      api: api.querySettleRecord,
      drawer: false
    }
  },
  created() {},
  methods: {
    search($form) {
      this.params = {
        beginTime: $form.date[0] || null,
        endTime: $form.date[1] || null,
        settleStatus: $form.settleStatus || 0
      }
    },
    handel_detail($row) {
      this.drawer = true
      api.queryDetailsById({
        id: $row.id
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  .table_head {
    padding: 32px 24px 0 24px;
  }
</style>
