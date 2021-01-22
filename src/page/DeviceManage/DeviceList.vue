<template>
  <div>
    <yun-search
      :form-base-data="searchConfig.formData"
      @search="onClickSearch"
    />
    <div class="m-table">
      <div class="m-table-head">
        <div class="m-table-left-title">设备列表</div>
        <div class="m-table-right-btn">
          <el-button @click="clickBind">批量划拨</el-button>
          <el-button type="primary" @click="clickExport">导出</el-button>
        </div>
      </div>
      <div class="m-basecrud">
        <yun-table
          ref="table"
          :grid-config="gridConfig"
          :grid-btn-config="gridBtnConfig"
          :grid-edit-width="200"
          :is-async="true"
          :is-select="true"
          :is-data-select="false"
          :is-table-expand="false"
          :row-key="'id'"
          :default-expand-all="false"
          :hide-edit-area="false"
          :params="params"
          :api-service="api"
          @unBind="onClickUnbind"
          @callBind="onClickCallBind"
          @details="onClickDetails"
          @selectionChange="selectionChange"
        ></yun-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api_deviceManage'
import { SEARCH_FORM_CONFIG } from './FormConfig/DeviceListSearch'
import { DEVICE_LIST_CONFIG } from './TableConfig/DeviceListConfig'
export default {
  name: "DeviceList",
  data() {
    return {
      searchConfig: SEARCH_FORM_CONFIG,
      params: {},
      api: api.queryDeviceList,
      gridConfig: DEVICE_LIST_CONFIG.gridConfig,
      gridBtnConfig: DEVICE_LIST_CONFIG.gridBtnConfig
    }
  },
  methods: {
    onClickSearch($ruleForm) {
      this.params = {}
    },
    clickBind() {},
    clickExport() {},
    onClickUnbind() {},
    onClickCallBind() {},
    onClickDetails() {},
    selectionChange() {}
  }
}
</script>

<style scoped lang="scss">
  .m-table {
    padding: 24px 24px 0;
    width: 100%;
    .m-table-head {
      display: flex;
      justify-content: space-between;
      padding: 24px 24px 0;
      width: 100%;
      background: #fff;
      .m-table-left-title {
        font-size: 16px;
        font-weight: 400;
        color: #000;
      }
      .m-table-right-btn {
        display: flex;
        justify-content: space-between;
        button {
          margin: 0;
          padding: 9px 15px;
          font-size: 14px;
        }
        button:nth-child(1) {
          margin-right: 16px;
        }
      }
    }
    .m-basecrud {
      padding: 24px 24px;
      background: #fff;
    }
  }
  .dot.disabled {
    color: #F5222D !important;
  }
  .m-select-baseCrud {
    padding: 24px;
  }
  /deep/ .tab-color {
    color: #1989FA;
  }
</style>