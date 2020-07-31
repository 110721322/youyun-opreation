<template>
  <div class>
    <Search :open-height="searchHeight" :permission="searchConfig.permission" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="testData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="150"
        :is-async="true"
        :is-select="false"
        :is-expand="false"
        :row-key="'id'"
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_dataMarket";
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { mapActions } from 'vuex'

import { FORM_CONFIG } from "./formConfig/serviceDataDetailSearch";
import { MERCHANTDATADETAILCONFIG } from "./tableConfig/serviceDataDetailConfig";
export default {
  name: "MerchantDataDetail",
  components: { Search, BaseCrud },
  data() {
    return {
      searchConfig: FORM_CONFIG,
      configData: MERCHANTDATADETAILCONFIG,
      testData: [],
      searchHeight: "320",
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        labelId: null,
        regionCode: null,
        provinceCode: null,
        cityCode: null,
        operationId: null,
        currentPage: 1,
        pageSize: 10
      },
      api: api.selectTradeDailyByPage
    };
  },
  mounted() {
    this.queryInit();
  },
  methods: {
    ...mapActions(['setLabelList', 'setRegionList', 'setUserList']),
    search($ruleForm) {
      this.params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        [$ruleForm.inputSelect]: $ruleForm.inputForm ? $ruleForm.inputForm : null,
        labelId: $ruleForm.labelId,
        regionCode: $ruleForm.regionCode,
        provinceCode: $ruleForm.area ? $ruleForm.area[0] : null,
        cityCode: $ruleForm.area ? $ruleForm.area[1] : null
      }
    },
    queryInit() {
      api.queryInit().then(res => {
        const labelList = res.object.labelList.map($ele => {
          return {
            label: $ele.name,
            value: $ele.id
          }
        })
        const regionList = res.object.regionSetList.map($ele => {
          return {
            label: $ele.regionName,
            value: $ele.regionCode
          }
        })
        const userList = res.object.userDTOList.map($ele => {
          return {
            label: $ele.jobName || $ele.name,
            value: $ele.id
          }
        })
        this.setLabelList(labelList)
        this.setRegionList(regionList)
        this.setUserList(userList)
      })
    }
  }
};
</script>
<style scoped>
.table_box {
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  min-width: 1000px;
}
</style>
