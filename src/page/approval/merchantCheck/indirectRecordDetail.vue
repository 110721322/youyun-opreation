<template>
  <div class>
    <router-view v-if="this.$route.path.indexOf('/detail') !== -1" />
    <div v-else>
      <div class="tab_head">
        <span class="title">商户间连审核记录</span>
      </div>

      <div class="table_box">
        <BaseCrud
          :grid-config="configData.gridConfig"
          :grid-btn-config="configData.gridBtnConfig"
          :grid-data="testData"
          :form-config="configData.formConfig"
          :form-data="configData.formModel"
          :grid-edit-width="150"
          :is-async="false"
          :is-select="false"
          :is-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="configData.hideEditArea"
        ></BaseCrud>
      </div>
    </div>
  </div>
</template>
<script>
import BaseCrud from "@/components/table/BaseCrud.vue";

import { RECORD_CONFIG } from "./../tableConfig/indirectRecordDetailConfig";

export default {
  name: "IndirectRecordDetail",
  components: { BaseCrud },
  data() {
    return {
      configData: RECORD_CONFIG,
      testData: [],
      direction: "rtl"
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.testData = [
        {
          time: "紫菜网络科技有限公司,ID: 13293127119831938",
          people: "紫菜网络科技有限公司,ID: 13293127119831938",
          channel: ["乐刷", "新大陆", "网商"],
          content: "2014-02-15 16:00:23"
        },
        {
          time: "紫菜网络科技有限公司,ID: 13293127119831938",
          people: "紫菜网络科技有限公司,ID: 13293127119831938",
          channel: ["乐刷", "新大陆", "网商"],
          content: "2014-02-15 16:00:23"
        }
      ];
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    }
  }
};
</script>

<style lang="scss" scoped>
.table_box {
  position: relative;
  margin: 24px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
}
.form_item {
  float: left !important;
}
.clear_both {
  clear: both !important;
}
.btn_list {
  /* background: rebeccapurple; */
  position: absolute;
  right: 0;
  bottom: 21px;
  right: 24px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /* width: 25%; */
}
.form-box {
  display: flex;
  justify-content: space-between;
}
</style>
<style>
</style>
