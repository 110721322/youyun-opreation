<template>
  <div class>
    <div class="tab_head">
      <span class="title">设备授权激活</span>
    </div>
    <Search :open-height="searchHeight" :form-base-data="searchConfig.formData" @search="search" />

    <div class="table_box">
      <div class="tabale_title_box">
        <div class="title">设备授权列表</div>
        <div class="btn_download" @click="onClick_download">
          <i class="el-icon-download"></i>设备信息模版下载
        </div>
        <UploadFile class="btn" type="primary" @click="onClick_addDevice">导入设备信息</UploadFile>
      </div>
      <BaseCrud
        ref="table"
        :params="params"
        :api-service="api"
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
        :default-expand-all="false"
        :hide-edit-area="configData.hideEditArea"
        :header-cell-style="headerCellStyle"
        @okEdit="onClick_okEdit"
        @cancelEdit="onClick_cancelEdit"
      ></BaseCrud>
    </div>
  </div>
</template>
<script>
import api from "@/api/api_device";
import * as g from '@/libs/global';
import Search from "@/components/search/search.vue";
import BaseCrud from "@/components/table/BaseCrud.vue";
import { SEARCH_CONFIG } from "../formConfig/authorizedSearch";
import { AUTHORIZED_CONFIG } from "../tableConfig/authorizedConfig";
import UploadFile from "@/components/form/components/UploadFile";

export default {
  name: "Theme",
  components: { Search, BaseCrud, UploadFile },
  data() {
    return {
      headerCellStyle: { backgroundColor: "#FAFAFA" },
      searchHeight: "260",
      searchConfig: SEARCH_CONFIG,
      configData: AUTHORIZED_CONFIG,
      fromConfigData: {},
      testData: [],
      drawer: false,
      direction: "rtl",
      params: {
        beginDate: this.$g.utils.getToday(),
        endDate: this.$g.utils.getToday(),
        currentPage: 0,
        deviceId: 1,
        deviceIdentifier: "",
        pageSize: 1,
        status: 1
      },
      api: api.deviceActivationQueryByPage
    };
  },
  mounted() {},
  methods: {
    search($ruleForm) {
      console.log($ruleForm);
      const params = {
        beginDate: $ruleForm.date ? $ruleForm.date[0] : null,
        endDate: $ruleForm.date ? $ruleForm.date[1] : null,
        deviceId: $ruleForm.deviceId,
        status: $ruleForm.status
      };
      params[$ruleForm.inputSelect] = $ruleForm.inputForm;
      this.params = params;
    },
    selectionChange($val) {
      // eslint-disable-next-line no-console
      console.log($val);
    },
    onClick_addDevice() {},
    onClick_download() {
      window.location.href = g.config.server + "operation/v1/excelTemplate/download?url=excel/device_input.xlsx";
    },
    onClick_okEdit($item) {
      api
        .deviceActivationUpdate({
          authorizationCode: $item.authorizationCode,
          id: $item.id
        })
        .then(res => {})
        .catch(err => {
          this.$message(err);
        });
      $item.edit = false;
    },
    onClick_cancelEdit($item) {
      $item.edit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.process-box {
  margin-top: 24px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  .process-item {
    width: 120px;
    text-align: center;
    .process-icon {
      height: 44px;
      width: 44px;
      border-radius: 50%;
    }
    .label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333335;
      line-height: 22px;
    }
    .name {
      color: #8c8c8c;
    }
    .time {
      font-size: 12px;
      font-family: HelveticaNeue;
      color: rgba(0, 0, 0, 0.45);
      line-height: 12px;
    }
  }
  .arrow-img {
    width: 75px;
    height: 9px;
  }
}
.ellipsis {
  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}
.formTemplate {
  margin: 20px 20px 0;
}
.formTemplate-item {
  margin-right: 20px;
}
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

.tabale_title_box {
  height: 52px;
  width: 100%;
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 53, 1);
    float: left;
    margin-left: 10px;
    // line-height: 52px;
  }
  .btn {
    float: right;
  }
  .btn_download {
    float: right;
    color: #1989fa;
    margin-left: 16px;
    margin-top: 8px;
  }
}
</style>
