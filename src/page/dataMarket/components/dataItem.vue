<template>
  <div class="data-item">
    <div class="title">
      {{title}}
      <span class="show-more" v-if="isShowMore">查看更多</span>
    </div>
    <div class="tags" v-if="radio">
      <el-radio-group v-model="radio.radio">
        <el-radio-button
          :label="item.label"
          v-for="(item,index) in radio.namelist"
          :key="index"
        >{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="line" v-if="isShowLine"></div>

    <template v-if="isShowPie">
      <pie :pieOption="pieOption" :refName="piwRefName" :dataList="dataList"></pie>
    </template>

    <div v-if="isShowTable" class="table-box">
      <baseCrud
        :grid-config="configData.gridConfig"
        :grid-btn-config="configData.gridBtnConfig"
        :grid-data="itemTestData"
        :form-config="configData.formConfig"
        :form-data="configData.formModel"
        :grid-edit-width="300"
        form-title="用户"
        :isSelect="false"
        :hideEditArea="true"
        :header-cell-style="itemHeaderCellStyle"
      ></baseCrud>
    </div>
  </div>
</template>
<script>
import pie from "./pie.vue";
import baseCrud from "@/components/table/BaseCrud.vue";
export default {
  name: "DataItem",
  props: {
    radio: {},
    title: {},
    isShowLine: {
      type: Boolean,
      default: true
    },
    isShowPie: {},
    pieOption: {},
    piwRefName: {},
    dataList: {},
    isShowMore: {},
    isShowTable: {},
    configData:{},
    itemTestData:{},
    itemHeaderCellStyle:{},
  },
  components: {
    pie,
    baseCrud
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.data-item {
  .title {
    margin-left: 24px;
    margin-top: 16px;
    font-size: 16px;
    font-weight: 500;
    color:#333335;
    line-height: 24px;
    height: 24px;
    .show-more {
      float: right;
      padding-right: 24px;
      padding-top: 2px;
      font-size: 14px;
      font-weight: 400;
      color: #1890ff;
      line-height: 20px;
    }
  }
  .tags {
    padding-left: 24px;
    margin-top: 16px;
  }
  .line {
    margin-top: 16px;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
  }
}
.table-box {
  padding: 24px;
}
</style>